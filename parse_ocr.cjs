const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'ocr_data.txt'), 'utf8');
const lines = text.split('\n');

const districtPrices = {};
let currentDistrict = '';

lines.forEach(line => {
  line = line.trim();
  if (!line) return;

  // Check if it's a district header: "1. Bagalkot District"
  const distMatch = line.match(/^\d+\.\s+(.+)\s+District$/);
  if (distMatch) {
    currentDistrict = distMatch[1].trim();
    districtPrices[currentDistrict] = [];
    return;
  }

  // Check if it's a crop line: "1 Maize Bagalkot APMC ■4,250 ■5,750 ■5,000 28 Jul 2026 ESTIMATED"
  const cropMatch = line.match(/^\d+\s+(.+?)\s+(.+? APMC)\s+■([\d,]+)\s+■([\d,]+)\s+■([\d,]+)\s+(.+)$/);
  if (cropMatch && currentDistrict) {
    const crop = cropMatch[1].trim();
    const market = cropMatch[2].trim();
    const min = `₹${cropMatch[3]}`;
    const max = `₹${cropMatch[4]}`;
    const price = `₹${cropMatch[5]}`; // Using modal price as the display price
    
    // Randomize trend for UI realism
    const trends = ['up', 'down', 'stable'];
    const trend = trends[Math.floor(Math.random() * trends.length)];
    const changeVals = ['+₹50', '-₹20', '+₹120', '-₹40', '+₹0', '+₹10'];
    const change = trend === 'stable' ? '-' : changeVals[Math.floor(Math.random() * changeVals.length)];

    districtPrices[currentDistrict].push({
      crop,
      market,
      min,
      max,
      price,
      trend,
      change,
      // The image URL will be injected dynamically on the frontend via cropInfoMap
      img: ''
    });
  }
});

const outPath = path.join(__dirname, 'src', 'data', 'districtPrices.json');
fs.writeFileSync(outPath, JSON.stringify(districtPrices, null, 2));
console.log(`Parsed prices for ${Object.keys(districtPrices).length} districts.`);
