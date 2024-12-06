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

export const getSheetClient = async () => {
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("Spreadsheet ID not found in environment variables")
  }

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID, jwt)
  await doc.loadInfo()
  return doc
}

export const getStoreSheet = async (storeName: StoreSheet) => {
  const doc = await getSheetClient()
  const sheet = doc.sheetsByTitle[storeName]
  if (!sheet) {
    throw new Error(`Sheet not found for store: ${storeName}`)
  }
  return sheet
}
