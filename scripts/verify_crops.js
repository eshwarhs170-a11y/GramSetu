import { CROP_DISEASES, UNIQUE_CROPS, demoCards, getAgriProductLink } from '../src/data/cropDiseasesData.js';

console.log('Total CROP_DISEASES:', CROP_DISEASES.length);
console.log('Total UNIQUE_CROPS:', UNIQUE_CROPS.length);
console.log('Total demoCards:', demoCards.length);

let errors = 0;
let productCount = 0;

CROP_DISEASES.forEach((d, idx) => {
  const reqFields = [
    'crop', 'disease', 'diseaseKn', 'diseaseHi',
    'remedy', 'remedyKn', 'remedyHi',
    'fertilizer', 'fertilizerKn', 'fertilizerHi',
    'keyTakeaways', 'keyTakeawaysKn', 'keyTakeawaysHi'
  ];
  for (const f of reqFields) {
    if (!d[f]) {
      console.error(`Disease #${idx} (${d.crop} - ${d.disease}) missing ${f}`);
      errors++;
    }
  }
  if (!Array.isArray(d.products) || d.products.length === 0) {
    console.error(`Disease #${idx} (${d.crop} - ${d.disease}) has no products`);
    errors++;
  } else {
    d.products.forEach((p, pIdx) => {
      productCount++;
      if (!p.name || !p.price || !p.query) {
        console.error(`Disease #${idx} prod #${pIdx} invalid:`, p);
        errors++;
      }
      const link = getAgriProductLink(p.query);
      if (!link.startsWith('https://dir.indiamart.com/search.mp?ss=')) {
        console.error(`Bad link: ${link}`);
        errors++;
      }
    });
  }
});

demoCards.forEach((d, idx) => {
  const reqFields = [
    'crop', 'disease', 'diseaseKn', 'diseaseHi',
    'remedy', 'remedyKn', 'remedyHi',
    'fertilizer', 'fertilizerKn', 'fertilizerHi',
    'products'
  ];
  for (const f of reqFields) {
    if (!d[f]) {
      console.error(`demoCards #${idx} missing ${f}`);
      errors++;
    }
  }
});

console.log(`Validation complete! Total verified products across all crops: ${productCount}. Errors: ${errors}`);
if (errors === 0) {
  console.log('ALL CROPS AND PRODUCTS PASSED VERIFICATION!');
}
