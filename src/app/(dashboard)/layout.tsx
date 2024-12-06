"use client"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { TransactionInput } from "@/components/dashboard/transaction-input"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-900">
          <div className="container mx-auto p-6 space-y-6">
            <TransactionInput />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
