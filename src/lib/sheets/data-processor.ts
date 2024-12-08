import { GoogleSpreadsheetRow } from "google-spreadsheet"
import { getStoreSheet, STORE_SHEETS, COLUMNS, type StoreSheet } from "./sheets.config"
import { v4 as uuidv4 } from "uuid"
import { formatDate, getCurrentDate } from '@/lib/utils'

export interface Transaction {
  id: string
  date: string
  type: "REVENUE" | "EXPENSE"
  amount: number
  description: string
  category: string
}

// Cache store for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 300000; // 5 minutes cache
const REQUEST_DELAY = 100; // 100ms delay between requests

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const now = Date.now();
  const cached = cache.get(key);
  
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  await delay(REQUEST_DELAY);
  const data = await fetcher();
  cache.set(key, { data, timestamp: now });
  return data;
}

export async function addTransaction(
  store: StoreSheet, 
  transaction: Omit<Transaction, 'id' | 'date'>,
  date?: Date
) {
  const sheet = await getStoreSheet(store)
  const id = uuidv4()
  const formattedDate = date ? formatDate(date) : formatDate(getCurrentDate())

  await sheet.addRow({
    [COLUMNS.ID]: id,
    [COLUMNS.DATE]: formattedDate,
    [COLUMNS.TYPE]: transaction.type,
    [COLUMNS.AMOUNT]: transaction.amount,
    [COLUMNS.CATEGORY]: transaction.category,
    [COLUMNS.DESCRIPTION]: transaction.description
  })

  return { id, date: formattedDate, ...transaction }
}

export async function deleteTransaction(
  store: StoreSheet,
  date: string,
  type?: "REVENUE" | "EXPENSE"
) {
  const sheet = await getStoreSheet(store)
  const rows = await sheet.getRows()
  
  // Find matching transactions
  const matchingRows = rows.filter(row => {
    const rowDate = row.get(COLUMNS.DATE)
    const rowType = row.get(COLUMNS.TYPE)
    
    if (date !== rowDate) return false
    if (type && type !== rowType) return false
    
    return true
  })

  if (matchingRows.length === 0) {
    throw new Error("No matching transactions found")
  }

  // Delete the transactions
  await Promise.all(matchingRows.map(row => row.delete()))

  return {
    message: `Deleted ${matchingRows.length} transaction(s)`,
    count: matchingRows.length
  }
}

export async function updateTransaction(
  store: StoreSheet,
  date: string,
  type: "REVENUE" | "EXPENSE",
  newAmount: number
) {
  const sheet = await getStoreSheet(store)
  const rows = await sheet.getRows()
  
  // Find matching transaction
  const matchingRow = rows.find(row => {
    const rowDate = row.get(COLUMNS.DATE)
    const rowType = row.get(COLUMNS.TYPE)
    return date === rowDate && type === rowType
  })

  if (!matchingRow) {
    throw new Error("No matching transaction found")
  }

  // Update the amount
  matchingRow.set(COLUMNS.AMOUNT, newAmount)
  await matchingRow.save()

  return {
    id: matchingRow.get(COLUMNS.ID),
    date: matchingRow.get(COLUMNS.DATE),
    type: matchingRow.get(COLUMNS.TYPE),
    amount: newAmount,
    category: matchingRow.get(COLUMNS.CATEGORY),
    description: matchingRow.get(COLUMNS.DESCRIPTION)
  }
}

export async function getTransactions(
  store: StoreSheet,
  filters?: Partial<{
    type: "REVENUE" | "EXPENSE"
    startDate: string
    endDate: string
    category: string
  }>
) {
  const cacheKey = `transactions-${store}-${JSON.stringify(filters)}`;
  return getCachedData(cacheKey, async () => {
    const sheet = await getStoreSheet(store)
    let rows = await sheet.getRows()

    if (filters) {
      rows = rows.filter((row) => {
        if (filters.type && row.get(COLUMNS.TYPE) !== filters.type) {
          return false
        }
        if (filters.category && row.get(COLUMNS.CATEGORY) !== filters.category) {
          return false
        }
        if (filters.startDate && row.get(COLUMNS.DATE) < filters.startDate) {
          return false
        }
        if (filters.endDate && row.get(COLUMNS.DATE) > filters.endDate) {
          return false
        }
        return true
      })
    }

    return rows.map(rowToTransaction)
  })
}

function rowToTransaction(row: GoogleSpreadsheetRow): Transaction {
  return {
    id: row.get(COLUMNS.ID),
    date: row.get(COLUMNS.DATE),
    type: row.get(COLUMNS.TYPE) as "REVENUE" | "EXPENSE",
    amount: Number(row.get(COLUMNS.AMOUNT)),
    description: row.get(COLUMNS.DESCRIPTION),
    category: row.get(COLUMNS.CATEGORY),
  }
}

