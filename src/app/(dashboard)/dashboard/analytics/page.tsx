"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueAnalytics } from "@/components/dashboard/analytics/revenue-analytics"
import { SalesAnalytics } from "@/components/dashboard/analytics/sales-analytics"
import { StoreComparison } from "@/components/dashboard/analytics/store-comparison"
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis"

type TimeFrame = "TODAY" | "THIS_WEEK" | "THIS_MONTH"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<TimeFrame>("THIS_WEEK")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeframe,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch analytics data')
        }

        const analyticsData = await response.json()
        setData(analyticsData)
        setError(null)
      } catch (err) {
        console.error('Analytics fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeframe])

  const handleTimeframeChange = (newTimeframe: TimeFrame) => {
    setTimeframe(newTimeframe)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-400 text-center">
          <p className="text-lg font-semibold">Error loading analytics</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Analytics</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-700">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-slate-700">
            Sales
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StoreComparison 
            data={data} 
            timeframe={timeframe} 
            onTimeframeChange={handleTimeframeChange} 
          />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueAnalytics 
            data={data} 
            timeframe={timeframe} 
            onTimeframeChange={handleTimeframeChange} 
          />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <SalesAnalytics 
            data={data} 
            timeframe={timeframe} 
            onTimeframeChange={handleTimeframeChange} 
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysis 
            data={data} 
            timeframe={timeframe} 
            onTimeframeChange={handleTimeframeChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
