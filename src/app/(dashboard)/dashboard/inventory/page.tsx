"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockManagement } from "@/components/dashboard/inventory/stock-management"
import { DeliveryManagement } from "@/components/dashboard/inventory/delivery-management"
import { ProductCategories } from "@/components/dashboard/inventory/product-categories"

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Inventory Management
        </h2>
      </div>

      <Tabs defaultValue="stock" className="space-y-6">
        <TabsList className="bg-slate-800/50 border-slate-700">
          <TabsTrigger value="stock" className="data-[state=active]:bg-slate-700">
            Stock
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="data-[state=active]:bg-slate-700">
            Deliveries
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-slate-700">
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-6">
          <StockManagement />
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-6">
          <DeliveryManagement />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <ProductCategories />
        </TabsContent>
      </Tabs>
    </div>
  )
}
