import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  TrendingDown,
  MinusCircle,
  PiggyBank
} from "lucide-react"

interface StoreOverviewProps {
  store: {
    name: string
    revenue: string
    expenses: string
    profit: string
    sales: number
    revenueTrend: string
    expenseTrend: string
    profitTrend: string
  }
}

export function StoreOverview({ store }: StoreOverviewProps) {
  const revenueTrendValue = parseFloat(store.revenueTrend)
  const expenseTrendValue = parseFloat(store.expenseTrend)
  const profitTrendValue = parseFloat(store.profitTrend)
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{store.name}</h3>
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
            <p className={`text-xs flex items-center gap-1 ${revenueTrendValue >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {revenueTrendValue >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {store.revenueTrend} from yesterday
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
            <p className="text-xs text-slate-400">Total transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Today&apos;s Expenses
            </CardTitle>
            <MinusCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {store.expenses}</div>
            <p className={`text-xs flex items-center gap-1 ${expenseTrendValue <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {expenseTrendValue <= 0 ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              {store.expenseTrend} from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Today&apos;s Profit
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">KES {store.profit}</div>
            <p className={`text-xs flex items-center gap-1 ${profitTrendValue >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {profitTrendValue >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {store.profitTrend} from yesterday
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
