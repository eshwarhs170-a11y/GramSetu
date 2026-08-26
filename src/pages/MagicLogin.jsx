import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * MagicLogin - Instant demo login via QR code scan.
 * Usage: /magic-login?role=villager&name=Farmer+Demo&district=Mysuru
 *        /magic-login?role=official&name=PDO+Mysuru&district=Mysuru
 * No OTP required — writes directly to localStorage and redirects.
 */
export default function MagicLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const role = params.get('role') || 'villager';
    const name = params.get('name') || (role === 'official' ? 'Demo Official' : 'Demo Farmer');
    const district = params.get('district') || 'Mysuru';

    if (role === 'official') {
      localStorage.setItem('official_name', name);
      localStorage.setItem('official_district', district);
      localStorage.setItem('official_department', 'Rural Development & Panchayat Raj');
      localStorage.setItem('official_taluk', `${district} Taluk`);
      localStorage.setItem('official_gp', 'Demo Gram Panchayat');
      localStorage.setItem('official_email', `demo.pdo@karnataka.gov.in`);
      localStorage.setItem('official_id', `KA-DEMO-PDO-2026`);
      navigate('/dashboard/official', { replace: true });
    } else {
      localStorage.setItem('villager_name', name);
      localStorage.setItem('villager_district', district);
      localStorage.setItem('villager_email', `demo.farmer@gramsetu.in`);
      localStorage.setItem('villager_loggedIn', 'true');
      navigate('/dashboard/villager', { replace: true });
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ width: 48, height: 48, border: '4px solid #22c55e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: '#64748b', fontSize: '1rem' }}>Logging you in...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
