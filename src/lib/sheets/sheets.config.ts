import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
  throw new Error("Google Sheets credentials not found in environment variables")
}

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
]

const jwt = new JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
})

export const STORE_SHEETS = {
  KILIMANI: "Kilimani",
  SOUTH_C: "South C",
  OBAMA: "Obama",
  HOMA_BAY: "Homa Bay",
} as const

export type StoreSheet = (typeof STORE_SHEETS)[keyof typeof STORE_SHEETS]

export const COLUMNS = {
  ID: "ID",
  DATE: "Date",
  TYPE: "Type",
  AMOUNT: "Amount",
  DESCRIPTION: "Description",
  CATEGORY: "Category",
} as const

let sheetClientInstance: GoogleSpreadsheet | null = null
const headerCache = new Map<string, boolean>();
const HEADER_CACHE_TTL = 3600000; // 1 hour

export const getSheetClient = async () => {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("Spreadsheet ID not found in environment variables")
  }

  try {
    if (!sheetClientInstance) {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID, jwt)
      await doc.loadInfo() // Load document info
      sheetClientInstance = doc
    }
    return sheetClientInstance
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error)
    throw new Error("Failed to initialize Google Sheets client")
  }
}

export const getStoreSheet = async (storeName: StoreSheet) => {
  try {
    const doc = await getSheetClient()
    let sheet = doc.sheetsByTitle[storeName]
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      console.log(`Creating new sheet for store: ${storeName}`)
      sheet = await doc.addSheet({ 
        title: storeName,
        headerValues: Object.values(COLUMNS)
      })
      headerCache.set(storeName, true);
      return sheet;
    }

    // Check headers only if not cached or cache expired
    const headersCached = headerCache.get(storeName);
    if (!headersCached) {
      try {
        const headers = await sheet.headerValues
        if (!headers || headers.length === 0) {
          await sheet.setHeaderRow(Object.values(COLUMNS))
        }
        headerCache.set(storeName, true);
        // Clear cache after TTL
        setTimeout(() => headerCache.delete(storeName), HEADER_CACHE_TTL);
      } catch (error) {
        console.log(`Setting headers for sheet: ${storeName}`)
        await sheet.setHeaderRow(Object.values(COLUMNS))
        headerCache.set(storeName, true);
      }
    }

    return sheet
  } catch (error) {
    console.error(`Error getting sheet for store ${storeName}:`, error)
    throw new Error(`Failed to get or create sheet for store: ${storeName}`)
  }
}

// Utility function to reset the sheet client (useful for testing or error recovery)
export const resetSheetClient = () => {
  sheetClientInstance = null
}
