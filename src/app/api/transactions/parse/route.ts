import { NextResponse } from "next/server"
import { getGeminiModel } from "@/lib/gemini/gemini.config"
import { STORE_SHEETS } from "@/lib/sheets/sheets.config"
import { 
  PROMPT_TEMPLATE, 
  TRANSACTION_CATEGORIES,
  type ParsedTransaction,
  type AnalyticsQuery,
  type ParsedResult,
  type ParsedBatchResult
} from "@/lib/gemini/transaction-parser"

function cleanJsonResponse(text: string): string {
  // Remove markdown code block if present
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/)
  if (jsonMatch) {
    return jsonMatch[1].trim()
  }
  return text.trim()
}

export async function POST(request: Request) {
  try {
    const { input } = await request.json()

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      )
    }

    const model = getGeminiModel()
    const prompt = PROMPT_TEMPLATE.replace("{input}", input)
    
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      console.log("AI Response:", text)

      try {
        const cleanedText = cleanJsonResponse(text)
        console.log("Cleaned Text:", cleanedText)
        
        const parsed = JSON.parse(cleanedText) as ParsedResult
        console.log("Parsed Response:", parsed)

        // For analytics queries, just validate the store name and return
        if (parsed.type === "ANALYTICS") {
          if (parsed.store && !Object.values(STORE_SHEETS).includes(parsed.store)) {
            return NextResponse.json(
              { error: `Invalid store name: ${parsed.store}. Must be one of: ${Object.values(STORE_SHEETS).join(", ")}` },
              { status: 422 }
            )
          }
          return NextResponse.json(parsed)
        }

        // Handle batch transactions
        if (parsed.type === "BATCH") {
          // Validate each transaction in the batch
          for (const transaction of parsed.transactions) {
            if (!Object.values(STORE_SHEETS).includes(transaction.store)) {
              return NextResponse.json(
                { error: `Invalid store name: ${transaction.store}. Must be one of: ${Object.values(STORE_SHEETS).join(", ")}` },
                { status: 422 }
              )
            }

            if (!["REVENUE", "EXPENSE"].includes(transaction.type)) {
              return NextResponse.json(
                { error: `Invalid transaction type: ${transaction.type}. Must be REVENUE or EXPENSE` },
                { status: 422 }
              )
            }

            if (["ADD", "UPDATE"].includes(transaction.operation)) {
              if (typeof transaction.amount !== "number" || transaction.amount <= 0) {
                return NextResponse.json(
                  { error: `Invalid amount: ${transaction.amount}. Must be a positive number` },
                  { status: 422 }
                )
              }
            }

            if (transaction.operation === "ADD") {
              const validCategories = transaction.type === "REVENUE" 
                ? TRANSACTION_CATEGORIES.REVENUE 
                : TRANSACTION_CATEGORIES.EXPENSE
              if (!validCategories.includes(transaction.category as never)) {
                return NextResponse.json(
                  { error: `Invalid category: ${transaction.category}. Must be one of: ${validCategories.join(", ")}` },
                  { status: 422 }
                )
              }
            }
          }

          return NextResponse.json(parsed)
        }
        
        // Handle single transaction
        if (!Object.values(STORE_SHEETS).includes(parsed.store)) {
          console.log("Invalid store:", parsed.store, "Valid stores:", Object.values(STORE_SHEETS))
          return NextResponse.json(
            { error: `Invalid store name: ${parsed.store}. Must be one of: ${Object.values(STORE_SHEETS).join(", ")}` },
            { status: 422 }
          )
        }

        if (!["REVENUE", "EXPENSE"].includes(parsed.type)) {
          return NextResponse.json(
            { error: `Invalid transaction type: ${parsed.type}. Must be REVENUE or EXPENSE` },
            { status: 422 }
          )
        }

        if (!["ADD", "DELETE", "UPDATE"].includes(parsed.operation)) {
          return NextResponse.json(
            { error: `Invalid operation: ${parsed.operation}. Must be ADD, DELETE, or UPDATE` },
            { status: 422 }
          )
        }

        // Validate amount only for ADD and UPDATE operations
        if (["ADD", "UPDATE"].includes(parsed.operation)) {
          if (typeof parsed.amount !== "number" || parsed.amount <= 0) {
            return NextResponse.json(
              { error: `Invalid amount: ${parsed.amount}. Must be a positive number` },
              { status: 422 }
            )
          }
        }

        // Validate category only for ADD operation
        if (parsed.operation === "ADD") {
          const validCategories = parsed.type === "REVENUE" 
            ? TRANSACTION_CATEGORIES.REVENUE 
            : TRANSACTION_CATEGORIES.EXPENSE
          if (!validCategories.includes(parsed.category as never)) {
            return NextResponse.json(
              { error: `Invalid category: ${parsed.category}. Must be one of: ${validCategories.join(", ")}` },
              { status: 422 }
            )
          }
        }

        if (
          typeof parsed.confidence !== "number" ||
          parsed.confidence < 0 ||
          parsed.confidence > 1
        ) {
          return NextResponse.json(
            { error: `Invalid confidence: ${parsed.confidence}. Must be between 0 and 1` },
            { status: 422 }
          )
        }

        return NextResponse.json(parsed)
      } catch (e) {
        console.error("JSON Parse Error:", e, "Raw Text:", text)
        return NextResponse.json(
          { error: "Failed to parse AI response as JSON" },
          { status: 422 }
        )
      }
    } catch (e) {
      console.error("AI Generation Error:", e)
      return NextResponse.json(
        { error: "Failed to generate AI response" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Parse error:", error)
    return NextResponse.json(
      { error: "Failed to parse request" },
      { status: 400 }
    )
  }
}
