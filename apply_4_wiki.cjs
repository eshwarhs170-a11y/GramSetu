const fs = require('fs');
const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  "Yadgir": {
    "Bheema River": "https://upload.wikimedia.org/wikipedia/commons/e/e9/NUT_7560C.jpg",
    "Chintanalli": "https://upload.wikimedia.org/wikipedia/commons/a/a8/A_trident_outside_Gavigangadareswara_temple_in_Bangalore.jpg",
    "Dhab Dhabhi Falls": "https://upload.wikimedia.org/wikipedia/commons/7/73/Dhab_Dhabi_falls.jpg"
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Mullayanagiri_Peak.jpg"
  }
};

for (const dist in fixes) {
  if (!data[dist]) continue;
  for (const key in fixes[dist]) {
    data[dist][key] = fixes[dist][key];
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed 4 missing images with reliable Wikipedia fallbacks!');
