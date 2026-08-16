import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public/crops');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const wikiMap = {
  "Maize": "Maize",
  "Bengal gram": "Chickpea",
  "Groundnut": "Peanut",
  "Sunflower": "Helianthus",
  "Jowar": "Sorghum",
  "Bajra": "Pearl_millet",
  "Wheat": "Wheat",
  "Tur": "Pigeon_pea",
  "Chilli": "Chili_pepper",
  "Cotton": "Cotton",
  "Paddy": "Rice_paddy",
  "Sugarcane": "Sugarcane",
  "Soybean": "Soybean",
  "Ragi": "Finger_millet",
  "Tomato": "Tomato",
  "Potato": "Potato",
  "Onion": "Onion",
  "Beans": "Bean",
  "Mulberry": "Mulberry",
  "Finger millet": "Finger_millet",
  "Rice": "Rice",
  "Green gram": "Mung_bean",
  "Black gram": "Vigna_mungo",
  "Dry chilli": "Chili_pepper",
  "Turmeric": "Turmeric",
  "Tamarind": "Tamarind",
  "Sesame": "Sesame",
  "Coconut": "Coconut",
  "Arecanut": "Areca_nut",
  "Green chilli": "Chili_pepper",
  "Lime": "Lime_(fruit)",
  "Coffee": "Coffee",
  "Castor seed": "Ricinus",
  "Horse gram": "Macrotyloma_uniflorum",
  "Cashew": "Cashew",
  "Black pepper": "Black_pepper",
  "Banana": "Banana",
  "Ginger": "Ginger",
  "Cocoa": "Theobroma_cacao",
  "Rubber": "Natural_rubber",
  "Mango": "Mango",
  "Tobacco": "Tobacco",
  "Cardamom": "Cardamom",
  "Pineapple": "Pineapple",
  "Silk Cocoon": "Cocoon"
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://en.wikipedia.org/'
      }
    };
    mod.get(url, options, (res) => {
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

async function main() {
  const cropNames = Object.keys(wikiMap);
  let success = 0, fail = 0;

  console.log("Checking and retrying missing/failing crop downloads...");
  for (const crop of cropNames) {
    const fileName = crop.replace(/\s+/g, '_') + '.jpg';
    const destPath = path.join(publicDir, fileName);

    // Only download if missing or less than 1KB
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      // console.log(`✓ ${crop} exists`);
      success++;
      continue;
    }

    const wikiTitle = wikiMap[crop];
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;

    try {
      console.log(`Fetching Wikipedia summary for ${crop}...`);
      const data = await new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (contact@gramsetu.org)' } }, (res) => {
          let body = '';
          res.on('data', c => body += c);
          res.on('end', () => {
            try { resolve(JSON.parse(body)); } catch(e) { resolve(null); }
          });
        }).on('error', reject);
      });

      if (data && data.originalimage && data.originalimage.source) {
        let imgUrl = data.originalimage.source.split('?')[0];
        if (data.thumbnail && data.thumbnail.source) {
          imgUrl = data.thumbnail.source.split('?')[0].replace(/\/\d+px-/, '/500px-');
        }
        
        console.log(`⬇ Downloading ${crop} -> ${imgUrl}`);
        const ok = await download(imgUrl, destPath);
        if (ok && fs.existsSync(destPath) && fs.statSync(destPath).size > 500) {
          console.log(`  ✓ Saved ${crop} (${fs.statSync(destPath).size} bytes)`);
          success++;
        } else {
          console.log(`  ✗ Download failed for ${crop}`);
          fail++;
        }
      } else {
        console.log(`✗ ${crop} - no image found in Wikipedia API`);
        fail++;
      }
    } catch (err) {
      console.log(`✗ ${crop} - error: ${err.message}`);
      fail++;
    }

    // Add 2.5 seconds delay to prevent HTTP 429
    await new Promise(r => setTimeout(r, 2500));
  }

  console.log(`\nRetry run completed. Total files in public/crops: ${fs.readdirSync(publicDir).length}`);
}

main();
