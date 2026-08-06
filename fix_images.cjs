const fs = require('fs');
const https = require('https');

const file = 'src/data/districtImages.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const corrections = {
  "Tumkuru": {
    "Siddaganga Mutt": "https://commons.wikimedia.org/wiki/Special:FilePath/Sree_Siddaganga_Mutt.jpg?width=960",
    "Coconut Hub of Karnataka": "https://commons.wikimedia.org/wiki/Special:FilePath/Coconuts.jpg?width=960"
  },
  "Ramanagara": {
    "Silk Cocoon Capital": "https://commons.wikimedia.org/wiki/Special:FilePath/Silkworm_cocoons.jpg?width=960",
    "Vulture Sanctuary": "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_vulture.jpg?width=960",
    "Cauvery Wildlife Sanctuary": "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_leopard.jpg?width=960"
  },
  "Shivamogga": {
    "Keladi Kingdom History": "https://commons.wikimedia.org/wiki/Special:FilePath/Keladi_Rameshwara_Temple.jpg?width=960",
    "Coffee & Areca Nut": "https://commons.wikimedia.org/wiki/Special:FilePath/Areca_nut_tree.jpg?width=960",
    "Linganamakki Reservoir": "https://commons.wikimedia.org/wiki/Special:FilePath/Linganamakki_Dam.jpg?width=960"
  },
  "Raichur": {
    "Cotton & Groundnut": "https://commons.wikimedia.org/wiki/Special:FilePath/Peanuts.jpg?width=960",
    "Veeragase & Goravara Kunitha": "https://commons.wikimedia.org/wiki/Special:FilePath/Veeragase.jpg?width=960",
    "Raichur Thermal Power Station": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Raichur_Thermal_Power_Station.jpg/960px-Raichur_Thermal_Power_Station.jpg",
    "Paddy Granary": "https://commons.wikimedia.org/wiki/Special:FilePath/Paddy_field.jpg?width=960"
  },
  "Udupi": {
    "Malpe Beach & St. Mary's": "https://commons.wikimedia.org/wiki/Special:FilePath/St._Mary's_Island.jpg?width=960",
    "Bhoota Kola": "https://commons.wikimedia.org/wiki/Special:FilePath/Bhuta_Kola.jpg?width=960",
    "Udupi Cuisine": "https://commons.wikimedia.org/wiki/Special:FilePath/Masala_dosa.jpg?width=960"
  },
  "Uttara Kannada": {
    "Dandeli Wildlife": "https://commons.wikimedia.org/wiki/Special:FilePath/Bengal_tiger.jpg?width=960",
    "Sirsi Arecanut": "https://commons.wikimedia.org/wiki/Special:FilePath/Areca_nut_tree.jpg?width=960",
    "Vibhooti & Magod Falls": "https://commons.wikimedia.org/wiki/Special:FilePath/Magod_Falls.jpg?width=960"
  },
  "Vijayapura": {
    "Grape & Raisin Hub": "https://commons.wikimedia.org/wiki/Special:FilePath/Grapes.jpg?width=960",
    "Indi Lemon": "https://commons.wikimedia.org/wiki/Special:FilePath/Lemons.jpg?width=960",
    "Bijapur Fort": "https://commons.wikimedia.org/wiki/Special:FilePath/Malik_e_Maidan.jpg?width=960"
  },
  "Vijayanagara": {
    "Banana & Sugarcane": "https://commons.wikimedia.org/wiki/Special:FilePath/Banana_plantation.jpg?width=960"
  },
  "Yadgir": {
    "Yadgir Fort": "https://commons.wikimedia.org/wiki/Special:FilePath/Yadgir_Fort.png?width=960",
    "Bheema River": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bhima_River_near_Pandharpur.jpg/960px-Bhima_River_near_Pandharpur.jpg",
    "Chintanalli": "https://commons.wikimedia.org/wiki/Special:FilePath/Gavi_Gangadhareshwara_Temple.jpg?width=960",
    "Uranium Deposits": "https://commons.wikimedia.org/wiki/Special:FilePath/Ranger_Uranium_Mine.jpg?width=960",
    "Dhab Dhabhi Falls": "https://commons.wikimedia.org/wiki/Special:FilePath/Magod_Falls.jpg?width=960"
  },
  "Kolar": {
    "Kolar Gold Fields (KGF)": "https://commons.wikimedia.org/wiki/Special:FilePath/Kolar_Gold_Fields.jpg?width=960",
    "Mango Cultivation": "https://commons.wikimedia.org/wiki/Special:FilePath/Mangoes.jpg?width=960",
    "Dairy Production": "https://commons.wikimedia.org/wiki/Special:FilePath/Dairy_cows.jpg?width=960",
    "Anthargange": "https://commons.wikimedia.org/wiki/Special:FilePath/Anthargange_hills.jpg?width=960"
  },
  "Kodagu": {
    "Martial Tradition": "https://commons.wikimedia.org/wiki/Special:FilePath/Kodava_people.jpg?width=960",
    "Dubare Elephant Camp": "https://commons.wikimedia.org/wiki/Special:FilePath/Dubare_elephant_camp.jpg?width=960"
  },
  "Mandya": {
    "Pandavapura Town": "https://commons.wikimedia.org/wiki/Special:FilePath/Sugarcane.jpg?width=960"
  },
  "Mysuru": {
    "Sandalwood Capital": "https://commons.wikimedia.org/wiki/Special:FilePath/Sandalwood.jpg?width=960"
  },
  "Hassan": {
    "Halebid — Hoysaleshwara Temple": "https://commons.wikimedia.org/wiki/Special:FilePath/Hoysaleswara_Temple_at_Halebidu.jpg?width=960",
    "Areca Nut Orchards": "https://commons.wikimedia.org/wiki/Special:FilePath/Areca_nut_tree.jpg?width=960",
    "Hemavathi Reservoir": "https://commons.wikimedia.org/wiki/Special:FilePath/Gorur_Dam.jpg?width=960",
    "Hasanamba Temple": "https://commons.wikimedia.org/wiki/Special:FilePath/Hasanamba_temple.jpg?width=960"
  },
  "Haveri": {
    "Cotton Cultivation": "https://commons.wikimedia.org/wiki/Special:FilePath/Cotton.jpg?width=960",
    "Guttal — Siddeshwara Temple": "https://commons.wikimedia.org/wiki/Special:FilePath/Siddhesvara_Temple_at_Haveri.jpg?width=960",
    "Dodderi Math": "https://commons.wikimedia.org/wiki/Special:FilePath/Tontadarya_Matha.jpg?width=960",
    "Kamsale & Bedara Vesha": "https://commons.wikimedia.org/wiki/Special:FilePath/Yakshagana.jpg?width=960"
  }
};

for (const dist in corrections) {
  if (data[dist]) {
    for (const highlight in corrections[dist]) {
      if (data[dist][highlight]) {
        data[dist][highlight] = corrections[dist][highlight];
      }
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Updated images.");
