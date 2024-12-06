import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

interface StoreTransactionsProps {
  storeId: string
}

const transactions = [
  {
    id: "1",
    type: "REVENUE",
    description: "20L Refill x10",
    amount: 2000,
    date: "2024-01-20 14:30",
    category: "Sales",
  },
  {
    id: "2",
    type: "EXPENSE",
    description: "Fuel for delivery bike",
    amount: 500,
    date: "2024-01-20 12:15",
    category: "Transport",
  },
  {
    id: "3",
    type: "REVENUE",
    description: "Full Crate x5",
    amount: 2500,
    date: "2024-01-20 10:45",
    category: "Sales",
  },
  {
    id: "4",
    type: "EXPENSE",
    description: "Maintenance",
    amount: 1000,
    date: "2024-01-20 09:30",
    category: "Maintenance",
  },
]

export function StoreTransactions({ storeId }: StoreTransactionsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-200">Type</TableHead>
                <TableHead className="text-slate-200">Description</TableHead>
                <TableHead className="text-slate-200">Category</TableHead>
                <TableHead className="text-slate-200">Date</TableHead>
                <TableHead className="text-right text-slate-200">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      {transaction.type === "REVENUE" ? (
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        transaction.type === "REVENUE"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      KES {transaction.amount}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
