"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { type ParsedTransaction, type ParsedBatchResult, type AnalyticsQuery, type ParsedResult } from "@/lib/gemini/transaction-parser"
import { TransactionConfirmationDialog } from "@/components/ui/transaction-confirmation-dialog"

interface AnalyticsResult {
  store?: string
  metric: "REVENUE" | "EXPENSE" | "PROFIT"
  value: number
  timeframe: AnalyticsQuery["timeframe"]
  period: {
    startDate?: string
    endDate?: string
  }
}

export function TransactionInput() {
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [parsedResult, setParsedResult] = useState<ParsedResult | null>(null)
  const [analyticsResult, setAnalyticsResult] = useState<AnalyticsResult | null>(null)

  const processAnalyticsQuery = async (query: AnalyticsQuery) => {
    const analyticsResponse = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    })

    if (!analyticsResponse.ok) {
      const error = await analyticsResponse.json()
      throw new Error(error.error || "Failed to fetch analytics")
    }

    const result = await analyticsResponse.json()
    setAnalyticsResult(result)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/transactions/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to parse input")
      }

      const parsed = await response.json()
      console.log("Parsed result:", parsed)

      // For analytics queries, send to analytics API
      if (parsed.type === "ANALYTICS") {
        await processAnalyticsQuery(parsed as AnalyticsQuery)
      } else {
        // For transactions, show confirmation dialog
        setParsedResult(parsed)
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process input",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = async (transaction: ParsedTransaction | ParsedBatchResult) => {
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save transaction")
      }

      toast({
        title: "Success",
        description: "Transaction saved successfully"
      })

      // Reset form
      setInput("")
      setParsedResult(null)
    } catch (error) {
      console.error("Save transaction error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save transaction",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setParsedResult(null)
    setAnalyticsResult(null)
    setInput("")
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Label htmlFor="transaction-input">Enter Transaction or Analytics Query</Label>
        <div className="flex space-x-2">
          <Input
            id="transaction-input"
            placeholder="e.g. 'Add sale of 5000 to Kilimani' or 'Show Kilimani revenue for this week'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <TransactionConfirmationDialog
        transaction={parsedResult && parsedResult.type !== "ANALYTICS" ? parsedResult : null}
        analyticsResult={analyticsResult}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}
