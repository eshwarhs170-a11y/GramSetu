import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import {
  Landmark, TrendingUp, Megaphone, ClipboardList,
  ArrowRight, Wheat, Users, Star, MapPin, X
} from 'lucide-react'

// ── District Knowledge Base ──────────────────────────────────
const districtData = {
  Mysuru: {
    tagline: 'City of Palaces & Sandalwood',
    emoji: '🏯',
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
    crop: 'Silk & Sandalwood',
    highlights: [
      { icon: '🏯', title: 'Mysore Palace', desc: 'One of the most visited monuments in India. Home of the Wadiyar dynasty, illuminated by 100,000 bulbs every Sunday.' },
      { icon: '⛩️', title: 'Chamundeshwari Temple', desc: 'Atop the 1,062 m Chamundi Hill. The deity is the patron goddess of Mysuru and protects the city.' },
      { icon: '🌿', title: 'Brindavan Gardens', desc: 'Musical fountain garden built over Krishna Raja Sagara dam — one of India\'s most beloved gardens at twilight.' },
      { icon: '🎨', title: 'Dasara Festival', desc: 'Karnataka\'s Rajyotsava — the 10-day Mysuru Dasara is inscribed as an intangible cultural heritage, drawing millions.' },
      { icon: '🧵', title: 'Mysore Silk', desc: 'Government-run Mysore Silk Factory (est. 1912) produces the finest pure silk sarees — GI tagged and world-renowned.' },
      { icon: '🌳', title: 'Sandalwood Capital', desc: 'Mysuru district has the largest natural sandalwood forests in Asia. The KSFD auctions fetch crores every season.' },
    ]
  },
  Tumkuru: {
    tagline: 'Coconut City & the Land of Saints',
    emoji: '🥥',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #d97706, #92400e)',
    crop: 'Coconut & Silk Cocoon',
    highlights: [
      { icon: '🙏', title: 'Siddaganga Mutt', desc: 'The 111-year-old Siddaganga Swamiji served 8 million rural students with free food and shelter — a living saint of Karnataka.' },
      { icon: '🥥', title: 'Coconut Hub of Karnataka', desc: 'Tumkuru produces ~30% of Karnataka\'s coconuts. The Tumkuru APMC coconut market is the busiest in South India.' },
      { icon: '🏔️', title: 'Madhugiri Fort', desc: 'The second largest monolith rock in Asia (after Savandurga). Trekkers come from across India for the granite peak summit.' },
      { icon: '🌄', title: 'Devarayanadurga', desc: 'Hilltop forest reserve with twin temples — Bhoga Narasimha and Yoga Narasimha — surrounded by lush deciduous forest.' },
      { icon: '🪨', title: 'Shivaganga Hill', desc: 'Sacred hill temple with natural spring ("Ganga") and Gangadhareshwara shrine — a one-day pilgrimage classic.' },
      { icon: '🐛', title: 'Silk Rearing', desc: 'Tumkuru is among the top three districts for mulberry silk cocoon production in Karnataka — central to sericulture.' },
    ]
  },
  Ramanagara: {
    tagline: 'Silk City & Land of Sholay',
    emoji: '🎬',
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
    crop: 'Silk Cocoons',
    highlights: [
      { icon: '🎬', title: 'Ramdevarabetta — Sholay Hills', desc: 'Bollywood\'s most iconic film Sholay (1975) was filmed at these dramatic rocky outcrops near Ramanagara.' },
      { icon: '🧵', title: 'Silk Cocoon Capital', desc: 'Ramanagara hosts Asia\'s largest silk cocoon market — lakhs of kg traded daily by thousands of farmers.' },
      { icon: '🦅', title: 'Vulture Sanctuary', desc: 'Ramadevara Betta is home to the endangered Long-billed Vulture — one of only a handful of nesting sites in South India.' },
      { icon: '🏔️', title: 'Savandurga', desc: 'The largest monolithic rock in Asia — 1,226 m above sea level. A challenging trek loved by adventure enthusiasts.' },
      { icon: '🐊', title: 'Crocodile Farm, Mysuru Rd', desc: 'Government crocodile farm maintains rare marsh crocodiles — critical for conservation of Cauvery river ecosystem.' },
      { icon: '🌊', title: 'Cauvery Wildlife Sanctuary', desc: 'Dense riverine forest along the Cauvery — home to elephants, leopards, sloth bears and the Mahseer fish.' },
    ]
  },
  Mandya: {
    tagline: 'Sugar Bowl of Karnataka',
    emoji: '🌾',
    color: '#16a34a',
    bg: 'linear-gradient(135deg, #16a34a, #14532d)',
    crop: 'Sugarcane & Paddy',
    highlights: [
      { icon: '🏞️', title: 'KRS Dam & Brindavan Gardens', desc: 'Krishna Raja Sagara — built in 1924 — is the lifeline of Kaveri basin irrigation. The adjacent Brindavan Gardens is legendary.' },
      { icon: '⛩️', title: 'Melkote — Cheluvanarayana Swamy', desc: 'A Vaishnava pilgrimage town on a granite hill. The 12th century temple attracts lakhs for Vairamudi festival every year.' },
      { icon: '💧', title: 'Shivanasamudra Falls', desc: 'One of India\'s first hydroelectric power stations (1902) — twin waterfalls Barachukki and Gaganachukki in monsoon season.' },
      { icon: '🍬', title: 'Sugarcane & Jaggery', desc: 'Mandya supplies sugarcane to the largest cooperative sugar factory in Asia — Mysore Sugar Company (Mysugar).' },
      { icon: '🌺', title: 'Pandavapura Town', desc: 'Believed to be where Pandavas rested during their exile. Famous for rose cultivation and fragrant flower markets.' },
      { icon: '🦟', title: 'Ranganathittu Bird Sanctuary', desc: 'Karnataka\'s largest bird sanctuary on Cauvery islands — home to painted storks, herons and mugger crocodiles.' },
    ]
  },
  Hassan: {
    tagline: 'Hoysala Heartland — Temple of Stars',
    emoji: '🛕',
    color: '#0369a1',
    bg: 'linear-gradient(135deg, #0369a1, #0c4a6e)',
    crop: 'Coffee & Areca Nut',
    highlights: [
      { icon: '🛕', title: 'Belur — Chennakeshava Temple', desc: 'A 12th century Hoysala gem — 103 years to build. Every inch of the star-shaped stone temple is hand-carved scripture.' },
      { icon: '🏛️', title: 'Halebid — Hoysaleshwara Temple', desc: 'Twin temple complex with 240,000 sq ft of intricate stone carvings — considered the pinnacle of Hoysala architecture.' },
      { icon: '🗿', title: 'Shravanabelagola — Gommateshwara', desc: 'The 57-foot monolithic Jain statue (981 AD) is the world\'s largest single-stone statue. Mahamastakabhisheka every 12 years.' },
      { icon: '☕', title: 'Coffee Estates', desc: 'The Sakleshpur and Alur taluks of Hassan are Karnataka\'s coffee country — shade-grown Arabica amid cardamom forests.' },
      { icon: '🌿', title: 'Areca Nut Orchards', desc: 'Hassan is among the top areca nut producing districts — Shivamogga and Hassan together dominate Karnataka\'s supply.' },
      { icon: '🏞️', title: 'Hemavathi Reservoir', desc: 'Built across the Hemavathi river — irrigates Mandya, Hassan and Tumkuru. Scenic backwaters for birding and fishing.' },
    ]
  },
  Belagavi: {
    tagline: 'Gateway to Deccan — Land of Rani Chennamma',
    emoji: '⚔️',
    color: '#b45309',
    bg: 'linear-gradient(135deg, #b45309, #78350f)',
    crop: 'Jowar & Groundnut',
    highlights: [
      { icon: '⚔️', title: 'Kittur — Rani Chennamma', desc: 'India\'s first woman to lead an armed revolt against the British in 1824 — Kittur Rani Chennamma\'s fort is a proud landmark.' },
      { icon: '🏰', title: 'Belagavi Fort', desc: 'A 16th century fort built by the Ratta dynasty — later held by Tipu Sultan and then the British. Encompasses a mosque and Jain temples.' },
      { icon: '🛕', title: 'Kapileshwara Temple', desc: 'Ancient Shiva temple in Hipparagi, believed to be established by Kapila Muni. A lesser-known but deeply venerated pilgrimage.' },
      { icon: '🍬', title: 'Kunda — Famous Sweet', desc: 'Belagavi\'s iconic milk-based Kunda sweet is GI-tagged — no trip to Belagavi is complete without a box of fresh Kunda.' },
      { icon: '🌊', title: 'Gokak Falls', desc: 'The "Niagara of India" — 52 m wide waterfall on the Ghataprabha river. Surrounded by colonial-era hanging bridge ruins.' },
      { icon: '🎭', title: 'Dodda Sampige & Yakshagana', desc: 'North Karnataka\'s folk arts — Yakshagana dance-drama, Dollu Kunitha and Veeragase performances at temple festivals.' },
    ]
  },
  Shivamogga: {
    tagline: 'Gateway to Malnad — Land of Waterfalls',
    emoji: '💧',
    color: '#0f766e',
    bg: 'linear-gradient(135deg, #0f766e, #134e4a)',
    crop: 'Areca Nut & Paddy',
    highlights: [
      { icon: '💧', title: 'Jog Falls', desc: 'One of India\'s highest plunge waterfalls (253 m) — the Sharavathi river creates 4 cascades: Raja, Rani, Rover, Rocket.' },
      { icon: '🌿', title: 'Agumbe Rainforest', desc: 'The "Cherrapunji of the South" — receives 7,000 mm rainfall. Home to the King Cobra and the Herpetologist\'s paradise.' },
      { icon: '🏛️', title: 'Keladi Kingdom History', desc: 'The Keladi Nayakas ruled for 200 years and gave shelter to Chhatrapati Rajaram (Shivaji\'s son) — a proud footnote in Deccan history.' },
      { icon: '🏞️', title: 'Linganamakki Reservoir', desc: 'Vast reservoir feeding Sharavathi hydroelectric project — Karnataka\'s key power source — stunning backwaters for boating.' },
      { icon: '☕', title: 'Coffee & Areca Nut', desc: 'Shivamogga\'s Malnad belt is the areca nut heartland of Karnataka — also produces high-quality Robusta coffee.' },
      { icon: '🐘', title: 'Bhadra Wildlife Sanctuary', desc: 'Tiger reserve in the Western Ghats — home to tigers, leopards, elephants and over 250 bird species.' },
    ]
  },
  Chikkamagaluru: {
    tagline: 'Coffee Land — Roof of Karnataka',
    emoji: '☕',
    color: '#92400e',
    bg: 'linear-gradient(135deg, #92400e, #451a03)',
    crop: 'Arabica Coffee & Spices',
    highlights: [
      { icon: '☕', title: 'Birthplace of Indian Coffee', desc: 'Baba Budan Giri — the saint Baba Budan brought 7 coffee beans from Yemen to this hill in the 16th century, starting India\'s coffee story.' },
      { icon: '🏔️', title: 'Mullayanagiri Peak', desc: 'At 1,930 m, the highest peak in Karnataka — a 2-hour trek through shola grasslands with panoramic Deccan views.' },
      { icon: '💧', title: 'Hebbe Falls', desc: 'A 168 m two-tiered waterfall in coffee estate country — accessible only by jeep safari through private coffee estates.' },
      { icon: '🌿', title: 'Coffee & Pepper Estates', desc: 'Chikkamagaluru produces 36% of Karnataka\'s coffee — shade-grown Arabica and Robusta under Silver Oak canopy.' },
      { icon: '🦁', title: 'Kudremukh National Park', desc: 'UNESCO-recognised Western Ghats biodiversity hotspot — home to lions-tailed macaques, Malabar giant squirrels and tigers.' },
      { icon: '🏰', title: 'Baba Budan Dargah', desc: 'A syncretic shrine where Hindus and Muslims both revere — a symbol of centuries-old communal harmony in the hills.' },
    ]
  },
  'Dakshina Kannada': {
    tagline: 'Tulu Nadu — Land of Temples & Sea',
    emoji: '🌊',
    color: '#0c4a6e',
    bg: 'linear-gradient(135deg, #0c4a6e, #082f49)',
    crop: 'Coconut & Cashew',
    highlights: [
      { icon: '🛕', title: 'Mangaladevi Temple', desc: 'The city of Mangaluru derives its name from this ancient temple — goddess Mangaladevi is believed to be the town\'s protector deity.' },
      { icon: '🎭', title: 'Yakshagana Theatre', desc: 'Karnataka\'s signature night-long classical dance-drama form — performed in Tulu and Kannada at rural temple festivals (bayalata).' },
      { icon: '🌊', title: 'Panambur & Tannirbhavi Beach', desc: 'Popular beaches near Mangaluru port city — windy coastal scenery with cashew-lined pathways and fresh seafood stalls.' },
      { icon: '🦀', title: 'Seafood Capital', desc: 'Mangaluru style fish curry (koli gassi), Neer dosa with crab ghee roast — the seafood cuisine here is a GI-level cultural treasure.' },
      { icon: '⛪', title: 'St. Aloysius Chapel', desc: 'A 19th century Jesuit chapel — its interior is painted entirely in frescoes by Italian artist Antonio Moscheni. Breathtaking.' },
      { icon: '🥜', title: 'Cashew Processing Hub', desc: 'DK district processes 50% of Karnataka\'s cashew exports — thousands of women-led cottage cashew processing units dot the coast.' },
    ]
  },
  Dharwad: {
    tagline: 'Cultural Capital of North Karnataka',
    emoji: '🎵',
    color: '#6d28d9',
    bg: 'linear-gradient(135deg, #6d28d9, #3b0764)',
    crop: 'Jowar & Sunflower',
    highlights: [
      { icon: '🎵', title: 'Dharwad — Hindustani Music', desc: 'Dharwad produced legendary singers: Gangubai Hangal, Mallikarjun Mansur, Kumar Gandharva — it IS the home of Hindustani music in South India.' },
      { icon: '🍬', title: 'Dharwad Peda', desc: 'GI-tagged milk sweet — the famous Thakur Brothers shop has been making the original Dharwad Peda since 1870.' },
      { icon: '🏛️', title: 'Karnataka University', desc: 'One of Karnataka\'s oldest universities (1949) — Dharwad is a major centre for Kannada literature and higher education.' },
      { icon: '🌻', title: 'Sunflower & Jowar', desc: 'North Karnataka\'s dry land farming — Dharwad and surrounding districts are among India\'s top sunflower oil-seed producers.' },
      { icon: '🎭', title: 'Karadi Majalu Dance', desc: 'A rare bear-dance folk art tradition — performers enact the bear\'s playful movements in colorful Lambani tribal costume.' },
      { icon: '🌿', title: 'University of Agricultural Sciences', desc: 'UAS Dharwad is one of India\'s premier agriculture research institutions — developed high-yield varieties used by lakhs of farmers.' },
    ]
  },
  Raichur: {
    tagline: 'Rice Bowl of Karnataka',
    emoji: '🌾',
    color: '#c2410c',
    bg: 'linear-gradient(135deg, #c2410c, #7c2d12)',
    crop: 'Paddy & Cotton',
    highlights: [
      { icon: '🏰', title: 'Raichur Fort', desc: 'A 14th century fort that changed hands between Vijayanagara and Bahmani Kingdoms 5 times — a battlefield of Deccan history.' },
      { icon: '🌊', title: 'Tungabhadra Dam', desc: 'A colossal reservoir irrigating 5 lakh acres across Raichur and Bellary — a post-independence engineering marvel.' },
      { icon: '🌾', title: 'Paddy Granary', desc: 'Krishna-Tungabhadra doab makes Raichur Karnataka\'s largest paddy-producing district — Karnataka\'s "rice bowl".' },
      { icon: '💎', title: 'Cotton & Groundnut', desc: 'Major cotton-growing region — Raichur ginning mills process Telangana-border cotton. Groundnut is the second major cash crop.' },
      { icon: '🎭', title: 'Veeragase & Goravara Kunitha', desc: 'Tribal folk dance traditions — Goravara Kunitha performers carry tall terracotta pots on their heads while dancing at Shivaratri.' },
      { icon: '⚡', title: 'Raichur Thermal Power Station', desc: 'Karnataka\'s largest coal-based power plant — 1,470 MW capacity supplying electricity to the entire state from the Krishna riverbank.' },
    ]
  },

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
      { icon: '💻', title: 'IT Hub', desc: 'India\'s leading information technology exporter and tech capital.' },
      { icon: '🌳', title: 'Lalbagh Botanical Garden', desc: 'Historic 240-acre botanical garden housing India\'s largest collection of tropical plants.' },
      { icon: '🏛️', title: 'Vidhana Soudha', desc: 'The magnificent state legislature building, an architectural marvel.' },
      { icon: '🚀', title: 'ISRO Headquarters', desc: 'The nerve center of India\'s space research and exploration.' },
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
      { icon: '🛡️', title: 'Onake Obavva', desc: 'Legendary heroine who fought Hyder Ali\'s forces with a pestle (Onake).' },
      { icon: '🧅', title: 'Onion Cultivation', desc: 'A leading producer of onions and groundnuts in central Karnataka.' },
      { icon: '🌬️', title: 'Wind Farms', desc: 'Dotted with numerous wind turbines, it\'s a major renewable energy hub.' },
      { icon: '🏞️', title: 'Vani Vilas Sagar', desc: 'Karnataka\'s oldest dam, known for its beautiful architecture.' }
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
      { icon: '☕', title: 'Coffee Plantations', desc: 'India\'s largest coffee-producing district, famous for Robusta and Arabica.' },
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
      { icon: '🏖️', title: 'Malpe Beach & St. Mary\'s', desc: 'Famous for its pristine beach and the unique basalt rock formations on St. Mary\'s Island.' },
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
      { icon: '🛕', title: 'Murdeshwar', desc: 'Features the world\'s second-tallest Shiva statue overlooking the Arabian Sea.' },
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
      { icon: '🍇', title: 'Grape & Raisin Hub', desc: 'Karnataka\'s leading producer of grapes and high-quality raisins.' },
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
  },
  Haveri: {
    tagline: 'Cotton Country & Lambani Heritage',
    emoji: '🌸',
    color: '#be185d',
    bg: 'linear-gradient(135deg, #be185d, #831843)',
    crop: 'Cotton & Jowar',
    highlights: [
      { icon: '🌸', title: 'Lambani / Banjara Crafts', desc: 'Haveri is the heartland of Lambani tribal embroidery — colorful mirrorwork textiles are exported worldwide and GI-tagged.' },
      { icon: '🏛️', title: 'Guttal — Siddeshwara Temple', desc: 'A rare 3-storey ancient Lingayat temple complex — important pilgrimage for the Veerashaiva community of North Karnataka.' },
      { icon: '🌿', title: 'Cotton Cultivation', desc: 'Haveri ranks in Karnataka\'s top 3 for cotton production — known for BT cotton and long-staple Jayadhar variety.' },
      { icon: '🎶', title: 'Dodderi Math', desc: 'An influential Veerashaiva mutt that has shaped the socio-cultural life of the region for 700+ years.' },
      { icon: '🌊', title: 'Tungabhadra Canal System', desc: 'Vast irrigation network that transformed dry Haveri into a multi-crop belt — paddy and sugarcane now grown alongside cotton.' },
      { icon: '🎭', title: 'Kamsale & Bedara Vesha', desc: 'Folk art forms unique to this belt — dancers wear elaborate masks representing tiger/bear in nocturnal forest-deity rituals.' },
    ]
  },
}

