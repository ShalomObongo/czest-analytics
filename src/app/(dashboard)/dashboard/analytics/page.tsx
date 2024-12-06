"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueAnalytics } from "@/components/dashboard/analytics/revenue-analytics"
import { SalesAnalytics } from "@/components/dashboard/analytics/sales-analytics"
import { StoreComparison } from "@/components/dashboard/analytics/store-comparison"
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis"

export default function AnalyticsPage() {
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
          <StoreComparison />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueAnalytics />
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <SalesAnalytics />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
