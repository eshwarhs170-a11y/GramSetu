import React, { useState } from 'react';
import { getDistrictRskInfo, districtRskDirectory } from '../data/rskDirectoryData';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MapPin, Clock, Building2, UserCheck, ShieldCheck, Mail, ChevronDown } from 'lucide-react';

export default function DistrictRskContactCard({ initialDistrict = 'Mysuru' }) {
  const { lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict || 'Mysuru');
  const rskInfo = getDistrictRskInfo(selectedDistrict);

  const allDistricts = Object.keys(districtRskDirectory).sort();

  return (
    <div style={{
      background: 'var(--bg-card, #fff)',
      borderRadius: 16,
      border: '1.5px solid rgba(16, 185, 129, 0.3)',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      marginTop: 20
    }}>
      {/* Header with district dropdown */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        padding: '16px 20px',
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            alignItems: 'center'
          }}>
            <Building2 size={20} color="#6ee7b7" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#fff' }}>
              {lang === 'kn' ? 'ನಿಮ್ಮ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK)' : 'Your Local Raitha Samparka Kendra (RSK)'}
            </h3>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
              {lang === 'kn'
                ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕೃಷಿ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ನೇರ ಸಂಪರ್ಕ ವಿವರಗಳು'
                : 'Verified local Karnataka Department of Agriculture office & agronomist phone numbers'}
            </p>
          </div>
        </div>

        {/* District Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
            {lang === 'kn' ? 'ಜಿಲ್ಲೆ ಬದಲಿಸಿ:' : 'District:'}
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {allDistricts.map(d => (
              <option key={d} value={d} style={{ color: '#0f172a', background: '#fff' }}>
                {d} ({districtRskDirectory[d]?.districtKn || d})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Body */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 16
        }}>
          {/* Main RSK Office Phone */}
          <div style={{
            background: 'var(--bg-main, #f8fafc)',
            padding: '14px 16px',
            borderRadius: 12,
            border: '1px solid var(--border-light, #e2e8f0)'
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              🏛️ {selectedDistrict} RSK Helpline / ಆರ್‌ಎಸ್‌ಕೆ ಲ್ಯಾಂಡ್‌ಲೈನ್
            </div>
            <a
              href={`tel:${rskInfo.mainRskPhone}`}
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: '#065f46',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Phone size={16} />
              {rskInfo.mainRskPhone}
            </a>
            <div style={{ fontSize: 11, color: 'var(--text-secondary, #475569)', marginTop: 4 }}>
              Direct line to Joint Director of Agriculture (JDA) office
            </div>
          </div>

          {/* Senior Agronomist Mobile */}
          <div style={{
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            padding: '14px 16px',
            borderRadius: 12,
            border: '1px solid #a7f3d0'
          }}>
            <div style={{ fontSize: 11, color: '#065f46', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
              <UserCheck size={14} /> Senior Agronomist / ಹಿರಿಯ ಕೃಷಿ ತಜ್ಞ
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
              {lang === 'kn' ? rskInfo.agronomistNameKn : rskInfo.agronomistName}
            </div>
            <a
              href={`tel:${rskInfo.agronomistMobile.replace(/\s+/g, '')}`}
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: '#15803d',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 2
              }}
            >
              <Phone size={15} />
              {rskInfo.agronomistMobile}
            </a>
          </div>

          {/* KVK Training Center */}
          <div style={{
            background: 'var(--bg-main, #f8fafc)',
            padding: '14px 16px',
            borderRadius: 12,
            border: '1px solid var(--border-light, #e2e8f0)'
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              🔬 ICAR Krishi Vigyan Kendra (KVK)
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary, #0f172a)', marginBottom: 2 }}>
              {rskInfo.kvkCenter}
            </div>
            <a
              href={`tel:${rskInfo.kvkPhone}`}
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: '#2563eb',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Phone size={14} />
              {rskInfo.kvkPhone}
            </a>
          </div>
        </div>

        {/* Address and Timings */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--border-light, #e2e8f0)',
          fontSize: 12,
          color: 'var(--text-secondary, #475569)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={14} color="#15803d" />
            <span><strong>Office:</strong> {rskInfo.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} />
              <span>{rskInfo.timing}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Mail size={14} />
              <span>{rskInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
