import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

const trends = [
  {
    category: "Revenue Growth",
    current: "+15.2%",
    previous: "+12.8%",
    status: "up",
    insight: "Consistent growth trend, exceeding targets",
  },
  {
    category: "Customer Retention",
    current: "78.5%",
    previous: "75.2%",
    status: "up",
    insight: "Improved customer loyalty",
  },
  {
    category: "Average Order Value",
    current: "701",
    previous: "685",
    status: "up",
    insight: "Higher value purchases",
  },
  {
    category: "Stock Turnover",
    current: "4.2x",
    previous: "4.5x",
    status: "down",
    insight: "Slight decrease in inventory efficiency",
  },
]

const insights = [
  {
    title: "Peak Hours Shift",
    description: "Morning sales (6 AM - 9 AM) have increased by 25%",
    impact: "high",
    action: "Consider increasing morning staff",
  },
  {
    title: "Product Mix Change",
    description: "20L refills now account for 45% of revenue, up from 38%",
    impact: "medium",
    action: "Optimize inventory for high-demand items",
  },
  {
    title: "Seasonal Pattern",
    description: "Sales spike during hot weather periods",
    impact: "high",
    action: "Prepare inventory for upcoming season",
  },
  {
    title: "Customer Behavior",
    description: "85% of customers prefer mobile payments",
    impact: "medium",
    action: "Streamline mobile payment process",
  },
]

export function TrendAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Trend Analysis</h3>
          <p className="text-sm text-slate-400">
            Key trends and business insights
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Key Metrics Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trends.map((trend) => (
                <div
                  key={trend.category}
                  className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-slate-200">{trend.category}</p>
                    <p className="text-sm text-slate-400">Previous: {trend.previous}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium flex items-center gap-1 ${
                        trend.status === "up"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {trend.status === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {trend.current}
                    </p>
                    <p className="text-sm text-slate-400">{trend.insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Business Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {insights.map((insight) => (
                <div
                  key={insight.title}
                  className="border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        insight.impact === "high"
                          ? "text-amber-400"
                          : "text-blue-400"
                      }`}
                    />
                    <p className="font-medium text-slate-200">{insight.title}</p>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    {insight.description}
                  </p>
                  <p className="text-sm text-slate-500">
                    Recommended Action: {insight.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
