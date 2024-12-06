import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, TrendingUp, ShoppingCart, Droplets } from "lucide-react"

interface StoreCardProps {
  store: {
    id: string
    name: string
    revenue: string
    sales: number
    stock: number
    trend: string
  }
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/dashboard/stores/${store.id}`}>
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium text-slate-200">
            {store.name}
          </CardTitle>
          <Store className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Revenue</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">
                  KES {store.revenue}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {store.trend}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm">Sales</span>
                </div>
                <p className="text-white font-semibold">{store.sales}</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Droplets className="h-4 w-4" />
                  <span className="text-sm">Stock</span>
                </div>
                <p className="text-white font-semibold">{store.stock}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
