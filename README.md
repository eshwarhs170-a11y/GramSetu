<div align="center">

```
 ██████╗ ██████╗  █████╗ ███╗   ███╗    ███████╗███████╗████████╗██╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗████╗ ████║    ██╔════╝██╔════╝╚══██╔══╝██║   ██║
██║  ███╗██████╔╝███████║██╔████╔██║    ███████╗█████╗     ██║   ██║   ██║
██║   ██║██╔══██╗██╔══██║██║╚██╔╝██║    ╚════██║██╔══╝     ██║   ██║   ██║
╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║    ███████║███████╗   ██║   ╚██████╔╝
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝
```

### **ಗ್ರಾಮ ಸೇತು — Village Bridge**
*The official digital gateway connecting Karnataka's rural citizens to government*

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Districts](https://img.shields.io/badge/Karnataka-31_Districts-FF6B35?style=flat-square)
![Languages](https://img.shields.io/badge/Languages-EN_|_ಕನ್ನಡ_|_हिन्दी-blue?style=flat-square)

</div>

---

## 🌉 What is GramSetu?

**GramSetu** (ಗ್ರಾಮ ಸೇತು) means *Village Bridge* in Kannada. It is a bilingual civic-tech web app built to bridge the gap between Karnataka's **6 crore rural citizens** and government services — no bureaucratic maze, no language barriers, no confusion.

> Think of it as a one-stop digital gram panchayat in your pocket.

---

## ✨ Features at a Glance

### 👤 For Villagers / Raitas
| Feature | Description |
|---|---|
| 🌾 **Government Schemes** | Browse PM-KISAN, PM Awas, Fasal Bima & more with eligibility checker |
| 📋 **Complaint Filing** | Photo-supported complaints sent directly to local officials |
| 📈 **APMC Prices** | Live market prices for rice, maize, sunflower, groundnut |
| 🌦️ **Weather** | 7-day forecast for your village |
| 🚑 **Emergency SOS** | One-tap ambulance, police, fire & toll-free helplines |
| 🌿 **Crop Doctor** | AI-assisted crop disease identification & treatment |
| 💧 **Water Tank Status** | Real-time village water supply tracker |
| 📰 **Village Bulletin** | Announcements and notices published by officials |

### 🏛️ For Government Officials
| Feature | Description |
|---|---|
| 📊 **Dashboard** | District-level overview of schemes, complaints & engagement |
| 📣 **Publish Bulletins** | Push announcements directly to village feeds |
| 📥 **Complaint Management** | Track, respond, and resolve citizen complaints |
| 📤 **Export Lists** | Download beneficiary lists and reports |

### 🗺️ Explore Karnataka
- **31 District Pages** — each with local highlights, tourist spots & cultural identity
- Beautiful image cards for landmarks, cuisine, wildlife & heritage
- Dark / Light theme, smooth animations

---

## 🗂️ Project Structure

```
gram-setu/
├── public/
│   ├── district-images/      ← 170 locally cached district images (fast loading)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── VillagerScreens.jsx   ← All villager dashboard screens
│   │   ├── VillagerSidebar.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── districtsData.js      ← Karnataka district info & highlights
│   │   └── districtImages.json   ← Local image paths for each district
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── DistrictPage.jsx
│   │   ├── VillagerLogin.jsx
│   │   ├── VillagerDashboard.jsx
│   │   ├── OfficialLogin.jsx
│   │   ├── OfficialDashboard.jsx
│   │   └── FeatureDetails.jsx
│   └── translations/
│       └── translations.js       ← EN | ಕನ್ನಡ | हिन्दी strings
├── download_images.cjs           ← Script: initial image download
├── retry_images.cjs              ← Script: retry failed downloads
└── vite.config.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM v7 |
| **Backend / Auth** | Firebase v12 (Firestore + Auth) |
| **Icons** | Lucide React |
| **Email** | EmailJS |
| **Linting** | OxLint |
| **Deployment** | Vercel |
| **Styling** | Pure CSS (no framework) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-username/gram-setu.git
cd gram-setu

# 2. Install dependencies
npm install

# 3. (First time only) Download district images locally
node download_images.cjs
# If some fail due to rate limits, retry:
node retry_images.cjs

# 4. Start dev server
npm run dev
```

The app will be live at **http://localhost:5173** 🎉

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Routes

| Path | Page |
|---|---|
| `/` | Landing Page |
| `/district/:id` | District Explorer (e.g. `/district/Mysuru`) |
| `/login/villager` | Villager / Raita Login |
| `/login/official` | Government Official Login |
| `/dashboard/villager/*` | Villager Dashboard |
| `/dashboard/official/*` | Official Dashboard |
| `/feature/:id` | Feature Detail Page |

---

## 🌍 Language Support

GramSetu speaks your language:

| Code | Language | Script |
|---|---|---|
| `en` | English | Latin |
| `kn` | Kannada | ಕನ್ನಡ |
| `hi` | Hindi | हिन्दी |

Switch languages anytime using the 🌐 button in the navbar — all UI strings update instantly.

---

## 🖼️ Image Pipeline

District images are sourced from Wikimedia Commons and **downloaded locally** into `public/district-images/` for fast loading:

```bash
# Download all 170 district images
node download_images.cjs

# Retry any that failed (Wikipedia rate-limits fast downloads)
node retry_images.cjs
```

Images are served directly by Vite — **no external requests at runtime**.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

MIT © 2026 GramSetu Team

---

<div align="center">

*Made with ❤️ for Karnataka's villages*

**ಜೈ ಕರ್ನಾಟಕ 🌾**

</div>
