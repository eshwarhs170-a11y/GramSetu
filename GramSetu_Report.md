# GramSetu — Village Bridge

**By Eshwar H S**

---

## Links

- **Website:** [gram-setu-one.vercel.app](https://gram-setu-one.vercel.app)
- **GitHub Repository:** [github.com/eshwarhs170-a11y/GramSetu](https://github.com/eshwarhs170-a11y/GramSetu)

---

## About the Project

**GramSetu** (Village Bridge) is a civic-tech web platform designed to bridge the digital and administrative divide for Karnataka's 6+ crore rural citizens and farmers.

GramSetu eliminates bureaucratic friction and language barriers by delivering government services, AI-powered agricultural tools, live market data, and real-time grievance escalation — all through an intuitive, voice-first interface accessible to non-technical rural users.

Unlike typical e-governance portals that assume digital literacy and English proficiency, GramSetu is built ground-up for accessibility, offline resilience, and local-language interaction — making government services reachable at the fingertip of every farmer and villager in Karnataka.

![image](https://github.com/eshwarhs170-a11y/GramSetu/blob/main/public/app-image/gramsetu-img.png?raw=true)

---

## Key Features

### Crop Doctor — AI Crop Disease Scanner

Powered by Google Gemini Vision AI, Crop Doctor instantly diagnoses diseased crops from live camera captures, uploaded photos, or even scanned printed sheets.

- Full crop database covering Paddy, Ragi, Maize, Cotton, Tomato, Potato, Onion, Sugarcane, Arecanut, Coffee, Banana, Mango, Groundnut, Wheat, and Jowar
- Actionable diagnostic reports with disease severity ratings, chemical spray dosages, fertilizer plans, and organic farming tips
- Direct links to eligible government compensation schemes (PMFBY, Raitha Siri) based on the detected disease
- Automatic translation of remedies and chemical instructions into Kannada

---

### GramSetu AI Voice Assistant

A fully speech-to-speech AI assistant built on top of the Web Speech API and Google Gemini AI.

- Native recognition and synthesis for Kannada, English, and Hindi
- Hands-free voice commands to navigate the entire platform
- Answers questions on Karnataka crop prices, MSP, and government subsidies with automatic multi-model fallback
- Real-time waveform visualizer rendered via the Web Audio API

---

### Smart Grievance Escalation

A 4-tier automated escalation pipeline for rural citizen complaints, routed by geography and department.

- Filter grievances by My Taluk, My District, or All Karnataka
- Photo-verified evidence captured and stored directly in Firestore for official inspection
- Complaints routed strictly by District > Taluk > Gram Panchayat to the relevant line officers
- Auto-escalation: PDO (7 days) → Taluk EO (14 days) → Zilla Panchayat CEO (21 days) → RDPR Commissioner
- Real-time status tracking with official response logs and resolution timestamps

---

### Live APMC Market Intelligence

Real-time agricultural commodity prices across all 31 Karnataka districts.

- Live prices for Copra, Paddy, Arecanut, Ragi, Maize, Cotton, Turmeric, Tomato, and more
- Color-coded intraday fluctuation indicators for intuitive market reading

---

### Scheme & Scholarship Discovery

A curated directory of Central and Karnataka State government welfare programs.

- Agricultural schemes: PM-KISAN, Raitha Siri, Krishi Bhagya, PM Fasal Bima Yojana, Ganga Kalyana, Soil Health Card, RuPay Kisan Credit Card
- Student scholarships: SSP, Buddy4Study, HDFC Parivartan, MANF, AICTE Saksham, PM-YASASVI
- Smart eligibility filter by Education Level, Family Income, and District
- Every scheme links directly to the official government portal — no mock applications
- Scheme guidelines read aloud via Text-to-Speech in the selected language

---

### Farmer Helpdesk & Inquiry Submission

A structured citizen inquiry portal connecting farmers directly with line officers.

- Multi-category filing: question, missing village, missing scheme, app issue
- Automatic District and Taluk geo-tagging for every submission
- Unique tracking tickets (e.g. GS-INQ-849201) with live status updates: pending → in review → resolved
- Line officers and PDOs receive and resolve inquiries through a dedicated official dashboard inbox

---

### Weather & Emergency SOS

- Live taluk-level weather data via Open-Meteo API with a taluk switcher dropdown
- One-tap Emergency SOS with direct access to helplines: 108, 100, 101, and more

---

### Explore Karnataka — 31 District Hubs

- Interactive showcases covering local agriculture, heritage, and administrative data for every Karnataka district
- 170 locally cached cultural and agricultural images for fast, zero-latency display

---

## Technology Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Vanilla CSS with full Dark / Light mode
- **Database:** Google Cloud Firestore
- **Authentication:** Firebase Auth + Custom Email OTP via Gmail SMTP (Nodemailer)
- **AI:** Google Generative AI — Gemini Flash & Vision
- **Voice:** Web Speech API — recognition and synthesis
- **Weather:** Open-Meteo API
- **Market Prices:** APMC Karnataka Live Feed
- **Maps:** Leaflet + React-Leaflet
- **PDF Export:** jspdf + jspdf-autotable
- **QR Codes:** qrcode.react
- **Hosting:** Vercel

---

## Multilingual Support

GramSetu supports instant language switching across the entire platform — all UI labels, scheme content, voice commands, and notifications.

- **English** — 100% coverage across UI, schemes, navigation, and voice
- **Kannada** — 100% coverage across UI, APMC names, schemes, complaints, and voice
- **Hindi** — 100% coverage across UI, schemes, and text-to-speech

---

## Project Journey

GramSetu was built in a rapid 11-day development sprint (July 30 – September 2, 2026), evolving from a basic citizen dashboard to a full AI-powered civic platform.

- **Day 1** — Core scaffold with Vite + React, multi-language support, villager navigation
- **Day 2** — Vercel deployment, Firebase Firestore, 31 district pages with real images
- **Day 3** — Email OTP login, complete district and taluk data (236 taluks), official login
- **Day 4** — Official dashboard with complaint routing and persistent login
- **Day 5** — Full dark/light mode, Lucide icons, mobile navigation optimization
- **Day 6** — Live APMC price feed, clickable notifications, working search
- **Day 7** — Mobile sidebar fix for official dashboard
- **Day 8** — AI Crop Doctor, weather screen, Emergency SOS, digital literacy tutorials
- **Day 9** — Firebase Auth, Open-Meteo live weather, Gmail SMTP OTP (replaces EmailJS)
- **Day 10** — Smart Scholarship Eligibility Finder, direct portal redirections
- **Day 11+** — Official government scheme visuals, local asset hosting

---

## Target Audience

- **Farmers** — Crop disease diagnosis, APMC prices, scheme discovery, grievance filing
- **Rural Villagers** — Emergency SOS, scholarship finder, local weather, inquiry submission
- **Government Line Officers** — Dashboard to receive, manage, and resolve citizen complaints and inquiries
- **Students** — Scholarship eligibility discovery with direct portal access
- **District Collectors / ZP CEOs** — Analytics, escalated complaints, district-level reporting

---

## Project Stats

- 70+ commits across 11 days of development
- 31 districts and 236 taluks fully supported
- 3 languages: Kannada, English, Hindi
- 170 district images cached locally
- 13+ flagship government schemes listed
- 3 live APIs integrated: Open-Meteo, APMC, Gmail SMTP
- 10+ villager dashboard screens, 6+ official dashboard screens

---

## Future Scope

- React Native app for Android/iOS with deeper offline support and push notifications
- Aadhaar and DigiLocker integration to pre-fill scheme applications
- Village-level GIS mapping with grievance heatmaps at the Gram Panchayat level
- Offline PWA mode with service worker caching for low-connectivity areas
- Tamil, Telugu, and Tulu language support for border districts
- AI-generated scheme eligibility letters using LLMs
- SMS fallback for OTP and grievance updates for feature-phone users
- Advanced analytics for officials: SLA breach heatmaps and resolution rate dashboards

---

*Report generated on 23 September 2026 | GramSetu — Village Bridge*
