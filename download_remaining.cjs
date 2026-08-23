const fs = require('fs');
const https = require('https');
const path = require('path');

const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

function downloadImage(url, dest, retries = 5, delay = 2000) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'GramSetu-Local-Downloader/1.0' } }, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
      } else if (res.statusCode === 429 && retries > 0) {
        console.log(`Rate limited on ${url}, retrying in ${delay}ms...`);
        setTimeout(() => resolve(downloadImage(url, dest, retries - 1, delay * 2)), delay);
      } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(downloadImage(res.headers.location, dest, retries, delay));
      } else {
        console.error(`Failed to download ${url} - Status: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      if (retries > 0) {
        console.log(`Error on ${url}, retrying in ${delay}ms...`);
        setTimeout(() => resolve(downloadImage(url, dest, retries - 1, delay * 2)), delay);
      } else {
        console.error(`Error downloading ${url}:`, err.message);
        resolve(false);
      }
    });
  });
}

async function main() {
  let changed = false;
  
  for (const dist in data) {
    for (const hl in data[dist]) {
      const val = data[dist][hl];
      if (val.startsWith('http')) {
        const ext = val.split('?')[0].split('.').pop().toLowerCase() === 'png' ? 'png' : 'jpg';
        const formatted = dist.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '_' + hl.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const localPath = `public/district-images/${formatted}.${ext}`;
        
        console.log(`Downloading ${val} to ${localPath}...`);
        
        // Ensure directory exists
        if (!fs.existsSync('public/district-images')) {
          fs.mkdirSync('public/district-images', { recursive: true });
        }

        const success = await downloadImage(val, localPath);
        if (success) {
          data[dist][hl] = `/district-images/${formatted}.${ext}`;
          changed = true;
          console.log(`Success: ${localPath}`);
        }
        
        await new Promise(r => setTimeout(r, 1000)); // sleep 1s between requests
      }
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('districtImages.json updated successfully!');
  } else {
    console.log('No new images were downloaded or updated.');
  }
}

main();
