import { STORE_SHEETS, type StoreSheet } from "../sheets/sheets.config"

export type TransactionOperation = "ADD" | "DELETE" | "UPDATE"

export interface ParsedTransaction {
  store: StoreSheet
  type: "REVENUE" | "EXPENSE"
  amount: number
  description: string
  category: string
  confidence: number
  operation: TransactionOperation
  date?: string // For specific date transactions
  originalAmount?: number // For updates
}

export interface AnalyticsQuery {
  type: "ANALYTICS"
  store?: StoreSheet
  metric: "REVENUE" | "EXPENSE" | "PROFIT"
  date?: string
  timeframe: "SPECIFIC_DATE" | "TODAY" | "THIS_WEEK" | "THIS_MONTH" | "ALL_TIME"
  confidence: number
}

export interface ParsedBatchResult {
  type: "BATCH"
  transactions: ParsedTransaction[]
  confidence: number
}

export type ParsedResult = ParsedTransaction | AnalyticsQuery | ParsedBatchResult

export const TRANSACTION_CATEGORIES = {
  REVENUE: [
    "Sales",           // Regular water sales
    "Delivery",        // Delivery fees
    "Deposits",        // Container deposits
    "Rental",          // Dispenser rentals
    "Other Income"     // Miscellaneous revenue
  ],
  EXPENSE: [
    "Transport",       // Fuel and vehicle expenses
    "Maintenance",     // Equipment and facility maintenance
    "Utilities",       // Water, electricity, etc.
    "Salary",         // Staff payments
    "Supplies",       // Office and cleaning supplies
    "Marketing",      // Advertising and promotions
    "Rent",           // Store rent
    "Equipment",      // New equipment purchases
    "Other Expense"   // Miscellaneous expenses
  ]
} as const

const VALID_STORES = Object.values(STORE_SHEETS).join('", "')

export const PROMPT_TEMPLATE = `You are a financial assistant for a water business. You MUST use EXACTLY these store names: "${VALID_STORES}". Analyze the following input and determine if it's a transaction operation (single or batch) or an analytics query.

Input: "{input}"

For TRANSACTION OPERATIONS, if there are multiple operations in a single command (e.g., "Add a sale of 5000 to Kilimani and 2000 to South C"), respond with:

{
  "type": "BATCH",
  "transactions": [
    {
      // First transaction
      "store": "Store name (MUST be one of: ${VALID_STORES})",
      "type": "REVENUE or EXPENSE",
      "amount": number,
      "description": "Cleaned up description",
      "category": "Transaction category",
      "confidence": number between 0 and 1,
      "operation": "ADD/DELETE/UPDATE",
      "date": "Optional specific date"
    },
    {
      // Second transaction
      ...same format as above
    }
  ],
  "confidence": overall confidence between 0 and 1
}

For SINGLE TRANSACTIONS, respond with one of these formats:

1. Adding a transaction (e.g., "Add a sale of 5000 to Kilimani"):
{
  "store": "Store name (MUST be one of: ${VALID_STORES})",
  "type": "REVENUE or EXPENSE",
  "amount": number,
  "description": "Cleaned up description",
  "category": "Transaction category",
  "confidence": number between 0 and 1,
  "operation": "ADD",
  "date": "Optional specific date"
}

2. Deleting a transaction (e.g., "Delete yesterday's sale from Kilimani"):
{
  "store": "Store name (MUST be one of: ${VALID_STORES})",
  "type": "REVENUE or EXPENSE",
  "confidence": number between 0 and 1,
  "operation": "DELETE",
  "date": "Date to delete from"
}

3. Updating a transaction (e.g., "Change yesterday's Kilimani sale from 500 to 200"):
{
  "store": "Store name (MUST be one of: ${VALID_STORES})",
  "type": "REVENUE or EXPENSE",
  "amount": "New amount",
  "originalAmount": "Original amount if specified",
  "confidence": number between 0 and 1,
  "operation": "UPDATE",
  "date": "Date of transaction to update"
}

For ANALYTICS QUERIES, respond with one of these formats:

1. For specific dates (e.g., "What did Kilimani sell yesterday"):
{
  "type": "ANALYTICS",
  "store": "Store name (MUST be one of: ${VALID_STORES})",
  "metric": "REVENUE, EXPENSE, or PROFIT",
  "date": "Specific date mentioned",
  "timeframe": "SPECIFIC_DATE",
  "confidence": number between 0 and 1
}

2. For time periods (e.g., "Show me this week's sales"):
{
  "type": "ANALYTICS",
  "store": "Store name (optional, MUST be one of: ${VALID_STORES})",
  "metric": "REVENUE, EXPENSE, or PROFIT",
  "timeframe": "TODAY, THIS_WEEK, THIS_MONTH, or ALL_TIME",
  "confidence": number between 0 and 1
}

Rules for Batch Transactions:
1. Detect if input contains multiple operations (look for "and", commas, multiple stores)
2. Each transaction in the batch must follow single transaction rules
3. Set overall confidence based on lowest individual confidence
4. Store names MUST EXACTLY match one of: "${VALID_STORES}"

Rules for Single Transactions:
1. Store names MUST EXACTLY match one of: "${VALID_STORES}"
2. Detect if it's an ADD, DELETE, or UPDATE operation
3. For ADD operations:
   - Default to REVENUE type unless clearly an expense
   - Categories for REVENUE: ${TRANSACTION_CATEGORIES.REVENUE.join(", ")}
   - Categories for EXPENSE: ${TRANSACTION_CATEGORIES.EXPENSE.join(", ")}
4. For DELETE operations:
   - Require both store and date
   - Type (REVENUE/EXPENSE) is optional but helps with confidence
5. For UPDATE operations:
   - Require store, date, and new amount
   - Include original amount if mentioned
6. Set confidence based on clarity of information

Rules for Analytics:
1. Detect if asking about sales (REVENUE), expenses (EXPENSE), or profit (PROFIT)
2. For specific dates (yesterday, 6th of month, etc), use timeframe: "SPECIFIC_DATE"
3. For general periods (this week, this month), use appropriate timeframe
4. Extract store name if specified (MUST be one of: "${VALID_STORES}")
5. Default to REVENUE if metric is unclear
6. Set confidence based on clarity of query

Common date formats to detect:
- "yesterday", "today"
- "last [day]" (e.g., "last monday")
- "[day] last week" (e.g., "wednesday last week")
- "last week [day]" (e.g., "last week friday")
- "[number]th/st/rd of this month"
- "this week", "this month"`
