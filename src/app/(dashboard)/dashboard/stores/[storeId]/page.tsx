import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoreOverview } from "@/components/dashboard/store-overview"
import { StoreTransactions } from "@/components/dashboard/store-transactions"
import { StoreInventory } from "@/components/dashboard/store-inventory"

const stores = {
  kilimani: {
    name: "Kilimani",
    revenue: "125,000",
    sales: 234,
    stock: 567,
    trend: "+12.5%",
  },
  southc: {
    name: "South C",
    revenue: "98,500",
    sales: 189,
    stock: 432,
    trend: "+8.3%",
  },
  obama: {
    name: "Obama",
    revenue: "78,900",
    sales: 156,
    stock: 345,
    trend: "+15.2%",
  },
  homabay: {
    name: "Homa Bay",
    revenue: "112,300",
    sales: 198,
    stock: 489,
    trend: "+10.7%",
  },
}

interface StorePageProps {
  params: {
    storeId: string
  }
}

export default function StorePage({ params }: StorePageProps) {
  const store = stores[params.storeId as keyof typeof stores]

  if (!store) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {store.name} Store
        </h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-700">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-slate-700">
            Inventory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StoreOverview store={store} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <StoreTransactions storeId={params.storeId} />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <StoreInventory storeId={params.storeId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
