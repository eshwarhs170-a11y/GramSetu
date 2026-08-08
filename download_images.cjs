/**
 * download_images.cjs
 * Downloads all images from districtImages.json into public/district-images/
 * and writes a new districtImages.json pointing to local /district-images/<file> paths.
 *
 * Run: node download_images.cjs
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const INPUT_JSON = path.join(__dirname, 'src/data/districtImages.json');
const OUTPUT_DIR = path.join(__dirname, 'public/district-images');
const OUTPUT_JSON = path.join(__dirname, 'src/data/districtImages.json');

// ── helpers ──────────────────────────────────────────────────────────────────

function safeName(district, topic) {
  return `${district}_${topic}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 80);
}

function extFromUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    const p = u.pathname.split('?')[0];
    const ext = path.extname(p).toLowerCase().split('?')[0];
    if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) return ext;
  } catch {}
  return '.jpg';
}

function download(urlStr, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (url, left) => {
      const mod = url.startsWith('https') ? https : http;
      const req = mod.get(url, {
        headers: {
          'User-Agent': 'GramSetu/1.0 (educational project)',
          'Accept': 'image/*,*/*'
        },
        timeout: 20000
      }, (res) => {
        if ([301, 302, 303, 307].includes(res.statusCode)) {
          const loc = res.headers.location;
          if (!loc) return reject(new Error('Redirect with no location'));
          attempt(loc, left);
          return;
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const out = fs.createWriteStream(destPath);
        res.pipe(out);
        out.on('finish', () => out.close(resolve));
        out.on('error', reject);
      });
      req.on('error', (err) => {
        if (left > 0) setTimeout(() => attempt(url, left - 1), 1500);
        else reject(err);
      });
      req.on('timeout', () => {
        req.destroy();
        if (left > 0) setTimeout(() => attempt(url, left - 1), 1500);
        else reject(new Error(`Timeout: ${url}`));
      });
    };
    attempt(urlStr, retries);
  });
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created: ${OUTPUT_DIR}`);
  }

  const data = JSON.parse(fs.readFileSync(INPUT_JSON, 'utf8'));
  const updated = {};
  let total = 0, done = 0, failed = 0;

  for (const d of Object.values(data)) total += Object.keys(d).length;
  console.log(`\nTotal images to download: ${total}\n`);

  for (const [district, topics] of Object.entries(data)) {
    updated[district] = {};
    for (const [topic, url] of Object.entries(topics)) {
      const ext = extFromUrl(url);
      const fname = `${safeName(district, topic)}${ext}`;
      const destPath = path.join(OUTPUT_DIR, fname);
      const localPath = `/district-images/${fname}`;

      // Skip if already downloaded
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
        done++;
        updated[district][topic] = localPath;
        console.log(`  [SKIP] ${district} / ${topic}`);
        continue;
      }

      try {
        await download(url, destPath);
        const size = fs.statSync(destPath).size;
        if (size < 500) throw new Error('File too small');
        done++;
        updated[district][topic] = localPath;
        console.log(`  [OK  ] ${district} / ${topic}  (${(size/1024).toFixed(1)} KB)`);
      } catch (err) {
        failed++;
        updated[district][topic] = url; // keep original URL as fallback
        console.error(`  [FAIL] ${district} / ${topic}  -- ${err.message}`);
      }

      await new Promise(r => setTimeout(r, 250));
    }
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(updated, null, 2));
  console.log(`\n[Done]  ${done} downloaded, ${failed} failed.`);
  console.log(`Updated: ${OUTPUT_JSON}`);
  console.log(`Images:  ${OUTPUT_DIR}`);
}

main().catch(err => { console.error(err); process.exit(1); });
