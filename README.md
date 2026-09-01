<div align="center">

```
 ██████╗ ██████╗  █████╗ ███╗   ███╗    ███████╗███████╗████████╗██╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗████╗ ████║    ██╔════╝██╔════╝╚══██╔══╝██║   ██║
██║  ███╗██████╔╝███████║██╔████╔██║    ███████╗█████╗     ██║   ██║   ██║
██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║    ╚════██║██╔══╝     ██║   ██║   ██║
╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║    ███████╗███████╗   ██║   ╚██████╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝
```

### **ಗ್ರಾಮ ಸೇತು — Village Bridge**
*The official digital gateway connecting Karnataka's rural citizens to government*

[![Live Site](https://img.shields.io/badge/Live_Site-gram--setu--one.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://gram-setu-one.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Google Gemini AI](https://img.shields.io/badge/Gemini_AI-Voice_%26_Vision-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

</div>

---

## What is GramSetu?

**GramSetu** (*ಗ್ರಾಮ ಸೇತು* · *Village Bridge*) is a civic-tech web platform designed to bridge the digital and administrative divide for Karnataka's **6+ crore rural citizens and farmers (ರೈತರು)**. 

Built with accessibility, voice-first interaction, AI crop disease scanning, and real-time grievance escalation at its core, GramSetu eliminates bureaucratic friction and language barriers through an intuitive digital interface.

---

## Key Features & Innovations

### Crop Doctor — AI Crop Disease Scanner (ಬೆಳೆ ವೈದ್ಯ)
- **Instant Vision Recognition:** Uses Google Gemini Vision AI to identify diseased crops and plant pathogens from live camera feeds, uploaded photos, and printed or photocopied sheets.
- **Karnataka Crop Database:** Full coverage for major crops including Paddy, Ragi, Maize, Cotton, Tomato, Potato, Onion, Sugarcane, Arecanut, Coffee, Banana, Mango, Groundnut, Wheat, and Jowar.
- **Actionable Diagnostic Reports:** Provides disease severity ratings, chemical spray dosages, fertilizer plans, organic farming tips, key takeaways, and direct links to eligible government compensation schemes (e.g., PMFBY, Raitha Siri).
- **Automatic Kannada Translation:** Instantly translates remedies and chemical instructions into Kannada.

### GramSetu AI Voice Assistant (ಧ್ವನಿ ಸಹಾಯಕ)
- **Multilingual Speech-to-Speech:** Native recognition and synthesis for **Kannada (`kn-IN`)**, **English (`en-IN`)**, and **Hindi (`hi-IN`)**.
- **Voice-Powered Navigation:** Hands-free voice commands to navigate the platform (*"Take me to login"*, *"Open APMC prices"*).
- **Domain-Specific AI Advice:** Answers questions regarding Karnataka crop prices, MSP, and government subsidies powered by Google Gemini AI with automatic multi-model fallback.
- **Dynamic Waveform Visualizer:** Centered mirrored frequency spectrum visualizer rendered via the Web Audio API.

### Smart Grievance Escalation & Location-Scoped Tracking
- **Location-Scoped View:** Filters grievances by **My Taluk (Default)**, **My District**, and **All Karnataka** so farmers view local issues relevant to their administration.
- **Photo-Verified Evidence:** Camera capture with client-side compression saves evidence directly to Firestore for official inspection.
- **Geographic & Departmental Isolation:** Complaints are strictly routed by District, Taluk, and Gram Panchayat to ensure relevant line officers handle them.
- **4-Tier SLA Auto-Escalation:**
  $$\text{PDO (GP)} \xrightarrow{7\text{ days}} \text{Taluk Panchayat (EO)} \xrightarrow{14\text{ days}} \text{Zilla Panchayat (CEO)} \xrightarrow{21\text{ days}} \text{RDPR Commissioner}$$
- **Real-Time Citizen Tracking:** Status history, official response logs, and resolution timestamps updated live.

### Live APMC Market Intelligence
- **District-Specific Feeds:** Real-time prices for Copra, Paddy, Arecanut, Ragi, Maize, Cotton, Turmeric, Tomato & more across all 31 Karnataka districts.
- **Micro-Tick Fluctuations:** Simulates active intraday trading movements with color-coded flash indicators.

### Comprehensive Scheme & Scholarship Discovery
- **Agricultural & Social Schemes:** Browse Central & Karnataka State schemes (*PM-KISAN, Raitha Siri, Krishi Bhagya, PM Fasal Bima Yojana, Ganga Kalyana, Vidyasiri, Raita Vidyanidhi*).
- **Scholarship Finder:** Income and eligibility based discovery for student scholarships (SSP, Buddy4Study, HDFC Parivartan, Reliance, MANF, AICTE Saksham).
- **Text-to-Speech:** Listen to scheme guidelines and eligibility criteria spoken aloud in the selected language.

### Emergency SOS & Rural Weather Insights
- **One-Tap Emergency SOS:** Instant emergency alert broadcast for urgent rural, agricultural, or health crises.
- **Karnataka Agro-Weather:** Location-specific weather forecasts and agricultural advisories.

---

## Explore Karnataka

- **31 District Hubs:** Interactive showcases covering local agriculture, heritage, cultural identity, and administration for every Karnataka district.
- **High-Performance Image Cache:** Over 170 locally cached cultural landmarks and agricultural assets.

---

## Tech Stack

| Layer | Technology / Service |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev) + [Vite 8](https://vitejs.dev) |
| **Routing** | [React Router DOM v7](https://reactrouter.com) |
| **Realtime Database** | [Google Cloud Firestore](https://firebase.google.com/docs/firestore) |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) + Magic QR Tokenless Bypass |
| **Artificial Intelligence** | [Google Generative AI (Gemini Flash & Vision)](https://ai.google.dev/) |
| **Voice & Speech** | Web Speech API (`webkitSpeechRecognition` + `SpeechSynthesis`) |
| **Audio Synthesis** | Web Audio API (OscillatorNode two-tone alert chimes) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev) |
| **QR Code Engine** | `qrcode.react` (High-density SVG vectors) |
| **PDF Generation** | `jspdf` + `jspdf-autotable` |
| **Hosting & CI/CD** | [Vercel](https://vercel.com) |

---

## Application Routes

| Route | Purpose | Audience |
|---|---|---|
| `/` | Landing Page & Overview | Public |
| `/district/:id` | Karnataka District Explorer | Public |
| `/crop-doctor` | Crop Disease AI Scanner | Public / Farmers |
| `/login/villager` | Citizen OTP / Email Login | Villagers & Farmers |
| `/login/official` | Administrative Department Login | Govt Officials |
| `/dashboard/villager/*` | Citizen Dashboard (Schemes, APMC, Complaints, SOS) | Logged-in Villagers |
| `/dashboard/official/*` | Line Department & PDO Management Dashboard | Logged-in Officials |
| `/demo/qr-cards` | Printable Magic QR Passes (A4 / A5 layout) | Open Day / Evaluators |
| `/demo/dashboard` | Big Screen Real-Time Complaint Monitor + Audio Chimes | Presentation Displays |
| `/demo/voice` | Standalone GramSetu AI Voice Assistant Demonstration | All |
| `/magic-login` | Tokenless instant role-playing entry point | QR Code Scanners |

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/eshwarhs170-a11y/GramSetu.git
cd GramSetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## Multilingual Support

GramSetu supports instant language switching across the entire platform:

| Language | Native Script | Coverage |
|---|---|---|
| **English** | Latin (`en`) | 100% UI strings, schemes, navigation & voice |
| **Kannada** | ಕನ್ನಡ (`kn`) | 100% UI strings, APMC names, schemes, complaints & voice |
| **Hindi** | हिन्दी (`hi`) | 100% UI strings, schemes & text-to-speech |

---

## Authors & Team

Built for Karnataka's rural empowerment at **Marvel Open Day 2026**.

* **GitHub:** [@eshwarhs170-a11y](https://github.com/eshwarhs170-a11y)
* **Live Deployment:** [gram-setu-one.vercel.app](https://gram-setu-one.vercel.app)

---

## License

This project is licensed under the [MIT License](LICENSE).
