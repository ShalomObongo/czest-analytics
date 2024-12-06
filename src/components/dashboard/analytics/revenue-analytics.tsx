import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DollarSign, TrendingUp } from "lucide-react"

const timeRanges = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last Year", value: "1y" },
]

const revenueBreakdown = [
  { category: "20L Refill", amount: 245000, percentage: 45 },
  { category: "Full Crate", amount: 158000, percentage: 29 },
  { category: "10L Bottle", amount: 98000, percentage: 18 },
  { category: "5L Bottle", amount: 43700, percentage: 8 },
]

export function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Revenue Analysis</h3>
          <p className="text-sm text-slate-400">
            Detailed breakdown of revenue across all stores
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-slate-200">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {timeRanges.map((range) => (
              <SelectItem
                key={range.value}
                value={range.value}
                className="text-slate-200 focus:bg-slate-700 focus:text-slate-200"
              >
                {range.label}
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
            <div className="text-2xl font-bold text-white">KES 544,700</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15.2% from previous period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Daily Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES 18,156</div>
            <p className="text-xs text-blue-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.9% daily average
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Revenue per Sale
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES 701</div>
            <p className="text-xs text-purple-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.3% per transaction
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Projected Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES 625,800</div>
            <p className="text-xs text-amber-400">Next 30 days forecast</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {revenueBreakdown.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {item.category}
                      </p>
                      <p className="text-sm text-slate-400">
                        KES {item.amount.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-emerald-400">{item.percentage}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{ width: `${item.percentage}%` }}
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
