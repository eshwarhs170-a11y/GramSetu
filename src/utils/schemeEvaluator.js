export function evaluateGovernmentEligibility({ mode, land, income, caste, district, studentLevel, studentMarks, parentOcc }) {
  const numericLand = parseFloat(land) || 0;
  const numericIncome = parseFloat(String(income || '').replace(/\D/g, '')) || 0;
  const marks = parseFloat(studentMarks) || 0;
  const cLower = String(caste || '').toLowerCase();
  const isScSt = cLower.includes('sc') || cLower.includes('st');
  const isObc = cLower.includes('obc') || cLower.includes('cat') || cLower.includes('2a') || cLower.includes('2b') || cLower.includes('3a') || cLower.includes('3b');
  const isMinority = cLower.includes('minority') || cLower.includes('muslim') || cLower.includes('christian') || cLower.includes('jain');

  if (mode === 'farmer') {
    const list = [];
    // 1. PM-KISAN
    if (numericLand > 0) {
      list.push({
        name: 'PM-KISAN Samman Nidhi',
        benefit: '₹6,000 / year (₹2,000 every 4 months via DBT)',
        category: 'Central',
        reason: `Eligible: Landholding of ${numericLand} acres registered in land records.`,
        apply: 'Apply through your local Raitha Samparka Kendra (RSK) or at pmkisan.gov.in using Aadhaar & RTC.',
        link: 'https://pmkisan.gov.in'
      });
    }
    // 2. Karnataka Raitha Siri
    if (numericLand > 0 && numericLand <= 5) {
      list.push({
        name: 'Karnataka Raitha Siri Scheme',
        benefit: '₹10,000 / hectare direct cash assistance',
        category: 'State',
        reason: `Eligible: Small/marginal farmer with ${numericLand} acres eligible for millet cultivation assistance.`,
        apply: 'Register on FRUITS portal (fruits.karnataka.gov.in) with your Village Accountant or RSK.',
        link: 'https://fruits.karnataka.gov.in'
      });
    }
    // 3. Ganga Kalyana Scheme
    if ((isScSt || isObc) && numericLand >= 1 && numericLand <= 5 && (!numericIncome || numericIncome <= (isScSt ? 250000 : 150000))) {
      list.push({
        name: 'Ganga Kalyana Scheme',
        benefit: '100% Free Individual Borewell & Pump Energization',
        category: 'State',
        reason: `Eligible: Category ${caste}, small landholder (${numericLand} acres) with income under ₹${(isScSt ? 250000 : 150000).toLocaleString('en-IN')}.`,
        apply: 'Apply online on Seva Sindhu (sevasindhu.karnataka.gov.in) under KDDC / Dr. Ambedkar Dev Corp.',
        link: 'https://sevasindhu.karnataka.gov.in'
      });
    }
    // 4. PM Fasal Bima Yojana
    if (numericLand > 0) {
      list.push({
        name: 'PM Fasal Bima Yojana (Samrakshane Karnataka)',
        benefit: 'Comprehensive crop loss & natural calamity insurance',
        category: 'Central & State',
        reason: `Eligible: Farmer cultivating notified crops in ${district || 'Karnataka'}.`,
        apply: 'Enroll at your nearest bank branch or CSC center on samrakshane.karnataka.gov.in.',
        link: 'https://samrakshane.karnataka.gov.in'
      });
    }
    // 5. Kisan Credit Card
    if (numericLand > 0) {
      list.push({
        name: 'Kisan Credit Card (KCC) Crop Loan',
        benefit: 'Concessional crop loan at 4% subsidized interest rate',
        category: 'Central',
        reason: `Eligible: Landholder with ${numericLand} acres eligible for collateral-free crop credit up to ₹1.6 Lakhs (and up to ₹3 Lakhs subsidized).`,
        apply: 'Submit KCC application form at your primary agricultural credit society (PACS) or bank.',
        link: 'https://pmkisan.gov.in'
      });
    }
    // 6. Krishi Bhagya
    if (numericLand >= 1) {
      list.push({
        name: 'Karnataka Krishi Bhagya Scheme',
        benefit: '80% - 90% subsidy for Farm Pond (Krishi Honda) & diesel pump set',
        category: 'State',
        reason: `Eligible: Rainfed farming plot (${numericLand} acres) in Karnataka.`,
        apply: 'Submit request at Assistant Director of Agriculture (ADA) office or RSK center.',
        link: 'https://raitamitra.karnataka.gov.in'
      });
    }

    // Default safety fallback if land is 0
    if (list.length === 0) {
      list.push({
        name: 'PM-KISAN Samman Nidhi',
        benefit: '₹6,000 / year',
        category: 'Central',
        reason: 'Subject to land record entry in FRUITS portal.',
        apply: 'Visit your nearest RSK center or Gram Panchayat office.',
        link: 'https://pmkisan.gov.in'
      });
    }
    return list;
  } else {
    // Student mode
    const list = [];
    const pOcc = String(parentOcc || '').toLowerCase();
    const isFarmerWard = pOcc.includes('farm') || pOcc.includes('agri') || pOcc.includes('farmer') || !pOcc;

    // 1. CM Raitha Vidya Nidhi
    if (isFarmerWard) {
      list.push({
        name: 'CM Raitha Vidya Nidhi Scholarship',
        benefit: '₹2,000 to ₹11,000 / year direct DBT transfer',
        category: 'State',
        reason: `Eligible: Ward of a registered farmer in Karnataka pursuing ${studentLevel || 'studies'}.`,
        apply: 'Apply through Karnataka SSP Post-Matric portal using your parent\'s FRUITS FID number.',
        link: 'https://ssp.postmatric.karnataka.gov.in'
      });
    }

    // 2. Karnataka SSP Post-Matric Scholarship
    if (!numericIncome || numericIncome <= (isScSt ? 250000 : 150000)) {
      list.push({
        name: 'Karnataka SSP Post-Matric Scholarship',
        benefit: 'Full Tuition Fee Reimbursement + Monthly Maintenance Allowance',
        category: 'State',
        reason: `Eligible: Category ${caste || 'OBC/SC/ST'} with family income within the ₹${(isScSt ? 250000 : 150000).toLocaleString('en-IN')} annual limit.`,
        apply: 'Register on SSP portal (ssp.postmatric.karnataka.gov.in) with e-Attestation.',
        link: 'https://ssp.postmatric.karnataka.gov.in'
      });
    }

    // 3. BCWD Vidyasiri
    if (isObc && (!numericIncome || numericIncome <= 250000)) {
      list.push({
        name: 'BCWD Vidyasiri (Food & Accommodation Stipend)',
        benefit: '₹1,500 / month (₹15,000 / year) stipend for hostellers/students outside hometown',
        category: 'State',
        reason: `Eligible: Backward Classes student studying post-matric outside native village/town.`,
        apply: 'Apply through SSP portal selecting Backward Classes Welfare Department option.',
        link: 'https://ssp.postmatric.karnataka.gov.in'
      });
    }

    // 4. Kittur Rani Chennamma Post-Matric Scholarship
    if (marks >= 60) {
      list.push({
        name: 'Kittur Rani Chennamma Merit Scholarship',
        benefit: 'Annual merit scholarship & academic incentive award',
        category: 'State',
        reason: `Eligible: High academic performance (${marks}% marks) in previous qualifying examination.`,
        apply: 'Apply via Collegiate Education / Technical Education portal link on SSP.',
        link: 'https://ssp.postmatric.karnataka.gov.in'
      });
    }

    // 5. SKDRDP Sujnananidhi Scholarship
    list.push({
      name: 'SKDRDP Sujnananidhi Educational Scholarship',
      benefit: '₹400 to ₹1,000 / month educational financial aid',
      category: 'Charitable / NGO',
      reason: `Eligible: Student pursuing higher / technical education from rural Karnataka family.`,
      apply: 'Submit application through Shri Kshethra Dharmasthala Rural Development Project taluk branch.',
      link: 'https://skdrdpindia.org'
    });

    return list;
  }
}
