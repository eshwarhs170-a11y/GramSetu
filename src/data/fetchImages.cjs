const fs = require('fs');
const https = require('https');

async function importData() {
  const { districtData } = await import('./districtsData.js');
  return districtData;
}

function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (https://github.com/eshwarhs170-a11y/GramSetu; contact@example.com)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) throw new Error('HTTP ' + res.statusCode);
          resolve(JSON.parse(data));
        } catch (e) {
          if (retries > 0) {
            setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 1000);
          } else {
            reject(e);
          }
        }
      });
    }).on('error', (e) => {
      if (retries > 0) {
        setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 1000);
      } else {
        reject(e);
      }
    });
  });
}

async function run() {
  const districtData = await importData();
  const images = {};
  
  for (const [distName, data] of Object.entries(districtData)) {
    images[distName] = {};
    for (const h of data.highlights) {
      try {
        const query = encodeURIComponent(h.title + ' Karnataka');
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=800&generator=search&gsrsearch=${query}&gsrlimit=1`;
        
        const json = await fetchWithRetry(url);
        const pages = json.query?.pages;
        if (pages) {
          const page = Object.values(pages)[0];
          if (page.thumbnail) {
            images[distName][h.title] = page.thumbnail.source;
            console.log('Found:', h.title, '->', page.thumbnail.source);
            // Delay 300ms
            await new Promise(r => setTimeout(r, 300));
            continue;
          }
        }
        console.log('Not found (no thumbnail):', h.title);
      } catch (e) {
        console.log('Error:', h.title, e.message);
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }
  
  fs.writeFileSync('./districtImages.json', JSON.stringify(images, null, 2));
  console.log('Done writing districtImages.json');
}

run();
