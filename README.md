# 🌾 GramSetu (ಗ್ರಾಮ ಸೇತು) — Village Bridge

> **A Civic-Tech & Agri-Intelligence Platform for Karnataka's Rural Citizens**  
> Developed by **Team Eclipse**

[![Live Demo](https://img.shields.io/badge/Live_Site-gram--setu--one.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://gram-setu-one.vercel.app)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline_Ready-orange?style=for-the-badge&logo=pwa&logoColor=white)](#offline--low-internet-resilience)
[![Tech Stack](https://img.shields.io/badge/React_19_+_Vite_8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![AI Powered](https://img.shields.io/badge/Google_Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Overview

**GramSetu** is an accessible, multilingual digital platform built to bridge the gap between Karnataka's rural citizens and government services. It provides farmers with real-time APMC mandi prices, direct buyer connections, AI crop disease diagnostics, precision soil health calculations, and automated grievance redressal.

---

## 🚀 Key Features

### 1. 🤝 Live Buyers & Direct Farmgate Selling (0% Commission)
- Connects farmers directly with verified FPOs, millers, and wholesale buyers across Karnataka.
- Bypasses middlemen with one-tap **📞 Call Buyer** and **💬 WhatsApp Direct** buttons.
- **"+ Sell My Produce"**: Farmers can post their harvest (crop, quantity in quintals, expected price, and phone number) to receive direct purchase offers.

### 2. 🧪 Soil Health Doctor & NPK Calculator
- Calculates exact commercial fertilizer bag requirements (**Urea 45kg**, **DAP 50kg**, **MOP 50kg**) based on Karnataka soil profiles (Red sandy, Laterite, Black cotton, Alluvial), crop, and acreage.
- Recommends organic inputs (compost, neem cake, bio-fertilizers, and lime).
- **Gemini AI Soil Advisor**: Generates personalized soil microbiome and moisture management tips.
- **Downloadable PDF Soil Card**: Exports a print-ready bilingual Soil Health Card.

### 3. 🔬 Crop Doctor (AI Visual Disease Scanner)
- Uses computer vision (Google Gemini AI) to detect crop diseases (Ragi blast, Arecanut Koleroga, Coffee rust, Paddy blight, etc.) from leaf photos.
- Delivers dual remedies: organic treatments (Neem oil, Jeevamrutha, Trichoderma) and university-approved chemical dosages.

### 4. 🏛️ Verified 31-District RSK Agronomist Directory
- Gives farmers direct phone numbers for their **local Raitha Samparka Kendra (RSK) office**, **designated senior agronomist mobile**, and **ICAR Krishi Vigyan Kendra (KVK)** across all 31 Karnataka districts.

### 5. 🌾 Live APMC Mandi Intelligence & Yield Estimator
- Daily modal prices, trends, and MSP baselines for 20+ crops across 31 district markets.
- Built-in crop yield and revenue calculator per acre.

### 6. 📜 30+ Government Schemes & AI Eligibility Checker
- Interactive directory of Central & State schemes (*PM-KISAN, Raitha Siri, Gruha Lakshmi, Krishi Bhagya, PMFBY, SSP Scholarships*).
- AI Eligibility Checker determines scheme fit based on landholding, caste, district, and annual income.

### 7. ⚖️ Grievance Filing with 4-Tier Auto-Escalation
- Citizens file civic or agricultural complaints with photo proof.
- Auto-escalation matrix if issues remain unresolved:
  $$\text{Gram Panchayat (PDO)} \xrightarrow{7\text{ days}} \text{Taluk (EO)} \xrightarrow{14\text{ days}} \text{Zilla (CEO)} \xrightarrow{21\text{ days}} \text{RDPR Commissioner}$$

### 8. 🌦️ AI Weather-Based Crop Advisory
- Live weather forecasts (temperature, humidity, rain probability) paired with daily actionable farm tasks and risk alerts from Gemini AI.

---

## 📶 Offline & Low-Internet Resilience

GramSetu is specifically engineered for rural areas with weak 2G or intermittent mobile networks:

- **PWA (Installable App):** Farmers can tap the prominent **Install App** button to install GramSetu directly on Android or iOS home screens.
- **Service Worker Caching (`sw.js`):** The app shell and core assets are cached locally, loading in **< 300ms** even without an active internet connection.
- **Embedded Local Datasets:** Schemes, crop disease remedies, fertilizer calculators, and RSK phone numbers are stored on the device and work **100% offline**.
- **Offline Indicator:** Automatically detects network drops and informs the user of active offline tools.
- **GSM Voice Fallback:** Critical RSK agronomist and emergency contacts support standard cellular voice dialing that works on basic 2G voice towers.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, React Router v7 |
| **Styling & Icons** | Vanilla CSS Design System, Lucide React |
| **Offline & PWA** | Service Worker (`sw.js`), Web App Manifest (`manifest.json`) |
| **Artificial Intelligence** | Google Gemini 2.5 Flash & Vision AI |
| **Database & Auth** | Google Firebase Firestore & Firebase Auth |
| **PDF Generation** | jsPDF, jspdf-autotable |
| **Languages Supported** | Kannada (ಕನ್ನಡ), English, Hindi (हिन्दी) |

---

## 💻 Quick Start & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/eshwarhs170-a11y/GramSetu.git
cd GramSetu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the project root:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the development server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 5. Build for production
```bash
npm run build
```

---

## 👥 Team Eclipse

- **Project:** GramSetu (ಗ್ರಾಮ ಸೇತು)
- **GitHub:** [@eshwarhs170-a11y](https://github.com/eshwarhs170-a11y)
- **Repository:** [https://github.com/eshwarhs170-a11y/GramSetu](https://github.com/eshwarhs170-a11y/GramSetu)
- **Live Deployment:** [gram-setu-one.vercel.app](https://gram-setu-one.vercel.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
