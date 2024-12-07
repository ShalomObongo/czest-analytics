import { NextResponse } from "next/server"
import { 
  getAllStoresMetrics, 
  getTransactions,
  type Transaction
} from "@/lib/sheets/data-processor"
import { STORE_SHEETS } from "@/lib/sheets/sheets.config"
import { formatDate, getCurrentDate } from "@/lib/utils"

interface StoreMetrics {
  store: string
  revenue: number
  expenses: number
  profit: number
}

export async function GET() {
  try {
    const today = getCurrentDate()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    let todayMetrics: StoreMetrics[] = []
    let yesterdayMetrics: StoreMetrics[] = []
    let recentTransactions: Transaction[] = []

    try {
      [todayMetrics, yesterdayMetrics, recentTransactions] = await Promise.all([
        getAllStoresMetrics(formatDate(today), formatDate(today)),
        getAllStoresMetrics(formatDate(yesterday), formatDate(yesterday)),
        getTransactions(STORE_SHEETS.KILIMANI, { 
          startDate: formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)), // Last 7 days
          endDate: formatDate(today)
        })
      ])
    } catch (error) {
      console.error("Error fetching metrics:", error)
      // Return empty data if metrics fetch fails
      todayMetrics = []
      yesterdayMetrics = []
      recentTransactions = []
    }

    // Calculate totals for today (with fallback to 0)
    const totalRevenue = todayMetrics.reduce((sum, store) => sum + (store.revenue || 0), 0)
    const totalExpenses = todayMetrics.reduce((sum, store) => sum + (store.expenses || 0), 0)
    const totalSales = todayMetrics.reduce((sum, store) => sum + ((store.revenue || 0) / 100), 0)
    const totalProfit = totalRevenue - totalExpenses

    // Calculate changes from yesterday (with fallback to 0)
    const yesterdayRevenue = yesterdayMetrics.reduce((sum, store) => sum + (store.revenue || 0), 0)
    const yesterdayExpenses = yesterdayMetrics.reduce((sum, store) => sum + (store.expenses || 0), 0)
    const yesterdayProfit = yesterdayRevenue - yesterdayExpenses

    const revenueChange = yesterdayRevenue ? ((totalRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 : 0
    const expenseChange = yesterdayExpenses ? ((totalExpenses - yesterdayExpenses) / yesterdayExpenses) * 100 : 0
    const profitChange = yesterdayProfit ? ((totalProfit - yesterdayProfit) / yesterdayProfit) * 100 : 0

    // Store specific metrics
    const storeMetrics = todayMetrics.map(store => {
      const yesterdayStore = yesterdayMetrics.find(s => s.store === store.store)
      const revenueTrend = yesterdayStore?.revenue
        ? ((store.revenue - yesterdayStore.revenue) / yesterdayStore.revenue) * 100
        : 0
      
      const expenseTrend = yesterdayStore?.expenses
        ? ((store.expenses - yesterdayStore.expenses) / yesterdayStore.expenses) * 100
        : 0

      const profit = (store.revenue || 0) - (store.expenses || 0)
      const yesterdayProfit = yesterdayStore 
        ? (yesterdayStore.revenue || 0) - (yesterdayStore.expenses || 0)
        : 0
      const profitTrend = yesterdayProfit
        ? ((profit - yesterdayProfit) / yesterdayProfit) * 100
        : 0

      return {
        name: store.store,
        revenue: (store.revenue || 0).toFixed(2),
        expenses: (store.expenses || 0).toFixed(2),
        profit: profit.toFixed(2),
        sales: Math.floor((store.revenue || 0) / 100), // Assuming average sale is 100 KES
        revenueTrend: revenueTrend > 0 ? `+${revenueTrend.toFixed(1)}%` : `${revenueTrend.toFixed(1)}%`,
        expenseTrend: expenseTrend > 0 ? `+${expenseTrend.toFixed(1)}%` : `${expenseTrend.toFixed(1)}%`,
        profitTrend: profitTrend > 0 ? `+${profitTrend.toFixed(1)}%` : `${profitTrend.toFixed(1)}%`
      }
    })

    return NextResponse.json({
      overview: {
        totalRevenue: totalRevenue.toFixed(2),
        totalExpenses: totalExpenses.toFixed(2),
        totalProfit: totalProfit.toFixed(2),
        totalSales: Math.floor(totalSales),
        activeCustomers: 573, // TODO: Implement customer tracking
        revenueChange: revenueChange > 0 ? `+${revenueChange.toFixed(1)}%` : `${revenueChange.toFixed(1)}%`,
        expenseChange: expenseChange > 0 ? `+${expenseChange.toFixed(1)}%` : `${expenseChange.toFixed(1)}%`,
        profitChange: profitChange > 0 ? `+${profitChange.toFixed(1)}%` : `${profitChange.toFixed(1)}%`
      },
      stores: storeMetrics,
      recentTransactions: (recentTransactions || []).slice(0, 5) // Last 5 transactions
    })
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
