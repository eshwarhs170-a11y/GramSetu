const fs = require('fs');
const wards = fs.readFileSync('bbmp_wards_final.txt', 'utf8');

const newEntry = `  // ─── BENGALURU ──────────────────────────────────────────
  "Bengaluru Urban|Bengaluru South": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      ${wards}
    ]
  },
  "Bengaluru Urban|Bengaluru North": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      ${wards}
    ]
  },
  "Bengaluru Urban|Bengaluru East": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      ${wards}
    ]
  },
  "Bengaluru Urban|Yelahanka": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      ${wards}
    ]
  },
  "Bengaluru Urban|Anekal": {
    ulb: "BBMP (Bruhat Bengaluru Mahanagara Palike)",
    wards: [
      ${wards}
    ]
  },`;

let fileStr = fs.readFileSync('src/data/karnatakaUrbanData.js', 'utf8');
const startMarker = '  // ─── BENGALURU ──────────────────────────────────────────';
const endMarker = '  // ─── MYSURU ──────────────────────────────────────────';

const startIndex = fileStr.indexOf(startMarker);
const endIndex = fileStr.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const finalStr = fileStr.substring(0, startIndex) + newEntry + '\n\n' + fileStr.substring(endIndex);
  fs.writeFileSync('src/data/karnatakaUrbanData.js', finalStr);
  console.log('Successfully updated karnatakaUrbanData.js with BBMP wards');
} else {
  console.log('Markers not found');
}
