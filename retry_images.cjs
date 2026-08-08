/**
 * retry_images.cjs
 * Retries only the images that still have Wikipedia URLs in districtImages.json.
 * Uses longer delays + Wikimedia thumbnail API to avoid rate limits.
 *
 * Run: node retry_images.cjs
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const JSON_PATH = path.join(__dirname, 'src/data/districtImages.json');
const OUTPUT_DIR = path.join(__dirname, 'public/district-images');

// ── helpers ───────────────────────────────────────────────────────────────────

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
    const ext = path.extname(p).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) return ext;
  } catch {}
  return '.jpg';
}

/** Convert a full Wikimedia commons URL to a thumbnail URL (800px wide) */
function toThumbnailUrl(urlStr) {
  try {
    // strip query params first
    const clean = urlStr.split('?')[0];
    const u = new URL(clean);
    // /wikipedia/commons/a/ab/Filename.jpg
    //  => /wikipedia/commons/thumb/a/ab/Filename.jpg/800px-Filename.jpg
    const m = u.pathname.match(/^(\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\/)(.+)$/i);
    if (m) {
      const filename = m[2];
      return `https://upload.wikimedia.org/wikipedia/commons/thumb${m[1].replace('/wikipedia/commons/', '/')}${filename}/800px-${filename}`;
    }
  } catch {}
  return urlStr; // fall back to original
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function download(urlStr, destPath) {
  return new Promise((resolve, reject) => {
    const attempt = (url, redirectsLeft) => {
      const mod = url.startsWith('https') ? https : http;
      const req = mod.get(url, {
        headers: {
          'User-Agent': 'GramSetu/1.0 (educational; eshwarhs170@gmail.com)',
          'Accept': 'image/*,*/*'
        },
        timeout: 30000
      }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
          if (!redirectsLeft) return reject(new Error('Too many redirects'));
          const loc = res.headers.location;
          if (!loc) return reject(new Error('Redirect: no location'));
          res.resume();
          attempt(loc, redirectsLeft - 1);
          return;
        }
        if (res.statusCode === 429) {
          res.resume();
          return reject(new Error(`HTTP 429 (rate limit)`));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const out = fs.createWriteStream(destPath);
        res.pipe(out);
        out.on('finish', () => out.close(resolve));
        out.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
      });
      req.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
      req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    };
    attempt(urlStr, 5);
  });
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  // Collect only entries that still have Wikipedia URLs (i.e. failed last time)
  const todo = [];
  for (const [district, topics] of Object.entries(data)) {
    for (const [topic, url] of Object.entries(topics)) {
      if (url.startsWith('http')) { // still an external URL, not yet local
        const ext = extFromUrl(url);
        const fname = `${safeName(district, topic)}${ext}`;
        todo.push({ district, topic, url, fname });
      }
    }
  }

  console.log(`\nImages still needing download: ${todo.length}\n`);

  let done = 0, failed = 0;

  for (const { district, topic, url, fname } of todo) {
    const destPath = path.join(OUTPUT_DIR, fname);
    const localPath = `/district-images/${fname}`;

    // Already exists and is valid?
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      data[district][topic] = localPath;
      done++;
      console.log(`  [SKIP] ${district} / ${topic}`);
      continue;
    }

    // Try thumbnail URL first, then original
    const thumbUrl = toThumbnailUrl(url);
    const urls = thumbUrl !== url ? [thumbUrl, url] : [url];

    let success = false;
    for (const tryUrl of urls) {
      try {
        await download(tryUrl, destPath);
        const size = fs.statSync(destPath).size;
        if (size < 500) throw new Error('File too small');
        data[district][topic] = localPath;
        done++;
        console.log(`  [OK  ] ${district} / ${topic}  (${(size/1024).toFixed(1)} KB)`);
        success = true;
        break;
      } catch (err) {
        console.log(`         tried: ${tryUrl.slice(0, 80)} → ${err.message}`);
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        await sleep(3000); // wait 3s before trying next URL
      }
    }

    if (!success) {
      failed++;
      console.error(`  [FAIL] ${district} / ${topic}`);
    }

    // Save progress after every image
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));

    // Respectful delay between requests: 2.5 seconds
    await sleep(2500);
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
  console.log(`\n✓ Done!  ${done} local, ${failed} still failed.`);
  console.log(`✓ JSON saved: ${JSON_PATH}`);
}

main().catch(err => { console.error(err); process.exit(1); });
