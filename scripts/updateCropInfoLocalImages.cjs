/**
 * Point cropInfo.json images to local /crops/ files for fast, reliable loading.
 * Run: node scripts/updateCropInfoLocalImages.cjs
 */
const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'src', 'data', 'cropInfo.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

for (const crop of Object.keys(data)) {
  const localPath = `/crops/${crop.replace(/\s+/g, '_')}.jpg`;
  data[crop].image = localPath;
}

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Updated', Object.keys(data).length, 'crop images to local paths');
