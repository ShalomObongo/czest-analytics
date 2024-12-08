import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreCard } from "@/components/dashboard/store-card"
import { Store } from "lucide-react"
import { STORE_SHEETS } from "@/lib/sheets/sheets.config"

async function getStoresData() {
  const storeIds = Object.keys(STORE_SHEETS).map(key => key.toLowerCase())
  const stores = await Promise.all(
    storeIds.map(async (id) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stores/${id}`, {
        next: { revalidate: 60 }, // Revalidate every minute
      })
      if (!res.ok) return null
      return res.json()
    })
  )

  return stores.filter(Boolean)
}

export default async function StoresPage() {
  const stores = await getStoresData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Stores</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stores.map((store) => (
          <StoreCard 
            key={store.id} 
            store={{
              id: store.id,
              name: store.name,
              revenue: store.metrics.today.revenue,
              sales: store.metrics.today.sales,
              trend: store.metrics.trends.revenue
            }} 
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card col-span-2">
          <CardHeader>
            <CardTitle>Store Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center">
                  <Store className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{store.name}</p>
                      <p className="text-sm text-purple-500">
                        {store.metrics.trends.revenue}
                      </p>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                        style={{
                          width: `${Math.min(
                            (parseFloat(store.metrics.today.revenue) / 200000) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Total Sales Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.metrics.today.sales, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all stores
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
