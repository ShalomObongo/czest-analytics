import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShoppingCart, TrendingUp, Users, Clock } from "lucide-react"

const salesMetrics = [
  {
    title: "Total Sales",
    value: "1,234",
    trend: "+12.5%",
    icon: ShoppingCart,
    color: "text-blue-400",
  },
  {
    title: "Average Daily Sales",
    value: "41",
    trend: "+8.3%",
    icon: Clock,
    color: "text-purple-400",
  },
  {
    title: "Unique Customers",
    value: "856",
    trend: "+15.2%",
    icon: Users,
    color: "text-emerald-400",
  },
  {
    title: "Sales Growth",
    value: "23.4%",
    trend: "+5.7%",
    icon: TrendingUp,
    color: "text-amber-400",
  },
]

const salesByProduct = [
  { name: "20L Refill", sales: 567, percentage: 45 },
  { name: "Full Crate", sales: 378, percentage: 29 },
  { name: "10L Bottle", sales: 189, percentage: 18 },
  { name: "5L Bottle", sales: 100, percentage: 8 },
]

const peakHours = [
  { hour: "6 AM - 9 AM", sales: 234, percentage: 35 },
  { hour: "9 AM - 12 PM", sales: 189, percentage: 28 },
  { hour: "12 PM - 3 PM", sales: 156, percentage: 23 },
  { hour: "3 PM - 6 PM", sales: 98, percentage: 14 },
]

export function SalesAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Sales Analysis</h3>
          <p className="text-sm text-slate-400">
            Comprehensive view of sales performance
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-slate-200">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem
              value="7d"
              className="text-slate-200 focus:bg-slate-700 focus:text-slate-200"
            >
              Last 7 Days
            </SelectItem>
            <SelectItem
              value="30d"
              className="text-slate-200 focus:bg-slate-700 focus:text-slate-200"
            >
              Last 30 Days
            </SelectItem>
            <SelectItem
              value="3m"
              className="text-slate-200 focus:bg-slate-700 focus:text-slate-200"
            >
              Last 3 Months
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesMetrics.map((metric) => (
          <Card key={metric.title} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <p className={`text-xs ${metric.color} flex items-center gap-1`}>
                <TrendingUp className="h-3 w-3" />
                {metric.trend} from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Sales by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {salesByProduct.map((product) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {product.name}
                      </p>
                      <p className="text-sm text-slate-400">{product.sales} units sold</p>
                    </div>
                    <p className="text-blue-400">{product.percentage}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-400"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Peak Sales Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {peakHours.map((hour) => (
                <div key={hour.hour} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {hour.hour}
                      </p>
                      <p className="text-sm text-slate-400">{hour.sales} sales</p>
                    </div>
                    <p className="text-purple-400">{hour.percentage}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-purple-400"
                      style={{ width: `${hour.percentage}%` }}
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
