import React, { useState, useRef } from 'react';
import {
  Sprout, Droplets, FlaskConical, Sparkles, Volume2, VolumeX,
  Printer, CheckCircle2, AlertTriangle, Layers, Info, Calendar,
  ArrowRight, ShieldCheck, RefreshCw, Check
} from 'lucide-react';
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
    colorDot: '🔴',
    districtsEn: 'Kolar, Chikkaballapur, Tumakuru, Mysuru, Ramanagara',
    districtsKn: 'ಕೋಲಾರ, ಚಿಕ್ಕಬಳ್ಳಾಪುರ, ತುಮಕೂರು, ಮೈಸೂರು, ರಾಮನಗರ',
    phRange: '6.0 - 6.8',
    phStatus: 'Slightly Acidic to Neutral / ಸ್ವಲ್ಪ ಆಮ್ಲೀಯ',
    characteristicsEn: 'Good aeration, rapid drainage, prone to nitrogen leaching.',
    organicCarbon: '0.35% (Low - needs organic matter)',
    recommendedCrops: ['Ragi', 'Groundnut', 'Maize', 'Tomato', 'Mulberry', 'Mango'],
    baseNPK: { N: 100, P: 50, K: 50 },
  },
  'black-cotton': {
    id: 'black-cotton',
    nameEn: 'Black Cotton Soil (Regur)',
    nameKn: 'ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು',
    colorDot: '⚫',
    districtsEn: 'Belagavi, Dharwad, Bagalkot, Vijayapura, Ballari, Kalaburagi',
    districtsKn: 'ಬೆಳಗಾವಿ, ಧಾರವಾಡ, ಬಾಗಲಕೋಟೆ, ವಿಜಯಪುರ, ಬಳ್ಳಾರಿ, ಕಲಬುರಗಿ',
    phRange: '7.5 - 8.5',
    phStatus: 'Moderately Alkaline / ಮಧ್ಯಮ ಕ್ಷಾರೀಯ',
    characteristicsEn: 'High moisture retention, rich in Ca & Mg, deep cracking in summer.',
    organicCarbon: '0.45% (Moderate)',
    recommendedCrops: ['Cotton', 'Sugarcane', 'Sunflower', 'Jowar', 'Bengal Gram', 'Chilli'],
    baseNPK: { N: 120, P: 60, K: 40 },
  },
  'clay-loam': {
    id: 'clay-loam',
    nameEn: 'Clay Loam (Alluvial Delta)',
    nameKn: 'ಜೇಡಿ ಮೆಕ್ಕಲು ಮಣ್ಣು',
    colorDot: '🟤',
    districtsEn: 'Mandya, Shivamogga, Davanagere, Raichur canal tracts',
    districtsKn: 'ಮಂಡ್ಯ, ಶಿವಮೊಗ್ಗ, ದಾವಣಗೆರೆ, ರಾಯಚೂರು ನಾಲಾ ಅಚ್ಚುಕಟ್ಟು',
    phRange: '6.5 - 7.5',
    phStatus: 'Optimal Neutral / ಸಮತೋಲಿತ ತಟಸ್ಥ',
    characteristicsEn: 'High natural fertility, excellent nutrient retention.',
    organicCarbon: '0.65% (Good)',
    recommendedCrops: ['Paddy', 'Sugarcane', 'Arecanut', 'Banana', 'Vegetables'],
    baseNPK: { N: 120, P: 50, K: 50 },
  },
  'laterite': {
    id: 'laterite',
    nameEn: 'Laterite Acidic Soil',
    nameKn: 'ಕೆಂಪು ಜಂಬಿಟ್ಟಿಗೆ ಮಣ್ಣು',
    colorDot: '🧱',
    districtsEn: 'Udupi, Dakshina Kannada, Uttara Kannada, Kodagu, Chikkamagaluru',
    districtsKn: 'ಉಡುಪಿ, ದಕ್ಷಿಣ ಕನ್ನಡ, ಉತ್ತರ ಕನ್ನಡ, ಕೊಡಗು, ಚಿಕ್ಕಮಗಳೂರು',
    phRange: '4.8 - 5.5',
    phStatus: 'Acidic / ತೀವ್ರ ಆಮ್ಲೀಯ (Lime needed)',
    characteristicsEn: 'Heavy monsoon leaching, requires periodic agricultural lime.',
    organicCarbon: '0.70% (High)',
    recommendedCrops: ['Arecanut', 'Cashew', 'Coffee', 'Pepper', 'Cardamom', 'Rubber', 'Paddy'],
    baseNPK: { N: 90, P: 60, K: 70 },
  },
  'coastal-alluvial': {
    id: 'coastal-alluvial',
    nameEn: 'Coastal Alluvial Soil',
    nameKn: 'ಕರಾವಳಿ ಮೆಕ್ಕಲು ಮಣ್ಣು',
    colorDot: '🌊',
    districtsEn: 'Coastal belts of Mangaluru, Kundapura, Karwar, Kumta',
    districtsKn: 'ಮಂಗಳೂರು, ಕುಂದಾಪುರ, ಕಾರವಾರ, ಕುಮಟಾ ಕರಾವಳಿ ತೀರ',
    phRange: '5.8 - 6.5',
    phStatus: 'Mildly Acidic / ಸಾಧಾರಣ ಆಮ್ಲೀಯ',
    characteristicsEn: 'Sandy texture, high infiltration, needs organic mulch.',
    organicCarbon: '0.50% (Moderate)',
    recommendedCrops: ['Coconut', 'Paddy', 'Sweet Potato', 'Arecanut', 'Watermelon'],
    baseNPK: { N: 80, P: 40, K: 60 },
  }
};

