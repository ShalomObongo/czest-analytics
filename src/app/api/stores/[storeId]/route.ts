import { NextResponse } from "next/server"
import { 
  getTransactions,
  getStoreRevenue,
  getStoreExpenses,
  getStoreProfits,
  type Transaction
} from "@/lib/sheets/data-processor"
import { STORE_SHEETS, type StoreSheet } from "@/lib/sheets/sheets.config"
import { formatDate, getCurrentDate } from "@/lib/utils"

interface StoreParams {
  params: {
    storeId: string
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await the storeId parameter
    const storeId = params.storeId;
    const storeKey = storeId.toUpperCase() as keyof typeof STORE_SHEETS
    const storeName = STORE_SHEETS[storeKey]

    if (!storeName) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    const today = getCurrentDate()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // Get date range for weekly data
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - 7)

    // Fetch store metrics
    const [
      todayRevenue,
      todayExpenses,
      yesterdayRevenue,
      yesterdayExpenses,
      weeklyTransactions
    ] = await Promise.all([
      getStoreRevenue(storeName, formatDate(today), formatDate(today)),
      getStoreExpenses(storeName, formatDate(today), formatDate(today)),
      getStoreRevenue(storeName, formatDate(yesterday), formatDate(yesterday)),
      getStoreExpenses(storeName, formatDate(yesterday), formatDate(yesterday)),
      getTransactions(storeName, {
        startDate: formatDate(weekStart),
        endDate: formatDate(today)
      })
    ])

    // Calculate metrics
    const todayProfit = todayRevenue - todayExpenses
    const yesterdayProfit = yesterdayRevenue - yesterdayExpenses

    // Calculate trends
    const revenueTrend = yesterdayRevenue 
      ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
      : 0
    const expenseTrend = yesterdayExpenses 
      ? ((todayExpenses - yesterdayExpenses) / yesterdayExpenses) * 100 
      : 0
    const profitTrend = yesterdayProfit 
      ? ((todayProfit - yesterdayProfit) / yesterdayProfit) * 100 
      : 0

    // Group transactions by type
    const revenueTransactions = weeklyTransactions.filter((t: Transaction) => t.type === 'REVENUE')
    const expenseTransactions = weeklyTransactions.filter((t: Transaction) => t.type === 'EXPENSE')

    // Calculate weekly totals
    const weeklyRevenue = revenueTransactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0)
    const weeklyExpenses = expenseTransactions.reduce((sum: number, t: Transaction) => sum + t.amount, 0)
    const weeklyProfit = weeklyRevenue - weeklyExpenses

    return NextResponse.json({
      id: storeId,
      name: storeName,
      metrics: {
        today: {
          revenue: todayRevenue.toFixed(2),
          expenses: todayExpenses.toFixed(2),
          profit: todayProfit.toFixed(2),
          sales: Math.floor(todayRevenue / 100), // Assuming average sale is 100 KES
        },
        weekly: {
          revenue: weeklyRevenue.toFixed(2),
          expenses: weeklyExpenses.toFixed(2),
          profit: weeklyProfit.toFixed(2),
          sales: Math.floor(weeklyRevenue / 100),
        },
        trends: {
          revenue: revenueTrend > 0 ? `+${revenueTrend.toFixed(1)}%` : `${revenueTrend.toFixed(1)}%`,
          expenses: expenseTrend > 0 ? `+${expenseTrend.toFixed(1)}%` : `${expenseTrend.toFixed(1)}%`,
          profit: profitTrend > 0 ? `+${profitTrend.toFixed(1)}%` : `${profitTrend.toFixed(1)}%`,
        }
      },
      transactions: {
        recent: weeklyTransactions.slice(0, 5),
        revenue: revenueTransactions.slice(0, 5),
        expenses: expenseTransactions.slice(0, 5)
      }
    })
  } catch (error) {
    console.error('Store data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch store data' },
      { status: 500 }
    )
  }
}
