import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, ShieldCheck, Volume2, Info, Scan, Leaf, AlertCircle, Microscope, Droplets, FlaskConical, Sprout, ChevronRight, Upload, MessageCircle, Send, ImagePlus, ChevronsDown, Loader2, TriangleAlert, CircleCheck, ScanLine, Image, Crop, Layers, Bot, Pill, Building2, ListChecks, RefreshCw, ArrowRight, Wheat, Zap, Lightbulb, ExternalLink, ShoppingBag, Languages, Tag, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { callGemini, callGeminiVision, callGeminiTranslate } from '../utils/voiceCommands';
import { useNavigate } from 'react-router-dom';
import { CROP_DISEASES, UNIQUE_CROPS, demoCards as DEMO_CARDS_DATA, getAgriProductLink, getLocalizedCropName } from '../data/cropDiseasesData';

const SEVERITY_CONFIG = {
  High:   { bg: '#fee2e2', text: '#b91c1c', label: '⚠️ High Severity' },
  Medium: { bg: '#fef9c3', text: '#854d0e', label: '⚡ Medium Severity' },
  Low:    { bg: '#dcfce7', text: '#14532d', label: '✅ Low Severity' },
};


export default function CropScanner() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useVoice();

  // ── Page flow: 'home' | 'scanner' | 'result' | 'qa' ──
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
  const [translatedPrevention, setTranslatedPrevention] = useState(null);
  const [translatedOrganicTip, setTranslatedOrganicTip] = useState(null);
  const [translatedFertilizer, setTranslatedFertilizer] = useState(null);
  const [translatedKeyTakeaways, setTranslatedKeyTakeaways] = useState(null);
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
  // Pinch-to-zoom state
  const lastPinchDist = useRef(null);

  useEffect(() => {
    if (page !== 'scanner') return;
    let activeStream = null;
    const startCamera = async () => {
      try {
        // Request HD camera with environment facing mode for rear camera
        const constraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          }
        };
        const s = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = s; setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          // Wait for video to be fully playing before allowing scan
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(() => {});
          };
        }
      } catch {
        try {
          const fb = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } });
          activeStream = fb; setStream(fb);
          if (videoRef.current) {
            videoRef.current.srcObject = fb;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(() => {});
            };
          }
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
  const matchAiToDatabase = (cropName, diseaseName, userSelectedCrop = null) => {
    // If AUTO_DETECT or not specified, use AI identified crop
    const effectiveCrop = (userSelectedCrop && userSelectedCrop !== 'NO_CROP' && userSelectedCrop !== 'AUTO_DETECT')
      ? userSelectedCrop
      : (cropName || userSelectedCrop);
    if (!effectiveCrop) return null;
    const cLower = effectiveCrop.toLowerCase();
    const dLower = (diseaseName || '').toLowerCase();

    // Map AI crop names → our DB crop keys
    const cropKeywords = [
      { keys: ['paddy', 'rice', 'ಭತ್ತ', 'धान', 'चावल'],               db: 'Paddy / Rice (ಭತ್ತ / धान)' },
      { keys: ['ragi', 'finger millet', 'ರಾಗಿ', 'रागी', 'मडुआ'],       db: 'Ragi / Finger Millet (ರಾಗಿ / मडुआ)' },
      { keys: ['maize', 'corn', 'ಮೆಕ್ಕೆಜೋಳ', 'मक्का', 'भुट्टा'],       db: 'Maize / Corn (ಮೆಕ್ಕೆಜೋಳ / मक्का)' },
      { keys: ['wheat', 'ಗೋಧಿ', 'गेहूं'],                              db: 'Wheat (ಗೋಧಿ / गेहूं)' },
      { keys: ['jowar', 'sorghum', 'ಜೋಳ', 'ज्वार'],                    db: 'Jowar / Sorghum (ಜೋಳ / ज्वार)' },
      { keys: ['cotton', 'ಹತ್ತಿ', 'कपास'],                            db: 'Cotton (ಹತ್ತಿ / कपास)' },
      { keys: ['sugarcane', 'ಕಬ್ಬು', 'गन्ना'],                         db: 'Sugarcane (ಕಬ್ಬು / गन्ना)' },
      { keys: ['coconut', 'ತೆಂಗು', 'ತೆಂಗಿನಕಾಯಿ', 'नारियल'],             db: 'Coconut (ತೆಂಗು / नारियल)' },
      { keys: ['arecanut', 'areca', 'ಅಡಿಕೆ', 'सुपारी'],                 db: 'Arecanut (ಅಡಿಕೆ / सुपारी)' },
      { keys: ['coffee', 'ಕಾಫಿ', 'कॉफी'],                             db: 'Coffee (ಕಾಫಿ / कॉफी)' },
      { keys: ['pepper', 'black pepper', 'ಮೆಣಸು', 'ಕರಿಮೆಣಸು', 'काली मिर्च'], db: 'Black Pepper (ಕರಿಮೆಣಸು / काली मिर्च)' },
      { keys: ['tomato', 'ಟೊಮೇಟೊ', 'ಟೊಮೆಟೊ', 'टमाटर'],                  db: 'Tomato (ಟೊಮೇಟೊ / टमाटर)' },
      { keys: ['potato', 'ಆಲೂ', 'ಆಲೂಗಡ್ಡೆ', 'आलू'],                   db: 'Potato (ಆಲೂಗಡ್ಡೆ / आलू)' },
      { keys: ['onion', 'ಈರುಳ್ಳಿ', 'प्याज'],                            db: 'Onion (ಈರುಳ್ಳಿ / प्याज)' },
      { keys: ['chilli', 'chili', 'ಮೆಣಸಿನಕಾಯಿ', 'मिर्च'],             db: 'Chilli (ಮೆಣಸಿನಕಾಯಿ / मिर्च)' },
      { keys: ['brinjal', 'eggplant', 'aubergine', 'ಬದನೆ', 'ಬದನೆಕಾಯಿ', 'बैंगन'], db: 'Brinjal / Eggplant (ಬದನೆಕಾಯಿ / बैंगन)' },
      { keys: ['banana', 'ಬಾಳೆ', 'ಬಾಳೆಹಣ್ಣು', 'केला'],                 db: 'Banana (ಬಾಳೆ / केला)' },
      { keys: ['mango', 'ಮಾವು', 'ಮಾವಿನಕಾಯಿ', 'आम'],                    db: 'Mango (ಮಾವು / आम)' },
      { keys: ['pomegranate', 'ದಾಳಿಂಬೆ', 'अनार'],                      db: 'Pomegranate (ದಾಳಿಂಬೆ / अनार)' },
      { keys: ['groundnut', 'peanut', 'ಕಡಲೆಕಾಯಿ', 'मूंगफली'],          db: 'Groundnut (ಕಡಲೆಕಾಯಿ / मूंगफली)' },
      { keys: ['sunflower', 'ಸೂರ್ಯಕಾಂತಿ', 'सूरजमुखी'],                 db: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ / सूरजमुखी)' },
      { keys: ['soybean', 'soya', 'ಸೋಯಾ', 'ಸೋಯಾಬೀನ್', 'सोयाबीन'],      db: 'Soybean (ಸೋಯಾಬೀನ್ / सोयाबीन)' },
      { keys: ['chickpea', 'bengal gram', 'ಕಡಲೆ', 'चना'],            db: 'Chickpea / Bengal Gram (ಕಡಲೆ / चना)' },
      { keys: ['mung', 'green gram', 'ಹೆಸರು', 'ಹೆಸರುಕಾಳು', 'मूंग'],   db: 'Mung Bean / Green Gram (ಹೆಸರುಕಾಳು / मूंग)' },
      { keys: ['ginger', 'shunti', 'ಶುಂಠಿ', 'अदरक'],                  db: 'Ginger (ಶುಂಠಿ / अदरक)' },
      { keys: ['turmeric', 'arishina', 'ಅರಿಶಿನ', 'हल्दी'],             db: 'Turmeric (ಅರಿಶಿನ / हल्दी)' },
      { keys: ['cardamom', 'elakki', 'ಏಲಕ್ಕಿ', 'इलायची'],             db: 'Cardamom (ಏಲಕ್ಕಿ / इलायची)' },
      { keys: ['papaya', 'pappayi', 'ಪಪ್ಪಾಯಿ', 'पपीता'],               db: 'Papaya (ಪಪ್ಪಾಯಿ / पपीता)' },
    ];

    let matchedCropName = null;
    for (const { keys, db } of cropKeywords) {
      if (keys.some(k => cLower.includes(k.toLowerCase()))) { matchedCropName = db; break; }
    }

    // If user's selected crop didn't match, check AI cropName directly
    if (!matchedCropName && cropName) {
      const aiCropLower = cropName.toLowerCase();
      for (const { keys, db } of cropKeywords) {
        if (keys.some(k => aiCropLower.includes(k.toLowerCase()))) { matchedCropName = db; break; }
      }
    }

    if (!matchedCropName) return null;

    const cropMatches = CROP_DISEASES.filter(d => d.crop === matchedCropName);
    if (!cropMatches.length) return null;

    // Try to match disease name
    if (dLower && !dLower.includes('healthy') && !dLower.includes('no disease')) {
      const diseaseKeywords = [
        ['blast', 'blast'],
        ['brown plant hopper', 'brown plant hopper'],
        ['planthopper', 'brown plant hopper'],
        ['sheath blight', 'sheath blight'],
        ['head smut', 'head smut'],
        ['fall armyworm', 'fall armyworm'],
        ['armyworm', 'fall armyworm'],
        ['northern leaf blight', 'northern leaf blight'],
        ['pink bollworm', 'pink bollworm'],
        ['bollworm', 'pink bollworm'],
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
        ['white stem borer', 'stem borer'],
        ['stem borer', 'stem borer'],
        ['leaf rust', 'leaf rust'],
        ['yellow rust', 'yellow rust'],
        ['stripe rust', 'stripe rust'],
        ['rust', 'rust'],
        ['fusarium wilt', 'fusarium wilt'],
        ['panama wilt', 'panama wilt'],
        ['wilt', 'wilt'],
        ['sigatoka', 'sigatoka'],
        ['anthracnose', 'anthracnose'],
        ['mango hoppers', 'mango hoppers'],
        ['hoppers', 'hoppers'],
        ['early leaf spot', 'early leaf spot'],
        ['leaf spot', 'leaf spot'],
        ['downy mildew', 'downy mildew'],
        ['mildew', 'downy mildew'],
        ['yellow mosaic', 'yellow mosaic'],
        ['mosaic', 'mosaic'],
        ['grain mold', 'grain mold'],
        ['mold', 'grain mold'],
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
    // Ensure video has actual content loaded
    if (!video.srcObject || video.readyState < 2 || video.videoWidth === 0) return null;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
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
        const visionData = await callGeminiVision(base64Frame, 'image/jpeg', selectedCrop);

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
          // AI says this is NOT a crop image (e.g. face, room, non-plant object)
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '🌿 ಇದು ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ! ಮುಖ, ಸೆಲ್ಫಿ, ಕೊಠಡಿ ಅಥವಾ ಬೆಳೆಯಲ್ಲದ ವಸ್ತುಗಳು ಪತ್ತೆಯಾಗಿವೆ. ದಯವಿಟ್ಟು ರೋಗ ಪೀಡಿತ ಬೆಳೆಯ ಎಲೆ, ಕಾಂಡ, ಹಣ್ಣು ಅಥವಾ ಮಾರ್ಗದರ್ಶಿ ಚಾರ್ಟ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.'
            : '🌿 Not a crop image! The AI detected that this is not an agricultural crop (e.g. human face, indoor room, or everyday object). Please point the camera at a diseased crop leaf, fruit, or disease chart.');
          return;
        } else {
          // AI identified a crop — match to our database
          const matched = matchAiToDatabase(visionData.cropName, visionData.diseaseName, selectedCrop);
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
        setResult(finalResult); setActiveTab('remedy');
        setTranslatedRemedy(null); setTranslatedPrevention(null); setTranslatedOrganicTip(null); setTranslatedFertilizer(null); setTranslatedKeyTakeaways(null);
        if (lang === 'kn') {
          setIsTranslating(true);
          Promise.all([
            finalResult.remedy     ? callGeminiTranslate(finalResult.remedy, 'kn')     : Promise.resolve(null),
            finalResult.prevention ? callGeminiTranslate(finalResult.prevention, 'kn') : Promise.resolve(null),
            finalResult.organicTip ? callGeminiTranslate(finalResult.organicTip, 'kn') : Promise.resolve(null),
            finalResult.fertilizer ? callGeminiTranslate(finalResult.fertilizer, 'kn') : Promise.resolve(null),
            finalResult.keyTakeaways?.length ? callGeminiTranslate(finalResult.keyTakeaways.join(' | '), 'kn') : Promise.resolve(null),
          ]).then(([r, p, o, f, k]) => {
            if (r) setTranslatedRemedy(r);
            if (p) setTranslatedPrevention(p);
            if (o) setTranslatedOrganicTip(o);
            if (f) setTranslatedFertilizer(f);
            if (k) setTranslatedKeyTakeaways(k.split(' | '));
            setIsTranslating(false);
          });
        }
      } else {
        setResult('NO_CROP');
      }
      setPage('result');
    } catch (err) {
      clearInterval(interval);
      setScanProgress(0);
      setScanning(false); setScanPhase('idle');
      console.error('Scan error:', err);
      setNotCropMsg(lang === 'kn'
        ? '⚠️ ವಿಶ್ಲೇಷಣೆ ವಿಫಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
        : '⚠️ Analysis failed. Please try again.');
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
        const visionData = await callGeminiVision(base64, mimeType, selectedCrop);

        if (visionData === null) {
          // AI timed out — cannot guess disease without AI, show retry message
          clearInterval(interval);
          setScanProgress(0);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '📡 AI ಸ್ಲೋ ನೆಟ್‌ವರ್ಕ್ ಅಥವಾ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
            : '📡 AI could not analyze your image (slow internet). Please try again.');
          return;
        } else if (!visionData.isCrop) {
          clearInterval(interval);
          setScanProgress(100);
          setScanning(false); setScanPhase('idle');
          setNotCropMsg(lang === 'kn'
            ? '🌿 ಇದು ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ! ಮುಖ, ಸೆಲ್ಫಿ, ಕೊಠಡಿ ಅಥವಾ ಬೆಳೆಯಲ್ಲದ ವಸ್ತುಗಳು ಪತ್ತೆಯಾಗಿವೆ. ದಯವಿಟ್ಟು ರೋಗ ಪೀಡಿತ ಬೆಳೆಯ ಎಲೆ, ಹಣ್ಣು ಅಥವಾ ಮಾರ್ಗದರ್ಶಿ ಚಾರ್ಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'
            : '🌿 Not a crop image! The AI detected that this is not an agricultural crop (e.g. human face, indoor room, or everyday object). Please upload a diseased crop photo or disease guide chart.');
          return;
        } else {
          const matched = matchAiToDatabase(visionData.cropName, visionData.diseaseName, selectedCrop);
          finalResult = matched;
        }
      }

      clearInterval(interval);
      setScanProgress(100);
      await new Promise(r => setTimeout(r, 400));
      setScanning(false); setScanPhase('done');

      if (finalResult) {
        setResult(finalResult); setActiveTab('remedy');
        setTranslatedRemedy(null); setTranslatedPrevention(null); setTranslatedOrganicTip(null); setTranslatedFertilizer(null); setTranslatedKeyTakeaways(null);
        if (lang === 'kn') {
          setIsTranslating(true);
          Promise.all([
            finalResult.remedy     ? callGeminiTranslate(finalResult.remedy, 'kn')     : Promise.resolve(null),
            finalResult.prevention ? callGeminiTranslate(finalResult.prevention, 'kn') : Promise.resolve(null),
            finalResult.organicTip ? callGeminiTranslate(finalResult.organicTip, 'kn') : Promise.resolve(null),
            finalResult.fertilizer ? callGeminiTranslate(finalResult.fertilizer, 'kn') : Promise.resolve(null),
            finalResult.keyTakeaways?.length ? callGeminiTranslate(finalResult.keyTakeaways.join(' | '), 'kn') : Promise.resolve(null),
          ]).then(([r, p, o, f, k]) => {
            if (r) setTranslatedRemedy(r);
            if (p) setTranslatedPrevention(p);
            if (o) setTranslatedOrganicTip(o);
            if (f) setTranslatedFertilizer(f);
            if (k) setTranslatedKeyTakeaways(k.split(' | '));
            setIsTranslating(false);
          });
        }
      } else {
        setResult('NO_CROP');
      }
      setPage('result');
    } catch (err) {
      clearInterval(interval);
      setScanProgress(0);
      setScanning(false); setScanPhase('idle');
      console.error('Image scan error:', err);
      setNotCropMsg(lang === 'kn'
        ? '⚠️ ವಿಶ್ಲೇಷಣೆ ವಿಫಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
        : '⚠️ Analysis failed. Please try again.');
    }
  };

  const handleReset = () => {
    stopSpeaking(); setResult(null); setScanPhase('idle'); setScanProgress(0);
    setUploadedImage(null); setScanMode('camera'); setQaChat([]); setQaInput('');
    setPan({ x: 0, y: 0 }); currentPan.current = { x: 0, y: 0 };
    setNotCropMsg(null); setTranslatedRemedy(null); setTranslatedPrevention(null); setTranslatedOrganicTip(null); setTranslatedFertilizer(null); setTranslatedKeyTakeaways(null); setIsTranslating(false);
    setZoomLevel(1);
    setPage('home');
  };

  const toggleVoice = () => {
    if (!result || result === 'NO_CROP') return;
    if (isSpeaking) { stopSpeaking(); return; }

    const effectiveLang = lang;
    let text = '';

    if (effectiveLang === 'kn') {
      const diseasePart = result.diseaseKn || result.disease;
      const remedyPart = result.remedyKn || translatedRemedy || result.remedy;
      text = `ರೋಗ: ${diseasePart}. ಬೆಳೆ: ${result.cropKn || result.crop}. ಪರಿಹಾರ: ${remedyPart}. ${result.scheme ? `ಅರ್ಹ ಯೋಜನೆ: ${result.scheme}` : 'ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ ಅಥವಾ KVK ಸಂಪರ್ಕಿಸಿ.'}`;
    } else if (effectiveLang === 'hi') {
      const diseasePart = result.diseaseHi || result.disease;
      const remedyPart = result.remedyHi || result.remedy;
      text = `रोग: ${diseasePart}. फसल: ${result.cropHi || result.crop}. उपचार: ${remedyPart}. ${result.scheme ? `योजना: ${result.scheme}` : 'कोई विशिष्ट सरकारी योजना नहीं है। स्थानीय कृषि विज्ञान केंद्र से संपर्क करें।'}`;
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
    const demoCards = DEMO_CARDS_DATA.map(d => ({
      ...d,
      icon: d.crop.includes('Rice') || d.crop.includes('Paddy')
        ? <Wheat size={13} color="#fff" />
        : <Sprout size={13} color="#fff" />
    }));

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
          position: 'relative', zIndex: 1
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
              <option value="AUTO_DETECT" style={{ color: '#15803d', fontWeight: 800, background: '#f0fdf4' }}>
                {lang === 'kn' ? '✨ ಸ್ವಯಂ ಪತ್ತೆ (ಎಲ್ಲಾ 30+ ಬೆಳೆಗಳು & ಚಾರ್ಟ್‌ಗಳು)' : '✨ Auto-Detect (All 30+ Crops & Charts)'}
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
                      {d.icon} {getLocalizedCropName(d.crop, lang)}
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
                      {lang === 'kn' ? (d.diseaseKn || d.disease) : lang === 'hi' ? (d.diseaseHi || d.disease) : d.disease}
                    </div>
                    <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 600, marginBottom: 8 }}>
                      {lang === 'kn' || lang === 'hi' ? d.disease : (d.diseaseKn || d.diseaseHi || '')}
                    </div>

                    <div style={{ fontSize: 11, color: '#334155', background: '#f0f7f3', borderRadius: 8, padding: '8px 10px', border: '1px solid #d1e8db', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      <Pill size={13} color="#1a7c4a" style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <span style={{ fontWeight: 800, color: '#1a7c4a' }}>
                          {lang === 'kn' ? 'ಪರಿಹಾರ: ' : lang === 'hi' ? 'उपचार: ' : 'Treatment: '}
                        </span>
                        {lang === 'kn'
                          ? (d.remedyKn || d.remedy).slice(0, 52)
                          : lang === 'hi'
                          ? (d.remedyHi || d.remedy).slice(0, 52)
                          : d.remedy.slice(0, 52)}…
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

    // Handle pinch-to-zoom via touch events on camera area
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (lastPinchDist.current) {
          const delta = dist - lastPinchDist.current;
          setZoomLevel(z => Math.min(Math.max(z + delta * 0.01, 1), 5));
        }
        lastPinchDist.current = dist;
      }
    };
    const handleTouchEnd = () => { lastPinchDist.current = null; };

    return (
      <div style={{ width: '100%', minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', fontFamily: "'Inter',sans-serif", overflow: 'hidden', userSelect: 'none' }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827', borderBottom: '1px solid #1f2937', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setPage('home')} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>← Back</button>
            <div style={{ background: 'rgba(34,197,94,0.2)', borderRadius: 10, padding: '5px 10px', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Microscope size={13} color="#22c55e" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>
                {selectedCrop === 'AUTO_DETECT'
                  ? '✨ Auto-Detect'
                  : `${CROP_DISEASES.find(d => d.crop === selectedCrop)?.emoji || '🌿'} ${selectedCrop.split('/')[0].trim()}`}
              </span>
            </div>
          </div>
          {stream && !cameraError && <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} /><span style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}>LIVE</span></div>}
        </div>

        {/* Mode toggle */}
        {!scanning && (
          <div style={{ position: 'relative', zIndex: 1, padding: '8px 14px', background: '#111827' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => { setScanMode('camera'); setUploadedImage(null); }} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: scanMode === 'camera' ? 'rgba(34,197,94,0.92)' : 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Camera size={14} />{lang === 'kn' ? 'ಲೈವ್ ಕ್ಯಾಮರಾ' : 'Live Camera'}
              </button>
              <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: scanMode === 'image' ? 'rgba(34,197,94,0.92)' : 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Image size={14} />{uploadedImage ? '✓ Photo loaded' : (lang === 'kn' ? 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್' : 'Upload Photo')}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </div>
          </div>
        )}

        {/* Camera / Image area — fixed compact height so Scan button is always visible */}
        <div
          style={{ position: 'relative', overflow: 'hidden', background: '#000', height: '42vh', flexShrink: 0 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
            /* Clipping wrapper — zoom scales only the video feed, not the container */
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: scanning ? 'brightness(0.6) saturate(1.2)' : 'brightness(1)',
                  transition: 'filter 0.3s',
                  transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : 'none',
                  transformOrigin: 'center center',
                }}
              />
            </div>
          )}

          {/* AR scanning box — Large, near full screen */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4%' }}>
            <div style={{ position: 'relative', width: '100%', height: '90%', border: `2.5px solid ${scanning ? '#22c55e' : 'rgba(255,255,255,0.5)'}`, borderRadius: 20, boxShadow: scanning ? '0 0 60px rgba(34,197,94,0.2) inset' : 'none', overflow: 'hidden' }}>
              {/* Corner markers */}
              {['tl','tr','bl','br'].map(c => (<div key={c} style={{ position: 'absolute', ...(c.includes('t') ? {top:-2} : {bottom:-2}), ...(c.includes('l') ? {left:-2} : {right:-2}), width: 32, height: 32, borderTop: c.includes('t') ? '4px solid #22c55e' : 'none', borderBottom: c.includes('b') ? '4px solid #22c55e' : 'none', borderLeft: c.includes('l') ? '4px solid #22c55e' : 'none', borderRight: c.includes('r') ? '4px solid #22c55e' : 'none', borderTopLeftRadius: c==='tl'?16:0, borderTopRightRadius: c==='tr'?16:0, borderBottomLeftRadius: c==='bl'?16:0, borderBottomRightRadius: c==='br'?16:0 }} />))}
              {/* Scanning line animation */}
              {scanning && <div style={{ position: 'absolute', left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#22c55e,transparent)', boxShadow: '0 0 24px 8px rgba(34,197,94,0.6)', animation: 'arScan 1.8s infinite ease-in-out' }} />}
              {scanning && <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '4px 16px', borderRadius: 20, color: '#22c55e', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', backdropFilter: 'blur(6px)' }}>AI {lang === 'kn' ? 'ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ' : 'ANALYZING'} {scanProgress}%</div>}
            </div>
          </div>

          {/* Pinch hint for mobile */}
          {!scanning && scanMode === 'camera' && (
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.65)', padding: '4px 14px', borderRadius: 20, color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 600, backdropFilter: 'blur(8px)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
              🤏 {lang === 'kn' ? 'ಜೂಮ್ ಮಾಡಲು ಪಿಂಚ್ ಮಾಡಿ' : 'Pinch to zoom'}
            </div>
          )}

          {/* Zoom level badge */}
          {!scanning && zoomLevel !== 1 && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(34,197,94,0.85)', padding: '4px 10px', borderRadius: 20, color: '#fff', fontSize: 11, fontWeight: 800, backdropFilter: 'blur(6px)' }}>
              {zoomLevel.toFixed(1)}×
            </div>
          )}

          {/* Manual zoom buttons (always visible on camera mode) */}
          {!scanning && (
            <div style={{ position: 'absolute', right: 12, bottom: 90, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button onClick={() => setZoomLevel(z => Math.min(z + 0.5, 5))} style={{ width: 44, height: 44, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.9)', fontSize: 22, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.35)', color: '#1a2e1f' }}>+</button>
              <button onClick={() => setZoomLevel(z => Math.max(z - 0.5, 1))} style={{ width: 44, height: 44, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.9)', fontSize: 22, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.35)', color: '#1a2e1f' }}>−</button>
              {zoomLevel > 1 && <button onClick={() => { setZoomLevel(1); setPan({x:0,y:0}); currentPan.current={x:0,y:0}; }} style={{ width: 44, height: 20, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: 800, cursor: 'pointer', color: '#374151' }}>RESET</button>}
            </div>
          )}

          {!scanning && !uploadedImage && <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', padding: '6px 16px', borderRadius: 20, color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600, backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}>📷 {lang === 'kn' ? 'ಬೆಳೆಯ ಎಲೆ ಚೌಕಟ್ಟಿನಲ್ಲಿ ಇರಿಸಿ' : 'Place crop leaf in the frame'}</div>}
          {scanning && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 }}><div style={{ height: '100%', width: `${scanProgress}%`, background: 'linear-gradient(90deg,#16a34a,#22c55e)', transition: 'width 0.15s ease' }} /></div>}
        </div>

        {/* Not-a-crop error banner */}
        {notCropMsg && (
          <div style={{
            position: 'fixed',
            top: 75,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: 500,
            background: '#dc2626',
            color: '#fff',
            borderRadius: 14,
            padding: '14px 16px',
            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 99999,
            border: '1.5px solid #f87171',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 800, color: '#fff' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ / Not a Crop Image' : 'Not a Crop Image'}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: '#fef2f2', lineHeight: 1.4 }}>
                {lang === 'kn'
                  ? 'ದಯವಿಟ್ಟು ಬೆಳೆ ಎಲೆ, ಕಾಂಡ ಅಥವಾ ಹಣ್ಣಿನ ಚಿತ್ರ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. ಮುದ್ರಿತ ಚಿತ್ರಗಳನ್ನು ಸಹ ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು.'
                  : notCropMsg}
              </p>
            </div>
            <button
              onClick={() => setNotCropMsg(null)}
              style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 800, flexShrink: 0 }}
            >✕</button>
          </div>
        )}

        {/* Scan button panel */}
        <div style={{ background: '#ffffff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: '14px 20px 24px', boxShadow: '0 -10px 40px rgba(0,0,0,0.18)', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, background: '#cbd5e1', borderRadius: 4, margin: '0 auto 12px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 22 }}>
              {selectedCrop === 'AUTO_DETECT' ? '✨' : (CROP_DISEASES.find(d => d.crop === selectedCrop)?.emoji || '🌿')}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: '#64748b', fontWeight: 600 }}>{lang === 'kn' ? 'ಆಯ್ಕೆಯಾದ ಬೆಳೆ' : 'Scanning crop'}</p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                {selectedCrop === 'AUTO_DETECT'
                  ? (lang === 'kn' ? '✨ ಸ್ವಯಂ ಪತ್ತೆ (ಎಲ್ಲಾ ಬೆಳೆಗಳು)' : '✨ Auto-Detect (All Crops)')
                  : selectedCrop}
              </p>
            </div>
            <button onClick={() => setPage('home')} style={{ marginLeft: 'auto', background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 700, color: '#475569', cursor: 'pointer' }}>Change</button>
          </div>
          <button
            onClick={scanMode === 'image' && uploadedImage ? handleImageScan : handleScan}
            disabled={scanning}
            style={{ width: '100%', padding: '16px', borderRadius: 14, border: 'none', fontSize: 17, fontWeight: 900, background: scanning ? '#94a3b8' : 'linear-gradient(135deg,#1a7c4a,#145f38)', color: '#fff', cursor: scanning ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: scanning ? 'none' : '0 8px 24px rgba(26, 124, 74, 0.35)', transition: 'all 0.2s' }}
          >
            {scanning ? <><Loader2 size={22} style={{ animation: 'spin 0.8s linear infinite' }} />{lang === 'kn' ? 'AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...' : 'AI Analyzing...'}</>
              : scanMode === 'image' && uploadedImage ? <><Microscope size={22} />{lang === 'kn' ? 'ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ' : 'Analyze Photo'}</>
              : <><ScanLine size={22} />{lang === 'kn' ? 'ಈಗ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Now'}</>}
          </button>
        </div>

        <style>{`@keyframes arScan{0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}@keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      </div>
    );
  }

  // ─────────────── PAGE 4: QA CHAT ───────────────
  if (page === 'qa') {
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-main, #f0f7f3)', fontFamily: "'Inter',sans-serif", display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', background: '#ffffff', borderBottom: '1px solid var(--border, #d1e8db)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setPage('result')} style={{ background: '#f0f7f3', border: '1px solid #d1e8db', borderRadius: 10, padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#1a2e1f', cursor: 'pointer' }}>
            ← {lang === 'kn' ? 'ಹಿಂದೆ' : 'Back to Results'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#1a7c4a,#145f38)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={16} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#1a2e1f' }}>{lang === 'kn' ? 'AI ಸಹಾಯಕ' : 'AI Assistant'}</p>
              <p style={{ margin: 0, fontSize: 11, color: '#64748b' }}>{result && result !== 'NO_CROP' ? (lang === 'kn' ? (result.diseaseKn || result.disease) : lang === 'hi' ? (result.diseaseHi || result.disease) : result.disease) : ''}</p>
            </div>
          </div>
        </div>

        {/* Suggested questions */}
        <div style={{ padding: '12px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'kn' ? 'ಸೂಚಿತ ಪ್ರಶ್ನೆಗಳು' : 'Suggested Questions'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ?' : 'Any organic alternative?',
              lang === 'kn' ? 'ಹರಡುವ ತಡೆ?' : 'How to prevent spread?',
              lang === 'kn' ? 'ಯೋಜನೆ ಅರ್ಜಿ ಹೇಗೆ?' : 'How to apply for scheme?',
              lang === 'kn' ? 'ಯಾವ ಔಷಧ ಉತ್ತಮ?' : 'Which medicine is best?',
            ].map((q, i) => (
              <button key={i} onClick={() => setQaInput(q)} style={{ background: '#f0f7f3', border: '1px solid #bbf7d0', borderRadius: 20, padding: '6px 14px', fontSize: 12, color: '#15803d', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.borderColor = '#86efac'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0f7f3'; e.currentTarget.style.borderColor = '#bbf7d0'; }}
              >{q}</button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {qaChat.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <MessageCircle size={32} color="#fff" />
              </div>
              <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: '#1a2e1f' }}>
                {lang === 'kn' ? 'AI ಸಹಾಯಕ ಸಿದ್ಧ' : 'AI Assistant Ready'}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
                {lang === 'kn'
                  ? 'ಈ ರೋಗ, ಚಿಕಿತ್ಸೆ ಅಥವಾ ಯೋಜನೆ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ'
                  : 'Ask me anything about this disease, its treatment, prevention, or government schemes.'}
              </p>
            </div>
          )}
          {qaChat.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
              {msg.role !== 'user' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Leaf size={14} color="#fff" />
                </div>
              )}
              <div style={{ maxWidth: '78%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg,#1a7c4a,#145f38)' : '#ffffff', color: msg.role === 'user' ? '#fff' : '#1e293b', fontSize: 14, lineHeight: 1.6, boxShadow: msg.role === 'user' ? '0 4px 12px rgba(26,124,74,0.3)' : '0 2px 8px rgba(0,0,0,0.08)', border: msg.role !== 'user' ? '1px solid #e2e8f0' : 'none' }}>
                {msg.text}
              </div>
            </div>
          ))}
          {qaLoading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Leaf size={14} color="#fff" />
              </div>
              <div style={{ background: '#fff', borderRadius: '18px 18px 18px 4px', padding: '14px 18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={qaChatEndRef} />
        </div>

        {/* Input bar */}
        <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={qaInput}
            onChange={e => setQaInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleQaAsk()}
            placeholder={lang === 'kn' ? 'ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...' : 'Ask anything about this disease...'}
            style={{ flex: 1, border: '1.5px solid #d1e8db', borderRadius: 14, padding: '12px 16px', fontSize: 14, outline: 'none', background: '#f0f7f3', color: '#1e293b' }}
            onFocus={e => e.target.style.borderColor = '#1a7c4a'}
            onBlur={e => e.target.style.borderColor = '#d1e8db'}
            autoFocus
          />
          <button
            onClick={handleQaAsk}
            disabled={!qaInput.trim() || qaLoading}
            style={{ width: 48, height: 48, borderRadius: 14, border: 'none', background: qaInput.trim() && !qaLoading ? 'linear-gradient(135deg,#1a7c4a,#145f38)' : '#e2e8f0', cursor: qaInput.trim() && !qaLoading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: qaInput.trim() ? '0 4px 12px rgba(26,124,74,0.3)' : 'none', transition: 'all 0.15s' }}
          >
            <Send size={18} color={qaInput.trim() && !qaLoading ? '#fff' : '#94a3b8'} />
          </button>
        </div>

        <style>{`@keyframes typingDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
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
        position: 'relative', zIndex: 1
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
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ width: 68, height: 68, borderRadius: 24, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid #fca5a5' }}>
                <AlertCircle size={36} color="#dc2626" />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 900, color: '#991b1b' }}>
                {lang === 'kn' ? 'ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ / Not a Crop Image' : 'Not a Crop Image'}
              </h2>
              <p style={{ margin: '0 auto 20px', maxWidth: 460, color: '#4b5563', fontSize: 14, lineHeight: 1.6 }}>
                {lang === 'kn'
                  ? 'ಇದು ಬೆಳೆ ಚಿತ್ರ ಅಲ್ಲ. ಮುಖ, ಕೊಠಡಿ, ಉಪಕರಣಗಳು ಅಥವಾ ಬೆಳೆಯಲ್ಲದ ವಸ್ತುಗಳನ್ನು AI ತಿರಸ್ಕರಿಸಿದೆ. ದಯವಿಟ್ಟು ರೋಗ ಪೀಡಿತ ಬೆಳೆಯ ಎಲೆ, ಕಾಂಡ, ಹಣ್ಣು ಅಥವಾ ರೋಗ ಮಾರ್ಗದರ್ಶಿ ಚಾರ್ಟ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.'
                  : 'This image was rejected because it does not show an agricultural crop. The AI filters out human faces, indoor rooms, electronic gadgets, and non-plant objects. Please point the camera or upload a photo of a diseased crop leaf, fruit, or the disease guide chart.'}
              </p>
              <button
                onClick={() => setPage('scanner')}
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)'
                }}
              >
                <Camera size={18} /> {lang === 'kn' ? 'ಮತ್ತೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Try Again'}
              </button>
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
                  <h2 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 900, color: '#1a2e1f', lineHeight: 1.25 }}>
                    {lang === 'kn' ? (result.diseaseKn || result.disease) : lang === 'hi' ? (result.diseaseHi || result.disease) : result.disease}
                  </h2>
                  {(lang === 'kn' || lang === 'hi') && (
                    <p style={{ margin: '0 0 3px', fontSize: 13, color: '#4b7a5c', fontWeight: 700 }}>
                      {result.disease}
                    </p>
                  )}
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Leaf size={12} />{lang === 'kn' ? 'ಬೆಳೆ' : lang === 'hi' ? 'फसल' : 'Crop'}: {getLocalizedCropName(result.crop, lang)}
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
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <button onClick={toggleVoice} style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: isSpeaking ? '#ef4444' : '#1a2e1f', color: '#fff', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
                <Volume2 size={18} />{isSpeaking ? (lang === 'kn' ? 'ನಿಲ್ಲಿಸು' : lang === 'hi' ? 'रोकें' : 'Stop') : (lang === 'kn' ? 'ಓದಿ ಹೇಳಿ' : lang === 'hi' ? 'सुनें (बोलकर बताएं)' : 'Read Aloud')}
              </button>
              <button onClick={handleReset} style={{ padding: '13px 16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1a7c4a,#145f38)', color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 3px 10px rgba(26,124,74,0.2)' }}>
                <RefreshCw size={15} />{lang === 'kn' ? 'ಮತ್ತೆ' : lang === 'hi' ? 'फिर से' : 'Rescan'}
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 14, background: '#ffffff', border: '1px solid #d1e8db', borderRadius: 12, padding: 4 }}>
              {[
                { key: 'remedy', icon: <Pill size={13} />, label: lang === 'kn' ? 'ಪರಿಹಾರ & ತಡೆ' : lang === 'hi' ? 'उपचार एवं रोकथाम' : 'Treatment & Control' },
                { key: 'fertilizer', icon: <Sprout size={13} />, label: lang === 'kn' ? 'ಗೊಬ್ಬರ' : lang === 'hi' ? 'पोषण एवं उर्वरक' : 'Nutrition' },
                { key: 'tips', icon: <Lightbulb size={13} />, label: lang === 'kn' ? 'ಸಲಹೆ' : lang === 'hi' ? 'मुख्य बिंदु' : 'Key Takeaways' }
              ].map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex: 1, padding: '9px 4px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: activeTab === tab.key ? '#f0f7f3' : 'transparent', color: activeTab === tab.key ? '#1a7c4a' : '#64748b', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ background: '#fff', border: '1px solid #d1e8db', borderRadius: 16, padding: 18, marginBottom: 14 }}>
              {activeTab === 'remedy' && (
                <div>
                  {/* Chemical Treatment Section */}
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Pill size={14} color="#1a7c4a" />
                      {lang === 'kn' ? 'ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ (Chemical Treatment)' : lang === 'hi' ? 'रासायनिक उपचार (Chemical Treatment)' : 'Chemical Treatment'}
                    </p>
                    {isTranslating && lang === 'kn' && !result.remedyKn && (
                      <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                    )}

                    {/* Direct Language Render */}
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>
                      {lang === 'kn'
                        ? (result.remedyKn || translatedRemedy || result.remedy)
                        : lang === 'hi'
                        ? (result.remedyHi || result.remedy)
                        : result.remedy}
                    </p>
                  </div>

                  {/* Prevention & Cultural Control */}
                  {result.prevention && (
                    <div style={{ marginBottom: 16, background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: 11, color: '#0369a1', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <ShieldCheck size={14} color="#0369a1" />
                        {lang === 'kn' ? 'ತಡೆಗಟ್ಟುವಿಕೆ & ಕೃಷಿ ಪದ್ಧತಿ' : lang === 'hi' ? 'रोकथाम एवं कृषि प्रबंधन' : 'Prevention & Cultural Control'}
                      </p>
                      <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.55 }}>
                        {lang === 'kn'
                          ? (result.preventionKn || translatedPrevention || result.prevention)
                          : lang === 'hi'
                          ? (result.preventionHi || result.prevention)
                          : result.prevention}
                      </p>
                    </div>
                  )}

                  {/* Organic Alternative */}
                  {result.organicTip && (
                    <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '12px 14px', border: '1px solid #bbf7d0', marginBottom: 16 }}>
                      <p style={{ fontSize: 11, fontWeight: 800, color: '#15803d', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Leaf size={14} color="#15803d" />
                        {lang === 'kn' ? 'ಸಾವಯವ ಪರ್ಯಾಯ' : lang === 'hi' ? 'जैविक विकल्प' : 'Organic Alternative'}
                      </p>
                      <p style={{ margin: 0, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
                        {lang === 'kn'
                          ? (result.organicTipKn || translatedOrganicTip || result.organicTip)
                          : lang === 'hi'
                          ? (result.organicTipHi || result.organicTip)
                          : result.organicTip}
                      </p>
                    </div>
                  )}

                  {/* Verified Chemical & Organic Product Links with Pricing */}
                  {result.products && result.products.filter(p => p.type === 'chemical' || p.type === 'organic').length > 0 && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <p style={{ fontSize: 12, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ShoppingBag size={15} color="#1a7c4a" />
                          {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಗಳು & ಬೆಲೆಗಳು' : lang === 'hi' ? 'अनुशंसित दवाएं एवं उत्पाद लिंक' : 'Recommended Medicines & Product Links'}
                        </p>
                        <span style={{ fontSize: 10, color: '#15803d', background: '#dcfce7', fontWeight: 800, padding: '3px 8px', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                          {lang === 'kn' ? 'ಖರೀದಿ & ದರ' : lang === 'hi' ? 'कीमत और विवरण' : 'Live Prices & Specs'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                        {result.products.filter(p => p.type === 'chemical' || p.type === 'organic').map((prod, idx) => (
                          <div key={idx} style={{
                            background: '#ffffff',
                            border: '1.5px solid #d1e8db',
                            borderRadius: 12,
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '2px 7px',
                                  borderRadius: 6,
                                  background: prod.type === 'organic' ? '#dcfce7' : '#fee2e2',
                                  color: prod.type === 'organic' ? '#15803d' : '#b91c1c'
                                }}>
                                  {prod.type === 'organic' ? '🌿 Bio / Organic' : '🧪 Chemical Formulation'}
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', background: '#f0fdf4', padding: '2px 8px', borderRadius: 6, border: '1px solid #bbf7d0', whiteSpace: 'nowrap' }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
                                {prod.name}
                              </div>
                              {prod.brand && (
                                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
                                  {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : lang === 'hi' ? 'ब्रांड्स' : 'Brands'}: <strong style={{ color: '#334155' }}>{prod.brand}</strong>
                                </div>
                              )}
                            </div>

                            <a
                              href={getAgriProductLink(prod.query || prod.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #1a7c4a, #145f38)',
                                color: '#ffffff',
                                padding: '8px 12px',
                                borderRadius: 9,
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 2px 6px rgba(26, 124, 74, 0.25)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>{lang === 'kn' ? 'ಉತ್ಪನ್ನ ವಿವರ & ಬೆಲೆ ಪರಿಶೀಲಿಸಿ' : lang === 'hi' ? 'उत्पाद विवरण एवं कीमत देखें' : 'View Product Details & Price'}</span>
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'fertilizer' && (
                <div>
                  <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Sprout size={14} color="#1a7c4a" />
                    {lang === 'kn' ? 'ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ (Nutrition Management)' : lang === 'hi' ? 'पोषण एवं उर्वरक प्रबंधन' : 'Nutrition Management'}
                  </p>
                  {isTranslating && lang === 'kn' && !result.fertilizerKn && (
                    <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                  )}

                  {/* Direct Language Fertilizer Guidance */}
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.65 }}>
                    {lang === 'kn'
                      ? (result.fertilizerKn || translatedFertilizer || result.fertilizer)
                      : lang === 'hi'
                      ? (result.fertilizerHi || result.fertilizer)
                      : result.fertilizer}
                  </p>

                  {/* Verified Fertilizer Product Links with Pricing */}
                  {result.products && result.products.filter(p => p.type === 'fertilizer').length > 0 && (
                    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <p style={{ fontSize: 12, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Sprout size={15} color="#1a7c4a" />
                          {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ರಸಗೊಬ್ಬರಗಳು & ದರ' : lang === 'hi' ? 'अनुशंसित उर्वरक एवं उत्पाद लिंक' : 'Recommended Fertilizers & Product Links'}
                        </p>
                        <span style={{ fontSize: 10, color: '#15803d', background: '#dcfce7', fontWeight: 800, padding: '3px 8px', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                          {lang === 'kn' ? 'ಬೆಲೆ & ಪ್ಯಾಕಿಂಗ್' : lang === 'hi' ? 'सरकारी / बाजार दर' : 'Govt / Market Rates'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                        {result.products.filter(p => p.type === 'fertilizer').map((prod, idx) => (
                          <div key={idx} style={{
                            background: '#f0fdf4',
                            border: '1.5px solid #bbf7d0',
                            borderRadius: 12,
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                          }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '2px 7px',
                                  borderRadius: 6,
                                  background: '#dcfce7',
                                  color: '#15803d'
                                }}>
                                  🌱 Fertilizer / Nutrient
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#166534', background: '#ffffff', padding: '2px 8px', borderRadius: 6, border: '1px solid #86efac', whiteSpace: 'nowrap' }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
                                {prod.name}
                              </div>
                              {prod.brand && (
                                <div style={{ fontSize: 11, color: '#4b7a5c', fontWeight: 500 }}>
                                  {lang === 'kn' ? 'ಬ್ರ್ಯಾಂಡ್‌ಗಳು' : lang === 'hi' ? 'निर्माता / ब्रांड' : 'Brands'}: <strong style={{ color: '#14532d' }}>{prod.brand}</strong>
                                </div>
                              )}
                            </div>

                            <a
                              href={getAgriProductLink(prod.query || prod.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                background: 'linear-gradient(135deg, #15803d, #14532d)',
                                color: '#ffffff',
                                padding: '8px 12px',
                                borderRadius: 9,
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>{lang === 'kn' ? 'ಗೊಬ್ಬರ ವಿವರ & ಬೆಲೆ ಪರಿಶೀಲಿಸಿ' : lang === 'hi' ? 'उर्वरक विवरण एवं कीमत देखें' : 'View Fertilizer Details & Price'}</span>
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'tips' && result.keyTakeaways && (
                <div>
                  <p style={{ fontSize: 11, color: '#1a7c4a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Lightbulb size={14} color="#1a7c4a" />
                    {lang === 'kn' ? 'ಪ್ರಮುಖ ಅಂಶಗಳು (Key Takeaways)' : lang === 'hi' ? 'मुख्य बिंदु (Key Takeaways)' : 'Key Takeaways'}
                  </p>
                  {isTranslating && lang === 'kn' && !result.keyTakeawaysKn && (
                    <p style={{ margin: '0 0 6px', fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...</p>
                  )}

                  {(() => {
                    const takeawaysList = lang === 'kn'
                      ? (result.keyTakeawaysKn || translatedKeyTakeaways || result.keyTakeaways)
                      : lang === 'hi'
                      ? (result.keyTakeawaysHi || result.keyTakeaways)
                      : result.keyTakeaways;

                    return (takeawaysList || []).map((tip, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 9 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: (result.color || '#1a7c4a') + '20', color: result.color || '#1a7c4a', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: 13.5, color: '#334155', lineHeight: 1.55, fontWeight: 500 }}>
                          {tip}
                        </p>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>

            {/* Scheme */}
            {result.scheme ? (
              <a href={result.schemeLink || '#'} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#ffffff', border: '1px solid #86efac', borderRadius: 16, padding: '14px 16px', marginBottom: 16, textDecoration: 'none', boxShadow: '0 2px 8px rgba(22,163,74,0.08)' }}>
                <div style={{ background: '#16a34a', borderRadius: 10, padding: 10, color: '#fff', flexShrink: 0 }}><ShieldCheck size={20} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 10, color: '#15803d', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building2 size={12} color="#15803d" /> {lang === 'kn' ? 'ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆ — ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : lang === 'hi' ? 'पात्र सरकारी योजना — आवेदन करें' : 'Eligible Govt Scheme — Tap to Apply'}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#14532d' }}>{result.scheme}</p>
                </div>
                <ChevronRight size={18} color="#16a34a" />
              </a>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
                <Info size={16} color="#94a3b8" /><p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{lang === 'kn' ? 'ಈ ರೋಗಕ್ಕೆ ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ ಇಲ್ಲ. ಸ್ಥಳೀಯ KVK ಸಂಪರ್ಕಿಸಿ.' : lang === 'hi' ? 'इस रोग हेतु कोई विशेष सरकारी योजना नहीं है। स्थानीय केवीके (KVK) से संपर्क करें।' : 'No specific govt scheme. Contact your local Krishi Vigyan Kendra (KVK).'}</p>
              </div>
            )}

            {/* AI Q&A — opens as separate page */}
            <button
              onClick={() => setPage('qa')}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #1a2e1f, #1a7c4a)',
                border: 'none',
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(26,124,74,0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={22} color="#4ade80" />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>
                  {lang === 'kn' ? 'AI ಸಹಾಯಕ — ಪ್ರಶ್ನೆ ಕೇಳಿ' : 'AI Assistant — Ask Follow-up Questions'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                  {lang === 'kn' ? 'ಈ ರೋಗ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ' : 'Ask anything about this disease, treatment or scheme'}
                </div>
              </div>
              <ChevronRight size={20} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes typingDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