export const CROP_MULTIPLIERS = {
  Paddy:     { nMul: 1.1, pMul: 1.0, kMul: 1.0, fymPerAcre: 5,  zincKg: 10,  limeNeed: 50, icon: '🌾', kn: 'ಭತ್ತ' },
  Ragi:      { nMul: 0.9, pMul: 0.9, kMul: 0.8, fymPerAcre: 4,  zincKg: 5,   limeNeed: 30, icon: '🌱', kn: 'ರಾಗಿ' },
  Arecanut:  { nMul: 1.3, pMul: 1.2, kMul: 1.5, fymPerAcre: 8,  zincKg: 15,  limeNeed: 100, icon: '🌴', kn: 'ಅಡಿಕೆ' },
  Cotton:    { nMul: 1.2, pMul: 1.1, kMul: 0.9, fymPerAcre: 6,  zincKg: 10,  limeNeed: 0, icon: '☁️', kn: 'ಹತ್ತಿ' },
  Tomato:    { nMul: 1.4, pMul: 1.3, kMul: 1.4, fymPerAcre: 10, zincKg: 8,   limeNeed: 40, icon: '🍅', kn: 'ಟೊಮೆಟೊ' },
  Sugarcane: { nMul: 1.8, pMul: 1.4, kMul: 1.6, fymPerAcre: 12, zincKg: 20,  limeNeed: 60, icon: '🎋', kn: 'ಕಬ್ಬು' },
  Maize:     { nMul: 1.2, pMul: 1.0, kMul: 0.9, fymPerAcre: 5,  zincKg: 10,  limeNeed: 20, icon: '🌽', kn: 'ಜೋಳ' },
  Coconut:   { nMul: 1.0, pMul: 0.8, kMul: 1.6, fymPerAcre: 6,  zincKg: 12,  limeNeed: 50, icon: '🥥', kn: 'ತೆಂಗು' },
};

