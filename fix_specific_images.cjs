const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { 
        console.log(`HTTP ${res.statusCode} for ${url}`);
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

const imagesToUpdate = {
  // A nice pile of unshelled peanuts
  "Groundnut.jpg": "https://images.unsplash.com/photo-1596547610662-3fb628290fdb?w=800&q=80",
  // Real coconuts on a table
  "Coconut.jpg": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80",
  // Ragi (Finger Millet) seeds from Wikimedia Commons (direct image of the grains, highly recognizable)
  "Ragi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eleusine_coracana_seeds.jpg/800px-Eleusine_coracana_seeds.jpg"
};

async function main() {
  for (const [filename, url] of Object.entries(imagesToUpdate)) {
    const destPath = path.join(publicDir, filename);
    console.log(`Downloading ${filename}...`);
    const ok = await downloadFile(url, destPath);
    if (ok) {
      const size = fs.statSync(destPath).size;
      console.log(`✅ Saved ${filename} (${(size/1024).toFixed(0)}KB)`);
    } else {
      console.log(`❌ Failed to download ${filename}`);
    }
  }
}

main().catch(console.error);
