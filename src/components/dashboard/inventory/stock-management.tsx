"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Droplets, AlertTriangle, Plus, Search } from "lucide-react"

const stockItems = [
  {
    id: "1",
    name: "20L Bottle",
    category: "Refill",
    inStock: 250,
    reorderPoint: 100,
    store: "Kilimani",
    status: "OK",
  },
  {
    id: "2",
    name: "Full Crate",
    category: "New",
    inStock: 45,
    reorderPoint: 50,
    store: "South C",
    status: "LOW",
  },
  {
    id: "3",
    name: "10L Bottle",
    category: "Refill",
    inStock: 150,
    reorderPoint: 75,
    store: "Obama",
    status: "OK",
  },
  {
    id: "4",
    name: "5L Bottle",
    category: "New",
    inStock: 30,
    reorderPoint: 40,
    store: "Homa Bay",
    status: "LOW",
  },
]

export function StockManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStore, setSelectedStore] = useState("all")

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStore === "all" || item.store === selectedStore)
  )

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
            <p className="text-xs text-slate-400">Across all stores</p>
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-slate-200">Stock Items</CardTitle>
            <div className="flex flex-1 gap-4 md:justify-end">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 md:w-60">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                  />
                </div>
                <Select
                  value={selectedStore}
                  onValueChange={setSelectedStore}
                >
                  <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      All Stores
                    </SelectItem>
                    <SelectItem value="Kilimani" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      Kilimani
                    </SelectItem>
                    <SelectItem value="South C" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      South C
                    </SelectItem>
                    <SelectItem value="Obama" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      Obama
                    </SelectItem>
                    <SelectItem value="Homa Bay" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      Homa Bay
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-200">Item Name</TableHead>
                <TableHead className="text-slate-200">Category</TableHead>
                <TableHead className="text-right text-slate-200">In Stock</TableHead>
                <TableHead className="text-right text-slate-200">
                  Reorder Point
                </TableHead>
                <TableHead className="text-slate-200">Store</TableHead>
                <TableHead className="text-right text-slate-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium text-slate-200">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.inStock}</TableCell>
                  <TableCell className="text-right">{item.reorderPoint}</TableCell>
                  <TableCell>{item.store}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        item.status === "OK"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {item.status === "OK" ? (
                        <Droplets className="h-4 w-4" />
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
