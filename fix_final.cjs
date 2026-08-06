const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'GramSetuBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const terms = {
  "Bengaluru Urban": {
    "ISKCON Temple": "ISKCON Temple Bangalore",
    "Bengaluru Palace": "Bangalore Palace"
  },
  "Bagalkot": {
    "Pomegranate Hub": "Pomegranate fruit",
    "Almatti Dam": "Almatti Dam"
  },
  "Raichur": {
    "Paddy Granary": "Rice paddy",
    "Paddy & Arecanut": "Rice paddy" // for Davanagere
  },
  "Chamarajanagar": {
    "Turmeric Cultivation": "Turmeric"
  },
  "Dharwad": {
    "Karadi Majalu Dance": "Folk dance Karnataka" // try to find something better
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "Mullayanagiri",
    "Coffee & Pepper Estates": "Coffee beans"
  },
  "Haveri": {
    "Dodderi Math": "Hindu matha"
  },
  "Davanagere": {
    "Paddy & Arecanut": "Rice paddy"
  }
};

async function run() {
  const file = 'src/data/districtImages.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const dist in terms) {
    if (!data[dist]) continue;
    for (const highlight in terms[dist]) {
      const query = encodeURIComponent(terms[dist][highlight]);
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|info&inprop=url&format=json&generator=search&gsrsearch=${query}&gsrlimit=1&pithumbsize=1000`;
      
      const json = await fetchJson(url);
      const pages = json.query?.pages;
      if (pages) {
        const page = Object.values(pages)[0];
        if (page.thumbnail) {
          data[dist][highlight] = page.thumbnail.source;
          console.log(`Updated ${highlight}: ${page.thumbnail.source}`);
        }
      }
    }
  }

  // Also fix the ones that we know are black from before
  // Just remove ?width=960 from all Special:FilePath so they resolve properly
  for (const dist in data) {
    for (const key in data[dist]) {
      if (data[dist][key].includes('Special:FilePath')) {
         data[dist][key] = data[dist][key].split('?')[0];
      }
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("Done");
}

run();
