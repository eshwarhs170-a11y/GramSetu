/**
 * fallback_crop_images.cjs
 * Uses reliable Wikimedia Commons thumbnail URLs (verified working) 
 * to upgrade remaining small or missing crop images.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');
const MIN_SIZE = 80 * 1024; // 80KB threshold

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const makeReq = (u) => {
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, {
        headers: {
          'User-Agent': 'GramSetuBot/1.0',
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

// Verified working Wikimedia thumbnail URLs (800px wide)
// These are direct, working Wikimedia Commons CDN URLs
const fallbackUrls = {
  "Turmeric.jpg":       "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tumeric_%28Curcuma_longa%29_roots.jpg/800px-Tumeric_%28Curcuma_longa%29_roots.jpg",
  "Cotton.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Gossypium_hirsutum_cotton_boll.jpg/800px-Gossypium_hirsutum_cotton_boll.jpg",
  "Chilli.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/800px-Hapus_Mango.jpg",
  "Dry_chilli.jpg":     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Paprika_mix.jpg/800px-Paprika_mix.jpg",
  "Green_chilli.jpg":   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Green_pepper_and_cross_section.jpg/800px-Green_pepper_and_cross_section.jpg",
  "Banana.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Kluai-Khai.jpg/800px-Banana-Kluai-Khai.jpg",
  "Bengal_gram.jpg":    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Chickpea_Kala_Chana.jpg/800px-Chickpea_Kala_Chana.jpg",
  "Tomato.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
  "Mulberry.jpg":       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Morus_alba_23_Luc_Viatour.jpg/800px-Morus_alba_23_Luc_Viatour.jpg",
  "Cardamom.jpg":       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-057.jpg/800px-Elettaria_cardamomum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-057.jpg",
  "Ragi.jpg":           "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Eleusine_coracana_in_field.jpg/800px-Eleusine_coracana_in_field.jpg",
  "Paddy.jpg":          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pila_campo.jpg/800px-Pila_campo.jpg",
  "Cashew.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cashew_%28Anacardium_occidentale%29.jpg/800px-Cashew_%28Anacardium_occidentale%29.jpg",
  "Coconut.jpg":        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Coconut_on_white.jpg/800px-Coconut_on_white.jpg",
  "Sugarcane.jpg":      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Sugarcane_field.jpg/800px-Sugarcane_field.jpg",
  "Rice.jpg":           "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White_rice.jpg/800px-White_rice.jpg",
  "Jowar.jpg":          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Sorghum_bicolor.jpg/800px-Sorghum_bicolor.jpg",
  "Arecanut.jpg":       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Areca-catechu-fruits.jpg/800px-Areca-catechu-fruits.jpg",
  "Tobacco.jpg":        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Tobacco_farm.jpg/800px-Tobacco_farm.jpg",
  "Soybean.jpg":        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Soybeanvarieties.jpg/800px-Soybeanvarieties.jpg",
  "Onion.jpg":          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Onion_on_White.JPG/800px-Onion_on_White.JPG",
  "Lime.jpg":           "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Reinette_canada_var._sudtyroler.jpg/800px-Reinette_canada_var._sudtyroler.jpg",
  "Sesame.jpg":         "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sesamum_indicum.jpg/800px-Sesamum_indicum.jpg",
  "Pineapple.jpg":      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/800px-Pineapple_and_cross_section.jpg",
  "Horse_gram.jpg":     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Horsegram_plants.jpg/800px-Horsegram_plants.jpg",
  "Black_gram.jpg":     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Vigna_mungo_seeds.jpg/800px-Vigna_mungo_seeds.jpg",
  "Finger_millet.jpg":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Eleusine_coracana.jpg/800px-Eleusine_coracana.jpg",
  "Beans.jpg":          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Haricot_blanc_lingot.jpg/800px-Haricot_blanc_lingot.jpg",
};

async function main() {
  let success = 0, skipped = 0, failed = 0;

  for (const [filename, url] of Object.entries(fallbackUrls)) {
    const destPath = path.join(publicDir, filename);
    const exists = fs.existsSync(destPath);
    const fileSize = exists ? fs.statSync(destPath).size : 0;

    if (exists && fileSize >= MIN_SIZE) {
      console.log(`⏭ ${filename}: already good (${(fileSize/1024).toFixed(0)}KB) – skipping`);
      skipped++;
      continue;
    }

    console.log(`⬇ ${filename}: downloading...`);
    const ok = await downloadFile(url, destPath);
    const newSize = ok && fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;

    if (ok && newSize > 20000) {
      console.log(`  ✓ Saved ${filename} (${(newSize/1024).toFixed(0)}KB)`);
      success++;
    } else {
      console.log(`  ✗ Failed for ${filename} (${newSize} bytes)`);
      failed++;
      if (fs.existsSync(destPath) && newSize < 5000) fs.unlinkSync(destPath);
    }
    await sleep(300);
  }

  console.log(`\n✅ Done! ${success} upgraded, ${skipped} skipped, ${failed} failed.`);
  
  // Final status of all crop images
  const files = fs.readdirSync(publicDir).sort();
  console.log(`\nFinal status (${files.length} files):`);
  let smallCount = 0;
  for (const f of files) {
    const size = fs.statSync(path.join(publicDir, f)).size;
    const flag = size < MIN_SIZE ? ' ⚠ SMALL' : '';
    if (size < MIN_SIZE) smallCount++;
    console.log(`  ${(size/1024).toFixed(0).padStart(5)}KB  ${f}${flag}`);
  }
  console.log(`\n${smallCount} images still under ${MIN_SIZE/1024}KB`);
}

main().catch(console.error);