const districtList = Object.keys(districtData)

const features = (t) => [
  { Icon: Landmark, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', titleKey: 'feat1Title', descKey: 'feat1Desc' },
  { Icon: TrendingUp, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', titleKey: 'feat2Title', descKey: 'feat2Desc' },
  { Icon: Megaphone, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', titleKey: 'feat3Title', descKey: 'feat3Desc' },
  { Icon: ClipboardList, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', titleKey: 'feat4Title', descKey: 'feat4Desc' },
]

const testimonials = [
  { name: 'ರಾಮಪ್ಪ ಗೌಡ', loc: 'Mysuru', text: 'GramSetu helped me apply for PM Kisan in minutes. I got ₹2,000 in 3 days!', avatar: 'ರ' },
  { name: 'Savitha Devi', loc: 'Mandya', text: 'My Gruha Lakshmi application was approved within a week. Very helpful.', avatar: 'S' },
  { name: 'Basappa K.', loc: 'Tumkuru', text: 'Checked APMC prices daily. Sold my ragi at the best rate this season.', avatar: 'B' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const feats = features(t)
  const [selectedRole, setSelectedRole] = useState('farmer')
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const district = selectedDistrict ? districtData[selectedDistrict] : null

  return (
    <div style={{ fontFamily: "'Inter', 'Noto Sans Kannada', sans-serif", overflowX: 'hidden' }}>

      {/* ── TOP GOV BANNER ── */}
      <div style={{
        background: 'linear-gradient(90deg, #FF6B35, #F7931E, #16a34a)',
        color: '#fff', fontSize: 13, fontWeight: 600,
        padding: '8px 24px', textAlign: 'center', letterSpacing: 0.4
      }}>
        🏛️ &nbsp;ಕರ್ನಾಟಕ ಸರ್ಕಾರ &nbsp;|&nbsp; Government of Karnataka &nbsp;|&nbsp; कर्नाटक सरकार
      </div>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px', background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
          }}>
            <Wheat size={20} color="#fff" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#111827', lineHeight: 1.1 }}>{t('appName')}</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{t('appSubtitle')}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LanguageSwitcher variant="topbar-style" />
          <button
            onClick={() => navigate('/login/villager')}
            style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '10px 22px', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            Login →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '88vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d4b2f 100%)',
        position: 'relative', overflow: 'hidden', padding: '60px 48px'
      }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Left content */}
        <div style={{ flex: 1, maxWidth: 580, position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)',
            borderRadius: 50, padding: '6px 16px', marginBottom: 28
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
            <span style={{ color: '#86efac', fontSize: 13, fontWeight: 600 }}>{t('heroAvailable')}</span>
          </div>

          <h2 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.12, color: '#fff', marginBottom: 20, letterSpacing: -1 }}>
            {t('heroTitle1')}{' '}
            <span style={{ background: 'linear-gradient(90deg, #4ade80, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('heroTitle2')}
            </span>{' '}
            {t('heroTitle3')}
          </h2>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
            {t('heroDesc')}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap' }}>
            {[
              { val: t('stat1Val'), label: t('stat1Label') },
              { val: t('stat2Val'), label: t('stat2Label') },
              { val: t('stat3Val'), label: t('stat3Label') },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Role Selector */}
          <div style={{
            display: 'inline-flex', background: 'rgba(255,255,255,0.08)',
            borderRadius: 14, padding: 4, marginBottom: 20,
            border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)'
          }}>
            {[
              { id: 'farmer', label: '🌾 Farmer / Student' },
              { id: 'official', label: '🏛️ Govt Employee' },
            ].map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  padding: '10px 22px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                  cursor: 'pointer', transition: 'all 0.25s ease', border: 'none',
                  background: selectedRole === role.id
                    ? (role.id === 'farmer'
                        ? 'linear-gradient(135deg, #16a34a, #15803d)'
                        : 'linear-gradient(135deg, #3b82f6, #2563eb)')
                    : 'transparent',
                  color: selectedRole === role.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  boxShadow: selectedRole === role.id ? '0 4px 16px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* CTA button */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(selectedRole === 'farmer' ? '/login/villager' : '/login/official')}
              style={{
                background: selectedRole === 'farmer'
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff', border: 'none', borderRadius: 12,
                padding: '14px 32px', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: selectedRole === 'farmer'
                  ? '0 8px 24px rgba(22,163,74,0.4)'
                  : '0 8px 24px rgba(59,130,246,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {selectedRole === 'farmer' ? t('ctaVillager') : t('ctaOfficial')} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', minHeight: 380 }}>
          <div style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            width: 340, borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&q=80"
              alt="Karnataka farmers"
              style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', padding: '14px 18px' }}>
              <div style={{ color: '#4ade80', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✓ LIVE — Karnataka Portal</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>3.8M+ ರೈತರು ಸಂಪರ್ಕಿತರು</div>
            </div>
          </div>

          {/* Floating stat card — users not scheme data */}
          <div style={{
            position: 'absolute', left: 20, top: 40,
            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 16, padding: '14px 18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="#4ade80" />
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Active Today</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>1,24,000</div>
                <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>↑ Citizens Online</div>
              </div>
            </div>
          </div>

          {/* Floating schemes card */}
          <div style={{
            position: 'absolute', left: 0, bottom: 20,
            background: 'rgba(59,130,246,0.15)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 16, padding: '12px 16px', width: 210,
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Landmark size={20} color="#60a5fa" />
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>30+ Active Schemes</div>
                <div style={{ color: '#93c5fd', fontSize: 11 }}>PM Kisan · Raitha Siri · Gruha Lakshmi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTRICT EXPLORER ── */}
      <section style={{ background: '#0f172a', padding: '64px 48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(22,163,74,0.12)', color: '#4ade80',
            borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 700, marginBottom: 14,
            border: '1px solid rgba(22,163,74,0.25)'
          }}>
            <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            District Explorer — Karnataka
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: -0.5 }}>
            Discover Your District
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto' }}>
            Click any district to explore its culture, famous places, unique crops & history
          </p>
        </div>

        {/* District pill buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40, maxWidth: 900, margin: '0 auto 40px auto' }}>
          {districtList.map(d => {
            const info = districtData[d]
            const isActive = selectedDistrict === d
            return (
              <button
                key={d}
                onClick={() => setSelectedDistrict(isActive ? null : d)}
                style={{
                  padding: '8px 18px', borderRadius: 30, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s ease', border: 'none',
                  background: isActive ? info.bg : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  boxShadow: isActive ? '0 6px 20px rgba(0,0,0,0.4)' : 'none',
                  transform: isActive ? 'scale(1.06)' : 'scale(1)',
                }}
              >
                {info.emoji} {d}
              </button>
            )
          })}
        </div>

        {/* District Detail Panel */}
        {district && (
          <div style={{
            maxWidth: 900, margin: '0 auto',
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24, overflow: 'hidden',
            animation: 'fadeIn 0.3s ease'
          }}>
            {/* Header */}
            <div style={{ background: district.bg, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{district.emoji}</div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', margin: '0 0 4px 0' }}>{selectedDistrict} District</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: '0 0 10px 0' }}>{district.tagline}</p>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  🌿 Major Crop: {district.crop}
                </span>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0 }}>
              {district.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px 24px',
                    borderRight: (i % 3 !== 2) ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{h.icon}</div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px 0' }}>{h.title}</h4>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt when nothing selected */}
        {!district && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14, marginTop: 8 }}>
            👆 Click a district above to discover its heritage
          </div>
        )}
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: '#fff', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-block', background: '#f0fdf4', color: '#16a34a',
            borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 700, marginBottom: 14
          }}>Core Features</div>
          <h2 style={{ fontSize: 38, fontWeight: 900, color: '#0f172a', marginBottom: 14, letterSpacing: -0.5 }}>{t('featTitle')}</h2>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>{t('featSub')}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {feats.map((f, i) => (
            <div
              key={i}
              style={{
                borderRadius: 20, padding: 24,
                border: '1px solid #e5e7eb',
                background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18, boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <f.Icon size={24} color="#fff" strokeWidth={2} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{t(f.titleKey)}</h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)', padding: '72px 48px', borderTop: '1px solid #d1fae5' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>ರೈತರ ಮಾತು — What Farmers Say</h2>
          <p style={{ fontSize: 15, color: '#6b7280' }}>Real stories from Karnataka's rural communities</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {testimonials.map((t2, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #d1fae5'
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {[...Array(5)].map((_, si) => <Star key={si} size={14} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{t2.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', fontSize: 16, fontWeight: 700,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>{t2.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{t2.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{t2.loc}, Karnataka</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f172a', padding: '36px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #16a34a, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wheat size={16} color="#fff" />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t('appName')}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Karnataka e-Governance Services Ltd. (KeGSL)</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Use', 'Help Center', 'Contact'].map(l => (
            <a key={l} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
