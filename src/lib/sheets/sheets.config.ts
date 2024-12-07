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

export const COLUMNS = {
  ID: "ID",
  DATE: "Date",
  TYPE: "Type",
  AMOUNT: "Amount",
  DESCRIPTION: "Description",
  CATEGORY: "Category",
} as const

export type StoreSheet = (typeof STORE_SHEETS)[keyof typeof STORE_SHEETS]

let sheetClientInstance: GoogleSpreadsheet | null = null

export const getSheetClient = async () => {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("Spreadsheet ID not found in environment variables")
  }

  if (!sheetClientInstance) {
    sheetClientInstance = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID, jwt)
    await sheetClientInstance.loadInfo()
  }
  return sheetClientInstance
}

export const getStoreSheet = async (storeName: StoreSheet) => {
  const doc = await getSheetClient()
  let sheet = doc.sheetsByTitle[storeName]
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    sheet = await doc.addSheet({ title: storeName })
  }

  try {
    await sheet.loadHeaderRow()
  } catch (error) {
    // Initialize headers if they don't exist
    await sheet.setHeaderRow(Object.values(COLUMNS))
    await sheet.loadHeaderRow()
  }

  return sheet
}
