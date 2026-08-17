const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'crops');

async function downloadFile(url, dest) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
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
  "Bengal_gram.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJK4cC2vI6TRseM8iMN7hbXPYwm5HGrhcF1NULLbA4eA&s=10",
  "Soyabean.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkc_ouSA7mMF3XNfUaq8ZRAapCmwq4K1DtL5SlUp-cIw&s=10",
  "Chilli.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlcDTpr-mHokqqcOcd4j8gXfRn3z8vAqdGO9M540lOrA&s=10"
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
