const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src', 'data', 'districtPrices.json');
let data = JSON.parse(fs.readFileSync(p, 'utf8'));

for (let dist in data) {
  for (let item of data[dist]) {
    if (item.crop === "Bengal" && item.market.startsWith("gram ")) {
      item.crop = "Bengal gram";
      item.market = item.market.substring(5);
    }
    if (item.crop === "Black" && item.market.startsWith("gram ")) {
      item.crop = "Black gram";
      item.market = item.market.substring(5);
    }
    if (item.crop === "Green" && item.market.startsWith("gram ")) {
      item.crop = "Green gram";
      item.market = item.market.substring(5);
    }
    if (item.crop === "Horse" && item.market.startsWith("gram ")) {
      item.crop = "Horse gram";
      item.market = item.market.substring(5);
    }
    if (item.crop === "Black" && item.market.startsWith("pepper ")) {
      item.crop = "Black pepper";
      item.market = item.market.substring(7);
    }
    if (item.crop === "Castor" && item.market.startsWith("seed ")) {
      item.crop = "Castor seed";
      item.market = item.market.substring(5);
    }
    if (item.crop === "Finger" && item.market.startsWith("millet ")) {
      item.crop = "Finger millet";
      item.market = item.market.substring(7);
    }
    if (item.crop === "Dry" && item.market.startsWith("chilli ")) {
      item.crop = "Dry chilli";
      item.market = item.market.substring(7);
    }
    if (item.crop === "Green" && item.market.startsWith("chilli ")) {
      item.crop = "Green chilli";
      item.market = item.market.substring(7);
    }
  }
}

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Fixed OCR splits in districtPrices.json');
