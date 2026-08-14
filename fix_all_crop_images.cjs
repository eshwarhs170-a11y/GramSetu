const fs = require('fs');
const path = require('path');
const https = require('https');

const cropInfoPath = path.join(__dirname, 'src', 'data', 'cropInfo.json');
const cropInfo = JSON.parse(fs.readFileSync(cropInfoPath, 'utf8'));

const wikiMap = {
  "Maize": "Maize", "Bengal gram": "Chickpea", "Groundnut": "Peanut",
  "Sunflower": "Helianthus", "Jowar": "Sorghum", "Bajra": "Pearl_millet",
  "Wheat": "Wheat", "Tur": "Pigeon_pea", "Chilli": "Chili_pepper",
  "Cotton": "Cotton", "Paddy": "Rice_paddy", "Sugarcane": "Sugarcane",
  "Soybean": "Soybean", "Ragi": "Finger_millet", "Tomato": "Tomato",
  "Potato": "Potato", "Onion": "Onion", "Beans": "Bean",
  "Mulberry": "Mulberry", "Finger millet": "Finger_millet",
  "Rice": "Rice", "Green gram": "Mung_bean", "Black gram": "Vigna_mungo",
  "Dry chilli": "Chili_pepper", "Turmeric": "Turmeric",
  "Tamarind": "Tamarind", "Sesame": "Sesame", "Coconut": "Coconut",
  "Arecanut": "Areca_nut", "Green chilli": "Chili_pepper",
  "Lime": "Lime_(fruit)", "Coffee": "Coffee", "Castor seed": "Ricinus",
  "Horse gram": "Macrotyloma_uniflorum", "Cashew": "Cashew",
  "Black pepper": "Black_pepper", "Banana": "Banana",
  "Ginger": "Ginger", "Cocoa": "Theobroma_cacao", "Rubber": "Natural_rubber",
  "Mango": "Mango", "Tobacco": "Tobacco", "Cardamom": "Cardamom",
  "Pineapple": "Pineapple"
};

async function main() {
  const cropNames = Object.keys(cropInfo);

  for (const crop of cropNames) {
    const wikiTitle = wikiMap[crop] || crop;
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;

    try {
      const data = await new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'GramSetu/1.0' } }, (res) => {
          let body = '';
          res.on('data', c => body += c);
          res.on('end', () => {
            try { resolve(JSON.parse(body)); } catch(e) { resolve(null); }
          });
        }).on('error', reject);
      });

      if (data && data.originalimage && data.originalimage.source) {
        cropInfo[crop].image = data.originalimage.source;
        console.log(`✓ ${crop}: ${cropInfo[crop].image}`);
      } else {
        console.log(`✗ ${crop}: No image found on Wikipedia`);
      }
    } catch (err) {
      console.log(`✗ ${crop}: Error fetching from Wikipedia - ${err.message}`);
    }

    // Delay to respect rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  // Fallbacks for any that might have failed
  const fallbacks = {
    "Cotton": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cotton_boll_1.jpg",
    "Maize": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Corn_on_the_cob.jpg",
    "Bengal gram": "https://upload.wikimedia.org/wikipedia/commons/8/87/Chickpea_Kala_Chana.jpg",
    "Tur": "https://upload.wikimedia.org/wikipedia/commons/a/af/Pigeon_peas.jpg",
    "Chilli": "https://upload.wikimedia.org/wikipedia/commons/9/90/Red_Chilies.jpg",
    "Soybean": "https://upload.wikimedia.org/wikipedia/commons/7/77/Soybean_pod_and_seeds.jpg",
    "Green gram": "https://upload.wikimedia.org/wikipedia/commons/8/86/Mung_beans_%28Vigna_radiata%29.jpg"
  };

  for (const crop of cropNames) {
    if (fallbacks[crop] && (!cropInfo[crop].image || !cropInfo[crop].image.includes('wikipedia'))) {
        cropInfo[crop].image = fallbacks[crop];
        console.log(`Fallback applied for ${crop}`);
    }
  }

  fs.writeFileSync(cropInfoPath, JSON.stringify(cropInfo, null, 2));
  console.log(`\nUpdated cropInfo.json with correct Wikipedia image links!`);
}

main();
