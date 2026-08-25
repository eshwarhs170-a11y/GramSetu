// Rule-based navigation + Gemini AI for general questions

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

async function callGemini(prompt, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const body = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
The user may speak in ${langName}, English, or a mix (Kanglish like "home page ge hogu"). 
Always reply in ${langName}, keep it short and natural (2-3 sentences max). 
If you don't know exact real-time data like today's market price, give a helpful approximate answer or direct them to the APMC portal. 
Never say you cannot help — always give a useful response.`;

  try {
    const responseText = await callGemini(transcript, systemInstruction);
    return { type: 'chat', response: responseText.trim() };
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Show the actual error to help debug
    return {
      type: 'chat',
      response: lang === 'kn'
        ? `ಕ್ಷಮಿಸಿ, ದೋಷ ಉಂಟಾಗಿದೆ: ${error.message}`
        : `Error: ${error.message}`
    };
  }
}
