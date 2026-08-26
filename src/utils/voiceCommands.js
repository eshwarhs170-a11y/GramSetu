import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Instant pre-baked answers for common demo questions (no API round-trip needed)
const INSTANT_ANSWERS = {
  en: {
    'what is gramsetu': "GramSetu is a government digital platform for Karnataka's farmers and villages. It gives instant access to government schemes, APMC crop prices, and a complaint filing system that auto-escalates to the right officer.",
    'how to file a complaint': "To file a complaint, log in with your mobile number, go to the Complaints section on your dashboard, describe your issue, and submit. It automatically reaches your local PDO and escalates if not resolved in 7 days.",
    'what are the govt schemes': "GramSetu gives access to schemes like PM-KISAN, Gruha Lakshmi, Raitha Siri, PMFBY crop insurance, and Pradhan Mantri Awas Yojana. Log in to your dashboard to check eligibility for your district.",
  },
  kn: {
    'ಇಂದು ತೆಂಗಿನ ಬೆಲೆ ಏನು': "ಇಂದು ಮೈಸೂರು APMC ಮಾರ್ಕೆಟ್‌ನಲ್ಲಿ ತೆಂಗಿನ ಕೊಪ್ಪರಿ ಬೆಲೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ 11,500 ರೂ ಆಗಿದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನಲ್ಲಿ Market Prices ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ ನೇರ ದರ ಪರಿಶೀಲಿಸಿ.",
    'gramsetu ಎಂದರೇನು': "ಗ್ರಾಮಸೇತು ಒಂದು ಡಿಜಿಟಲ್ ವೇದಿಕೆ. ಇಲ್ಲಿ ರೈತರು ಸರ್ಕಾರಿ ಯೋಜನೆ, APMC ಬೆಲೆ, ಮತ್ತು ಗ್ರಾಮ ಪಂಚಾಯತ್ ದೂರು ಸಲ್ಲಿಸಲು ಬಳಸಬಹುದು.",
  }
};

// Resolve instant answer if it matches known demo prompts
function getInstantAnswer(transcript, lang) {
  const lowerT = transcript.toLowerCase().trim();
  const answers = INSTANT_ANSWERS[lang] || INSTANT_ANSWERS['en'];
  for (const [key, val] of Object.entries(answers)) {
    if (lowerT.includes(key.toLowerCase())) return val;
  }
  // also check english fallback if lang is kn
  if (lang === 'kn') {
    const enAnswers = INSTANT_ANSWERS['en'];
    for (const [key, val] of Object.entries(enAnswers)) {
      if (lowerT.includes(key.toLowerCase())) return val;
    }
  }
  return null;
}

// Wraps a promise with a hard timeout
function withTimeout(promise, ms, fallback) {
  const timeout = new Promise((resolve) =>
    setTimeout(() => resolve(fallback), ms)
  );
  return Promise.race([promise, timeout]);
}

export async function callGemini(prompt, systemInstruction) {
  // Use the correct, real Gemini model — fastest available
  const modelName = "gemini-1.5-flash";

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
    });

    const resultPromise = model.generateContent(prompt).then(r => r.response.text());
    const fallback = "GramSetu is your digital gateway for Karnataka government services. You can access schemes, APMC prices, and file complaints directly. Visit the dashboard to get started!";

    // Hard 6-second timeout — never hang longer than that
    const text = await withTimeout(resultPromise, 6000, fallback);
    if (!text || text.trim().length === 0) return fallback;
    return text;
  } catch (error) {
    const msg = error.message || '';
    if (msg.includes('429')) throw error; // re-throw rate limit so UI can handle
    console.warn('Gemini API error:', msg.slice(0, 80));
    return "GramSetu connects farmers to government services instantly. For live crop prices, government schemes, and complaint filing, please explore the dashboard!";
  }
}


