const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const cropInfoPath = path.join(__dirname, 'src', 'data', 'cropInfo.json');
const cropInfo = JSON.parse(fs.readFileSync(cropInfoPath, 'utf8'));

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'GramSetu/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        console.log(`  HTTP ${res.statusCode} for ${url}`);
        resolve(false);
        return;
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', (e) => reject(e));
    }).on('error', reject);
  });
}

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
  let success = 0, fail = 0;

  for (const crop of cropNames) {
    const fileName = crop.replace(/\s+/g, '_') + '.jpg';
    const destPath = path.join(publicDir, fileName);

    // Skip if already downloaded
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`✓ ${crop} already exists (${fs.statSync(destPath).size} bytes)`);
      success++;
      continue;
    }

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
        // Use original image (higher quality), resize via URL if wikimedia
        let imgUrl = data.originalimage.source;
        // For wikimedia, request a 400px wide thumbnail
        if (data.thumbnail && data.thumbnail.source) {
          imgUrl = data.thumbnail.source.replace(/\/\d+px-/, '/400px-');
        }
        
        console.log(`⬇ ${crop} -> ${imgUrl.substring(0, 80)}...`);
        const ok = await download(imgUrl, destPath);
        if (ok && fs.existsSync(destPath) && fs.statSync(destPath).size > 500) {
          console.log(`  ✓ Saved (${fs.statSync(destPath).size} bytes)`);
          success++;
        } else {
          console.log(`  ✗ Download failed or too small`);
          fail++;
        }
      } else {
        console.log(`✗ ${crop} - no image in Wikipedia API`);
        fail++;
      }
    } catch (err) {
      console.log(`✗ ${crop} - error: ${err.message}`);
      fail++;
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone! ${success} succeeded, ${fail} failed.`);
  
  // List what we got
  const files = fs.readdirSync(publicDir);
  console.log(`Files in public/crops: ${files.length}`);
}

main();
