const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');

async function downloadFile(url, dest) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`HTTP ${response.status} for ${url}`);
      return false;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
    return true;
  } catch (error) {
    console.log(`Error downloading ${url}:`, error.message);
    return false;
  }
}

const imagesToUpdate = {
  // A bowl of boiled peanuts (very clearly groundnuts)
  "Groundnut.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Boiled_peanut.jpg",
  // Ragi from Unsplash (verified valid URL, returns 200)
  "Ragi.jpg": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
  // Coconut from Unsplash (verified valid URL)
  "Coconut.jpg": "https://images.unsplash.com/photo-1550583724-b2692b85b150"
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

main();
