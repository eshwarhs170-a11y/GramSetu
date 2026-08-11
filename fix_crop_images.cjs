const fs = require('fs');
const path = require('path');

const cropInfoPath = path.join(__dirname, 'src', 'data', 'cropInfo.json');
const cropInfo = JSON.parse(fs.readFileSync(cropInfoPath, 'utf8'));

// Use the reliable Unsplash URLs from districtCrops.js cropImageMap
const cropImageMap = {
  "Maize": "https://images.unsplash.com/photo-1551754626-78724e3960d7?w=300&q=80",
  "Bengal gram": "https://images.unsplash.com/photo-1614838634994-d4eb61fbc10d?w=300&q=80",
  "Groundnut": "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=300&q=80",
  "Sunflower": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=300&q=80",
  "Jowar": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80",
  "Bajra": "https://images.unsplash.com/photo-1644053913076-2e97a31518f8?w=300&q=80",
  "Wheat": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80",
  "Tur": "https://images.unsplash.com/photo-1594958085444-f86a98f4df6d?w=300&q=80",
  "Chilli": "https://images.unsplash.com/photo-1595188846328-912b4ba3f42b?w=300&q=80",
  "Cotton": "https://images.unsplash.com/photo-1573215688537-8b01633fa7f2?w=300&q=80",
  "Paddy": "https://images.unsplash.com/photo-1586221590518-8f0a0c4927f8?w=300&q=80",
  "Sugarcane": "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=300&q=80",
  "Soybean": "https://images.unsplash.com/photo-1627581165215-2f9547d515a8?w=300&q=80",
  "Ragi": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&q=80",
  "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80",
  "Potato": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80",
  "Onion": "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&q=80",
  "Beans": "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?w=300&q=80",
  "Mulberry": "https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=300&q=80",
  "Finger millet": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&q=80",
  "Rice": "https://images.unsplash.com/photo-1586221590518-8f0a0c4927f8?w=300&q=80",
  "Green gram": "https://images.unsplash.com/photo-1602936998857-4b724b4f0b27?w=300&q=80",
  "Black gram": "https://images.unsplash.com/photo-1549610269-e0b02bb50c53?w=300&q=80",
  "Dry chilli": "https://images.unsplash.com/photo-1555543169-9da8b6284fbf?w=300&q=80",
  "Turmeric": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&q=80",
  "Tamarind": "https://images.unsplash.com/photo-1629813292455-832d2df1076b?w=300&q=80",
  "Sesame": "https://images.unsplash.com/photo-1610444315278-8ba943a96860?w=300&q=80",
  "Coconut": "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=300&q=80",
  "Arecanut": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80",
  "Green chilli": "https://images.unsplash.com/photo-1588612140404-5177265889ff?w=300&q=80",
  "Lime": "https://images.unsplash.com/photo-1550828520-4cb496926cb9?w=300&q=80",
  "Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80",
  "Castor seed": "https://images.unsplash.com/photo-1581404172403-18be9d8544ba?w=300&q=80",
  "Horse gram": "https://images.unsplash.com/photo-1601614917409-5a1e2634e2ab?w=300&q=80",
  "Cashew": "https://images.unsplash.com/photo-1585827725965-03714dfb0266?w=300&q=80",
  "Black pepper": "https://images.unsplash.com/photo-1596647970725-b8259d57a9df?w=300&q=80",
  "Banana": "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=300&q=80",
  "Ginger": "https://images.unsplash.com/photo-1615485984661-07300c144e05?w=300&q=80",
  "Cocoa": "https://images.unsplash.com/photo-1610444315278-8ba943a96860?w=300&q=80",
  "Rubber": "https://images.unsplash.com/photo-1586074211135-d2dcb2de4ccb?w=300&q=80",
  "Mango": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&q=80",
  "Tobacco": "https://images.unsplash.com/photo-1583307730825-78280f550bd4?w=300&q=80",
  "Cardamom": "https://images.unsplash.com/photo-1596647970725-b8259d57a9df?w=300&q=80",
  "Pineapple": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&q=80"
};

// Update each crop entry to use the Unsplash URL
for (const [crop, info] of Object.entries(cropInfo)) {
  if (cropImageMap[crop]) {
    info.image = cropImageMap[crop];
  }
}

fs.writeFileSync(cropInfoPath, JSON.stringify(cropInfo, null, 2));
console.log(`Updated ${Object.keys(cropInfo).length} crop images to use Unsplash URLs.`);
