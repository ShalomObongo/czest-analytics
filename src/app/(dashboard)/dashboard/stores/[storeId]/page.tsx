import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PageProps {
  params: {
    storeId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getStoreData(storeId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stores/${storeId}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  })

  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch store data')
  }

  return res.json()
}

export default async function StorePage({ params }: PageProps) {
  const storeData = await getStoreData(params.storeId)

  if (!storeData) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {storeData.name}
        </h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Today&apos;s Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  KES {storeData.metrics.today.revenue}
                </div>
                <p className="text-xs text-emerald-400 mt-1">
                  {storeData.metrics.trends.revenue}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Today&apos;s Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  KES {storeData.metrics.today.expenses}
                </div>
                <p className="text-xs text-emerald-400 mt-1">
                  {storeData.metrics.trends.expenses}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Today&apos;s Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  KES {storeData.metrics.today.profit}
                </div>
                <p className="text-xs text-emerald-400 mt-1">
                  {storeData.metrics.trends.profit}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  Today&apos;s Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {storeData.metrics.today.sales}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="bg-slate-800/50 border-slate-700 col-span-4">
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">Revenue</p>
                        <p className="text-2xl font-bold text-white">
                          KES {storeData.metrics.weekly.revenue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">Expenses</p>
                        <p className="text-2xl font-bold text-white">
                          KES {storeData.metrics.weekly.expenses}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">Profit</p>
                        <p className="text-2xl font-bold text-white">
                          KES {storeData.metrics.weekly.profit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {storeData.transactions.recent.map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">
                          {transaction.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          <p className={`text-sm font-medium ${
                            transaction.type === 'REVENUE' 
                              ? 'text-emerald-400' 
                              : 'text-red-400'
                          }`}>
                            {transaction.type === 'REVENUE' ? '+' : '-'}
                            KES {transaction.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {storeData.transactions.revenue.map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">
                          {transaction.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium text-emerald-400">
                            +KES {transaction.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {storeData.transactions.expenses.map((transaction: any) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="w-full">
                        <p className="text-sm font-medium text-slate-200">
                          {transaction.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium text-red-400">
                            -KES {transaction.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle>Inventory Management Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400">
                Inventory tracking and management features will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
