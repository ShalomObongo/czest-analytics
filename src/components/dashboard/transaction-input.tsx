"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function TransactionInput() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      // TODO: Implement transaction processing
      console.log("Processing:", input)
      setInput("")
    } catch (error) {
      console.error("Error processing transaction:", error)
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
