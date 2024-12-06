import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  ShoppingCart, 
  Droplets, 
  Users,
  TrendingUp,
  Clock,
  Package,
  Truck
} from "lucide-react"

interface StoreOverviewProps {
  store: {
    name: string
    revenue: string
    sales: number
    stock: number
    trend: string
  }
}

export function StoreOverview({ store }: StoreOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Today&apos;s Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {store.revenue}</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {store.trend} from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Today&apos;s Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{store.sales}</div>
            <p className="text-xs text-slate-400">23 pending deliveries</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Current Stock
            </CardTitle>
            <Droplets className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{store.stock}</div>
            <p className="text-xs text-slate-400">120 below target</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Active Orders
            </CardTitle>
            <Package className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-slate-400">12 urgent deliveries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-slate-500">
              Revenue chart will be implemented here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "20L Refill", sales: 156, revenue: "31,200" },
                { name: "Full Crate", sales: 89, revenue: "44,500" },
                { name: "10L Bottle", sales: 45, revenue: "13,500" },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-slate-200">{product.name}</p>
                    <p className="text-sm text-slate-400">{product.sales} sales</p>
                  </div>
                  <p className="text-emerald-400">KES {product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
