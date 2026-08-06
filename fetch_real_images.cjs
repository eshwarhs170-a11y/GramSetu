const fs = require('fs');
const https = require('https');

function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'GramSetuBot/1.0'
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

const terms = {
  "Tumkuru": {
    "Siddaganga Mutt": "Siddaganga Mutt",
    "Coconut Hub of Karnataka": "Coconut"
  },
  "Ramanagara": {
    "Silk Cocoon Capital": "Silkworm",
    "Vulture Sanctuary": "Indian vulture",
    "Cauvery Wildlife Sanctuary": "Indian leopard"
  },
  "Shivamogga": {
    "Keladi Kingdom History": "Keladi, Karnataka",
    "Coffee & Areca Nut": "Areca nut",
    "Linganamakki Reservoir": "Linganamakki Dam"
  },
  "Raichur": {
    "Cotton & Groundnut": "Peanut",
    "Veeragase & Goravara Kunitha": "Veeragase",
    "Raichur Thermal Power Station": "Raichur Thermal Power Station",
    "Paddy Granary": "Paddy field"
  },
  "Udupi": {
    "Malpe Beach & St. Mary's": "St. Mary's Islands",
    "Bhoota Kola": "Buta Kola",
    "Udupi Cuisine": "Masala dosa"
  },
  "Uttara Kannada": {
    "Dandeli Wildlife": "Bengal tiger",
    "Sirsi Arecanut": "Areca nut",
    "Vibhooti & Magod Falls": "Magod Falls"
  },
  "Vijayapura": {
    "Grape & Raisin Hub": "Grape",
    "Indi Lemon": "Lemon",
    "Bijapur Fort": "Malik-e-Maidan"
  },
  "Vijayanagara": {
    "Banana & Sugarcane": "Banana plantation"
  },
  "Yadgir": {
    "Yadgir Fort": "Yadgir",
    "Bheema River": "Bhima River",
    "Chintanalli": "Gavi Gangadhareshwara Temple",
    "Uranium Deposits": "Uranium mining",
    "Dhab Dhabhi Falls": "Magod Falls"
  },
  "Kolar": {
    "Kolar Gold Fields (KGF)": "Kolar Gold Fields",
    "Mango Cultivation": "Mango",
    "Dairy Production": "Dairy cattle",
    "Anthargange": "Anthargange"
  },
  "Kodagu": {
    "Martial Tradition": "Kodava people",
    "Dubare Elephant Camp": "Dubare"
  },
  "Mandya": {
    "Pandavapura Town": "Sugarcane"
  },
  "Mysuru": {
    "Sandalwood Capital": "Sandalwood"
  },
  "Hassan": {
    "Halebid — Hoysaleshwara Temple": "Hoysaleswara Temple",
    "Areca Nut Orchards": "Areca nut",
    "Hemavathi Reservoir": "Gorur Dam",
    "Hasanamba Temple": "Hasanamba temple"
  },
  "Haveri": {
    "Cotton Cultivation": "Cotton",
    "Guttal — Siddeshwara Temple": "Mukteshwara Temple, Chaudayyadanapura",
    "Dodderi Math": "Gadag-Betageri",
    "Kamsale & Bedara Vesha": "Yakshagana"
  },
  "Chikkamagaluru": {
    "Mullayanagiri Peak": "Mullayanagiri",
    "Coffee & Pepper Estates": "Coffee plantation"
  },
  "Chitradurga": {
    "Wind Farms": "Wind farm",
    "Vani Vilas Sagar": "Vani Vilas Sagar"
  },
  "Dakshina Kannada": {
    "Seafood Capital": "Seafood",
    "Cashew Processing Hub": "Cashew"
  },
  "Davanagere": {
    "Textile Mills": "Textile manufacturing",
    "Paddy & Arecanut": "Paddy field"
  },
  "Dharwad": {
    "Dharwad — Hindustani Music": "Hindustani classical music",
    "Sunflower & Jowar": "Sunflower",
    "Karadi Majalu Dance": "Folk dance in India",
    "University of Agricultural Sciences": "University of Agricultural Sciences, Dharwad"
  },
  "Gadag": {
    "Printing Hub": "Printing press",
    "Wind Energy": "Wind power",
    "Kumara Vyasa": "Kumara Vyasa",
    "Magadi Bird Sanctuary": "Bar-headed goose"
  }
};

async function run() {
  const file = 'src/data/districtImages.json';
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const dist in terms) {
    if (!data[dist]) continue;
    for (const highlight in terms[dist]) {
      const query = encodeURIComponent(terms[dist][highlight]);
      const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=960&generator=search&gsrsearch=${query}&gsrlimit=1`;
      
      try {
        const json = await fetchWithRetry(url);
        const pages = json.query?.pages;
        if (pages) {
          const page = Object.values(pages)[0];
          if (page.thumbnail) {
            data[dist][highlight] = page.thumbnail.source;
            console.log(`Updated [${dist}] ${highlight} -> ${page.thumbnail.source}`);
          } else {
            console.log(`No thumbnail for [${dist}] ${highlight}`);
          }
        } else {
          console.log(`No page found for [${dist}] ${highlight}`);
        }
      } catch (e) {
        console.log(`Error on [${dist}] ${highlight}: ${e.message}`);
      }
      await new Promise(r => setTimeout(r, 200)); // be nice to Wikipedia API
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("Done writing districtImages.json");
}

run();
