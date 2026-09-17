import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon path issue in Vite/React builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to re-center map when userLocation is set
function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 16, { animate: true, duration: 1 });
    }
  }, [coords, map]);
  return null;
}

// Component to handle click-to-pin
function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapPicker({ onLocationSelected }) {
  const [position, setPosition] = useState(null);   // currently pinned spot
  const [gpsStatus, setGpsStatus] = useState('loading'); // 'loading' | 'found' | 'denied'
  const [mapCenter, setMapCenter] = useState([15.3173, 75.7139]); // default Karnataka center

  // Step 1: on mount, immediately ask for GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMapCenter([coords.lat, coords.lng]);
        setPosition(coords);
        setGpsStatus('found');
      },
      (err) => {
        console.warn('GPS denied or unavailable:', err.message);
        setGpsStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Status Banner */}
      <div style={{
        padding: '8px 14px', borderRadius: 8, marginBottom: 10, fontSize: 12, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 8,
        background: gpsStatus === 'found' ? '#f0fdf4' : gpsStatus === 'loading' ? '#fefce8' : '#fff7ed',
        color: gpsStatus === 'found' ? '#15803d' : gpsStatus === 'loading' ? '#92400e' : '#c2410c',
        border: `1px solid ${gpsStatus === 'found' ? '#bbf7d0' : gpsStatus === 'loading' ? '#fde68a' : '#fed7aa'}`
      }}>
        {gpsStatus === 'loading' && <span>📡 Getting your location...</span>}
        {gpsStatus === 'found' && <span>✅ Location found — pin is at your spot. Tap anywhere to adjust.</span>}
        {gpsStatus === 'denied' && <span>⚠️ GPS not allowed — tap the map to manually pin your location.</span>}
      </div>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={gpsStatus === 'found' ? 16 : 12}
        style={{ height: '360px', width: '100%', borderRadius: 12, zIndex: 0 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Re-center when GPS comes in */}
        {position && <RecenterMap coords={position} />}
        {/* Click to pin */}
        <ClickHandler setPosition={setPosition} />
        {/* Show pin */}
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>

      {/* Coordinate display */}
      {position && (
        <div style={{
          marginTop: 8, padding: '6px 12px', background: '#f8fafc', borderRadius: 8,
          fontSize: 11, color: '#64748b', border: '1px solid #e2e8f0', fontFamily: 'monospace'
        }}>
          📍 {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </div>
      )}

      {/* Confirm button */}
      <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
        <button
          type="button"
          disabled={!position}
          onClick={() => position && onLocationSelected(position)}
          style={{
            flex: 1, padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 14,
            border: 'none', cursor: position ? 'pointer' : 'not-allowed',
            background: position ? 'linear-gradient(135deg, #10b981, #059669)' : '#cbd5e1',
            color: '#fff', boxShadow: position ? '0 4px 12px rgba(16,185,129,0.3)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          {position ? '✅ Confirm This Location' : '📍 Tap Map to Pin Location'}
        </button>
      </div>
    </div>
  );
}
