import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, ShoppingCart, Droplets } from "lucide-react"

const stores = [
  {
    id: "kilimani",
    name: "Kilimani",
    revenue: "125,000",
    sales: 234,
    stock: 567,
    trend: "+12.5%",
  },
  {
    id: "southc",
    name: "South C",
    revenue: "98,500",
    sales: 189,
    stock: 432,
    trend: "+8.3%",
  },
  {
    id: "obama",
    name: "Obama",
    revenue: "78,900",
    sales: 156,
    stock: 345,
    trend: "+15.2%",
  },
  {
    id: "homabay",
    name: "Homa Bay",
    revenue: "112,300",
    sales: 198,
    stock: 489,
    trend: "+10.7%",
  },
]

export function StoreComparison() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES 414,700</div>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +11.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Sales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">777</div>
            <p className="text-xs text-blue-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.9% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Stock
            </CardTitle>
            <Droplets className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,833</div>
            <p className="text-xs text-slate-400">Across all stores</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Average Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES 103,675</div>
            <p className="text-xs text-slate-400">Per store</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Store Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stores.map((store) => (
                <div key={store.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {store.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {store.sales} sales • KES {store.revenue}
                      </p>
                    </div>
                    <p className="text-emerald-400">{store.trend}</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-emerald-400"
                      style={{
                        width: `${
                          (parseInt(store.revenue.replace(/,/g, "")) / 125000) * 100
                        }%`,
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
            <CardTitle className="text-slate-200">Stock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stores.map((store) => (
                <div key={store.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-200">
                        {store.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {store.stock} units in stock
                      </p>
                    </div>
                    <p className="text-cyan-400">{Math.round((store.stock / 1833) * 100)}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-cyan-400"
                      style={{
                        width: `${(store.stock / 567) * 100}%`,
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
