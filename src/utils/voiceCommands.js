import { GoogleGenerativeAI } from "@google/generative-ai";

// Rule-based navigation + Gemini AI for general questions

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize SDK
const genAI = new GoogleGenerativeAI(apiKey);

export async function callGemini(prompt, systemInstruction) {
  const modelsToTry = [
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash", 
    "gemini-3.0-flash", 
    "gemini-pro"
  ];
  
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemInstruction,
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      // If it's a "not found" error, continue to the next model in the fallback list
      if (error.message?.includes("not found") || error.message?.includes("not supported")) {
        console.warn(`Model ${modelName} failed, trying next...`);
        continue;
      }
      // For any other error (like bad API key), throw immediately
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
  // If absolutely all models fail, return a friendly fallback string instead of crashing
  console.error("All Gemini models failed. Returning offline fallback response.");
  return "I am GramSetu's AI Assistant. I am currently experiencing API connectivity issues, but you can still use the dashboard manually to check government schemes and APMC prices!";
}

export async function processVoiceCommand(transcript, lang = 'en') {
  const lower = transcript.toLowerCase().trim();
  if (!lower) return null;

  // --- Fast rule-based navigation (no AI needed) ---
  if (lower.includes('home') || lower.includes('ಮನೆ') || lower.includes('ಮುಖಪುಟ') || lower.includes('homepage ge') || lower.includes('home ge')) {
    return { type: 'navigate', payload: '/', response: lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to home page.' };
  }
  if (lower.includes('login') || lower.includes('ಲಾಗಿನ್') || lower.includes('login ge') || lower.includes('log in')) {
    if (lower.includes('official') || lower.includes('ಅಧಿಕಾರಿ')) {
      return { type: 'navigate', payload: '/login/official', response: lang === 'kn' ? 'ಅಧಿಕಾರಿ ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to official login.' };
    }
    return { type: 'navigate', payload: '/login/villager', response: lang === 'kn' ? 'ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to login page.' };
  }
  if (lower.includes('dashboard') || lower.includes('ಡ್ಯಾಶ್ಬೋರ್ಡ್') || lower.includes('dashboard ge')) {
    const isOfficial = window.localStorage.getItem('official_email');
    if (isOfficial) return { type: 'navigate', payload: '/dashboard/official', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening dashboard.' };
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening dashboard.' };
  }

  // --- AI fallback for all other questions ---
  if (!apiKey) {
    return {
      type: 'chat',
      response: lang === 'kn'
        ? 'ಕ್ಷಮಿಸಿ, AI ಕೀ ಇಲ್ಲ. ದಯವಿಟ್ಟು VITE_GEMINI_API_KEY ಸೇರಿಸಿ.'
        : 'Sorry, no API key found. Please add VITE_GEMINI_API_KEY to your .env.local file.'
    };
  }

  const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
  const systemInstruction = `You are the Gram Setu voice assistant for farmers and villagers in Karnataka, India. 
The user is currently on the Gram Setu website. 
You must be aware of the website's main features:
1. "Government Schemes": A dedicated section on the dashboard to browse and apply for agricultural schemes.
2. "Market Prices (APMC)": A section to check real-time crop prices.
3. "Complaints": A portal on the dashboard where villagers can file grievances directly to Panchayat officials.

If the user asks how to do something (like file a complaint, check prices, or find schemes), explicitly guide them to navigate to that specific section on their Gram Setu Dashboard. 
If they ask for specific crop prices or schemes, give a helpful general answer and remind them they can see the exact details in the Dashboard.

The user may speak in ${langName}, English, or a mix (Kanglish like "home page ge hogu"). 
Always reply in ${langName}, keep it short and natural (2-3 sentences max). 
Never say you cannot help — always give a useful response and guide them to the right feature on the website.`;

  try {
    const responseText = await callGemini(transcript, systemInstruction);
    return { type: 'chat', response: responseText.trim() };
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Check if it's a rate limit error (429)
    if (error.message && error.message.includes('429')) {
      return {
        type: 'chat',
        response: lang === 'kn'
          ? 'ನಾನು ಈಗ ಹೆಚ್ಚು ಪ್ರಶ್ನೆಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಒಂದು ನಿಮಿಷದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'I am getting too many questions right now! Please wait a minute before asking again.'
      };
    }

    // Show the actual error for other types of failures
    return {
      type: 'chat',
      response: lang === 'kn'
        ? `ಕ್ಷಮಿಸಿ, ದೋಷ ಉಂಟಾಗಿದೆ: ${error.message.substring(0, 50)}...`
        : `Error: ${error.message.substring(0, 50)}...`
    };
  }
}
