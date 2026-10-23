import React, { useState, useEffect } from 'react'
import {
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  GraduationCap,
  Sprout,
  Landmark,
  ShieldCheck,
  ArrowRight,
  UploadCloud,
  HelpCircle,
  CreditCard,
  User,
  Info
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ProfileDocumentsModal({
  isOpen,
  onClose,
  defaultTab = 'schemes',
  onSaved,
  onNavigateFullProfile
}) {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(defaultTab) // 'schemes' | 'scholarships'
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Farmer & Government Schemes state
  const [land, setLand] = useState('')
  const [income, setIncome] = useState('')
  const [caste, setCaste] = useState('OBC-2A')
  const [rationCard, setRationCard] = useState('BPL')
  const [surveyNo, setSurveyNo] = useState('')
  const [fruitsFid, setFruitsFid] = useState('')
  const [bankNpci, setBankNpci] = useState('active')
  const [farmerDocs, setFarmerDocs] = useState({
    aadhaar: true,
    rtc: true,
    incomeCert: false,
    casteCert: false,
    bankPassbook: true,
    rationCard: true,
    fruitsFid: false
  })

  // Scholarship & Student state
  const [studentLevel, setStudentLevel] = useState('Undergraduate Degree')
  const [studentCollege, setStudentCollege] = useState('')
  const [sspId, setSspId] = useState('')
  const [marksPercent, setMarksPercent] = useState('')
  const [hostelStatus, setHostelStatus] = useState('Day Scholar')
  const [parentOcc, setParentOcc] = useState('Farmer')
  const [studentDocs, setStudentDocs] = useState({
    marksCard: true,
    studyCert: true,
    sspAttest: false,
    casteIncome: false,
    feeReceipt: true,
    npciBank: true,
    parentRtc: true
  })

  // Sync activeTab when defaultTab changes
  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab)
  }, [defaultTab])

  // Load existing data from localStorage
  useEffect(() => {
    if (!isOpen) return

    setLand(localStorage.getItem('citizen_land') || '')
    setIncome(localStorage.getItem('citizen_income') || '')
    setCaste(localStorage.getItem('citizen_caste') || 'OBC-2A')
    setRationCard(localStorage.getItem('citizen_ration_card') || 'BPL')
    setSurveyNo(localStorage.getItem('citizen_survey_no') || '')
    setFruitsFid(localStorage.getItem('citizen_fruits_id') || '')
    setBankNpci(localStorage.getItem('citizen_bank_npci') || 'active')

    try {
      const savedFDocs = JSON.parse(localStorage.getItem('citizen_farmer_docs') || '{}')
      if (savedFDocs && Object.keys(savedFDocs).length > 0) {
        setFarmerDocs(prev => ({ ...prev, ...savedFDocs }))
      }
    } catch {}

    setStudentLevel(localStorage.getItem('student_level') || 'Undergraduate Degree')
    setStudentCollege(localStorage.getItem('student_college') || '')
    setSspId(localStorage.getItem('student_ssp_id') || '')
    setMarksPercent(localStorage.getItem('student_marks_percent') || '')
    setHostelStatus(localStorage.getItem('student_hostel_status') || 'Day Scholar')
    setParentOcc(localStorage.getItem('student_parent_occ') || 'Farmer')

    try {
      const savedSDocs = JSON.parse(localStorage.getItem('student_docs') || '{}')
      if (savedSDocs && Object.keys(savedSDocs).length > 0) {
        setStudentDocs(prev => ({ ...prev, ...savedSDocs }))
      }
    } catch {}

    setSaveSuccess(false)
  }, [isOpen])

  if (!isOpen) return null

  const toggleFarmerDoc = (key) => {
    setFarmerDocs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleStudentDoc = (key) => {
    setStudentDocs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = (e) => {
    if (e) e.preventDefault()

    // Save Farmer / Schemes data
    if (land) localStorage.setItem('citizen_land', land)
    if (income) localStorage.setItem('citizen_income', income)
    if (caste) localStorage.setItem('citizen_caste', caste)
    localStorage.setItem('citizen_ration_card', rationCard)
    localStorage.setItem('citizen_survey_no', surveyNo)
    localStorage.setItem('citizen_fruits_id', fruitsFid)
    localStorage.setItem('citizen_bank_npci', bankNpci)
    localStorage.setItem('citizen_farmer_docs', JSON.stringify(farmerDocs))

    // Save Student / Scholarship data
    localStorage.setItem('student_level', studentLevel)
    localStorage.setItem('student_college', studentCollege)
    localStorage.setItem('student_ssp_id', sspId)
    if (marksPercent) localStorage.setItem('student_marks_percent', marksPercent)
    localStorage.setItem('student_hostel_status', hostelStatus)
    localStorage.setItem('student_parent_occ', parentOcc)
    localStorage.setItem('student_docs', JSON.stringify(studentDocs))

    // If student fills income/caste and general is empty, sync them
    if (income && !localStorage.getItem('citizen_income')) {
      localStorage.setItem('citizen_income', income)
    }
    if (caste && !localStorage.getItem('citizen_caste')) {
      localStorage.setItem('citizen_caste', caste)
    }

    // Trigger global update
    window.dispatchEvent(new Event('profileUpdate'))
    setSaveSuccess(true)

    if (onSaved) {
      onSaved({
        land,
        income,
        caste,
        rationCard,
        surveyNo,
        studentLevel,
        studentCollege,
        sspId,
        marksPercent
      })
    }

    setTimeout(() => {
      setSaveSuccess(false)
      onClose()
    }, 1100)
  }

  // Count ready documents
  const farmerDocsReadyCount = Object.values(farmerDocs).filter(Boolean).length
  const studentDocsReadyCount = Object.values(studentDocs).filter(Boolean).length

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="animate-fadeInUp"
        style={{
          background: 'var(--bg-card, #ffffff)',
          color: 'var(--text-primary, #0f172a)',
          borderRadius: 20,
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-light, #e2e8f0)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: activeTab === 'schemes'
              ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #2563eb 100%)'
              : 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #6d28d9 100%)',
            padding: '20px 24px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            transition: 'background 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {activeTab === 'schemes' ? <Sprout size={24} color="#fef08a" /> : <GraduationCap size={24} color="#fef08a" />}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#fff' }}>
                {lang === 'kn' ? 'ಅರ್ಹತಾ ಪ್ರೊಫೈಲ್ ಮತ್ತು ದಾಖಲೆಗಳ ದಾಖಲಾತಿ' : 'Eligibility Profile & Documents Vault'}
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                {lang === 'kn'
                  ? 'ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ಭರ್ತಿ ಮಾಡಿ'
                  : 'Separated required profile details & documents for Schemes and Scholarships'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-main, #f8fafc)',
            padding: '8px 16px',
            borderBottom: '1px solid var(--border-light, #e2e8f0)',
            gap: 10
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('schemes')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: activeTab === 'schemes' ? 'var(--primary, #2563eb)' : 'transparent',
              color: activeTab === 'schemes' ? '#fff' : 'var(--text-secondary, #64748b)',
              boxShadow: activeTab === 'schemes' ? '0 4px 12px rgba(37,99,235,0.25)' : 'none'
            }}
          >
            <Sprout size={16} />
            <span>{lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು & ರೈತರು' : 'Govt Schemes & Farmers'}</span>
            <span
              style={{
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 20,
                background: activeTab === 'schemes' ? 'rgba(255,255,255,0.25)' : 'var(--border-light, #e2e8f0)',
                color: activeTab === 'schemes' ? '#fff' : 'var(--text-muted, #94a3b8)'
              }}
            >
              {farmerDocsReadyCount}/7 {lang === 'kn' ? 'ದಾಖಲೆಗಳು' : 'docs'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scholarships')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: activeTab === 'scholarships' ? '#7c3aed' : 'transparent',
              color: activeTab === 'scholarships' ? '#fff' : 'var(--text-secondary, #64748b)',
              boxShadow: activeTab === 'scholarships' ? '0 4px 12px rgba(124,58,237,0.25)' : 'none'
            }}
          >
            <GraduationCap size={16} />
            <span>{lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ & ಶಿಕ್ಷಣ' : 'Scholarships & Students'}</span>
            <span
              style={{
                fontSize: 11,
                padding: '2px 7px',
                borderRadius: 20,
                background: activeTab === 'scholarships' ? 'rgba(255,255,255,0.25)' : 'var(--border-light, #e2e8f0)',
                color: activeTab === 'scholarships' ? '#fff' : 'var(--text-muted, #94a3b8)'
              }}
            >
              {studentDocsReadyCount}/7 {lang === 'kn' ? 'ದಾಖಲೆಗಳು' : 'docs'}
            </span>
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {saveSuccess && (
            <div
              className="animate-fadeInUp"
              style={{
                background: '#dcfce7',
                border: '1.5px solid #22c55e',
                color: '#15803d',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontWeight: 700,
                fontSize: 13
              }}
            >
              <CheckCircle2 size={20} color="#15803d" />
              <span>
                {lang === 'kn'
                  ? 'ಪ್ರೊಫೈಲ್ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ! AI ಅರ್ಹತೆ ಮರುಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...'
                  : 'Profile & Documents successfully updated! Running AI eligibility check...'}
              </span>
            </div>
          )}

          {activeTab === 'schemes' ? (
            /* ============================================================== */
            /* TAB 1: GOVERNMENT SCHEMES & FARMERS                             */
            /* ============================================================== */
            <form onSubmit={handleSave}>
              <div
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 12,
                  padding: '12px 16px',
                  marginBottom: 18,
                  fontSize: 12,
                  color: '#1e40af',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10
                }}
              >
                <Info size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: 2 }}>
                    {lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಮಾಹಿತಿ' : 'Government Schemes Eligibility Criteria'}
                  </strong>
                  {lang === 'kn'
                    ? 'ಪಿಎಂ ಕಿಸಾನ್, ಕೃಷಿ ಭಾಗ್ಯ, ಗೃಹಲಕ್ಷ್ಮಿ, ಗಂಗಾ ಕಲ್ಯಾಣ ಮುಂತಾದ ಯೋಜನೆಗಳಿಗೆ ಜಮೀನು, ಆದಾಯ, ಜಾತಿ ಹಾಗೂ ಪಹಣಿ ಸಂಖ್ಯೆ ಮುಖ್ಯ ದಾಖಲೆಗಳಾಗಿವೆ.'
                    : 'Schemes like PM Kisan, Krishi Bhagya, Ganga Kalyana, and Raitha Siri determine qualification based on land size, annual family income, social category, and RTC Pahani records.'}
                </div>
              </div>

              {/* 3 Core Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                {/* Land Size */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                    <span>🌾 {lang === 'kn' ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)' : 'Landholding (Acres)'} <span style={{ color: '#dc2626' }}>*</span></span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    className="form-input"
                    placeholder="e.g. 2.5"
                    value={land}
                    onChange={(e) => setLand(e.target.value)}
                    required
                    style={{ fontSize: 14, fontWeight: 600 }}
                  />
                  <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                    {['1.0', '2.0', '3.5', '5.0'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setLand(val)}
                        style={{
                          fontSize: 10,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: land === val ? 'var(--primary)' : 'var(--bg-main, #f1f5f9)',
                          color: land === val ? '#fff' : 'var(--text-muted, #64748b)',
                          border: '1px solid var(--border-light, #e2e8f0)',
                          cursor: 'pointer'
                        }}
                      >
                        {val} ac
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Income */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13 }}>
                    <span>💰 {lang === 'kn' ? 'ವಾರ್ಷಿಕ ಕುಟುಂಬ ಆದಾಯ (₹)' : 'Annual Income (₹)'} <span style={{ color: '#dc2626' }}>*</span></span>
                  </label>
                  <input
                    type="number"
                    step="5000"
                    min="10000"
                    className="form-input"
                    placeholder="e.g. 120000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                    style={{ fontSize: 14, fontWeight: 600 }}
                  />
                  <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                    {[
                      { label: '< ₹1L', val: '80000' },
                      { label: '₹1.5L', val: '150000' },
                      { label: '₹2.5L', val: '250000' }
                    ].map(item => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setIncome(item.val)}
                        style={{
                          fontSize: 10,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: income === item.val ? 'var(--primary)' : 'var(--bg-main, #f1f5f9)',
                          color: income === item.val ? '#fff' : 'var(--text-muted, #64748b)',
                          border: '1px solid var(--border-light, #e2e8f0)',
                          cursor: 'pointer'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Caste / Category */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13 }}>
                    <span>🪪 {lang === 'kn' ? 'ಸಾಮಾಜಿಕ ವರ್ಗ / ಜಾತಿ' : 'Social Category / Caste'} <span style={{ color: '#dc2626' }}>*</span></span>
                  </label>
                  <select
                    className="form-input"
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    required
                    style={{ fontSize: 13, fontWeight: 600 }}
                  >
                    <option value="SC">SC (ಪರಿಶಿಷ್ಟ ಜಾತಿ)</option>
                    <option value="ST">ST (ಪರಿಶಿಷ್ಟ ಪಂಗಡ)</option>
                    <option value="Category-1">Category-1 (ಪ್ರವರ್ಗ-1)</option>
                    <option value="OBC-2A">OBC Category 2A (ಪ್ರವರ್ಗ 2ಎ)</option>
                    <option value="OBC-2B">OBC Category 2B (ಪ್ರವರ್ಗ 2ಬಿ - ಮುಸ್ಲಿಂ)</option>
                    <option value="OBC-3A">OBC Category 3A (ಪ್ರವರ್ಗ 3ಎ - ಒಕ್ಕಲಿಗ/ಇತರೆ)</option>
                    <option value="OBC-3B">OBC Category 3B (ಪ್ರವರ್ಗ 3ಬಿ - ಲಿಂಗಾಯತ/ಇತರೆ)</option>
                    <option value="General">General / EWS (ಸಾಮಾನ್ಯ / ಆರ್ಥಿಕ ದುರ್ಬಲ)</option>
                    <option value="Minority">Minority (ಅಲ್ಪಸಂಖ್ಯಾತ)</option>
                  </select>
                </div>
              </div>

              {/* Secondary Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
                {/* Ration Card Type */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    🍚 {lang === 'kn' ? 'ಪಡಿತರ ಚೀಟಿ ವಿಧ' : 'Ration Card Category'}
                  </label>
                  <select
                    className="form-input"
                    value={rationCard}
                    onChange={(e) => setRationCard(e.target.value)}
                    style={{ fontSize: 13 }}
                  >
                    <option value="BPL">BPL (ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗಿನ - ಆಹಾರ ಭದ್ರತೆ)</option>
                    <option value="Antyodaya">Antyodaya (AAY - ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್)</option>
                    <option value="APL">APL (ಸಾಮಾನ್ಯ ಪಡಿತರ ಕಾರ್ಡ್)</option>
                    <option value="None">None (ಯಾವುದೂ ಇಲ್ಲ)</option>
                  </select>
                </div>

                {/* RTC Pahani / Survey Number */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    📄 {lang === 'kn' ? 'ಭೂಮಿ ಪಹಣಿ ಸರ್ವೆ ನಂಬರ್' : 'Land RTC Survey Number'}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Survey 42/1A"
                    value={surveyNo}
                    onChange={(e) => setSurveyNo(e.target.value)}
                    style={{ fontSize: 13 }}
                  />
                </div>

                {/* FRUITS FID */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    🏷️ {lang === 'kn' ? 'ರೈತರ ಫ್ರೂಟ್ಸ್ ಐಡಿ (FID)' : 'Karnataka FRUITS FID'}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. FID-109283"
                    value={fruitsFid}
                    onChange={(e) => setFruitsFid(e.target.value)}
                    style={{ fontSize: 13 }}
                  />
                </div>
              </div>

              {/* Bank NPCI / Aadhaar Seeding */}
              <div
                style={{
                  background: bankNpci === 'active' ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${bankNpci === 'active' ? '#86efac' : '#fde68a'}`,
                  borderRadius: 12,
                  padding: '12px 16px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CreditCard size={20} color={bankNpci === 'active' ? '#16a34a' : '#d97706'} />
                  <div>
                    <strong style={{ fontSize: 13, color: bankNpci === 'active' ? '#15803d' : '#92400e', display: 'block' }}>
                      {lang === 'kn' ? 'ಬ್ಯಾಂಕ್ ಆಧಾರ್ ಸೀಡಿಂಗ್ (NPCI DBT ಮ್ಯಾಪಿಂಗ್)' : 'Aadhaar NPCI Bank Mapping (DBT)'}
                    </strong>
                    <span style={{ fontSize: 11, color: bankNpci === 'active' ? '#166534' : '#b45309' }}>
                      {lang === 'kn'
                        ? 'ಸರ್ಕಾರಿ ಸಹಾಯಧನ ನೇರವಾಗಿ ಜಮೆಯಾಗಲು ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿರಬೇಕು'
                        : 'Required for PM-Kisan & state subsidies to be credited via Direct Benefit Transfer'}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => setBankNpci('active')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: bankNpci === 'active' ? '#16a34a' : '#e2e8f0',
                      color: bankNpci === 'active' ? '#fff' : '#475569'
                    }}
                  >
                    ✓ {lang === 'kn' ? 'ಸಕ್ರಿಯ (Active)' : 'Active / Linked'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBankNpci('pending')}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      background: bankNpci === 'pending' ? '#d97706' : '#e2e8f0',
                      color: bankNpci === 'pending' ? '#fff' : '#475569'
                    }}
                  >
                    ⚠️ {lang === 'kn' ? 'ಬಾಕಿ (Pending)' : 'Pending'}
                  </button>
                </div>
              </div>

              {/* Documents Vault Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={16} color="var(--primary)" />
                    <span>{lang === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕಡ್ಡಾಯ ದಾಖಲೆಗಳು' : 'Mandatory Government Documents Checklist'}</span>
                  </h4>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                    {farmerDocsReadyCount} / 7 {lang === 'kn' ? 'ಲಭ್ಯವಿದೆ' : 'Ready'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                  {[
                    { key: 'aadhaar', icon: '🪪', title: 'Aadhaar Card / ಆಧಾರ್ ಕಾರ್ಡ್', hint: 'Mobile linked for OTP verification', src: 'UIDAI' },
                    { key: 'rtc', icon: '📄', title: 'Bhoomi RTC / ಭೂಮಿ ಪಹಣಿ ಪತ್ರ', hint: 'Current year signed RTC with survey no.', src: 'Bhoomi Karnataka' },
                    { key: 'incomeCert', icon: '📜', title: 'Income Certificate / ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ', hint: 'Valid RD Number within 5 years', src: 'Nadakacheri' },
                    { key: 'casteCert', icon: '🏷️', title: 'Caste Certificate / ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ', hint: 'Valid RD Number (SC/ST/OBC)', src: 'Nadakacheri' },
                    { key: 'bankPassbook', icon: '💳', title: 'Aadhaar Seeded Bank Account', hint: 'NPCI mapped active savings passbook', src: 'Bank Branch' },
                    { key: 'rationCard', icon: '🍚', title: 'Ration Card / ಪಡಿತರ ಚೀಟಿ', hint: 'BPL / Antyodaya card for family quota', src: 'Ahara Karnataka' },
                    { key: 'fruitsFid', icon: '🌾', title: 'FRUITS Farmer Registration Slip', hint: 'FID verification by Agriculture Dept', src: 'RSK / Gram One' },
                  ].map(doc => {
                    const isReady = farmerDocs[doc.key]
                    return (
                      <div
                        key={doc.key}
                        onClick={() => toggleFarmerDoc(doc.key)}
                        style={{
                          background: isReady ? 'var(--bg-main, #f8fafc)' : '#ffffff',
                          border: `1.5px solid ${isReady ? '#86efac' : 'var(--border-light, #e2e8f0)'}`,
                          borderRadius: 10,
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 20 }}>{doc.icon}</span>
                          <div>
                            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{doc.title}</p>
                            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-muted)' }}>{doc.hint} · <em style={{ color: 'var(--primary)' }}>{doc.src}</em></p>
                          </div>
                        </div>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: isReady ? '#22c55e' : 'var(--border-light, #e2e8f0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            flexShrink: 0
                          }}
                        >
                          {isReady ? <Check size={14} strokeWidth={3} /> : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                {onNavigateFullProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onNavigateFullProfile()
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <User size={14} /> {lang === 'kn' ? 'ಸಂಪೂರ್ಣ ಪ್ರೊಫೈಲ್ ಪುಟಕ್ಕೆ ಹೋಗಿ →' : 'Go to Full Profile Page →'}
                  </button>
                )}
                <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={onClose}
                    style={{ fontSize: 13, padding: '9px 18px' }}
                  >
                    {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      fontSize: 13,
                      padding: '9px 22px',
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Check size={16} />
                    <span>{lang === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ & ಪರಿಶೀಲಿಸಿ' : 'Save & Check Eligibility'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ============================================================== */
            /* TAB 2: SCHOLARSHIPS & STUDENT ACADEMIC PROFILE                 */
            /* ============================================================== */
            <form onSubmit={handleSave}>
              <div
                style={{
                  background: '#f5f3ff',
                  border: '1px solid #ddd6fe',
                  borderRadius: 12,
                  padding: '12px 16px',
                  marginBottom: 18,
                  fontSize: 12,
                  color: '#5b21b6',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10
                }}
              >
                <GraduationCap size={20} color="#7c3aed" style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: 2 }}>
                    {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಅರ್ಹತಾ ಮಾನದಂಡಗಳು' : 'Scholarship Eligibility Criteria'}
                  </strong>
                  {lang === 'kn'
                    ? 'ಕರ್ನಾಟಕ SSP, ರೈತ ವಿದ್ಯಾ ನಿಧಿ, ವಿದ್ಯಾಸಿರಿ ಮತ್ತು ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ತರಗತಿ, ಕಾಲೇಜು, ಅಂಕ ಶೇಕಡಾವಾರು ಮತ್ತು SSP ಐಡಿ ವಿವರಗಳು ಅಗತ್ಯ.'
                    : 'Karnataka State Scholarship Portal (SSP), CM Raitha Vidya Nidhi, BCWD Vidyasiri, and merit scholarships require student class level, college, marks percentage, and SSP registration.'}
                </div>
              </div>

              {/* Student Core Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                {/* Academic Level */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13 }}>
                    🎓 {lang === 'kn' ? 'ಪ್ರಸ್ತುತ ತರಗತಿ / ಶಿಕ್ಷಣ ಹಂತ' : 'Education Level / Class'} <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(e.target.value)}
                    required
                    style={{ fontSize: 13, fontWeight: 600 }}
                  >
                    <option value="School (Class 8-10)">School (8ನೇ - 10ನೇ ತರಗತಿ)</option>
                    <option value="PUC (11th-12th)">PUC / 11th - 12th (ಪಿಯುಸಿ)</option>
                    <option value="ITI / Diploma">ITI / Polytechnic Diploma (ಐಟಿಐ / ಡಿಪ್ಲೊಮಾ)</option>
                    <option value="Undergraduate Degree">General Degree - BA / BSc / BCom / BBA</option>
                    <option value="Engineering & Tech">Engineering / B.E / B.Tech</option>
                    <option value="Medical & Nursing">Medical / MBBS / BDS / Nursing / Pharmacy</option>
                    <option value="Postgraduate (PG)">Postgraduate - MA / MSc / MCom / MBA / MTech</option>
                  </select>
                </div>

                {/* Previous Year Marks % */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13 }}>
                    📊 {lang === 'kn' ? 'ಹಿಂದಿನ ವರ್ಷದ ಅಂಕಗಳು (%)' : 'Previous Year Marks (%)'} <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="35"
                    max="100"
                    className="form-input"
                    placeholder="e.g. 78.5"
                    value={marksPercent}
                    onChange={(e) => setMarksPercent(e.target.value)}
                    required
                    style={{ fontSize: 14, fontWeight: 600 }}
                  />
                  <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                    {['60%', '75%', '85%', '90%+'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMarksPercent(val.replace('%', '').replace('+', ''))}
                        style={{
                          fontSize: 10,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: marksPercent === val.replace('%', '').replace('+', '') ? '#7c3aed' : 'var(--bg-main, #f1f5f9)',
                          color: marksPercent === val.replace('%', '').replace('+', '') ? '#fff' : 'var(--text-muted, #64748b)',
                          border: '1px solid var(--border-light, #e2e8f0)',
                          cursor: 'pointer'
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SSP Student ID */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: 13 }}>
                    🆔 {lang === 'kn' ? 'ಕರ್ನಾಟಕ SSP ವಿದ್ಯಾರ್ಥಿ ಐಡಿ' : 'Karnataka SSP Student ID'}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 19200xxxx (Optional if new)"
                    value={sspId}
                    onChange={(e) => setSspId(e.target.value)}
                    style={{ fontSize: 13 }}
                  />
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {lang === 'kn' ? 'ssp.postmatric.karnataka.gov.in ನ ಐಡಿ' : 'From State Scholarship Portal'}
                  </span>
                </div>
              </div>

              {/* Institution and Family Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
                {/* College Name */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    🏫 {lang === 'kn' ? 'ಕಾಲೇಜು / ಶಾಲೆಯ ಹೆಸರು & ಊರು' : 'Institution / College Name'}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Govt First Grade College, Mysuru"
                    value={studentCollege}
                    onChange={(e) => setStudentCollege(e.target.value)}
                    style={{ fontSize: 13 }}
                  />
                </div>

                {/* Parent Occupation */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    🌾 {lang === 'kn' ? 'ಪೋಷಕರ ಕಸುಬು / ಉದ್ಯೋಗ' : 'Parent Occupation'}
                  </label>
                  <select
                    className="form-input"
                    value={parentOcc}
                    onChange={(e) => setParentOcc(e.target.value)}
                    style={{ fontSize: 13 }}
                  >
                    <option value="Farmer">Farmer / ಕೃಷಿಕ (Qualifies for Raitha Vidya Nidhi)</option>
                    <option value="Agricultural Laborer">Agricultural Laborer / ಕೂಲಿ ಕಾರ್ಮಿಕ</option>
                    <option value="Auto / Commercial Driver">Commercial Driver / ಚಾಲಕರು (JK Tyre Sarthi)</option>
                    <option value="Self-Employed">Self-Employed / ಸ್ವಯಂ ಉದ್ಯೋಗಿ</option>
                    <option value="Private / Govt Service">Private / Govt Service / ಉದ್ಯೋಗಿ</option>
                  </select>
                </div>

                {/* Hostel / Accommodation */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12 }}>
                    🏠 {lang === 'kn' ? 'ವಸತಿ ವಿಧ (ವಿದ್ಯಾಸಿರಿ ಭತ್ಯೆಗೆ ಮುಖ್ಯ)' : 'Accommodation Status'}
                  </label>
                  <select
                    className="form-input"
                    value={hostelStatus}
                    onChange={(e) => setHostelStatus(e.target.value)}
                    style={{ fontSize: 13 }}
                  >
                    <option value="Day Scholar">Day Scholar / ಮನೆಯಿಂದ ಓಡಾಟ</option>
                    <option value="Private Room / PG">Private Room / PG (Eligible for Vidyasiri ₹1,500/mo)</option>
                    <option value="Govt BCM / SWD Hostel">Govt Hostel (BCM / ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ ಹಾಸ್ಟೆಲ್)</option>
                  </select>
                </div>
              </div>

              {/* Shared Income & Caste reminder */}
              <div
                style={{
                  background: 'var(--bg-main, #f8fafc)',
                  border: '1px solid var(--border-light, #e2e8f0)',
                  borderRadius: 12,
                  padding: '12px 16px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10
                }}
              >
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                    🪪 {lang === 'kn' ? 'ಕುಟುಂಬ ಆದಾಯ & ಸಾಮಾಜಿಕ ವರ್ಗ:' : 'Family Income & Caste Record:'}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                    {income ? `₹${Number(income).toLocaleString('en-IN')}/year` : 'Income not set'} · {caste}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('schemes')}
                  style={{
                    background: 'none',
                    border: '1px solid var(--primary)',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'kn' ? 'ಆದಾಯ/ಜಾತಿ ಬದಲಾಯಿಸಿ' : 'Edit Income / Caste'}
                </button>
              </div>

              {/* Student Documents Checklist */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShieldCheck size={16} color="#7c3aed" />
                    <span>{lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು' : 'Mandatory Scholarship Documents Checklist'}</span>
                  </h4>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                    {studentDocsReadyCount} / 7 {lang === 'kn' ? 'ಲಭ್ಯವಿದೆ' : 'Ready'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                  {[
                    { key: 'marksCard', icon: '📄', title: 'Previous Marks Card / ಅಂಕಪಟ್ಟಿ', hint: '10th / 12th / Previous semester marks', src: 'Board / University' },
                    { key: 'studyCert', icon: '🏫', title: 'Study / Bonafide Certificate', hint: 'Signed by Principal with College seal', src: 'College Office' },
                    { key: 'sspAttest', icon: '🆔', title: 'SSP E-Attestation Slip', hint: 'Attested document number on SSP Portal', src: 'SSP Portal' },
                    { key: 'casteIncome', icon: '📜', title: 'Caste & Income Certificate (RD)', hint: 'Mandatory for fee waiver & concession', src: 'Nadakacheri' },
                    { key: 'feeReceipt', icon: '🧾', title: 'Current Year College Fee Receipt', hint: 'For reimbursement of tuition & lab fees', src: 'College Accounts' },
                    { key: 'npciBank', icon: '🏦', title: 'Student Bank NPCI Passbook', hint: 'Must be in student name with Aadhaar seeding', src: 'Bank Branch' },
                    { key: 'parentRtc', icon: '🌾', title: 'Parent Land RTC / FRUITS FID', hint: 'Mandatory for CM Raitha Vidya Nidhi', src: 'Bhoomi / FRUITS' },
                  ].map(doc => {
                    const isReady = studentDocs[doc.key]
                    return (
                      <div
                        key={doc.key}
                        onClick={() => toggleStudentDoc(doc.key)}
                        style={{
                          background: isReady ? 'var(--bg-main, #f8fafc)' : '#ffffff',
                          border: `1.5px solid ${isReady ? '#a78bfa' : 'var(--border-light, #e2e8f0)'}`,
                          borderRadius: 10,
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 20 }}>{doc.icon}</span>
                          <div>
                            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{doc.title}</p>
                            <p style={{ margin: 0, fontSize: 10, color: 'var(--text-muted)' }}>{doc.hint} · <em style={{ color: '#7c3aed' }}>{doc.src}</em></p>
                          </div>
                        </div>
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            background: isReady ? '#7c3aed' : 'var(--border-light, #e2e8f0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            flexShrink: 0
                          }}
                        >
                          {isReady ? <Check size={14} strokeWidth={3} /> : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                {onNavigateFullProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onNavigateFullProfile()
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#7c3aed',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <User size={14} /> {lang === 'kn' ? 'ಸಂಪೂರ್ಣ ಪ್ರೊಫೈಲ್ ಪುಟಕ್ಕೆ ಹೋಗಿ →' : 'Go to Full Profile Page →'}
                  </button>
                )}
                <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={onClose}
                    style={{ fontSize: 13, padding: '9px 18px' }}
                  >
                    {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      fontSize: 13,
                      padding: '9px 22px',
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Check size={16} />
                    <span>{lang === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ & ಪರಿಶೀಲಿಸಿ' : 'Save & Check Scholarships'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
