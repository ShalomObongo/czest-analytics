import { NextResponse } from "next/server"
import { 
  getStoreRevenue, 
  getStoreExpenses, 
  getStoreProfits,
  getAllStoresMetrics
} from "@/lib/sheets/data-processor"
import { type StoreSheet } from "@/lib/sheets/sheets.config"
import { type AnalyticsQuery } from "@/lib/gemini/transaction-parser"
import { formatDate, getCurrentDate, parseRelativeDate } from "@/lib/utils"

function getDateRange(timeframe: AnalyticsQuery["timeframe"], specificDate?: string) {
  const today = getCurrentDate()
  
  if (timeframe === "SPECIFIC_DATE" && specificDate) {
    const date = parseRelativeDate(specificDate)
    if (date) {
      const dateStr = formatDate(date)
      return {
        startDate: dateStr,
        endDate: dateStr
      }
    }
  }

  switch (timeframe) {
    case "TODAY":
      return {
        startDate: formatDate(today),
        endDate: formatDate(today)
      }
    case "THIS_WEEK": {
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6) // Saturday
      return {
        startDate: formatDate(startOfWeek),
        endDate: formatDate(endOfWeek)
      }
    }
    case "THIS_MONTH": {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      return {
        startDate: formatDate(startOfMonth),
        endDate: formatDate(endOfMonth)
      }
    }
    case "ALL_TIME":
    default:
      return {
        startDate: undefined,
        endDate: undefined
      }
  }
}

export async function POST(request: Request) {
  try {
    const query = await request.json() as AnalyticsQuery

    const { startDate, endDate } = getDateRange(query.timeframe, query.date)

    if (query.store) {
      // Single store metrics
      switch (query.metric) {
        case "REVENUE": {
          const revenue = await getStoreRevenue(query.store as StoreSheet, startDate, endDate)
          return NextResponse.json({ 
            store: query.store,
            metric: "REVENUE",
            value: revenue,
            timeframe: query.timeframe,
            period: { startDate, endDate }
          })
        }
        case "EXPENSE": {
          const expenses = await getStoreExpenses(query.store as StoreSheet, startDate, endDate)
          return NextResponse.json({ 
            store: query.store,
            metric: "EXPENSE",
            value: expenses,
            timeframe: query.timeframe,
            period: { startDate, endDate }
          })
        }
        case "PROFIT": {
          const profit = await getStoreProfits(query.store as StoreSheet, startDate, endDate)
          return NextResponse.json({ 
            store: query.store,
            metric: "PROFIT",
            value: profit,
            timeframe: query.timeframe,
            period: { startDate, endDate }
          })
        }
      }
    } else {
      // All stores metrics
      const metrics = await getAllStoresMetrics(startDate, endDate)
      return NextResponse.json({
        stores: metrics,
        timeframe: query.timeframe,
        period: { startDate, endDate }
      })
    }
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
