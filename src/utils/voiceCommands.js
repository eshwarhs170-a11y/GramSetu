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

  // ── NAVIGATION: Fast rule-based (no AI needed) ──────────────────

  // Home
  if (lower.includes('home') || lower.includes('ಮನೆ') || lower.includes('ಮುಖಪುಟ') || lower.includes('ghar') || lower.includes('home ge')) {
    return { type: 'navigate', payload: '/', response: lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : lang === 'hi' ? 'होम पेज पर जा रहा हूँ।' : 'Going to home page.' };
  }

  // Login — official
  if ((lower.includes('login') || lower.includes('log in') || lower.includes('ಲಾಗಿನ್') || lower.includes('login ge')) &&
      (lower.includes('official') || lower.includes('ಅಧಿಕಾರಿ') || lower.includes('officer'))) {
    return { type: 'navigate', payload: '/login/official', response: lang === 'kn' ? 'ಅಧಿಕಾರಿ ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to official login.' };
  }

  // Login — villager / register / signup
  if (lower.includes('login') || lower.includes('log in') || lower.includes('ಲಾಗಿನ್') || lower.includes('login ge') ||
      lower.includes('register') || lower.includes('sign up') || lower.includes('signup') || lower.includes('ನೋಂದಾಯಿಸು') || lower.includes('registration')) {
    return { type: 'navigate', payload: '/login/villager', response: lang === 'kn' ? 'ಲಾಗಿನ್ / ನೋಂದಣಿ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : lang === 'hi' ? 'लॉगिन पेज पर जा रहा हूँ।' : 'Going to login page.' };
  }

  // Dashboard
  if (lower.includes('dashboard') || lower.includes('ಡ್ಯಾಶ್ಬೋರ್ಡ್') || lower.includes('dashboard ge') || lower.includes('main page') || lower.includes('mane page')) {
    const isOfficial = window.localStorage.getItem('official_email');
    if (isOfficial) return { type: 'navigate', payload: '/dashboard/official', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening dashboard.' };
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : lang === 'hi' ? 'डैशबोर्ड खोल रहा हूँ।' : 'Opening dashboard.' };
  }

  // Complaints
  if (lower.includes('complaint') || lower.includes('complain') || lower.includes('ದೂರು') || lower.includes('shikaayat') || lower.includes('shikayat') || lower.includes('शिकायत')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ, ಅಲ್ಲಿ Complaints ವಿಭಾಗ ಕ್ಲಿಕ್ ಮಾಡಿ.' : lang === 'hi' ? 'शिकायत दर्ज करने के लिए डैशबोर्ड के Complaints सेक्शन पर जाएं।' : 'Opening your dashboard. Click the Complaints section to file your grievance.' };
  }

  // Market / APMC prices
  if (lower.includes('market') || lower.includes('price') || lower.includes('apmc') || lower.includes('ಬೆಲೆ') || lower.includes('ಮಾರುಕಟ್ಟೆ') || lower.includes('bhav') || lower.includes('bele') || lower.includes('बाजार')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನೋಡಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನ Market Prices ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ.' : lang === 'hi' ? 'बाजार भाव देखने के लिए डैशबोर्ड खोल रहा हूँ।' : 'Opening dashboard. Check the Market Prices section for APMC crop rates.' };
  }

  // Government schemes
  if (lower.includes('scheme') || lower.includes('yojana') || lower.includes('ಯೋಜನೆ') || lower.includes('योजना') || lower.includes('government scheme') || lower.includes('subsidy')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆ ನೋಡಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನ Schemes ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ.' : lang === 'hi' ? 'सरकारी योजनाएं देखने के लिए डैशबोर्ड खोल रहा हूँ।' : 'Opening dashboard. Check the Government Schemes section for eligible schemes.' };
  }

  // ── AI FALLBACK for all other questions ──────────────────────────
  if (!apiKey) {
    return {
      type: 'chat',
      response: lang === 'kn'
        ? 'ಕ್ಷಮಿಸಿ, AI ಕೀ ಇಲ್ಲ.'
        : 'Sorry, no API key found. Please add VITE_GEMINI_API_KEY to your .env.local file.'
    };
  }

  const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
  const systemInstruction = `You are GramSetu AI, a voice assistant for farmers and villagers in Karnataka, India.
The user is on the GramSetu website. You know every part of this website:

PAGES & NAVIGATION:
- Home page (/): Landing page with language selection and welcome.
- Villager Login/Register (/login/villager): Farmers register here with Name, Email/Phone, District, Taluk, Village. OTP is sent to email to verify.
- Official Login (/login/official): Government officials log in here.
- Villager Dashboard (/dashboard/villager): Has 3 main sections - Government Schemes, Market Prices (APMC), and Complaints.
- District Page (/district/:name): Info about specific Karnataka districts.

FORM FILLING HELP (login/register page fields):
- Step 1: Enter email address or mobile number
- Step 2: Enter name, select district (e.g. Bengaluru, Mysuru, Hubballi, Hassan, Belagavi, etc.), select taluk, select area type (rural/urban), select village/ward
- Step 3: Enter OTP received on email

If user asks what to fill in a field, guide them clearly. For example:
- "what to fill in district?" → tell them to type the name of their district in Karnataka
- "how to register?" → walk them through step-by-step
- "what is OTP?" → explain it's a 6-digit code sent to their email for verification

CROPS & MARKET: GramSetu tracks APMC prices for: Paddy (Rice), Wheat, Jowar, Bajra, Maize, Ragi, Tur Dal, Urad Dal, Moong Dal, Chana, Cotton, Groundnut, Sunflower, Soybean, Onion, Potato, Tomato, Banana, Mango, Coconut, Sugarcane, Turmeric, Chilli.

Always reply in ${langName}. Keep it short and helpful (2-3 sentences max).
Never say you cannot help. If navigation is needed, guide them to the right page.`;


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
