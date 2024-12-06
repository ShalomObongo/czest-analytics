import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertTriangle, CheckCircle2, Droplets } from "lucide-react"

interface StoreInventoryProps {
  storeId: string
}

const inventory = [
  {
    id: "1",
    name: "20L Bottle",
    type: "Refill",
    inStock: 250,
    target: 300,
    reorderPoint: 100,
    status: "OK",
  },
  {
    id: "2",
    name: "Full Crate",
    type: "New",
    inStock: 45,
    target: 100,
    reorderPoint: 50,
    status: "LOW",
  },
  {
    id: "3",
    name: "10L Bottle",
    type: "Refill",
    inStock: 150,
    target: 200,
    reorderPoint: 75,
    status: "OK",
  },
  {
    id: "4",
    name: "5L Bottle",
    type: "New",
    inStock: 30,
    target: 100,
    reorderPoint: 40,
    status: "LOW",
  },
]

export function StoreInventory({ storeId }: StoreInventoryProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Stock
            </CardTitle>
            <Droplets className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">475</div>
            <p className="text-xs text-slate-400">Across all products</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-slate-400">Items below reorder point</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-200">Product</TableHead>
                <TableHead className="text-slate-200">Type</TableHead>
                <TableHead className="text-right text-slate-200">In Stock</TableHead>
                <TableHead className="text-right text-slate-200">Target</TableHead>
                <TableHead className="text-right text-slate-200">
                  Reorder Point
                </TableHead>
                <TableHead className="text-right text-slate-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium text-slate-200">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="text-right">{item.inStock}</TableCell>
                  <TableCell className="text-right">{item.target}</TableCell>
                  <TableCell className="text-right">{item.reorderPoint}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        item.status === "OK"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {item.status === "OK" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      {item.status}
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
