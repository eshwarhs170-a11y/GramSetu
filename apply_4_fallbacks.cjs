const fs = require('fs');
const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  "Yadgir": {
    "Bheema River": "https://images.unsplash.com/photo-1600208537475-680ef0a3240e?w=800&q=80",
    "Chintanalli": "https://images.unsplash.com/photo-1621588698506-6966144e5cc5?w=800&q=80",
    "Dhab Dhabhi Falls": "https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80"
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
  }
};

for (const dist in fixes) {
  if (!data[dist]) continue;
  for (const key in fixes[dist]) {
    data[dist][key] = fixes[dist][key];
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed 4 missing images with Unsplash fallbacks!');
