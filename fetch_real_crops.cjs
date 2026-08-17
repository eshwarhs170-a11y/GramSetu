const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');

async function downloadFile(url, dest) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
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
  // A bowl of peanuts (Groundnut)
  "Groundnut.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/de/Peanuts_in_a_bowl.jpg",
  // Ragi (Finger Millet) seeds
  "Ragi.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/53/Eleusine_coracana_seeds.jpg",
  // Real coconut photo
  "Coconut.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coconut_on_white.jpg"
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
