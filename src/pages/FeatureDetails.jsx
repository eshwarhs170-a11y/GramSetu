import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Wheat, ShieldCheck, TrendingUp, CheckCircle2, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'

const featureData = {
  schemes: {
    badgeEn: '30+ State & Central Schemes',
    badgeKn: '30+ ರಾಜ್ಯ & ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    badgeHi: '30+ राज्य एवं केंद्र सरकारी योजनाएं',
    badgeColor: '#16a34a',
    titleEn: 'Government Schemes & Scholarships',
    titleKn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
    titleHi: 'सरकारी योजनाएं एवं छात्रवृत्ति',
    descEn: 'Access and apply for all Karnataka state government schemes like PM Kisan, Raitha Siri, Gruha Lakshmi, and student scholarships directly from your mobile device.',
    descKn: 'ಪಿಎಂ ಕಿಸಾನ್, ರೈತ ಸಿರಿ, ಗೃಹಲಕ್ಷ್ಮಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಂತಹ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಎಲ್ಲಾ ಪ್ರಮುಖ ಯೋಜನೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    descHi: 'पीएम किसान, रैथा सिरी, गृहलक्ष्मी और छात्रवृत्ति जैसी कर्नाटक सरकार की सभी प्रमुख योजनाओं की जानकारी पाएं और आवेदन करें।',
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=1200&q=80',
    details: [
      {
        en: 'PM-KISAN: Direct benefit transfer of ₹6,000 annually in 3 installments.',
        kn: 'ಪಿಎಂ-ಕಿಸಾನ್: ವಾರ್ಷಿಕ ₹6,000 ನೇರ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ (3 ಕಂತುಗಳಲ್ಲಿ).',
        hi: 'पीएम-किसान: ₹6,000 वार्षिक प्रत्यक्ष बैंक अंतरण।'
      },
      {
        en: 'Raitha Siri: ₹10,000 per hectare incentive for minor millet cultivation.',
        kn: 'ರೈತ ಸಿರಿ: ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವ ರೈತರಿಗೆ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹10,000 ಪ್ರೋತ್ಸಾಹ ಧನ.',
        hi: 'रैथा सिरी: बाजरा/मोटे अनाज की खेती के लिए ₹10,000/हेक्टेयर प्रोत्साहन।'
      },
      {
        en: 'Gruha Lakshmi & Ganga Kalyana: Real-time application tracking & status.',
        kn: 'ಗೃಹಲಕ್ಷ್ಮಿ & ಗಂಗಾ ಕಲ್ಯಾಣ: ನೈಜ ಸಮಯದ ಅರ್ಜಿ ಪರಿಶೀಲನೆ ಮತ್ತು ಅನುಮೋದನೆ ವಿವರ.',
        hi: 'गृहलक्ष्मी और गंगा कल्याणा: रीयल-टाइम आवेदन ट्रैकिंग।'
      },
      {
        en: 'SSP & Post-Matric Scholarships: Tailored funding for Karnataka students.',
        kn: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (SSP): ಕರ್ನಾಟಕದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಧನಸಹಾಯ.',
        hi: 'एसएसपी छात्रवृत्ति: कर्नाटक के छात्रों के लिए विशेष वित्तीय सहायता।'
      }
    ],
    ctaEn: 'Explore All Schemes Now',
    ctaKn: 'ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    ctaHi: 'सभी योजनाएं देखें',
    ctaLink: '/login/villager'
  },
  apmc: {
    badgeEn: 'Live 31 District APMC Feeds',
    badgeKn: '31 ಜಿಲ್ಲೆಗಳ ಲೈವ್ ಎಪಿಎಂಸಿ ದರಗಳು',
    badgeHi: '31 जिलों के लाइव एपीएमसी भाव',
    badgeColor: '#0284c7',
    titleEn: 'Real-Time Market Prices (APMC)',
    titleKn: 'ನೈಜ ಸಮಯದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ದರಗಳು',
    titleHi: 'वास्तविक समय एपीएमसी मंडी भाव',
    descEn: 'Get live daily mandi prices and MSP rates for Copra, Paddy, Arecanut, Ragi, Maize, Coffee, and Pulses across all 31 Karnataka districts.',
    descKn: 'ಕೊಬ್ಬರಿ, ಭತ್ತ, ಅಡಿಕೆ, ರಾಗಿ, ಮೆಕ್ಕೆಜೋಳ ಮತ್ತು ಕಾಫಿ ಸೇರಿದಂತೆ 20+ ಪ್ರಮುಖ ಬೆಳೆಗಳ ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ತಕ್ಷಣವೇ ಪರಿಶೀಲಿಸಿ.',
    descHi: 'कर्नाटक के सभी 31 जिलों में नारियल, धान, सुपारी, रागी और मक्का के आज के लाइव मंडी भाव जानें।',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80',
    details: [
      {
        en: 'Live Commodity Feeds: Daily min, modal, and max prices updated across mandis.',
        kn: 'ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು: ರಾಜ್ಯದ ಪ್ರಮುಖ ಮಂಡಿಗಳಿಂದ ಕನಿಷ್ಠ, ಸರಾಸರಿ ಮತ್ತು ಗರಿಷ್ಠ ಬೆಲೆಗಳು.',
        hi: 'दैनिक मंडी भाव: न्यूनतम, मॉडल और अधिकतम दरों की त्वरित जानकारी।'
      },
      {
        en: 'District Comparison: Compare rates across Mysuru, Shivamogga, Ballari, and Dharwad.',
        kn: 'ಜಿಲ್ಲಾವಾರು ಹೋಲಿಕೆ: ಮೈಸೂರು, ಶಿವಮೊಗ್ಗ, ಬಳ್ಳಾರಿ ಮತ್ತು ಧಾರವಾಡ ಮಾರುಕಟ್ಟೆ ದರಗಳ ಹೋಲಿಕೆ.',
        hi: 'मंडी तुलना: मैसूर, शिमोगा, धारवाड़ आदि के भावों की आपस में तुलना करें।'
      },
      {
        en: 'Micro-Tick Fluctuations: Instant market trends to help farmers sell at peak value.',
        kn: 'ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಗಳು: ಉತ್ತಮ ಲಾಭ ಗಳಿಸಲು ನೈಜ ಸಮಯದ ಬೆಲೆ ಪ್ರವೃತ್ತಿ ಮಾಹಿತಿ.',
        hi: 'बाजार रुझान: किसानों को सही समय पर सर्वोत्तम मूल्य पर फसल बेचने में मदद।'
      },
      {
        en: 'MSP Reference Rates: Official government support prices always visible.',
        kn: 'ಸರ್ಕಾರಿ ಬೆಂಬಲ ಬೆಲೆ (MSP): ಅಧಿಕೃತ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಯ ಖಾತರಿ ಮಾಹಿತಿ.',
        hi: 'एमएसपी न्यूनतम समर्थन मूल्य की पूरी जानकारी।'
      }
    ],
    ctaEn: 'View Live Market Prices',
    ctaKn: 'ಮಾರುಕಟ್ಟೆ ದರಗಳನ್ನು ನೋಡಿ',
    ctaHi: 'लाइव मंडी भाव देखें',
    ctaLink: '/login/villager'
  },
  alerts: {
    badgeEn: 'Urgent Agriculture & Mela Alerts',
    badgeKn: 'ಕೃಷಿ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಮೇಳಗಳು',
    badgeHi: 'कृषि सूचनाएं एवं मेले',
    badgeColor: '#7c3aed',
    titleEn: 'Announcements & Krishi Melas',
    titleKn: 'ಸರ್ಕಾರಿ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಕೃಷಿ ಮೇಳಗಳು',
    titleHi: 'सरकारी घोषणाएं और कृषि मेले',
    descEn: 'Stay informed on MSP procurement deadlines, district Krishi Melas, agro-weather advisories, and document renewal dates.',
    descKn: 'ಸರ್ಕಾರಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಖರೀದಿ ಕೇಂದ್ರಗಳ ದಿನಾಂಕ, ಜಿಲ್ಲಾ ಕೃಷಿ ಮೇಳಗಳು ಮತ್ತು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಗಳ ತ್ವರಿತ ಅಧಿಸೂಚನೆ ಪಡೆಯಿರಿ.',
    descHi: 'एमएसपी खरीद केंद्र, कृषि मेले, मौसम अलर्ट और राशन कार्ड नवीनीकरण की समय पर सूचनाएं प्राप्त करें।',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    details: [
      {
        en: 'MSP Procurement Notices: Alerts when government procurement centers open.',
        kn: 'ಖರೀದಿ ಕೇಂದ್ರಗಳ ಪ್ರಕಟಣೆ: ರಾಗಿ, ಭತ್ತ ಮತ್ತು ಮೆಕ್ಕೆಜೋಳ ಖರೀದಿ ಕೇಂದ್ರಗಳ ದಿನಾಂಕ.',
        hi: 'एमएसपी केंद्र: खरीद केंद्रों के खुलने की तत्काल सूचना।'
      },
      {
        en: 'State Agricultural Melas: Event dates and registration for GKVK & UAS Dharwad melas.',
        kn: 'ಕೃಷಿ ಮೇಳಗಳು: ಬೆಂಗಳೂರು ಜಿಕೆವಿಕೆ ಹಾಗೂ ಧಾರವಾಡ ಕೃಷಿ ಮೇಳಗಳ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ.',
        hi: 'कृषि मेले: प्रमुख कृषि विश्वविद्यालयों के मेलों और प्रदर्शनियों की जानकारी।'
      },
      {
        en: 'Weather & Pest Warnings: Timely alerts tailored to your crop cycle and taluk.',
        kn: 'ಹವಾಮಾನ & ಕೀಟ ಬಾಧೆ ಎಚ್ಚರಿಕೆ: ನಿಮ್ಮ ತಾಲೂಕಿನ ಬೆಳೆಗಳಿಗೆ ಅನುಗುಣವಾದ ಮುನ್ಸೂಚನೆ.',
        hi: 'मौसम एवं कीट चेतावनी: फसल सुरक्षा हेतु आवश्यक दिशा-निर्देश।'
      },
      {
        en: 'Direct Citizen Broadcasts: Urgent civil notices from local Gram Panchayats.',
        kn: 'ಗ್ರಾಮ ಪಂಚಾಯತಿ ಪ್ರಕಟಣೆಗಳು: ನಿಮ್ಮ ಪಂಚಾಯತಿಯ ಸ್ಥಳೀಯ ಮುಖ್ಯ ಪ್ರಕಟಣೆಗಳು.',
        hi: 'ग्राम पंचायत सूचनाएं: स्थानीय महत्वपूर्ण नागरिक संदेश।'
      }
    ],
    ctaEn: 'Read Latest Announcements',
    ctaKn: 'ಪ್ರಕಟಣೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    ctaHi: 'नवीनतम घोषणाएं देखें',
    ctaLink: '/login/villager'
  },
  complaints: {
    badgeEn: '4-Tier SLA Auto-Escalation',
    badgeKn: '4-ಹಂತದ ಸ್ವಯಂ-ವರ್ಗಾವಣೆ ವ್ಯವಸ್ಥೆ',
    badgeHi: '4-स्तरीय स्वतः-वृद्धि शिकायत प्रणाली',
    badgeColor: '#dc2626',
    titleEn: 'Smart Grievance Filing & Tracking',
    titleKn: 'ದೂರು ಸಲ್ಲಿಕೆ ಮತ್ತು ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    titleHi: 'स्मार्ट शिकायत निवारण एवं लाइव ट्रैकिंग',
    descEn: 'File civic and agricultural grievances with photo evidence. Built-in 4-tier SLA auto-escalation guarantees action from Gram Panchayat to RDPR.',
    descKn: 'ಫೋಟೋ ಸಾಕ್ಷಿಯೊಂದಿಗೆ ಕುಡಿಯುವ ನೀರು, ರಸ್ತೆ, ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಸಮಸ್ಯೆಗಳ ಕುರಿತು ದೂರು ಸಲ್ಲಿಸಿ. ನಿಗದಿತ ದಿನಗಳಲ್ಲಿ ಪರಿಹಾರವಾಗದಿದ್ದರೆ ಹಿರಿಯ ಅಧಿಕಾರಿಗಳಿಗೆ ಸ್ವಯಂ-ವರ್ಗಾವಣೆ.',
    descHi: 'फोटो प्रमाण के साथ बिजली, पानी और सड़क समस्याओं की शिकायत दर्ज करें। समय पर समाधान न होने पर उच्चाधिकारियों को स्वतः अग्रेषित।',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
    details: [
      {
        en: 'Photo Evidence Capture: Camera capture with client compression directly in-browser.',
        kn: 'ಫೋಟೋ ಸಾಕ್ಷಿ: ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಸ್ಥಳದ ಫೋಟೋವನ್ನು ಸುಲಭವಾಗಿ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
        hi: 'फोटो प्रमाण: मोबाइल कैमरे से तुरंत फोटो खींचकर शिकायत में जोड़ें।'
      },
      {
        en: '4-Tier Auto-Escalation: PDO (GP) ➔ Taluk Panchayat ➔ Zilla Panchayat ➔ RDPR Commissioner.',
        kn: '4-ಹಂತದ ವರ್ಗಾವಣೆ: ಪಿಡಿಒ ➔ ತಾಲೂಕು ಪಂಚಾಯತಿ ➔ ಜಿಲ್ಲಾ ಪಂಚಾಯತಿ ➔ ಆರ್‌ಡಿಪಿಆರ್ ಆಯುಕ್ತರು.',
        hi: '4-स्तरीय स्वतः-वृद्धि: पीडीओ ➔ तालुक पंचायत ➔ जिला पंचायत ➔ आयुक्त।'
      },
      {
        en: 'Geographic Routing: Complaints automatically routed to your exact Taluk and GP.',
        kn: 'ಸ್ಥಳೀಯ ಇಲಾಖೆಗೆ ರವಾನೆ: ದೂರುಗಳು ನೇರವಾಗಿ ನಿಮ್ಮ ತಾಲೂಕು ಮತ್ತು ಪಂಚಾಯತಿ ಅಧಿಕಾರಿಗಳಿಗೆ ತಲುಪುತ್ತವೆ.',
        hi: 'सटीक रूटिंग: शिकायत सीधे संबंधित तालुक और ग्राम पंचायत अधिकारी तक पहुंचती है।'
      },
      {
        en: 'Live Status Timeline: Real-time inspection logs, notes, and resolution photos.',
        kn: 'ಲೈವ್ ಪ್ರಗತಿ ವಿವರ: ಅಧಿಕಾರಿಗಳ ಪರಿಶೀಲನಾ ವರದಿ ಮತ್ತು ಪರಿಹಾರದ ಫೋಟೋ ಲೈವ್ ವೀಕ್ಷಣೆ.',
        hi: 'लाइव स्टेटस: समाधान की स्थिति और अधिकारियों की टिप्पणियां देखें।'
      }
    ],
    ctaEn: 'File or Track a Complaint',
    ctaKn: 'ದೂರು ಸಲ್ಲಿಸಿ / ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
    ctaHi: 'शिकायत दर्ज / ट्रैक करें',
    ctaLink: '/login/villager'
  },
  districts: {
    badgeEn: 'All 31 Karnataka Districts',
    badgeKn: 'ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳು',
    badgeHi: 'कर्नाटक के सभी 31 जिले',
    badgeColor: '#d97706',
    titleEn: 'District Heritage & Agriculture Explorer',
    titleKn: 'ಕರ್ನಾಟಕ ಜಿಲ್ಲಾ ಪರಂಪರೆ ಮತ್ತು ಕೃಷಿ ದರ್ಶನ',
    titleHi: 'कर्नाटक जिला धरोहर एवं कृषि दर्शन',
    descEn: 'Discover the unique cultural heritage, GI-tagged agricultural produce, famous landmarks, taluks, and administrative details for all 31 districts of Karnataka.',
    descKn: 'ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳ ಪ್ರಸಿದ್ಧ ಸ್ಮಾರಕಗಳು, ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ (GI) ಪಡೆದ ಬೆಳೆಗಳು, ತಾಲೂಕುಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.',
    descHi: 'कर्नाटक के सभी 31 जिलों की सांस्कृतिक धरोहर, जीआई-टैग प्राप्त कृषि उत्पाद, दर्शनीय स्थल और तालुकों की विस्तृत जानकारी।',
    image: '/district-images/mysuru_mysore_palace.jpg',
    details: [
      {
        en: 'Rich Cultural Landmarks: Explore Hampi, Mysore Palace, Gol Gumbaz, Belur & Halebidu.',
        kn: 'ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳು: ಹಂಪಿ, ಮೈಸೂರು ಅರಮನೆ, ಗೋಳಗುಮ್ಮಟ, ಬೇಲೂರು-ಹಳೇಬೀಡು ವಿವರ.',
        hi: 'ऐतिहासिक धरोहर: हम्पी, मैसूर पैलेस, गोल गुम्बज, बेलूर आदि के बारे में जानें।'
      },
      {
        en: 'GI-Tagged Crops & Crafts: Mysore Silk, Coorg Coffee, Byadgi Chilli, Dharwad Peda.',
        kn: 'ಜಿಐ ಮಾನ್ಯತೆಯ ಬೆಳೆಗಳು: ಮೈಸೂರು ರೇಷ್ಮೆ, ಕೊಡಗು ಕಾಫಿ, ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ, ಧಾರವಾಡ ಪೇಡಾ.',
        hi: 'जीआई उत्पाद: मैसूर सिल्क, कूर्ग कॉफी, ब्याडगी मिर्च और धारवाड़ पेड़ा।'
      },
      {
        en: 'Comprehensive Taluk Mappings: Complete rural breakdown and GPS coordinates.',
        kn: 'ತಾಲೂಕು ಮತ್ತು ಹೋಬಳಿ ವಿವರ: ಸಂಪೂರ್ಣ ಆಡಳಿತಾತ್ಮಕ ಮಾಹಿತಿ ಮತ್ತು ನಕ್ಷೆ.',
        hi: 'तालुक और जीपीएस मैपिंग: प्रत्येक जिले के तालुकों का विवरण।'
      },
      {
        en: 'District Agrometeorology: Localized crop calendars and rainfall patterns.',
        kn: 'ಜಿಲ್ಲಾ ಕೃಷಿ ಹವಾಮಾನ: ಮುಖ್ಯ ಕೃಷಿ ಬೆಳೆಗಳು ಮತ್ತು ಮಳೆಯ ಪ್ರಮಾಣ ಮಾಹಿತಿ.',
        hi: 'स्थानीय कृषि कैलेंडर: प्रमुख फसलें और वर्षा के आंकड़े।'
      }
    ],
    ctaEn: 'Explore 31 Karnataka Districts',
    ctaKn: '31 ಜಿಲ್ಲೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    ctaHi: '31 जिलों को एक्सप्लोर करें',
    ctaLink: '/#district-explorer'
  }
}

