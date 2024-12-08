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
      <div className="bg-slate-800 p-4 border border-slate-700 rounded-lg shadow-lg">
        <p className="text-slate-200 font-medium">{label}</p>
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.stores}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="store" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => `KES ${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#60a5fa" />
                  <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis 
                    dataKey="store" 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <PolarRadiusAxis 
                    tick={{ fill: '#94a3b8' }}
                    angle={30}
                  />
                  <Radar
                    name="Revenue"
                    dataKey="revenue"
                    stroke="#60a5fa"
                    fill="#60a5fa"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Profit"
                    dataKey="profit"
                    stroke="#34d399"
                    fill="#34d399"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-200">Profit Margins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={profitMarginData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="store" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="margin"
                    name="Profit Margin"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={{ fill: '#34d399' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-200">Store Rankings</CardTitle>
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
                    <div className="flex gap-4">
                      <p className="text-sm text-blue-400">
                        Revenue: KES {store.revenue.toFixed(2)}
                      </p>
                      <p className="text-sm text-red-400">
                        Expenses: KES {store.expenses.toFixed(2)}
                      </p>
                      <p className="text-sm text-emerald-400">
                        Profit: KES {store.profit.toFixed(2)}
                      </p>
                    </div>
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
