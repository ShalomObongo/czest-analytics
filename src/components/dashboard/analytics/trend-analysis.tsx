"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TrendAnalysisProps {
  data: {
    stores: Array<{
      store: string
      revenue: number
      expenses: number
      profit: number
    }>
    timeframe: string
    period: {
      startDate: string
      endDate: string
    }
  }
  timeframe: "TODAY" | "THIS_WEEK" | "THIS_MONTH"
  onTimeframeChange: (timeframe: "TODAY" | "THIS_WEEK" | "THIS_MONTH") => void
}

const timeframeOptions = [
  { value: "TODAY", label: "Today" },
  { value: "THIS_WEEK", label: "This Week" },
  { value: "THIS_MONTH", label: "This Month" },
]

export function TrendAnalysis({ data, timeframe, onTimeframeChange }: TrendAnalysisProps) {
  // Calculate store performance metrics
  const storeMetrics = data.stores.map(store => ({
    store: store.store,
    profitMargin: ((store.profit / store.revenue) * 100).toFixed(1),
    expenseRatio: ((store.expenses / store.revenue) * 100).toFixed(1),
    revenueShare: ((store.revenue / data.stores.reduce((sum, s) => sum + s.revenue, 0)) * 100).toFixed(1)
  }))

  // Sort stores by profit margin
  const sortedByProfitMargin = [...storeMetrics].sort((a, b) => parseFloat(b.profitMargin) - parseFloat(a.profitMargin))
  const bestPerformer = sortedByProfitMargin[0]
  const worstPerformer = sortedByProfitMargin[sortedByProfitMargin.length - 1]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Performance Trends</h3>
          <p className="text-sm text-slate-400">
            Analyzing store performance metrics
          </p>
        </div>
        <Select 
          value={timeframe} 
          onValueChange={(value) => onTimeframeChange(value as "TODAY" | "THIS_WEEK" | "THIS_MONTH")}
        >
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-slate-200">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {timeframeOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-slate-200 focus:bg-slate-700 focus:text-slate-200"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Best Profit Margin
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {bestPerformer.profitMargin}%
            </div>
            <p className="text-xs text-slate-400">{bestPerformer.store}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Lowest Profit Margin
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {worstPerformer.profitMargin}%
            </div>
            <p className="text-xs text-slate-400">{worstPerformer.store}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Profit Margin
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(storeMetrics.reduce((sum, store) => sum + parseFloat(store.profitMargin), 0) / storeMetrics.length).toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400">Across all stores</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Expense Ratio
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(storeMetrics.reduce((sum, store) => sum + parseFloat(store.expenseRatio), 0) / storeMetrics.length).toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400">Of revenue</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Store Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {storeMetrics.map((store) => (
              <div key={store.store} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-200">
                      {store.store}
                    </p>
                    <div className="flex gap-4 text-sm text-slate-400">
                      <span>Profit: {store.profitMargin}%</span>
                      <span>Expenses: {store.expenseRatio}%</span>
                      <span>Revenue Share: {store.revenueShare}%</span>
                    </div>
                  </div>
                  <TrendingUp className={`h-4 w-4 ${parseFloat(store.profitMargin) >= 20 ? 'text-emerald-400' : 'text-red-400'}`} />
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{
                      width: `${store.profitMargin}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
