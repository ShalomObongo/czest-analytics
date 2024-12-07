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

export async function getStoreRevenue(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
) {
  const transactions = await getTransactions(store, {
    type: "REVENUE",
    startDate,
    endDate,
  })

  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}

export async function getStoreExpenses(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
) {
  const transactions = await getTransactions(store, {
    type: "EXPENSE",
    startDate,
    endDate,
  })

  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}

export async function getStoreProfits(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
) {
  const [revenue, expenses] = await Promise.all([
    getStoreRevenue(store, startDate, endDate),
    getStoreExpenses(store, startDate, endDate),
  ])

  return revenue - expenses
}

export async function getAllStoresMetrics(startDate?: string, endDate?: string) {
  const stores = Object.values(STORE_SHEETS)
  const metrics = await Promise.all(
    stores.map(async (store) => {
      const [revenue, expenses] = await Promise.all([
        getStoreRevenue(store, startDate, endDate),
        getStoreExpenses(store, startDate, endDate),
      ])

      return {
        store,
        revenue,
        expenses,
        profit: revenue - expenses,
      }
    })
  )

  return metrics
}

export async function getTransactionCategories(store: StoreSheet) {
  const sheet = await getStoreSheet(store)
  const rows = await sheet.getRows()
  
  const categories = new Set<string>()
  rows.forEach(row => {
    const category = row.get(COLUMNS.CATEGORY)
    if (category) categories.add(category)
  })

  return Array.from(categories)
}

export async function getStoreRevenueAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
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
}

export async function getStoreExpensesAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
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
}

export async function getStoreProfitsAnalytics(
  store: StoreSheet,
  startDate?: string,
  endDate?: string
): Promise<number> {
  const revenue = await getStoreRevenueAnalytics(store, startDate, endDate)
  const expenses = await getStoreExpensesAnalytics(store, startDate, endDate)
  return revenue - expenses
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