export async function getStoreMetrics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
) {
  const cacheKey = `store-metrics-${store}-${startDate}-${endDate}`;
  return getCachedData(cacheKey, async () => {
    const sheet = await getStoreSheet(store);
    const rows = await sheet.getRows();
    
    let revenue = 0;
    let expenses = 0;
    
    rows.forEach(row => {
      const date = row.get(COLUMNS.DATE);
      const type = row.get(COLUMNS.TYPE);
      const amount = parseFloat(row.get(COLUMNS.AMOUNT));
      
      if ((!startDate || date >= startDate) && (!endDate || date <= endDate)) {
        if (type === 'REVENUE') {
          revenue += amount;
        } else if (type === 'EXPENSE') {
          expenses += amount;
        }
      }
    });
    
    return { revenue, expenses, profit: revenue - expenses };
  });
}

export async function getAllStoresMetrics(startDate?: string, endDate?: string) {
  const stores = Object.values(STORE_SHEETS);
  const metrics = await Promise.all(
    stores.map(async (store) => {
      const metrics = await getStoreMetrics(store, startDate, endDate);
      return {
        store,
        ...metrics
      };
    })
  );

  return metrics;
}

// Deprecate these individual functions as they're now combined in getStoreMetrics
export async function getStoreRevenue(store: StoreSheet, startDate?: string, endDate?: string) {
  const metrics = await getStoreMetrics(store, startDate, endDate);
  return metrics.revenue;
}

export async function getStoreExpenses(store: StoreSheet, startDate?: string, endDate?: string) {
  const metrics = await getStoreMetrics(store, startDate, endDate);
  return metrics.expenses;
}

export async function getStoreProfits(store: StoreSheet, startDate?: string, endDate?: string) {
  const metrics = await getStoreMetrics(store, startDate, endDate);
  return metrics.profit;
}

export async function getStoreRevenueAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
  const cacheKey = `store-revenue-analytics-${store}-${startDate}-${endDate}`;
  return getCachedData(cacheKey, async () => {
    const sheet = await getStoreSheet(store)
    const rows = await sheet.getRows()
    
    return rows.reduce((total, row) => {
      const date = row.get(COLUMNS.DATE)
      const type = row.get(COLUMNS.TYPE)
      const amount = parseFloat(row.get(COLUMNS.AMOUNT))

      if (
        type === 'REVENUE' &&
        (!startDate || date >= startDate) &&
        (!endDate || date <= endDate)
      ) {
        return total + amount
      }
      return total
    }, 0)
  })
}

export async function getStoreExpensesAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
  const cacheKey = `store-expenses-analytics-${store}-${startDate}-${endDate}`;
  return getCachedData(cacheKey, async () => {
    const sheet = await getStoreSheet(store)
    const rows = await sheet.getRows()
    
    return rows.reduce((total, row) => {
      const date = row.get(COLUMNS.DATE)
      const type = row.get(COLUMNS.TYPE)
      const amount = parseFloat(row.get(COLUMNS.AMOUNT))

      if (
        type === 'EXPENSE' &&
        (!startDate || date >= startDate) &&
        (!endDate || date <= endDate)
      ) {
        return total + amount
      }
      return total
    }, 0)
  })
}

export async function getStoreProfitsAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
  const cacheKey = `store-profits-analytics-${store}-${startDate}-${endDate}`;
  return getCachedData(cacheKey, async () => {
    const revenue = await getStoreRevenueAnalytics(store, startDate, endDate)
    const expenses = await getStoreExpensesAnalytics(store, startDate, endDate)
    return revenue - expenses
  })
}

export async function getAllStoresMetricsAnalytics(startDate?: string, endDate?: string) {
  const stores = Object.values(STORE_SHEETS)
  const metrics = await Promise.all(
    stores.map(async (store) => ({
      store,
      revenue: await getStoreRevenueAnalytics(store, startDate, endDate),
      expenses: await getStoreExpensesAnalytics(store, startDate, endDate),
      profit: await getStoreProfitsAnalytics(store, startDate, endDate)
    }))
  )
  return metrics
}

export async function getTransactionCategories(store: StoreSheet) {
  const cacheKey = `transaction-categories-${store}`;
  return getCachedData(cacheKey, async () => {
    const sheet = await getStoreSheet(store)
    const rows = await sheet.getRows()
    
    const categories = new Set<string>()
    rows.forEach(row => {
      const category = row.get(COLUMNS.CATEGORY)
      if (category) categories.add(category)
    })

    return Array.from(categories)
  })
}
