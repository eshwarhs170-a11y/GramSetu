/**
 * get_crop_images_final.cjs
 * Uses Wikimedia API to get ORIGINAL (non-thumbnail) image URLs and downloads them.
 * Targets specific Wikimedia Commons files that have known direct URLs.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (https://gramsetu.org; contact@gramsetu.org)',
        'Accept': 'application/json'
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchJson(res.headers.location).then(resolve).catch(reject);
        }
        try { resolve(JSON.parse(body)); } catch(e) { resolve(null); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (https://gramsetu.org)',
        'Accept': 'image/jpeg,image/png,image/*',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { 
        console.log(`    HTTP ${res.statusCode}`);
        resolve(false); 
        return; 
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(true); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}

// Wikimedia Commons file names for each crop (using page summary API to get original image)
const wikiPages = {
  "Turmeric.jpg":       "Turmeric",
  "Cotton.jpg":         "Cotton",
  "Chilli.jpg":         "Chili_pepper",
  "Dry_chilli.jpg":     "Cayenne_pepper",
  "Green_chilli.jpg":   "Capsicum_annuum",
  "Banana.jpg":         "Banana",
  "Bengal_gram.jpg":    "Chickpea",
  "Cardamom.jpg":       "Cardamom",
  "Ragi.jpg":           "Finger_millet",
  "Paddy.jpg":          "Rice",
  "Cashew.jpg":         "Cashew",
  "Coconut.jpg":        "Coconut",
  "Sugarcane.jpg":      "Sugarcane",
  "Rice.jpg":           "White_rice",
  "Onion.jpg":          "Onion",
  "Lime.jpg":           "Lime_(fruit)",
  "Pineapple.jpg":      "Pineapple",
  "Black_gram.jpg":     "Vigna_mungo",
  "Finger_millet.jpg":  "Eleusine_coracana",
  "Mulberry.jpg":       "Morus_alba",
  "Potato.jpg":         "Potato",
};

async function getImageFromWikipedia(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const data = await fetchJson(url);
    if (data?.originalimage?.source) {
      return data.originalimage.source;
    }
    if (data?.thumbnail?.source) {
      // Try to convert thumb URL to original
      const thumb = data.thumbnail.source;
      // Pattern: /thumb/X/XX/filename.jpg/NNNpx-filename.jpg → /X/XX/filename.jpg
      const match = thumb.match(/\/commons\/thumb\/([a-f0-9]\/[a-f0-9]{2}\/[^/]+\.(jpg|jpeg|png|svg))/i);
      if (match) {
        return `https://upload.wikimedia.org/wikipedia/commons/${match[1]}`;
      }
    }
  } catch (e) {
    console.log(`    Error: ${e.message}`);
  }
  return null;
}

async function main() {
  let success = 0, skipped = 0, failed = 0;

  for (const [filename, wikiTitle] of Object.entries(wikiPages)) {
    const destPath = path.join(publicDir, filename);
    const exists = fs.existsSync(destPath);
    const fileSize = exists ? fs.statSync(destPath).size : 0;

    if (exists && fileSize > 40000) {
      console.log(`⏭ ${filename}: already present (${(fileSize/1024).toFixed(0)}KB) – skipping`);
      skipped++;
      continue;
    }

    console.log(`⬇ ${filename}: fetching Wikipedia summary for "${wikiTitle}"...`);
    const imgUrl = await getImageFromWikipedia(wikiTitle);
    
    if (!imgUrl) {
      console.log(`  ✗ No image URL from Wikipedia for ${wikiTitle}`);
      failed++;
      await sleep(400);
      continue;
    }

    console.log(`  → ${imgUrl.substring(0, 80)}`);
    const ok = await downloadFile(imgUrl, destPath);
    const newSize = ok && fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;

    if (ok && newSize > 10000) {
      console.log(`  ✓ Saved ${filename} (${(newSize/1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(`  ✗ Failed (${newSize} bytes) for ${filename}`);
      failed++;
      if (fs.existsSync(destPath) && newSize < 5000) {
        try { fs.unlinkSync(destPath); } catch(e) {}
      }
    }

    await sleep(300);
  }

  console.log(`\n✅ Done! ${success} downloaded, ${skipped} skipped, ${failed} failed.`);
  
  const files = fs.readdirSync(publicDir).sort();
  console.log(`\nFinal: ${files.length} files in public/crops`);
  for (const f of files) {
    const size = fs.statSync(path.join(publicDir, f)).size;
    const flag = size < 40000 ? ' ⚠ SMALL' : '';
    console.log(`  ${(size/1024).toFixed(0).padStart(5)}KB  ${f}${flag}`);
  }
}

main().catch(console.error);
