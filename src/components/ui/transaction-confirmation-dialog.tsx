"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  type ParsedTransaction, 
  type ParsedBatchResult, 
  type AnalyticsQuery 
} from "@/lib/gemini/transaction-parser"
import { formatDate, parseRelativeDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

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

interface TransactionConfirmationDialogProps {
  transaction: ParsedTransaction | ParsedBatchResult | null
  onConfirm: (transaction: ParsedTransaction | ParsedBatchResult) => Promise<void>
  onCancel: () => void
  analyticsResult?: AnalyticsResult | null
}

export function TransactionConfirmationDialog({
  transaction,
  onConfirm,
  onCancel,
  analyticsResult
}: TransactionConfirmationDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!transaction && !analyticsResult) return null

  const handleConfirm = async () => {
    if (!transaction) return
    setIsConfirming(true)
    try {
      await onConfirm(transaction)
    } finally {
      setIsConfirming(false)
    }
  }

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-500"
    if (confidence >= 0.6) return "bg-yellow-500"
    return "bg-red-500"
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount)
  }

  const renderTransaction = (t: ParsedTransaction) => {
    const date = t.date ? parseRelativeDate(t.date) : new Date()
    return (
      <div key={`${t.store}-${t.operation}-${t.amount}`} className="space-y-2 border-b pb-4 last:border-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{t.store}</h4>
          <Badge variant="outline" className={cn("ml-2", t.type === "REVENUE" ? "bg-green-100" : "bg-red-100")}>
            {t.type}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Operation: {t.operation}</p>
          <p>Date: {date ? formatDate(date) : 'N/A'}</p>
          {t.amount && <p>Amount: {formatAmount(t.amount)}</p>}
          {t.originalAmount && <p>Original Amount: {formatAmount(t.originalAmount)}</p>}
          {t.category && <p>Category: {t.category}</p>}
          {t.description && <p>Description: {t.description}</p>}
        </div>
      </div>
    )
  }

  const renderAnalytics = (result: AnalyticsResult) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{result.store || 'All Stores'}</h4>
          <Badge variant="outline" className={cn(
            "ml-2",
            result.metric === "REVENUE" ? "bg-green-100" : 
            result.metric === "EXPENSE" ? "bg-red-100" : 
            "bg-blue-100"
          )}>
            {result.metric}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Value: {formatAmount(result.value)}</p>
          <p>Period: {result.timeframe === "SPECIFIC_DATE" ? "Specific Date" : result.timeframe}</p>
          {result.period.startDate && (
            <p>
              {result.period.startDate === result.period.endDate 
                ? `Date: ${result.period.startDate}`
                : `From: ${result.period.startDate} To: ${result.period.endDate}`
              }
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={true} onOpenChange={() => !isConfirming && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {analyticsResult ? "Analytics Result" : "Confirm Transaction"}
            {transaction?.confidence && (
              <Badge className={cn("ml-2", getConfidenceBadgeColor(transaction.confidence))}>
                {Math.round(transaction.confidence * 100)}% Confident
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {analyticsResult 
              ? "Here are your analytics results:"
              : `Please review the following transaction${transaction?.type === "BATCH" ? "s" : ""} before confirming:`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {analyticsResult 
            ? renderAnalytics(analyticsResult)
            : transaction?.type === "BATCH" 
              ? transaction.transactions.map(renderTransaction)
              : transaction && renderTransaction(transaction as ParsedTransaction)
          }
        </div>

        <DialogFooter>
          {analyticsResult ? (
            <Button onClick={onCancel}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onCancel} disabled={isConfirming}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={isConfirming}>
                {isConfirming ? "Confirming..." : "Confirm"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
