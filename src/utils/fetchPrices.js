/**
 * fetchPrices.js
 * Fetches live Karnataka APMC prices from data.gov.in (AGMARKNET API).
 * Falls back to baseline hardcoded prices if API is unavailable.
 * Uses localStorage to track yesterday's prices and compute daily change.
 */

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070'
// Public demo key from data.gov.in — register at https://data.gov.in for a personal key
const API_KEY = import.meta.env.VITE_AGMARKNET_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aead310bc1d4cef38b'
const CACHE_KEY = 'gramSetu_prices_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

// Maps AGMARKNET commodity names → our display format
const CROP_META = {
  'Maize': { name: 'Maize', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Uttara Kannada","Vijayapura","Yadgir","Vijayanagara"] },
  'Bengal': { name: 'Bengal', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'gram Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Vijayapura","Yadgir","Vijayanagara"] },
  'Groundnut': { name: 'Groundnut', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bidar","Chamarajanagar","Chikkaballapur","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Sunflower': { name: 'Sunflower', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Jowar': { name: 'Jowar', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Bajra': { name: 'Bajra', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1621245051880-998980b1807d?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari"] },
  'Wheat': { name: 'Wheat', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Belagavi","Bidar","Dharwad","Gadag","Kalaburagi","Koppal","Raichur","Vijayapura","Yadgir"] },
  'Tur': { name: 'Tur', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1582295679237-67c2900fae00?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Bengaluru Urban","Bidar","Chitradurga","Davanagere","Dharwad","Gadag","Haveri","Kalaburagi","Koppal","Mandya","Mysuru","Raichur","Tumakuru","Vijayapura","Yadgir","Vijayanagara"] },
  'Chilli': { name: 'Chilli', unit: 'per kg', img: 'https://images.unsplash.com/photo-1588880496155-20703f5ceef6?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Davanagere","Dharwad","Gadag","Haveri","Koppal","Raichur","Vijayapura","Vijayanagara"] },
  'Cotton': { name: 'Cotton', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1605724564887-21015f8c6eb8?w=500&q=80', market: 'Bagalkot APMC', districts: ["Bagalkot","Ballari","Belagavi","Davanagere","Dharwad","Gadag","Haveri","Koppal","Raichur","Vijayapura","Yadgir","Vijayanagara"] },
  'Paddy': { name: 'Paddy', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&q=80', market: 'Ballari APMC', districts: ["Ballari","Bengaluru Rural","Bengaluru Urban","Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Davanagere","Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayanagara"] },
  'Sugarcane': { name: 'Sugarcane', unit: 'per tonne', img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=500&q=80', market: 'Belagavi APMC', districts: ["Belagavi","Chamarajanagar","Davanagere","Mandya","Mysuru","Shivamogga","Vijayanagara"] },
  'Soybean': { name: 'Soybean', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1589178917812-70b3b44b81c2?w=500&q=80', market: 'Belagavi APMC', districts: ["Belagavi","Bidar","Dharwad","Gadag","Haveri","Kalaburagi","Vijayapura","Yadgir"] },
  'Ragi': { name: 'Ragi', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&q=80', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Bengaluru Urban","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Hassan","Kolar","Mandya","Mysuru","Ramanagara","Shivamogga","Tumakuru"] },
  'Tomato': { name: 'Tomato', unit: 'per kg', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Hassan","Kolar","Mandya","Ramanagara","Tumakuru"] },
  'Potato': { name: 'Potato', unit: 'per kg', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chikkamagaluru","Hassan","Kolar"] },
  'Onion': { name: 'Onion', unit: 'per kg', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chitradurga","Kolar","Tumakuru"] },
  'Beans': { name: 'Beans', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1563212035-777e38ba8e69?w=500&q=80', market: 'Hoskote APMC', districts: ["Bengaluru Rural","Chikkaballapur","Chikkamagaluru","Kolar"] },
  'Mulberry': { name: 'Mulberry', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1628186175150-13f898399eec?w=500&q=80', market: 'Bengaluru Rural APMC', districts: ["Bengaluru Rural","Chikkaballapur","Kolar","Mandya","Ramanagara"] },
  'Finger': { name: 'Finger', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'millet Bengaluru Rural APMC', districts: ["Bengaluru Rural"] },
  'Green': { name: 'Green', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'gram Bengaluru APMC', districts: ["Bengaluru Urban","Bidar","Chikkaballapur","Chikkamagaluru","Kalaburagi"] },
  'Black': { name: 'Black', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'gram Bengaluru Urban APMC', districts: ["Bengaluru Urban","Bidar","Dakshina Kannada","Hassan","Kalaburagi","Kodagu","Shivamogga","Udupi","Uttara Kannada","Yadgir"] },
  'Dry': { name: 'Dry', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'chilli Bengaluru APMC', districts: ["Bengaluru Urban"] },
  'Turmeric': { name: 'Turmeric', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban","Chamarajanagar","Dakshina Kannada","Kodagu","Mysuru","Shivamogga","Udupi","Uttara Kannada"] },
  'Tamarind': { name: 'Tamarind', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1586520773950-8b0932bb43de?w=500&q=80', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban","Chamarajanagar","Ramanagara"] },
  'Sesame': { name: 'Sesame', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1585257916524-1f6cc7ebfb8a?w=500&q=80', market: 'Bengaluru Urban APMC', districts: ["Bengaluru Urban"] },
  'Coconut': { name: 'Coconut', unit: 'per 100 nuts', img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500&q=80', market: 'Chamarajanagar APMC', districts: ["Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Hassan","Kodagu","Mandya","Mysuru","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada"] },
  'Areca Nut': { name: 'Areca Nut', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80', market: 'Chamarajanagar APMC', districts: ["Chamarajanagar","Chikkamagaluru","Dakshina Kannada","Hassan","Kodagu","Shivamogga","Udupi","Uttara Kannada"] },
  'Lime': { name: 'Lime', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1590847926127-1845fa85c150?w=500&q=80', market: 'Chikkaballapur APMC', districts: ["Chikkaballapur"] },
  'Coffee': { name: 'Coffee', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', market: 'Chikkamagaluru APMC', districts: ["Chikkamagaluru","Hassan","Kodagu"] },
  'Castor': { name: 'Castor', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'seed Chitradurga APMC', districts: ["Chitradurga"] },
  'Horse': { name: 'Horse', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', market: 'gram Chitradurga APMC', districts: ["Chitradurga"] },
  'Cashew': { name: 'Cashew', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1598926943867-0402b9e71ecf?w=500&q=80', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Udupi","Uttara Kannada"] },
  'Banana': { name: 'Banana', unit: 'per bunch', img: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=500&q=80', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Kodagu","Mandya","Mysuru","Ramanagara","Shivamogga","Udupi","Uttara Kannada"] },
  'Ginger': { name: 'Ginger', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1615485974635-4299b8dc9df0?w=500&q=80', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Hassan","Kodagu","Shivamogga","Udupi"] },
  'Cocoa': { name: 'Cocoa', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1610444537166-3d712ce1c9e8?w=500&q=80', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada","Kodagu","Udupi"] },
  'Rubber': { name: 'Rubber', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=500&q=80', market: 'Dakshina Kannada APMC', districts: ["Dakshina Kannada"] },
  'Cardamom': { name: 'Cardamom', unit: 'per kg', img: 'https://images.unsplash.com/photo-1628186175150-13f898399eec?w=500&q=80', market: 'Kodagu APMC', districts: ["Kodagu","Uttara Kannada"] },
  'Mango': { name: 'Mango', unit: 'per dozen', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&q=80', market: 'Kolar APMC', districts: ["Kolar","Ramanagara","Uttara Kannada"] },
  'Tobacco': { name: 'Tobacco', unit: 'per quintal', img: 'https://images.unsplash.com/photo-1598418042469-804d90ce482c?w=500&q=80', market: 'Mysuru APMC', districts: ["Mysuru"] },
  'Pineapple': { name: 'Pineapple', unit: 'per kg', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80', market: 'Udupi APMC', districts: ["Udupi"] },
};

export const BASELINE_PRICES = [
  { crop: 'Maize', unit: 'per quintal', price: '₹5,000', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=500&q=80', districts: CROP_META['Maize'].districts },
  { crop: 'Bengal', unit: 'per quintal', price: '₹5,000', change: '+₹10', trend: 'up', market: 'gram Bagalkot APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Bengal'].districts },
  { crop: 'Groundnut', unit: 'per quintal', price: '₹5,600', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=500&q=80', districts: CROP_META['Groundnut'].districts },
  { crop: 'Sunflower', unit: 'per quintal', price: '₹6,500', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&q=80', districts: CROP_META['Sunflower'].districts },
  { crop: 'Jowar', unit: 'per quintal', price: '₹3,500', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80', districts: CROP_META['Jowar'].districts },
  { crop: 'Bajra', unit: 'per quintal', price: '₹2,800', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1621245051880-998980b1807d?w=500&q=80', districts: CROP_META['Bajra'].districts },
  { crop: 'Wheat', unit: 'per quintal', price: '₹2,800', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80', districts: CROP_META['Wheat'].districts },
  { crop: 'Tur', unit: 'per quintal', price: '₹5,500', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1582295679237-67c2900fae00?w=500&q=80', districts: CROP_META['Tur'].districts },
  { crop: 'Chilli', unit: 'per kg', price: '₹23,000', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1588880496155-20703f5ceef6?w=500&q=80', districts: CROP_META['Chilli'].districts },
  { crop: 'Cotton', unit: 'per quintal', price: '₹7,000', change: '+₹10', trend: 'up', market: 'Bagalkot APMC', img: 'https://images.unsplash.com/photo-1605724564887-21015f8c6eb8?w=500&q=80', districts: CROP_META['Cotton'].districts },
  { crop: 'Paddy', unit: 'per quintal', price: '₹3,500', change: '+₹10', trend: 'up', market: 'Ballari APMC', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&q=80', districts: CROP_META['Paddy'].districts },
  { crop: 'Sugarcane', unit: 'per tonne', price: '₹350', change: '+₹10', trend: 'up', market: 'Belagavi APMC', img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=500&q=80', districts: CROP_META['Sugarcane'].districts },
  { crop: 'Soybean', unit: 'per quintal', price: '₹7,000', change: '+₹10', trend: 'up', market: 'Belagavi APMC', img: 'https://images.unsplash.com/photo-1589178917812-70b3b44b81c2?w=500&q=80', districts: CROP_META['Soybean'].districts },
  { crop: 'Ragi', unit: 'per quintal', price: '₹4,000', change: '+₹10', trend: 'up', market: 'Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&q=80', districts: CROP_META['Ragi'].districts },
  { crop: 'Tomato', unit: 'per kg', price: '₹2,500', change: '+₹10', trend: 'up', market: 'Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', districts: CROP_META['Tomato'].districts },
  { crop: 'Potato', unit: 'per kg', price: '₹1,500', change: '+₹10', trend: 'up', market: 'Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80', districts: CROP_META['Potato'].districts },
  { crop: 'Onion', unit: 'per kg', price: '₹1,800', change: '+₹10', trend: 'up', market: 'Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&q=80', districts: CROP_META['Onion'].districts },
  { crop: 'Beans', unit: 'per quintal', price: '₹3,600', change: '+₹10', trend: 'up', market: 'Hoskote APMC', img: 'https://images.unsplash.com/photo-1563212035-777e38ba8e69?w=500&q=80', districts: CROP_META['Beans'].districts },
  { crop: 'Mulberry', unit: 'per quintal', price: '₹6,000', change: '+₹10', trend: 'up', market: 'Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1628186175150-13f898399eec?w=500&q=80', districts: CROP_META['Mulberry'].districts },
  { crop: 'Finger', unit: 'per quintal', price: '₹4,000', change: '+₹10', trend: 'up', market: 'millet Bengaluru Rural APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Finger'].districts },
  { crop: 'Green', unit: 'per quintal', price: '₹10,750', change: '+₹10', trend: 'up', market: 'gram Bengaluru APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Green'].districts },
  { crop: 'Black', unit: 'per quintal', price: '₹5,000', change: '+₹10', trend: 'up', market: 'gram Bengaluru Urban APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Black'].districts },
  { crop: 'Dry', unit: 'per quintal', price: '₹23,000', change: '+₹10', trend: 'up', market: 'chilli Bengaluru APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Dry'].districts },
  { crop: 'Turmeric', unit: 'per quintal', price: '₹8,000', change: '+₹10', trend: 'up', market: 'Bengaluru Urban APMC', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80', districts: CROP_META['Turmeric'].districts },
  { crop: 'Tamarind', unit: 'per quintal', price: '₹12,500', change: '+₹10', trend: 'up', market: 'Bengaluru Urban APMC', img: 'https://images.unsplash.com/photo-1586520773950-8b0932bb43de?w=500&q=80', districts: CROP_META['Tamarind'].districts },
  { crop: 'Sesame', unit: 'per quintal', price: '₹15,500', change: '+₹10', trend: 'up', market: 'Bengaluru Urban APMC', img: 'https://images.unsplash.com/photo-1585257916524-1f6cc7ebfb8a?w=500&q=80', districts: CROP_META['Sesame'].districts },
  { crop: 'Coconut', unit: 'per 100 nuts', price: '₹3,500', change: '+₹10', trend: 'up', market: 'Chamarajanagar APMC', img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=500&q=80', districts: CROP_META['Coconut'].districts },
  { crop: 'Areca Nut', unit: 'per quintal', price: '₹32,000', change: '+₹10', trend: 'up', market: 'Chamarajanagar APMC', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80', districts: CROP_META['Areca Nut'].districts },
  { crop: 'Lime', unit: 'per quintal', price: '₹4,500', change: '+₹10', trend: 'up', market: 'Chikkaballapur APMC', img: 'https://images.unsplash.com/photo-1590847926127-1845fa85c150?w=500&q=80', districts: CROP_META['Lime'].districts },
  { crop: 'Coffee', unit: 'per quintal', price: '₹22,000', change: '+₹10', trend: 'up', market: 'Chikkamagaluru APMC', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80', districts: CROP_META['Coffee'].districts },
  { crop: 'Castor', unit: 'per quintal', price: '₹5,400', change: '+₹10', trend: 'up', market: 'seed Chitradurga APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Castor'].districts },
  { crop: 'Horse', unit: 'per quintal', price: '₹5,000', change: '+₹10', trend: 'up', market: 'gram Chitradurga APMC', img: 'https://images.unsplash.com/photo-1595858021156-fde26bd6c905?w=500&q=80', districts: CROP_META['Horse'].districts },
  { crop: 'Cashew', unit: 'per quintal', price: '₹12,000', change: '+₹10', trend: 'up', market: 'Dakshina Kannada APMC', img: 'https://images.unsplash.com/photo-1598926943867-0402b9e71ecf?w=500&q=80', districts: CROP_META['Cashew'].districts },
  { crop: 'Banana', unit: 'per bunch', price: '₹2,500', change: '+₹10', trend: 'up', market: 'Dakshina Kannada APMC', img: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=500&q=80', districts: CROP_META['Banana'].districts },
  { crop: 'Ginger', unit: 'per quintal', price: '₹7,800', change: '+₹10', trend: 'up', market: 'Dakshina Kannada APMC', img: 'https://images.unsplash.com/photo-1615485974635-4299b8dc9df0?w=500&q=80', districts: CROP_META['Ginger'].districts },
  { crop: 'Cocoa', unit: 'per quintal', price: '₹18,000', change: '+₹10', trend: 'up', market: 'Dakshina Kannada APMC', img: 'https://images.unsplash.com/photo-1610444537166-3d712ce1c9e8?w=500&q=80', districts: CROP_META['Cocoa'].districts },
  { crop: 'Rubber', unit: 'per quintal', price: '₹18,000', change: '+₹10', trend: 'up', market: 'Dakshina Kannada APMC', img: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=500&q=80', districts: CROP_META['Rubber'].districts },
  { crop: 'Cardamom', unit: 'per kg', price: '₹180,000', change: '+₹10', trend: 'up', market: 'Kodagu APMC', img: 'https://images.unsplash.com/photo-1628186175150-13f898399eec?w=500&q=80', districts: CROP_META['Cardamom'].districts },
  { crop: 'Mango', unit: 'per dozen', price: '₹5,000', change: '+₹10', trend: 'up', market: 'Kolar APMC', img: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=500&q=80', districts: CROP_META['Mango'].districts },
  { crop: 'Tobacco', unit: 'per quintal', price: '₹12,000', change: '+₹10', trend: 'up', market: 'Mysuru APMC', img: 'https://images.unsplash.com/photo-1598418042469-804d90ce482c?w=500&q=80', districts: CROP_META['Tobacco'].districts },
  { crop: 'Pineapple', unit: 'per kg', price: '₹3,500', change: '+₹10', trend: 'up', market: 'Udupi APMC', img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500&q=80', districts: CROP_META['Pineapple'].districts },
];

/** Format a raw number as ₹ with Indian commas */
const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/** Parse ₹ string back to a number */
const parsePrice = (str) => parseFloat(String(str).replace(/[₹,]/g, '')) || 0

/**
 * Fetch live APMC prices for Karnataka from data.gov.in.
 * Returns an array in the same shape as BASELINE_PRICES, or null on failure.
 */
export async function fetchLivePrices() {
  // Check localStorage cache first (valid for 1 hour)
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
    if (cached.ts && Date.now() - cached.ts < CACHE_TTL_MS && cached.data?.length) {
      console.log('[Prices] Using cached data from', new Date(cached.ts).toLocaleTimeString())
      return cached.data
    }
  } catch (_) {}

  try {
    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[state.keyword]=Karnataka&limit=200`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const records = json.records || json.data || []
    if (!records.length) throw new Error('Empty response')

    // Load yesterday's prices from localStorage for change computation
    const prevKey = 'gramSetu_prev_prices'
    const prevMap = JSON.parse(localStorage.getItem(prevKey) || '{}')

    // Deduplicate: pick the first record per commodity
    const seen = new Set()
    const mapped = []

    for (const r of records) {
      const commodity = r.commodity || r.Commodity || ''
      const meta = CROP_META[commodity]
      if (!meta || seen.has(meta.name)) continue
      seen.add(meta.name)

      const modal = parseFloat(r.modal_price || r.Modal_Price || 0)
      if (!modal) continue

      const prev = prevMap[meta.name] || modal
      const delta = modal - prev
      const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'neutral'
      const changeStr = delta === 0 ? '₹0'
        : (delta > 0 ? '+' : '') + fmt(delta)

      // Sugarcane API gives per quintal; convert to per tonne
      const adjustedPrice = commodity === 'Sugarcane' ? modal * 10 : modal

      mapped.push({
        crop: meta.name,
        unit: meta.unit,
        price: fmt(adjustedPrice),
        change: changeStr,
        trend,
        market: `APMC ${r.market || r.Market || meta.market.replace('APMC ', '')}`,
        img: meta.img,
        districts: meta.districts,
        _raw: modal,
      })
    }

    if (!mapped.length) throw new Error('No matching crops found')

    // Save current as "previous" for next fetch
    const newPrevMap = {}
    mapped.forEach(p => { newPrevMap[p.crop] = p._raw })
    localStorage.setItem(prevKey, JSON.stringify(newPrevMap))

    // Merge with baseline (add any crops missing from API)
    const liveNames = new Set(mapped.map(p => p.crop))
    const fallbacks = BASELINE_PRICES.filter(p => !liveNames.has(p.crop))
    const final = [...mapped, ...fallbacks]

    // Cache the result
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: final }))
    console.log(`[Prices] Live data fetched: ${mapped.length} crops from AGMARKNET`)
    return final

  } catch (err) {
    console.warn('[Prices] Live fetch failed, using baseline:', err.message)
    return null
  }
}

/** Clears the price cache (call this to force a fresh fetch) */
export function clearPriceCache() {
  localStorage.removeItem(CACHE_KEY)
}
