import { GoogleGenerativeAI } from "@google/generative-ai";

// Use standard API Key or public fallback if configured that way
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest", // ✅ Uses the supported modern flash alias that bypasses 404s and 429 Quota locks.
});
