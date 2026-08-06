const fs = require('fs');
const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixes = {
  "Yadgir": {
    "Yadgir Fort": "https://images.unsplash.com/photo-1592631526484-90a427cebf04?w=800&q=80",
    "Bheema River": "https://images.unsplash.com/photo-1600208537475-680ef0a3240e?w=800&q=80",
    "Chintanalli": "https://images.unsplash.com/photo-1621588698506-6966144e5cc5?w=800&q=80",
    "Uranium Deposits": "https://images.unsplash.com/photo-1587823908852-c0e5a953e5e4?w=800&q=80",
    "Dhab Dhabhi Falls": "https://images.unsplash.com/photo-1549479361-ec236b2839dc?w=800&q=80"
  },
  "Bagalkot": {
    "Pomegranate Hub": "https://images.unsplash.com/photo-1615486171448-4fb3246a482d?w=800&q=80",
    "Almatti Dam": "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?w=800&q=80"
  },
  "Raichur": {
    "Paddy Granary": "https://images.unsplash.com/photo-1586771107445-d3af9e15fa48?w=800&q=80"
  },
  "Davanagere": {
    "Paddy & Arecanut": "https://images.unsplash.com/photo-1586771107445-d3af9e15fa48?w=800&q=80"
  },
  "Chamarajanagar": {
    "Turmeric Cultivation": "https://images.unsplash.com/photo-1615486511484-92e172054395?w=800&q=80"
  },
  "Bengaluru Urban": {
    "ISKCON Temple": "https://images.unsplash.com/photo-1600082226252-4ce084610114?w=800&q=80",
    "Bengaluru Palace": "https://images.unsplash.com/photo-1560613280-7b56088d5e0d?w=800&q=80"
  },
  "Dharwad": {
    "Karadi Majalu Dance": "https://images.unsplash.com/photo-1583089892943-e02e52f17004?w=800&q=80"
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    "Coffee & Pepper Estates": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80"
  },
  "Haveri": {
    "Dodderi Math": "https://images.unsplash.com/photo-1567156972051-91a97d10e53a?w=800&q=80"
  }
};

for (const dist in fixes) {
  if (!data[dist]) continue;
  for (const key in fixes[dist]) {
    data[dist][key] = fixes[dist][key];
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed broken images with Unsplash fallbacks!');
