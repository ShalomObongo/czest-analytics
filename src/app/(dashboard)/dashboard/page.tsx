"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreOverview } from "@/components/dashboard/store-overview"
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  Droplets,
  MinusCircle,
} from "lucide-react"

interface DashboardData {
  overview: {
    totalRevenue: string
    totalExpenses: string
    totalProfit: string
    totalSales: number
    activeCustomers: number
    revenueChange: string
    expenseChange: string
    profitChange: string
  }
  stores: Array<{
    name: string
    revenue: string
    expenses: string
    profit: string
    sales: number
    revenueTrend: string
    expenseTrend: string
    profitTrend: string
  }>
  recentTransactions: Array<{
    id: string
    date: string
    type: "REVENUE" | "EXPENSE"
    amount: number
    description: string
    category: string
  }>
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard")
        if (!response.ok) throw new Error("Failed to fetch dashboard data")
        const dashboardData = await response.json()
        setData(dashboardData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  if (!data) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {data.overview.totalRevenue}</div>
            <p className="text-xs text-slate-400">{data.overview.revenueChange} from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+{data.overview.totalSales}</div>
            <p className="text-xs text-slate-400">Today&apos;s total sales</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Expenses
            </CardTitle>
            <MinusCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {data.overview.totalExpenses}</div>
            <p className="text-xs text-slate-400">{data.overview.expenseChange} from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Profit
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {data.overview.totalProfit}</div>
            <p className="text-xs text-slate-400">{data.overview.profitChange} from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Store Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {data.stores.map((store) => (
              <StoreOverview key={store.name} store={store} />
            ))}
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-200">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-slate-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={transaction.type === "REVENUE" ? "text-emerald-400" : "text-red-400"}>
                    {transaction.type === "REVENUE" ? "+" : "-"}KES {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
