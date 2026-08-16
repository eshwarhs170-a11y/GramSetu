import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// 1. Firebase Config from src/firebase.js
const firebaseConfig = {
  apiKey: "REDACTED_USE_ENV_VAR",
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Define the correct kaPrices directly to avoid importing JSX in Node
const correctPrices = [
  { crop: 'Ragi (ರಾಗಿ)', unit: 'per quintal', price: '₹4,050', change: '+₹64', trend: 'up', market: 'APMC Bengaluru', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=150&q=80' },
  { crop: 'Areca Nut (ಅಡಿಕೆ)', unit: 'per quintal', price: '₹49,500', change: '+₹800', trend: 'up', market: 'APMC Shimoga', img: 'https://images.unsplash.com/photo-1631377819268-d716cd610cd2?w=150&q=80' },
  { crop: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', price: '₹20,500', change: '-₹300', trend: 'down', market: 'APMC Chikkamagaluru', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&q=80' },
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)', unit: 'per kg', price: '₹580', change: '+₹15', trend: 'up', market: 'Silk Exchange, Ramanagara', img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80' },
  { crop: 'Jowar (ಜೋಳ)', unit: 'per quintal', price: '₹3,350', change: '-₹21', trend: 'down', market: 'APMC Dharwad', img: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=150&q=80' },
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', price: '₹2,280', change: '+₹55', trend: 'up', market: 'APMC Davangere', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&q=80' },
  { crop: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', price: '₹28', change: '+₹6', trend: 'up', market: 'APMC Kolar', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80' },
  { crop: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', price: '₹22', change: '-₹3', trend: 'down', market: 'APMC Gadag', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80' },
  { crop: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', price: '₹3,400', change: '₹0', trend: 'neutral', market: 'APMC Mandya', img: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=150&q=80' },
  { crop: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', price: '₹13,800', change: '+₹300', trend: 'up', market: 'APMC Chamarajanagar', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80' },
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', price: '₹2,050', change: '+₹80', trend: 'up', market: 'APMC Tumkuru', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&q=80' },
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', price: '₹6,650', change: '-₹130', trend: 'down', market: 'APMC Chitradurga', img: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=150&q=80' }
];

async function updateFirestore() {
  console.log("Updating Firestore prices with correct images...");
  try {
    for (const price of correctPrices) {
      const id = price.crop.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      await setDoc(doc(collection(db, 'prices'), id), price);
      console.log(`Updated document: ${id} (${price.crop})`);
    }
    console.log("Firestore prices updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating Firestore:", error);
    process.exit(1);
  }
}

updateFirestore();
