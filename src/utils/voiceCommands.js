import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// ─────────────────────────────────────────────────────────────────────────────
// INSTANT ANSWERS — Rich crop + scheme knowledge, no API needed
// These match common spoken questions in English and Kannada
// ─────────────────────────────────────────────────────────────────────────────
const INSTANT_ANSWERS = {
  en: {
    'what is gramsetu': 'GramSetu is a digital platform connecting Karnataka farmers and villages to government services — access schemes, APMC prices, and file complaints instantly.',
    'how to file complaint': 'Go to the Complaints section on your dashboard, describe your issue, and submit. It auto-escalates to your local PDO if not resolved in 7 days.',
    'what are govt schemes': 'Available schemes include PM-KISAN, Gruha Lakshmi, Raitha Siri, PMFBY crop insurance, and Rytha Vidyanidhi. Visit your dashboard to check eligibility.',
    'pm kisan': 'PM-KISAN gives ₹6,000 per year in three installments to eligible farmers. Register at pmkisan.gov.in or through your local Krishi Vigyan Kendra.',
    'pmfby': 'PMFBY or Pradhan Mantri Fasal Bima Yojana provides crop insurance. Premium is 1.5% for Rabi, 2% for Kharif, and 5% for commercial crops. Visit pmfby.gov.in.',
    // Crop diseases
    'ragi blast': 'Ragi blast disease is caused by Pyricularia grisea. Spray Tricyclazole 75 WP at 0.6 grams per litre of water. Use resistant variety GPU-28. Raitha Siri scheme may provide compensation.',
    'blast disease': 'Blast disease affects Ragi and Paddy. Spray Tricyclazole at 0.6 grams per litre. Seed treatment with Carbendazim at 2 grams per kilogram prevents it.',
    'paddy blast': 'Paddy blast is caused by Pyricularia oryzae. Spray Tricyclazole 75 WP at 0.6 grams per litre at tillering stage. Use PMFBY crop insurance.',
    'tomato blight': 'Tomato late blight is caused by Phytophthora. Spray Mancozeb at 2 grams per litre or Metalaxyl plus Mancozeb at 2.5 grams per litre every 7 days.',
    'cotton bollworm': 'Pink bollworm in cotton: Install 5 pheromone traps per acre, spray Spinosad at 0.3 mL per litre. Cotton MSP support is available from Cotton Corporation of India.',
    'coconut beetle': 'Rhinoceros beetle in coconut: Extract beetles with wire hooks, apply Sevidol 8G in leaf axils, use pheromone traps. Coconut Development Board schemes available.',
    'arecanut disease': 'Arecanut yellow leaf disease is caused by phytoplasma. Apply Bordeaux mixture 1 percent monthly. Horticulture crop insurance is available in Karnataka.',
    'coffee borer': 'White stem borer in coffee: Uproot affected plants, use pheromone traps at 4 per hectare, paint stems with Chlorpyriphos. Coffee Board subsidies available.',
    'sugarcane red rot': 'Sugarcane red rot is caused by Colletotrichum falcatum. Plant disease-free setts, treat with Carbendazim 0.1 percent solution. Crop rotation with paddy recommended.',
    'banana wilt': 'Banana Fusarium wilt has no chemical cure. Remove and destroy affected plants. Apply Trichoderma viride at 4 kilograms per hectare in soil. Use Grand Naine variety.',
    'mango anthracnose': 'Mango anthracnose: Spray Copper oxychloride 50 WP at 3 grams per litre at flowering, then Carbendazim on young fruits. Horticulture insurance available.',
    'fall armyworm': 'Fall armyworm in maize: Spray Emamectin Benzoate at 0.4 grams per litre into the whorl early morning. Release Trichogramma at 1 lakh per hectare. PMFBY covers losses.',
    // Fertilizer
    'fertilizer ragi': 'For rainfed Ragi, apply 50 kg Nitrogen, 40 kg Phosphorus, and 25 kg Potassium per hectare. Apply in two split doses.',
    'fertilizer paddy': 'For Paddy, apply 120 kg Nitrogen, 60 kg Phosphorus, and 60 kg Potassium per hectare in three splits.',
    'organic farming': 'For organic farming, use Trichoderma viride, Pseudomonas fluorescens, Neem Seed Kernel Extract, cow urine spray, and Bordeaux mixture as natural treatments.',
    // Market
    'ragi price': 'Current Ragi MSP is ₹3,846 per quintal. Check live APMC prices in the Market section of your dashboard.',
    'paddy price': 'Paddy MSP for Kharif 2024 is ₹2,300 per quintal for Grade A. Check your nearest APMC on the dashboard.',
    'coconut price': 'Coconut copra price in Mysuru APMC is approximately ₹11,500 per quintal. Check the market section for live rates.',
    'tomato price': 'Tomato prices vary by season. Check the Market section on your GramSetu dashboard for live APMC prices near you.',
  },
  kn: {
    'gramsetu ಎಂದರೇನು': 'ಗ್ರಾಮಸೇತು ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಮತ್ತು ಗ್ರಾಮಸ್ಥರಿಗೆ ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ತಲುಪಿಸುವ ಡಿಜಿಟಲ್ ವೇದಿಕೆ. ಯೋಜನೆ, APMC ಬೆಲೆ, ಮತ್ತು ದೂರು ಸಲ್ಲಿಸಬಹುದು.',
    'ಇಂದು ತೆಂಗಿನ ಬೆಲೆ': 'ಮೈಸೂರು APMC ಮಾರ್ಕೆಟ್‌ನಲ್ಲಿ ತೆಂಗಿನ ಕೊಪ್ಪರಿ ಬೆಲೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ಸುಮಾರು 11,500 ರೂ ಆಗಿದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನಲ್ಲಿ Market Prices ನೋಡಿ.',
    'ರಾಗಿ ಬೆಲೆ': 'ರಾಗಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ 3,846 ರೂ ಆಗಿದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನಲ್ಲಿ ನೇರ APMC ದರ ನೋಡಿ.',
    'ರಾಗಿ ಬೆಂಕಿ ರೋಗ': 'ರಾಗಿ ಬ್ಲಾಸ್ಟ್ ರೋಗಕ್ಕೆ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75 WP ಅನ್ನು ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 0.6 ಗ್ರಾಂ ಸಿಂಪಡಿಸಿ. GPU-28 ತಳಿ ಬಳಸಿ. ರೈತ ಸಿರಿ ಯೋಜನೆ ಅಡಿ ಪರಿಹಾರ ಸಿಗಬಹುದು.',
    'ಭತ್ತ ಬೆಂಕಿ ರೋಗ': 'ಭತ್ತದ ಬ್ಲಾಸ್ಟ್ ರೋಗಕ್ಕೆ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಸಿಂಪಡಿಸಿ. PMFBY ಬೆಳೆ ವಿಮೆ ತೆಗೆದುಕೊಳ್ಳಿ.',
    'ಟೊಮೇಟೊ ರೋಗ': 'ಟೊಮೇಟೊ ಅಂಗಮಾರಿ ರೋಗಕ್ಕೆ ಮ್ಯಾಂಕೋಜೆಬ್ ಅನ್ನು ಪ್ರತಿ ಲೀಟರ್‌ಗೆ 2 ಗ್ರಾಂ ಸಿಂಪಡಿಸಿ. 7 ದಿನಕ್ಕೊಮ್ಮೆ ಪುನರಾವರ್ತಿಸಿ.',
    'ಅಡಿಕೆ ರೋಗ': 'ಅಡಿಕೆ ಹಳದಿ ಎಲೆ ರೋಗಕ್ಕೆ ಬೋರ್ಡೋ ದ್ರಾವಣ 1% ತಿಂಗಳಿಗೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ. ತೋಟಗಾರಿಕೆ ಬೆಳೆ ವಿಮೆ ಲಭ್ಯವಿದೆ.',
    'ತೆಂಗು ರೋಗ': 'ತೆಂಗಿನ ಖಡ್ಗಮೃಗ ದುಂಬಿಗೆ ಫೆರೋಮೋನ್ ಬಲೆ ಬಳಸಿ ಮತ್ತು ಸೆವಿಡಾಲ್ 8G ಅನ್ನು ಎಲೆ ಕಂಕುಳಲ್ಲಿ ಹಾಕಿ. ಕೊಕೊನಟ್ ಡೆವಲಪ್ಮೆಂಟ್ ಬೋರ್ಡ್ ಯೋಜನೆ ಲಭ್ಯ.',
    'ಹತ್ತಿ ರೋಗ': 'ಹತ್ತಿ ಪಿಂಕ್ ಬೊಲ್‌ವರ್ಮ್‌ಗೆ ಫೆರೋಮೋನ್ ಬಲೆ (ಎಕರೆಗೆ 5) ಮತ್ತು ಸ್ಪಿನೋಸ್ಯಾಡ್ ಸಿಂಪಡಿಸಿ. CCI MSP ಯೋಜನೆ ಬಳಸಿ.',
    'ಕಾಫಿ ರೋಗ': 'ಕಾಫಿ ಬಿಳಿ ಕಾಂಡ ಕೊರಕಕ್ಕೆ ಸೋಂಕಿತ ಗಿಡಗಳನ್ನು ತೆಗೆದು ಸುಡಿ. ಫೆರೋಮೋನ್ ಬಲೆ ಮತ್ತು ಕ್ಲೋರ್ಪೈರಿಫಾಸ್ ಕಾಂಡ ಬಣ್ಣ ಬಳಸಿ. ಕಾಫಿ ಬೋರ್ಡ್ ಸಹಾಯ ಧನ ಲಭ್ಯ.',
    'ಮಾವು ರೋಗ': 'ಮಾವು ಆಂಥ್ರಾಕ್ನೋಸ್‌ಗೆ ಹೂಬಿಡುವ ಸಮಯದಲ್ಲಿ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ 3 ಗ್ರಾಂ/ಲೀ ಸಿಂಪಡಿಸಿ. ತೋಟಗಾರಿಕೆ ಬೆಳೆ ವಿಮೆ ಪಡೆಯಿರಿ.',
    'ಯೋಜನೆ': 'ಗ್ರಾಮಸೇತುದಲ್ಲಿ PM-KISAN, ಗೃಹ ಲಕ್ಷ್ಮಿ, ರೈತ ಸಿರಿ, PMFBY, ರೈಥ ವಿದ್ಯಾನಿಧಿ ಯೋಜನೆಗಳಿವೆ. ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಿರಿ.',
    'pm kisan': 'PM-KISAN ಯೋಜನೆ ಅಡಿ ಅರ್ಹ ರೈತರಿಗೆ ವರ್ಷಕ್ಕೆ 6,000 ರೂ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ಕೊಡಲಾಗುತ್ತದೆ. pmkisan.gov.in ನಲ್ಲಿ ನೋಂದಾಯಿಸಿ.',
    'pmfby': 'PMFBY ಬೆಳೆ ವಿಮೆ ಅಡಿ ಖರೀಫ್ ಬೆಳೆಗೆ 2%, ರಬಿ ಬೆಳೆಗೆ 1.5% ಪ್ರೀಮಿಯಂ ಕಟ್ಟಿ ವಿಮೆ ಪಡೆಯಬಹುದು. pmfby.gov.in ಗೆ ಭೇಟಿ ನೀಡಿ.',
    'ದೂರು': 'ದೂರು ಸಲ್ಲಿಸಲು ಡ್ಯಾಶ್ಬೋರ್ಡ್‌ನ ದೂರು ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ. ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸ್ಥಳೀಯ PDO ಗೆ ತಲುಪುತ್ತದೆ.',
    'ಸಾವಯವ': 'ಸಾವಯವ ಕೃಷಿಗೆ ಟ್ರೈಕೊಡರ್ಮಾ, ಸೂಡೋಮೋನಾಸ್, ಬೇವಿನ ಕರ್ನಲ್ ಸಾರ, ಗೋಮೂತ್ರ ಸಿಂಪಡಣೆ ಬಳಸಿ. ಸಾವಯವ ಕೃಷಿ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ KVK ಸಂಪರ್ಕಿಸಿ.',
  },
  hi: {
    'gramsetu kya hai': 'ग्रामसेतु कर्नाटक के किसानों और ग्रामीणों के लिए एक डिजिटल प्लेटफॉर्म है। यहाँ सरकारी योजनाएं, APMC भाव, और शिकायत दर्ज कर सकते हैं।',
    'pm kisan': 'PM-KISAN योजना में पात्र किसानों को साल में 6,000 रुपए तीन किस्तों में मिलते हैं। pmkisan.gov.in पर पंजीकरण करें।',
  }
};

