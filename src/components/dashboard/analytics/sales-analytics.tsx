"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, TrendingUp } from "lucide-react"

interface SalesAnalyticsProps {
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

export function SalesAnalytics({ data, timeframe, onTimeframeChange }: SalesAnalyticsProps) {
  // Assuming average sale is 100 KES
  const AVERAGE_SALE = 100
  const totalSales = data.stores.reduce((sum, store) => sum + Math.floor(store.revenue / AVERAGE_SALE), 0)
  const averageSales = totalSales / data.stores.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Sales Analysis</h3>
          <p className="text-sm text-slate-400">
            Comprehensive view of sales performance
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
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalSales}</div>
            <p className="text-xs text-slate-400">
              {data.period.startDate} to {data.period.endDate}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.floor(averageSales)}
            </div>
            <p className="text-xs text-slate-400">Per store</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Highest Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.max(...data.stores.map(s => Math.floor(s.revenue / AVERAGE_SALE)))}
            </div>
            <p className="text-xs text-slate-400">Best performing store</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Lowest Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.min(...data.stores.map(s => Math.floor(s.revenue / AVERAGE_SALE)))}
            </div>
            <p className="text-xs text-slate-400">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Sales Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.stores.map((store) => {
              const storeSales = Math.floor(store.revenue / AVERAGE_SALE)
              return (
                <div key={store.store} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {store.store}
                      </p>
                      <p className="text-sm text-slate-400">
                        {storeSales} sales
                      </p>
                    </div>
                    <p className="text-blue-400">
                      {((storeSales / totalSales) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-400"
                      style={{
                        width: `${(storeSales / totalSales) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
