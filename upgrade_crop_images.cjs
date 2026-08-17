/**
 * upgrade_crop_images.cjs
 * Downloads high-quality crop images from Wikimedia Commons for all crops used in the APMC pages.
 * Replaces poor-quality (< 80KB) images with better ones.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org)',
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
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0',
        'Accept': 'image/jpeg,image/png,image/webp,image/*',
        'Referer': 'https://commons.wikimedia.org/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
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

// HIGH QUALITY Wikimedia Commons file names for each crop
// These are exact Wikimedia Commons filenames for high-res crop photos
const cropWikiFiles = {
  "Turmeric":    "Turmeric_plant_with_rhizomes.jpg",
  "Mango":       "Mango_-_single_(Mangifera_indica).jpg",
  "Cotton":      "Gossypium_hirsutum_00.jpg",
  "Chilli":      "Capsicum_annuum_fruits.jpg",
  "Dry_chilli":  "Dry-Chili-Peppers.jpg",
  "Green_chilli":"Green_chilli_peppers.jpg",
  "Banana":      "Banana-Whole-and-Split.jpg",
  "Green_gram":  "Mung_beans_(Vigna_radiata).jpg",
  "Bengal_gram": "Chickpea_Kala_Chana.jpg",
  "Tomato":      "Tomato_je.jpg",
  "Mulberry":    "Morus_alba_-_Silkworm_Mulberry.jpg",
  "Cardamom":    "Elettaria_cardamomum.jpg",
  "Wheat":       "Wheat_close-up.JPG",
  "Ragi":        "Eleusine_coracana_Karnataka.jpg",
  "Paddy":       "Rice_unpolished_and_polished.jpg",
  "Potato":      "Russet_potato_cultivar_with_sprouts.jpg",
  "Cashew":      "Cashew_Kaju_DSC00541.jpg",
  "Coconut":     "Coconut_-_Thenga.jpg",
  "Sugarcane":   "Saccharum_officinarum_(sugarcane)_MS_4001.jpg",
  "Rice":        "Unpolished_Rice.jpg",
  "Sunflower":   "Sunflower_sky_backdrop.jpg",
  "Jowar":       "Sorghum_bicolor_-_Köhler–s_Medizinal-Pflanzen-263.jpg",
  "Arecanut":    "Areca_catechu_-_Köhler–s_Medizinal-Pflanzen-011.jpg",
  "Coffee":      "Ripe_coffee_berries_-_Coffea_sp.jpg",
  "Black_pepper":"Black_pepper_corns.jpg",
  "Groundnut":   "Peanuts_-_Arachis_hypogaea.jpg",
  "Ginger":      "Zingiber_officinale_(Ginger)_in_Goa,_India.jpg",
  "Tamarind":    "Tamarind_(Tamarindus_indica)_fruits_and_seeds.jpg",
  "Rubber":      "Hevea_brasiliensis_-_Köhler–s_Medizinal-Pflanzen-071.jpg",
  "Cocoa":       "Cocoa_farmer.jpg",
  "Tobacco":     "Tobacco_-_Nicotiana_tabacum.jpg",
  "Soybean":     "Soybean_seedpods.jpg",
  "Maize":       "Corn_field.jpg",
  "Tur":         "Cajanus_cajan_(pigeon_pea).jpg",
  "Bajra":       "Pearl_millet.jpg",
  "Onion":       "Onions.jpg",
  "Lime":        "Citrus_× aurantifolia.jpg",
  "Sesame":      "Sesame_sowing.jpg",
  "Pineapple":   "Ananas_comosus_(pineapple_plant)_with_fruits.jpg",
  "Castor_seed": "Ricinus_communis.jpg",
  "Horse_gram":  "Macrotyloma_uniflorum_(Horsegram).jpg",
  "Black_gram":  "Vigna_mungo.jpg",
  "Finger_millet":"Finger_millet_(Eleusine_coracana)_W_IMG_2922.jpg",
  "Beans":       "Phaseolus_vulgaris_(beans).jpg",
  "Mango":       "Alphonso_Mango.jpg",
  "Silk_Cocoon": "Silkworm_cocoon.jpg",
};

// Crops to FORCE re-download (small/low quality images)
const forceDownloadUnder = 100 * 1024; // 100KB threshold

async function fetchWikimediaUrl(filename) {
  // Use Wikimedia Commons API to get the actual image URL
  const encodedFile = encodeURIComponent('File:' + filename);
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodedFile}&prop=imageinfo&iiprop=url|size&iiurlwidth=800&format=json`;
  try {
    const data = await fetchJson(apiUrl);
    const pages = data?.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    const imgInfo = page?.imageinfo?.[0];
    if (!imgInfo) return null;
    // Use the 800px thumbnail URL if available, else original
    return imgInfo.thumburl || imgInfo.url;
  } catch (e) {
    return null;
  }
}

async function main() {
  const cropEntries = Object.entries(cropWikiFiles);
  let success = 0, skipped = 0, failed = 0;

  for (const [cropFile, wikiFilename] of cropEntries) {
    const destPath = path.join(publicDir, cropFile + '.jpg');
    const exists = fs.existsSync(destPath);
    const fileSize = exists ? fs.statSync(destPath).size : 0;

    if (exists && fileSize >= forceDownloadUnder) {
      console.log(`⏭ ${cropFile}: already good (${(fileSize/1024).toFixed(0)}KB) – skipping`);
      skipped++;
      continue;
    }

    console.log(`⬇ ${cropFile}: fetching from Wikimedia (${wikiFilename})...`);

    const imgUrl = await fetchWikimediaUrl(wikiFilename);
    if (!imgUrl) {
      console.log(`  ✗ No URL found for ${cropFile}`);
      failed++;
      await sleep(300);
      continue;
    }

    console.log(`  → ${imgUrl.substring(0, 80)}...`);
    const ok = await downloadFile(imgUrl, destPath);
    const newSize = ok && fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;

    if (ok && newSize > 10000) {
      console.log(`  ✓ Saved ${cropFile}.jpg (${(newSize/1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(`  ✗ Failed or too small for ${cropFile}`);
      failed++;
      // Remove bad file
      if (fs.existsSync(destPath) && newSize < 5000) fs.unlinkSync(destPath);
    }

    await sleep(300);
  }

  console.log(`\n✅ Done! ${success} upgraded, ${skipped} already good, ${failed} failed.`);
  console.log(`Files in public/crops: ${fs.readdirSync(publicDir).length}`);
}

main().catch(console.error);
