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
import { Package, Plus, Search, Settings } from "lucide-react"

const categories = [
  {
    id: "1",
    name: "Refill Bottles",
    description: "Water refill containers of various sizes",
    items: [
      "20L Bottle",
      "10L Bottle",
      "5L Bottle"
    ],
    totalStock: 430,
    reorderPoint: 215,
  },
  {
    id: "2",
    name: "New Bottles",
    description: "Fresh bottled water products",
    items: [
      "Full Crate",
      "500ml Pack",
      "1L Pack"
    ],
    totalStock: 285,
    reorderPoint: 142,
  },
  {
    id: "3",
    name: "Dispensers",
    description: "Water dispensing equipment",
    items: [
      "Hot & Cold Dispenser",
      "Normal Dispenser",
      "Stand"
    ],
    totalStock: 45,
    reorderPoint: 22,
  },
  {
    id: "4",
    name: "Accessories",
    description: "Additional water-related products",
    items: [
      "Water Pump",
      "Dispenser Parts",
      "Bottle Caps"
    ],
    totalStock: 150,
    reorderPoint: 75,
  },
]

export function ProductCategories() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Categories
            </CardTitle>
            <Package className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4</div>
            <p className="text-xs text-slate-400">Active product categories</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-slate-400">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-slate-200">Product Categories</CardTitle>
            <div className="flex flex-1 gap-4 md:justify-end">
              <div className="relative flex-1 md:w-60">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-200">Category Name</TableHead>
                <TableHead className="text-slate-200">Description</TableHead>
                <TableHead className="text-slate-200">Products</TableHead>
                <TableHead className="text-right text-slate-200">Total Stock</TableHead>
                <TableHead className="text-right text-slate-200">Reorder Point</TableHead>
                <TableHead className="text-right text-slate-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow
                  key={category.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium text-slate-200">
                    {category.name}
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.items.map((item, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{category.totalStock}</TableCell>
                  <TableCell className="text-right">{category.reorderPoint}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-slate-700"
                    >
                      <Settings className="h-4 w-4 text-slate-400" />
                    </Button>
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
