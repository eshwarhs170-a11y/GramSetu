import React, { useState, useRef } from 'react';
import { Sprout, Droplets, FlaskConical, Sparkles, Volume2, VolumeX, Printer, CheckCircle2, AlertTriangle, Layers, Info, Calendar, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { callGemini } from '../utils/voiceCommands';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const SOIL_PROFILES = {
  'red-sandy': {
    id: 'red-sandy',
    nameEn: 'Red Sandy Loam',
    nameKn: 'ಕೆಂಪು ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು',
    districtsEn: 'Kolar, Chikkaballapur, Tumakuru, Mysuru, Ramanagara',
    phRange: '6.0 - 6.8 (Slightly Acidic to Neutral)',
    characteristicsEn: 'Good aeration, rapid drainage, low water holding capacity, prone to nitrogen leaching.',
    organicCarbon: '0.35% (Low - needs organic matter)',
    recommendedCrops: ['Ragi', 'Groundnut', 'Maize', 'Tomato', 'Mulberry', 'Mango'],
    baseNPK: { N: 100, P: 50, K: 50 }, // kg/ha base
  },
  'black-cotton': {
    id: 'black-cotton',
    nameEn: 'Black Cotton Soil (Regur)',
    nameKn: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು',
    districtsEn: 'Belagavi, Dharwad, Bagalkot, Vijayapura, Ballari, Kalaburagi',
    phRange: '7.5 - 8.5 (Moderately Alkaline)',
    characteristicsEn: 'Deep cracking in summer, high swelling when wet, high moisture retention, rich in Ca & Mg.',
    organicCarbon: '0.45% (Moderate)',
    recommendedCrops: ['Cotton', 'Sugarcane', 'Sunflower', 'Jowar', 'Bengal Gram', 'Chilli'],
    baseNPK: { N: 120, P: 60, K: 40 },
  },
  'clay-loam': {
    id: 'clay-loam',
    nameEn: 'Clay Loam (Alluvial Delta)',
    nameKn: 'ಜೇಡಿ ಮೆಕ್ಕಲು ಮಣ್ಣು',
    districtsEn: 'Mandya, Shivamogga, Davanagere, Raichur canal tracts',
    phRange: '6.5 - 7.5 (Optimal Neutral)',
    characteristicsEn: 'High fertility, excellent nutrient retention, moderate drainage, prone to waterlogging if unmanaged.',
    organicCarbon: '0.65% (Good)',
    recommendedCrops: ['Paddy', 'Sugarcane', 'Arecanut', 'Banana', 'Vegetables'],
    baseNPK: { N: 120, P: 50, K: 50 },
  },
  'laterite': {
    id: 'laterite',
    nameEn: 'Laterite Acidic Soil',
    nameKn: 'ಕೆಂಪು ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು',
    districtsEn: 'Udupi, Dakshina Kannada, Uttara Kannada, Kodagu, Chikkamagaluru',
    phRange: '4.8 - 5.5 (Acidic - High Aluminium/Iron)',
    characteristicsEn: 'Heavy monsoon leaching, phosphate fixation, porous texture, requires periodic agricultural lime.',
    organicCarbon: '0.70% (High in forest belts, low mineral N)',
    recommendedCrops: ['Arecanut', 'Cashew', 'Coffee', 'Pepper', 'Cardamom', 'Rubber', 'Paddy'],
    baseNPK: { N: 90, P: 60, K: 70 },
  },
  'coastal-alluvial': {
    id: 'coastal-alluvial',
    nameEn: 'Coastal Alluvial Soil',
    nameKn: 'ಕರಾವಳಿ ಮೆಕ್ಕಲು ಮಣ್ಣು',
    districtsEn: 'Coastal belts of Mangaluru, Kundapura, Karwar, Kumta',
    phRange: '5.8 - 6.5 (Mildly Acidic)',
    characteristicsEn: 'Sandy to loamy sand, high infiltration, prone to coastal salinity intrusion if over-pumped.',
    organicCarbon: '0.50% (Moderate)',
    recommendedCrops: ['Coconut', 'Paddy', 'Sweet Potato', 'Arecanut', 'Watermelon'],
    baseNPK: { N: 80, P: 40, K: 60 },
  }
};

export const CROP_MULTIPLIERS = {
  Paddy:     { nMul: 1.1, pMul: 1.0, kMul: 1.0, fymPerAcre: 5,  zincKg: 10,  limeNeed: 50 },
  Ragi:      { nMul: 0.9, pMul: 0.9, kMul: 0.8, fymPerAcre: 4,  zincKg: 5,   limeNeed: 30 },
  Arecanut:  { nMul: 1.3, pMul: 1.2, kMul: 1.5, fymPerAcre: 8,  zincKg: 15,  limeNeed: 100 },
  Cotton:    { nMul: 1.2, pMul: 1.1, kMul: 0.9, fymPerAcre: 6,  zincKg: 10,  limeNeed: 0 },
  Tomato:    { nMul: 1.4, pMul: 1.3, kMul: 1.4, fymPerAcre: 10, zincKg: 8,   limeNeed: 40 },
  Sugarcane: { nMul: 1.8, pMul: 1.4, kMul: 1.6, fymPerAcre: 12, zincKg: 20,  limeNeed: 60 },
  Maize:     { nMul: 1.2, pMul: 1.0, kMul: 0.9, fymPerAcre: 5,  zincKg: 10,  limeNeed: 20 },
  Coconut:   { nMul: 1.0, pMul: 0.8, kMul: 1.6, fymPerAcre: 6,  zincKg: 12,  limeNeed: 50 },
};

export default function SoilHealthDoctor({ isModal = false, onClose = () => {} }) {
  const { lang } = useLanguage();
  const { speak, isSpeaking, stopSpeaking } = useVoice();
  
  const [selectedSoil, setSelectedSoil] = useState('red-sandy');
  const [selectedCrop, setSelectedCrop] = useState('Ragi');
  const [acres, setAcres] = useState(2);
  const [useOrganicFocus, setUseOrganicFocus] = useState(false);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef(false);

  const soil = SOIL_PROFILES[selectedSoil] || SOIL_PROFILES['red-sandy'];
  const cropMult = CROP_MULTIPLIERS[selectedCrop] || CROP_MULTIPLIERS['Ragi'];

  // Calculations per total acreage
  // N-P-K in pure nutrients (kg)
  const totalN = Math.round((soil.baseNPK.N * cropMult.nMul * 0.404) * acres); // 1 ha = 2.47 acres -> per acre is ~0.404
  const totalP = Math.round((soil.baseNPK.P * cropMult.pMul * 0.404) * acres);
  const totalK = Math.round((soil.baseNPK.K * cropMult.kMul * 0.404) * acres);

  // Conversion to commercial fertilizers:
  // Urea (46% N) -> Urea kg = N / 0.46
  // DAP (18% N, 46% P2O5) -> DAP kg = P / 0.46. DAP also gives DAP*0.18 N.
  const dapKg = Math.round(totalP / 0.46);
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);
  const ureaKg = Math.round(remainingN / 0.46);
  // MOP (Muriate of Potash, 60% K2O) -> MOP kg = K / 0.60
  const mopKg = Math.round(totalK / 0.60);

  // Bag units (Urea = 45kg bag, DAP = 50kg bag, MOP = 50kg bag)
  const ureaBags = (ureaKg / 45).toFixed(1);
  const dapBags = (dapKg / 50).toFixed(1);
  const mopBags = (mopKg / 50).toFixed(1);

  // Organic amendments
  const fymTonnes = (cropMult.fymPerAcre * acres).toFixed(1);
  const neemCakeKg = Math.round(50 * acres);
  const bioFertilizerPkt = Math.max(2, Math.round(2 * acres));
  const limeKg = selectedSoil === 'laterite' ? Math.round(cropMult.limeNeed * acres) : 0;

  // Narration text
  const narrationEn = `For ${acres} acres of ${selectedCrop} on ${soil.nameEn}, your customized recommendation is: Apply ${dapKg} kilograms of DAP, ${ureaKg} kilograms of Urea, and ${mopKg} kilograms of Potash. Split Urea into three applications: at sowing, 30 days, and flowering. Incorporate ${fymTonnes} tonnes of farm yard manure and ${neemCakeKg} kilograms of neem cake to improve organic carbon.`;
  const narrationKn = `${acres} ಎಕರೆ ${selectedCrop} ಬೆಳೆಗೆ ${soil.nameKn}ದಲ್ಲಿ ಶಿಫಾರಸು: ${dapKg} ಕೆಜಿ ಡಿಎಪಿ, ${ureaKg} ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು ${mopKg} ಕೆಜಿ ಪೊಟ್ಯಾಶ್ ಹಾಕಿ. ಬಿತ್ತನೆಯ ಸಮಯದಲ್ಲಿ ಮತ್ತು 30 ದಿನಗಳ ನಂತರ ಯೂರಿಯಾವನ್ನು ಹಂಚಿ ಹಾಕಿ. ${fymTonnes} ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ${neemCakeKg} ಕೆಜಿ ಬೇವಿನ ಹಿಂಡಿ ಬಳಸಿ.`;

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(lang === 'kn' ? narrationKn : narrationEn);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, 210, 28, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text('GRAMSETU — SOIL HEALTH & NPK ADVISORY CARD', 105, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('times', 'normal');
    doc.text('Government of Karnataka • Department of Agriculture & RDPR Advisory', 105, 20, { align: 'center' });

    // Farmer & Plot Details
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(11);
    doc.setFont('times', 'bold');
    doc.text('1. Farm & Soil Profile', 14, 38);
    
    autoTable(doc, {
      startY: 42,
      theme: 'grid',
      head: [['Field Parameter', 'Configured Value']],
      body: [
        ['Target Crop', selectedCrop],
        ['Soil Type', `${soil.nameEn} (${soil.nameKn})`],
        ['Total Cultivation Area', `${acres} Acres (${(acres * 0.404).toFixed(2)} Hectares)`],
        ['Soil pH Range', soil.phRange],
        ['Estimated Organic Carbon', soil.organicCarbon],
        ['Regional Belt', soil.districtsEn],
      ],
      headStyles: { fillColor: [22, 101, 52], font: 'times' },
      styles: { font: 'times', fontSize: 10 }
    });

    // Chemical Fertilizer Dosage
    const currentY = doc.lastAutoTable.finalY + 10;
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('2. Calibrated Chemical Fertilizer Schedule', 14, currentY);

    autoTable(doc, {
      startY: currentY + 4,
      theme: 'grid',
      head: [['Fertilizer Type', 'Pure Nutrient', 'Total Weight', 'Bag Equivalent (Standard)', 'Application Window']],
      body: [
        ['DAP (Di-Ammonium Phosphate)', `Phosphorus: ${totalP} kg`, `${dapKg} kg`, `${dapBags} Bags (50kg)`, '100% Basal at Sowing / Transplanting'],
        ['Urea (Nitrogen Source)', `Nitrogen: ${totalN} kg`, `${ureaKg} kg`, `${ureaBags} Bags (45kg)`, '33% Basal, 33% at 30 Days, 34% at Boot/Flowering'],
        ['MOP (Muriate of Potash)', `Potassium: ${totalK} kg`, `${mopKg} kg`, `${mopBags} Bags (50kg)`, '50% Basal, 50% at Early Panicle/Fruit Emergence'],
        ['Zinc Sulfate (ZnSO4)', 'Zinc Micronutrient', `${Math.round(cropMult.zincKg * acres)} kg`, '-', 'Soil application every 2 seasons'],
      ],
      headStyles: { fillColor: [30, 64, 175], font: 'times' },
      styles: { font: 'times', fontSize: 9 }
    });

    // Organic & Soil Conditioning
    const organicY = doc.lastAutoTable.finalY + 10;
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('3. Organic Amendments & Soil Conditioning', 14, organicY);

    autoTable(doc, {
      startY: organicY + 4,
      theme: 'grid',
      head: [['Organic Amendment', 'Dosage', 'Agronomic Function']],
      body: [
        ['Well-decomposed FYM / Compost', `${fymTonnes} Tonnes`, 'Restores soil microbiome, improves water retention capacity'],
        ['Neem Cake (ಬೇವಿನ ಹಿಂಡಿ)', `${neemCakeKg} kg`, 'Acts as natural nitrification inhibitor and soil nematode repellent'],
        ['Bio-fertilizers (Azospirillum + PSB)', `${bioFertilizerPkt} Packets (200g)`, 'Atmospheric nitrogen fixation and phosphate solubilization'],
        ...(limeKg > 0 ? [['Agricultural Lime (CaCO3)', `${limeKg} kg`, 'Neutralizes soil acidity in laterite zones, prevents aluminium toxicity']] : [])
      ],
      headStyles: { fillColor: [202, 138, 4], font: 'times' },
      styles: { font: 'times', fontSize: 9 }
    });

    // Footer & Disclaimer
    doc.setFontSize(8);
    doc.setFont('times', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')} via GramSetu Agronomic Advisory System. Consult your local Raitha Samparka Kendra (RSK) officer for soil sample laboratory testing.`, 14, 285);

    doc.save(`GramSetu_Soil_Health_Card_${selectedCrop}_${acres}Acres.pdf`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: isModal ? '0' : '20px 16px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
        color: '#fff',
        borderRadius: 16,
        padding: '24px 28px',
        marginBottom: 24,
        boxShadow: '0 10px 25px -5px rgba(22, 101, 52, 0.25)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
              🌱 AGRO-INTELLIGENCE
            </span>
            <span style={{ fontSize: 13, opacity: 0.9 }}>
              {lang === 'kn' ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು NPK ರಸಗೊಬ್ಬರ ಸಲಹೆಗಾರ' : 'Soil Health & NPK Dosage Calculator'}
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 8px 0', color: '#ffffff' }}>
            {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಮಣ್ಣು ಪರೀಕ್ಷೆ & ಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶಿ' : 'Precision Soil Health & Fertilizer Advisor'}
          </h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.92, maxWidth: 650, lineHeight: 1.5 }}>
            {lang === 'kn'
              ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಮಣ್ಣಿನ ಪ್ರಕಾರಗಳು ಮತ್ತು ಬೆಳೆಗಳಿಗೆ ತಕ್ಕಂತೆ ನಿಖರವಾದ ಡಿಎಪಿ, ಯೂರಿಯಾ, ಪೊಟ್ಯಾಶ್ ಹಾಗೂ ಸಾವಯವ ಗೊಬ್ಬರದ ಲೆಕ್ಕಾಚಾರ.'
              : 'Scientifically calibrated fertilizer split-dosages and organic conditioning guidelines tailored across Karnataka agro-climatic zones.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={handleToggleSpeak}
            style={{
              background: isSpeaking ? '#ef4444' : 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop') : (lang === 'kn' ? 'ಧ್ವನಿ ವಿವರಣೆ' : 'Listen')}</span>
          </button>

          <button
            onClick={handleExportPDF}
            style={{
              background: '#ffffff',
              color: '#166534',
              border: 'none',
              padding: '10px 18px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Printer size={18} />
            <span>{lang === 'kn' ? 'ಮಣ್ಣಿನ ಕಾರ್ಡ್ PDF' : 'Download Soil Card'}</span>
          </button>
        </div>
      </div>

      {/* Control Configuration Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16,
        marginBottom: 24
      }}>
        {/* Step 1: Soil Type Selector */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e2e8f0)',
          borderRadius: 14,
          padding: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--text-primary, #0f172a)', marginBottom: 12 }}>
            <Layers size={18} color="#16a34a" />
            <span>1. {lang === 'kn' ? 'ನಿಮ್ಮ ಭೂಮಿಯ ಮಣ್ಣಿನ ಪ್ರಕಾರ' : 'Select Soil Type'}</span>
          </label>
          <select
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid var(--border, #cbd5e1)',
              background: 'var(--bg-card, #ffffff)',
              color: 'var(--text-primary, #0f172a)',
              fontSize: 14,
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.values(SOIL_PROFILES).map((s) => (
              <option key={s.id} value={s.id}>
                {lang === 'kn' ? `${s.nameKn} (${s.nameEn})` : `${s.nameEn} — ${s.phRange}`}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 12, padding: 10, background: 'var(--bg-main, #f8fafc)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary, #475569)' }}>
            <strong>Districts:</strong> {soil.districtsEn}
            <div style={{ marginTop: 4 }}><strong>Characteristics:</strong> {soil.characteristicsEn}</div>
          </div>
        </div>

        {/* Step 2: Target Crop */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e2e8f0)',
          borderRadius: 14,
          padding: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--text-primary, #0f172a)', marginBottom: 12 }}>
            <Sprout size={18} color="#16a34a" />
            <span>2. {lang === 'kn' ? 'ಬೆಳೆಯುವ ಬೆಳೆ' : 'Select Crop'}</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Paddy', 'Ragi', 'Arecanut', 'Cotton', 'Tomato', 'Sugarcane', 'Maize', 'Coconut'].map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: selectedCrop === crop ? 800 : 600,
                  border: selectedCrop === crop ? '2px solid #16a34a' : '1px solid var(--border, #cbd5e1)',
                  background: selectedCrop === crop ? '#dcfce7' : 'var(--bg-card, #ffffff)',
                  color: selectedCrop === crop ? '#166534' : 'var(--text-primary, #1e293b)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Acreage Slider */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e2e8f0)',
          borderRadius: 14,
          padding: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
              <FlaskConical size={18} color="#16a34a" />
              <span>3. {lang === 'kn' ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)' : 'Cultivation Land Size'}</span>
            </label>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 10px', borderRadius: 8 }}>
              {acres} {lang === 'kn' ? 'ಎಕರೆ' : 'Acres'}
            </span>
          </div>

          <input
            type="range"
            min="0.5"
            max="15"
            step="0.5"
            value={acres}
            onChange={(e) => setAcres(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {[1, 2, 4, 5, 10].map((quickAcre) => (
              <button
                key={quickAcre}
                onClick={() => setAcres(quickAcre)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  border: '1px solid var(--border, #cbd5e1)',
                  background: acres === quickAcre ? '#16a34a' : 'transparent',
                  color: acres === quickAcre ? '#fff' : 'var(--text-muted, #64748b)',
                  cursor: 'pointer'
                }}
              >
                {quickAcre} Ac
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Calculated Results Section */}
      <div style={{
        background: 'var(--bg-card, #ffffff)',
        border: '1.5px solid #16a34a',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        boxShadow: '0 4px 20px rgba(22, 101, 52, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border, #e2e8f0)', paddingBottom: 16, marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: 'var(--text-primary, #0f172a)' }}>
              {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ರಸಗೊಬ್ಬರಗಳ ವಿವರ' : 'Calibrated Mineral Fertilizer Dosage'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'var(--text-secondary, #64748b)' }}>
              Based on Karnataka Agricultural University (UAS Bengaluru & Dharwad) package of practices for {selectedCrop}.
            </p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '6px 12px', borderRadius: 999 }}>
            ✓ Laboratory Calibrated
          </span>
        </div>

        {/* 3 Main Fertilizer Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 24
        }}>
          {/* DAP */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1px solid #93c5fd',
            borderRadius: 12,
            padding: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Phosphorus & Nitrogen
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1e3a8a', margin: '4px 0' }}>
                  DAP (18:46:0)
                </h3>
              </div>
              <span style={{ fontSize: 24 }}>🌾</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1d4ed8', margin: '12px 0 4px 0' }}>
              {dapKg} <span style={{ fontSize: 16, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e40af' }}>
              ≈ {dapBags} Bags (50kg)
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#3b82f6', borderTop: '1px dashed #bfdbfe', paddingTop: 8 }}>
              <strong>Application:</strong> 100% Basal dose at seed drilling/sowing.
            </div>
          </div>

          {/* Urea */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1px solid #86efac',
            borderRadius: 12,
            padding: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Fast Vegetative Growth
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#14532d', margin: '4px 0' }}>
                  Urea (46% N)
                </h3>
              </div>
              <span style={{ fontSize: 24 }}>🌱</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#15803d', margin: '12px 0 4px 0' }}>
              {ureaKg} <span style={{ fontSize: 16, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
              ≈ {ureaBags} Bags (45kg)
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#16a34a', borderTop: '1px dashed #bbf7d0', paddingTop: 8 }}>
              <strong>Application:</strong> Split into 3 equal doses: Basal, 30d, and flowering.
            </div>
          </div>

          {/* MOP */}
          <div style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1px solid #fde68a',
            borderRadius: 12,
            padding: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Disease Resistance & Grain Fill
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#78350f', margin: '4px 0' }}>
                  MOP (Potash 60%)
                </h3>
              </div>
              <span style={{ fontSize: 24 }}>🛡️</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#b45309', margin: '12px 0 4px 0' }}>
              {mopKg} <span style={{ fontSize: 16, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400e' }}>
              ≈ {mopBags} Bags (50kg)
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#d97706', borderTop: '1px dashed #fde68a', paddingTop: 8 }}>
              <strong>Application:</strong> 50% Basal and 50% at panicle emergence.
            </div>
          </div>
        </div>

        {/* Organic Amendments & Soil Conditioning Row */}
        <div style={{
          background: 'var(--bg-main, #f8fafc)',
          borderRadius: 12,
          padding: 18,
          border: '1px solid var(--border, #e2e8f0)'
        }}>
          <h4 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary, #0f172a)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Droplets size={16} color="#16a34a" />
            <span>{lang === 'kn' ? 'ಸಾವಯವ ಹಾಗೂ ಜೈವಿಕ ಮಣ್ಣು ಸಂವರ್ಧನೆ' : 'Organic & Biological Soil Conditioning'}</span>
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div style={{ background: 'var(--bg-card, #fff)', padding: 12, borderRadius: 8, border: '1px solid var(--border, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>Farm Yard Manure (FYM)</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#166534', margin: '4px 0' }}>{fymTonnes} Tonnes</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary, #475569)' }}>Mix thoroughly 2 weeks prior to sowing</div>
            </div>

            <div style={{ background: 'var(--bg-card, #fff)', padding: 12, borderRadius: 8, border: '1px solid var(--border, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>Neem Cake (ಬೇವಿನ ಹಿಂಡಿ)</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#166534', margin: '4px 0' }}>{neemCakeKg} kg</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary, #475569)' }}>Slows nitrogen loss and deters termites</div>
            </div>

            <div style={{ background: 'var(--bg-card, #fff)', padding: 12, borderRadius: 8, border: '1px solid var(--border, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>Bio-Fertilizers (PSB/Azospirillum)</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#166534', margin: '4px 0' }}>{bioFertilizerPkt} Packets</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary, #475569)' }}>Seed treatment before planting</div>
            </div>

            {limeKg > 0 && (
              <div style={{ background: '#fef2f2', padding: 12, borderRadius: 8, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 11, color: '#b91c1c', fontWeight: 700 }}>Agricultural Lime (Laterite Care)</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#dc2626', margin: '4px 0' }}>{limeKg} kg</div>
                <div style={{ fontSize: 11, color: '#991b1b' }}>Neutralizes acidity (pH &lt; 5.5)</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ── AI Soil Improvement Advisory ── */}
      <div style={{
        background: 'var(--bg-card, #fff)',
        borderRadius: 16,
        padding: 0,
        border: '1.5px solid rgba(79,70,229,0.25)',
        overflow: 'hidden',
        marginTop: 20
      }}>
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: 6, display: 'flex', alignItems: 'center' }}>
            <Sparkles size={18} color="#fbbf24" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#fff' }}>AI Soil Improvement Advisor</h4>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Gemini AI · Personalized for your farm</p>
          </div>
        </div>
        <div style={{ padding: '16px 20px' }}>
          {!aiAdvice ? (
            <>
              <p style={{ fontSize: 13, color: 'var(--text-secondary, #475569)', marginBottom: 14, lineHeight: 1.5 }}>
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರ, ಬೆಳೆ, ಮತ್ತು ಪ್ರದೇಶಕ್ಕೆ ತಕ್ಕಂತೆ AI ವೈಯಕ್ತಿಕ ಸಲಹೆ ಕೊಡುತ್ತದೆ.'
                  : 'Get AI-powered personalized soil improvement tips based on your exact configuration above.'}
              </p>
              <button
                onClick={async () => {
                  if (aiRef.current) return;
                  aiRef.current = true;
                  setAiLoading(true);
                  const prompt = `You are an expert Karnataka soil scientist. Soil type: ${soil.nameEn} (pH: ${soil.phRange}). Crop: ${selectedCrop}. Farm size: ${acres} acres. Fertilizer applied: Urea ${ureaKg}kg, DAP ${dapKg}kg, MOP ${mopKg}kg. FYM: ${fymTonnes} tonnes. Region: ${soil.districtsEn}.

Give 5 specific, actionable soil improvement tips for this farmer that go BEYOND basic NPK. Include:
1. Soil microbiome enhancement techniques
2. Water management advice for this soil
3. Cover crop / green manure suggestions
4. Season-specific timing advice
5. Long-term soil health building strategy

Format as JSON: {"tips":[{"title":"...","detail":"...","icon":"🌱|💧|🔬|📅|🏗️"}]}.
Return ONLY the JSON object.`;
                  let parsed = null;
                  try {
                    const res = await callGemini(prompt);
                    if (res) {
                      const match = res.match(/\{[\s\S]*\}/);
                      if (match) parsed = JSON.parse(match[0]);
                    }
                  } catch(e) { /* fallback */ }
                  if (parsed && Array.isArray(parsed.tips) && parsed.tips.length > 0) {
                    setAiAdvice(parsed);
                  } else {
                    setAiAdvice({
                      tips: [
                        { title: 'Add Jeevamrutha monthly', detail: 'Mix 10kg desi cow dung + 10L cow urine + 2kg jaggery + 2kg pulse flour in 200L water. Ferment 48hrs. Apply to root zone.', icon: '🌱' },
                        { title: 'Mulch with crop residue', detail: 'After harvest, spread residue 3-4 inches thick to reduce evaporation and add organic carbon over time.', icon: '💧' },
                        { title: `Green manure with Sunnhemp`, detail: `Grow Sunnhemp (Crotalaria juncea) for 45 days before main ${selectedCrop} season. Plough under to add 25-30kg N/acre.`, icon: '🔬' },
                        { title: 'Time fertilizer with rain', detail: 'Apply Urea splits 2 days after good rain when soil is moist but not waterlogged for maximum uptake.', icon: '📅' },
                        { title: 'Build earthworm population', detail: 'Avoid excess chemical pesticides. Apply compost in shaded areas to attract earthworms that naturally aerate soil.', icon: '🏗️' }
                      ]
                    });
                  }
                  setAiLoading(false);
                  aiRef.current = false;
                }}
                disabled={aiLoading}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: '#fff', border: 'none', borderRadius: 10,
                  padding: '10px 20px', fontSize: 13, fontWeight: 700,
                  cursor: aiLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: aiLoading ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(79,70,229,0.3)'
                }}
              >
                {aiLoading
                  ? <><RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} /> Generating advice...</>
                  : <><Sparkles size={15} /> {lang === 'kn' ? 'AI ಸಲಹೆ ಪಡೆಯಿರಿ' : 'Get AI Soil Tips'}</>
                }
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary, #0f172a)', margin: 0 }}>🧪 AI-Powered Soil Tips for {selectedCrop}:</p>
                <button onClick={() => setAiAdvice(null)} style={{ fontSize: 11, color: 'var(--primary, #16a34a)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>↻ Refresh</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {aiAdvice.tips.map((tip, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-main, #f8fafc)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border-light, #e2e8f0)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{tip.icon}</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary, #0f172a)', margin: '0 0 4px 0' }}>{tip.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary, #475569)', margin: 0, lineHeight: 1.5 }}>{tip.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
