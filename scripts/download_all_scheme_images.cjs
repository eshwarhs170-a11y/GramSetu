const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'schemes');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function downloadFile(url, destFilename) {
  return new Promise((resolve) => {
    const dest = path.join(publicDir, destFilename);
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (https://gramsetu.org; contact@gramsetu.org) Mozilla/5.0 Chrome/120.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': url.includes('wikimedia') ? 'https://commons.wikimedia.org/' : url
      },
      timeout: 15000,
      rejectUnauthorized: false
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = `${u.protocol}//${u.host}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
        }
        return downloadFile(redirectUrl, destFilename).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`[FAIL ${res.statusCode}] ${url}`);
        resolve(false);
        return;
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('finish', () => {
        ws.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size < 1000) {
            console.log(`[TOO SMALL ${stats.size}b] ${destFilename}`);
            fs.unlinkSync(dest);
            resolve(false);
          } else {
            console.log(`[SUCCESS ${(stats.size/1024).toFixed(1)} KB] ${destFilename} from ${url}`);
            resolve(true);
          }
        });
      });
      ws.on('error', (err) => {
        console.log(`[ERR write] ${destFilename}: ${err.message}`);
        resolve(false);
      });
    });
    req.on('error', (e) => {
      console.log(`[ERR req] ${url}: ${e.message}`);
      resolve(false);
    });
    req.on('timeout', () => {
      req.destroy();
      console.log(`[TIMEOUT] ${url}`);
      resolve(false);
    });
  });
}

// Search Wikimedia API for scheme image
function searchWikiMedia(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json`;
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (contact@gramsetu.org)'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.query || !json.query.pages) return resolve([]);
          const results = Object.values(json.query.pages).map(p => {
            const info = p.imageinfo && p.imageinfo[0];
            return {
              title: p.title,
              url: info ? info.url : null,
              width: info ? info.width : 0,
              height: info ? info.height : 0
            };
          }).filter(r => r.url && (r.url.endsWith('.jpg') || r.url.endsWith('.jpeg') || r.url.endsWith('.png') || r.url.endsWith('.webp')));
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const schemeSources = [
    {
      id: 'pm-kisan',
      file: 'pm-kisan.jpg',
      urls: [
        'https://pmkisan.gov.in/new_images/23rd-Installment_E.jpeg',
        'https://pmkisan.gov.in/new_images/PradhanMantriKisanSammanNidhi.jpg',
        'https://pmkisan.gov.in/new_images/PradhanMantriKisanSammanNidhiInugrate.jpg'
      ],
      wikiSearch: 'PM-Kisan'
    },
    {
      id: 'pmfby',
      file: 'pmfby.jpg',
      urls: [
        'https://samrakshane.karnataka.gov.in/Images/newlogo2.jpg',
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505887.jpg'
      ],
      wikiSearch: 'Pradhan Mantri Fasal Bima Yojana'
    },
    {
      id: 'kisan-credit-card',
      file: 'kisan-credit-card.jpg',
      urls: [
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505856.jpg'
      ],
      wikiSearch: 'Kisan Credit Card'
    },
    {
      id: 'raitha-siri',
      file: 'raitha-siri.jpg',
      urls: [
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1721387305.PNG',
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505709.jpg'
      ],
      wikiSearch: 'Millet farming Karnataka'
    },
    {
      id: 'krishi-bhagya',
      file: 'krishi-bhagya.jpg',
      urls: [
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1556622410.jpg',
        'https://raitamitra.karnataka.gov.in/uploads/storage/gallery/%E0%B2%95%E0%B3%83%E0%B2%B7%E0%B2%BF%20%E0%B2%87%E0%B2%B2%E0%B2%BE%E0%B2%96%E0%B3%86/1556622410.jpg'
      ],
      wikiSearch: 'Farm pond agriculture India'
    },
    {
      id: 'pm-kusum',
      file: 'pm-kusum.jpg',
      urls: [
        'https://agriinfra.dac.gov.in/Content/images/main_slider_solar.png'
      ],
      wikiSearch: 'Solar water pump agriculture India'
    },
    {
      id: 'rkvy-mechanization',
      file: 'rkvy-mechanization.jpg',
      urls: [
        'https://agrimachinery.nic.in/Images/SliderImages/1.jpg',
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505804.jpg'
      ],
      wikiSearch: 'Tractor agricultural machinery India'
    },
    {
      id: 'fpo-formation',
      file: 'fpo-formation.jpg',
      urls: [
        'https://agriinfra.dac.gov.in/Content/images/main_slider_sorting.png'
      ],
      wikiSearch: 'Farmer producer organization India'
    },
    {
      id: 'pm-aif',
      file: 'pm-aif.jpg',
      urls: [
        'https://agriinfra.dac.gov.in/Content/images/main_slider_cold_stores.png',
        'https://agriinfra.dac.gov.in/Content/images/main_slider_storage.png'
      ],
      wikiSearch: 'Cold storage warehouse India'
    },
    {
      id: 'soil-health-card',
      file: 'soil-health-card.jpg',
      urls: [
        'https://soilhealth.dac.gov.in/images/slider1.jpg'
      ],
      wikiSearch: 'Soil Health Card Scheme launch'
    },
    {
      id: 'coffee-dev',
      file: 'coffee-dev.jpg',
      urls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/800px-Roasted_coffee_beans.jpg'
      ],
      wikiSearch: 'Coffee plantation Karnataka Kodagu'
    },
    {
      id: 'gruha-lakshmi',
      file: 'gruha-lakshmi.jpg',
      urls: [
        'https://atimysore.karnataka.gov.in/uploads/banner_popup.jpeg'
      ],
      wikiSearch: 'Rural woman Karnataka'
    },
    {
      id: 'stree-shakti',
      file: 'stree-shakti.jpg',
      urls: [
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505856.jpg'
      ],
      wikiSearch: 'Self help group women India'
    },
    {
      id: 'rsk-network',
      file: 'rsk-network.jpg',
      urls: [
        'https://raitamitra.karnataka.gov.in/uploads/storage/slids/1607505709.jpg'
      ],
      wikiSearch: 'Raitha Samparka Kendra'
    },
    {
      id: 'kvk-centers',
      file: 'kvk-centers.jpg',
      urls: [
        'https://agriinfra.dac.gov.in/Content/images/main_slider_drone.png'
      ],
      wikiSearch: 'Krishi Vigyan Kendra'
    },
    {
      id: 'varuna-mitra',
      file: 'varuna-mitra.jpg',
      urls: [
        'https://ksndmc.karnataka.gov.in/images/slider/banner1.jpg'
      ],
      wikiSearch: 'Monsoon clouds rain India'
    }
  ];

  for (const s of schemeSources) {
    let downloaded = false;
    for (const u of s.urls) {
      downloaded = await downloadFile(u, s.file);
      if (downloaded) break;
    }
    if (!downloaded && s.wikiSearch) {
      console.log(`Searching wiki for ${s.id}: ${s.wikiSearch}...`);
      const wikiResults = await searchWikiMedia(s.wikiSearch);
      for (const w of wikiResults) {
        downloaded = await downloadFile(w.url, s.file);
        if (downloaded) break;
      }
    }
  }

  console.log('Done downloading scheme images!');
}

main();
