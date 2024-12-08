"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-4 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: KES {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function StoreComparison({ data, timeframe, onTimeframeChange }: StoreComparisonProps) {
  // Prepare data for radar chart
  const radarData = data.stores.map((store) => ({
    store: store.store,
    revenue: (store.revenue / Math.max(...data.stores.map(s => s.revenue))) * 100,
    expenses: (store.expenses / Math.max(...data.stores.map(s => s.expenses))) * 100,
    profit: (store.profit / Math.max(...data.stores.map(s => s.profit))) * 100,
  }))

  // Calculate profit margins for line chart
  const profitMarginData = data.stores.map((store) => ({
    store: store.store,
    margin: (store.profit / store.revenue) * 100,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Store Comparison</h3>
          <p className="text-sm text-muted-foreground">
            Compare performance across all stores
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.stores}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="store" 
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tickFormatter={(value) => `KES ${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" />
                  <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid className="stroke-border" />
                  <PolarAngleAxis 
                    dataKey="store" 
                    className="text-muted-foreground"
                  />
                  <PolarRadiusAxis 
                    className="text-muted-foreground"
                    angle={30}
                  />
                  <Radar
                    name="Revenue"
                    dataKey="revenue"
                    stroke="hsl(var(--purple-500))"
                    fill="hsl(var(--purple-500))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Expenses"
                    dataKey="expenses"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Profit"
                    dataKey="profit"
                    stroke="hsl(var(--teal-500))"
                    fill="hsl(var(--teal-500))"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profit Margins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={profitMarginData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="store" 
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="margin"
                    name="Profit Margin"
                    stroke="hsl(var(--emerald-500))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--emerald-500))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Store Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.stores.map((store) => (
                <div key={store.store} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {store.store}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className="text-sm text-blue-500">
                        Revenue: KES {store.revenue.toFixed(2)}
                      </p>
                      <p className="text-sm text-destructive">
                        Expenses: KES {store.expenses.toFixed(2)}
                      </p>
                      <p className="text-sm text-emerald-500">
                        Profit: KES {store.profit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-500"
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
