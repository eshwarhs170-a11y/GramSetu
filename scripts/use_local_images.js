import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '../');

const fileMapping = {
  "Arecanut": "Arecanut.jpg",
  "Areca Nut": "Arecanut.jpg",
  "Bajra": "Bajra.jpg",
  "Banana": "Banana.jpg",
  "Beans": "Beans.jpg",
  "Bengal gram": "Bengal_gram.jpg",
  "Black gram": "Black_gram.jpg",
  "Black pepper": "Black_pepper.jpg",
  "Cardamom": "Cardamom.jpg",
  "Cashew": "Cashew.jpg",
  "Castor seed": "Castor_seed.jpg",
  "Chilli": "Chilli.jpg",
  "Cocoa": "Cocoa.jpg",
  "Coconut": "Coconut.jpg",
  "Coffee": "Coffee.jpg",
  "Cotton": "Cotton.jpg",
  "Dry chilli": "Dry_chilli.jpg",
  "Finger millet": "Finger_millet.jpg",
  "Ginger": "Ginger.jpg",
  "Green chilli": "Green_chilli.jpg",
  "Green gram": "Green_gram.jpg",
  "Groundnut": "Groundnut.jpg",
  "Horse gram": "Horse_gram.jpg",
  "Jowar": "Jowar.jpg",
  "Lime": "Lime.jpg",
  "Maize": "Maize.jpg",
  "Mango": "Mango.jpg",
  "Mulberry": "Mulberry.jpg",
  "Onion": "Onion.jpg",
  "Paddy": "Paddy.jpg",
  "Pineapple": "Pineapple.jpg",
  "Potato": "Potato.jpg",
  "Ragi": "Ragi.jpg",
  "Rice": "Rice.jpg",
  "Rubber": "Rubber.jpg",
  "Sesame": "Sesame.jpg",
  "Silk Cocoon": "Silk_Cocoon.jpg",
  "Soybean": "Soybean.jpg",
  "Sugarcane": "Sugarcane.jpg",
  "Sunflower": "Sunflower.jpg",
  "Tamarind": "Tamarind.jpg",
  "Tobacco": "Tobacco.jpg",
  "Tomato": "Tomato.jpg",
  "Tur": "Tur.jpg",
  "Turmeric": "Turmeric.jpg",
  "Wheat": "Wheat.jpg"
};

// 1. Update src/data/districtCrops.js
const districtCropsPath = path.join(baseDir, 'src/data/districtCrops.js');
console.log(`Updating ${districtCropsPath}...`);
let districtCropsContent = fs.readFileSync(districtCropsPath, 'utf8');

// Replace the cropImageMap values
const mapStart = districtCropsContent.indexOf('export const cropImageMap = {');
const mapEnd = districtCropsContent.indexOf('};', mapStart);
if (mapStart !== -1 && mapEnd !== -1) {
  let newMapContent = 'export const cropImageMap = {\n';
  for (const [crop, filename] of Object.entries(fileMapping)) {
    newMapContent += `  "${crop}": "/crops/${filename}",\n`;
  }
  newMapContent = newMapContent.trim() + '\n';
  
  districtCropsContent = districtCropsContent.substring(0, mapStart) + newMapContent + districtCropsContent.substring(mapEnd);
  fs.writeFileSync(districtCropsPath, districtCropsContent, 'utf8');
  console.log('  ✓ Updated cropImageMap');
} else {
  console.log('  ✗ Could not find cropImageMap declaration');
}

// 2. Update src/utils/fetchPrices.js
const fetchPricesPath = path.join(baseDir, 'src/utils/fetchPrices.js');
console.log(`Updating ${fetchPricesPath}...`);
let fetchPricesContent = fs.readFileSync(fetchPricesPath, 'utf8');

// We need to replace: img: 'https://...' with img: '/crops/...' inside CROP_META
const cropMetaRegex = /'([^']+)':\s*\{\s*name:\s*'([^']+)',\s*unit:\s*'([^']+)',\s*img:\s*'([^']*)'/g;
fetchPricesContent = fetchPricesContent.replace(cropMetaRegex, (match, key, name, unit, img) => {
  const filename = fileMapping[key] || `${key.replace(/\s+/g, '_')}.jpg`;
  return `'${key}': { name: '${name}', unit: '${unit}', img: '/crops/${filename}'`;
});
fs.writeFileSync(fetchPricesPath, fetchPricesContent, 'utf8');
console.log('  ✓ Updated CROP_META image fields');

// 3. Update src/components/VillagerScreens.jsx
const villagerScreensPath = path.join(baseDir, 'src/components/VillagerScreens.jsx');
console.log(`Updating ${villagerScreensPath}...`);
let villagerScreensContent = fs.readFileSync(villagerScreensPath, 'utf8');

// In kaPrices, change img URLs
const kaPricesRegex = /crop:\s*'([^']+)',\s*unit:\s*'([^']+)',\s*price:\s*'([^']+)',\s*change:\s*'([^']+)',\s*trend:\s*'([^']*)',\s*market:\s*'([^']*)',\s*img:\s*'([^']*)'/g;
villagerScreensContent = villagerScreensContent.replace(kaPricesRegex, (match, crop, unit, price, change, trend, market, img) => {
  // crop name could be 'Areca Nut (ಅಡಿಕೆ)'
  const englishNameMatch = crop.match(/^([a-zA-Z ]+)/);
  const englishName = englishNameMatch ? englishNameMatch[1].trim() : crop;
  const filename = fileMapping[englishName] || `${englishName.replace(/\s+/g, '_')}.jpg`;
  return `crop: '${crop}', unit: '${unit}', price: '${price}', change: '${change}', trend: '${trend}', market: '${market}', img: '/crops/${filename}'`;
});
fs.writeFileSync(villagerScreensPath, villagerScreensContent, 'utf8');
console.log('  ✓ Updated kaPrices image fields');

console.log('All local image mappings updated successfully!');
