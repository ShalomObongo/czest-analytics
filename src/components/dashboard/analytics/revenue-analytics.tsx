"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp } from "lucide-react"

interface RevenueAnalyticsProps {
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

export function RevenueAnalytics({ data, timeframe, onTimeframeChange }: RevenueAnalyticsProps) {
  // Calculate total revenue and average revenue
  const totalRevenue = data.stores.reduce((sum, store) => sum + store.revenue, 0)
  const averageRevenue = totalRevenue / data.stores.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Revenue Analysis</h3>
          <p className="text-sm text-slate-400">
            Detailed revenue metrics across all stores
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
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              KES {totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400">
              {data.period.startDate} to {data.period.endDate}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              KES {averageRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400">Per store</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Highest Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              KES {Math.max(...data.stores.map(s => s.revenue)).toFixed(2)}
            </div>
            <p className="text-xs text-slate-400">Best performing store</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Lowest Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              KES {Math.min(...data.stores.map(s => s.revenue)).toFixed(2)}
            </div>
            <p className="text-xs text-slate-400">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Revenue Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.stores.map((store) => (
              <div key={store.store} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-200">
                      {store.store}
                    </p>
                    <p className="text-sm text-slate-400">
                      KES {store.revenue.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-emerald-400">
                    {((store.revenue / totalRevenue) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{
                      width: `${(store.revenue / totalRevenue) * 100}%`,
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
