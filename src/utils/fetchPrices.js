/**
 * Utility to fetch live crop prices from AGMARKNET API
 * Uses local baseline data as fallback if the API is down or empty.
 */

// Your API Key from data.gov.in
const API_KEY = import.meta.env.VITE_AGMARKNET_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aead310bc1d4cef38b'
const CACHE_KEY = 'gramSetu_prices_cache_v5'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

// Maps AGMARKNET commodity names → our display format
const CROP_META = {
  'Maize': { name: 'Maize (ಮೆಕ್ಕೆಜೋಳ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/CookedCornOnTheCob.JPG/500px-CookedCornOnTheCob.JPG', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Uttara Kannada","Vijayapura","Yadgir","Vijayanagara"] },
  'Bengal gram': { name: 'Bengal gram (ಕಡಲೆ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Chickpeas_in_a_bowl.jpg/500px-Chickpeas_in_a_bowl.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Vijayapura","Yadgir","Vijayanagara"] },
  'Groundnut': { name: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Peanuts.jpg/500px-Peanuts.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bidar","Chamarajanagar","Chikkaballapur","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Sunflower': { name: 'Sunflower (ಸೂರ್ಯಕಾಂತಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/500px-Sunflower_sky_backdrop.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Jowar': { name: 'Jowar (ಜೋಳ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Sorghum_bicolor_01.jpg/500px-Sorghum_bicolor_01.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Bajra': { name: 'Bajra (ಸಜ್ಜೆ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Pearl_millet.jpg/500px-Pearl_millet.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari"] },
  'Wheat': { name: 'Wheat (ಗೋಧಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wheat_close-up.jpg/500px-Wheat_close-up.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Belagavi","Bidar","Dharwad","Gadag","Kalaburagi","Koppal","Raichur","Vijayapura","Yadgir"] },
  'Tur': { name: 'Tur (ತೊಗರಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pigeon_peas.jpg/500px-Pigeon_peas.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Urban","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Mandya","Mysuru","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Chilli': { name: 'Chilli (ಮೆಣಸಿನಕಾಯಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Red_Chilies.jpg/500px-Red_Chilies.jpg', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Davanagere","Dharwad","Gadag","Haveri","Koppal","Raichur","Vijayapura","Vijayanagara"] },
  'Cotton': { name: 'Cotton (ಹತ್ತಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cotton.JPG/500px-Cotton.JPG', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Davanagere","Dharwad","Gadag","Haveri","Koppal","Raichur","Vijayapura","Yadgir","Vijayanagara"] },
  'Paddy': { name: 'Paddy (ಭತ್ತ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rice_fields_in_the_Philippines.jpg/500px-Rice_fields_in_the_Philippines.jpg', market: 'Ballari APMC', districts: ["Ballari","Bengaluru Rural","Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Davanagere","Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayanagara"] },
  'Sugarcane': { name: 'Sugarcane (ಕಬ್ಬು)', unit: 'per tonne', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Sugarcane_harvest.jpg/500px-Sugarcane_harvest.jpg', market: 'Belagavi APMC', districts: ["Belagavi","Chamarajanagar","Davanagere","Mandya","Mysuru","Shivamogga","Vijayanagara"] },
  'Soybean': { name: 'Soybean (ಸೋಯಾಬೀನ್)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Soybean.USDA.jpg/500px-Soybean.USDA.jpg', market: 'Belagavi APMC', districts: ["Belagavi","Bidar","Dharwad","Gadag","Haveri","Kalaburagi","Vijayapura","Yadgir"] },
  'Ragi': { name: 'Ragi (ರಾಗಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Eleusine_coracana.jpg/500px-Eleusine_coracana.jpg', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Bengaluru Urban","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Hassan","Kolar","Mandya","Mysuru","Ramanagara","Shivamogga","Tumakuru"] },
  'Tomato': { name: 'Tomato (ಟೊಮೇಟೊ)', unit: 'per kg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/500px-Tomato_je.jpg', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Hassan","Kolar","Mandya","Ramanagara","Tumakuru"] },
  'Potato': { name: 'Potato (ಆಲೂಗಡ್ಡೆ)', unit: 'per kg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/500px-Patates.jpg', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chikkamagaluru","Hassan","Kolar"] },
  'Onion': { name: 'Onion (ಈರುಳ್ಳಿ)', unit: 'per kg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Red_onions_11.jpg/500px-Red_onions_11.jpg', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chitradurga","Kolar","Tumakuru"] },
  'Beans': { name: 'Beans (ಬೀನ್ಸ್)', unit: 'per kg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Green_beans.jpg/500px-Green_beans.jpg', market: 'Hoskote APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chikkamagaluru","Kolar"] },
  'Mulberry': { name: 'Mulberry (ಹಿಪ್ಪುನೇರಳೆ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Morus_nigra_001.JPG/500px-Morus_nigra_001.JPG', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Kolar","Mandya","Ramanagara"] },
  'Finger millet': { name: 'Finger millet (ರಾಗಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Eleusine_coracana.jpg/500px-Eleusine_coracana.jpg', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural"] },
  'Rice': { name: 'Rice (ಅಕ್ಕಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rice_fields_in_the_Philippines.jpg/500px-Rice_fields_in_the_Philippines.jpg', market: 'Bengaluru APMC', districts: ["Bengaluru Urban"] },
  'Green gram': { name: 'Green gram (ಹೆಸರು ಕಾಳು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mung_beans.jpg/500px-Mung_beans.jpg', market: 'Bengaluru APMC', districts: ["Bengaluru Urban","Bidar","Kalaburagi"] },
  'Black gram': { name: 'Black gram (ಉದ್ದು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Vigna_mungo.jpg/500px-Vigna_mungo.jpg', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban","Bidar","Kalaburagi","Yadgir"] },
  'Dry chilli': { name: 'Dry chilli (ಒಣ ಮೆಣಸಿನಕಾಯಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Red_Chilies.jpg/500px-Red_Chilies.jpg', market: 'Bengaluru APMC', districts: ["Bengaluru Urban"] },
  'Turmeric': { name: 'Turmeric (ಅರಿಶಿನ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Curcuma_longa_roots.jpg/500px-Curcuma_longa_roots.jpg', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban","Chamarajanagar","Dakshina Kannada","Kodagu","Mysuru","Shivamogga","Udupi","Uttara Kannada"] },
  'Tamarind': { name: 'Tamarind (ಹುಣಸೆಹಣ್ಣು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Tamarind_02.jpg/500px-Tamarind_02.jpg', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban","Chamarajanagar","Ramanagara"] },
  'Sesame': { name: 'Sesame (ಎಳ್ಳು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sesame_seeds.jpg/500px-Sesame_seeds.jpg', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban"] },
  'Coconut': { name: 'Coconut (ತೆಂಗಿನಕಾಯಿ)', unit: 'per 100 nuts', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Coconut_-_Whole_and_Halved.jpg/500px-Coconut_-_Whole_and_Halved.jpg', market: 'Chamarajanagar APMC', districts: ["Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Hassan","Kodagu","Mandya","Mysuru","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada"] },
  'Arecanut': { name: 'Arecanut (ಅಡಿಕೆ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Areca_catechu_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-014.jpg/500px-Areca_catechu_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-014.jpg', market: 'Chamarajanagar APMC', districts: ["Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Hassan","Kodagu","Shivamogga","Udupi","Uttara Kannada"] },
  'Green chilli': { name: 'Green chilli (ಹಸಿ ಮೆಣಸಿನಕಾಯಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Green_Chili_Pepper.jpg/500px-Green_Chili_Pepper.jpg', market: 'Chikkaballapur APMC', districts: ["Chikkaballapur","Chikkamagaluru"] },
  'Lime': { name: 'Lime (ನಿಂಬೆಹಣ್ಣು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Lime_-_whole_and_halved.jpg/500px-Lime_-_whole_and_halved.jpg', market: 'Chikkaballapur APMC', districts: ["Chikkaballapur"] },
  'Coffee': { name: 'Coffee (ಕಾಫಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/500px-Roasted_coffee_beans.jpg', market: 'Chikkamagaluru APMC', districts: ["Chikkamagaluru","Hassan","Kodagu"] },
  'Castor seed': { name: 'Castor seed (ಹರಳು ಬೀಜ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ricinus_communis_seeds.jpg/500px-Ricinus_communis_seeds.jpg', market: 'Chitradurga APMC', districts: ["Chitradurga"] },
  'Horse gram': { name: 'Horse gram (ಹುರುಳಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Macrotyloma_uniflorum_seeds.jpg/500px-Macrotyloma_uniflorum_seeds.jpg', market: 'Chitradurga APMC', districts: ["Chitradurga"] },
  'Cashew': { name: 'Cashew (ಗೇರುಬೀಜ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cashew_Nut_in_Shell.jpg/500px-Cashew_Nut_in_Shell.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Udupi","Uttara Kannada"] },
  'Black pepper': { name: 'Black pepper (ಕಾಳುಮೆಣಸು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Black_Pepper.jpg/500px-Black_Pepper.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Hassan","Kodagu","Shivamogga","Udupi","Uttara Kannada"] },
  'Banana': { name: 'Banana (ಬಾಳೆಹಣ್ಣು)', unit: 'per bunch', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/500px-Bananas_white_background_DS.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Kodagu","Mandya","Mysuru","Ramanagara","Shivamogga","Udupi","Uttara Kannada"] },
  'Ginger': { name: 'Ginger (ಶುಂಠಿ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ginger_root.jpg/500px-Ginger_root.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Hassan","Kodagu","Shivamogga","Udupi"] },
  'Cocoa': { name: 'Cocoa (ಕೋಕೋ)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Cocoa_Pods.jpg/500px-Cocoa_Pods.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Kodagu","Udupi"] },
  'Rubber': { name: 'Rubber (ರಬ್ಬರ್)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Rubber_tree_plantation.jpg/500px-Rubber_tree_plantation.jpg', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada"] },
  'Cardamom': { name: 'Cardamom (ಏಲಕ್ಕಿ)', unit: 'per kg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cardamom_pods.jpg/500px-Cardamom_pods.jpg', market: 'Kodagu APMC', districts: ["Kodagu","Uttara Kannada"] },
  'Mango': { name: 'Mango (ಮಾವಿನಹಣ್ಣು)', unit: 'per dozen', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mango_-_single.jpg/500px-Mango_-_single.jpg', market: 'Kolar APMC', districts: ["Kolar","Ramanagara","Uttara Kannada"] },
  'Tobacco': { name: 'Tobacco (ತಂಬಾಕು)', unit: 'per quintal', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tobacco_leaves.jpg/500px-Tobacco_leaves.jpg', market: 'Mysuru APMC', districts: ["Mysuru"] },
  'Pineapple': { name: 'Pineapple (ಅನಾನಸ್)', unit: 'per piece', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/500px-Pineapple_and_cross_section.jpg', market: 'Udupi APMC', districts: ["Udupi"] },
};

// Master list of all unique crops for the baseline
export const BASELINE_PRICES = [
  { crop: CROP_META['Maize'].name, unit: CROP_META['Maize'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Maize'].market, img: CROP_META['Maize'].img, districts: CROP_META['Maize'].districts },
  { crop: CROP_META['Bengal gram'].name, unit: CROP_META['Bengal gram'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Bengal gram'].market, img: CROP_META['Bengal gram'].img, districts: CROP_META['Bengal gram'].districts },
  { crop: CROP_META['Groundnut'].name, unit: CROP_META['Groundnut'].unit, price: '₹5,600', change: '+₹10', trend: 'up', market: CROP_META['Groundnut'].market, img: CROP_META['Groundnut'].img, districts: CROP_META['Groundnut'].districts },
  { crop: CROP_META['Sunflower'].name, unit: CROP_META['Sunflower'].unit, price: '₹6,500', change: '+₹10', trend: 'up', market: CROP_META['Sunflower'].market, img: CROP_META['Sunflower'].img, districts: CROP_META['Sunflower'].districts },
  { crop: CROP_META['Jowar'].name, unit: CROP_META['Jowar'].unit, price: '₹3,500', change: '+₹10', trend: 'up', market: CROP_META['Jowar'].market, img: CROP_META['Jowar'].img, districts: CROP_META['Jowar'].districts },
  { crop: CROP_META['Bajra'].name, unit: CROP_META['Bajra'].unit, price: '₹2,800', change: '+₹10', trend: 'up', market: CROP_META['Bajra'].market, img: CROP_META['Bajra'].img, districts: CROP_META['Bajra'].districts },
  { crop: CROP_META['Wheat'].name, unit: CROP_META['Wheat'].unit, price: '₹2,800', change: '+₹10', trend: 'up', market: CROP_META['Wheat'].market, img: CROP_META['Wheat'].img, districts: CROP_META['Wheat'].districts },
  { crop: CROP_META['Tur'].name, unit: CROP_META['Tur'].unit, price: '₹5,500', change: '+₹10', trend: 'up', market: CROP_META['Tur'].market, img: CROP_META['Tur'].img, districts: CROP_META['Tur'].districts },
  { crop: CROP_META['Chilli'].name, unit: CROP_META['Chilli'].unit, price: '₹23,000', change: '+₹10', trend: 'up', market: CROP_META['Chilli'].market, img: CROP_META['Chilli'].img, districts: CROP_META['Chilli'].districts },
  { crop: CROP_META['Cotton'].name, unit: CROP_META['Cotton'].unit, price: '₹7,000', change: '+₹10', trend: 'up', market: CROP_META['Cotton'].market, img: CROP_META['Cotton'].img, districts: CROP_META['Cotton'].districts },
  { crop: CROP_META['Paddy'].name, unit: CROP_META['Paddy'].unit, price: '₹3,500', change: '+₹10', trend: 'up', market: CROP_META['Paddy'].market, img: CROP_META['Paddy'].img, districts: CROP_META['Paddy'].districts },
  { crop: CROP_META['Sugarcane'].name, unit: CROP_META['Sugarcane'].unit, price: '₹350', change: '+₹10', trend: 'up', market: CROP_META['Sugarcane'].market, img: CROP_META['Sugarcane'].img, districts: CROP_META['Sugarcane'].districts },
  { crop: CROP_META['Soybean'].name, unit: CROP_META['Soybean'].unit, price: '₹7,000', change: '+₹10', trend: 'up', market: CROP_META['Soybean'].market, img: CROP_META['Soybean'].img, districts: CROP_META['Soybean'].districts },
  { crop: CROP_META['Ragi'].name, unit: CROP_META['Ragi'].unit, price: '₹4,000', change: '+₹10', trend: 'up', market: CROP_META['Ragi'].market, img: CROP_META['Ragi'].img, districts: CROP_META['Ragi'].districts },
  { crop: CROP_META['Tomato'].name, unit: CROP_META['Tomato'].unit, price: '₹2,500', change: '+₹10', trend: 'up', market: CROP_META['Tomato'].market, img: CROP_META['Tomato'].img, districts: CROP_META['Tomato'].districts },
  { crop: CROP_META['Potato'].name, unit: CROP_META['Potato'].unit, price: '₹1,500', change: '+₹10', trend: 'up', market: CROP_META['Potato'].market, img: CROP_META['Potato'].img, districts: CROP_META['Potato'].districts },
  { crop: CROP_META['Onion'].name, unit: CROP_META['Onion'].unit, price: '₹1,800', change: '+₹10', trend: 'up', market: CROP_META['Onion'].market, img: CROP_META['Onion'].img, districts: CROP_META['Onion'].districts },
  { crop: CROP_META['Beans'].name, unit: CROP_META['Beans'].unit, price: '₹3,600', change: '+₹10', trend: 'up', market: CROP_META['Beans'].market, img: CROP_META['Beans'].img, districts: CROP_META['Beans'].districts },
  { crop: CROP_META['Mulberry'].name, unit: CROP_META['Mulberry'].unit, price: '₹6,000', change: '+₹10', trend: 'up', market: CROP_META['Mulberry'].market, img: CROP_META['Mulberry'].img, districts: CROP_META['Mulberry'].districts },
  { crop: CROP_META['Finger millet'].name, unit: CROP_META['Finger millet'].unit, price: '₹4,000', change: '+₹10', trend: 'up', market: CROP_META['Finger millet'].market, img: CROP_META['Finger millet'].img, districts: CROP_META['Finger millet'].districts },
  { crop: CROP_META['Rice'].name, unit: CROP_META['Rice'].unit, price: '₹5,333', change: '+₹10', trend: 'up', market: CROP_META['Rice'].market, img: CROP_META['Rice'].img, districts: CROP_META['Rice'].districts },
  { crop: CROP_META['Green gram'].name, unit: CROP_META['Green gram'].unit, price: '₹10,750', change: '+₹10', trend: 'up', market: CROP_META['Green gram'].market, img: CROP_META['Green gram'].img, districts: CROP_META['Green gram'].districts },
  { crop: CROP_META['Black gram'].name, unit: CROP_META['Black gram'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Black gram'].market, img: CROP_META['Black gram'].img, districts: CROP_META['Black gram'].districts },
  { crop: CROP_META['Dry chilli'].name, unit: CROP_META['Dry chilli'].unit, price: '₹23,000', change: '+₹10', trend: 'up', market: CROP_META['Dry chilli'].market, img: CROP_META['Dry chilli'].img, districts: CROP_META['Dry chilli'].districts },
  { crop: CROP_META['Turmeric'].name, unit: CROP_META['Turmeric'].unit, price: '₹8,000', change: '+₹10', trend: 'up', market: CROP_META['Turmeric'].market, img: CROP_META['Turmeric'].img, districts: CROP_META['Turmeric'].districts },
  { crop: CROP_META['Tamarind'].name, unit: CROP_META['Tamarind'].unit, price: '₹12,500', change: '+₹10', trend: 'up', market: CROP_META['Tamarind'].market, img: CROP_META['Tamarind'].img, districts: CROP_META['Tamarind'].districts },
  { crop: CROP_META['Sesame'].name, unit: CROP_META['Sesame'].unit, price: '₹15,500', change: '+₹10', trend: 'up', market: CROP_META['Sesame'].market, img: CROP_META['Sesame'].img, districts: CROP_META['Sesame'].districts },
  { crop: CROP_META['Coconut'].name, unit: CROP_META['Coconut'].unit, price: '₹3,500', change: '+₹10', trend: 'up', market: CROP_META['Coconut'].market, img: CROP_META['Coconut'].img, districts: CROP_META['Coconut'].districts },
  { crop: CROP_META['Arecanut'].name, unit: CROP_META['Arecanut'].unit, price: '₹32,000', change: '+₹10', trend: 'up', market: CROP_META['Arecanut'].market, img: CROP_META['Arecanut'].img, districts: CROP_META['Arecanut'].districts },
  { crop: CROP_META['Green chilli'].name, unit: CROP_META['Green chilli'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Green chilli'].market, img: CROP_META['Green chilli'].img, districts: CROP_META['Green chilli'].districts },
  { crop: CROP_META['Lime'].name, unit: CROP_META['Lime'].unit, price: '₹4,500', change: '+₹10', trend: 'up', market: CROP_META['Lime'].market, img: CROP_META['Lime'].img, districts: CROP_META['Lime'].districts },
  { crop: CROP_META['Coffee'].name, unit: CROP_META['Coffee'].unit, price: '₹22,000', change: '+₹10', trend: 'up', market: CROP_META['Coffee'].market, img: CROP_META['Coffee'].img, districts: CROP_META['Coffee'].districts },
  { crop: CROP_META['Castor seed'].name, unit: CROP_META['Castor seed'].unit, price: '₹5,400', change: '+₹10', trend: 'up', market: CROP_META['Castor seed'].market, img: CROP_META['Castor seed'].img, districts: CROP_META['Castor seed'].districts },
  { crop: CROP_META['Horse gram'].name, unit: CROP_META['Horse gram'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Horse gram'].market, img: CROP_META['Horse gram'].img, districts: CROP_META['Horse gram'].districts },
  { crop: CROP_META['Cashew'].name, unit: CROP_META['Cashew'].unit, price: '₹12,000', change: '+₹10', trend: 'up', market: CROP_META['Cashew'].market, img: CROP_META['Cashew'].img, districts: CROP_META['Cashew'].districts },
  { crop: CROP_META['Black pepper'].name, unit: CROP_META['Black pepper'].unit, price: '₹65,000', change: '+₹10', trend: 'up', market: CROP_META['Black pepper'].market, img: CROP_META['Black pepper'].img, districts: CROP_META['Black pepper'].districts },
  { crop: CROP_META['Banana'].name, unit: CROP_META['Banana'].unit, price: '₹2,500', change: '+₹10', trend: 'up', market: CROP_META['Banana'].market, img: CROP_META['Banana'].img, districts: CROP_META['Banana'].districts },
  { crop: CROP_META['Ginger'].name, unit: CROP_META['Ginger'].unit, price: '₹7,800', change: '+₹10', trend: 'up', market: CROP_META['Ginger'].market, img: CROP_META['Ginger'].img, districts: CROP_META['Ginger'].districts },
  { crop: CROP_META['Cocoa'].name, unit: CROP_META['Cocoa'].unit, price: '₹18,000', change: '+₹10', trend: 'up', market: CROP_META['Cocoa'].market, img: CROP_META['Cocoa'].img, districts: CROP_META['Cocoa'].districts },
  { crop: CROP_META['Rubber'].name, unit: CROP_META['Rubber'].unit, price: '₹18,000', change: '+₹10', trend: 'up', market: CROP_META['Rubber'].market, img: CROP_META['Rubber'].img, districts: CROP_META['Rubber'].districts },
  { crop: CROP_META['Cardamom'].name, unit: CROP_META['Cardamom'].unit, price: '₹180,000', change: '+₹10', trend: 'up', market: CROP_META['Cardamom'].market, img: CROP_META['Cardamom'].img, districts: CROP_META['Cardamom'].districts },
  { crop: CROP_META['Mango'].name, unit: CROP_META['Mango'].unit, price: '₹5,000', change: '+₹10', trend: 'up', market: CROP_META['Mango'].market, img: CROP_META['Mango'].img, districts: CROP_META['Mango'].districts },
  { crop: CROP_META['Tobacco'].name, unit: CROP_META['Tobacco'].unit, price: '₹12,000', change: '+₹10', trend: 'up', market: CROP_META['Tobacco'].market, img: CROP_META['Tobacco'].img, districts: CROP_META['Tobacco'].districts },
  { crop: CROP_META['Pineapple'].name, unit: CROP_META['Pineapple'].unit, price: '₹3,500', change: '+₹10', trend: 'up', market: CROP_META['Pineapple'].market, img: CROP_META['Pineapple'].img, districts: CROP_META['Pineapple'].districts }
];

/** Format a raw number as ₹ with Indian commas */
const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/** Clear cache */
export function clearPriceCache() {
  window.localStorage.removeItem(CACHE_KEY)
}

/** 
 * Try to fetch from AGMARKNET API.
 * Maps API records to our BASELINE_PRICES, updating the price dynamically if found.
 */
export async function fetchLivePrices() {
  const cached = window.localStorage.getItem(CACHE_KEY)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data
      }
    } catch (e) {}
  }

  try {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const res = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[state]=Karnataka&filters[arrival_date]=${today}`)
    if (!res.ok) throw new Error('API failed')
    const json = await res.json()
    const records = json.records || []

    if (records.length === 0) {
      return null
    }

    // Merge live data with baseline structure
    const updatedPrices = BASELINE_PRICES.map(baseCrop => {
      const enNameMatch = baseCrop.crop.match(/^([a-zA-Z ]+)/)
      const englishName = enNameMatch ? enNameMatch[1].trim() : baseCrop.crop
      
      const liveData = records.find(r => r.commodity && r.commodity.toLowerCase().includes(englishName.toLowerCase()))
      if (liveData) {
        const newPrice = parseFloat(liveData.modal_price)
        const oldPriceRaw = baseCrop.price.replace(/[^0-9]/g, '')
        const oldPrice = oldPriceRaw ? parseFloat(oldPriceRaw) : newPrice
        
        const changeVal = newPrice - oldPrice
        return {
          ...baseCrop,
          price: fmt(newPrice),
          change: changeVal >= 0 ? '+' + fmt(changeVal) : '-' + fmt(Math.abs(changeVal)),
          trend: changeVal >= 0 ? 'up' : 'down',
          market: liveData.market + ' APMC'
        }
      }
      return baseCrop // keep baseline if no live data found today
    })

    window.localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: updatedPrices
    }))

    return updatedPrices

  } catch (err) {
    console.error('Failed to fetch live prices, falling back to baseline:', err)
    return null
  }
}