function getInstantAnswer(transcript, lang) {
  const lowerT = transcript.toLowerCase().trim();
  const answers = INSTANT_ANSWERS[lang] || {};
  for (const [key, val] of Object.entries(answers)) {
    if (lowerT.includes(key.toLowerCase())) return val;
  }
  // Cross-check English answers for any language
  const enAnswers = INSTANT_ANSWERS['en'];
  for (const [key, val] of Object.entries(enAnswers)) {
    if (lowerT.includes(key.toLowerCase())) return val;
  }
  return null;
}

function withTimeout(promise, ms, fallback) {
  return Promise.race([promise, new Promise(resolve => setTimeout(() => resolve(fallback), ms))]);
}

// ─────────────────────────────────────────────────────────────────────────────
// callGemini — calls Gemini 1.5 Flash with a comprehensive agriculture prompt
// ─────────────────────────────────────────────────────────────────────────────
export async function callGemini(prompt, systemInstruction) {
  if (!genAI) return null;
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction,
    });
    const resultPromise = model.generateContent(prompt).then(r => r.response.text());
    const text = await withTimeout(resultPromise, 8000, null);
    if (!text || text.trim().length === 0) return null;
    return text;
  } catch (error) {
    if (error.message?.includes('429')) throw error;
    console.warn('Gemini API error:', error.message?.slice(0, 80));
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE SYSTEM INSTRUCTION — Given to Gemini for all questions
// ─────────────────────────────────────────────────────────────────────────────
function buildSystemInstruction(lang) {
  const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
  return `You are GramSetu AI, a highly knowledgeable agriculture assistant for Karnataka, India. 
You are voice-enabled — so NEVER use markdown formatting like asterisks, bullet points, hashes, or bold text. Speak in plain sentences only.
Always reply in ${langName} language. Keep responses under 3 sentences for voice clarity.

KARNATAKA CROP DISEASE KNOWLEDGE:
- Ragi Blast (Pyricularia grisea): Spray Tricyclazole 75WP at 0.6g/L. Use GPU-28 variety. Raitha Siri scheme available.
- Paddy Blast (Pyricularia oryzae): Spray Tricyclazole or Carbendazim. PMFBY crop insurance covers losses.
- Paddy Brown Planthopper: Apply Imidacloprid 17.8 SL at 0.5 mL/L. Drain water 3-4 days.
- Paddy Sheath Blight (Rhizoctonia): Spray Validamycin 3 SL at 2 mL/L. Trichoderma viride organic option.
- Maize Fall Armyworm: Spray Emamectin Benzoate 5SG at 0.4g/L into whorl. Release Trichogramma eggs. PMFBY covers maize.
- Cotton Pink Bollworm: Install 5 pheromone traps/acre. Spray Spinosad 45SC at 0.3 mL/L. CCI provides MSP.
- Cotton Leaf Curl Virus: No chemical cure — control whitefly with Imidacloprid. Use yellow sticky traps.
- Tomato Late Blight (Phytophthora): Spray Mancozeb 75WP at 2g/L every 7 days. Metalaxyl+Mancozeb for severe cases.
- Tomato Leaf Miner (Tuta absoluta): Spray Coragen 18.5SC at 0.3 mL/L. Pheromone delta traps.
- Tomato Early Blight (Alternaria): Spray Iprodione or Azoxystrobin. Adequate potassium reduces severity.
- Potato Late Blight: Spray Cymoxanil+Mancozeb 72WP at 2.5g/L. Karnataka horticulture insurance available.
- Onion Purple Blotch (Alternaria porri): Spray Mancozeb 75WP at 2g/L every 10 days. PMFBY Rabi onion.
- Sugarcane Red Rot (Colletotrichum): Treat setts with Carbendazim 0.1% for 15 min. Rotate with paddy.
- Coconut Rhinoceros Beetle: Use Baculovirus oryctes, wire hooks, Sevidol 8G. Coconut Development Board schemes.
- Arecanut Yellow Leaf Disease (Phytoplasma): Bordeaux mixture 1% monthly. Oxytetracycline injection. Horticulture insurance.
- Arecanut Bud Rot (Phytophthora): Remove infected bud, apply Bordeaux paste. Metalaxyl+Mancozeb spray.
- Coffee White Stem Borer: Remove infected plants. Pheromone traps 4/ha. Coffee Board subsidies available.
- Coffee Leaf Rust: Spray Copper oxychloride 50WP at 3g/L.
- Banana Fusarium Wilt: No chemical cure. Apply Trichoderma viride 4kg/ha. Use Grand Naine variety. Karnataka horticulture insurance.
- Banana Black Sigatoka: Spray Propiconazole 25EC at 0.5 mL/L. Remove old infected leaves.
- Mango Anthracnose: Spray Copper oxychloride 50WP at 3g/L at flowering. Karnataka horticulture insurance.
- Groundnut Early Leaf Spot (Cercospora): Spray Chlorothalonil 75WP at 2g/L every 14 days. Apply gypsum 400kg/ha. PMFBY oilseeds.
- Sunflower Downy Mildew: Treat seed with Metalaxyl 35WS at 6g/kg. PMFBY oilseed insurance.
- Wheat Yellow Rust (Puccinia): Spray Propiconazole 25EC at 1 mL/L. Use resistant variety HD 2967. PMFBY Rabi.
- Chickpea Fusarium Wilt: Seed treatment with Carbendazim + Trichoderma. Use resistant variety JG 62. PMFBY pulses.
- Black Pepper Foot Rot (Phytophthora): Drench soil with Metalaxyl+Mancozeb. Improve drainage. Spices Board India subsidies.
- Soybean Yellow Mosaic Virus: Control whitefly vector with Imidacloprid. No chemical cure. Remove infected plants.

ORGANIC FARMING:
- Trichoderma viride: soil-borne biocontrol, apply 4-5 kg/ha mixed with FYM
- Pseudomonas fluorescens: foliar spray at 2.5 kg/ha for blast diseases
- NSKE (Neem Seed Kernel Extract): 5% spray as natural repellent
- Cow urine: 10% solution spray as preventive measure
- Bordeaux mixture: 1% spray for fungal diseases

GOVERNMENT SCHEMES FOR KARNATAKA FARMERS:
- PM-KISAN: ₹6,000/year in 3 installments, register at pmkisan.gov.in
- PMFBY (Crop Insurance): Kharif 2%, Rabi 1.5%, commercial 5% premium; pmfby.gov.in
- Raitha Siri: ₹10,000/hectare for Ragi and millets, raitamitra.karnataka.gov.in
- Gruha Lakshmi: ₹2,000/month for women head of household
- Rytha Vidyanidhi: Education support for farmers' children
- Coconut Development Board: Subsidies for coconut farmers, coconutboard.gov.in
- Coffee Board: Subsidies for coffee farmers, indiacoffee.org/schemes
- Horticulture Insurance: For fruits/vegetables, horticulturedir.karnataka.gov.in
- Cotton CCI MSP: Fair price support, cotcorp.org.in
- FRP for Sugarcane: Fair and Remunerative Price, sugarcane.kar.nic.in
- Spices Board: For pepper/cardamom farmers, indianspices.com
- Krishi Bhagya: Irrigation and water conservation scheme

MSP (Minimum Support Prices) for Karnataka:
- Paddy (Grade A) Kharif 2024: ₹2,300/quintal
- Ragi 2024: ₹3,846/quintal
- Maize: ₹2,090/quintal
- Jowar: ₹3,371/quintal
- Cotton (Medium): ₹7,121/quintal
- Groundnut: ₹6,783/quintal
- Sunflower: ₹7,280/quintal
- Soybean: ₹4,892/quintal

GramSetu platform:
- Villager Dashboard: government schemes, APMC prices, complaint filing
- Crop Doctor AR: scan crop leaves to identify diseases
- Voice assistant: speak in Kannada, Hindi, or English
- Complaint system: auto-escalates to PDO if not resolved in 7 days

If asked about something outside agriculture or GramSetu, politely redirect to these topics.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// processVoiceCommand — main entry point from VoiceAssistantWidget
// ─────────────────────────────────────────────────────────────────────────────
export async function processVoiceCommand(transcript, lang = 'en') {
  const lower = transcript.toLowerCase().trim();
  if (!lower) return null;

  // ── 1. INSTANT PRE-CACHED ANSWERS (0ms) ──────────────────────────────────
  const instantAnswer = getInstantAnswer(transcript, lang);
  if (instantAnswer) return { type: 'chat', response: instantAnswer };

  // ── 2. NAVIGATION COMMANDS ────────────────────────────────────────────────
  const navCommands = [
    { triggers: ['home', 'ಮನೆ', 'ಮುಖಪುಟ', 'ghar', 'होम'], payload: '/', msgEn: 'Going to home page.', msgKn: 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.', msgHi: 'होम पेज पर जा रहा हूँ।' },
    { triggers: ['dashboard', 'ಡ್ಯಾಶ್ಬೋರ್ಡ್', 'डैशबोर्ड'], payload: '/dashboard/villager', msgEn: 'Opening dashboard.', msgKn: 'ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.', msgHi: 'डैशबोर्ड खोल रहा हूँ।' },
    { triggers: ['complaint', 'ದೂರು', 'shikayat', 'शिकायत'], payload: '/dashboard/villager', msgEn: 'Opening complaints section.', msgKn: 'ದೂರು ವಿಭಾಗ ತೆರೆಯಲಾಗುತ್ತಿದೆ.', msgHi: 'शिकायत अनुभाग खोल रहा हूँ।' },
    { triggers: ['market', 'price', 'apmc', 'ಬೆಲೆ', 'ಮಾರುಕಟ್ಟೆ', 'बाजार', 'भाव'], payload: '/dashboard/villager', msgEn: 'Opening market prices.', msgKn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ತೆರೆಯಲಾಗುತ್ತಿದೆ.', msgHi: 'बाजार भाव खोल रहा हूँ।' },
    { triggers: ['scheme', 'yojana', 'ಯೋಜನೆ', 'योजना', 'subsidy'], payload: '/dashboard/villager', msgEn: 'Opening Government Schemes.', msgKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆ ತೆರೆಯಲಾಗುತ್ತಿದೆ.', msgHi: 'सरकारी योजनाएं खोल रहा हूँ।' },
    { triggers: ['login', 'ಲಾಗಿನ್', 'register', 'नोंदणी'], payload: '/login/villager', msgEn: 'Going to login page.', msgKn: 'ಲಾಗಿನ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇನೆ.', msgHi: 'लॉगिन पेज पर जा रहा हूँ।' },
  ];

  for (const cmd of navCommands) {
    if (cmd.triggers.some(t => lower.includes(t.toLowerCase()))) {
      const msg = lang === 'kn' ? cmd.msgKn : lang === 'hi' ? cmd.msgHi : cmd.msgEn;
      return { type: 'navigate', payload: cmd.payload, response: msg };
    }
  }

  // ── 3. GEMINI AI ──────────────────────────────────────────────────────────
  if (!genAI) {
    const fallbacks = {
      en: 'GramSetu helps Karnataka farmers access government schemes, market prices, and crop disease information. Please visit your dashboard for details.',
      kn: 'ಗ್ರಾಮಸೇತು ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆ, ಮತ್ತು ಬೆಳೆ ರೋಗ ಮಾಹಿತಿ ನೀಡುತ್ತದೆ. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಿರಿ.',
      hi: 'ग्रामसेतु किसानों को सरकारी योजनाएं, बाजार भाव, और फसल रोग जानकारी प्रदान करता है।',
    };
    return { type: 'chat', response: fallbacks[lang] || fallbacks.en };
  }

  const systemInstruction = buildSystemInstruction(lang);

  try {
    let responseText = await callGemini(transcript, systemInstruction);
    if (!responseText) {
      // Gemini timed out or returned empty — give a useful contextual fallback
      const fallbacks = {
        en: `I can help with crop diseases, government schemes, and APMC prices in Karnataka. Please ask me specifically about a crop or scheme.`,
        kn: `ನಾನು ಕರ್ನಾಟಕ ಬೆಳೆ ರೋಗಗಳು, ಸರ್ಕಾರಿ ಯೋಜನೆ, ಮತ್ತು APMC ಬೆಲೆ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ.`,
        hi: `मैं फसल रोग, सरकारी योजनाओं और APMC भाव के बारे में जानकारी दे सकता हूँ।`,
      };
      return { type: 'chat', response: fallbacks[lang] || fallbacks.en };
    }
    responseText = responseText.replace(/[*#_`]/g, '').trim();
    return { type: 'chat', response: responseText };
  } catch (error) {
    if (error.message?.includes('429')) {
      return {
        type: 'chat',
        response: lang === 'kn'
          ? 'ಈಗ ಬಹಳ ಪ್ರಶ್ನೆಗಳು ಬರುತ್ತಿವೆ. ಒಂದು ನಿಮಿಷ ನಿರೀಕ್ಷಿಸಿ.'
          : lang === 'hi' ? 'अभी बहुत अनुरोध हैं। एक मिनट प्रतीक्षा करें।'
          : 'Too many requests right now. Please wait a moment.',
      };
    }
    return {
      type: 'chat',
      response: lang === 'kn'
        ? 'ಕ್ಷಮಿಸಿ, ತಾಂತ್ರಿಕ ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
        : lang === 'hi' ? 'तकनीकी त्रुटि हुई। कृपया पुनः प्रयास करें।'
        : 'A technical error occurred. Please try again.',
    };
  }
}