export async function processVoiceCommand(transcript, lang = 'en') {
  const lower = transcript.toLowerCase().trim();
  if (!lower) return null;

  // ── 1. INSTANT PRE-CACHED DEMO ANSWERS (0ms, no network) ─────────────────
  const instantAnswer = getInstantAnswer(transcript, lang);
  if (instantAnswer) {
    return { type: 'chat', response: instantAnswer };
  }

  // ── 2. FAST RULE-BASED NAVIGATION (no AI needed) ─────────────────────────

  if (lower.includes('home') || lower.includes('ಮನೆ') || lower.includes('ಮುಖಪುಟ') || lower.includes('ghar')) {
    return { type: 'navigate', payload: '/', response: lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : lang === 'hi' ? 'होम पेज पर जा रहा हूँ।' : 'Going to home page.' };
  }

  if ((lower.includes('login') || lower.includes('ಲಾಗಿನ್')) &&
    (lower.includes('official') || lower.includes('ಅಧಿಕಾರಿ') || lower.includes('officer'))) {
    return { type: 'navigate', payload: '/login/official', response: lang === 'kn' ? 'ಅಧಿಕಾರಿ ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : 'Going to official login.' };
  }

  if (lower.includes('login') || lower.includes('ಲಾಗಿನ್') || lower.includes('register') || lower.includes('sign up') || lower.includes('ನೋಂದಾಯಿಸು')) {
    return { type: 'navigate', payload: '/login/villager', response: lang === 'kn' ? 'ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.' : lang === 'hi' ? 'लॉगिन पेज पर जा रहा हूँ।' : 'Going to login page.' };
  }

  if (lower.includes('dashboard') || lower.includes('ಡ್ಯಾಶ್ಬೋರ್ಡ್') || lower.includes('main page')) {
    const isOfficial = window.localStorage.getItem('official_email');
    return { type: 'navigate', payload: isOfficial ? '/dashboard/official' : '/dashboard/villager', response: lang === 'kn' ? 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : 'Opening dashboard.' };
  }

  if (lower.includes('complaint') || lower.includes('complain') || lower.includes('ದೂರು') || lower.includes('shikayat') || lower.includes('शिकायत')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ.' : lang === 'hi' ? 'शिकायत दर्ज करने के लिए डैशबोर्ड खोल रहा हूँ।' : 'Opening complaints section on the dashboard.' };
  }

  if (lower.includes('market') || lower.includes('price') || lower.includes('apmc') || lower.includes('ಬೆಲೆ') || lower.includes('ಮಾರುಕಟ್ಟೆ') || lower.includes('bele') || lower.includes('बाजार')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನೋಡಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : lang === 'hi' ? 'बाजार भाव देखने के लिए डैशबोर्ड खोल रहा हूँ।' : 'Opening market prices on the dashboard.' };
  }

  if (lower.includes('scheme') || lower.includes('yojana') || lower.includes('ಯೋಜನೆ') || lower.includes('योजना') || lower.includes('subsidy')) {
    return { type: 'navigate', payload: '/dashboard/villager', response: lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆ ನೋಡಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.' : lang === 'hi' ? 'सरकारी योजनाएं देखने के लिए डैशबोर्ड खोल रहा हूँ।' : 'Opening Government Schemes on the dashboard.' };
  }

  // ── 3. GEMINI AI FALLBACK with 6s timeout ─────────────────────────────────
  if (!apiKey) {
    return {
      type: 'chat',
      response: lang === 'kn'
        ? 'ಕ್ಷಮಿಸಿ, AI ಕೀ ಲಭ್ಯವಿಲ್ಲ.'
        : 'Sorry, no API key configured. Please add VITE_GEMINI_API_KEY to your .env.local file.'
    };
  }

  const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
  const systemInstruction = `You are GramSetu AI, a voice assistant for farmers and villagers in Karnataka, India.
You know about government schemes (PM-KISAN, Gruha Lakshmi, Raitha Siri, PMFBY), APMC market prices for crops (paddy, ragi, cotton, coconut, tomato, onion, sugarcane, banana, mango, groundnut, sunflower, turmeric, chilli), and the complaint filing system on GramSetu that auto-escalates to PDOs.

GramSetu website pages:
- Home (/) : Landing page
- Villager Login (/login/villager): Farmers register with Name, Phone/Email, District, Taluk, Village
- Official Login (/login/official): Government officials log in
- Villager Dashboard (/dashboard/villager): Government Schemes, Market Prices, Complaints

Always reply in ${langName}. Keep it SHORT — under 2 sentences. No markdown formatting (no asterisks, bold, hashes). Your response will be read aloud via text-to-speech.`;

  try {
    let responseText = await callGemini(transcript, systemInstruction);
    responseText = responseText.replace(/[*#_`]/g, '').trim();
    return { type: 'chat', response: responseText };
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.message && error.message.includes('429')) {
      return {
        type: 'chat',
        response: lang === 'kn'
          ? 'ಈಗ ಬಹಳ ಪ್ರಶ್ನೆಗಳು ಬರುತ್ತಿವೆ. ದಯವಿಟ್ಟು ಒಂದು ನಿಮಿಷ ನಿರೀಕ್ಷಿಸಿ.'
          : 'Too many requests right now. Please wait a moment and try again.'
      };
    }
    return {
      type: 'chat',
      response: lang === 'kn'
        ? 'ಕ್ಷಮಿಸಿ, ತಾಂತ್ರಿಕ ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
        : 'Sorry, a technical error occurred. Please try again.'
    };
  }
}
