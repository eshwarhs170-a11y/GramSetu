const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.FIREBASE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello, respond in 1 short sentence.");
      console.log(`Success with ${m}:`, result.response.text());
      return;
    } catch (e) {
      console.error(`Failed ${m}:`, e.message);
    }
  }
}

test();
