const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add import for districtPrices.json
if (!content.includes("import districtPricesMap from '../data/districtPrices.json'")) {
  content = content.replace(
    "import cropInfoMap from '../data/cropInfo.json'",
    "import cropInfoMap from '../data/cropInfo.json'\nimport districtPricesMap from '../data/districtPrices.json'"
  );
}

// 2. Change the prices state to load dynamic data based on userDistrict instead of kaPrices
if (!content.includes("const loadDynamicPrices = () => {")) {
  const oldPriceState = `
  const [livePrices, setLivePrices] = useState(kaPrices)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [loadingPrices, setLoadingPrices] = useState(false)
  const [priceFlash, setPriceFlash] = useState({})

  const refreshPrices = async () => {
    setLoadingPrices(true)
    await new Promise(r => setTimeout(r, 600))
    setLivePrices(kaPrices.map(applyMicroTick))
    setLastUpdated(new Date())
    setLoadingPrices(false)
  }`;

  const newPriceState = `
  const [livePrices, setLivePrices] = useState([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [loadingPrices, setLoadingPrices] = useState(false)
  const [priceFlash, setPriceFlash] = useState({})

  const loadDynamicPrices = () => {
    let prices = districtPricesMap[userDistrict] || kaPrices
    // Add images to the prices dynamically from cropInfoMap or cropImageMap
    prices = prices.map(p => ({
      ...p,
      img: cropInfoMap[p.crop]?.image || cropImageMap[p.crop] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80'
    }))
    return prices
  }

  const refreshPrices = async () => {
    setLoadingPrices(true)
    await new Promise(r => setTimeout(r, 600))
    setLivePrices(loadDynamicPrices().map(applyMicroTick))
    setLastUpdated(new Date())
    setLoadingPrices(false)
  }

  // Effect to reload prices when district changes
  useEffect(() => {
    setLivePrices(loadDynamicPrices())
  }, [userDistrict])`;

  content = content.replace(oldPriceState, newPriceState);
}

// 3. Update the table rendering to just map over livePrices instead of filtering
// since livePrices is now already tailored to the district!
if (content.includes("livePrices.filter(p => p.market.includes(userDistrict))")) {
  const oldTableRender = `
                  {(livePrices.filter(p => p.market.includes(userDistrict)).length > 0
                    ? livePrices.filter(p => p.market.includes(userDistrict))
                    : livePrices.slice(0, 5)).map((p, i) => (`;
                    
  const newTableRender = `
                  {livePrices.map((p, i) => (`;
  
  content = content.replace(oldTableRender, newTableRender);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Update APMC table successful');
