/**
 * upgrade_crop_images_v2.cjs
 * Downloads high-quality crop images using Wikimedia search API.
 * Searches by crop name and downloads the best matching image.
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
        'User-Agent': 'GramSetuBot/2.0 (contact@gramsetu.org)',
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
    const makeReq = (u) => {
      https.get(u, {
        headers: {
          'User-Agent': 'GramSetuBot/2.0',
          'Accept': 'image/*',
          'Referer': 'https://commons.wikimedia.org/'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return makeReq(res.headers.location);
        }
        if (res.statusCode !== 200) { resolve(false); return; }
        const ws = fs.createWriteStream(dest);
        res.pipe(ws);
        ws.on('finish', () => { ws.close(); resolve(true); });
        ws.on('error', reject);
      }).on('error', reject);
    };
    makeReq(url);
  });
}

// Search terms per crop (best Wikipedia article title for finding good image)
const cropSearchTerms = {
  "Turmeric":      "Turmeric plant",
  "Mango":         "Mango fruit",
  "Cotton":        "Cotton plant boll",
  "Chilli":        "Chili pepper red",
  "Dry_chilli":    "Dried chili pepper",
  "Green_chilli":  "Green chili pepper",
  "Banana":        "Banana fruit",
  "Green_gram":    "Mung bean",
  "Bengal_gram":   "Chickpea",
  "Tomato":        "Tomato red",
  "Cardamom":      "Cardamom pod",
  "Wheat":         "Wheat grain field",
  "Ragi":          "Finger millet crop",
  "Paddy":         "Rice paddy field",
  "Potato":        "Potato vegetable",
  "Cashew":        "Cashew nut",
  "Coconut":       "Coconut palm",
  "Rice":          "Rice grain",
  "Jowar":         "Sorghum bicolor",
  "Arecanut":      "Areca nut palm",
  "Coffee":        "Coffee berry arabica",
  "Black_pepper":  "Black pepper spice",
  "Groundnut":     "Peanut groundnut",
  "Ginger":        "Ginger root",
  "Sesame":        "Sesame plant",
  "Pineapple":     "Pineapple ananas",
  "Horse_gram":    "Horse gram legume",
  "Lime":          "Lime citrus fruit",
  "Onion":         "Onion vegetable",
  "Beans":         "Green bean",
  "Finger_millet": "Finger millet eleusine",
};

// Crops to force-download (too small — under threshold)
const MIN_SIZE = 80 * 1024; // 80KB

async function searchWikimediaImage(searchTerm) {
  const query = encodeURIComponent(searchTerm);
  // Use Wikipedia's page API to get image for the topic
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=800&generator=search&gsrsearch=${query}&gsrlimit=3&pilimit=3`;
  
  try {
    const data = await fetchJson(url);
    const pages = data?.query?.pages;
    if (!pages) return null;
    
    // Pick the page with a thumbnail
    for (const page of Object.values(pages)) {
      if (page.thumbnail?.source) {
        // Get larger version — replace thumb size in URL
        let imgUrl = page.thumbnail.source;
        // Try to get 800px version
        imgUrl = imgUrl.replace(/\/\d+px-/, '/800px-');
        return imgUrl;
      }
    }
  } catch(e) {
    return null;
  }
  return null;
}

async function main() {
  const crops = Object.entries(cropSearchTerms);
  let success = 0, skipped = 0, failed = 0;

  for (const [cropFile, searchTerm] of crops) {
    const destPath = path.join(publicDir, cropFile + '.jpg');
    const exists = fs.existsSync(destPath);
    const fileSize = exists ? fs.statSync(destPath).size : 0;

    if (exists && fileSize >= MIN_SIZE) {
      console.log(`⏭ ${cropFile}: already good (${(fileSize/1024).toFixed(0)}KB) – skipping`);
      skipped++;
      continue;
    }

    console.log(`⬇ ${cropFile}: searching Wikimedia for "${searchTerm}"...`);

    const imgUrl = await searchWikimediaImage(searchTerm);
    if (!imgUrl) {
      console.log(`  ✗ No image found for "${searchTerm}"`);
      failed++;
      await sleep(400);
      continue;
    }

    console.log(`  → ${imgUrl.substring(0, 80)}`);
    const ok = await downloadFile(imgUrl, destPath);
    const newSize = ok && fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;

    if (ok && newSize > 20000) {
      console.log(`  ✓ Saved ${cropFile}.jpg (${(newSize/1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(`  ✗ Download failed or too small (${newSize} bytes) for ${cropFile}`);
      failed++;
      if (fs.existsSync(destPath) && newSize < 5000) fs.unlinkSync(destPath);
    }

    await sleep(350);
  }

  console.log(`\n✅ Done! ${success} upgraded, ${skipped} already good, ${failed} failed.`);
  
  const files = fs.readdirSync(publicDir);
  console.log(`\nFiles in public/crops (${files.length}):`);
  for (const f of files.sort()) {
    const size = fs.statSync(path.join(publicDir, f)).size;
    const flag = size < MIN_SIZE ? ' ⚠ SMALL' : '';
    console.log(`  ${(size/1024).toFixed(0).padStart(5)}KB  ${f}${flag}`);
  }
}

main().catch(console.error);
