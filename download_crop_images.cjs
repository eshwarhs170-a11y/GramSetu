const fs = require('fs');
const path = require('path');
const https = require('https');

const crops = [
  "Maize", "Bengal gram", "Groundnut", "Sunflower", "Jowar", "Bajra", "Wheat",
  "Tur", "Chilli", "Cotton", "Paddy", "Sugarcane", "Soybean", "Ragi", "Tomato",
  "Potato", "Onion", "Beans", "Mulberry", "Finger millet", "Rice", "Green gram",
  "Black gram", "Dry chilli", "Turmeric", "Tamarind", "Sesame", "Coconut",
  "Arecanut", "Green chilli", "Lime", "Coffee", "Castor seed", "Horse gram",
  "Cashew", "Black pepper", "Banana", "Ginger", "Cocoa", "Rubber", "Mango",
  "Tobacco", "Cardamom", "Pineapple"
];

// Map some crop names to better Wikipedia search terms
const wikiSearchMap = {
  "Bengal gram": "Chickpea",
  "Tur": "Pigeon pea",
  "Paddy": "Rice",
  "Ragi": "Eleusine coracana",
  "Finger millet": "Eleusine coracana",
  "Green gram": "Mung bean",
  "Black gram": "Vigna mungo",
  "Arecanut": "Areca nut",
  "Castor seed": "Castor oil plant",
  "Horse gram": "Macrotyloma uniflorum",
  "Dry chilli": "Chili pepper",
  "Green chilli": "Chili pepper",
  "Chilli": "Chili pepper",
  "Jowar": "Sorghum",
  "Bajra": "Pearl millet"
};

const publicDir = path.join(__dirname, 'public', 'crops');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const cropInfo = {};

const fetchJson = (url) => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': 'GramSetu/1.0 (eshwarhs170@gmail.com)' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
    });
  }).on('error', reject);
});

const downloadImage = (url, filepath) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      res.pipe(fs.createWriteStream(filepath)).on('finish', resolve);
    } else {
      resolve();
    }
  }).on('error', reject);
});

async function main() {
  for (const crop of crops) {
    const searchTerm = wikiSearchMap[crop] || crop;
    console.log(`Fetching info for ${crop} (Search: ${searchTerm})...`);
    
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
    const data = await fetchJson(apiUrl);
    
    if (data && data.type !== 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found') {
      const description = data.extract;
      let imgUrl = data.thumbnail ? data.thumbnail.source : null;
      
      // Save description
      cropInfo[crop] = {
        name: crop,
        description: description || "A major agricultural crop grown in Karnataka.",
        image: `/crops/${crop.replace(/\s+/g, '_')}.jpg`
      };

      // Download image
      if (imgUrl) {
        // Get a slightly larger thumbnail if possible
        imgUrl = imgUrl.replace(/\/\d+px-/, '/320px-');
        const imgPath = path.join(publicDir, `${crop.replace(/\s+/g, '_')}.jpg`);
        await downloadImage(imgUrl, imgPath);
        console.log(`  -> Downloaded image for ${crop}`);
      } else {
        console.log(`  -> No image found for ${crop}`);
      }
    } else {
      console.log(`  -> Not found on Wikipedia for ${crop}`);
      cropInfo[crop] = {
        name: crop,
        description: "A major agricultural crop grown in Karnataka.",
        image: `/crops/${crop.replace(/\s+/g, '_')}.jpg`
      };
    }
    
    // Add small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 100));
  }

  // Save the crop info to a JSON file
  const dataDir = path.join(__dirname, 'src', 'data');
  fs.writeFileSync(path.join(dataDir, 'cropInfo.json'), JSON.stringify(cropInfo, null, 2));
  console.log('Finished downloading images and generating cropInfo.json!');
}

main().catch(console.error);
