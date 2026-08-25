/**
 * escalation.js — Karnataka Govt Complaint Escalation Engine
 * 
 * Karnataka Govt hierarchy (as per RDPR circular):
 *   Level 0 → PDO / Gram Panchayat Secretary     (7 days SLA)
 *   Level 1 → Taluk Panchayat Executive Officer  (7 days SLA)
 *   Level 2 → CEO, Zilla Panchayat / DC          (7 days SLA)
 *   Level 3 → Commissioner, RDPR (State)          (final)
 */

export const ESCALATION_LEVELS = [
  {
    level: 0,
    role: 'PDO / Gram Panchayat Secretary',
    roleKn: 'ಪಿಡಿಒ / ಗ್ರಾಮ ಪಂಚಾಯತ್ ಕಾರ್ಯದರ್ಶಿ',
    dept: 'Gram Panchayat / PDO',
    slaDays: 7,
    icon: 'Home',
  },
  {
    level: 1,
    role: 'Taluk Panchayat Executive Officer',
    roleKn: 'ತಾಲೂಕ್ ಪಂಚಾಯತ್ ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿ',
    dept: 'Taluk Panchayat',
    slaDays: 7,
    icon: 'Landmark',
  },
  {
    level: 2,
    role: 'CEO, Zilla Panchayat / Deputy Commissioner',
    roleKn: 'ಜಿಲ್ಲಾ ಪಂಚಾಯತ್ ಮುಖ್ಯ ಕಾರ್ಯನಿರ್ವಾಹಕ / ಉಪ ಆಯುಕ್ತ',
    dept: 'Zilla Panchayat',
    slaDays: 7,
    icon: 'Building2',
  },
  {
    level: 3,
    role: 'Commissioner, RDPR (State Level)',
    roleKn: 'ಆಯುಕ್ತ, ಆರ್‌ಡಿಪಿಆರ್ (ರಾಜ್ಯ ಮಟ್ಟ)',
    dept: 'RDPR Karnataka',
    slaDays: null, // Final level
    icon: 'Star',
  },
]

/** Returns days elapsed since a Firestore Timestamp or ISO string */
export const daysSince = (ts) => {
  if (!ts) return 0
  let ms
  if (ts?.toMillis) ms = ts.toMillis()
  else if (ts?.seconds) ms = ts.seconds * 1000
  else ms = new Date(ts).getTime()
  return (Date.now() - ms) / (1000 * 60 * 60 * 24)
}

/** Given a complaint, returns whether it is overdue at its current escalation level */
export const isOverdue = (complaint) => {
  const level = complaint.escalationLevel ?? 0
  const info = ESCALATION_LEVELS[level]
  if (!info?.slaDays) return false
  const since = daysSince(complaint.lastRespondedAt || complaint.createdAt)
  return since > info.slaDays
}

/** Returns the next escalation level object (or null if already at top) */
export const getNextLevel = (complaint) => {
  const current = complaint.escalationLevel ?? 0
  return ESCALATION_LEVELS[current + 1] || null
}

/** Returns current level info */
export const getCurrentLevel = (complaint) => {
  return ESCALATION_LEVELS[complaint.escalationLevel ?? 0]
}
