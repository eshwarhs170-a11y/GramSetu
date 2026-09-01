import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info, Scan, Leaf, AlertCircle, Microscope, Droplets, FlaskConical, Sprout, ChevronRight, Upload, MessageCircle, Send, ImagePlus, ChevronsDown, Loader2, TriangleAlert, CircleCheck, ScanLine, Image, Crop, Layers, Bot, Pill, Building2, ListChecks, RefreshCw, ArrowRight, Wheat, Zap, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { callGemini, callGeminiVision, callGeminiTranslate } from '../utils/voiceCommands';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────
// COMPREHENSIVE KARNATAKA CROP DISEASE DATABASE
// Based on major crops grown in Karnataka (all districts)
// Diseases from PlantVillage / Kaggle crop disease datasets
// scheme: null means no relevant scheme → section is hidden
// ─────────────────────────────────────────────────────────────────
const CROP_DISEASES = [
  // ── PADDY / RICE ──
  {
    crop: 'Paddy / Rice (ಭತ್ತ)',
    emoji: '🌾',
    disease: 'Blast Disease (Pyricularia oryzae)',
    diseaseKn: 'ಬೆಂಕಿ ರೋಗ',
    severity: 'High',
    remedy: 'Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage. Avoid excess nitrogen.',
    fertilizer: 'Apply 120:60:60 kg NPK/ha in split doses. Avoid excess N.',
    organicTip: 'Use Pseudomonas fluorescens @ 2.5 kg/ha as foliar spray.',
    scheme: 'PMFBY Pradhan Mantri Fasal Bima Yojana',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#f59e0b',
    keyTakeaways: ['Affects leaves, neck, and panicles', 'High humidity & cool nights favor outbreak', 'Use resistant varieties like BPT 5204'],
  },
  {
    crop: 'Paddy / Rice (ಭತ್ತ)',
    emoji: '🌾',
    disease: 'Brown Plant Hopper (Nilaparvata lugens)',
    diseaseKn: 'ಕಂದು ಎಲೆ ಹೇನು',
    severity: 'High',
    remedy: 'Apply Imidacloprid 17.8 SL @ 0.5 mL/L or Buprofezin 25 SC @ 1.25 mL/L. Drain water for 3–4 days.',
    fertilizer: 'Reduce N application; avoid excessive tillering.',
    organicTip: 'Spray NSKE 5% (Neem Seed Kernel Extract) early stage.',
    scheme: 'Raitha Samparka Kendra Pest Alert',
    schemeLink: 'https://raitamitra.karnataka.gov.in/',
    color: '#d97706',
    keyTakeaways: ['Causes "hopperburn" — circular burned patches', 'Vector for Grassy Stunt & Ragged Stunt viruses', 'Avoid dense transplanting'],
  },
  {
    crop: 'Paddy / Rice (ಭತ್ತ)',
    emoji: '🌾',
    disease: 'Sheath Blight (Rhizoctonia solani)',
    diseaseKn: 'ತೊಗಟೆ ಅಂಗಮಾರಿ',
    severity: 'Medium',
    remedy: 'Spray Validamycin 3 SL @ 2 mL/L or Hexaconazole 5 EC @ 1 mL/L. Improve air circulation.',
    fertilizer: 'Balanced K application (MOP 60 kg/ha) strengthens cell walls.',
    organicTip: 'Apply Trichoderma viride 1% WP @ 4 kg/ha at tillering.',
    scheme: null,
    color: '#92400e',
    keyTakeaways: ['Water-borne fungus; spreads via irrigation water', 'High N + high humidity trigger outbreaks', 'Field sanitation — burn crop debris'],
  },

  // ── RAGI (FINGER MILLET) ──
  {
    crop: 'Ragi / Finger Millet (ರಾಗಿ)',
    emoji: '🌿',
    disease: 'Blast Disease (Pyricularia grisea)',
    diseaseKn: 'ಬೆಂಕಿ ರೋಗ',
    severity: 'High',
    remedy: 'Spray Tricyclazole 75 WP @ 0.6 g/L. Seed treatment with Carbendazim @ 2 g/kg.',
    fertilizer: 'Apply 50:40:25 kg NPK/ha for rainfed Ragi.',
    organicTip: 'Spray cow urine 10% solution at 15-day intervals as preventive.',
    scheme: 'Raitha Siri Scheme (ರೈತ ಸಿರಿ) — ₹10,000/hectare',
    schemeLink: 'https://raitamitra.karnataka.gov.in/',
    color: '#ef4444',
    keyTakeaways: ['Karnataka accounts for 40% of India\'s Ragi production', 'Affects neck, finger, and leaf', 'Sow resistant variety GPU-28'],
  },
  {
    crop: 'Ragi / Finger Millet (ರಾಗಿ)',
    emoji: '🌿',
    disease: 'Head Smut (Ustilago crameri)',
    diseaseKn: 'ತಲೆ ಕರಿ ರೋಗ',
    severity: 'Medium',
    remedy: 'Seed treatment with Carboxin 37.5% + Thiram 37.5% DS @ 3 g/kg seed.',
    fertilizer: 'No specific change; maintain balanced nutrition.',
    organicTip: 'Hot water treatment of seeds at 52°C for 10 minutes before sowing.',
    scheme: null,
    color: '#dc2626',
    keyTakeaways: ['Soil-borne seed-borne fungus', 'Entire ear head converted to smut mass', 'Use certified disease-free seed'],
  },

  // ── MAIZE ──
  {
    crop: 'Maize / Corn (ಜೋಳ)',
    emoji: '🌽',
    disease: 'Fall Armyworm (Spodoptera frugiperda)',
    diseaseKn: 'ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್',
    severity: 'High',
    remedy: 'Apply Emamectin Benzoate 5 SG @ 0.4 g/L or Chlorantraniliprole 18.5 SC @ 0.4 mL/L. Apply into whorl early morning.',
    fertilizer: 'Well-timed top dressing of urea @ 50 kg/ha at V6 stage strengthens plant.',
    organicTip: 'Apply sand + lime mixture (9:1) in the whorl. Release Trichogramma @ 1 lakh/ha.',
    scheme: 'PMFBY Crop Insurance (Maize)',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#eab308',
    keyTakeaways: ['Invasive pest; first detected in India 2018', 'Causes ₹12,000 Cr loss annually in India', 'Early morning scouting is essential'],
  },
  {
    crop: 'Maize / Corn (ಜೋಳ)',
    emoji: '🌽',
    disease: 'Northern Leaf Blight (Exserohilum turcicum)',
    diseaseKn: 'ಉತ್ತರ ಎಲೆ ಅಂಗಮಾರಿ',
    severity: 'Medium',
    remedy: 'Spray Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L.',
    fertilizer: 'Ensure adequate K and balanced N to reduce susceptibility.',
    organicTip: 'Bordeaux mixture 1% spray at early symptom stage.',
    scheme: null,
    color: '#ca8a04',
    keyTakeaways: ['Long, cigar-shaped gray-green lesions on leaves', 'Cool, moist weather triggers spread', 'Grows from lower leaves upward'],
  },

  // ── COTTON ──
  {
    crop: 'Cotton (ಹತ್ತಿ)',
    emoji: '🪴',
    disease: 'Pink Bollworm (Pectinophora gossypiella)',
    diseaseKn: 'ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ',
    severity: 'High',
    remedy: 'Install 5 pheromone traps per acre for monitoring. Spray Spinosad 45 SC @ 0.3 mL/L or Profenofos 50 EC @ 2 mL/L. Hand-pick damaged bolls.',
    fertilizer: 'Apply Zinc Sulphate @ 25 kg/ha if deficient. Avoid excess N.',
    organicTip: 'Release Trichogramma chilonis @ 1.5 lakh eggs/ha at 15-day intervals.',
    scheme: 'Cotton Corporation of India — MSP Support',
    schemeLink: 'https://cotcorp.org.in/',
    color: '#ec4899',
    keyTakeaways: ['Major pest of Bt cotton too', 'Damage inside bolls → fiber quality loss', 'Sex pheromone traps essential for IPM'],
  },
  {
    crop: 'Cotton (ಹತ್ತಿ)',
    emoji: '🪴',
    disease: 'Leaf Curl Virus (Cotton Leaf Curl Disease)',
    diseaseKn: 'ಎಲೆ ಮುದುಡು ರೋಗ',
    severity: 'High',
    remedy: 'No chemical cure. Uproot and destroy infected plants. Control whitefly vector with Imidacloprid 17.8 SL @ 0.5 mL/L.',
    fertilizer: 'No specific change; strengthen plants with K and micronutrients.',
    organicTip: 'Yellow sticky traps for whitefly monitoring (5/acre).',
    scheme: null,
    color: '#db2777',
    keyTakeaways: ['Whitefly (Bemisia tabaci) transmits the virus', 'Cannot be cured — only prevented', 'Uproot infected plants immediately'],
  },

  // ── TOMATO ──
  {
    crop: 'Tomato (ಟೊಮೇಟೊ)',
    emoji: '🍅',
    disease: 'Late Blight (Phytophthora infestans)',
    diseaseKn: 'ಅಂಗಮಾರಿ ರೋಗ',
    severity: 'High',
    remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Metalaxyl + Mancozeb 72 WP @ 2.5 g/L. Repeat every 7 days in wet weather.',
    fertilizer: 'Ensure adequate Calcium (foliar CaCl₂ 0.5%) to strengthen cell walls.',
    organicTip: 'Spray Bordeaux mixture 0.5% as preventive measure every 10 days.',
    scheme: 'PMFBY Crop Insurance (Vegetables)',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#f97316',
    keyTakeaways: ['Same pathogen that caused Irish Potato Famine 1845', 'Spreads rapidly in cool + humid conditions', 'Infected fruits turn dark brown & inedible'],
  },
  {
    crop: 'Tomato (ಟೊಮೇಟೊ)',
    emoji: '🍅',
    disease: 'Tomato Leaf Miner (Tuta absoluta)',
    diseaseKn: 'ಎಲೆ ಗಣಿ ಕೀಟ',
    severity: 'High',
    remedy: 'Apply Coragen (Chlorantraniliprole) 18.5 SC @ 0.3 mL/L. Install delta traps with pheromone lures.',
    fertilizer: 'No direct fertilizer link; healthy plants resist better.',
    organicTip: 'Release Nesidiocoris tenuis (predator bug) for biological control.',
    scheme: null,
    color: '#ea580c',
    keyTakeaways: ['Invasive pest — high economic damage', 'Mines inside leaves; also attacks fruits', 'Complete tunnels visible on leaves'],
  },
  {
    crop: 'Tomato (ಟೊಮೇಟೊ)',
    emoji: '🍅',
    disease: 'Early Blight (Alternaria solani)',
    diseaseKn: 'ಆರಂಭಿಕ ಅಂಗಮಾರಿ',
    severity: 'Medium',
    remedy: 'Spray Iprodione 50 WP @ 1.5 g/L or Azoxystrobin 23 SC @ 1 mL/L.',
    fertilizer: 'Adequate Potassium reduces severity. K₂O @ 100 kg/ha.',
    organicTip: 'Garlic extract spray (5%) has antifungal properties.',
    scheme: null,
    color: '#c2410c',
    keyTakeaways: ['Concentric ring pattern on leaves', 'Starts from lower leaves, moves up', 'Use certified disease-free transplants'],
  },

  // ── POTATO ──
  {
    crop: 'Potato (ಆಲೂಗಡ್ಡೆ)',
    emoji: '🥔',
    disease: 'Late Blight (Phytophthora infestans)',
    diseaseKn: 'ಅಂಗಮಾರಿ ರೋಗ',
    severity: 'High',
    remedy: 'Spray Cymoxanil + Mancozeb 72 WP @ 2.5 g/L. Apply before onset of rainy season.',
    fertilizer: 'Earthing up with soil + adequate K reduces tuber infection.',
    organicTip: 'Spray decoction of garlic + chili (5%) as preventive measure.',
    scheme: 'Horticulture Crop Insurance (Karnataka)',
    schemeLink: 'https://horticulturedir.karnataka.gov.in/',
    color: '#a16207',
    keyTakeaways: ['Water-mold type pathogen', 'Dark brown spots with white fungal growth underneath', 'Cool 12–18°C + rain = epidemic conditions'],
  },

  // ── ONION ──
  {
    crop: 'Onion (ಈರುಳ್ಳಿ)',
    emoji: '🧅',
    disease: 'Purple Blotch (Alternaria porri)',
    diseaseKn: 'ನೇರಳೆ ಚುಕ್ಕೆ ರೋಗ',
    severity: 'Medium',
    remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Iprodione 50 WP @ 1.5 g/L. Repeat at 10-day intervals.',
    fertilizer: 'Avoid excess N. Apply S (Sulphur @ 20 kg/ha).',
    organicTip: 'Spray NSKE 5% + Pseudomonas fluorescens @ 2.5 kg/ha.',
    scheme: 'PMFBY (Rabi Onion)',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#7c3aed',
    keyTakeaways: ['Purple-centered lesions with yellow halo', 'Thrips injury predisposes plants', 'Avoid overhead irrigation'],
  },

  // ── SUGARCANE ──
  {
    crop: 'Sugarcane (ಕಬ್ಬು)',
    emoji: '🎍',
    disease: 'Red Rot (Colletotrichum falcatum)',
    diseaseKn: 'ಕೆಂಪು ಕೊಳೆ ರೋಗ',
    severity: 'High',
    remedy: 'Plant disease-free setts from certified nurseries. Treat setts with Carbendazim 0.1% for 15 min. Crop rotation with paddy.',
    fertilizer: 'Apply 250:100:125 kg NPK/ha. Adequate K builds resistance.',
    organicTip: 'Apply Trichoderma viride with FYM @ 25 kg/ha in furrows.',
    scheme: 'FRP (Fair & Remunerative Price) Support',
    schemeLink: 'https://sugarcane.kar.nic.in/',
    color: '#84cc16',
    keyTakeaways: ['Most destructive disease of sugarcane', 'Splits cane shows red + white patches', 'Destroy infected ratoons; do not retain'],
  },
  {
    crop: 'Sugarcane (ಕಬ್ಬು)',
    emoji: '🎍',
    disease: 'Smut (Ustilago scitaminea)',
    diseaseKn: 'ಕರಿ ಕೊಳಾಯಿ ರೋಗ',
    severity: 'Medium',
    remedy: 'Hot water treatment of setts at 50°C for 2 hours. Use resistant varieties (Co 86032, CoV 92102).',
    fertilizer: 'Standard NPK; no specific change.',
    organicTip: 'Biocontrol: Coniothyrium minitans for soil treatment.',
    scheme: null,
    color: '#65a30d',
    keyTakeaways: ['Whip-like black structure from growing point', 'Seed-borne disease', 'Remove and burn black whip immediately'],
  },

  // ── COCONUT ──
  {
    crop: 'Coconut (ತೆಂಗು)',
    emoji: '🥥',
    disease: 'Rhinoceros Beetle (Oryctes rhinoceros)',
    diseaseKn: 'ಖಡ್ಗಮೃಗ ದುಂಬಿ',
    severity: 'High',
    remedy: 'Extract beetles using wire hooks. Apply Sevidol 8G @ 25 g/palm inside young leaf axils. Pheromone traps @ 1/acre.',
    fertilizer: 'Apply 50 kg FYM + 1.3 kg NPK mixture per palm annually.',
    organicTip: 'Apply Baculovirus oryctes (BV) for biological control in compost.',
    scheme: 'Coconut Development Board Schemes',
    schemeLink: 'https://coconutboard.gov.in/',
    color: '#14b8a6',
    keyTakeaways: ['Bores into growing point → V-shaped cuts on leaves', 'Breeds in decaying organic matter', 'Clean compost pits + pheromone traps key'],
  },
  {
    crop: 'Coconut (ತೆಂಗು)',
    emoji: '🥥',
    disease: 'Root Wilt (Phytoplasma)',
    diseaseKn: 'ಬೇರು ಸೊರಗು ರೋಗ',
    severity: 'High',
    remedy: 'No chemical cure. Inject oxytetracycline into trunk (Kerala treatment protocol). Destroy severely infected palms.',
    fertilizer: 'Spray micronutrients — Mn, Zn, B foliar sprays monthly.',
    organicTip: 'Apply neem cake 5 kg + Trichoderma 1 kg in basins.',
    scheme: null,
    color: '#0d9488',
    keyTakeaways: ['Phytoplasma — transmitted by plant hoppers', 'Yellowing from lower fronds upward', 'No curative treatment — early removal recommended'],
  },

  // ── ARECANUT ──
  {
    crop: 'Arecanut (ಅಡಿಕೆ)',
    emoji: '🌴',
    disease: 'Yellow Leaf Disease (Phytoplasma)',
    diseaseKn: 'ಹಳದಿ ಎಲೆ ರೋಗ',
    severity: 'High',
    remedy: 'No direct cure. Apply Bordeaux mixture (1%) spray monthly. Ensure drainage. Oxytetracycline injection (200 mg/palm).',
    fertilizer: 'Apply 150g N + 60g P₂O₅ + 200g K₂O per palm yearly. Mg and Zn spray.',
    organicTip: 'Apply green leaf manure + compost in the basin. Intercrop with banana.',
    scheme: 'Horticulture Crop Insurance (Karnataka)',
    schemeLink: 'https://horticulturedir.karnataka.gov.in/',
    color: '#eab308',
    keyTakeaways: ['Major disease of arecanut in Karnataka', 'Transmitted by Myndus crudus leafhopper', 'Yellowing + drying from oldest leaves'],
  },
  {
    crop: 'Arecanut (ಅಡಿಕೆ)',
    emoji: '🌴',
    disease: 'Bud Rot (Phytophthora meadii)',
    diseaseKn: 'ಮೊಗ್ಗು ಕೊಳೆ ರೋಗ',
    severity: 'High',
    remedy: 'Remove and destroy infected bud and lower leaves. Apply Bordeaux paste on cut surfaces. Spray Metalaxyl + Mancozeb 72 WP @ 2 g/L.',
    fertilizer: 'Avoid waterlogging. Apply MOP 200 g/palm.',
    organicTip: 'Pour 100 mL Bordeaux mixture 1% into the crown monthly during monsoon.',
    scheme: null,
    color: '#d97706',
    keyTakeaways: ['Most serious monsoon disease of Arecanut', 'Water-mold — spreads through rain splash', 'Crown of palm rots and whole palm dies'],
  },

  // ── COFFEE ──
  {
    crop: 'Coffee (ಕಾಫಿ)',
    emoji: '☕',
    disease: 'White Stem Borer (Xylotrechus quadripes)',
    diseaseKn: 'ಬಿಳಿ ಕಾಂಡ ಕೊರಕ',
    severity: 'High',
    remedy: 'Uproot and burn affected plants. Pheromone traps (4/ha). Stem paint with Chlorpyriphos 20 EC (1:10 with water).',
    fertilizer: 'Apply NPK 120:90:120 kg/ha in 3 split doses. Mg 30 kg/ha.',
    organicTip: 'Shade management: proper pruning reduces humidity that aids beetles.',
    scheme: 'Coffee Board Subsidies (Integrated Crop Management)',
    schemeLink: 'https://indiacoffee.org/schemes/',
    color: '#8b5cf6',
    keyTakeaways: ['Most devastating pest of coffee in India', 'Adult beetles lay eggs on stem bark', 'Attack during summer; adult emergence post-monsoon'],
  },
  {
    crop: 'Coffee (ಕಾಫಿ)',
    emoji: '☕',
    disease: 'Coffee Leaf Rust (Hemileia vastatrix)',
    diseaseKn: 'ಎಲೆ ತುಕ್ಕು ರೋಗ',
    severity: 'High',
    remedy: 'Spray Copper oxychloride 50 WP @ 3 g/L. Apply Propiconazole 25 EC @ 1 mL/L for heavy infection.',
    fertilizer: 'Apply K₂O 100 kg/ha to improve resistance. Avoid excess shade.',
    organicTip: 'Copper-based Bordeaux mixture 0.5% spray at berry development.',
    scheme: null,
    color: '#7c3aed',
    keyTakeaways: ['Orange powdery spore masses on leaf underside', 'Wind-spread; rapid in humid conditions', 'Shade management crucial for control'],
  },

  // ── BANANA ──
  {
    crop: 'Banana (ಬಾಳೆ)',
    emoji: '🍌',
    disease: 'Panama Wilt / Fusarium Wilt (Fusarium oxysporum)',
    diseaseKn: 'ಫ್ಯೂಸೇರಿಯಂ ಸೊರಗು ರೋಗ',
    severity: 'High',
    remedy: 'No chemical cure. Remove and destroy affected plants. Use Trichoderma viride @ 4 kg/ha soil application.',
    fertilizer: 'Apply FYM 10 kg/plant + KNO₃ spray 1%.',
    organicTip: 'Grow resistant cultivars (Grand Naine, Dwarf Cavendish). Biopriming with Trichoderma.',
    scheme: 'Horticulture Crop Insurance (Karnataka)',
    schemeLink: 'https://horticulturedir.karnataka.gov.in/',
    color: '#facc15',
    keyTakeaways: ['Soil-borne disease — no pesticide cure', 'Vascular tissue turns brown when cut', 'Once in soil, persists for 30+ years'],
  },
  {
    crop: 'Banana (ಬಾಳೆ)',
    emoji: '🍌',
    disease: 'Sigatoka Leaf Spot (Mycosphaerella fijiensis)',
    diseaseKn: 'ಕಪ್ಪು ಸಿಗಟೋಕ',
    severity: 'Medium',
    remedy: 'Spray Propiconazole 25 EC @ 0.5 mL/L or Mancozeb 75 WP @ 2 g/L. Alternate fungicides to avoid resistance.',
    fertilizer: 'Adequate K (150 g MOP/plant) reduces susceptibility.',
    organicTip: 'Remove old leaves. Apply mineral oil spray (1%) to reduce spore germination.',
    scheme: null,
    color: '#eab308',
    keyTakeaways: ['Most serious foliar disease globally', 'Streaks → necrotic patches on leaves', 'Reduces photosynthesis, yield by 50%'],
  },

  // ── MANGO ──
  {
    crop: 'Mango (ಮಾವು)',
    emoji: '🥭',
    disease: 'Anthracnose (Colletotrichum gloeosporioides)',
    diseaseKn: 'ಆಂಥ್ರಾಕ್ನೋಸ್ ರೋಗ',
    severity: 'Medium',
    remedy: 'Spray Copper oxychloride 50 WP @ 3 g/L at flowering. Carbendazim 50 WP @ 1 g/L on young fruits.',
    fertilizer: 'Balanced nutrition; avoid excess N during fruit development.',
    organicTip: 'Bordeaux mixture 1% spray at panicle emergence.',
    scheme: 'Horticulture Crop Insurance (Karnataka)',
    schemeLink: 'https://horticulturedir.karnataka.gov.in/',
    color: '#f59e0b',
    keyTakeaways: ['Black spots on flowers, leaves, and fruits', 'Post-harvest disease too', 'High rainfall during flowering = risk'],
  },
  {
    crop: 'Mango (ಮಾವು)',
    emoji: '🥭',
    disease: 'Mango Hoppers (Idioscopus clypealis)',
    diseaseKn: 'ತಿಗಣೆ ಕೀಟ',
    severity: 'High',
    remedy: 'Spray Imidacloprid 17.8 SL @ 0.25 mL/L or Carbaryl 50 WP @ 2 g/L at 50% flowering.',
    fertilizer: 'Balanced N-P-K. Avoid excess N that attracts pests.',
    organicTip: 'NSKE 5% spray as repellent at pre-flowering stage.',
    scheme: null,
    color: '#d97706',
    keyTakeaways: ['Sucks sap from flowers → no fruit set', 'Honeydew excretion causes sooty mold', 'Critical to spray at early bloom stage'],
  },

  // ── GROUNDNUT ──
  {
    crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)',
    emoji: '🥜',
    disease: 'Early Leaf Spot (Cercospora arachidicola)',
    diseaseKn: 'ಆರಂಭಿಕ ಎಲೆ ಚುಕ್ಕೆ',
    severity: 'Medium',
    remedy: 'Spray Chlorothalonil 75 WP @ 2 g/L or Mancozeb 75 WP @ 2.5 g/L every 14 days.',
    fertilizer: 'Apply gypsum 400 kg/ha at pegging to supply Ca + S for pod filling.',
    organicTip: 'Spray NSKE 5% as preventive spray at 30 DAS.',
    scheme: 'PMFBY Kharif Oilseeds',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#d97706',
    keyTakeaways: ['Brown spots with yellow halo', 'Can reduce yield by 50% in severe cases', 'Karnataka\'s main Kharif oilseed crop'],
  },

  // ── SUNFLOWER ──
  {
    crop: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ)',
    emoji: '🌻',
    disease: 'Downy Mildew (Plasmopara halstedii)',
    diseaseKn: 'ತೇವ ತುಪ್ಪಟ ರೋಗ',
    severity: 'High',
    remedy: 'Seed treatment with Metalaxyl 35 WS @ 6 g/kg. Spray Mancozeb 75 WP @ 2.5 g/L.',
    fertilizer: 'Ensure Mn and Zn micronutrients at seedling stage.',
    organicTip: 'Use bio-priming with Pseudomonas fluorescens @ 10 g/kg seed.',
    scheme: 'PMFBY Oilseed Crop Insurance',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#fbbf24',
    keyTakeaways: ['Stunted plant, white coating on leaf underside', 'Karnataka is top sunflower producer in India', 'Seed treatment is most effective prevention'],
  },

  // ── SOYBEAN ──
  {
    crop: 'Soybean (ಸೋಯಾಬೀನ್)',
    emoji: '🫘',
    disease: 'Yellow Mosaic Virus (MYMV)',
    diseaseKn: 'ಹಳದಿ ಮೊಸ್ಯಾಕ್ ರೋಗ',
    severity: 'High',
    remedy: 'No cure. Control whitefly vector: Imidacloprid 17.8 SL @ 0.5 mL/L. Uproot infected plants.',
    fertilizer: 'Balanced nutrition. Avoid excess N that promotes whitefly.',
    organicTip: 'Yellow sticky traps (10/acre) to monitor whitefly.',
    scheme: null,
    color: '#65a30d',
    keyTakeaways: ['Whitefly-transmitted begomovirus', 'Yellow-green mosaic on leaves', 'Up to 95% yield loss in severe cases'],
  },

  // ── WHEAT ──
  {
    crop: 'Wheat (ಗೋಧಿ)',
    emoji: '🌾',
    disease: 'Yellow Rust / Stripe Rust (Puccinia striiformis)',
    diseaseKn: 'ಹಳದಿ ತುಕ್ಕು',
    severity: 'High',
    remedy: 'Spray Propiconazole 25 EC @ 1 mL/L or Tebuconazole 25.9 EC @ 1 mL/L.',
    fertilizer: 'Adequate K (MOP 40 kg/ha) strengthens resistance.',
    organicTip: 'Use resistant varieties like HD 2967, GW 496.',
    scheme: 'PMFBY Rabi Crop Insurance',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#f59e0b',
    keyTakeaways: ['Yellow-orange stripes parallel to leaf veins', 'Cool temperatures (10–15°C) favor spread', 'Can cause 70% yield loss if untreated'],
  },

  // ── JOWAR / SORGHUM ──
  {
    crop: 'Jowar / Sorghum (ಜೋಳ)',
    emoji: '🌾',
    disease: 'Grain Mold (Fusarium + Curvularia + Alternaria complex)',
    diseaseKn: 'ಧಾನ್ಯ ಚಿಗರಿ ರೋಗ',
    severity: 'Medium',
    remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Thiram 75 WP @ 2 g/L at grain filling stage.',
    fertilizer: 'Adequate K improves grain quality. Avoid excess N.',
    organicTip: 'Harvest early when grains reach physiological maturity.',
    scheme: null,
    color: '#92400e',
    keyTakeaways: ['Pink/red/black discoloration of grain', 'Reduces grain quality and germination', 'Timely harvest is key prevention'],
  },

  // ── BENGAL GRAM / CHICKPEA ──
  {
    crop: 'Chickpea / Bengal Gram (ಕಡಲೆ)',
    emoji: '🫛',
    disease: 'Fusarium Wilt (Fusarium oxysporum f. sp. ciceris)',
    diseaseKn: 'ಫ್ಯೂಸೇರಿಯಂ ಸೊರಗು',
    severity: 'High',
    remedy: 'Seed treatment with Carbendazim 50 WP @ 2 g/kg + Trichoderma viride @ 4 g/kg. Use resistant varieties (JG 62, Annigeri).',
    fertilizer: 'Apply DAP @ 75 kg/ha + Rhizobium culture seed treatment.',
    organicTip: 'Soil application of Trichoderma viride @ 5 kg/ha at sowing.',
    scheme: 'PM Fasal Bima Yojana (Rabi Pulses)',
    schemeLink: 'https://pmfby.gov.in/',
    color: '#d97706',
    keyTakeaways: ['Soil-borne disease; persists many years', 'Yellowing + wilting, especially single branches', 'Crop rotation with non-legume for 3 years'],
  },

  // ── PEPPER ──
  {
    crop: 'Black Pepper (ಕರಿಮೆಣಸು)',
    emoji: '🌶️',
    disease: 'Phytophthora Foot Rot (Phytophthora capsici)',
    diseaseKn: 'ಫೈಟೊಫ್ತೊರಾ ಕಾಂಡ ಕೊಳೆ',
    severity: 'High',
    remedy: 'Drench soil with Metalaxyl + Mancozeb 72 WP @ 2.5 g/L. Apply Copper oxychloride 50 WP @ 3 g/L as foliar spray.',
    fertilizer: 'Improve drainage. Apply MOP 250 g/vine + lime 500 g/vine.',
    organicTip: 'Biocontrol: Trichoderma + Pseudomonas mix in soil drench.',
    scheme: 'Spices Board India Subsidies',
    schemeLink: 'https://www.indianspices.com/',
    color: '#1d4ed8',
    keyTakeaways: ['Quick wilting and collar rot', 'Spreads rapidly in monsoon waterlogging', 'Improve drainage before onset of rains'],
  },
];

