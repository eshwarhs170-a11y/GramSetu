/**
 * Enrich districtPrices.json with local image paths, units, and Kannada labels.
 * Run: node scripts/enrichDistrictPrices.cjs
 */
const fs = require('fs');
const path = require('path');

const cropImageMap = {
  "Arecanut": "/crops/Arecanut.jpg", "Bajra": "/crops/Bajra.jpg", "Banana": "/crops/Banana.jpg",
  "Beans": "/crops/Beans.jpg", "Bengal gram": "/crops/Bengal_gram.jpg", "Black gram": "/crops/Black_gram.jpg",
  "Black pepper": "/crops/Black_pepper.jpg", "Cardamom": "/crops/Cardamom.jpg", "Cashew": "/crops/Cashew.jpg",
  "Castor seed": "/crops/Castor_seed.jpg", "Chilli": "/crops/Chilli.jpg", "Cocoa": "/crops/Cocoa.jpg",
  "Coconut": "/crops/Coconut.jpg", "Coffee": "/crops/Coffee.jpg", "Cotton": "/crops/Cotton.jpg",
  "Dry chilli": "/crops/Dry_chilli.jpg", "Finger millet": "/crops/Finger_millet.jpg", "Ginger": "/crops/Ginger.jpg",
  "Green chilli": "/crops/Green_chilli.jpg", "Green gram": "/crops/Green_gram.jpg", "Groundnut": "/crops/Groundnut.jpg",
  "Horse gram": "/crops/Horse_gram.jpg", "Jowar": "/crops/Jowar.jpg", "Lime": "/crops/Lime.jpg",
  "Maize": "/crops/Maize.jpg", "Mango": "/crops/Mango.jpg", "Mulberry": "/crops/Mulberry.jpg",
  "Onion": "/crops/Onion.jpg", "Paddy": "/crops/Paddy.jpg", "Pineapple": "/crops/Pineapple.jpg",
  "Potato": "/crops/Potato.jpg", "Ragi": "/crops/Ragi.jpg", "Rice": "/crops/Rice.jpg",
  "Rubber": "/crops/Rubber.jpg", "Sesame": "/crops/Sesame.jpg", "Soybean": "/crops/Soybean.jpg",
  "Sugarcane": "/crops/Sugarcane.jpg", "Sunflower": "/crops/Sunflower.jpg", "Tamarind": "/crops/Tamarind.jpg",
  "Tobacco": "/crops/Tobacco.jpg", "Tomato": "/crops/Tomato.jpg", "Tur": "/crops/Tur.jpg",
  "Turmeric": "/crops/Turmeric.jpg", "Wheat": "/crops/Wheat.jpg",
};

const cropUnits = {
  "Sugarcane": "per tonne",
  "Cardamom": "per kg",
};

const p = path.join(__dirname, '..', 'src', 'data', 'districtPrices.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

const actualPrices = [
  ['Bengaluru Rural', 'Beans'],
  ['Bengaluru Urban', 'Rice'],
  ['Bengaluru Urban', 'Maize'],
  ['Bengaluru Urban', 'Green gram'],
  ['Bengaluru Urban', 'Dry chilli'],
  ['Dharwad', 'Jowar'],
  ['Dharwad', 'Groundnut'],
  ['Dharwad', 'Soybean'],
  ['Dharwad', 'Wheat'],
  ['Dharwad', 'Bengal gram'],
  ['Dharwad', 'Tur'],
];
const actualSet = new Set(actualPrices.map(([d, c]) => `${d}::${c}`));

for (const dist of Object.keys(data)) {
  for (const item of data[dist]) {
    item.img = cropImageMap[item.crop] || `/crops/${item.crop.replace(/\s+/g, '_')}.jpg`;
    item.unit = cropUnits[item.crop] || 'per quintal';
    item.date = item.date || '28 Jul 2026';
    item.status = actualSet.has(`${dist}::${item.crop}`) ? 'ACTUAL' : (item.status || 'ESTIMATED');
  }
}

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Enriched districtPrices.json for', Object.keys(data).length, 'districts');
