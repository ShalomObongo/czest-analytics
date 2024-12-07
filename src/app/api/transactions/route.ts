import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth.config"
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  type Transaction,
} from "@/lib/sheets/data-processor"
import { STORE_SHEETS, type StoreSheet } from "@/lib/sheets/sheets.config"
import { type ParsedTransaction, type ParsedBatchResult } from "@/lib/gemini/transaction-parser"
import { parseRelativeDate, formatDate } from "@/lib/utils"

async function processTransaction(transaction: ParsedTransaction) {
  // Validate required fields
  if (!transaction.store || !transaction.type || !transaction.operation) {
    throw new Error("Missing required fields")
  }

  // Validate store name
  if (!Object.values(STORE_SHEETS).includes(transaction.store)) {
    throw new Error(`Invalid store name. Must be one of: ${Object.values(STORE_SHEETS).join(", ")}`)
  }

  // Validate transaction type
  if (!["REVENUE", "EXPENSE"].includes(transaction.type)) {
    throw new Error("Transaction type must be REVENUE or EXPENSE")
  }

  // Parse date if provided
  let date = undefined
  if (transaction.date) {
    date = parseRelativeDate(transaction.date)
    if (!date) {
      throw new Error("Invalid date format")
    }
  }

  switch (transaction.operation) {
    case "ADD": {
      if (typeof transaction.amount !== "number" || transaction.amount <= 0) {
        throw new Error("Amount must be a positive number")
      }

      return await addTransaction(
        transaction.store as StoreSheet,
        {
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description || "",
          category: transaction.category || "",
        },
        date
      )
    }

    case "DELETE": {
      if (!date) {
        throw new Error("Date is required for delete operation")
      }

      return await deleteTransaction(
        transaction.store as StoreSheet,
        formatDate(date),
        transaction.type
      )
    }

    case "UPDATE": {
      if (!date) {
        throw new Error("Date is required for update operation")
      }

      if (typeof transaction.amount !== "number" || transaction.amount <= 0) {
        throw new Error("New amount must be a positive number")
      }

      return await updateTransaction(
        transaction.store as StoreSheet,
        formatDate(date),
        transaction.type,
        transaction.amount
      )
    }

    default:
      throw new Error(`Invalid operation: ${transaction.operation}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    // Handle batch transactions
    if (body.type === "BATCH" && Array.isArray(body.transactions)) {
      const results = []
      const errors = []

      for (const transaction of body.transactions) {
        try {
          const result = await processTransaction(transaction)
          results.push({ transaction, result, success: true })
        } catch (error) {
          errors.push({ 
            transaction, 
            error: error instanceof Error ? error.message : "Unknown error",
            success: false 
          })
        }
      }

      return NextResponse.json({
        results,
        errors,
        success: errors.length === 0,
        message: errors.length > 0 
          ? `${results.length} transactions succeeded, ${errors.length} failed` 
          : `${results.length} transactions succeeded`
      })
    }

    // Handle single transaction
    const result = await processTransaction(body as ParsedTransaction)
    return NextResponse.json(result)

  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process transaction" },
      { status: 400 }
    )
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
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!store || !Object.values(STORE_SHEETS).includes(store as StoreSheet)) {
      return NextResponse.json(
        { error: `Invalid store name. Must be one of: ${Object.values(STORE_SHEETS).join(", ")}` },
        { status: 400 }
      )
    }

    const transactions = await getTransactions(
      store as StoreSheet,
      { startDate: startDate || undefined, endDate: endDate || undefined }
    )

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Get transactions error:", error)
    return NextResponse.json(
      { error: "Failed to get transactions" },
      { status: 500 }
    )
  }
}