// Build unique crop list for the selector
const UNIQUE_CROPS = [...new Set(CROP_DISEASES.map(d => d.crop))];

const SEVERITY_CONFIG = {
  High:   { bg: '#fee2e2', text: '#b91c1c', label: '⚠️ High Severity' },
  Medium: { bg: '#fef9c3', text: '#854d0e', label: '⚡ Medium Severity' },
  Low:    { bg: '#dcfce7', text: '#14532d', label: '✅ Low Severity' },
};


export default function CropScanner() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  // ── Page flow: 'home' | 'scanner' | 'result' ──
  const [page, setPage] = useState('home');

  // Scanner state
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('NO_CROP');
  const [scanPhase, setScanPhase] = useState('idle');
  const [notCropMsg, setNotCropMsg] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('remedy');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [translatedRemedy, setTranslatedRemedy] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Image upload & panning
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanMode, setScanMode] = useState('camera');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentPan = useRef({ x: 0, y: 0 });

  // Q&A Chat
  const [qaChat, setQaChat] = useState([]);
  const [qaInput, setQaInput] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const qaChatEndRef = useRef(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    qaChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaChat, qaLoading]);

  // Start camera only when on scanner page
  useEffect(() => {
    if (page !== 'scanner') return;
    let activeStream = null;
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        activeStream = s; setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch {
        try {
          const fb = await navigator.mediaDevices.getUserMedia({ video: true });
          activeStream = fb; setStream(fb);
          if (videoRef.current) videoRef.current.srcObject = fb;
        } catch { setCameraError(true); }
      }
    };
    startCamera();
    return () => {
      if (activeStream) activeStream.getTracks().forEach(t => t.stop());
      setStream(null);
    };
  }, [page]);

  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  // ── Helper: fuzzy-match AI crop/disease name to our CROP_DISEASES database ──
  const matchAiToDatabase = (cropName, diseaseName) => {
    if (!cropName) return null;
    const cLower = cropName.toLowerCase();
    const dLower = (diseaseName || '').toLowerCase();

    // Map AI crop names → our DB crop keys (partial match)
    const cropKeywords = [
      { keys: ['paddy', 'rice', 'ಭತ್ತ'],            db: 'Paddy / Rice (ಭತ್ತ)' },
      { keys: ['ragi', 'finger millet', 'ರಾಗಿ'],      db: 'Ragi / Finger Millet (ರಾಗಿ)' },
      { keys: ['maize', 'corn', 'ಜೋಳ'],              db: 'Maize / Corn (ಜೋಳ)' },
      { keys: ['cotton', 'ಹತ್ತಿ'],                   db: 'Cotton (ಹತ್ತಿ)' },
      { keys: ['tomato', 'ಟೊಮೇಟೊ'],                  db: 'Tomato (ಟೊಮೇಟೊ)' },
      { keys: ['potato', 'ಆಲೂ'],                     db: 'Potato (ಆಲೂಗಡ್ಡೆ)' },
      { keys: ['onion', 'ಈರುಳ್ಳಿ'],                  db: 'Onion (ಈರುಳ್ಳಿ)' },
      { keys: ['sugarcane', 'ಕಬ್ಬು'],                db: 'Sugarcane (ಕಬ್ಬು)' },
      { keys: ['coconut', 'ತೆಂಗು'],                  db: 'Coconut (ತೆಂಗು)' },
      { keys: ['arecanut', 'areca', 'ಅಡಿಕೆ'],        db: 'Arecanut (ಅಡಿಕೆ)' },
      { keys: ['coffee', 'ಕಾಫಿ'],                    db: 'Coffee (ಕಾಫಿ)' },
      { keys: ['banana', 'ಬಾಳೆ'],                    db: 'Banana (ಬಾಳೆ)' },
      { keys: ['mango', 'ಮಾವು'],                     db: 'Mango (ಮಾವು)' },
      { keys: ['groundnut', 'peanut', 'ಕಡಲೆಕಾಯಿ'],  db: 'Groundnut (ಕಡಲೆಕಾಯಿ)' },
      { keys: ['sunflower', 'ಸೂರ್ಯಕಾಂತಿ'],           db: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ)' },
      { keys: ['soybean', 'soya', 'ಸೋಯಾ'],           db: 'Soybean (ಸೋಯಾಬೀನ್)' },
      { keys: ['wheat', 'ಗೋಧಿ'],                     db: 'Wheat (ಗೋಧಿ)' },
      { keys: ['jowar', 'sorghum', 'ಜೋಳ'],           db: 'Jowar / Sorghum (ಜೋಳ)' },
      { keys: ['chickpea', 'bengal gram', 'ಕಡಲೆ'],  db: 'Chickpea / Bengal Gram (ಕಡಲೆ)' },
      { keys: ['pepper', 'black pepper', 'ಮೆಣಸು'],  db: 'Black Pepper (ಕರಿಮೆಣಸು)' },
    ];

    let matchedCropName = null;
    for (const { keys, db } of cropKeywords) {
      if (keys.some(k => cLower.includes(k.toLowerCase()))) { matchedCropName = db; break; }
    }
    if (!matchedCropName) return null;

    const cropMatches = CROP_DISEASES.filter(d => d.crop === matchedCropName);
    if (!cropMatches.length) return null;

    // Try to match disease name too
    if (dLower && !dLower.includes('healthy') && !dLower.includes('no disease')) {
      const diseaseKeywords = [
        ['blast', 'blast'],
        ['brown plant hopper', 'brown plant hopper'],
        ['sheath blight', 'sheath blight'],
        ['head smut', 'head smut'],
        ['fall armyworm', 'fall armyworm'],
        ['northern leaf blight', 'northern leaf blight'],
        ['pink bollworm', 'pink bollworm'],
        ['leaf curl', 'leaf curl'],
        ['late blight', 'late blight'],
        ['leaf miner', 'leaf miner'],
        ['early blight', 'early blight'],
        ['purple blotch', 'purple blotch'],
        ['red rot', 'red rot'],
        ['smut', 'smut'],
        ['rhinoceros', 'rhinoceros'],
        ['root wilt', 'root wilt'],
        ['yellow leaf', 'yellow leaf'],
        ['bud rot', 'bud rot'],
        ['stem borer', 'stem borer'],
        ['leaf rust', 'leaf rust'],
        ['fusarium wilt', 'fusarium wilt'],
        ['panama wilt', 'panama wilt'],
        ['sigatoka', 'sigatoka'],
        ['anthracnose', 'anthracnose'],
        ['hoppers', 'hoppers'],
        ['leaf spot', 'leaf spot'],
        ['downy mildew', 'downy mildew'],
        ['mosaic', 'mosaic'],
        ['yellow rust', 'yellow rust'],
        ['stripe rust', 'stripe rust'],
        ['grain mold', 'grain mold'],
        ['foot rot', 'foot rot'],
      ];
      for (const [keyword] of diseaseKeywords) {
        if (dLower.includes(keyword)) {
          const diseaseMatch = cropMatches.find(d => d.disease.toLowerCase().includes(keyword));
          if (diseaseMatch) return diseaseMatch;
        }
      }
    }
    // Return the first disease for this crop as best match
    return cropMatches[0];
  };

  // ── Capture a frame from the live camera video ──
  const captureVideoFrame = () => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    // Return base64 without the data:image/jpeg;base64, prefix
    return dataUrl.split(',')[1];
  };

  const handleScan = async () => {
    if (scanning) return;
    setNotCropMsg(null);
    setScanning(true); setResult(null); setScanPhase('scanning'); setScanProgress(0); setQaChat([]);

    // Animate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 4;
      if (progress >= 85) { progress = 85; clearInterval(interval); }
      setScanProgress(Math.round(progress));
    }, 150);

    try {
      // Capture frame from camera
      const base64Frame = captureVideoFrame();

      let finalResult = null;

      if (base64Frame) {
        // Use AI vision to analyze the captured frame
        const visionData = await callGeminiVision(base64Frame, 'image/jpeg');

        if (visionData === null) {
          // API unavailable — show error, do NOT silently show wrong results
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '📡 AI ವಿಶ್ಲೇಷಣೆ ಲಭ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
            : '📡 AI analysis unavailable. Please check your internet and try again.');
          return;
        } else if (!visionData.isCrop) {
          // AI says this is NOT a crop image
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '🌿 ಇದು ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ. ಬೆಳೆಯ ಎಲೆ, ಕಾಂಡ ಅಥವಾ ಹಣ್ಣಿನ ಮೇಲೆ ಕ್ಯಾಮರಾ ತಿರುಗಿಸಿ.'
            : '🌿 Not a crop image. Please point the camera at a crop leaf, stem or fruit and try again.');
          return;
        } else {
          // AI identified a crop — match to our database
          const matched = matchAiToDatabase(visionData.cropName, visionData.diseaseName);
          finalResult = matched;
        }
      } else {
        // No camera frame captured
        clearInterval(interval);
        setScanProgress(100);
        setScanning(false); setScanPhase('idle');
        setNotCropMsg(lang === 'kn' ? '📷 ಕ್ಯಾಮರಾ ಸಿದ್ಧವಾಗಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : '📷 Camera not ready. Please try again.');
        return;
      }

      clearInterval(interval);
      setScanProgress(100);
      await new Promise(r => setTimeout(r, 400));
      setScanning(false); setScanPhase('done');

      if (finalResult) {
        setResult(finalResult); setActiveTab('remedy'); setTranslatedRemedy(null);
        if (lang === 'kn' && finalResult.remedy) {
          setIsTranslating(true);
          callGeminiTranslate(finalResult.remedy, 'kn').then(t => { if (t) setTranslatedRemedy(t); setIsTranslating(false); });
        }
      } else {
        setResult('NO_CROP');
      }
      setPage('result');
    } catch (err) {
      clearInterval(interval);
      setScanProgress(100);
      setScanning(false); setScanPhase('idle');
      console.error('Scan error:', err);
      // Graceful fallback
      if (selectedCrop !== 'NO_CROP') {
        const matches = CROP_DISEASES.filter(d => d.crop === selectedCrop);
        if (matches.length > 0) { setResult(matches[0]); setActiveTab('remedy'); setPage('result'); }
        else { setResult('NO_CROP'); setPage('result'); }
      }
    }
  };

  const handleImageScan = async () => {
    if (scanning || !uploadedImage) return;
    setNotCropMsg(null);
    setScanning(true); setResult(null); setScanPhase('scanning'); setScanProgress(0); setQaChat([]);

    // Animate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 4;
      if (progress >= 85) { progress = 85; clearInterval(interval); }
      setScanProgress(Math.round(progress));
    }, 120);

    try {
      // Extract base64 from the data URL
      const base64 = uploadedImage.split(',')[1];
      const mimeMatch = uploadedImage.match(/data:(image\/[^;]+);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

      let finalResult = null;

      if (base64) {
        const visionData = await callGeminiVision(base64, mimeType);

        if (visionData === null) {
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '📡 AI ವಿಶ್ಲೇಷಣೆ ಲಭ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
            : '📡 AI unavailable. Check internet and try again.');
          return;
        } else if (!visionData.isCrop) {
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '🌿 ಇದು ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ. ರೋಗ ಪೀಡಿತ ಬೆಳೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ — ಮುದ್ರಿತ ಚಿತ್ರಗಳನ್ನು ಸಹ ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು.'
            : '🌿 Not a crop image. Please upload a diseased crop photo — printed/xerox photos also work.');
          return;
        } else {
          const matched = matchAiToDatabase(visionData.cropName, visionData.diseaseName);
          finalResult = matched;
        }
      }

      clearInterval(interval);
      setScanProgress(100);
      await new Promise(r => setTimeout(r, 400));
      setScanning(false); setScanPhase('done');

      if (finalResult) {
        setResult(finalResult); setActiveTab('remedy'); setTranslatedRemedy(null);
        if (lang === 'kn' && finalResult.remedy) {
          setIsTranslating(true);
          callGeminiTranslate(finalResult.remedy, 'kn').then(t => { if (t) setTranslatedRemedy(t); setIsTranslating(false); });
        }
      } else {
        setResult('NO_CROP');
      }
      setPage('result');
    } catch (err) {
      clearInterval(interval);
      setScanProgress(100);
      setScanning(false); setScanPhase('idle');
      console.error('Image scan error:', err);
      if (selectedCrop !== 'NO_CROP') {
        const matches = CROP_DISEASES.filter(d => d.crop === selectedCrop);
        if (matches.length > 0) { setResult(matches[0]); setActiveTab('remedy'); setPage('result'); }
        else { setResult('NO_CROP'); setPage('result'); }
      }
    }
  };

  const handleReset = () => {
    stopSpeaking(); setResult(null); setScanPhase('idle'); setScanProgress(0);
    setUploadedImage(null); setScanMode('camera'); setQaChat([]); setQaInput('');
    setPan({ x: 0, y: 0 }); currentPan.current = { x: 0, y: 0 };
    setNotCropMsg(null); setTranslatedRemedy(null); setIsTranslating(false);
    setZoomLevel(1);
    setPage('home');
  };

  const toggleVoice = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    if (!result || result === 'NO_CROP') return;
    // Build natural-sounding text in selected language
    let text;
    if (lang === 'kn') {
      // Use Kannada disease name + translated remedy if available, else speak meaningfully
      const diseasePart = result.diseaseKn || result.disease;
      const remedyPart = translatedRemedy || result.remedy;
      text = `ರೋಗ: ${diseasePart}. ಬೆಳೆ: ${result.crop}. ಪರಿಹಾರ: ${remedyPart}. ${result.scheme ? `ಅರ್ಹ ಯೋಜನೆ: ${result.scheme}` : 'ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ KVK ಸಂಪರ್ಕಿಸಿ.'}`;
    } else if (lang === 'hi') {
      text = `रोग: ${result.disease}. फसल: ${result.crop}. उपचार: ${result.remedy}. ${result.scheme ? `योजना: ${result.scheme}` : 'कोई विशिष्ट योजना नहीं। स्थानीय KVK से संपर्क करें।'}`;
    } else {
      text = `Disease detected: ${result.disease} on ${result.crop}. Severity: ${result.severity}. Treatment: ${result.remedy}. ${result.scheme ? `Eligible scheme: ${result.scheme}` : 'No specific government scheme. Contact your local Krishi Vigyan Kendra for support.'}`;
    }
    speak(text);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result); setScanMode('image');
      setResult(null); setScanPhase('idle');
      setPan({ x: 0, y: 0 }); currentPan.current = { x: 0, y: 0 };
    };
    reader.readAsDataURL(file);
  };

  const getSmartFallbackAnswer = (q, res, currentLang) => {
    const qLower = q.toLowerCase();
    const isKn = currentLang === 'kn';

    // 1. Scheme / Insurance Application
    if (/scheme|apply|yojana|insurance|pmfby|midh|ಅರ್ಜಿ|ಯೋಜನೆ|ವಿಮೆ|ಹೇಗೆ/i.test(qLower)) {
      if (isKn) {
        return `ಅರ್ಜಿ ಸಲ್ಲಿಸಲು, ನಿಮ್ಮ RTC (ಪಹಣಿ), ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್‌ನೊಂದಿಗೆ ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ (Grama One) ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ${res.schemeLink || 'pmfby.gov.in'} ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ನೋಂದಾಯಿಸಿ.`;
      }
      return `To apply for ${res.scheme || 'the government crop scheme'}, visit your nearest Grama One center or apply online at ${res.schemeLink || 'https://pmfby.gov.in/'} with your Pahani (RTC), Aadhaar card, and bank passbook.`;
    }

    // 2. Organic / Natural
    if (/organic|natural|bio|neem|home|ಸಾವಯವ|ನೈಸರ್ಗಿಕ/i.test(qLower)) {
      if (isKn) {
        return `${res.diseaseKn || res.disease} ನೈಸರ್ಗಿಕ ನಿಯಂತ್ರಣಕ್ಕೆ: ${res.organicTip || 'ಬೆಳಗಿನ ಜಾವ 5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ವರ್ಡೆ ಸಿಂಪಡಿಸಿ.'}`;
      }
      return `For organic management of ${res.disease}: ${res.organicTip || 'Spray Neem Seed Kernel Extract (NSKE 5%) or Trichoderma viride early morning.'}`;
    }

    // 3. Prevention / Spread
    if (/prevent|spread|stop|avoid|control|ತಡೆ|ಹರಡುವಿಕೆ|ನಿರ್ವಹಣೆ/i.test(qLower)) {
      if (isKn) {
        return `${res.diseaseKn || res.disease} ಹರಡುವುದನ್ನು ತಡೆಯಲು: ${res.prevention || 'ಸೂಕ್ತ ಗಿಡಗಳ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ, ಅಧಿಕ ಸಾರಜನಕ ಗೊಬ್ಬರ ತಪ್ಪಿಸಿ ಮತ್ತು ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.'}`;
      }
      return `To prevent spread of ${res.disease}: ${res.prevention || 'Maintain good plant spacing, avoid excess nitrogen fertilizers, and remove infected crop debris.'}`;
    }

    // 4. Fertilizer / Nutrition
    if (/fertilizer|npk|manure|nutrition|soil|ಗೊಬ್ಬರ|ಪೋಷಕಾಂಶ/i.test(qLower)) {
      if (isKn) {
        return `${res.crop} ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ: ${res.fertilizer || 'ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರವನ್ನು ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.'}`;
      }
      return `Nutritional guidance for ${res.crop}: ${res.fertilizer || 'Apply balanced NPK fertilizers in split doses.'}`;
    }

    // 5. Symptoms / Causes / Takeaways
    if (/symptom|cause|reason|why|spot|leaf|rot|yellow|ಲಕ್ಷಣ|ಕಾರಣ|ಅಂಶ/i.test(qLower)) {
      const takeaways = res.keyTakeaways ? res.keyTakeaways.join('. ') : '';
      if (isKn) {
        return `${res.crop} ನಲ್ಲಿ ${res.diseaseKn || res.disease} ಮುಖ್ಯ ಲಕ್ಷಣಗಳು: ${takeaways || res.remedy}`;
      }
      return `Symptoms & key info for ${res.disease} on ${res.crop}: ${takeaways || res.remedy}`;
    }

    // 6. Dosage / Spraying
    if (/dose|quantity|how much|spray|gram|liter|ಪ್ರಮಾಣ|ಎಷ್ಟು/i.test(qLower)) {
      if (isKn) {
        return `${res.diseaseKn || res.disease} ಗೆ ಔಷಧ ಸಿಂಪಡಣೆ ಪ್ರಮಾಣ: ${res.remedy}`;
      }
      return `Recommended dosage for ${res.disease}: ${res.remedy}`;
    }

    // 7. Compensation / Crop Loss
    if (/loss|nuksan|compensation|claim|damage|ನಷ್ಟ|ಪರಿಹಾರ/i.test(qLower)) {
      if (isKn) {
        return `${res.crop} ನಲ್ಲಿ ${res.diseaseKn || res.disease} ನಷ್ಟ ಉಂಟಾದರೆ, ${res.scheme || 'PMFBY'} ಯೋಜನೆಯಡಿ 72 ಗಂಟೆಗಳ ಒಳಗೆ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ ವರದಿ ಮಾಡಿ.`;
      }
      return `If ${res.disease} causes severe damage to your ${res.crop}, report to your local Raitha Samparka Kendra (RSK) within 72 hours to claim compensation under ${res.scheme || 'PMFBY'}.`;
    }

    // 8. Default Treatment Answer
    if (isKn) {
      return `${res.diseaseKn || res.disease} ರೋಗದ ನಿಯಂತ್ರಣಕ್ಕೆ: ${res.remedy}`;
    }
    return `For ${res.disease} on ${res.crop}: ${res.remedy}`;
  };

  const handleQaAsk = async () => {
    if (!qaInput.trim() || !result || result === 'NO_CROP') return;
    const question = qaInput.trim();
    setQaInput('');
    setQaChat(prev => [...prev, { role: 'user', text: question }]);
    setQaLoading(true);

    const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
    const historyText = qaChat.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
    
    const sys = `You are an expert agricultural AI assistant for farmers. 
    Context: The user scanned a crop. 
    Crop: ${result.crop}
    Detected Disease: ${result.disease}
    Chemical Remedy: ${result.remedy}
    Prevention: ${result.prevention || 'N/A'}
    Organic Alternative: ${result.organicTip || 'N/A'}
    Scheme: ${result.scheme || 'N/A'}

    INSTRUCTIONS:
    - You must act as a conversational, helpful AI assistant (like ChatGPT/Gemini).
    - Answer the user's question naturally based on the context above.
    - If the user asks a follow-up question (e.g. "what are those brown spots", "how much time to recover"), use the context to answer it accurately.
    - You MUST reply entirely in ${langName}.
    - Keep the response conversational but concise (under 3-4 sentences). Do NOT use markdown.`;

    const promptWithHistory = `Chat History:\n${historyText}\n\nUser: ${question}\n\nProvide the AI's next response:`;

    try {
      let answer = await callGemini(promptWithHistory, sys);
      if (!answer || answer.trim().length === 0) {
        answer = getSmartFallbackAnswer(question, result, lang);
      }
      answer = answer.replace(/[*#_`]/g, '').trim();
      setQaChat(prev => [...prev, { role: 'ai', text: answer }]);
      speak(answer);
    } catch {
      const fallback = getSmartFallbackAnswer(question, result, lang);
      setQaChat(prev => [...prev, { role: 'ai', text: fallback }]);
      speak(fallback);
    } finally {
      setQaLoading(false);
    }
  };

  // ─────────────── PAGE 1: HOME ───────────────
  if (page === 'home') {
    const demoCards = [
      {
        crop: 'Paddy / Rice (ಭತ್ತ)',
        icon: <Wheat size={13} color="#fff" />,
        disease: 'Blast Disease (Pyricularia oryzae)',
        diseaseKn: 'ಬೆಂಕಿ ರೋಗ (ತೀವ್ರ ಹಂತ)',
        severity: 'High',
        image: '/crops/rice_blast.png',
        fallbackImage: '/crops/Paddy.jpg',
        remedy: 'Spray Tricyclazole 75 WP @ 0.6 g/L or Carbendazim 50 WP @ 1 g/L at tillering stage.',
        prevention: 'Avoid excessive nitrogen fertilizer. Maintain standing water level (2-5 cm). Burn or bury infected crop debris after harvest to prevent spore survival.',
        fertilizer: 'Apply 120:60:60 kg NPK/ha in split doses. Avoid heavy N top-dressing during cool cloudy weather.',
        organicTip: 'Spray Pseudomonas fluorescens @ 2.5 kg/ha or Neem Seed Kernel Extract (NSKE 5%) as a preventive foliar spray.',
        scheme: 'PMFBY Pradhan Mantri Fasal Bima Yojana',
        schemeLink: 'https://pmfby.gov.in/',
        color: '#ea580c',
        keyTakeaways: [
          'Affects leaves, leaf sheath, neck, and panicles causing spindle-shaped spots',
          'High humidity (>90%) and cool night temperatures favor rapid disease outbreak',
          'Plant disease-resistant varieties like BPT 5204 or KMP 101'
        ],
      },
      {
        crop: 'Tomato (ಟೊಮೇಟೊ)',
        icon: <Sprout size={13} color="#fff" />,
        disease: 'Late Blight (Phytophthora infestans)',
        diseaseKn: 'ಲೇಟ್ ಬ್ಲೈಟ್ ಅಂಗಮಾರಿ ರೋಗ',
        severity: 'High',
        image: '/crops/tomato_late_blight.png',
        fallbackImage: '/crops/Tomato.jpg',
        remedy: 'Spray Mancozeb 75 WP @ 2 g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L at 7-day intervals during wet weather.',
        prevention: 'Ensure wider plant spacing for air ventilation. Use drip irrigation instead of overhead sprinklers. Remove and destroy lower infected leaves immediately.',
        fertilizer: 'Apply Calcium Nitrate @ 5 kg/acre to strengthen cell wall structure against fungal hyphae penetration.',
        organicTip: 'Spray Trichoderma viride @ 5g/L + Copper Oxychloride @ 2g/L. Apply bio-formulations early morning.',
        scheme: 'Mission for Integrated Development of Horticulture (MIDH)',
        schemeLink: 'https://midh.gov.in/',
        color: '#dc2626',
        keyTakeaways: [
          'Causes dark, water-soaked lesions on leaves and white fungal bloom underneath in humid conditions',
          'Can destroy an entire tomato crop within 7 to 10 days if left unmanaged',
          'Practice strict crop rotation with non-solanaceous crops'
        ],
      }
    ];

    return (
      <div style={{
        width: '100%', minHeight: '100vh',
        background: 'var(--bg-main, #f0f7f3)',
        color: 'var(--text-primary, #1a2e1f)',
        fontFamily: "'Inter', sans-serif",
        paddingBottom: 40,
        overflowY: 'auto'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '14px 20px',
          background: '#ffffff',
          borderBottom: '1px solid var(--border, #d1e8db)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          position: 'sticky', top: 0, zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={{
              background: '#f0f7f3', border: '1px solid #d1e8db', borderRadius: 10,
              padding: '6px 12px', color: '#1a2e1f', cursor: 'pointer', fontSize: 13,
              fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6
            }}>
              ← Back
            </button>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#1a2e1f', lineHeight: 1.2 }}>
                {lang === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯ' : 'Crop Doctor'}
              </h2>
              <p style={{ margin: 0, fontSize: 11, color: '#4b7a5c', fontWeight: 500 }}>
                {lang === 'kn' ? 'ಎಐ ಬೆಳೆ ರೋಗ ಪತ್ತೆದಾರ' : 'AI Crop Disease Scanner'}
              </p>
            </div>
          </div>
          <span style={{ fontSize: 11, background: '#d1fae5', color: '#10b981', padding: '4px 10px', borderRadius: 20, fontWeight: 800, border: '1px solid #a7f3d0' }}>
            AI POWERED
          </span>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>

          {/* Hero Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1a7c4a 0%, #145f38 100%)',
            borderRadius: 20,
            padding: '24px 20px',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(26, 124, 74, 0.25)',
            textAlign: 'center',
            marginBottom: 20
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px'
            }}>
              <Microscope size={32} color="#ffffff" />
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>
              {lang === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯ ವಿಶ್ಲೇಷಣೆ' : 'AI Crop Disease Scanner'}
            </h1>
            <p style={{ margin: '0 auto 18px', fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, maxWidth: 440 }}>
              {lang === 'kn'
                ? 'ಕ್ಯಾಮರಾ ಬಳಸಿ ಬೆಳೆ ರೋಗ ಗುರುತಿಸಿ. ಪರಿಹಾರ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.'
                : 'Point your camera at a diseased crop leaf to instantly detect diseases, get treatment advice & government scheme alerts.'}
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { icon: <Bot size={12} />, label: lang === 'kn' ? '33+ ರೋಗಗಳು' : '33+ Diseases' },
                { icon: <Pill size={12} />, label: lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಪರಿಹಾರ' : 'Smart Remedy' },
                { icon: <Building2 size={12} />, label: lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆ' : 'Govt Schemes' },
                { icon: <MessageCircle size={12} />, label: 'AI Q&A' },
              ].map((f, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {f.icon} {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* Crop Selector Card — Main CTA */}
          <div style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '20px',
            border: '1px solid var(--border, #d1e8db)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            marginBottom: 20
          }}>
            <label style={{ fontSize: 14, fontWeight: 800, color: '#1a2e1f', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Crop size={18} color="#1a7c4a" />
              {lang === 'kn' ? 'ಹಂತ 1 — ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Step 1 — Select your crop'}
            </label>

            <select
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              style={{
                width: '100%', padding: '13px 14px', borderRadius: 12, fontSize: 14, fontWeight: 700,
                border: `2px solid ${selectedCrop === 'NO_CROP' ? '#fca5a5' : '#1a7c4a'}`,
                background: selectedCrop === 'NO_CROP' ? '#fff5f5' : '#f0f7f3',
                color: selectedCrop === 'NO_CROP' ? '#dc2626' : '#145f38',
                outline: 'none', cursor: 'pointer', marginBottom: 16,
                WebkitAppearance: 'none'
              }}
            >
              <option value="NO_CROP" style={{ color: '#dc2626', background: '#fff' }}>
                {lang === 'kn' ? '— ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ —' : '— Select crop to scan —'}
              </option>
              {UNIQUE_CROPS.map((crop, i) => (
                <option key={i} value={crop} style={{ color: '#1a2e1f', background: '#fff' }}>
                  {crop}
                </option>
              ))}
            </select>

            <button
              onClick={() => { if (selectedCrop !== 'NO_CROP') setPage('scanner'); }}
              disabled={selectedCrop === 'NO_CROP'}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 800,
                cursor: selectedCrop === 'NO_CROP' ? 'not-allowed' : 'pointer',
                background: selectedCrop === 'NO_CROP' ? '#e2e8f0' : 'linear-gradient(135deg, #1a7c4a, #145f38)',
                color: selectedCrop === 'NO_CROP' ? '#94a3b8' : '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10,
                boxShadow: selectedCrop !== 'NO_CROP' ? '0 4px 15px rgba(26, 124, 74, 0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Camera size={18} />
              {selectedCrop === 'NO_CROP'
                ? (lang === 'kn' ? 'ಮೊದಲು ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Select a crop first')
                : (lang === 'kn' ? 'ಕ್ಯಾಮರಾ ತೆರೆಯಿರಿ ಮತ್ತು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Open Camera & Scan')}
            </button>

            <button
              onClick={() => { if (selectedCrop !== 'NO_CROP') { fileInputRef.current?.click(); } }}
              disabled={selectedCrop === 'NO_CROP'}
              style={{
                width: '100%', padding: '12px', borderRadius: 12,
                border: '1.5px dashed ' + (selectedCrop === 'NO_CROP' ? '#cbd5e1' : '#1a7c4a'),
                fontSize: 13, fontWeight: 700,
                cursor: selectedCrop === 'NO_CROP' ? 'not-allowed' : 'pointer',
                background: '#ffffff',
                color: selectedCrop === 'NO_CROP' ? '#94a3b8' : '#1a7c4a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              <ImagePlus size={16} />
              {lang === 'kn' ? 'ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' : 'Or upload a photo instead'}
            </button>

            <p style={{ margin: '12px 0 0', textAlign: 'center', color: '#64748b', fontSize: 11, fontWeight: 500 }}>
              <Layers size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              {UNIQUE_CROPS.length} Karnataka crops · {CROP_DISEASES.length}+ disease patterns
            </p>
          </div>

          {/* How It Works Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: '18px 20px',
            border: '1px solid var(--border, #d1e8db)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginBottom: 20
          }}>
            <h3 style={{ color: '#1a7c4a', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} color="#1a7c4a" />
              {lang === 'kn' ? 'ಹೇಗೆ ಬಳಸುವುದು' : 'How it works'}
            </h3>
            {[
              { n: '1', icon: <Crop size={15} color="#1a7c4a" />, t: lang === 'kn' ? 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Select your crop', d: lang === 'kn' ? '20+ ಕರ್ನಾಟಕ ಬೆಳೆಗಳು ಬೆಂಬಲಿತವಾಗಿವೆ' : '20+ Karnataka crops supported' },
              { n: '2', icon: <Camera size={15} color="#1a7c4a" />, t: lang === 'kn' ? 'ಕ್ಯಾಮರಾ ತೆರೆಯಿರಿ & ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Open camera & scan', d: lang === 'kn' ? 'ಎಲೆ ಅಥವಾ ಹಣ್ಣಿನ ಮೇಲೆ ಗಮನ ಹರಿಸಿ' : 'Point at the diseased leaf or upload a photo' },
              { n: '3', icon: <ScanLine size={15} color="#1a7c4a" />, t: lang === 'kn' ? 'ತ್ವರಿತ ಫಲಿತಾಂಶ ಪಡೆಯಿರಿ' : 'Get instant results', d: lang === 'kn' ? 'ರೋಗ, ಪರಿಹಾರ & ಯೋಜನೆ ಮಾಹಿತಿ' : 'Disease name, remedy & applicable govt scheme' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < 2 ? 14 : 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0f7f3', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#1a7c4a', flexShrink: 0 }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    {s.icon}
                    <span style={{ color: '#1a2e1f', fontSize: 13, fontWeight: 700 }}>{s.t}</span>
                  </div>
                  <p style={{ margin: 0, color: '#4b7a5c', fontSize: 12, lineHeight: 1.4 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Exactly 2 Clickable Example Detections */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ color: '#1a2e1f', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Leaf size={15} color="#1a7c4a" />
                {lang === 'kn' ? 'ಉದಾಹರಣೆ ರೋಗಗಳು (ಕ್ಲಿಕ್ ಮಾಡಿ)' : 'Sample Disease Cases — Tap to View Full Info'}
              </h3>
              <span style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 700, background: '#e8f5ee', padding: '2px 8px', borderRadius: 10 }}>
                2 Demo Examples
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {demoCards.map((d, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedCrop(d.crop);
                    setResult(d);
                    setActiveTab('remedy');
                    setPage('result');
                  }}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    border: '1.5px solid #a7f3d0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(26, 124, 74, 0.08)',
                    transition: 'all 0.2s'
                  }}
                >
                  {/* Image Header */}
                  <div style={{ height: 130, width: '100%', position: 'relative', overflow: 'hidden', background: '#e2e8f0' }}>
                    <img
                      src={d.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (d.fallbackImage && e.currentTarget.src !== d.fallbackImage) {
                          e.currentTarget.src = d.fallbackImage;
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 20, padding: '4px 10px', color: '#fff', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 5, zIndex: 2 }}>
                      {d.icon} {d.crop.split('/')[0].trim()}
                    </div>
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'linear-gradient(135deg, #1a7c4a, #145f38)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 3, zIndex: 2 }}>
                      View Details <ChevronRight size={12} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: 10, background: '#fee2e2', color: '#b91c1c', fontWeight: 800, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                      <AlertTriangle size={11} color="#b91c1c" /> {d.severity} Severity
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#1a2e1f', marginBottom: 2, lineHeight: 1.3 }}>
                      {d.disease}
                    </div>
                    <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 600, marginBottom: 8 }}>
                      {d.diseaseKn}
                    </div>

                    <div style={{ fontSize: 11, color: '#334155', background: '#f0f7f3', borderRadius: 8, padding: '8px 10px', border: '1px solid #d1e8db', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      <Pill size={13} color="#1a7c4a" style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <span style={{ fontWeight: 800, color: '#1a7c4a' }}>Treatment: </span>
                        {d.remedy.slice(0, 48)}…
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { handleImageUpload(e); if (selectedCrop !== 'NO_CROP') setPage('scanner'); }} />
      </div>
    );
  }

  // ─────────────── PAGE 2: SCANNER ───────────────
  if (page === 'scanner') {
    return (
      <div style={{ width: '100%', height: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', fontFamily: "'Inter',sans-serif", overflow: 'hidden', userSelect: 'none' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(180deg,rgba(0,0,0,1),transparent)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setPage('home')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>← Back</button>
            <div style={{ background: 'rgba(34,197,94,0.2)', borderRadius: 10, padding: '5px 10px', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Microscope size={13} color="#22c55e" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>{CROP_DISEASES.find(d => d.crop === selectedCrop)?.emoji} {selectedCrop.split('/')[0].trim()}</span>
            </div>
          </div>
          {stream && !cameraError && <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} /><span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>LIVE</span></div>}
        </div>

        {/* Mode toggle */}
        {!scanning && (
          <div style={{ position: 'absolute', top: 62, left: 0, right: 0, zIndex: 60, padding: '0 14px' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { setScanMode('camera'); setUploadedImage(null); }} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: scanMode === 'camera' ? 'rgba(34,197,94,0.92)' : 'rgba(0,0,0,0.65)', color: '#fff', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Camera size={14} />{lang === 'kn' ? 'ಲೈವ್ ಕ್ಯಾಮರಾ' : 'Live Camera'}
              </button>
              <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: scanMode === 'image' ? 'rgba(34,197,94,0.92)' : 'rgba(0,0,0,0.65)', color: '#fff', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Image size={14} />{uploadedImage ? '✓ Photo loaded' : (lang === 'kn' ? 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್' : 'Upload Photo')}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </div>
          </div>
        )}

        {/* Camera / Image area — fixed height so scan button always visible */}
        <div style={{ height: '52vh', position: 'relative', overflow: 'hidden', background: '#111', flexShrink: 0 }}>
          {scanMode === 'image' && uploadedImage ? (
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              onPointerDown={e => { e.preventDefault(); setIsDragging(true); dragStart.current = { x: e.clientX, y: e.clientY }; }}
              onPointerMove={e => { if (!isDragging) return; e.preventDefault(); setPan({ x: currentPan.current.x + e.clientX - dragStart.current.x, y: currentPan.current.y + e.clientY - dragStart.current.y }); }}
              onPointerUp={() => { setIsDragging(false); currentPan.current = pan; }}
              onPointerLeave={() => { if (isDragging) { setIsDragging(false); currentPan.current = pan; } }}>
              <img src={uploadedImage} alt="crop" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `translate(${pan.x}px,${pan.y}px) scale(${zoomLevel})`, filter: scanning ? 'brightness(0.5)' : 'brightness(1)', transition: isDragging ? 'none' : 'filter 0.3s', userSelect: 'none', pointerEvents: 'none' }} />
            </div>
          ) : cameraError ? (
            <div style={{ width: '100%', height: '100%', background: 'url(https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80) center/cover', filter: scanning ? 'brightness(0.5)' : 'brightness(0.75)' }}>
              <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', background: 'rgba(239,68,68,0.85)', color: '#fff', padding: '5px 14px', borderRadius: 10, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>📷 DEMO MODE</div>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', filter: scanning ? 'brightness(0.6) saturate(1.2)' : 'brightness(1)', transition: 'filter 0.3s' }} />
          )}

          {/* AR scanning box */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15%' }}>
            <div style={{ position: 'relative', width: '100%', height: '80%', border: `2px solid ${scanning ? '#22c55e' : 'rgba(255,255,255,0.3)'}`, borderRadius: 20, boxShadow: scanning ? '0 0 40px rgba(34,197,94,0.15) inset' : 'none', overflow: 'hidden' }}>
              {['tl','tr','bl','br'].map(c => (<div key={c} style={{ position: 'absolute', ...(c.includes('t') ? {top:-2} : {bottom:-2}), ...(c.includes('l') ? {left:-2} : {right:-2}), width: 24, height: 24, borderTop: c.includes('t') ? '3px solid #22c55e' : 'none', borderBottom: c.includes('b') ? '3px solid #22c55e' : 'none', borderLeft: c.includes('l') ? '3px solid #22c55e' : 'none', borderRight: c.includes('r') ? '3px solid #22c55e' : 'none', borderTopLeftRadius: c==='tl'?16:0, borderTopRightRadius: c==='tr'?16:0, borderBottomLeftRadius: c==='bl'?16:0, borderBottomRightRadius: c==='br'?16:0 }} />))}
              {scanning && <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#22c55e,transparent)', boxShadow: '0 0 20px 6px rgba(34,197,94,0.5)', animation: 'arScan 1.8s infinite ease-in-out' }} />}
              {scanning && <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.75)', padding: '3px 12px', borderRadius: 20, color: '#22c55e', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>AI {lang === 'kn' ? 'ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ' : 'ANALYZING'} {scanProgress}%</div>}
            </div>
          </div>

          {/* Zoom controls */}
          {!scanning && (
            <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button onClick={() => setZoomLevel(z => Math.min(z + 0.25, 3))} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>+</button>
              <button onClick={() => setZoomLevel(z => Math.max(z - 0.25, 0.5))} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>−</button>
              {zoomLevel !== 1 && <button onClick={() => { setZoomLevel(1); setPan({x:0,y:0}); currentPan.current={x:0,y:0}; }} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: 800, cursor: 'pointer', color: '#374151' }}>RESET</button>}
            </div>
          )}

          {!scanning && !uploadedImage && <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', padding: '5px 14px', borderRadius: 20, color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 600, backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}>📷 {lang === 'kn' ? 'ಬೆಳೆಯ ಎಲೆ ಚೌಕಟ್ಟಿನಲ್ಲಿ ಇರಿಸಿ' : 'Place crop leaf in the frame'}</div>}
          {scanning && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3 }}><div style={{ height: '100%', width: `${scanProgress}%`, background: 'linear-gradient(90deg,#16a34a,#22c55e)', transition: 'width 0.15s ease' }} /></div>}
        </div>

        {/* Not-a-crop error banner */}
        {notCropMsg && (
          <div style={{ position: 'absolute', bottom: 160, left: 16, right: 16, background: 'rgba(239,68,68,0.95)', borderRadius: 14, padding: '12px 16px', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'flex-start', gap: 10, zIndex: 70, boxShadow: '0 4px 20px rgba(239,68,68,0.4)' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 800, color: '#fff' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ' : 'Not a Crop Image'}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                {lang === 'kn'
                  ? 'ದಯವಿಟ್ಟು ಬೆಳೆ ಎಲೆ, ಕಾಂಡ ಅಥವಾ ಹಣ್ಣಿನ ಚಿತ್ರ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. ಮುದ್ರಿತ ಚಿತ್ರಗಳನ್ನು ಸಹ ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು.'
                  : notCropMsg}
              </p>
            </div>
            <button onClick={() => setNotCropMsg(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '4px 8px', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>✕</button>
          </div>
        )}

        {/* Scan button panel */}
        <div style={{ background: '#ffffff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '16px 20px 28px', boxShadow: '0 -10px 40px rgba(0,0,0,0.15)' }}>
          <div style={{ width: 36, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 14px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 22 }}>{CROP_DISEASES.find(d => d.crop === selectedCrop)?.emoji || '🌿'}</div>
            <div><p style={{ margin: 0, fontSize: 11, color: '#64748b', fontWeight: 600 }}>{lang === 'kn' ? 'ಆಯ್ಕೆಯಾದ ಬೆಳೆ' : 'Scanning crop'}</p><p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{selectedCrop}</p></div>
            <button onClick={() => setPage('home')} style={{ marginLeft: 'auto', background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 700, color: '#475569', cursor: 'pointer' }}>Change</button>
          </div>
          <button
            onClick={scanMode === 'image' && uploadedImage ? handleImageScan : handleScan}
            disabled={scanning}
            style={{ width: '100%', padding: '15px', borderRadius: 14, border: 'none', fontSize: 16, fontWeight: 900, background: scanning ? '#94a3b8' : 'linear-gradient(135deg,#1a7c4a,#145f38)', color: '#fff', cursor: scanning ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: scanning ? 'none' : '0 8px 24px rgba(26, 124, 74, 0.3)', transition: 'all 0.2s' }}
          >
            {scanning ? <><Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} />{lang === 'kn' ? 'AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...' : 'AI Analyzing...'}</>
              : scanMode === 'image' && uploadedImage ? <><Microscope size={20} />{lang === 'kn' ? 'ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ' : 'Analyze Photo'}</>
              : <><ScanLine size={20} />{lang === 'kn' ? 'ಈಗ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Now'}</>}
          </button>
        </div>

        <style>{`@keyframes arScan{0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      </div>
    );
  }

  // ─────────────── PAGE 3: RESULT ───────────────
  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      background: 'var(--bg-main, #f0f7f3)',
      fontFamily: "'Inter',sans-serif",
      paddingBottom: 40,
      overflowY: 'auto'
    }}>
      {/* Top Header */}
      <div style={{
        padding: '14px 20px',
        background: '#ffffff',
        borderBottom: '1px solid var(--border, #d1e8db)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <button onClick={() => setPage('scanner')} style={{ background: '#f0f7f3', border: '1px solid #d1e8db', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#1a2e1f', cursor: 'pointer' }}>
          ← {lang === 'kn' ? 'ಹಿಂದೆ' : 'Back to Scanner'}
        </button>
        <button onClick={handleReset} style={{ background: 'linear-gradient(135deg,#1a7c4a,#145f38)', border: 'none', borderRadius: 10, padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
          <RefreshCw size={13} />{lang === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್' : 'Scan Another'}
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>

        {/* Result Header Banner */}
        <div style={{
          background: result && result !== 'NO_CROP' ? '#ffffff' : '#fee2e2',
          borderRadius: 18,
          padding: '20px',
          border: `1px solid ${result && result !== 'NO_CROP' ? '#d1e8db' : '#fca5a5'}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: 16
        }}>
          {result === 'NO_CROP' ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <AlertCircle size={32} color="#ef4444" />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ' : 'No Crop Leaf Detected'}
              </h2>
              <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>
                {lang === 'kn' ? 'ಸರಿಯಾದ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಬೆಳೆಯ ಎಲೆ ಮೇಲೆ ಕ್ಯಾಮರಾ ಇರಿಸಿ.' : 'Please upload a proper crop image or point the camera directly at the diseased leaf.'}
              </p>
            </div>
          ) : (
            <>
              {/* Optional Disease Image Banner */}
              {result.image && (
                <div style={{ width: '100%', height: 220, borderRadius: 14, overflow: 'hidden', marginBottom: 16, border: '1px solid #d1e8db', position: 'relative', background: '#e2e8f0' }}>
                  <img
                    src={result.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (result.fallbackImage && e.currentTarget.src !== result.fallbackImage) {
                        e.currentTarget.src = result.fallbackImage;
                      }
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 5, zIndex: 2 }}>
                    <Camera size={13} color="#fff" /> Diagnostic Sample Image
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${result.color || '#1a7c4a'}15`, border: `2px solid ${result.color || '#1a7c4a'}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {result.icon || <Leaf size={28} color={result.color || '#1a7c4a'} />}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ background: SEVERITY_CONFIG[result.severity]?.bg || '#fee2e2', color: SEVERITY_CONFIG[result.severity]?.text || '#b91c1c', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <AlertTriangle size={11} color="#b91c1c" /> {SEVERITY_CONFIG[result.severity]?.label || 'High Severity'}
                  </span>
                  <h2 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 900, color: '#1a2e1f', lineHeight: 1.25 }}>{result.disease}</h2>
                  {result.diseaseKn && <p style={{ margin: '0 0 4px', fontSize: 13, color: '#4b7a5c', fontWeight: 600 }}>{result.diseaseKn}</p>}
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={12} />{lang === 'kn' ? 'ಬೆಳೆ' : 'Crop'}: {result.crop}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, background: '#f0f7f3', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #d1e8db' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1a2e1f', flexShrink: 0 }}>AI Confidence</span>
                <div style={{ flex: 1, background: '#cbd5e1', borderRadius: 4, height: 7 }}>
                  <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg,#16a34a,#22c55e)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#16a34a', flexShrink: 0 }}>92%</span>
              </div>
            </>
          )}
        </div>

        {result && result !== 'NO_CROP' && (
          <div>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <button onClick={toggleVoice} style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: isSpeaking ? '#ef4444' : '#1a2e1f', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Volume2 size={18} />{isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸು' : 'Stop') : (lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : 'Read Aloud')}
              </button>
              <button onClick={handleReset} style={{ padding: '13px 16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <RefreshCw size={15} />{lang === 'kn' ? 'ಮತ್ತೆ' : 'Rescan'}
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, background: '#ffffff', border: '1px solid #d1e8db', borderRadius: 12, padding: 4 }}>
              {[
                { key: 'remedy', icon: <Pill size={13} />, label: lang === 'kn' ? 'ಪರಿಹಾರ & ತಡೆ' : 'Treatment & Control' },
                { key: 'fertilizer', icon: <Sprout size={13} />, label: lang === 'kn' ? 'ಗೊಬ್ಬರ' : 'Nutrition' },
                { key: 'tips', icon: <Lightbulb size={13} />, label: lang === 'kn' ? 'ಸಲಹೆ' : 'Key Takeaways' }
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: '9px 4px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: activeTab === tab.key ? '#f0f7f3' : 'transparent', color: activeTab === tab.key ? '#1a7c4a' : '#64748b', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ background: '#fff', border: '1px solid #d1e8db', borderRadius: 16, padding: 18, marginBottom: 14 }}>
              {activeTab === 'remedy' && <div>
                {/* Chemical Treatment */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Pill size={14} color="#1a7c4a" /> {lang === 'kn' ? 'ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ (Chemical Treatment)' : 'Chemical Treatment'}
                  </p>
                  {isTranslating && lang !== 'en' && <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>}
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{(lang === 'kn' && translatedRemedy) ? translatedRemedy : result.remedy}</p>
                </div>

                {/* Prevention */}
                {result.prevention && (
                  <div style={{ marginBottom: 14, background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: 11, color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <ShieldCheck size={14} color="#0369a1" /> {lang === 'kn' ? 'ತಡೆಗಟ್ಟುವಿಕೆ & ನಿರ್ವಹಣೆ (Prevention & Control)' : 'Prevention & Cultural Control'}
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>{result.prevention}</p>
                  </div>
                )}

                {/* Organic Tip */}
                {result.organicTip && <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '12px 14px', border: '1px solid #bbf7d0' }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: '#15803d', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Leaf size={14} color="#15803d" /> {lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ (Organic Alternative)' : 'Organic Alternative'}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>{result.organicTip}</p>
                </div>}
              </div>}
              {activeTab === 'fertilizer' && <div>
                <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sprout size={14} color="#1a7c4a" /> {lang === 'kn' ? 'ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ' : 'Nutrition Management'}
                </p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{result.fertilizer}</p>
              </div>}
              {activeTab === 'tips' && result.keyTakeaways && <div>
                <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Lightbulb size={14} color="#1a7c4a" /> {lang === 'kn' ? 'ಪ್ರಮುಖ ಅಂಶಗಳು' : 'Key Takeaways'}
                </p>
                {result.keyTakeaways.map((tip, i) => (<div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}><div style={{ width: 18, height: 18, borderRadius: '50%', background: (result.color || '#1a7c4a') + '20', color: result.color || '#1a7c4a', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i+1}</div><p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>{tip}</p></div>))}
              </div>}
            </div>

            {/* Scheme */}
            {result.scheme ? (
              <a href={result.schemeLink || '#'} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff', border: '1px solid #86efac', borderRadius: 16, padding: '14px 16px', marginBottom: 16, textDecoration: 'none', boxShadow: '0 2px 8px rgba(22,163,74,0.08)' }}>
                <div style={{ background: '#16a34a', borderRadius: 10, padding: 10, color: '#fff', flexShrink: 0 }}><ShieldCheck size={20} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building2 size={12} color="#15803d" /> {lang === 'kn' ? 'ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆ — ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'Eligible Govt Scheme — Tap to Apply'}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#14532d' }}>{result.scheme}</p>
                </div>
                <ChevronRight size={18} color="#16a34a" />
              </a>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
                <Info size={16} color="#94a3b8" /><p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{lang === 'kn' ? 'ಈ ರೋಗಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ KVK ಸಂಪರ್ಕಿಸಿ.' : 'No specific govt scheme. Contact your local Krishi Vigyan Kendra (KVK).'}</p>
              </div>
            )}

            {/* AI Q&A */}
            <div style={{ background: '#fff', border: '1px solid #d1e8db', borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#1a2e1f', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <MessageCircle size={14} color="#1a7c4a" />{lang === 'kn' ? 'AI ಸಹಾಯಕ' : 'AI Assistant — Ask a follow-up'}
              </div>
              {qaChat.length === 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {[lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ?' : 'Any organic alternative?', lang === 'kn' ? 'ಹರಡುವ ತಡೆ?' : 'How to prevent spread?', lang === 'kn' ? 'ಯೋಜನೆ ಅರ್ಜಿ ಹೇಗೆ?' : 'How to apply for scheme?'].map((q, i) => (
                    <button key={i} onClick={() => setQaInput(q)} style={{ background: '#f0f7f3', border: '1px solid #bbf7d0', borderRadius: 20, padding: '5px 12px', fontSize: 12, color: '#15803d', fontWeight: 600, cursor: 'pointer' }}>{q}</button>
                  ))}
                </div>
              )}
              {qaChat.length > 0 && (
                <div style={{ background: '#f0f7f3', borderRadius: 12, padding: '10px', marginBottom: 10, maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {qaChat.map((msg, i) => (<div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}><div style={{ maxWidth: '85%', padding: '8px 12px', borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: msg.role === 'user' ? 'linear-gradient(135deg,#1a7c4a,#145f38)' : '#fff', color: msg.role === 'user' ? '#fff' : '#1e293b', fontSize: 13, lineHeight: 1.5, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>{msg.text}</div></div>))}
                  {qaLoading && <div style={{ display: 'flex', gap: 4, padding: '6px 10px' }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}</div>}
                  <div ref={qaChatEndRef} />
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={qaInput} onChange={e => setQaInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleQaAsk()} placeholder={lang === 'kn' ? 'ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...' : 'Ask anything about this disease...'} style={{ flex: 1, border: '1.5px solid #d1e8db', borderRadius: 10, padding: '10px 12px', fontSize: 13, outline: 'none', background: '#f0f7f3', color: '#1e293b' }} onFocus={e => e.target.style.borderColor = '#1a7c4a'} onBlur={e => e.target.style.borderColor = '#d1e8db'} />
                <button onClick={handleQaAsk} disabled={!qaInput.trim() || qaLoading} style={{ background: qaInput.trim() ? '#1a7c4a' : '#e2e8f0', border: 'none', borderRadius: 10, padding: '0 14px', cursor: qaInput.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center' }}>
                  <Send size={16} color={qaInput.trim() ? '#fff' : '#94a3b8'} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes typingDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
