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
  "Arecanut.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqKg55I6-uBGms5EXehhe52jRu6ic2Jc5t7ALwzSPyFw&s=10",
  "Sugarcane.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WBsG1yDqxg4LS3N8dx_7ybtSKz_SRbfMGXoB1LFJDg&s=10",
  "Coffee.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7EcH_5hLOqCPlpAfyrMfFCQkL0_EBUk8wMxwuzNb-mg&s=10",
  "Rice.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGXR2o_MmuDiQRm4EHPAv7A80Sf7Ga43PtJcGF7l2Cg&s=10",
  "Black_pepper.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTdyhyVM4lf2NhfoyD52Q3wP2YNdrsaUJ2fR1vuXRK_Q&s=10",
  "Banana.jpg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGOJv8EY-uPWEftHnP3A296KgDDwiEbjIb17rCEh7IGg&s=10"
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
