import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"
import { getSheetClient, getStoreSheet, STORE_SHEETS, type StoreSheet } from "./sheets.config"

export interface Transaction {
  id: string
  date: string
  type: "REVENUE" | "EXPENSE"
  amount: number
  description: string
  category: string
}

const COLUMNS = {
  ID: "ID",
  DATE: "Date",
  TYPE: "Type",
  AMOUNT: "Amount",
  DESCRIPTION: "Description",
  CATEGORY: "Category",
} as const

export async function addTransaction(store: StoreSheet, transaction: Transaction) {
  const sheet = await getStoreSheet(store)
  
  // Ensure headers exist
  const headers = sheet.headerValues
  if (!headers || headers.length === 0) {
    await sheet.setHeaderRow(Object.values(COLUMNS))
  }

  await sheet.addRow({
    [COLUMNS.ID]: transaction.id,
    [COLUMNS.DATE]: transaction.date,
    [COLUMNS.TYPE]: transaction.type,
    [COLUMNS.AMOUNT]: transaction.amount,
    [COLUMNS.DESCRIPTION]: transaction.description,
    [COLUMNS.CATEGORY]: transaction.category,
  })
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
      let match = true
      if (filters.type) match = match && row.get(COLUMNS.TYPE) === filters.type
      if (filters.category) match = match && row.get(COLUMNS.CATEGORY) === filters.category
      if (filters.startDate)
        match = match && new Date(row.get(COLUMNS.DATE)) >= new Date(filters.startDate)
      if (filters.endDate)
        match = match && new Date(row.get(COLUMNS.DATE)) <= new Date(filters.endDate)
      return match
    })
  }

  return rows.map((row) => ({
    id: row.get(COLUMNS.ID),
    date: row.get(COLUMNS.DATE),
    type: row.get(COLUMNS.TYPE) as "REVENUE" | "EXPENSE",
    amount: parseFloat(row.get(COLUMNS.AMOUNT)),
    description: row.get(COLUMNS.DESCRIPTION),
    category: row.get(COLUMNS.CATEGORY),
  }))
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
