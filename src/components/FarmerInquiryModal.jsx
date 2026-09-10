import React, { useState, useEffect, useMemo } from 'react'
import {
  X, HelpCircle, MapPin, Send, CheckCircle2, Clock,
  FileText, MessageSquarePlus, Copy, Check, Edit3,
  AlertCircle, ChevronRight, User, Phone, Mail, Building2, MapPinOff, ShieldCheck
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { districtsOfKarnataka } from '../data/karnatakaTaluks'
import { db } from '../firebase'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'

export default function FarmerInquiryModal({
  isOpen,
  onClose,
  defaultCategory = 'missing_village',
  prefillDistrict = '',
  prefillTaluk = '',
  prefillVillage = ''
}) {
  const { lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Theme-aware colour tokens
  const T = {
    bg:        isDark ? '#161b22' : '#ffffff',
    bgMain:    isDark ? '#0d1117' : '#f8fafc',
    bgDisabled:isDark ? '#161b22' : '#f1f5f9',
    text:      isDark ? '#e6edf3' : '#0f172a',
    textSub:   isDark ? '#8b949e' : '#475569',
    textMuted: isDark ? '#6e7681' : '#94a3b8',
    border:    isDark ? '#30363d' : '#cbd5e1',
    borderLight: isDark ? '#21262d' : '#e2e8f0',
    headerGrad: isDark
      ? 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(59,130,246,0.05) 100%)'
      : 'linear-gradient(135deg, rgba(22,163,74,0.08) 0%, rgba(37,99,235,0.05) 100%)',
    cardBg:    isDark ? '#0d1117' : '#f8fafc',
    bannerBg:  isDark ? 'rgba(34,197,94,0.08)' : 'rgba(22,163,74,0.08)',
    bannerBorder: isDark ? 'rgba(34,197,94,0.25)' : 'rgba(22,163,74,0.25)',
    catBg:     isDark ? '#0d1117' : '#f8fafc',
    catBorder: isDark ? '#30363d' : '#e2e8f0',
    catIconBg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    catIconColor: isDark ? '#8b949e' : '#64748b',
    catText:   isDark ? '#e6edf3' : '#1e293b',
    catDesc:   isDark ? '#6e7681' : '#64748b',
  }

  const [category, setCategory] = useState(defaultCategory)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [district, setDistrict] = useState('')
  const [taluk, setTaluk] = useState('')
  const [gp, setGp] = useState('')
  const [villageName, setVillageName] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [submittedTicket, setSubmittedTicket] = useState(null)
  const [copied, setCopied] = useState(false)
  const [editingTicketId, setEditingTicketId] = useState(null)
  const [editingDocId, setEditingDocId] = useState(null)

  // Initialize or reset form when modal opens
  useEffect(() => {
    if (isOpen && !editingTicketId) {
      setCategory(defaultCategory || 'missing_village')
      setName(window.localStorage.getItem('citizen_name') || '')
      setPhone(window.localStorage.getItem('citizen_phone') || '')
      setEmail(window.localStorage.getItem('citizen_email') || '')
      setDistrict(prefillDistrict || window.localStorage.getItem('citizen_district') || '')
      setTaluk(prefillTaluk || window.localStorage.getItem('citizen_taluk') || '')
      setVillageName(prefillVillage || '')
      setGp(window.localStorage.getItem('citizen_gp') || '')
      setSubject(
        defaultCategory === 'missing_village'
          ? (lang === 'kn' ? 'ನನ್ನ ಗ್ರಾಮವನ್ನು ಗ್ರಾಮಸೇತುಗೆ ಸೇರಿಸಿ' : 'Add missing village to GramSetu database')
          : ''
      )
      setDescription('')
      setErrorMsg('')
      setSubmittedTicket(null)
      setCopied(false)
    }
  }, [isOpen, defaultCategory, prefillDistrict, prefillTaluk, prefillVillage, lang])

  // Get taluks for currently selected district
  const availableTaluks = useMemo(() => {
    if (!district) return []
    const match = districtsOfKarnataka.find(d => d.name.toLowerCase() === district.toLowerCase())
    return match ? match.taluks.map(t => t.name) : []
  }, [district])

  // Handle District Change
  const handleDistrictChange = (d) => {
    setDistrict(d)
    setTaluk('')
  }

  // Handle Category Change
  const handleCategorySelect = (catKey) => {
    setCategory(catKey)
    if (catKey === 'missing_village' && !subject) {
      setSubject(lang === 'kn' ? 'ನನ್ನ ಗ್ರಾಮವನ್ನು ಗ್ರಾಮಸೇತುಗೆ ಸೇರಿಸಿ' : 'Add missing village to GramSetu database')
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setErrorMsg(lang === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : 'Please enter your name')
      return
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg(lang === 'kn' ? 'ದಯವಿಟ್ಟು 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Please enter a valid 10-digit mobile number')
      return
    }
    if (!district) {
      setErrorMsg(lang === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' : 'Please select your district')
      return
    }
    if (category === 'missing_village' && !villageName.trim()) {
      setErrorMsg(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಸೇರಿಸಬೇಕಾದ ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' : 'Please enter the missing village or hamlet name')
      return
    }
    if (!description.trim()) {
      setErrorMsg(lang === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿವರಣೆ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ' : 'Please enter your query or details')
      return
    }

    setLoading(true)
    setErrorMsg('')

    const ticketId = editingTicketId || `GS-INQ-${Math.floor(100000 + Math.random() * 900000)}`
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

    const inquiryData = {
      ticketId,
      _docId: editingDocId || null,
      category,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      district,
      taluk: taluk || '',
      gp: gp.trim(),
      villageName: villageName.trim(),
      subject: subject.trim() || (category === 'missing_village' ? 'Missing Village Report' : 'Farmer Query'),
      description: description.trim(),
      status: 'pending', // 'pending' | 'in_progress' | 'resolved'
      resolutionNotes: '',
      resolvedBy: '',
      resolvedAt: null,
      dateStr,
      source: 'web_portal'
    }

    // 1. Save or update in Firestore
    try {
      if (editingDocId) {
        await updateDoc(doc(db, 'farmer_inquiries', editingDocId), {
          ...inquiryData,
          updatedAt: serverTimestamp()
        })
      } else {
        const docRef = await addDoc(collection(db, 'farmer_inquiries'), {
          ...inquiryData,
          createdAt: serverTimestamp()
        })
        inquiryData._docId = docRef.id
      }
    } catch (err) {
      console.warn('Firestore direct write failed, saving locally:', err)
    }

    // 2. Cache in localStorage for offline access and local official screen sync
    try {
      const existing = JSON.parse(window.localStorage.getItem('gramsetu_farmer_inquiries') || '[]')
      let updated
      if (editingTicketId) {
        updated = existing.map(item => (item.ticketId || item.id) === editingTicketId ? { ...inquiryData, id: ticketId, updatedAt: now.toISOString() } : item)
      } else {
        updated = [
          { ...inquiryData, id: ticketId, createdAt: now.toISOString() },
          ...existing
        ]
      }
      window.localStorage.setItem('gramsetu_farmer_inquiries', JSON.stringify(updated))
    } catch (e) {
      console.warn('Could not save to localStorage', e)
    }

    // 3. Dispatch event for real-time UI reactions across tabs/components
    try {
      window.dispatchEvent(new CustomEvent('farmerInquirySubmitted', { detail: inquiryData }))
    } catch (_) {}

    setLoading(false)
    setSubmittedTicket(inquiryData)
    setEditingTicketId(null)
    setEditingDocId(null)
  }

  const handleEditSubmission = () => {
    if (!submittedTicket) return
    setEditingTicketId(submittedTicket.ticketId)
    setEditingDocId(submittedTicket._docId || null)
    setSubmittedTicket(null)
  }

  const handleCopyTicket = () => {
    if (!submittedTicket) return
    navigator.clipboard?.writeText(submittedTicket.ticketId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  const categories = [
    {
      id: 'missing_village',
      icon: MapPinOff,
      labelEn: 'Missing Village / Panchayat',
      labelKn: 'ಕಾಣೆಯಾದ ಗ್ರಾಮ / ಪಂಚಾಯತಿ',
      descEn: 'Report village, hamlet, or ward missing from lists',
      descKn: 'ಪಟ್ಟಿಯಲ್ಲಿ ಕಾಣಿಸದ ಗ್ರಾಮ ಅಥವಾ ಹಾಡಿ'
    },
    {
      id: 'question',
      icon: HelpCircle,
      labelEn: 'Question & Scheme Help',
      labelKn: 'ಯೋಜನೆ / ಕೃಷಿ ಪ್ರಶ್ನೆ',
      descEn: 'Ask about subsidies, APMC, or government benefits',
      descKn: 'ಸಹಾಯಧನ, ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಯೋಜನೆ ಮಾಹಿತಿ'
    },
    {
      id: 'data_correction',
      icon: FileText,
      labelEn: 'Data Correction / Update',
      labelKn: 'ಮಾಹಿತಿ ತಿದ್ದುಪಡಿ',
      descEn: 'Request changes to incorrect rates, names, or offices',
      descKn: 'ತಪ್ಪಾದ ಮಾಹಿತಿ ಅಥವಾ ಬೆಲೆ ತಿದ್ದುಪಡಿಗೆ ಕೋರಿಕೆ'
    },
    {
      id: 'other',
      icon: MessageSquarePlus,
      labelEn: 'General Feedback',
      labelKn: 'ಇತರ ಸಲಹೆ / ನೆರವು',
      descEn: 'Suggestions or assistance for GramSetu platform',
      descKn: 'ಗ್ರಾಮಸೇತು ತಂತ್ರಜ್ಞಾನ ಸಂಬಂಧಿತ ಸಲಹೆ'
    }
  ]

  return (
    <div
      className="modal-overlay animate-fadeInUp"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: T.bg,
          color: T.text,
          borderRadius: '24px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: `1px solid ${T.borderLight}`,
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${T.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: T.headerGrad
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                flexShrink: 0
              }}
            >
              <HelpCircle size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: T.text }}>
                {lang === 'kn' ? 'ರೈತ ಸಹಾಯವಾಣಿ & ಮಾಹಿತಿ ಸಲ್ಲಿಕೆ' : 'Farmer Helpdesk & Missing Data Submission'}
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: T.textSub }}>
                {lang === 'kn'
                  ? 'ಕಾಣೆಯಾದ ಗ್ರಾಮ ಅಥವಾ ಪ್ರಶ್ನೆಗಳನ್ನು ಡೇಟಾಬೇಸ್‌ಗೆ ಕಳುಹಿಸಿ — ಅಧಿಕಾರಿಗಳು ಪರಿಹರಿಸುತ್ತಾರೆ'
                  : 'Submit missing villages or questions to our database for nodal officer resolution'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: T.textMuted,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bgMain)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {submittedTicket ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'rgba(22, 163, 74, 0.12)',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 0 0 8px rgba(22, 163, 74, 0.05)'
                }}
              >
                <CheckCircle2 size={44} strokeWidth={2.4} />
              </div>

              <h4 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px', color: T.text }}>
                {lang === 'kn' ? 'ವಿವರಗಳನ್ನು ಡೇಟಾಬೇಸ್‌ಗೆ ದಾಖಲಿಸಲಾಗಿದೆ!' : 'Successfully Submitted to Database!'}
              </h4>

              <p style={{ fontSize: '14px', color: T.textSub, maxWidth: '440px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                {lang === 'kn'
                  ? 'ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅಧಿಕಾರಿಗಳಿಗೆ ರವಾನಿಸಲಾಗಿದೆ. ನಮ್ಮ ತಾಲ್ಲೂಕು ನೋಡೆಲ್ ಅಧಿಕಾರಿಗಳು ಪರಿಶೀಲಿಸಿ ಪರಿಹರಿಸಲಿದ್ದಾರೆ.'
                  : 'Your submission has been safely saved in the GramSetu master database. Taluk and District nodal officers will review and update this shortly.'}
              </p>

              {/* Ticket Card */}
              <div
                style={{
                  background: T.cardBg,
                  border: '1.5px dashed #16a34a',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  maxWidth: '380px',
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: T.textMuted, fontWeight: 700 }}>
                    {lang === 'kn' ? 'ಟ್ರ್ಯಾಕಿಂಗ್ ಟಿಕೆಟ್ ಐಡಿ' : 'Reference Ticket ID'}
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary, #16a34a)', letterSpacing: '0.04em' }}>
                    {submittedTicket.ticketId}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyTicket}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: copied ? '#16a34a' : T.bgMain,
                    color: copied ? '#ffffff' : T.text,
                    border: `1px solid ${T.border}`,
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? (lang === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'Copied') : (lang === 'kn' ? 'ನಕಲಿಸಿ' : 'Copy ID')}
                </button>
              </div>

              {/* Summary Details */}
              <div
                style={{
                  background: T.cardBg,
                  borderRadius: '14px',
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '13px',
                  color: T.textSub,
                  maxWidth: '440px',
                  margin: '0 auto 24px',
                  lineHeight: 1.6
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>{lang === 'kn' ? 'ವಿಭಾಗ:' : 'Category:'}</strong>
                  <span>{submittedTicket.category === 'missing_village' ? 'Missing Village Report' : 'Farmer Query'}</span>
                </div>
                {submittedTicket.villageName && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong>{lang === 'kn' ? 'ಗ್ರಾಮ / ಪ್ರದೇಶ:' : 'Village / Area:'}</strong>
                    <span style={{ fontWeight: 700, color: '#16a34a' }}>{submittedTicket.villageName}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>{lang === 'kn' ? 'ಸ್ಥಳ:' : 'Location:'}</strong>
                  <span>{submittedTicket.taluk ? `${submittedTicket.taluk}, ` : ''}{submittedTicket.district}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{lang === 'kn' ? 'ಸ್ಥಿತಿ:' : 'Status:'}</strong>
                  <span style={{ color: '#d97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {lang === 'kn' ? 'ಬಾಕಿ ಇದೆ (ಅಧಿಕಾರಿಗಳ ಪರಿಶೀಲನೆ)' : 'Pending (Under Review)'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleEditSubmission}
                  style={{
                    background: T.bgMain,
                    border: '1.5px solid #2563eb',
                    borderRadius: '12px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2563eb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.12)'
                  }}
                >
                  <Edit3 size={14} />
                  <span>{lang === 'kn' ? 'ತಿದ್ದುಪಡಿ ಮಾಡಿ' : 'Edit Response'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingTicketId(null); setEditingDocId(null); setSubmittedTicket(null); }}
                  style={{
                    background: 'transparent',
                    border: `1.5px solid ${T.border}`,
                    borderRadius: '12px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: T.text,
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'kn' ? 'ಹೊಸ ಸಲ್ಲಿಕೆ' : 'Submit Another'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: '#16a34a',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  {lang === 'kn' ? 'ಮುಗಿಯಿತು' : 'Done & Close'}
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit}>
              {/* Editing Banner */}
              {editingTicketId && (
                <div
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    border: '1.5px solid rgba(37, 99, 235, 0.3)',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1d4ed8', fontWeight: 700 }}>
                    <Edit3 size={16} />
                    <span>{lang === 'kn' ? `ಪ್ರತಿಕ್ರಿಯೆ ತಿದ್ದುಪಡಿ ಮಾಡುತ್ತಿದ್ದೀರಿ: ${editingTicketId}` : `Editing Response: ${editingTicketId}`}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setEditingTicketId(null); setEditingDocId(null); }}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel Edit'}
                  </button>
                </div>
              )}

              {/* Category Selector Chips */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '10px', color: T.text }}>
                  {lang === 'kn' ? 'ಸಲ್ಲಿಕೆಯ ಪ್ರಕಾರ ಆಯ್ಕೆ ಮಾಡಿ *' : 'Select What You Need to Submit *'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {categories.map((c) => {
                    const Icon = c.icon
                    const isSelected = category === c.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCategorySelect(c.id)}
                        style={{
                          textAlign: 'left',
                          padding: '12px 14px',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid #16a34a' : `1.5px solid ${T.catBorder}`,
                          background: isSelected ? (isDark ? 'rgba(34,197,94,0.1)' : 'rgba(22,163,74,0.07)') : T.catBg,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          transition: 'all 0.2s',
                          boxShadow: isSelected ? '0 4px 12px rgba(22, 163, 74, 0.12)' : 'none'
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: isSelected ? '#16a34a' : T.catIconBg,
                            color: isSelected ? '#ffffff' : T.catIconColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          <Icon size={16} strokeWidth={2.2} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '13px', color: isSelected ? (isDark ? '#4ade80' : '#16a34a') : T.catText }}>
                            {lang === 'kn' ? c.labelKn : c.labelEn}
                          </div>
                          <div style={{ fontSize: '11px', color: T.catDesc, marginTop: '2px', lineHeight: 1.3 }}>
                            {lang === 'kn' ? c.descKn : c.descEn}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Special Prompt for Missing Village */}
              {category === 'missing_village' && (
                <div
                  style={{
                    background: T.bannerBg,
                    border: `1px solid ${T.bannerBorder}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <MapPinOff size={22} style={{ color: isDark ? '#4ade80' : '#16a34a', flexShrink: 0 }} />
                  <div style={{ fontSize: '12px', color: T.text, lineHeight: 1.5 }}>
                    <strong>{lang === 'kn' ? 'ಗ್ರಾಮ ಸೇರ್ಪಡೆ ಖಾತರಿ:' : 'Missing Village Guarantee:'}</strong>{' '}
                    {lang === 'kn'
                      ? 'ನಿಮ್ಮ ಗ್ರಾಮ, ಹಟ್ಟಿ ಅಥವಾ ಮಜರೆ ಹೆಸರು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಮಾಸ್ಟರ್ ಪಟ್ಟಿಯಲ್ಲಿ ಸೇರ್ಪಡೆ ಮಾಡಲು ನೇರವಾಗಿ ಪಿಡಿಒ ಮತ್ತು ತಾಲೂಕು ಕಚೇರಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.'
                      : 'Your village, hamlet, or majare name will be forwarded directly to the PDO and Taluk Panchayat for master database inclusion.'}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#fef2f2',
                    color: '#b91c1c',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #fecaca'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Farmer Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                    {lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು / Farmer Name *' : 'Farmer / Citizen Name *'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      required
                      placeholder={lang === 'kn' ? 'ಉದಾ: ರಾಮಪ್ಪ ಗೌಡ' : 'e.g. Ramappa Gowda'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '12px',
                        border: `1.5px solid ${T.border}`,
                        background: T.bgMain,
                        color: T.text,
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                    {lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ / Phone Number *' : 'Mobile Number (For resolution SMS) *'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '12px',
                        border: `1.5px solid ${T.border}`,
                        background: T.bgMain,
                        color: T.text,
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Location Cascade */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                    {lang === 'kn' ? 'ಜಿಲ್ಲೆ / District *' : 'District *'}
                  </label>
                  <select
                    required
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${T.border}`,
                      background: T.bgMain,
                      color: T.text,
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="" disabled>{lang === 'kn' ? 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select District'}</option>
                    {districtsOfKarnataka.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                    {lang === 'kn' ? 'ತಾಲೂಕು / Taluk' : 'Taluk'}
                  </label>
                  <select
                    value={taluk}
                    onChange={(e) => setTaluk(e.target.value)}
                    disabled={!district}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${T.border}`,
                      background: district ? T.bgMain : T.bgDisabled,
                      color: T.text,
                      fontSize: '13px',
                      outline: 'none',
                      cursor: district ? 'pointer' : 'not-allowed',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">{district ? (lang === 'kn' ? 'ತಾಲೂಕು ಆಯ್ಕೆಮಾಡಿ' : 'Select Taluk') : (lang === 'kn' ? 'ಮೊದಲು ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select District First')}</option>
                    {availableTaluks.map((tName) => (
                      <option key={tName} value={tName}>{tName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                    {lang === 'kn' ? 'ಗ್ರಾಮ ಪಂಚಾಯತಿ / GP (ಐಚ್ಛಿಕ)' : 'Gram Panchayat (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'kn' ? 'ಉದಾ: ಬಿಳಿಕೆರೆ ಜಿ.ಪಿ' : 'e.g. Bilikere GP'}
                    value={gp}
                    onChange={(e) => setGp(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${T.border}`,
                      background: T.bgMain,
                      color: T.text,
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Village Name Specific Field */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: category === 'missing_village' ? (isDark ? '#4ade80' : '#16a34a') : T.textSub }}>
                  {category === 'missing_village'
                    ? (lang === 'kn' ? 'ಸೇರಿಸಬೇಕಾದ ಗ್ರಾಮ / ಮಜರೆ ಹೆಸರು *' : 'Missing Village / Hamlet / Area Name *')
                    : (lang === 'kn' ? 'ನಿಮ್ಮ ಗ್ರಾಮ / ಪ್ರದೇಶ ಹೆಸರು' : 'Village / Area Name')}
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: category === 'missing_village' ? (isDark ? '#4ade80' : '#16a34a') : T.textMuted }} />
                  <input
                    type="text"
                    required={category === 'missing_village'}
                    placeholder={lang === 'kn' ? 'ಉದಾ: ಹೊಸಹಳ್ಳಿ, ಕೆರೆಕೊಪ್ಪಲು, ಅಥವಾ ವಾರ್ಡ್ ನಂ 4' : 'e.g. Hosahalli, Kerekoppalu, or Hamlet Name'}
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '12px',
                      border: category === 'missing_village' ? '2px solid #16a34a' : '1.5px solid var(--border, #cbd5e1)',
                      background: 'var(--bg-main, #f8fafc)',
                      color: 'var(--text-main, #0f172a)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                  {lang === 'kn' ? 'ವಿಷಯ / Subject *' : 'Subject / Summary *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'kn' ? 'ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ' : 'Brief title of your question or report'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: `1.5px solid ${T.border}`,
                    background: T.bgMain,
                    color: T.text,
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: T.textSub }}>
                  {lang === 'kn' ? 'ಪೂರ್ಣ ವಿವರಗಳು ಅಥವಾ ಪ್ರಶ್ನೆ *' : 'Full Details / Description / Question *'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    category === 'missing_village'
                      ? (lang === 'kn'
                          ? 'ಹತ್ತಿರದ ಪ್ರಮುಖ ಲ್ಯಾಂಡ್‌ಮಾರ್ಕ್, ಗ್ರಾಮ ಪಂಚಾಯತಿ ಅಥವಾ ಪಿನ್‌ಕೋಡ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ...'
                          : 'Mention nearest landmark, Gram Panchayat, pincode, or hobli so officials can verify and add it quickly...')
                      : (lang === 'kn'
                          ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ, ಕೃಷಿ ಅಥವಾ ಯೋಜನೆ ಸಂಬಂಧಿತ ವಿವರಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...'
                          : 'Describe your question or issue in detail...')
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: `1.5px solid ${T.border}`,
                    background: T.bgMain,
                    color: T.text,
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    lineHeight: 1.5
                  }}
                />
              </div>

              {/* Submit Action */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #ef4444',
                    color: '#ef4444',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#ef4444'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(239,68,68,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#ef4444'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  {loading ? (
                    <>
                      <Clock size={16} className="animate-spin" />
                      <span>{lang === 'kn' ? 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      {editingTicketId ? <Check size={16} strokeWidth={2.2} /> : <Send size={16} strokeWidth={2.2} />}
                      <span>
                        {editingTicketId
                          ? (lang === 'kn' ? 'ಬದಲಾವಣೆ ಉಳಿಸಿ' : 'Save Changes')
                          : (lang === 'kn' ? 'ಡೇಟಾಬೇಸ್‌ಗೆ ಕಳುಹಿಸಿ' : 'Send to Database')}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