export default function SoilHealthDoctor({ isModal = false, onClose = () => {} }) {
  const { lang } = useLanguage();
  const { speak, isSpeaking, stopSpeaking } = useVoice();
  
  const [selectedSoil, setSelectedSoil] = useState('red-sandy');
  const [selectedCrop, setSelectedCrop] = useState('Ragi');
  const [acres, setAcres] = useState(2);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef(false);

  const soil = SOIL_PROFILES[selectedSoil] || SOIL_PROFILES['red-sandy'];
  const cropMult = CROP_MULTIPLIERS[selectedCrop] || CROP_MULTIPLIERS['Ragi'];

  // Calculations per total acreage
  // N-P-K in pure nutrients (kg)
  const totalN = Math.round((soil.baseNPK.N * cropMult.nMul * 0.404) * acres);
  const totalP = Math.round((soil.baseNPK.P * cropMult.pMul * 0.404) * acres);
  const totalK = Math.round((soil.baseNPK.K * cropMult.kMul * 0.404) * acres);

  // Conversion to commercial fertilizers:
  const dapKg = Math.round(totalP / 0.46);
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);
  const ureaKg = Math.round(remainingN / 0.46);
  const mopKg = Math.round(totalK / 0.60);

  // Bag units
  const ureaBags = (ureaKg / 45).toFixed(1);
  const dapBags = (dapKg / 50).toFixed(1);
  const mopBags = (mopKg / 50).toFixed(1);

  // Organic amendments
  const fymTonnes = (cropMult.fymPerAcre * acres).toFixed(1);
  const neemCakeKg = Math.round(50 * acres);
  const bioFertilizerPkt = Math.max(2, Math.round(2 * acres));
  const limeKg = selectedSoil === 'laterite' ? Math.round(cropMult.limeNeed * acres) : 0;

  // Bilingual narration
  const narrationEn = `For ${acres} acres of ${selectedCrop} on ${soil.nameEn}: Pure nutrient requirement is Nitrogen ${totalN} kg, Phosphorus ${totalP} kg, and Potash ${totalK} kg. Commercial fertilizer dosage: Apply ${dapKg} kilograms of DAP, ${ureaKg} kilograms of Urea, and ${mopKg} kilograms of MOP Potash. Apply all DAP at sowing, and split Urea into three doses. Incorporate ${fymTonnes} tonnes of farm yard manure and ${neemCakeKg} kilograms of neem cake.`;
  const narrationKn = `${acres} ಎಕರೆ ${cropMult.kn} ಬೆಳೆಗೆ ${soil.nameKn}ದಲ್ಲಿ ನಿವ್ವಳ ಪೋಷಕಾಂಶ ಅಗತ್ಯ: ಸಾರಜನಕ ${totalN} ಕೆಜಿ, ರಂಜಕ ${totalP} ಕೆಜಿ ಮತ್ತು ಪೊಟ್ಯಾಶ್ ${totalK} ಕೆಜಿ. ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ: ${dapKg} ಕೆಜಿ ಡಿಎಪಿ, ${ureaKg} ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು ${mopKg} ಕೆಜಿ ಪೊಟ್ಯಾಶ್ ಹಾಕಿ. ಬಿತ್ತನೆಯ ಸಮಯದಲ್ಲಿ ಪೂರ್ಣ ಡಿಎಪಿ ಹಾಗೂ ಯೂರಿಯಾವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ${fymTonnes} ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಬಳಸಿ.`;

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(lang === 'kn' ? narrationKn : narrationEn);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, 210, 28, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text('GRAMSETU — SOIL HEALTH & NPK ADVISORY CARD', 105, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('times', 'normal');
    doc.text('Government of Karnataka • Department of Agriculture Advisory', 105, 20, { align: 'center' });

    doc.setTextColor(20, 20, 20);
    doc.setFontSize(11);
    doc.setFont('times', 'bold');
    doc.text('1. Farm & Soil Profile', 14, 38);
    
    autoTable(doc, {
      startY: 42,
      theme: 'grid',
      head: [['Field Parameter', 'Configured Value']],
      body: [
        ['Target Crop', `${selectedCrop} (${cropMult.kn})`],
        ['Soil Type', `${soil.nameEn} (${soil.nameKn})`],
        ['Total Cultivation Area', `${acres} Acres (${(acres * 0.404).toFixed(2)} Hectares)`],
        ['Soil pH Range', soil.phRange],
        ['Pure N-P-K Nutrients (kg)', `N: ${totalN} kg | P: ${totalP} kg | K: ${totalK} kg`]
      ],
      headStyles: { fillColor: [22, 101, 52], font: 'times' },
      styles: { font: 'times', fontSize: 10 }
    });

    doc.setFontSize(11);
    doc.text('2. Recommended Commercial Fertilizer Dosage', 14, (doc).lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: (doc).lastAutoTable.finalY + 14,
      theme: 'grid',
      head: [['Fertilizer Grade', 'Quantity (kg)', 'Bags Required', 'Application Schedule']],
      body: [
        ['DAP (18:46:0)', `${dapKg} kg`, `${dapBags} Bags (50kg)`, '100% Basal dose at seed sowing/drilling'],
        ['Urea (46% N)', `${ureaKg} kg`, `${ureaBags} Bags (45kg)`, 'Split into 3 doses: Basal, 30 days, and flowering'],
        ['MOP Potash (60% K2O)', `${mopKg} kg`, `${mopBags} Bags (50kg)`, '50% Basal, 50% at panicle/flowering emergence']
      ],
      headStyles: { fillColor: [30, 64, 175], font: 'times' },
      styles: { font: 'times', fontSize: 10 }
    });

    doc.setFontSize(11);
    doc.text('3. Organic & Bio-Conditioning Advisory', 14, (doc).lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: (doc).lastAutoTable.finalY + 14,
      theme: 'grid',
      head: [['Organic Amendment', 'Dosage', 'Agronomic Function']],
      body: [
        ['Farm Yard Manure (FYM)', `${fymTonnes} Tonnes`, 'Incorporate 2-3 weeks before sowing to boost soil microbiome'],
        ['Neem Cake (ಬೇವಿನ ಹಿಂಡಿ)', `${neemCakeKg} kg`, 'Acts as natural nitrification inhibitor and soil nematode repellent'],
        ['Bio-fertilizers (Azospirillum + PSB)', `${bioFertilizerPkt} Packets (200g)`, 'Atmospheric nitrogen fixation and phosphate solubilization'],
        ...(limeKg > 0 ? [['Agricultural Lime (CaCO3)', `${limeKg} kg`, 'Neutralizes soil acidity in laterite zones']] : [])
      ],
      headStyles: { fillColor: [202, 138, 4], font: 'times' },
      styles: { font: 'times', fontSize: 9 }
    });

    doc.setFontSize(8);
    doc.setFont('times', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')} via GramSetu Agronomic Advisory System. Consult your RSK officer for lab testing.`, 14, 285);

    doc.save(`GramSetu_Soil_Health_Card_${selectedCrop}_${acres}Acres.pdf`);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: isModal ? '0' : '12px 10px 32px' }}>
      
      {/* ── Top Header Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)',
        color: '#fff',
        borderRadius: 16,
        padding: '18px 20px',
        marginBottom: 20,
        boxShadow: '0 8px 24px rgba(22, 101, 52, 0.2)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 14
      }}>
        <div style={{ flex: '1 1 280px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, marginBottom: 8 }}>
            <span>🌱</span> {lang === 'kn' ? 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ & NPK ಸಲಹೆ' : 'SOIL HEALTH & NPK ADVISOR'}
          </div>
          <h1 style={{ fontSize: 'clamp(19px, 4vw, 24px)', fontWeight: 900, margin: '2px 0 6px 0', color: '#ffffff', lineHeight: 1.25 }}>
            {lang === 'kn' ? 'ಮಣ್ಣು ಪರೀಕ್ಷೆ & NPK ರಸಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Precision Soil Health & NPK Calculator'}
          </h1>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.9, lineHeight: 1.4, maxWidth: 600 }}>
            {lang === 'kn'
              ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಮಣ್ಣಿನ ಪ್ರಕಾರ ಮತ್ತು ಬೆಳೆಗಳಿಗೆ ತಕ್ಕಂತೆ ನಿಖರವಾದ ಡಿಎಪಿ, ಯೂರಿಯಾ, ಪೊಟ್ಯಾಶ್ ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರದ ಲೆಕ್ಕಾಚಾರ.'
              : 'Scientifically calibrated N-P-K mineral fertilizer split-dosages & organic conditioning for Karnataka agro-climatic zones.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 'max-content', flexWrap: 'wrap' }}>
          <button
            onClick={handleToggleSpeak}
            style={{
              flex: '1 1 auto',
              background: isSpeaking ? '#ef4444' : 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '9px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸಿ' : 'Stop') : (lang === 'kn' ? 'ಧ್ವನಿ ವಿವರಣೆ' : 'Audio Guide')}</span>
          </button>

          <button
            onClick={handleExportPDF}
            style={{
              flex: '1 1 auto',
              background: '#ffffff',
              color: '#166534',
              border: 'none',
              padding: '9px 16px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              whiteSpace: 'nowrap'
            }}
          >
            <Printer size={16} />
            <span>{lang === 'kn' ? 'ಮಣ್ಣಿನ ಕಾರ್ಡ್ PDF' : 'Download Soil Card'}</span>
          </button>
        </div>
      </div>

      {/* ── Configuration Inputs ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 14,
        marginBottom: 20
      }}>
        
        {/* Step 1: Soil Type */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-light, #e2e8f0)',
          borderRadius: 14,
          padding: '16px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 800, color: 'var(--text-primary, #0f172a)', marginBottom: 10 }}>
            <Layers size={16} color="#16a34a" />
            <span>1. {lang === 'kn' ? 'ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' : 'Select Soil Type'}</span>
          </label>
          <select
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1.5px solid var(--border, #cbd5e1)',
              background: 'var(--bg-card, #ffffff)',
              color: 'var(--text-primary, #0f172a)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {Object.values(SOIL_PROFILES).map((s) => (
              <option key={s.id} value={s.id}>
                {s.colorDot} {lang === 'kn' ? `${s.nameKn} (pH ${s.phRange})` : `${s.nameEn} (pH ${s.phRange})`}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--bg-main, #f8fafc)', borderRadius: 8, fontSize: 11, color: 'var(--text-secondary, #475569)', lineHeight: 1.4 }}>
            <div><strong>pH:</strong> {soil.phRange} ({soil.phStatus})</div>
            <div style={{ marginTop: 2 }}><strong>{lang === 'kn' ? 'ಜಿಲ್ಲೆಗಳು:' : 'Districts:'}</strong> {lang === 'kn' ? soil.districtsKn : soil.districtsEn}</div>
          </div>
        </div>

        {/* Step 2: Crop Selector */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-light, #e2e8f0)',
          borderRadius: 14,
          padding: '16px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 800, color: 'var(--text-primary, #0f172a)', marginBottom: 10 }}>
            <Sprout size={16} color="#16a34a" />
            <span>2. {lang === 'kn' ? 'ಬೆಳೆಯುವ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select Target Crop'}</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {Object.entries(CROP_MULTIPLIERS).map(([cName, info]) => {
              const isSelected = selectedCrop === cName;
              return (
                <button
                  key={cName}
                  type="button"
                  onClick={() => setSelectedCrop(cName)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 10,
                    textAlign: 'center',
                    border: isSelected ? '2px solid #16a34a' : '1px solid var(--border-light, #e2e8f0)',
                    background: isSelected ? '#dcfce7' : 'var(--bg-card, #ffffff)',
                    color: isSelected ? '#15803d' : 'var(--text-primary, #1e293b)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <span style={{ fontSize: 18 }}>{info.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: isSelected ? 800 : 600, lineHeight: 1.2 }}>
                    {lang === 'kn' ? info.kn : cName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Acreage Slider */}
        <div style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border-light, #e2e8f0)',
          borderRadius: 14,
          padding: '16px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 800, color: 'var(--text-primary, #0f172a)' }}>
              <FlaskConical size={16} color="#16a34a" />
              <span>3. {lang === 'kn' ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ' : 'Landholding Size'}</span>
            </label>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: 8 }}>
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
            style={{ width: '100%', accentColor: '#16a34a', cursor: 'pointer', margin: '8px 0' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4, marginTop: 4 }}>
            {[0.5, 1, 2, 3, 5, 10].map((qAcre) => (
              <button
                key={qAcre}
                type="button"
                onClick={() => setAcres(qAcre)}
                style={{
                  flex: 1,
                  padding: '5px 2px',
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  border: '1px solid var(--border, #cbd5e1)',
                  background: acres === qAcre ? '#16a34a' : 'transparent',
                  color: acres === qAcre ? '#fff' : 'var(--text-muted, #64748b)',
                  cursor: 'pointer'
                }}
              >
                {qAcre}ac
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── NPK PURE NUTRIENT REQUIREMENT BAR ── */}
      <div style={{
        background: 'var(--bg-card, #ffffff)',
        border: '1.5px solid #22c55e',
        borderRadius: 16,
        padding: '16px 18px',
        marginBottom: 20,
        boxShadow: '0 4px 16px rgba(34, 197, 94, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 900, color: 'var(--text-primary, #0f172a)', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🧪</span> {lang === 'kn' ? 'ನಿವ್ವಳ N-P-K ಪೋಷಕಾಂಶಗಳ ಅಗತ್ಯ (NPK Ratio)' : 'Pure N-P-K Plant Nutrients Required'}
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--text-secondary, #64748b)' }}>
              {lang === 'kn' ? `${acres} ಎಕರೆ ${cropMult.kn} ಬೆಳೆಗೆ ಅಗತ್ಯವಿರುವ ಸಾರಜನಕ, ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಶ್` : `Target net nutrient values for ${acres} acres of ${selectedCrop}`}
            </p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: 20 }}>
            UAS Package of Practice
          </span>
        </div>

        {/* 3 N-P-K Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {/* N */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
              N · {lang === 'kn' ? 'ಸಾರಜನಕ' : 'Nitrogen'}
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 900, color: '#14532d', margin: '4px 0 2px' }}>
              {totalN} <span style={{ fontSize: 12, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 600 }}>
              {lang === 'kn' ? 'ಎಲೆಗಳ ಸಮೃದ್ಧ ಬೆಳವಣಿಗೆ' : 'Leaf & vegetative vigor'}
            </div>
          </div>

          {/* P */}
          <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
              P · {lang === 'kn' ? 'ರಂಜಕ' : 'Phosphorus'}
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 900, color: '#1e3a8a', margin: '4px 0 2px' }}>
              {totalP} <span style={{ fontSize: 12, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 10, color: '#2563eb', fontWeight: 600 }}>
              {lang === 'kn' ? 'ಬೇರು & ಮೊಗ್ಗುಗಳ ವೃದ್ಧಿ' : 'Root development & flowers'}
            </div>
          </div>

          {/* K */}
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
              K · {lang === 'kn' ? 'ಪೊಟ್ಯಾಶ್' : 'Potassium'}
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 900, color: '#78350f', margin: '4px 0 2px' }}>
              {totalK} <span style={{ fontSize: 12, fontWeight: 600 }}>kg</span>
            </div>
            <div style={{ fontSize: 10, color: '#d97706', fontWeight: 600 }}>
              {lang === 'kn' ? 'ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ & ಕಾಳು' : 'Grain filling & resistance'}
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMERCIAL FERTILIZER DOSAGES (BAGS & KG) ── */}
      <div style={{
        background: 'var(--bg-card, #ffffff)',
        border: '1px solid var(--border-light, #e2e8f0)',
        borderRadius: 16,
        padding: '18px 20px',
        marginBottom: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
      }}>
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary, #0f172a)', margin: 0 }}>
            {lang === 'kn' ? 'ಖರೀದಿಸಬೇಕಾದ ರಸಗೊಬ್ಬರಗಳ ಚೀಲ ಮತ್ತು ಪ್ರಮಾಣ (Commercial Dosages)' : 'Commercial Fertilizer Bag Quantities & Schedule'}
          </h2>
          <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--text-secondary, #64748b)' }}>
            {lang === 'kn' ? 'ನಿಮ್ಮ ಭೂಮಿಗೆ ಎಷ್ಟು ಚೀಲ ಗೊಬ್ಬರ ಬೇಕು ಮತ್ತು ಯಾವಾಗ ಹಾಕಬೇಕು ಎಂಬ ಸಂಪೂರ್ಣ ವಿವರ' : 'Exact bag count and split-application timing for field application'}
          </p>
        </div>

        {/* 3 Fertilizer Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
          marginBottom: 16
        }}>
          {/* DAP */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1.5px solid #93c5fd',
            borderRadius: 12,
            padding: 16
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
                  {lang === 'kn' ? 'ರಂಜಕ ಮತ್ತು ಸಾರಜನಕ' : 'Phosphorus + Nitrogen'}
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 900, color: '#1e3a8a', margin: '2px 0' }}>
                  DAP (18:46:0)
                </h4>
              </div>
              <span style={{ fontSize: 26 }}>🌾</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px' }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#1d4ed8' }}>{dapKg}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1e40af' }}>kg</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', marginLeft: 'auto', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: 6 }}>
                ≈ {dapBags} {lang === 'kn' ? 'ಚೀಲಗಳು (50kg)' : 'Bags (50kg)'}
              </span>
            </div>

            <div style={{ fontSize: 11, color: '#1e40af', marginTop: 8, paddingTop: 6, borderTop: '1px dashed #bfdbfe', lineHeight: 1.4 }}>
              <strong>{lang === 'kn' ? 'ಹಾಕುವ ಸಮಯ:' : 'Application:'}</strong> {lang === 'kn' ? '100% ಬಿತ್ತನೆಯ ಸಮಯದಲ್ಲಿ ಸಾಲಿನಲ್ಲಿ ಹಾಕಿ.' : '100% Basal dose at seed drilling/sowing.'}
            </div>
          </div>

          {/* Urea */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1.5px solid #86efac',
            borderRadius: 12,
            padding: 16
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
                  {lang === 'kn' ? 'ಸಾರಜನಕ ಗೊಬ್ಬರ' : 'Pure Nitrogen (46% N)'}
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 900, color: '#14532d', margin: '2px 0' }}>
                  {lang === 'kn' ? 'ಯೂರಿಯಾ / Urea' : 'Urea (46% N)'}
                </h4>
              </div>
              <span style={{ fontSize: 26 }}>🌱</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px' }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#15803d' }}>{ureaKg}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#166534' }}>kg</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#15803d', marginLeft: 'auto', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: 6 }}>
                ≈ {ureaBags} {lang === 'kn' ? 'ಚೀಲಗಳು (45kg)' : 'Bags (45kg)'}
              </span>
            </div>

            <div style={{ fontSize: 11, color: '#166534', marginTop: 8, paddingTop: 6, borderTop: '1px dashed #bbf7d0', lineHeight: 1.4 }}>
              <strong>{lang === 'kn' ? 'ಹಾಕುವ ಸಮಯ:' : 'Application:'}</strong> {lang === 'kn' ? '3 ಕಂತುಗಳು: ಬಿತ್ತನೆ, 30 ದಿನಕ್ಕೆ ಹಾಗೂ ಹೂವಾಡುವಾಗ.' : 'Split in 3 equal doses: Basal, 30d, and flowering.'}
            </div>
          </div>

          {/* MOP Potash */}
          <div style={{
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '1.5px solid #fde68a',
            borderRadius: 12,
            padding: 16
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  {lang === 'kn' ? 'ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ' : 'Potash (60% K2O)'}
                </span>
                <h4 style={{ fontSize: 16, fontWeight: 900, color: '#78350f', margin: '2px 0' }}>
                  MOP Potash (60%)
                </h4>
              </div>
              <span style={{ fontSize: 26 }}>🛡️</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0 2px' }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#b45309' }}>{mopKg}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#92400e' }}>kg</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#b45309', marginLeft: 'auto', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: 6 }}>
                ≈ {mopBags} {lang === 'kn' ? 'ಚೀಲಗಳು (50kg)' : 'Bags (50kg)'}
              </span>
            </div>

            <div style={{ fontSize: 11, color: '#78350f', marginTop: 8, paddingTop: 6, borderTop: '1px dashed #fde68a', lineHeight: 1.4 }}>
              <strong>{lang === 'kn' ? 'ಹಾಕುವ ಸಮಯ:' : 'Application:'}</strong> {lang === 'kn' ? '50% ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ ಮತ್ತು 50% ತೆನೆ ಬರುವಾಗ.' : '50% Basal and 50% at panicle emergence.'}
            </div>
          </div>
        </div>

        {/* ── Organic & Bio-Conditioning Row ── */}
        <div style={{
          background: 'var(--bg-main, #f8fafc)',
          borderRadius: 12,
          padding: '14px 16px',
          border: '1px solid var(--border-light, #e2e8f0)'
        }}>
          <h4 style={{ fontSize: 13, fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-primary, #0f172a)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Droplets size={15} color="#16a34a" />
            <span>{lang === 'kn' ? 'ಸಾವಯವ ಹಾಗೂ ಜೈವಿಕ ಮಣ್ಣು ಸಂವರ್ಧನೆ (Organic Soil Care)' : 'Organic & Biological Soil Conditioning'}</span>
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
            <div style={{ background: 'var(--bg-card, #fff)', padding: 10, borderRadius: 8, border: '1px solid var(--border-light, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>🐄 {lang === 'kn' ? 'ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ (FYM)' : 'Farm Yard Manure'}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#166534', margin: '2px 0' }}>{fymTonnes} {lang === 'kn' ? 'ಟನ್' : 'Tonnes'}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary, #475569)' }}>{lang === 'kn' ? 'ಬಿತ್ತನೆಗೆ 2 ವಾರ ಮುಂಚೆ ಮಣ್ಣಿಗೆ ಬೆರೆಸಿ' : 'Mix 2 weeks before sowing'}</div>
            </div>

            <div style={{ background: 'var(--bg-card, #fff)', padding: 10, borderRadius: 8, border: '1px solid var(--border-light, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>🌿 {lang === 'kn' ? 'ಬೇವಿನ ಹಿಂಡಿ (Neem Cake)' : 'Neem Cake'}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#166534', margin: '2px 0' }}>{neemCakeKg} kg</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary, #475569)' }}>{lang === 'kn' ? 'ಗೆದ್ದಲು ನಿಯಂತ್ರಣ & ಸಾರಜನಕ ರಕ್ಷಣೆ' : 'Slows N-loss & deters pests'}</div>
            </div>

            <div style={{ background: 'var(--bg-card, #fff)', padding: 10, borderRadius: 8, border: '1px solid var(--border-light, #e2e8f0)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700 }}>🧪 {lang === 'kn' ? 'ಜೈವಿಕ ಗೊಬ್ಬರ (PSB/Azospirillum)' : 'Bio-Fertilizers'}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#166534', margin: '2px 0' }}>{bioFertilizerPkt} {lang === 'kn' ? 'ಪ್ಯಾಕೆಟ್' : 'Packets'}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary, #475569)' }}>{lang === 'kn' ? 'ಬಿತ್ತನೆ ಬೀಜೋಪಚಾರಕ್ಕೆ ಬಳಸಿ' : 'Seed inoculation'}</div>
            </div>

            {limeKg > 0 && (
              <div style={{ background: '#fef2f2', padding: 10, borderRadius: 8, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 11, color: '#b91c1c', fontWeight: 700 }}>⚪ {lang === 'kn' ? 'ಕೃಷಿ ಸುಣ್ಣ (Lime)' : 'Agricultural Lime'}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#dc2626', margin: '2px 0' }}>{limeKg} kg</div>
                <div style={{ fontSize: 10, color: '#991b1b' }}>{lang === 'kn' ? 'ಆಮ್ಲೀಯ ಮಣ್ಣನ್ನು ಸರಿಪಡಿಸಲು' : 'Neutralizes acidity (pH < 5.5)'}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── AI Soil Improvement Advisory ── */}
      <div style={{
        background: 'var(--bg-card, #fff)',
        borderRadius: 16,
        border: '1.5px solid rgba(79,70,229,0.25)',
        overflow: 'hidden'
      }}>
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} color="#fbbf24" />
          <div>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#fff' }}>
              {lang === 'kn' ? 'AI ಮಣ್ಣು ಸುಧಾರಣಾ ವೈಯಕ್ತಿಕ ಸಲಹೆಗಾರ' : 'AI Soil Improvement Advisor'}
            </h4>
            <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.85)' }}>
              Gemini AI · {selectedCrop} & {soil.nameEn}
            </p>
          </div>
        </div>

        <div style={{ padding: '14px 16px' }}>
          {!aiAdvice ? (
            <>
              <p style={{ fontSize: 12, color: 'var(--text-secondary, #475569)', marginBottom: 12, lineHeight: 1.4 }}>
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರ, ಬೆಳೆ ಮತ್ತು ವಿಸ್ತೀರ್ಣಕ್ಕೆ ತಕ್ಕಂತೆ AI ಆಧಾರಿತ ವೈಜ್ಞಾನಿಕ ಮಣ್ಣು ಸಂವರ್ಧನೆ ಸಲಹೆಗಳನ್ನು ತಕ್ಷಣ ಪಡೆಯಿರಿ.'
                  : 'Get AI-powered personalized soil improvement tips based on your exact land size and soil type.'}
              </p>
              <button
                type="button"
                onClick={async () => {
                  if (aiRef.current) return;
                  aiRef.current = true;
                  setAiLoading(true);
                  const prompt = `You are an expert Karnataka soil scientist. Soil type: ${soil.nameEn} (pH: ${soil.phRange}). Crop: ${selectedCrop}. Farm size: ${acres} acres. Fertilizer applied: Urea ${ureaKg}kg, DAP ${dapKg}kg, MOP ${mopKg}kg. FYM: ${fymTonnes} tonnes. Region: ${soil.districtsEn}.
Give 5 specific, actionable soil improvement tips for this farmer that go BEYOND basic NPK.
Format as JSON: {"tips":[{"title":"...","detail":"...","icon":"🌱|💧|🔬|📅|🏗️"}]}. Return ONLY the JSON object.`;
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
                        { title: lang === 'kn' ? 'ತಿಂಗಳಿಗೊಮ್ಮೆ ಜೀವಾಮೃತ ಬಳಸಿ' : 'Add Jeevamrutha monthly', detail: lang === 'kn' ? '10 ಕೆಜಿ ಹಸುವಿನ ಸಗಣಿ + 10 ಲೀಟರ್ ಗಂಜಲ + 2 ಕೆಜಿ ಬೆಲ್ಲ + 2 ಕೆಜಿ ದ್ವಿದಳ ಧಾನ್ಯದ ಹಿಟ್ಟನ್ನು 200 ಲೀಟರ್ ನೀರಿನಲ್ಲಿ 48 ಗಂಟೆ ನೆನೆಸಿ ಬೇರುಗಳಿಗೆ ಹಾಕಿ.' : 'Mix 10kg desi cow dung + 10L cow urine + 2kg jaggery + 2kg pulse flour in 200L water. Ferment 48hrs and apply to root zone.', icon: '🌱' },
                        { title: lang === 'kn' ? 'ಬೆಳೆ ಕಟಾವಿನ ನಂತರ ಹೊದಿಕೆ (Mulching)' : 'Mulch with crop residue', detail: lang === 'kn' ? 'ಕಟಾವಿನ ನಂತರ ತ್ಯಾಜ್ಯವನ್ನು ಮಣ್ಣಿನ ಮೇಲೆ ಹರಡುವುದರಿಂದ ತೇವಾಂಶ ಉಳಿಯುತ್ತದೆ ಮತ್ತು ಸಾವಯವ ಇಂಗಾಲ ಹೆಚ್ಚುತ್ತದೆ.' : 'Spread crop residue 3-4 inches thick to reduce evaporation and add organic carbon over time.', icon: '💧' },
                        { title: lang === 'kn' ? 'ಸಣಬು / ಡೈಂಚ ಹಸಿರೆಲೆ ಗೊಬ್ಬರ' : 'Green manure with Sunnhemp', detail: lang === 'kn' ? 'ಮುಖ್ಯ ಬೆಳೆಗೆ 45 ದಿನ ಮುಂಚೆ ಸಣಬು ಬಿತ್ತಿ ಮಣ್ಣಿಗೆ ಉಳುಮೆ ಮಾಡುವುದರಿಂದ ಪ್ರತಿ ಎಕರೆಗೆ 25-30 ಕೆಜಿ ನೈಸರ್ಗಿಕ ಸಾರಜನಕ ಲಭಿಸುತ್ತದೆ.' : 'Grow Sunnhemp for 45 days before main crop. Plough under to add 25-30kg natural N/acre.', icon: '🔬' },
                        { title: lang === 'kn' ? 'ಮಳೆಯ ನಂತರ ಯೂರಿಯಾ ವಿತರಣೆ' : 'Time fertilizer with moisture', detail: lang === 'kn' ? 'ಮಳೆ ಬಂದ 2 ದಿನಗಳ ನಂತರ ಮಣ್ಣು ಹದವಾಗಿರುವಾಗ ಯೂರಿಯಾ ಹಾಕಿದರೆ ಪೋಷಕಾಂಶಗಳು ಪೂರ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ಹೀರಿಕೊಳ್ಳುತ್ತವೆ.' : 'Apply Urea splits 2 days after rain when soil is moist but not waterlogged for maximum uptake.', icon: '📅' },
                        { title: lang === 'kn' ? 'ಎರೆಹುಳು ಸಂವರ್ಧನೆ' : 'Build earthworm population', detail: lang === 'kn' ? 'ಅತಿಯಾದ ರಾಸಾಯನಿಕ ಕ್ರಿಮಿನಾಶಕ ತಪ್ಪಿಸಿ. ನೆರಳಿರುವ ಸ್ಥಳಗಳಲ್ಲಿ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಹಾಕಿ ಎರೆಹುಳುಗಳನ್ನು ಆಕರ್ಷಿಸಿ.' : 'Avoid excess chemical pesticides. Apply compost in shaded zones to attract natural earthworms.', icon: '🏗️' }
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
                  padding: '9px 18px', fontSize: 12, fontWeight: 700,
                  cursor: aiLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  opacity: aiLoading ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(79,70,229,0.25)'
                }}
              >
                {aiLoading
                  ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> {lang === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating advice...'}</>
                  : <><Sparkles size={14} /> {lang === 'kn' ? 'AI ಮಣ್ಣಿನ ಸಲಹೆ ಪಡೆಯಿರಿ' : 'Get AI Soil Tips'}</>
                }
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary, #0f172a)', margin: 0 }}>
                  🧪 {lang === 'kn' ? `${cropMult.kn} ಬೆಳೆಗೆ AI ಮಣ್ಣು ಸಲಹೆಗಳು:` : `AI Soil Tips for ${selectedCrop}:`}
                </p>
                <button
                  type="button"
                  onClick={() => setAiAdvice(null)}
                  style={{ fontSize: 11, color: '#4f46e5', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ↻ {lang === 'kn' ? 'ಮತ್ತೆ ಪಡೆಯಿರಿ' : 'Refresh'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {aiAdvice.tips.map((tip, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-main, #f8fafc)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--border-light, #e2e8f0)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1 }}>{tip.icon}</span>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary, #0f172a)', margin: '0 0 2px 0' }}>{tip.title}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-secondary, #475569)', margin: 0, lineHeight: 1.4 }}>{tip.detail}</p>
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
