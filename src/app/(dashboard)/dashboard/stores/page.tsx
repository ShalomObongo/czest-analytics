import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreCard } from "@/components/dashboard/store-card"
import { Store } from "lucide-react"

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

export default function StoresPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">Stores</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Store Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-slate-500">
            Store comparison chart will be implemented here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
