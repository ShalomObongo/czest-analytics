import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, TrendingUp, ShoppingCart } from "lucide-react"

interface StoreCardProps {
  store: {
    id: string
    name: string
    revenue: string
    sales: number
    trend: string
  }
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/dashboard/stores/${store.id}`}>
      <Card className="bg-card hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">
            {store.name}
          </CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Revenue Today</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  KES {store.revenue}
                </span>
                <span className="text-xs text-emerald-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {store.trend}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Sales</span>
              </div>
              <p className="font-semibold ml-auto">{store.sales}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