export default function FeatureDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()

  const feat = featureData[id]

  if (!feat) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Feature not found</h2>
        <p style={{ color: '#64748b', marginBottom: 24 }}>The requested feature page could not be located.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            borderRadius: 10,
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  const badgeText = lang === 'kn' ? feat.badgeKn : lang === 'hi' ? feat.badgeHi : feat.badgeEn
  const titleText = lang === 'kn' ? feat.titleKn : lang === 'hi' ? feat.titleHi : feat.titleEn
  const descText = lang === 'kn' ? feat.descKn : lang === 'hi' ? feat.descHi : feat.descEn
  const ctaText = lang === 'kn' ? feat.ctaKn : lang === 'hi' ? feat.ctaHi : feat.ctaEn

  const handleCtaClick = () => {
    if (feat.ctaLink.startsWith('/#')) {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(feat.ctaLink.replace('/#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      navigate(feat.ctaLink)
    }
  }

  return (
    <div className="feature-details-container">
      {/* ── Top Navigation Bar ── */}
      <nav className="feature-details-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'rgba(15, 23, 42, 0.05)',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#334155',
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0
            }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'kn' ? 'ಹಿಂದಕ್ಕೆ' : lang === 'hi' ? 'पीछे' : 'Back'}</span>
          </button>

          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minWidth: 0 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
            }}>
              <Wheat size={18} color="#fff" strokeWidth={2} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#111827', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {t('appName')}
              </div>
              <div style={{ fontSize: 10, color: '#6b7280', whiteSpace: 'nowrap' }}>
                {t('appSubtitle')}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <LanguageSwitcher variant="topbar-style" />
          <ThemeToggle />
          <button
            onClick={() => navigate('/login/villager')}
            style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '7px 14px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(22,163,74,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            Login →
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <div
        className="feature-details-hero"
        style={{ backgroundImage: `url(${feat.image})` }}
      >
        <div className="feature-details-hero-overlay" />
        <div className="feature-details-hero-content">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: feat.badgeColor,
            color: '#fff',
            padding: '5px 14px',
            borderRadius: 30,
            fontWeight: 700,
            fontSize: 12,
            marginBottom: 14,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <Sparkles size={14} />
            <span>{badgeText}</span>
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: 'clamp(24px, 5vw, 42px)',
            fontWeight: 900,
            marginBottom: 12,
            lineHeight: 1.15,
            letterSpacing: -0.5
          }}>
            {titleText}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 'clamp(14px, 2.2vw, 17px)',
            lineHeight: 1.6,
            maxWidth: 680,
            margin: 0
          }}>
            {descText}
          </p>
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="feature-details-content-wrapper">
        <div className="feature-details-card-grid">
          {/* Main highlights column */}
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 3.5vw, 26px)',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>{lang === 'kn' ? 'ಮುಖ್ಯ ಸೌಲಭ್ಯಗಳು & ವಿವರಗಳು' : lang === 'hi' ? 'मुख्य विशेषताएं एवं विवरण' : 'Key Highlights & Features'}</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {feat.details.map((item, idx) => {
                const text = lang === 'kn' ? item.kn : lang === 'hi' ? item.hi : item.en
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      padding: '14px 16px',
                      borderRadius: 12,
                      background: '#f8fafc',
                      border: '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{
                      marginTop: 1,
                      background: '#dcfce7',
                      color: '#16a34a',
                      padding: 5,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </div>
                    <p style={{ color: '#334155', fontSize: 14, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {text}
                    </p>
                  </div>
                )
              })}
            </div>

            <div style={{ marginTop: 32 }}>
              <button
                onClick={handleCtaClick}
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 8px 24px rgba(22,163,74,0.3)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <span>{ctaText}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Verification & Trust sidebar */}
          <div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <ShieldCheck size={26} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
                {lang === 'kn' ? 'ಅಧಿಕೃತ & ಸುರಕ್ಷಿತ ಸೇವೆ' : lang === 'hi' ? 'सुरक्षित एवं सत्यापित' : 'Secure & Verified'}
              </h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>
                {lang === 'kn'
                  ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ (RDPR) ಇಲಾಖೆಯ ಸಹಯೋಗದಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಸೇವೆ ಒದಗಿಸಲಾಗಿದೆ.'
                  : lang === 'hi'
                  ? 'कर्नाटक सरकार के डिजिटल बुनियादी ढांचे और आरडीपीआर विभाग द्वारा समर्थित। आपका डेटा पूर्णतः सुरक्षित है।'
                  : 'Integrated with Karnataka State rural digital infrastructure. All data and citizen records are strictly encrypted.'}
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                paddingTop: 14,
                borderTop: '1px solid #e2e8f0',
                fontSize: 12,
                color: '#475569',
                fontWeight: 600
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                  <span>KeGSL — Government of Karnataka</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                  <span>RDPR & Agriculture Department</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

