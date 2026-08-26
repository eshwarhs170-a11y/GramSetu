import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * MagicLogin - Instant demo login via QR code scan.
 * Usage: /magic-login?role=villager&name=...&district=...&taluk=...&gp=...&village=...&phone=...
 * No OTP required — writes directly to localStorage and redirects.
 */
export default function MagicLogin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const role = params.get('role') || 'villager';
    const name = params.get('name') || (role === 'official' ? 'S. R. Patil' : 'Ramappa Gowda');
    const district = params.get('district') || 'Mysuru';
    const taluk = params.get('taluk') || (district === 'Kodagu' ? 'Madikeri' : 'Mysuru');
    const gp = params.get('gp') || (district === 'Kodagu' ? 'Suntikoppa' : 'Varuna');
    const village = params.get('village') || (district === 'Kodagu' ? 'Murnad Village' : 'Varuna Village');
    const phone = params.get('phone') || (district === 'Kodagu' ? '9845987654' : '9845123456');
    const email = params.get('email') || (role === 'official' ? 'pdo.mysuru@karnataka.gov.in' : (district === 'Kodagu' ? 'kaveri.amma@gramsetu.in' : 'ramappa.gowda@gramsetu.in'));
    const areaType = params.get('areaType') || 'rural';
    const department = params.get('department') || 'Rural Development & Panchayat Raj';
    const id = params.get('id') || 'KA-MYS-PDO-2026-042';

    if (role === 'official') {
      window.localStorage.setItem('official_name', name);
      window.localStorage.setItem('official_district', district);
      window.localStorage.setItem('official_taluk', taluk);
      window.localStorage.setItem('official_gp', gp);
      window.localStorage.setItem('official_department', department);
      window.localStorage.setItem('official_email', email);
      window.localStorage.setItem('official_id', id);
      window.localStorage.setItem('official_phone', phone);
      window.localStorage.setItem('official_loggedIn', 'true');
      window.dispatchEvent(new Event('profileUpdate'));
      navigate('/dashboard/official', { replace: true });
    } else {
      // Citizen profile keys used by VillagerScreens & VillagerDashboard
      window.localStorage.setItem('citizen_name', name);
      window.localStorage.setItem('citizen_district', district);
      window.localStorage.setItem('citizen_taluk', taluk);
      window.localStorage.setItem('citizen_gp', gp);
      window.localStorage.setItem('citizen_village', village);
      window.localStorage.setItem('citizen_phone', phone);
      window.localStorage.setItem('citizen_email', email);
      window.localStorage.setItem('citizen_area_type', areaType);
      
      // Also set villager_* aliases for maximum compatibility
      window.localStorage.setItem('villager_name', name);
      window.localStorage.setItem('villager_district', district);
      window.localStorage.setItem('villager_taluk', taluk);
      window.localStorage.setItem('villager_gp', gp);
      window.localStorage.setItem('villager_village', village);
      window.localStorage.setItem('villager_phone', phone);
      window.localStorage.setItem('villager_email', email);
      window.localStorage.setItem('villager_loggedIn', 'true');

      // Clear welcome sound flag so greeting plays for new session
      window.sessionStorage.removeItem('villager_welcomed');
      window.dispatchEvent(new Event('profileUpdate'));
      navigate('/dashboard/villager', { replace: true });
    }
  }, [params, navigate]);

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
      <p style={{ color: '#64748b', fontSize: '1rem' }}>Logging you in to GramSetu...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
