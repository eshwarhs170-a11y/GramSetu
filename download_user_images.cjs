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
  "Ragi.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRxxaW9OYI4eOWWDuB62igOQAk8KxTnOACzoYknBuVYw&s=10",
  "Groundnut.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0dRxg_I-fscshhF7dL8Ss3mINS-yGsW6lfEG9OE-FQ&s=10",
  "Coconut.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBKKkVWAF5gp7WP4MQusYeCth_IVBvtCMXtG2A2YKjoA&s=10"
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
