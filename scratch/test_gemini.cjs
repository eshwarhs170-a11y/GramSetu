const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.VITE_GEMINI_API_KEY || "AIzaSyDCDEKu_DG5-Jgi-jLbxRDdBmbd94KuMdM";
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Hello! What is your name?");
      console.log(`SUCCESS with ${m}:`, result.response.text());
      return;
    } catch (e) {
      console.error(`FAILED ${m}:`, e.message);
    }
  }
}

test();
