"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store } from "lucide-react"

interface StoreComparisonProps {
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

export function StoreComparison({ data, timeframe, onTimeframeChange }: StoreComparisonProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Store Comparison</h3>
          <p className="text-sm text-slate-400">
            Compare performance across all stores
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

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.stores.map((store) => (
                <div key={store.store} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-blue-400" />
                      <p className="text-sm font-medium text-slate-200">
                        {store.store}
                      </p>
                    </div>
                    <p className="text-sm text-blue-400">
                      KES {store.revenue.toFixed(2)}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-400"
                      style={{
                        width: `${Math.min(
                          (store.revenue / Math.max(...data.stores.map(s => s.revenue))) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Profit Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.stores.map((store) => (
                <div key={store.store} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-emerald-400" />
                      <p className="text-sm font-medium text-slate-200">
                        {store.store}
                      </p>
                    </div>
                    <p className="text-sm text-emerald-400">
                      KES {store.profit.toFixed(2)}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{
                        width: `${Math.min(
                          (store.profit / Math.max(...data.stores.map(s => s.profit))) * 100,
                          100
                        )}%`,
                      }}
                    />
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
