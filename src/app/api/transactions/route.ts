import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth.config"
import {
  addTransaction,
  getTransactions,
  Transaction,
  getAllStoresMetrics,
} from "@/lib/sheets/data-processor"
import { STORE_SHEETS, type StoreSheet } from "@/lib/sheets/sheets.config"
import { nanoid } from "nanoid"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { store, type, amount, description, category } = body

    if (!store || !type || !amount || !description || !category) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Validate store name
    if (!Object.values(STORE_SHEETS).includes(store as StoreSheet)) {
      return new NextResponse("Invalid store name", { status: 400 })
    }

    const transaction: Transaction = {
      id: nanoid(),
      date: new Date().toISOString(),
      type,
      amount,
      description,
      category,
    }

    await addTransaction(store as StoreSheet, transaction)

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("Transaction error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const store = searchParams.get("store")
    const type = searchParams.get("type") as "REVENUE" | "EXPENSE" | null
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const metrics = searchParams.get("metrics") === "true"

    // If metrics is requested, return metrics for all stores
    if (metrics) {
      const allMetrics = await getAllStoresMetrics(startDate || undefined, endDate || undefined)
      return NextResponse.json(allMetrics)
    }

    // Validate store name for transactions request
    if (!store || !Object.values(STORE_SHEETS).includes(store as StoreSheet)) {
      return new NextResponse("Invalid store name", { status: 400 })
    }

    const transactions = await getTransactions(store as StoreSheet, {
      type: type || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Get transactions error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
