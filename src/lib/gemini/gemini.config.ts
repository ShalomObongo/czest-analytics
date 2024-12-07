import { GoogleGenerativeAI } from "@google/generative-ai"

// Only initialize on the server side
const getGeminiModel = () => {
  if (typeof window !== 'undefined') {
    throw new Error("Gemini client should only be initialized on the server")
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key")
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
}

export { getGeminiModel }
