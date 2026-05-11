const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("FAIL: GEMINI_API_KEY not found in .env.local");
    return;
  }

  console.log("Testing Gemini API connection...");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Say hello in one word.");
    const response = await result.response;
    const text = response.text();
    console.log("SUCCESS: Received response from Gemini:", text);
  } catch (error) {
    console.error("FAIL: Error connecting to Gemini API:");
    console.error(error);
  }
}

testGemini();
