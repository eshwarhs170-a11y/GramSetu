const https = require('https');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
  // A pile of peanuts
  "Groundnut.jpg": "https://upload.wikimedia.org/wikipedia/commons/4/41/Peanuts_-_Arachis_hypogaea.jpg",
  // Ragi (Finger Millet) seeds (original size)
  "Ragi.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/53/Eleusine_coracana_seeds.jpg"
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
