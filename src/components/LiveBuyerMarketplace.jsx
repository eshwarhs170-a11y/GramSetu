import React, { useState, useEffect } from 'react';
import { initialLiveBuyers } from '../data/liveBuyersData';
import { useLanguage } from '../context/LanguageContext';
import {
  Store, Phone, MessageSquare, CheckCircle, ShieldCheck, MapPin,
  Clock, IndianRupee, PlusCircle, Search, Filter, ArrowUpRight, Sparkles, X, User
} from 'lucide-react';
import VoiceTypingButton from './VoiceTypingButton';

export default function LiveBuyerMarketplace({ currentDistrict = 'Mysuru' }) {
  const { lang } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState('buyers'); // 'buyers' | 'myListings'
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [buyersList, setBuyersList] = useState(initialLiveBuyers);
  const [farmerListings, setFarmerListings] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  // Form state for farmers listing their crop
  const [newCropName, setNewCropName] = useState('Ragi (Finger Millet)');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newPhone, setNewPhone] = useState(window.localStorage.getItem('citizen_phone') || '');
  const [newFarmerName, setNewFarmerName] = useState(window.localStorage.getItem('citizen_name') || 'ರಾಮಪ್ಪ ಗೌಡ');
  const [newVillage, setNewVillage] = useState(window.localStorage.getItem('citizen_taluk') || 'Mysuru Taluk');
  const [newNotes, setNewNotes] = useState('');

  // Load custom farmer listings from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('gramsetu_farmer_crop_listings') || '[]');
      if (saved && saved.length > 0) {
        setFarmerListings(saved);
      } else {
        // Initial sample listings
        setFarmerListings([
          {
            id: 'FARM-101',
            farmerName: 'ರಾಮಪ್ಪ ಗೌಡ (Ramappa Gowda)',
            district: currentDistrict || 'Mysuru',
            taluk: 'Hunsur Taluk',
            crop: 'Ragi (Finger Millet)',
            cropKn: 'ರಾಗಿ',
            quantity: '35 Quintals',
            expectedPrice: '₹3,900 / Qtl',
            phone: '+91 98451 10293',
            postedAt: '2 hours ago',
            notes: 'Well-dried, moisture < 12%, clean harvest stored in moisture-proof bags.'
          },
          {
            id: 'FARM-102',
            farmerName: 'ಸಿದ್ದಪ್ಪ ಪಾಟೀಲ್ (Siddappa Patil)',
            district: 'Mandya',
            taluk: 'Maddur',
            crop: 'Paddy (Sona Masoori)',
            cropKn: 'ಭತ್ತ',
            quantity: '80 Quintals',
            expectedPrice: '₹2,650 / Qtl',
            phone: '+91 94481 90812',
            postedAt: 'Yesterday',
            notes: 'Single-source crop, ready for mill pickup.'
          }
        ]);
      }
    } catch (e) {
      // fallback
    }
  }, [currentDistrict]);

  const handlePostListing = (e) => {
    e.preventDefault();
    if (!newQuantity || !newPrice || !newPhone) {
      alert(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' : 'Please fill all required details.');
      return;
    }

    const newListing = {
      id: 'FARM-' + Date.now().toString().slice(-4),
      farmerName: newFarmerName,
      district: currentDistrict || 'Mysuru',
      taluk: newVillage,
      crop: newCropName,
      cropKn: newCropName,
      quantity: `${newQuantity} Quintals`,
      expectedPrice: `₹${newPrice} / Qtl`,
      phone: newPhone,
      postedAt: 'Just now',
      notes: newNotes || 'Available for immediate pickup at farmgate.'
    };

    const updated = [newListing, ...farmerListings];
    setFarmerListings(updated);
    window.localStorage.setItem('gramsetu_farmer_crop_listings', JSON.stringify(updated));
    setShowPostModal(false);
    setActiveSubTab('myListings');

    // Reset form
    setNewQuantity('');
    setNewPrice('');
    setNewNotes('');
    alert(lang === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆ ಮಾರಾಟ ಜಾಹೀರಾತು ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟವಾಗಿದೆ!' : 'Your produce has been successfully listed for verified buyers!');
  };

  const filteredBuyers = selectedCropFilter === 'all'
    ? buyersList
    : buyersList.filter(b => b.crop.toLowerCase().includes(selectedCropFilter.toLowerCase()));

  return (
    <div style={{ marginTop: 20 }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        borderRadius: 20,
        padding: '24px 28px',
        color: '#fff',
        marginBottom: 20,
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}>
              <ShieldCheck size={14} color="#60a5fa" />
              {lang === 'kn' ? 'ನೇರ ಖರೀದಿ ಮಾರುಕಟ್ಟೆ' : 'DIRECT FARMER-BUYER PORTAL'}
            </span>
            <span style={{
              background: '#22c55e',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 6
            }}>
              0% Commission
            </span>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '4px 0 6px 0', color: '#fff' }}>
            {lang === 'kn' ? 'ಲೈವ್ ಖರೀದಿದಾರರು & ರೈತರ ನೇರ ಮಾರಾಟ' : 'Live Verified Buyers & Direct Farmgate Selling'}
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.85)', maxWidth: 650, lineHeight: 1.5 }}>
            {lang === 'kn'
              ? 'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಸರ್ಕಾರಿ ಮಾನ್ಯತೆ ಪಡೆದ FPO ಗಳು, ಸಂಸ್ಕರಣಾ ಮಿಲ್‌ಗಳು ಮತ್ತು ಸಗಟು ಖರೀದಿದಾರರಿಗೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಿ.'
              : 'Connect directly with verified FPOs, agro-processors, and wholesale aggregators. Bypass middlemen and negotiate directly via Phone or WhatsApp.'}
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          style={{
            background: '#ffffff',
            color: '#1e40af',
            border: 'none',
            borderRadius: 12,
            padding: '12px 22px',
            fontSize: 14,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <PlusCircle size={18} color="#2563eb" />
          <span>{lang === 'kn' ? '+ ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಪ್ರಕಟಿಸಿ' : '+ Sell My Produce'}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: 12,
        borderBottom: '2px solid var(--border-light, #e2e8f0)',
        marginBottom: 20,
        paddingBottom: 2
      }}>
        <button
          onClick={() => setActiveSubTab('buyers')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'buyers' ? '3px solid #2563eb' : '3px solid transparent',
            color: activeSubTab === 'buyers' ? '#2563eb' : 'var(--text-secondary, #64748b)',
            fontWeight: 800,
            fontSize: 14,
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          <Store size={18} />
          <span>{lang === 'kn' ? 'ಖರೀದಿದಾರರ ಬೇಡಿಕೆಗಳು' : 'Verified Buyers Looking for Produce'}</span>
          <span style={{
            background: activeSubTab === 'buyers' ? '#dbeafe' : 'var(--bg-card-alt, #f1f5f9)',
            color: activeSubTab === 'buyers' ? '#1e40af' : 'var(--text-muted, #94a3b8)',
            fontSize: 11,
            padding: '2px 8px',
            borderRadius: 999,
            fontWeight: 700
          }}>
            {filteredBuyers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('myListings')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeSubTab === 'myListings' ? '3px solid #16a34a' : '3px solid transparent',
            color: activeSubTab === 'myListings' ? '#16a34a' : 'var(--text-secondary, #64748b)',
            fontWeight: 800,
            fontSize: 14,
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          <Sparkles size={18} />
          <span>{lang === 'kn' ? 'ರೈತರ ಮಾರಾಟ ಜಾಹೀರಾತುಗಳು' : 'Farmer Produce for Sale'}</span>
          <span style={{
            background: activeSubTab === 'myListings' ? '#dcfce7' : 'var(--bg-card-alt, #f1f5f9)',
            color: activeSubTab === 'myListings' ? '#15803d' : 'var(--text-muted, #94a3b8)',
            fontSize: 11,
            padding: '2px 8px',
            borderRadius: 999,
            fontWeight: 700
          }}>
            {farmerListings.length}
          </span>
        </button>
      </div>

      {/* ── TAB 1: VERIFIED LIVE BUYERS ── */}
      {activeSubTab === 'buyers' && (
        <div>
          {/* Crop Filter Bar */}
          <div style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 16
          }}>
            {[
              { id: 'all', label: 'All Crops / ಎಲ್ಲಾ ಬೆಳೆಗಳು' },
              { id: 'ragi', label: 'Ragi (ರಾಗಿ)' },
              { id: 'paddy', label: 'Paddy / Rice (ಭತ್ತ)' },
              { id: 'arecanut', label: 'Arecanut (ಅಡಿಕೆ)' },
              { id: 'vegetables', label: 'Vegetables (ತರಕಾರಿಗಳು)' },
              { id: 'red gram', label: 'Tur / Pulses (ತೊಗರಿ)' },
              { id: 'copra', label: 'Copra (ಕೊಬ್ಬರಿ)' },
              { id: 'coffee', label: 'Coffee (ಕಾಫಿ)' },
              { id: 'chilli', label: 'Chilli (ಮೆಣಸಿನಕಾಯಿ)' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCropFilter(c.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  border: selectedCropFilter === c.id ? '1.5px solid #2563eb' : '1px solid var(--border-light, #e2e8f0)',
                  background: selectedCropFilter === c.id ? '#eff6ff' : 'var(--bg-card, #fff)',
                  color: selectedCropFilter === c.id ? '#1d4ed8' : 'var(--text-secondary, #475569)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Official Verification Notice */}
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <ShieldCheck size={20} color="#15803d" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.4 }}>
              <strong>{lang === 'kn' ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಎಪಿಎಂಸಿ & ಸಹಕಾರಿ ಸಂಸ್ಥೆಗಳ ನೇರ ಸಂಪರ್ಕ' : 'Verified Karnataka APMC & Cooperative Federation Procurement Desks'}</strong>
              <div style={{ fontSize: 12, color: '#15803d', marginTop: 2 }}>
                {lang === 'kn' ? 'ಎಲ್ಲಾ ಖರೀದಿ ಕೇಂದ್ರಗಳು ಮತ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳು ಅಧಿಕೃತ ಎಪಿಎಂಸಿ ಯಾರ್ಡ್ ಮತ್ತು ಕೃಷಿ ಇಲಾಖೆ ಕಚೇರಿಗಳ ಸಂಖ್ಯೆಗಳಾಗಿವೆ.' : 'All contact numbers are official, verifiable Government APMC yard offices, FPOs, and cooperative federation desks.'}
              </div>
            </div>
          </div>

          {/* Buyers Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16
          }}>
            {filteredBuyers.map(b => (
              <div
                key={b.id}
                style={{
                  background: 'var(--bg-card, #fff)',
                  border: '1.5px solid var(--border-light, #e2e8f0)',
                  borderRadius: 16,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                {/* Header info */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#059669',
                      background: '#ecfdf5',
                      padding: '3px 8px',
                      borderRadius: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <CheckCircle size={12} color="#059669" />
                      {b.type}
                    </span>
                    <span style={{ fontSize: 11, color: '#dc2626', fontWeight: 700 }}>
                      ⏳ {b.activeUntil}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary, #0f172a)', margin: '0 0 4px 0', lineHeight: 1.3 }}>
                    {lang === 'kn' ? b.nameKn : b.nameEn}
                  </h3>
                  <div style={{ fontSize: 12, color: 'var(--text-muted, #64748b)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} /> {b.procurementCenter}
                  </div>
                </div>

                {/* Requirement Card Box */}
                <div style={{
                  background: 'var(--bg-main, #f8fafc)',
                  borderRadius: 12,
                  padding: '12px 14px',
                  border: '1px solid var(--border-light, #e2e8f0)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary, #475569)' }}>
                      Wanted Crop:
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: '#1e40af' }}>
                      {lang === 'kn' ? b.cropKn : b.crop}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>Quantity Needed:</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>{b.quantityNeeded}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 6, borderTop: '1px dashed var(--border, #cbd5e1)' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#15803d' }}>Buying Price:</span>
                    <span style={{ fontSize: 16, fontWeight: 900, color: '#15803d' }}>{b.offeredPrice}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#0369a1', fontWeight: 600, marginTop: 4 }}>
                    💡 {b.priceComparison}
                  </div>
                </div>

                {/* Terms */}
                <div style={{ fontSize: 11, color: 'var(--text-secondary, #475569)', lineHeight: 1.4 }}>
                  <strong>Payment:</strong> {lang === 'kn' ? b.paymentModeKn : b.paymentModeEn}
                </div>

                {/* Official Contact Info */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary, #475569)', background: 'rgba(2, 132, 199, 0.05)', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(2, 132, 199, 0.15)' }}>
                  <div><strong>Official Desk:</strong> <a href={`tel:${b.phone}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 700 }}>{b.phone}</a></div>
                  {b.helpline && (
                    <div style={{ fontSize: 11, color: '#0369a1', marginTop: 2 }}><strong>Helpline:</strong> {b.helpline}</div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 6 }}>
                  <a
                    href={`tel:${b.phone}`}
                    style={{
                      flex: 1,
                      background: '#16a34a',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: 10,
                      padding: '10px 12px',
                      fontSize: 13,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 2px 8px rgba(22,163,74,0.25)'
                    }}
                  >
                    <Phone size={15} />
                    <span>{lang === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'Call Buyer'}</span>
                  </a>

                  <a
                    href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(`Namaskara, I am a farmer from ${currentDistrict}. I saw your buying requirement on GramSetu for ${b.crop}. I have produce ready for sale.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      background: '#075e54',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: 10,
                      padding: '10px 12px',
                      fontSize: 13,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 2px 8px rgba(7,94,84,0.25)'
                    }}
                  >
                    <MessageSquare size={15} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: FARMER PRODUCE FOR SALE ── */}
      {activeSubTab === 'myListings' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16
          }}>
            {farmerListings.map(f => (
              <div
                key={f.id}
                style={{
                  background: 'var(--bg-card, #fff)',
                  border: '1.5px solid var(--border-light, #e2e8f0)',
                  borderRadius: 16,
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#15803d',
                    background: '#dcfce7',
                    padding: '3px 8px',
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <User size={12} /> Verified Farmer Listing
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted, #94a3b8)' }}>{f.postedAt}</span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary, #0f172a)', margin: 0 }}>
                  {f.crop}
                </h3>
                <div style={{ fontSize: 12, color: 'var(--text-secondary, #475569)' }}>
                  👤 <strong>{f.farmerName}</strong> · {f.taluk}, {f.district}
                </div>

                <div style={{
                  background: 'var(--bg-main, #f8fafc)',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-light, #e2e8f0)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)' }}>Available Stock:</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{f.quantity}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)' }}>Expected Price:</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#15803d' }}>{f.expectedPrice}</div>
                  </div>
                </div>

                <p style={{ fontSize: 12, color: 'var(--text-secondary, #475569)', margin: 0, fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{f.notes}"
                </p>

                <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                  <a
                    href={`tel:${f.phone}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      color: '#fff',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      borderRadius: 10,
                      fontWeight: 800,
                      fontSize: 13,
                      boxShadow: '0 2px 8px rgba(22,163,74,0.25)'
                    }}
                  >
                    <Phone size={15} />
                    <span>{lang === 'kn' ? 'ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact Farmer Directly'} ({f.phone})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: POST PRODUCE FOR SALE ── */}
      {showPostModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'var(--bg-card, #fff)',
            borderRadius: 20,
            padding: '24px 28px',
            maxWidth: 500,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            border: '1px solid var(--border-light, #e2e8f0)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>🌾</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary, #0f172a)' }}>
                  {lang === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆ ಮಾರಾಟಕ್ಕೆ ಪ್ರಕಟಿಸಿ' : 'List Produce for Direct Sale'}
                </h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #94a3b8)' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-secondary, #475569)', marginBottom: 18 }}>
              {lang === 'kn'
                ? 'ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಪ್ರಕಟಿಸಿ. ಸಗಟು ಖರೀದಿದಾರರು ಮತ್ತು ಎಫ್‌ಪಿಒಗಳು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.'
                : 'Your listing will be visible to all verified wholesale buyers & FPOs in Karnataka with your direct phone number.'}
            </p>

            <form onSubmit={handlePostListing} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)', display: 'block', marginBottom: 4 }}>
                  Select Crop / ಬೆಳೆ ಆಯ್ಕೆ *
                </label>
                <select
                  value={newCropName}
                  onChange={e => setNewCropName(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13, background: 'var(--bg-main, #fff)'
                  }}
                >
                  <option value="Ragi (Finger Millet)">Ragi (Finger Millet / ರಾಗಿ)</option>
                  <option value="Paddy (Sona Masoori)">Paddy (Sona Masoori / ಭತ್ತ)</option>
                  <option value="Arecanut (Chali / Rashi)">Arecanut (ಅಡಿಕೆ)</option>
                  <option value="Maize / Corn">Maize / Corn (ಮೆಕ್ಕೆಜೋಳ)</option>
                  <option value="Red Gram / Tur">Red Gram / Tur (ತೊಗರಿ)</option>
                  <option value="Coconut / Copra">Coconut / Copra (ಕೊಬ್ಬರಿ)</option>
                  <option value="Coffee (Arabica/Robusta)">Coffee (ಕಾಫಿ)</option>
                  <option value="Tomato">Tomato (ಟೊಮೆಟೊ)</option>
                  <option value="Byadgi Chilli">Byadgi Chilli (ಮೆಣಸಿನಕಾಯಿ)</option>
                  <option value="Turmeric">Turmeric (ಅರಿಶಿನ)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)', display: 'block', marginBottom: 4 }}>
                    Quantity (Quintals) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 25"
                    value={newQuantity}
                    onChange={e => setNewQuantity(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8,
                      border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)', display: 'block', marginBottom: 4 }}>
                    Expected Price (₹/Qtl) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 3950"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8,
                      border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
                      Farmer Name / ಹೆಸರು *
                    </label>
                    <VoiceTypingButton value={newFarmerName} onTranscript={setNewFarmerName} compact />
                  </div>
                  <input
                    type="text"
                    value={newFarmerName}
                    onChange={e => setNewFarmerName(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8,
                      border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
                      Contact Phone *
                    </label>
                    <VoiceTypingButton value={newPhone} onTranscript={val => setNewPhone(val.replace(/\D/g, '').slice(0, 10))} compact />
                  </div>
                  <input
                    type="tel"
                    placeholder="+91 98..."
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8,
                      border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
                    Village / Taluk
                  </label>
                  <VoiceTypingButton value={newVillage} onTranscript={setNewVillage} compact />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Bannur Hobli, T. Narasipura"
                  value={newVillage}
                  onChange={e => setNewVillage(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
                    Special Quality Notes / ಗುಣಮಟ್ಟ ವಿವರ
                  </label>
                  <VoiceTypingButton value={newNotes} onTranscript={setNewNotes} />
                </div>
                <textarea
                  rows={2}
                  placeholder="e.g. Organic certified, moisture < 12%, stored in clean bags"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid var(--border-light, #cbd5e1)', fontSize: 13, resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  style={{
                    flex: 1, padding: '11px', borderRadius: 8, border: '1px solid var(--border, #cbd5e1)',
                    background: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2, padding: '11px', borderRadius: 8, border: 'none',
                    background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff',
                    fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
                  }}
                >
                  {lang === 'kn' ? 'ಮಾರಾಟಕ್ಕೆ ಪ್ರಕಟಿಸಿ' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
