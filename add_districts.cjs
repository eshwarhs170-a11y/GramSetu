const fs = require('fs');
const path = require('path');

const newDistricts = `
  Bagalkot: {
    tagline: 'Land of Chalukyan Architecture',
    emoji: '🏛️',
    color: '#b45309',
    bg: 'linear-gradient(135deg, #b45309, #78350f)',
    crop: 'Sugarcane & Pomegranate',
    highlights: [
      { icon: '🏛️', title: 'Badami Caves', desc: 'Ancient rock-cut cave temples showcasing Chalukyan architecture.' },
      { icon: '🛕', title: 'Pattadakal', desc: 'UNESCO World Heritage site with a magnificent complex of 7th and 8th-century Hindu and Jain temples.' },
      { icon: '🌺', title: 'Ilkal Sarees', desc: 'Famous for the traditional handloom Ilkal sarees with distinctive red border (Tope Teni).' },
      { icon: '🍅', title: 'Pomegranate Hub', desc: 'A leading producer of high-quality pomegranates in Karnataka.' },
      { icon: '⚡', title: 'Almatti Dam', desc: 'A major hydroelectric project on the Krishna River, crucial for irrigation.' }
    ]
  },
  Ballari: {
    tagline: 'The Mining Capital',
    emoji: '⛏️',
    color: '#9f1239',
    bg: 'linear-gradient(135deg, #9f1239, #4c0519)',
    crop: 'Paddy & Cotton',
    highlights: [
      { icon: '⛏️', title: 'Iron Ore Mining', desc: 'Historically known for its vast iron ore reserves and mining industry.' },
      { icon: '🏰', title: 'Ballari Fort', desc: 'A historic fort built on a monolithic rock by Hanumappa Nayaka.' },
      { icon: '👖', title: 'Garment Industry', desc: 'A major center for the textile and garment manufacturing industry.' },
      { icon: '🐻', title: 'Daroji Sloth Bear Sanctuary', desc: 'The first sloth bear sanctuary in India and Asia.' },
      { icon: '🌾', title: 'Tungabhadra Irrigation', desc: 'Benefits extensively from the Tungabhadra dam irrigation for paddy.' }
    ]
  },
  'Bengaluru Rural': {
    tagline: 'Silk & Aerospace Hub',
    emoji: '✈️',
    color: '#0369a1',
    bg: 'linear-gradient(135deg, #0369a1, #0c4a6e)',
    crop: 'Ragi & Mulberry',
    highlights: [
      { icon: '✈️', title: 'Kempegowda Int. Airport', desc: 'Hosts the main international airport serving Bengaluru.' },
      { icon: '🍇', title: 'Grape Cultivation', desc: 'Known for extensive vineyards and grape production.' },
      { icon: '🐛', title: 'Mulberry & Silk', desc: 'A major hub for mulberry cultivation supporting sericulture.' },
      { icon: '🏭', title: 'Aerospace Park', desc: 'Houses a massive aerospace SEZ bringing high-tech industry to the region.' },
      { icon: '🛕', title: 'Ghati Subramanya', desc: 'Ancient Hindu temple dedicated to Lord Karthikeya and Lord Narasimha.' }
    ]
  },
  'Bengaluru Urban': {
    tagline: 'Silicon Valley of India',
    emoji: '💻',
    color: '#1d4ed8',
    bg: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)',
    crop: 'Ragi',
    highlights: [
      { icon: '💻', title: 'IT Hub', desc: 'India\\'s leading information technology exporter and tech capital.' },
      { icon: '🌳', title: 'Lalbagh Botanical Garden', desc: 'Historic 240-acre botanical garden housing India\\'s largest collection of tropical plants.' },
      { icon: '🏛️', title: 'Vidhana Soudha', desc: 'The magnificent state legislature building, an architectural marvel.' },
      { icon: '🚀', title: 'ISRO Headquarters', desc: 'The nerve center of India\\'s space research and exploration.' },
      { icon: '☕', title: 'Filter Coffee & Darshinis', desc: 'Famous for its unique food culture, darshinis, and filter coffee.' }
    ]
  },
  Bidar: {
    tagline: 'City of Whispering Monuments',
    emoji: '🕌',
    color: '#4338ca',
    bg: 'linear-gradient(135deg, #4338ca, #312e81)',
    crop: 'Red Gram (Tur Dal)',
    highlights: [
      { icon: '🕌', title: 'Bidar Fort', desc: 'One of the largest and most formidable forts in India, built in 1427.' },
      { icon: '🏺', title: 'Bidriware Art', desc: 'GI-tagged metal handicraft originating from the 14th century Bahamani era.' },
      { icon: '🌾', title: 'Tur Dal Bowl', desc: 'A major producer of pigeon pea (Tur Dal) in the state.' },
      { icon: '🕍', title: 'Guru Nanak Jhira Sahib', desc: 'A highly revered Sikh shrine built at a holy spring.' },
      { icon: '📚', title: 'Mahmud Gawan Madrasa', desc: 'Remains of a spectacular 15th-century Islamic theological college.' }
    ]
  },
  Chamarajanagar: {
    tagline: 'The Silk and Forest Frontier',
    emoji: '🐅',
    color: '#15803d',
    bg: 'linear-gradient(135deg, #15803d, #14532d)',
    crop: 'Turmeric & Sugarcane',
    highlights: [
      { icon: '🐅', title: 'Bandipur National Park', desc: 'Famous Tiger Reserve and part of the Nilgiri Biosphere.' },
      { icon: '🛕', title: 'Male Mahadeshwara Betta', desc: 'A major Shaiva pilgrimage center located in dense forests.' },
      { icon: '🐘', title: 'BR Hills', desc: 'Biligirirangana Hills, a wildlife sanctuary bridging the Eastern and Western Ghats.' },
      { icon: '🌿', title: 'Turmeric Cultivation', desc: 'Known for producing high-quality turmeric and other spices.' },
      { icon: '💦', title: 'Hogenakkal Falls', desc: 'Spectacular waterfalls on the Kaveri river, bordering Tamil Nadu.' }
    ]
  },
  Chikkaballapur: {
    tagline: 'Nandi Hills & Silk',
    emoji: '🌄',
    color: '#0f766e',
    bg: 'linear-gradient(135deg, #0f766e, #134e4a)',
    crop: 'Maize & Grapes',
    highlights: [
      { icon: '🌄', title: 'Nandi Hills', desc: 'An ancient hill fortress and immensely popular sunrise viewpoint.' },
      { icon: '🥔', title: 'Potato & Maize', desc: 'A major agricultural hub for potatoes, maize, and grapes.' },
      { icon: '🗿', title: 'Isha Foundation (Adiyogi)', desc: 'Home to the massive Adiyogi Shiva bust, attracting spiritual seekers.' },
      { icon: '💧', title: 'Bhoga Nandeeshwara', desc: 'Stunning 9th-century temple complex at the base of Nandi Hills.' },
      { icon: '🐛', title: 'Silk Cocoon Market', desc: 'One of the leading silk cocoon trading centers in the state.' }
    ]
  },
  Chitradurga: {
    tagline: 'The Stone Fortress',
    emoji: '🏰',
    color: '#9a3412',
    bg: 'linear-gradient(135deg, #9a3412, #7c2d12)',
    crop: 'Groundnut & Onion',
    highlights: [
      { icon: '🏰', title: 'Chitradurga Fort', desc: 'A massive fort built in a series of seven concentric fortification walls (Kallina Kote).' },
      { icon: '🛡️', title: 'Onake Obavva', desc: 'Legendary heroine who fought Hyder Ali\\'s forces with a pestle (Onake).' },
      { icon: '🧅', title: 'Onion Cultivation', desc: 'A leading producer of onions and groundnuts in central Karnataka.' },
      { icon: '🌬️', title: 'Wind Farms', desc: 'Dotted with numerous wind turbines, it\\'s a major renewable energy hub.' },
      { icon: '🏞️', title: 'Vani Vilas Sagar', desc: 'Karnataka\\'s oldest dam, known for its beautiful architecture.' }
    ]
  },
  Davanagere: {
    tagline: 'Heart of Karnataka',
    emoji: '🥞',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #d97706, #92400e)',
    crop: 'Paddy & Maize',
    highlights: [
      { icon: '🥞', title: 'Benne Dosa', desc: 'Famous for the mouth-watering Davanagere Benne (Butter) Dosa.' },
      { icon: '👕', title: 'Textile Mills', desc: 'Historically known as the "Manchester of Karnataka" for its cotton mills.' },
      { icon: '🌾', title: 'Paddy & Arecanut', desc: 'Central agricultural hub trading heavily in paddy, maize, and arecanut.' },
      { icon: '🛕', title: 'Harihareshwara Temple', desc: 'Ancient 13th-century Hoysala temple in Harihar.' },
      { icon: '📍', title: 'Geographical Center', desc: 'Geographically located at the exact center of Karnataka state.' }
    ]
  },
  Gadag: {
    tagline: 'Land of Printing & Literature',
    emoji: '📖',
    color: '#5b21b6',
    bg: 'linear-gradient(135deg, #5b21b6, #4c1d95)',
    crop: 'Cotton & Groundnut',
    highlights: [
      { icon: '🛕', title: 'Trikuteshwara Temple', desc: '11th-century Shiva temple known for its ornate Chalukyan pillars.' },
      { icon: '📖', title: 'Kumara Vyasa', desc: 'Birthplace of Kumara Vyasa, who translated the Mahabharata into Kannada.' },
      { icon: '🖨️', title: 'Printing Hub', desc: 'Historically a major center for printing presses and publishing.' },
      { icon: '🦅', title: 'Magadi Bird Sanctuary', desc: 'A vital wetland habitat for bar-headed geese and other migratory birds.' },
      { icon: '🌬️', title: 'Wind Energy', desc: 'A prominent region for wind power generation in North Karnataka.' }
    ]
  },
  Kalaburagi: {
    tagline: 'Sufi City & Tur Bowl',
    emoji: '🕌',
    color: '#0f766e',
    bg: 'linear-gradient(135deg, #0f766e, #115e59)',
    crop: 'Tur Dal (Red Gram)',
    highlights: [
      { icon: '🕌', title: 'Khwaja Bande Nawaz', desc: 'A famous 14th-century Sufi shrine representing communal harmony.' },
      { icon: '🏰', title: 'Gulbarga Fort', desc: 'Bahmani capital fort containing the unique Jama Masjid built in Persian style.' },
      { icon: '🍲', title: 'Tur Dal Capital', desc: 'Known as the "Tur bowl of Karnataka", producing the GI-tagged Kalaburagi Tur Dal.' },
      { icon: '☀️', title: 'Sun City', desc: 'One of the hottest districts in the state during summer.' },
      { icon: '🦷', title: 'Medical & Dental Hub', desc: 'A major educational center for medical and dental studies.' }
    ]
  },
  Kodagu: {
    tagline: 'The Scotland of India',
    emoji: '☕',
    color: '#166534',
    bg: 'linear-gradient(135deg, #166534, #14532d)',
    crop: 'Coffee & Pepper',
    highlights: [
      { icon: '☕', title: 'Coffee Plantations', desc: 'India\\'s largest coffee-producing district, famous for Robusta and Arabica.' },
      { icon: '🌊', title: 'Talakaveri', desc: 'The source of the sacred Kaveri river on the Brahmagiri hill.' },
      { icon: '⚔️', title: 'Martial Tradition', desc: 'Home to the Kodava people, known for their unique culture and military history.' },
      { icon: '🐘', title: 'Dubare Elephant Camp', desc: 'Forest camp where elephants are trained; situated on the banks of the Kaveri.' },
      { icon: '🏰', title: 'Madikeri Fort', desc: 'A 17th-century fort built by Muddu Raja, offering panoramic views.' }
    ]
  },
  Kolar: {
    tagline: 'Land of Gold & Silk',
    emoji: '✨',
    color: '#ca8a04',
    bg: 'linear-gradient(135deg, #ca8a04, #a16207)',
    crop: 'Mango & Silk',
    highlights: [
      { icon: '✨', title: 'Kolar Gold Fields (KGF)', desc: 'Historically one of the deepest and most productive gold mines in the world.' },
      { icon: '🥭', title: 'Mango Cultivation', desc: 'A massive producer of mangoes, especially the Totapuri and Alphonso varieties.' },
      { icon: '🛕', title: 'Someshwara Temple', desc: 'A stunning 14th-century temple showcasing Vijayanagara architecture.' },
      { icon: '🥛', title: 'Dairy Production', desc: 'One of the highest milk-producing districts in Karnataka.' },
      { icon: '🪨', title: 'Anthargange', desc: 'A hill range known for volcanic rock formations and natural caves.' }
    ]
  },
  Koppal: {
    tagline: 'The Toy City',
    emoji: '🧸',
    color: '#ea580c',
    bg: 'linear-gradient(135deg, #ea580c, #c2410c)',
    crop: 'Paddy & Jowar',
    highlights: [
      { icon: '🧸', title: 'Kinhal Toys', desc: 'GI-tagged traditional wooden toys and religious idols with rich colors.' },
      { icon: '🛕', title: 'Mahadeva Temple, Itagi', desc: 'Referred to as the "Emperor of Temples" of the Kalyani Chalukyas.' },
      { icon: '🏰', title: 'Anegundi', desc: 'Believed to be the monkey kingdom of Kishkindha from the Ramayana.' },
      { icon: '⛰️', title: 'Koppal Fort', desc: 'A historic fort with a rich history involving Tipu Sultan.' },
      { icon: '🌾', title: 'Seed Production', desc: 'A major center for agricultural seed production and processing.' }
    ]
  },
  Udupi: {
    tagline: 'Temple Town & Coastal Cuisine',
    emoji: '🍛',
    color: '#0284c7',
    bg: 'linear-gradient(135deg, #0284c7, #0369a1)',
    crop: 'Paddy & Coconut',
    highlights: [
      { icon: '🛕', title: 'Sri Krishna Matha', desc: 'A legendary 13th-century temple founded by Saint Madhvacharya.' },
      { icon: '🍛', title: 'Udupi Cuisine', desc: 'Birthplace of the famous Udupi vegetarian cuisine and Masala Dosa.' },
      { icon: '🏖️', title: 'Malpe Beach & St. Mary\\'s', desc: 'Famous for its pristine beach and the unique basalt rock formations on St. Mary\\'s Island.' },
      { icon: '🎓', title: 'Manipal', desc: 'A major international hub for medical, engineering, and higher education.' },
      { icon: '🎭', title: 'Bhoota Kola', desc: 'A powerful ancient animist ritual dance form unique to the Tulu Nadu region.' }
    ]
  },
  'Uttara Kannada': {
    tagline: 'Forests & Pristine Beaches',
    emoji: '🌴',
    color: '#15803d',
    bg: 'linear-gradient(135deg, #15803d, #166534)',
    crop: 'Arecanut & Spices',
    highlights: [
      { icon: '🌴', title: 'Gokarna', desc: 'A laid-back beach town and a major Shaiva pilgrimage center (Mahabaleshwara).' },
      { icon: '🛕', title: 'Murdeshwar', desc: 'Features the world\\'s second-tallest Shiva statue overlooking the Arabian Sea.' },
      { icon: '💦', title: 'Vibhooti & Magod Falls', desc: 'Home to numerous stunning waterfalls hidden in the dense Western Ghats.' },
      { icon: '🐅', title: 'Dandeli Wildlife', desc: 'Famous for white water rafting, hornbills, and the Kali Tiger Reserve.' },
      { icon: '🌶️', title: 'Sirsi Arecanut', desc: 'A massive trading hub for arecanut, pepper, and cardamom.' }
    ]
  },
  Vijayapura: {
    tagline: 'City of Victory & Domes',
    emoji: '🕌',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    crop: 'Grapes & Lemon',
    highlights: [
      { icon: '🕌', title: 'Gol Gumbaz', desc: 'The magnificent tomb with the second-largest dome in the world.' },
      { icon: '🍇', title: 'Grape & Raisin Hub', desc: 'Karnataka\\'s leading producer of grapes and high-quality raisins.' },
      { icon: '🍋', title: 'Indi Lemon', desc: 'The GI-tagged Indi lemon is famous for its size and juice content.' },
      { icon: '🕌', title: 'Ibrahim Rauza', desc: 'A stunning mausoleum said to have inspired the Taj Mahal.' },
      { icon: '🏰', title: 'Bijapur Fort', desc: 'Historic fort containing massive cannons like the Malik-e-Maidan.' }
    ]
  },
  Yadgir: {
    tagline: 'The Hidden Gem of the Deccan',
    emoji: '🏞️',
    color: '#0891b2',
    bg: 'linear-gradient(135deg, #0891b2, #0e7490)',
    crop: 'Paddy & Tur Dal',
    highlights: [
      { icon: '🏰', title: 'Yadgir Fort', desc: 'A hill fort built during the Yadava dynasty, dotted with historic cannons and wells.' },
      { icon: '🌊', title: 'Bheema River', desc: 'The Bheema river lifeline supports extensive paddy cultivation in the region.' },
      { icon: '🛕', title: 'Chintanalli', desc: 'A popular cave temple dedicated to Lord Gavi Siddeshwara.' },
      { icon: '🏭', title: 'Uranium Deposits', desc: 'The Gogi region is known for possessing significant uranium reserves.' },
      { icon: '💦', title: 'Dhab Dhabhi Falls', desc: 'A beautiful and serene waterfall near Gurmitkal, active during the monsoons.' }
    ]
  },
  Vijayanagara: {
    tagline: 'The Glory of Hampi',
    emoji: '🗿',
    color: '#b45309',
    bg: 'linear-gradient(135deg, #b45309, #92400e)',
    crop: 'Sugarcane & Banana',
    highlights: [
      { icon: '🗿', title: 'Hampi Ruins', desc: 'UNESCO World Heritage site representing the magnificent Vijayanagara Empire.' },
      { icon: '🛕', title: 'Virupaksha Temple', desc: 'A 7th-century active temple towering over the Hampi landscape.' },
      { icon: '🌊', title: 'Tungabhadra Dam (Hospet)', desc: 'The major reservoir providing irrigation and power to the entire region.' },
      { icon: '🍌', title: 'Banana & Sugarcane', desc: 'Highly fertile river belt producing massive quantities of banana and sugarcane.' },
      { icon: '🐻', title: 'Daroji Bear Sanctuary', desc: 'Shared with Ballari, this rocky scrubland is a safe haven for sloth bears.' }
    ]
  }`;

const filePath = path.join(__dirname, 'src', 'pages', 'LandingPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/190:\s+\]\s+},\s+}/, '190:     ]\n  },\n' + newDistricts + '\n}');
// Or more safely using a simple string replacement:
content = content.replace("  Haveri: {", newDistricts + ",\n  Haveri: {");
fs.writeFileSync(filePath, content, 'utf8');
console.log("Districts added");
