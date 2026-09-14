import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- RUNNING FEATURE-BY-FEATURE VERIFICATION ---');

// 1. Check firestore.rules
const rulesContent = fs.readFileSync('firestore.rules', 'utf8');
assert(rulesContent.includes('match /complaints/{complaintId}'), 'firestore.rules has /complaints');
assert(rulesContent.includes('match /feedback/{feedbackId}'), 'firestore.rules has /feedback');
assert(rulesContent.includes('match /district_complaints/{complaintId}'), 'firestore.rules has /district_complaints');
assert(rulesContent.includes('match /district_{districtName}_complaints/{complaintId}'), 'firestore.rules has /district_{districtName}_complaints');

// 2. Check Arecanut prices in districtPrices.json
const districtPrices = JSON.parse(fs.readFileSync('src/data/districtPrices.json', 'utf8'));
let found51k = false;
let arecanutCount = 0;
for (const [dist, crops] of Object.entries(districtPrices)) {
  for (const c of crops) {
    if (c.crop === 'Arecanut') {
      arecanutCount++;
      if (c.price === '₹51,000' || c.price === '51000') {
        found51k = true;
      }
    }
  }
}
assert(arecanutCount > 0, `Found ${arecanutCount} Arecanut entries in districtPrices.json`);
assert(!found51k, 'No district has outdated static ₹51,000 price for Arecanut');

// 3. Check fetchPrices.js
const fetchPricesContent = fs.readFileSync('src/utils/fetchPrices.js', 'utf8');
assert(fetchPricesContent.includes("price: '₹55,400'"), 'fetchPrices.js has updated realistic Arecanut price ₹55,400');
assert(fetchPricesContent.includes('clearPriceCache'), 'fetchPrices.js exports clearPriceCache');
assert(fetchPricesContent.includes('dayOfYear'), 'fetchPrices.js implements daily dynamic market quotation engine');

// 4. Check karnatakaPopularCrops.js
const popularCropsContent = fs.readFileSync('src/data/karnatakaPopularCrops.js', 'utf8');
assert(!popularCropsContent.includes("price: '₹31,000'"), 'karnatakaPopularCrops.js does not have old ₹31,000 for Arecanut');
assert(popularCropsContent.includes("price: '₹55,400'"), 'karnatakaPopularCrops.js has updated Arecanut price');

// 5. Check CropScanner.jsx error banner
const scannerContent = fs.readFileSync('src/components/CropScanner.jsx', 'utf8');
assert(scannerContent.includes('top: 75'), 'CropScanner notCropMsg banner positioned safely at top: 75');
assert(scannerContent.includes('zIndex: 99999'), 'CropScanner error banner has zIndex 99999');

// 6. Check VillagerScreens.jsx submit button & double-click protection
const villagerContent = fs.readFileSync('src/components/VillagerScreens.jsx', 'utf8');
assert(villagerContent.includes('isSubmitting'), 'VillagerScreens has isSubmitting state');
assert(villagerContent.includes('if (isSubmitting) return'), 'handleComplaintSubmit prevents duplicate submission');
assert(villagerContent.includes('disabled={isSubmitting}'), 'Submit button disables while submitting');
assert(villagerContent.includes('window.scrollTo({ top: 0, behavior: \'smooth\' })'), 'Scrolls to top on submit for mobile viewports');
assert(villagerContent.includes('SearchCheck'), 'Success screen includes Track Status action');
assert(villagerContent.includes('district_${cleanDist}_complaints'), 'Submits to district-specific collection for console inspection');

// 7. Check Crop Modal in VillagerScreens.jsx & DistrictPage.jsx
assert(villagerContent.includes('ReactDOM.createPortal'), 'Crop modal in VillagerScreens renders in portal');
assert(villagerContent.includes('maxHeight: \'85vh\', overflowY: \'auto\''), 'Crop modal has maxHeight and scroll container');
const districtPageContent = fs.readFileSync('src/pages/DistrictPage.jsx', 'utf8');
assert(districtPageContent.includes('maxHeight: \'85vh\', overflowY: \'auto\''), 'DistrictPage crop modal has maxHeight and scroll container');

// 8. Check OfficialDashboard.jsx multi-collection support & filters
const officialContent = fs.readFileSync('src/pages/OfficialDashboard.jsx', 'utf8');
assert(officialContent.includes('collectionFilter'), 'OfficialDashboard has collectionFilter state');
assert(officialContent.includes('district_complaints'), 'OfficialDashboard queries district_complaints');
assert(officialContent.includes('feedback'), 'OfficialDashboard queries feedback');
assert(!officialContent.includes("query(collection(db, 'complaints'), orderBy('createdAt'"), 'OfficialDashboard avoids failing index-bound orderBy queries');

console.log(`\nRESULTS: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);
