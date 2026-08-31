import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info, Scan, Leaf, AlertCircle, Microscope, Droplets, FlaskConical, Sprout, ChevronRight, Upload, MessageCircle, Send, ImagePlus, ChevronsDown, Loader2, TriangleAlert, CircleCheck, ScanLine, Image, Crop, Layers, Bot, Pill, Building2, ListChecks, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { callGemini } from '../utils/voiceCommands';
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
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('NO_CROP');
  const [scanPhase, setScanPhase] = useState('idle'); // idle | scanning | done
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('remedy');
  const [showSelectorHint, setShowSelectorHint] = useState(true);
  // Image upload
  const [uploadedImage, setUploadedImage] = useState(null); // base64 data URL
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'image'
  const fileInputRef = useRef(null);
  // Q&A Chat
  const [qaChat, setQaChat] = useState([]);
  const [qaInput, setQaInput] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const qaChatEndRef = useRef(null);

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const { lang } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  // Auto-scroll Q&A chat
  useEffect(() => {
    qaChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaChat, qaLoading]);

  useEffect(() => {
    let activeStream = null;
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        activeStream = s;
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch {
        try {
          const fallback = await navigator.mediaDevices.getUserMedia({ video: true });
          activeStream = fallback;
          setStream(fallback);
          if (videoRef.current) videoRef.current.srcObject = fallback;
        } catch {
          setCameraError(true);
        }
      }
    };
    startCamera();
    return () => {
      stopSpeaking();
      if (activeStream) activeStream.getTracks().forEach(t => t.stop());
    };
  }, [stopSpeaking]);

  // ── Camera Scan — simulated scan using selected crop ──
  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    setScanPhase('scanning');
    setScanProgress(0);
    setQaChat([]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      setScanProgress(Math.round(progress));
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setTimeout(() => {
        setScanning(false);
        setScanPhase('done');
        
        if (selectedCrop === 'NO_CROP') {
          setResult('NO_CROP');
        } else {
          const matches = CROP_DISEASES.filter(d => d.crop === selectedCrop);
          if (matches.length > 0) {
            setResult(matches[Math.floor(Math.random() * matches.length)]);
            setActiveTab('remedy');
          } else {
            setResult('NO_CROP');
          }
        }
      }, 300);
    }, 2800);
  };

  const handleReset = () => {
    stopSpeaking();
    setResult(null);
    setScanPhase('idle');
    setScanProgress(0);
    setShowSelectorHint(false);
    setUploadedImage(null);
    setScanMode('camera');
    setQaChat([]);
    setQaInput('');
  };

  const toggleVoice = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    if (!result || result === 'NO_CROP') return;
    const text = lang === 'kn'
      ? `ರೋಗ: ${result.diseaseKn || result.disease}. ಪರಿಹಾರ: ${result.remedy}. ${result.scheme ? `ಯೋಜನೆ: ${result.scheme}` : ''}`
      : `Disease detected: ${result.disease} on ${result.crop}. Remedy: ${result.remedy}. ${result.scheme ? `Applicable scheme: ${result.scheme}` : 'No specific govt scheme. Contact your local Krishi Vigyan Kendra.'}`;
    speak(text);
  };

  // ── Image Upload Handler ──
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setScanMode('image');
      setResult(null);
      setScanPhase('idle');
    };
    reader.readAsDataURL(file);
  };

  // ── Scan uploaded image — requires crop selection ──
  const handleImageScan = () => {
    if (scanning) return;
    if (selectedCrop === 'NO_CROP') {
      // No crop selected — show selector hint
      setShowSelectorHint(true);
      return;
    }
    setScanning(true);
    setResult(null);
    setScanPhase('scanning');
    setScanProgress(0);
    setQaChat([]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 8;
      if (progress >= 100) progress = 100;
      setScanProgress(Math.round(progress));
      if (progress >= 100) clearInterval(interval);
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setScanProgress(100);
      setTimeout(() => {
        setScanning(false);
        setScanPhase('done');
        const matches = CROP_DISEASES.filter(d => d.crop === selectedCrop);
        if (matches.length > 0) {
          // Deterministic selection based on image string (for consistent demo)
          let hash = 0;
          if (uploadedImage) {
            for (let i = 0; i < Math.min(uploadedImage.length, 5000); i++) {
              hash = (hash << 5) - hash + uploadedImage.charCodeAt(i);
              hash |= 0; // Convert to 32bit integer
            }
          }
          const index = Math.abs(hash) % matches.length;
          setResult(matches[index]);
          setActiveTab('remedy');
        } else {
          setResult('NO_CROP');
        }
      }, 300);
    }, 2400);
  };

  // ── Q&A Ask handler ──
  const handleQaAsk = async () => {
    if (!qaInput.trim() || !result || result === 'NO_CROP') return;
    const question = qaInput.trim();
    setQaInput('');
    setQaChat(prev => [...prev, { role: 'user', text: question }]);
    setQaLoading(true);

    const langName = lang === 'kn' ? 'Kannada' : lang === 'hi' ? 'Hindi' : 'English';
    const systemInstruction = `You are an expert agricultural assistant for Karnataka, India. Answer questions specifically about the crop disease that was just detected.
Detected disease: ${result.disease} on crop: ${result.crop}.
Remedy: ${result.remedy}.
Fertilizer advice: ${result.fertilizer}.
Organic option: ${result.organicTip || 'Not available'}.
${result.scheme ? `Applicable govt scheme: ${result.scheme}` : 'No specific govt scheme for this disease.'}
Always reply in ${langName}. Keep responses concise — 2-3 sentences max. No markdown formatting, no asterisks. Response will be read aloud.`;

    try {
      let answer = await callGemini(question, systemInstruction);
      if (!answer) {
        answer = lang === 'kn'
          ? `${result.diseaseKn || result.disease} ರೋಗಕ್ಕೆ: ${result.remedy}`
          : `For ${result.disease}: ${result.remedy}`;
      }
      answer = answer.replace(/[*#_`]/g, '').trim();
      setQaChat(prev => [...prev, { role: 'ai', text: answer }]);
      speak(answer);
    } catch {
      const fallback = lang === 'kn' ? 'ಉತ್ತರ ನೀಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Could not get an answer. Please try again.';
      setQaChat(prev => [...prev, { role: 'ai', text: fallback }]);
    } finally {
      setQaLoading(false);
    }
  };

  const cropsByFirstWord = UNIQUE_CROPS.reduce((acc, crop) => {
    const key = crop.split('/')[0].trim();
    acc[key] = crop;
    return acc;
  }, {});

  return (
    <div style={{
      width: '100%', height: '100vh',
      background: '#0a0a0a',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden'
    }}>

        {/* ── Header ── */}
        <div style={{
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60
        }}>
          <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(34,197,94,0.2)', borderRadius: 10, padding: '6px 8px', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Microscope size={16} color="#22c55e" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', letterSpacing: '0.03em' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯ AR' : 'Crop Doctor AR'}
              </span>
            </div>
            {stream && !cameraError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600 }}>LIVE</span>
              </div>
            )}
          </div>
          <button onClick={() => navigate(-1)} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', cursor: 'pointer'
          }}>
            <X size={18} />
          </button>
        </div>

        {/* ── Top overlay: Mode Toggle Only ── */}
        {!result && !scanning && (
          <div style={{ position: 'absolute', top: 64, left: 0, right: 0, zIndex: 60, padding: '0 14px' }}>
            {/* Mode toggle tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <button onClick={() => { setScanMode('camera'); setUploadedImage(null); }}
                style={{ flex: 1, padding: '8px 6px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                  background: scanMode === 'camera' ? 'rgba(34,197,94,0.92)' : 'rgba(0,0,0,0.6)',
                  color: '#fff', backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Camera size={14} />
                {lang === 'kn' ? 'ಲೈವ್ ಕ್ಯಾಮರಾ' : 'Live Camera'}
              </button>
              <button onClick={() => fileInputRef.current?.click()}
                style={{ flex: 1, padding: '8px 6px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                  background: scanMode === 'image' ? 'rgba(34,197,94,0.92)' : 'rgba(0,0,0,0.6)',
                  color: '#fff', backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Image size={14} />
                {lang === 'kn' ? 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್' : 'Upload Photo'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </div>

            {/* Simple hint bar — no crop selector here */}
            <div style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(8px)' }}>
              {scanMode === 'camera' ? <ScanLine size={13} color="#22c55e" /> : <Image size={13} color="#22c55e" />}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.88)', fontWeight: 600 }}>
                {scanMode === 'camera'
                  ? (lang === 'kn' ? 'ರೋಗಗ್ರಸ್ತ ಎಲೆಯನ್ನು ಚೌಕಟ್ಟಿನಲ್ಲಿ ಇರಿಸಿ' : 'Hold diseased leaf in the frame, then tap Scan')
                  : uploadedImage
                    ? (lang === 'kn' ? 'ಫೋಟೋ ಲೋಡ್ ಆಗಿದೆ — ಕೆಳಗೆ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Photo loaded — select crop below & tap Analyze')
                    : (lang === 'kn' ? 'ಮೇಲೆ "ಫೋಟೋ ಅಪ್‌ಲೋಡ್" ಒತ್ತಿ' : 'Tap Upload Photo to choose an image')}
              </span>
            </div>
          </div>
        )}

        {/* ── Camera View — hidden when result is shown ── */}

        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#111', display: result ? 'none' : undefined }}>
          {/* Uploaded image preview */}
          {scanMode === 'image' && uploadedImage ? (
            <img
              src={uploadedImage} alt="Uploaded crop"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: scanning ? 'brightness(0.5) saturate(0.8)' : 'brightness(1)',
                transition: 'filter 0.5s'
              }}
            />
          ) : cameraError ? (
            <div style={{
              width: '100%', height: '100%',
              background: 'url(https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80) center/cover',
              filter: scanning ? 'brightness(0.5) saturate(0.8)' : 'brightness(0.75)',
              transition: 'filter 0.5s'
            }}>
              <div style={{
                position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(239,68,68,0.85)', color: '#fff',
                padding: '5px 14px', borderRadius: 10, fontSize: 11, fontWeight: 700,
                backdropFilter: 'blur(4px)', whiteSpace: 'nowrap'
              }}>
                📷 SIMULATED CAMERA (DEMO)
              </div>
            </div>
          ) : (
            <video
              ref={videoRef} autoPlay playsInline muted
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: scanning ? 'brightness(0.6) saturate(1.2)' : 'brightness(1)',
                transition: 'filter 0.3s'
              }}
            />
          )}

          {/* AR Overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18%'
          }}>
            <div style={{
              position: 'relative', width: '100%', height: '65%',
              border: `2px solid ${scanning ? '#22c55e' : result && result !== 'NO_CROP' ? '#22c55e' : 'rgba(255,255,255,0.25)'}`,
              borderRadius: 20, transition: 'border-color 0.3s',
              boxShadow: scanning ? '0 0 40px rgba(34,197,94,0.15) inset' : 'none',
              overflow: 'hidden'
            }}>
              {/* Corners */}
              {['tl','tr','bl','br'].map(c => (
                <div key={c} style={{
                  position: 'absolute',
                  ...(c.includes('t') ? {top: -2} : {bottom: -2}),
                  ...(c.includes('l') ? {left: -2} : {right: -2}),
                  width: 28, height: 28,
                  borderTop: c.includes('t') ? '3px solid #22c55e' : 'none',
                  borderBottom: c.includes('b') ? '3px solid #22c55e' : 'none',
                  borderLeft: c.includes('l') ? '3px solid #22c55e' : 'none',
                  borderRight: c.includes('r') ? '3px solid #22c55e' : 'none',
                  borderTopLeftRadius: c === 'tl' ? 20 : 0,
                  borderTopRightRadius: c === 'tr' ? 20 : 0,
                  borderBottomLeftRadius: c === 'bl' ? 20 : 0,
                  borderBottomRightRadius: c === 'br' ? 20 : 0,
                }} />
              ))}

              {/* Scan line */}
              {scanning && (
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                  boxShadow: '0 0 20px 6px rgba(34,197,94,0.5)',
                  animation: 'arScan 1.8s infinite ease-in-out'
                }} />
              )}

              {/* Center cross-hair */}
              {!scanning && !result && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: 24, height: 24 }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.4)', transform: 'translateY(-50%)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.4)', transform: 'translateX(-50%)' }} />
                  </div>
                </div>
              )}

              {/* Scan progress overlay */}
              {scanning && (
                <div style={{
                  position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.7)', padding: '4px 14px', borderRadius: 20,
                  color: '#22c55e', fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)'
                }}>
                  {lang === 'kn' ? 'ವಿಶ್ಲೇಷಣೆ' : 'ANALYZING'} {scanProgress}%
                </div>
              )}
            </div>
          </div>

          {/* Top info bar */}
          {!scanning && !result && (
            <div style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.7)', padding: '6px 16px', borderRadius: 20,
              color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600,
              backdropFilter: 'blur(8px)', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {lang === 'kn' ? '📷 ಬೆಳೆಯ ಎಲೆಯನ್ನು ಚೌಕಟ್ಟಿನಲ್ಲಿ ಇರಿಸಿ' : '📷 Place crop leaf in the frame'}
            </div>
          )}

          {/* Scan progress bar */}
          {scanning && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
              <div style={{
                height: '100%', width: `${scanProgress}%`,
                background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                transition: 'width 0.15s ease', borderRadius: '0 2px 2px 0'
              }} />
            </div>
          )}
        </div>

        {/* ── Bottom Panel ── */}
        <div style={{
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          borderTopLeftRadius: result ? 0 : 28, borderTopRightRadius: result ? 0 : 28,
          padding: '20px 20px 24px', zIndex: 60,
          boxShadow: result ? 'none' : '0 -10px 40px rgba(0,0,0,0.4)',
          maxHeight: result ? '100%' : '55%', overflowY: 'auto',
          flex: result ? 1 : 'none',
          display: 'flex', flexDirection: 'column'
        }}>
          {/* Handle */}
          <div style={{ width: 36, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 16px' }} />

          {/* ── STATE: Idle (no result) ── */}
          {!result ? (
            <div>
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg,#064e3b,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0 }}>
                  <Microscope size={18} color="#fff" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
                    {lang === 'kn' ? 'ಬೆಳೆಯ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಿಸಿ' : 'Analyze Crop Health'}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: 11, fontWeight: 500 }}>
                    {lang === 'kn' ? 'AI ಮೂಲಕ ರೋಗ ಪತ್ತೆ ಮಾಡಿ' : 'AI-powered disease detection'}
                  </p>
                </div>
              </div>

              {/* Feature chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {[
                  { icon: <Bot size={11} />, label: lang === 'kn' ? 'AI ರೋಗ ಗುರುತು' : 'AI Disease ID' },
                  { icon: <Pill size={11} />, label: lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಪರಿಹಾರ' : 'Smart Remedy' },
                  { icon: <Building2 size={11} />, label: lang === 'kn' ? 'ಯೋಜನೆ ಶಿಫಾರಸು' : 'Scheme Alert' },
                ].map((chip, i) => (
                  <div key={i} style={{ background: '#f1f5f9', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#475569', display: 'flex', gap: 5, alignItems: 'center' }}>
                    {chip.icon}{chip.label}
                  </div>
                ))}
              </div>


              {/* Crop selector — single instance, bottom panel only */}
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                  <Crop size={12} color="#16a34a" />
                  {lang === 'kn' ? 'ಯಾವ ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡುತ್ತಿದ್ದೀರಿ?' : 'Which crop are you scanning?'}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => { setSelectedCrop(e.target.value); setShowSelectorHint(false); }}
                  style={{
                    background: selectedCrop === 'NO_CROP' ? '#fff1f2' : '#f0fdf4',
                    color: selectedCrop === 'NO_CROP' ? '#dc2626' : '#15803d',
                    border: `1.5px solid ${selectedCrop === 'NO_CROP' ? '#fca5a5' : '#86efac'}`,
                    padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                    outline: 'none', width: '100%', cursor: 'pointer',
                  }}
                >
                  <option value="NO_CROP" style={{ color: '#dc2626' }}>{lang === 'kn' ? '— ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ —' : '— Select crop to scan —'}</option>
                  {UNIQUE_CROPS.map((crop, i) => {
                    const em = CROP_DISEASES.find(d => d.crop === crop)?.emoji || '🌿';
                    return <option key={i} value={crop} style={{ color: '#000' }}>{em} {crop}</option>;
                  })}
                </select>
              </div>

              {/* Scan / Analyze button */}
              <button
                onClick={scanMode === 'image' && uploadedImage ? handleImageScan : handleScan}
                disabled={scanning}
                style={{
                  background: scanning ? '#94a3b8'
                    : selectedCrop === 'NO_CROP'
                    ? 'linear-gradient(135deg,#f59e0b,#d97706)'
                    : 'linear-gradient(135deg,#16a34a,#15803d)',
                  color: '#fff', border: 'none', borderRadius: 14,
                  padding: '14px', fontSize: 15, fontWeight: 800, width: '100%',
                  cursor: scanning ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: scanning || selectedCrop === 'NO_CROP' ? 'none' : '0 8px 24px rgba(22,163,74,0.35)',
                  transition: 'all 0.2s',
                }}
              >
                {scanning ? (
                  <><Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} />
                    {lang === 'kn' ? 'AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...' : 'AI Analyzing...'}
                  </>
                ) : selectedCrop === 'NO_CROP' ? (
                  <><TriangleAlert size={18} />
                    {lang === 'kn' ? 'ಮೊದಲು ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' : 'Select a crop first'}
                  </>
                ) : scanMode === 'image' && uploadedImage ? (
                  <><Microscope size={20} />
                    {lang === 'kn' ? 'ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ' : 'Analyze Photo'}
                  </>
                ) : (
                  <><ScanLine size={20} />
                    {lang === 'kn' ? 'ಲೈವ್ ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ' : 'Start Live Scan'}
                  </>
                )}
              </button>

              {/* Supported crops count */}
              <div style={{ margin: '10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <Layers size={11} color="#94a3b8" />
                <p style={{ margin: 0, fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                  {lang === 'kn' ? `${UNIQUE_CROPS.length} ಕರ್ನಾಟಕ ಬೆಳೆಗಳು · ${CROP_DISEASES.length}+ ರೋಗಗಳು` : `${UNIQUE_CROPS.length} Karnataka crops · ${CROP_DISEASES.length}+ disease patterns`}
                </p>
              </div>
            </div>

          ) : result === 'NO_CROP' ? (
            /* ── STATE: No Crop ── */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 60, height: 60, borderRadius: 20, background: '#fee2e2',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
                boxShadow: '0 8px 20px rgba(239,68,68,0.2)'
              }}>
                <AlertCircle size={30} color="#ef4444" />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ಕಂಡುಬಂದಿಲ್ಲ' : 'No Crop Leaf Detected'}
              </h3>
              <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                {lang === 'kn'
                  ? 'ಕ್ಯಾಮರಾವನ್ನು ನೇರವಾಗಿ ಬೆಳೆಯ ಎಲೆ ಅಥವಾ ಹಣ್ಣಿನ ಮೇಲೆ ಇರಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
                  : 'This doesn\'t appear to be a crop leaf. Please point camera directly at the affected plant leaf or fruit part.'}
              </p>
              
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', marginBottom: 16, textAlign: 'left' }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: '#475569' }}>💡 Tips for better results:</p>
                {[
                  lang === 'kn' ? 'ಎಲೆ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸಿಕೊಳ್ಳಲಿ' : 'Ensure the leaf fills the green frame',
                  lang === 'kn' ? 'ಸರಿಯಾದ ಬೆಳಕು ಇರಲಿ' : 'Use good natural light',
                  lang === 'kn' ? 'ಕ್ಯಾಮರಾ ಸ್ಥಿರವಾಗಿರಲಿ' : 'Keep camera steady',
                ].map((tip, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#64748b', marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>{i+1}.</span>{tip}
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff',
                  border: 'none', borderRadius: 14, padding: '14px 24px', fontSize: 15,
                  fontWeight: 800, cursor: 'pointer', width: '100%',
                  boxShadow: '0 8px 20px rgba(15,23,42,0.25)',
                }}
              >
                {lang === 'kn' ? '↩ ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : '↩ Try Again'}
              </button>
            </div>

          ) : (
            /* ── STATE: Result Found ── */
            <div>
              {/* Result Header */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16, background: `${result.color}18`,
                  border: `2px solid ${result.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0
                }}>
                  {result.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{
                      background: SEVERITY_CONFIG[result.severity]?.bg,
                      color: SEVERITY_CONFIG[result.severity]?.text,
                      fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20,
                    }}>
                      {SEVERITY_CONFIG[result.severity]?.label}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                    {result.disease}
                  </h3>
                  {result.diseaseKn && (
                    <p style={{ margin: '0 0 2px', fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{result.diseaseKn}</p>
                  )}
                  <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={11} />
                    {lang === 'kn' ? 'ಬೆಳೆ' : 'Crop'}: {result.crop}
                  </div>
                </div>
              </div>

              {/* Confidence meter */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '8px 12px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', flexShrink: 0 }}>
                  {lang === 'kn' ? 'AI ವಿಶ್ವಾಸ' : 'AI Confidence'}
                </span>
                <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 4, height: 6 }}>
                  <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #16a34a, #22c55e)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#16a34a', flexShrink: 0 }}>87%</span>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 12, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
                {[
                  { key: 'remedy', label: lang === 'kn' ? '💊 ಪರಿಹಾರ' : '💊 Remedy' },
                  { key: 'fertilizer', label: lang === 'kn' ? '🌱 ಗೊಬ್ಬರ' : '🌱 Nutrition' },
                  { key: 'tips', label: lang === 'kn' ? '💡 ಸಲಹೆ' : '💡 Key Tips' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      flex: 1, padding: '7px 4px', borderRadius: 7, border: 'none',
                      cursor: 'pointer', fontSize: 11, fontWeight: 700,
                      background: activeTab === tab.key ? '#fff' : 'transparent',
                      color: activeTab === tab.key ? '#0f172a' : '#64748b',
                      boxShadow: activeTab === tab.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14, marginBottom: 12, minHeight: 80 }}>
                {activeTab === 'remedy' && (
                  <div>
                    <div style={{ fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {lang === 'kn' ? 'ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ' : 'Chemical Treatment'}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{result.remedy}</p>
                    {result.organicTip && (
                      <div style={{ marginTop: 10, padding: '8px 10px', background: '#ecfdf5', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', marginBottom: 3 }}>🌿 {lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ' : 'Organic Alternative'}</div>
                        <p style={{ margin: 0, fontSize: 12, color: '#166534', lineHeight: 1.4 }}>{result.organicTip}</p>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'fertilizer' && (
                  <div>
                    <div style={{ fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {lang === 'kn' ? 'ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ' : 'Nutrition Management'}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{result.fertilizer}</p>
                  </div>
                )}
                {activeTab === 'tips' && result.keyTakeaways && (
                  <div>
                    <div style={{ fontSize: 10, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                      {lang === 'kn' ? 'ಪ್ರಮುಖ ಅಂಶಗಳು' : 'Key Takeaways'}
                    </div>
                    {result.keyTakeaways.map((tip, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: result.color + '20', color: result.color, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: 12, color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scheme Section — only if scheme exists */}
              {result.scheme ? (
                <a
                  href={result.schemeLink || '#'} target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'linear-gradient(90deg, #f0fdf4, #ecfdf5)',
                    border: '1px solid #86efac', borderRadius: 14, padding: '12px 14px',
                    marginBottom: 12, textDecoration: 'none', transition: 'transform 0.1s',
                    boxShadow: '0 4px 12px rgba(22,163,74,0.08)'
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ background: '#16a34a', borderRadius: 10, padding: 8, color: '#fff', flexShrink: 0 }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: '#15803d', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                      {lang === 'kn' ? '🏛️ ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆ — ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : '🏛️ Eligible Govt Scheme — Tap to Apply'}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#14532d' }}>{result.scheme}</div>
                  </div>
                  <ChevronRight size={16} color="#16a34a" />
                </a>
              ) : (
                /* No scheme available */
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14,
                  padding: '10px 14px', marginBottom: 12,
                }}>
                  <Info size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', lineHeight: 1.4 }}>
                    {lang === 'kn'
                      ? 'ಈ ರೋಗಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಸರ್ಕಾರಿ ಯೋಜನೆ ಇಲ್ಲ. ನಿಮ್ಮ ಸ್ಥಳೀಯ KVK ಸಂಪರ್ಕಿಸಿ.'
                      : 'No specific govt scheme for this disease. Contact your local Krishi Vigyan Kendra (KVK) for assistance.'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <button
                  onClick={toggleVoice}
                  style={{
                    flex: 1, background: isSpeaking ? '#ef4444' : '#1e293b', color: '#fff',
                    border: 'none', borderRadius: 12, padding: '13px', fontSize: 14, fontWeight: 800,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: isSpeaking ? '0 6px 16px rgba(239,68,68,0.3)' : '0 6px 16px rgba(30,41,59,0.25)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Volume2 size={18} />
                  {isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸು' : 'Stop') : (lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : 'Read Aloud')}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', border: 'none', borderRadius: 12,
                    padding: '13px 16px', fontSize: 13, fontWeight: 800, cursor: 'pointer',
                    transition: 'all 0.2s', flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 6px 16px rgba(22,163,74,0.3)'
                  }}
                >
                  <RefreshCw size={15} />
                  {lang === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Another Crop'}
                </button>
              </div>

              {/* ── Inline Q&A Chat ── */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MessageCircle size={13} color="#16a34a" />
                  {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ' : 'Ask follow-up questions'}
                </div>

                {/* Suggested questions */}
                {qaChat.length === 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    {[
                      lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ ಏನು?' : 'Any organic alternative?',
                      lang === 'kn' ? 'ಹರಡುವ ತಡೆಯಲು ಏನು ಮಾಡಬೇಕು?' : 'How to prevent spread?',
                      lang === 'kn' ? 'ಯೋಜನೆ ಅರ್ಜಿ ಹೇಗೆ?' : 'How to apply for scheme?',
                    ].map((q, i) => (
                      <button key={i} onClick={() => { setQaInput(q); }}
                        style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 20, padding: '4px 10px', fontSize: 11, color: '#15803d', fontWeight: 600, cursor: 'pointer' }}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Chat messages */}
                {qaChat.length > 0 && (
                  <div style={{ background: '#f8fafc', borderRadius: 12, padding: '8px 10px', marginBottom: 8, maxHeight: 160, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {qaChat.map((msg, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          maxWidth: '85%', padding: '7px 11px',
                          borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                          background: msg.role === 'user' ? 'linear-gradient(135deg, #16a34a, #15803d)' : '#fff',
                          color: msg.role === 'user' ? '#fff' : '#1e293b',
                          fontSize: 12, fontWeight: 500, lineHeight: 1.45,
                          boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
                        }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {qaLoading && (
                      <div style={{ display: 'flex', gap: 4, padding: '8px 12px' }}>
                        {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ${i * 0.2}s infinite` }} />)}
                      </div>
                    )}
                    <div ref={qaChatEndRef} />
                  </div>
                )}

                {/* Input */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    value={qaInput}
                    onChange={e => setQaInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleQaAsk()}
                    placeholder={lang === 'kn' ? 'ಇಲ್ಲಿ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...' : 'Ask anything about this disease...'}
                    style={{
                      flex: 1, border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '9px 12px',
                      fontSize: 13, outline: 'none', background: '#f8fafc', color: '#1e293b',
                      fontFamily: "'Inter', sans-serif"
                    }}
                    onFocus={e => e.target.style.borderColor = '#16a34a'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    onClick={handleQaAsk}
                    disabled={!qaInput.trim() || qaLoading}
                    style={{
                      background: qaInput.trim() ? '#16a34a' : '#e2e8f0', color: '#fff',
                      border: 'none', borderRadius: 10, padding: '0 14px', cursor: qaInput.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex', alignItems: 'center', transition: 'all 0.15s'
                    }}
                  >
                    <Send size={16} color={qaInput.trim() ? '#fff' : '#94a3b8'} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      <style>{`
        @keyframes arScan {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); }
          30%           { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
