const fs = require('fs');
const https = require('https');

function fetchWithRetry(url, retries = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0 (https://github.com/eshwarhs170-a11y/GramSetu)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 429) {
            if (retries > 0) {
              console.log('  Rate limited, waiting 5s...');
              setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 5000);
            } else {
              reject(new Error('Rate limited after retries'));
            }
            return;
          }
          if (res.statusCode !== 200) throw new Error('HTTP ' + res.statusCode);
          resolve(JSON.parse(data));
        } catch (e) {
          if (retries > 0) {
            setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 3000);
          } else {
            reject(e);
          }
        }
      });
    }).on('error', (e) => {
      if (retries > 0) {
        setTimeout(() => resolve(fetchWithRetry(url, retries - 1)), 3000);
      } else {
        reject(e);
      }
    });
  });
}

// Only the ones that failed (HTTP 429 or no thumbnail)
const terms = {
  "Raichur": {
    "Raichur Thermal Power Station": "Raichur Thermal Power Station",
    "Paddy Granary": "Rice paddy India"
  },
  "Yadgir": {
    "Yadgir Fort": "Yadgir Fort Karnataka",
    "Bheema River": "Bhima River India",
    "Chintanalli": "Gavi Gangadhareshwara Temple Bangalore",
    "Uranium Deposits": "Uranium ore",
    "Dhab Dhabhi Falls": "Waterfall Karnataka"
  },
  "Kolar": {
    "Kolar Gold Fields (KGF)": "Kolar Gold Fields mine"
  },
  "Hassan": {
    "Hasanamba Temple": "Hasanamba temple Hassan"
  },
  "Haveri": {
    "Cotton Cultivation": "Cotton plant field",
    "Guttal — Siddeshwara Temple": "Siddhesvara Temple Haveri",
    "Dodderi Math": "Karnataka math monastery",
    "Kamsale & Bedara Vesha": "Bedara Vesha Karnataka"
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "Mullayanagiri",
    "Coffee & Pepper Estates": "Coffee plantation India"
  },
  "Gadag": {
    "Printing Hub": "Printing press India",
    "Wind Energy": "Wind turbine India",
    "Kumara Vyasa": "Kumara Vyasa poet",
    "Magadi Bird Sanctuary": "Indian bird sanctuary"
  },
  "Chitradurga": {
    "Vani Vilas Sagar": "Vani Vilas Sagar Dam"
  },
  "Dharwad": {
    "Dharwad — Hindustani Music": "Hindustani music sitar",
    "Karadi Majalu Dance": "Karnataka folk dance",
    "University of Agricultural Sciences": "Agricultural university India"
  }
};

async function run() {
  const file = 'src/data/districtImages.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const dist in terms) {
    if (!data[dist]) continue;
    for (const highlight in terms[dist]) {
      const query = encodeURIComponent(terms[dist][highlight]);
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=960&generator=search&gsrsearch=${query}&gsrlimit=3`;
      
      try {
        console.log(`Fetching [${dist}] ${highlight}...`);
        const json = await fetchWithRetry(url);
        const pages = json.query?.pages;
        if (pages) {
          // Try to find the first page with a thumbnail
          const pagesArr = Object.values(pages);
          for (const page of pagesArr) {
            if (page.thumbnail) {
              data[dist][highlight] = page.thumbnail.source;
              console.log(`  -> ${page.thumbnail.source.substring(0, 80)}...`);
              break;
            }
          }
        } else {
          console.log(`  No results`);
        }
      } catch (e) {
        console.log(`  ERROR: ${e.message}`);
      }
      // Wait 2 seconds between each request
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("\nDone writing districtImages.json");
}

run();
