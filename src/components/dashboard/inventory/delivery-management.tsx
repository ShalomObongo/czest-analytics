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
import { Truck, Clock, CheckCircle2, AlertTriangle, Plus, Search } from "lucide-react"

const deliveries = [
  {
    id: "1",
    orderNumber: "DEL-001",
    store: "Kilimani",
    items: "20L Bottle x10",
    status: "In Transit",
    eta: "2024-01-20 15:30",
    driver: "John Doe",
  },
  {
    id: "2",
    orderNumber: "DEL-002",
    store: "South C",
    items: "Full Crate x5",
    status: "Delivered",
    eta: "2024-01-20 14:00",
    driver: "Jane Smith",
  },
  {
    id: "3",
    orderNumber: "DEL-003",
    store: "Obama",
    items: "10L Bottle x15",
    status: "Pending",
    eta: "2024-01-20 16:45",
    driver: "Mike Johnson",
  },
  {
    id: "4",
    orderNumber: "DEL-004",
    store: "Homa Bay",
    items: "5L Bottle x20",
    status: "In Transit",
    eta: "2024-01-20 17:30",
    driver: "Sarah Wilson",
  },
]

export function DeliveryManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      (delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.store.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedStatus === "all" || delivery.status === selectedStatus)
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      case "In Transit":
        return <Truck className="h-4 w-4 text-blue-400" />
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-400" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Active Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-slate-400">In transit</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              Pending Deliveries
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1</div>
            <p className="text-xs text-slate-400">Awaiting dispatch</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-slate-200">Delivery Status</CardTitle>
            <div className="flex flex-1 gap-4 md:justify-end">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 md:w-60">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search deliveries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                  />
                </div>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px] bg-slate-900/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      All Status
                    </SelectItem>
                    <SelectItem value="In Transit" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      In Transit
                    </SelectItem>
                    <SelectItem value="Delivered" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      Delivered
                    </SelectItem>
                    <SelectItem value="Pending" className="text-slate-200 focus:bg-slate-700 focus:text-slate-200">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Delivery
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-200">Order #</TableHead>
                <TableHead className="text-slate-200">Store</TableHead>
                <TableHead className="text-slate-200">Items</TableHead>
                <TableHead className="text-slate-200">Driver</TableHead>
                <TableHead className="text-slate-200">ETA</TableHead>
                <TableHead className="text-right text-slate-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <TableRow
                  key={delivery.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell className="font-medium text-slate-200">
                    {delivery.orderNumber}
                  </TableCell>
                  <TableCell>{delivery.store}</TableCell>
                  <TableCell>{delivery.items}</TableCell>
                  <TableCell>{delivery.driver}</TableCell>
                  <TableCell>{delivery.eta}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1">
                      {getStatusIcon(delivery.status)}
                      {delivery.status}
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
