"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function TransactionInput() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const processNaturalLanguageInput = (input: string) => {
    // Basic pattern matching for now - can be enhanced with AI later
    const words = input.toLowerCase().split(" ")
    
    // Try to extract amount
    const amount = words.find(word => !isNaN(parseFloat(word)))
    if (!amount) return null

    // Try to identify store
    const stores = ["kilimani", "south c", "obama", "homa bay"]
    const store = stores.find(s => words.includes(s.toLowerCase()))
    if (!store) return null

    // Default to REVENUE type for now
    return {
      type: "REVENUE" as const,
      store: store.charAt(0).toUpperCase() + store.slice(1),
      amount: parseFloat(amount),
      description: input,
      category: "Sales", // Default category
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const transaction = processNaturalLanguageInput(input)
      if (!transaction) {
        toast({
          title: "Invalid Input",
          description: "Please include an amount and store name in your description",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) throw new Error("Failed to process transaction")

      toast({
        title: "Transaction Added",
        description: `Successfully recorded ${transaction.store} transaction`,
      })

      setInput("")
    } catch (error) {
      console.error("Error processing transaction:", error)
      toast({
        title: "Error",
        description: "Failed to process transaction",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter transaction details... (e.g., 'I made 5000 in Kilimani today')"
        className="flex-1 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
