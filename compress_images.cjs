const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = 'public/district-images';
const MAX_WIDTH = 800;
const JPEG_QUALITY = 75;
const PNG_QUALITY = 80;

async function compressImages() {
  const files = fs.readdirSync(dir);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const statBefore = fs.statSync(filePath);
    totalBefore += statBefore.size;

    const tempPath = filePath + '.tmp';

    try {
      let sharpInst = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

      if (ext === '.png') {
        await sharpInst.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(tempPath);
      } else {
        await sharpInst.jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tempPath);
      }

      const statAfter = fs.statSync(tempPath);
      totalAfter += statAfter.size;

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const before = Math.round(statBefore.size / 1024);
      const after = Math.round(statAfter.size / 1024);
      console.log(`${file}: ${before}KB -> ${after}KB`);
    } catch (e) {
      console.error(`Error processing ${file}: ${e.message}`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const afterMB = (totalAfter / 1024 / 1024).toFixed(1);
  console.log(`\nTotal: ${beforeMB}MB -> ${afterMB}MB (saved ${(totalBefore - totalAfter) / 1024 / 1024 .toFixed(1)}MB)`);
}

compressImages();
