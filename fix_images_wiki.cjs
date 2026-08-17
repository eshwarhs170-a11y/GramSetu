const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src', 'data', 'cropInfo.json');
let data = JSON.parse(fs.readFileSync(p, 'utf8'));

const bestImages = {
  "Maize": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Corn_cob.jpg/800px-Corn_cob.jpg",
  "Groundnut": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Peanuts_-_in_shells.jpg/800px-Peanuts_-_in_shells.jpg",
  "Coconut": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Coconut_on_tree.jpg/800px-Coconut_on_tree.jpg",
  "Sunflower": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/800px-Sunflower_sky_backdrop.jpg",
  "Wheat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Vehn%C3%A4pelto_6.jpg/800px-Vehn%C3%A4pelto_6.jpg",
  "Paddy": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rice_field_-_panoramio.jpg/800px-Rice_field_-_panoramio.jpg",
  "Rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rice_field_-_panoramio.jpg/800px-Rice_field_-_panoramio.jpg",
  "Ragi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Finger_millet_Eleusine_coracana.jpg/800px-Finger_millet_Eleusine_coracana.jpg",
  "Finger millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Finger_millet_Eleusine_coracana.jpg/800px-Finger_millet_Eleusine_coracana.jpg",
  "Cotton": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CottonPlant.JPG/800px-CottonPlant.JPG",
  "Arecanut": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Areca_nut_bunch.jpg/800px-Areca_nut_bunch.jpg",
  "Coffee": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/800px-Roasted_coffee_beans.jpg",
  "Silk Cocoon": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Silk_cocoons.jpg/800px-Silk_cocoons.jpg",
  "Jowar": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sorghum_bicolor03.jpg/800px-Sorghum_bicolor03.jpg",
  "Tomato": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg",
  "Onion": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/800px-Onion_on_White.JPG",
  "Sugarcane": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sugarcane.jpg/800px-Sugarcane.jpg",
  "Turmeric": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Curcuma_longa_roots.jpg/800px-Curcuma_longa_roots.jpg",
  "Bengal gram": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chickpea_BNC.jpg/800px-Chickpea_BNC.jpg",
  "Tur": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Cajanus_cajan_Blanco1.167-cropped.jpg/800px-Cajanus_cajan_Blanco1.167-cropped.jpg"
};

for (const [crop, imgUrl] of Object.entries(bestImages)) {
  if (data[crop]) {
    data[crop].image = imgUrl;
  }
}

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Fixed Wikipedia images with high quality photos!');
