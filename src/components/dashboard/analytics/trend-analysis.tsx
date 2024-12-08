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
          <h3 className="text-2xl font-bold">Performance Trends</h3>
          <p className="text-sm text-muted-foreground">
            Analyzing store performance metrics
          </p>
        </div>
        <Select 
          value={timeframe} 
          onValueChange={(value) => onTimeframeChange(value as "TODAY" | "THIS_WEEK" | "THIS_MONTH")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Best Performer
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestPerformer.store}</div>
            <p className="text-xs text-muted-foreground">
              {bestPerformer.profitMargin}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Needs Improvement
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{worstPerformer.store}</div>
            <p className="text-xs text-muted-foreground">
              {worstPerformer.profitMargin}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Profit Margin
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(storeMetrics.reduce((sum, store) => sum + parseFloat(store.profitMargin), 0) / storeMetrics.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Expense Ratio
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(storeMetrics.reduce((sum, store) => sum + parseFloat(store.expenseRatio), 0) / storeMetrics.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Of revenue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Store Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {storeMetrics.map((store) => (
              <div key={store.store} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {store.store}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Profit: {store.profitMargin}%</span>
                      <span>Expenses: {store.expenseRatio}%</span>
                      <span>Revenue Share: {store.revenueShare}%</span>
                    </div>
                  </div>
                  <TrendingUp className={`h-4 w-4 ${parseFloat(store.profitMargin) >= 20 ? 'text-emerald-500' : 'text-red-500'}`} />
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
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
