const fs = require('fs');
const path = require('path');
const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const dist in data) {
  for (const hl in data[dist]) {
    if (data[dist][hl].startsWith('http')) {
      const formatted = dist.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + hl.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const jpgPath = `public/district-images/${formatted}.jpg`;
      const pngPath = `public/district-images/${formatted}.png`;
      
      if (fs.existsSync(jpgPath)) {
        data[dist][hl] = `/district-images/${formatted}.jpg`;
        console.log(`Fixed ${dist} - ${hl} -> .jpg`);
      } else if (fs.existsSync(pngPath)) {
        data[dist][hl] = `/district-images/${formatted}.png`;
        console.log(`Fixed ${dist} - ${hl} -> .png`);
      } else {
        console.log(`Missing local file for ${dist} - ${hl}`);
      }
    }
  }
}
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Done!');
