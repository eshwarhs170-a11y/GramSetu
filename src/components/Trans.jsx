import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';

const keyToIconMap = {
  otpHint: { icon: 'Lightbulb', color: '#eab308' },
  secureLogin: { icon: 'KeyRound', color: '#f59e0b' },
  authenticating: { icon: 'Hourglass', color: '#f59e0b' },
  verify2fa: { icon: 'CheckCircle2', color: '#22c55e' },
  demoHint: { icon: 'Lock', color: '#ef4444' },
  welcomeMsg: { icon: 'Heart', color: '#ef4444' },
  todayPrices: { icon: 'TrendingUp', color: '#22c55e' },
  recentAnnounce: { icon: 'Megaphone', color: '#ec4899' },
  allPrices: { icon: 'BarChart3', color: '#6366f1' },
  escalationNote: { icon: 'Zap', color: '#eab308' },
  submitComplaint: { icon: 'Upload', color: '#3b82f6' },
  resolved: { icon: 'CheckCircle2', color: '#22c55e' },
  inProgress: { icon: 'RefreshCw', color: '#3b82f6' },
  pending: { icon: 'Hourglass', color: '#f59e0b' },
  activeSchemesList: { icon: 'Landmark', color: '#3b82f6' },
  bankDetails: { icon: 'CreditCard', color: '#6366f1' },
  weeklyComplaints: { icon: 'BarChart3', color: '#6366f1' },
  villageBreakdown: { icon: 'Map', color: '#3b82f6' },
  announceFormTitle: { icon: 'Megaphone', color: '#ec4899' },
  publishBtn: { icon: 'Upload', color: '#3b82f6' },
  allFarmers: { icon: 'Users', color: '#3b82f6' },
  farmerStudent: { icon: 'Sprout', color: '#22c55e' },
  govtEmployee: { icon: 'Landmark', color: '#3b82f6' },
  tabAllSchemes: { icon: 'Landmark', color: '#3b82f6' },
  tabLoansInsurance: { icon: 'CreditCard', color: '#6366f1' },
  tabAdvisoryKVK: { icon: 'Sprout', color: '#22c55e' },
  tabSuccessStories: { icon: 'Star', color: '#eab308' },
  tabGrievanceFAQ: { icon: 'Scale', color: '#3b82f6' },
  filterLevelCentral: { icon: 'Globe', color: '#3b82f6' },
  trackStatusBtn: { icon: 'Search', color: '#3b82f6' },
  benefitDetails: { icon: 'IndianRupee', color: '#22c55e' },
  eligibilityCriteria: { icon: 'CheckCircle2', color: '#22c55e' },
  exclusionsTitle: { icon: 'Ban', color: '#ef4444' },
  requiredDocs: { icon: 'FileText', color: '#3b82f6' },
  stepByStepProcess: { icon: 'ClipboardList', color: '#6366f1' },
  voiceReadout: { icon: 'Volume2', color: '#22c55e' },
  stopAudio: { icon: 'Square', color: '#ef4444' },
};

export default function Trans({ k, className = "", iconClassName = "h-4 w-4 inline-block mr-1.5" }) {
  const { t } = useLanguage();
  const text = t(k);
  
  const mapped = keyToIconMap[k];
  if (mapped) {
    const IconComponent = Icons[mapped.icon];
    if (IconComponent) {
      return (
        <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <IconComponent className={iconClassName} style={{ color: mapped.color }} />
          <span>{text}</span>
        </span>
      );
    }
  }
  
  return <span className={className}>{text}</span>;
}
