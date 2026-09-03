const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'src', 'data', 'schemesData.js');
let content = fs.readFileSync(dataFile, 'utf8');

const replacements = [
  {
    // pm-kisan
    search: "id: 'pm-kisan',\n    category: 'Agriculture',\n    level: 'Central',\n    beneficiary: ['Small/Marginal Farmers', 'Large Landholders'],\n    objective: 'Income Support',\n    stage: 'Pre-Harvest',\n    districtSpecific: ['All'],\n    title: { en: 'PM Kisan Samman Nidhi', kn: 'ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ ನಿಧಿ', hi: 'PM किसान सम्मान निधि' },",
    imgSearch: "img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',",
    imgReplace: "img: '/schemes/pm-kisan.jpg',"
  },
  {
    // pmfby
    search: "id: 'pmfby',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',",
    imgReplace: "img: '/schemes/pmfby.jpg',"
  },
  {
    // kisan-credit-card
    search: "id: 'kisan-credit-card',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1589828135898-d14fb4081c70?w=600&q=80',",
    imgReplace: "img: '/schemes/kisan-credit-card.jpg',"
  },
  {
    // raitha-siri
    search: "id: 'raitha-siri',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=80',",
    imgReplace: "img: '/schemes/raitha-siri.jpg',"
  },
  {
    // krishi-bhagya
    search: "id: 'krishi-bhagya',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',",
    imgReplace: "img: '/schemes/krishi-bhagya.jpg',"
  },
  {
    // pm-kusum
    search: "id: 'pm-kusum',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&q=80',",
    imgReplace: "img: '/schemes/pm-kusum.jpg',"
  },
  {
    // rkvy-mechanization
    search: "id: 'rkvy-mechanization',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80',",
    imgReplace: "img: '/schemes/rkvy-mechanization.jpg',"
  },
  {
    // fpo-formation
    search: "id: 'fpo-formation',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',",
    imgReplace: "img: '/schemes/fpo-formation.jpg',"
  },
  {
    // pm-aif
    search: "id: 'pm-aif',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80',",
    imgReplace: "img: '/schemes/pm-aif.jpg',"
  },
  {
    // soil-health-card
    search: "id: 'soil-health-card',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1627920769852-5c21f5fb3d0f?w=600&q=80',",
    imgReplace: "img: '/schemes/soil-health-card.jpg',"
  },
  {
    // coffee-dev
    search: "id: 'coffee-dev',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',",
    imgReplace: "img: '/schemes/coffee-plantation.jpg',"
  },
  {
    // gruha-lakshmi
    search: "id: 'gruha-lakshmi',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',",
    imgReplace: "img: '/schemes/gruha-lakshmi.jpg',"
  },
  {
    // stree-shakti
    search: "id: 'stree-shakti',",
    imgSearch: "img: 'https://images.unsplash.com/photo-1603597395015-8167f1dc219d?w=600&q=80',",
    imgReplace: "img: '/schemes/stree-shakti.jpg',"
  },
  {
    // agriFinancialAssistance kcc-crop-loan
    search: "id: 'kcc-crop-loan',\n    img: 'https://images.unsplash.com/photo-1589828135898-d14fb4081c70?w=600&q=80',",
    replace: "id: 'kcc-crop-loan',\n    img: '/schemes/kisan-credit-card.jpg',"
  },
  {
    // agriFinancialAssistance pmfby-insurance-detail
    search: "id: 'pmfby-insurance-detail',\n    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',",
    replace: "id: 'pmfby-insurance-detail',\n    img: '/schemes/pmfby.jpg',"
  },
  {
    // agriFinancialAssistance nabard-startup-grant
    search: "id: 'nabard-startup-grant',\n    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',",
    replace: "id: 'nabard-startup-grant',\n    img: '/schemes/fpo-formation.jpg',"
  },
  {
    // agriAdvisoryAndCenters RSK
    search: "type: 'RSK',\n    img: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&q=80',",
    replace: "type: 'RSK',\n    img: '/schemes/rsk-network.jpg',"
  },
  {
    // agriAdvisoryAndCenters KVK
    search: "type: 'KVK',\n    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',",
    replace: "type: 'KVK',\n    img: '/schemes/kvk-centers.jpg',"
  },
  {
    // agriAdvisoryAndCenters SoilCard
    search: "type: 'SoilCard',\n    img: 'https://images.unsplash.com/photo-1627920769852-5c21f5fb3d0f?w=600&q=80',",
    replace: "type: 'SoilCard',\n    img: '/schemes/soil-health-card.jpg',"
  },
  {
    // agriAdvisoryAndCenters WeatherAlert
    search: "type: 'WeatherAlert',\n    img: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80',",
    replace: "type: 'WeatherAlert',\n    img: '/schemes/varuna-mitra.jpg',"
  }
];

let updated = 0;
// Direct pattern replacement for schemes array
const schemeMap = {
  'pm-kisan': '/schemes/pm-kisan.jpg',
  'pmfby': '/schemes/pmfby.jpg',
  'kisan-credit-card': '/schemes/kisan-credit-card.jpg',
  'raitha-siri': '/schemes/raitha-siri.jpg',
  'krishi-bhagya': '/schemes/krishi-bhagya.jpg',
  'pm-kusum': '/schemes/pm-kusum.jpg',
  'rkvy-mechanization': '/schemes/rkvy-mechanization.jpg',
  'fpo-formation': '/schemes/fpo-formation.jpg',
  'pm-aif': '/schemes/pm-aif.jpg',
  'soil-health-card': '/schemes/soil-health-card.jpg',
  'coffee-dev': '/schemes/coffee-plantation.jpg',
  'gruha-lakshmi': '/schemes/gruha-lakshmi.jpg',
  'stree-shakti': '/schemes/stree-shakti.jpg'
};

for (const [id, newImg] of Object.entries(schemeMap)) {
  const idRegex = new RegExp(`id:\\s*['"]${id}['"][\\s\\S]*?img:\\s*['"][^'"]+['"]`, 'm');
  const match = content.match(idRegex);
  if (match) {
    const originalBlock = match[0];
    const replacedBlock = originalBlock.replace(/img:\s*['"][^'"]+['"]/, `img: '${newImg}'`);
    content = content.replace(originalBlock, replacedBlock);
    updated++;
    console.log(`Updated scheme ${id} -> ${newImg}`);
  } else {
    console.warn(`Could not match scheme ${id}`);
  }
}

// Financial assistance & Advisory replacements
for (const r of replacements.slice(13)) {
  if (content.includes(r.search)) {
    content = content.replace(r.search, r.replace);
    updated++;
    console.log(`Updated entry: ${r.replace.split('\n')[0]}`);
  } else {
    console.warn(`Could not find search block: ${r.search.slice(0, 30)}`);
  }
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log(`Total updated: ${updated}`);
