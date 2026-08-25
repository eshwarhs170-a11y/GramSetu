import { GoogleGenAI } from '@google/genai';

// Initialize the SDK. It will automatically pick up VITE_GEMINI_API_KEY if we pass it,
// or we can manually pass it. In Vite, env variables are on import.meta.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export async function processVoiceCommand(transcript, lang = 'en') {
  const lowerTranscript = transcript.toLowerCase().trim();
  
  if (!lowerTranscript) return null;

  // 1. Basic fallback navigation without AI (just in case AI fails or is too slow)
  const isHome = lowerTranscript.includes('home') || lowerTranscript.includes('ಮನೆಗೆ');
  if (isHome) {
    return { type: 'navigate', payload: '/', response: lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to home page.' };
  }

  const isLogin = lowerTranscript.includes('login') || lowerTranscript.includes('ಲಾಗಿನ್');
  if (isLogin) {
    return { type: 'navigate', payload: '/login/villager', response: lang === 'kn' ? 'ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to login page.' };
  }

  const isDashboard = lowerTranscript.includes('dashboard') || lowerTranscript.includes('ಡ್ಯಾಶ್ಬೋರ್ಡ್');
  if (isDashboard) {
    const isOfficialUser = window.localStorage.getItem('official_email');
    if (isOfficialUser) return { type: 'navigate', payload: '/dashboard/official', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening official dashboard.' };
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening villager dashboard.' };
  }

  // 2. Use Gemini AI for dynamic answering and understanding
  if (!ai) {
    // If no API key is provided, fallback to standard response
    return { 
      type: 'chat', 
      response: lang === 'kn' 
        ? "ಕ್ಷಮಿಸಿ, Gemini AI ಕೀ ಅನ್ನು ಒದಗಿಸಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು .env.local ಫೈಲ್‌ನಲ್ಲಿ VITE_GEMINI_API_KEY ಸೇರಿಸಿ." 
        : "Sorry, the Gemini AI key is not provided. Please add VITE_GEMINI_API_KEY to your .env.local file." 
    };
  }

  try {
    const systemInstruction = `
      You are the Gram Setu Voice Assistant. You help farmers and villagers in Karnataka.
      The user is speaking in ${lang === 'kn' ? 'Kannada / Kanglish' : lang === 'hi' ? 'Hindi' : 'English'}.
      Always reply in ${lang === 'kn' ? 'Kannada (use Kannada script)' : lang === 'hi' ? 'Hindi' : 'English'}, keep it very brief (1-2 sentences), and sound helpful and natural.
      
      If the user wants to navigate somewhere (like "home page ge hogu", "go to login", "open dashboard"), return a JSON string exactly like this: {"type": "navigate", "payload": "/route", "response": "spoken response"}
      Available routes: "/", "/login/villager", "/login/official", "/dashboard/villager", "/dashboard/official".
      
      If the user asks a general question (like "what is today's arecanut price", "what is gram setu", or general knowledge), answer the question naturally and return a JSON string exactly like this: {"type": "chat", "response": "your detailed answer"}
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: transcript,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const responseText = result.text;
    const action = JSON.parse(responseText);
    return action;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      type: 'chat', 
      response: lang === 'kn' 
        ? "ಕ್ಷಮಿಸಿ, ಮಾಹಿತಿಯನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ." 
        : "Sorry, there was an error processing your request with AI." 
    };
  }
}
