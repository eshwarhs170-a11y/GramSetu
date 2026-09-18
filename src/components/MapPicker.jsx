import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Satellite, Map as MapIcon, Crosshair, ExternalLink, Compass, Check, X, AlertCircle } from 'lucide-react';

// Custom SVG pin marker that NEVER fails to load and has zero external network dependencies
const createPinIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; width: 36px; height: 44px; transform: translate(-18px, -44px); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35)); cursor: pointer;">
        <svg viewBox="0 0 36 44" width="36" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.05887 0 0 8.05887 0 18C0 31.5 18 44 18 44C18 44 36 31.5 36 18C36 8.05887 27.9411 0 18 0Z" fill="#dc2626"/>
          <path d="M18 2C9.16344 2 2 9.16344 2 18C2 30 18 41.5 18 41.5C18 41.5 34 30 34 18C34 9.16344 26.8366 2 18 2Z" fill="#ef4444"/>
          <circle cx="18" cy="17" r="7" fill="#ffffff"/>
          <circle cx="18" cy="17" r="4" fill="#dc2626"/>
        </svg>
        <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 3px; background: rgba(0,0,0,0.3); border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
  });
};

const pinIcon = createPinIcon();

// Karnataka District Centroids lookup
const KARNATAKA_DISTRICTS_GPS = {
  'haveri': [14.795, 75.399],
  'mysuru': [12.2958, 76.6394],
  'mysore': [12.2958, 76.6394],
  'bengaluru urban': [12.9716, 77.5946],
  'bengaluru rural': [13.2846, 77.5544],
  'mandya': [12.5218, 76.8951],
  'tumakuru': [13.3409, 77.1006],
  'tumkur': [13.3409, 77.1006],
  'hassan': [13.0033, 76.1004],
  'chamarajanagar': [11.9261, 76.9437],
  'kodagu': [12.4244, 75.7382],
  'chikkamagaluru': [13.3153, 75.7754],
  'dakshina kannada': [12.8703, 74.8806],
  'udupi': [13.3409, 74.7421],
  'shivamogga': [13.9299, 75.5681],
  'shimoga': [13.9299, 75.5681],
  'chitradurga': [14.2251, 76.3980],
  'davanagere': [14.4644, 75.9218],
  'ballari': [15.1394, 76.9214],
  'bellary': [15.1394, 76.9214],
  'vijayanagara': [15.2713, 76.3874],
  'belagavi': [15.8497, 74.4977],
  'belgaum': [15.8497, 74.4977],
  'bagalkot': [16.1691, 75.6615],
  'vijayapura': [16.8302, 75.7100],
  'bijapur': [16.8302, 75.7100],
  'dharwad': [15.4589, 75.0078],
  'gadag': [15.4319, 75.6355],
  'uttara kannada': [14.7979, 74.6869],
  'kalaburagi': [17.3297, 76.8343],
  'gulbarga': [17.3297, 76.8343],
  'bidar': [17.9104, 77.5199],
  'raichur': [16.2120, 77.3439],
  'koppal': [15.3456, 76.1557],
  'yadgir': [16.7621, 77.1378],
  'kolar': [13.1367, 78.1291],
  'chikkaballapur': [13.4325, 77.7275],
  'ramanagara': [12.7209, 77.2799],
};

// Component to handle map re-centering
function RecenterMap({ coords, zoom = 16 }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.lat && coords.lng) {
      map.flyTo([coords.lat, coords.lng], zoom, { animate: true, duration: 1 });
    }
  }, [coords, zoom, map]);
  return null;
}

// Component to fix Leaflet size recalculation in dynamic containers
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [map]);
  return null;
}

// Component to handle click-to-pin
function ClickHandler({ onPinPlaced }) {
  useMapEvents({
    click(e) {
      onPinPlaced({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapPicker({
  onLocationSelected,
  onCancel,
  initialCoords = null,
  district = '',
  taluk = '',
  village = ''
}) {
  // Determine default residential center based on user district or Karnataka center
  const residentialCoords = useMemo(() => {
    const cleanDist = (district || '').toLowerCase().trim();
    if (cleanDist && KARNATAKA_DISTRICTS_GPS[cleanDist]) {
      return KARNATAKA_DISTRICTS_GPS[cleanDist];
    }
    return [15.3173, 75.7139]; // Default Central Karnataka
  }, [district]);

  const [position, setPosition] = useState(
    initialCoords ? { lat: initialCoords.lat, lng: initialCoords.lng } : null
  );
  const [mapCenter, setMapCenter] = useState(
    initialCoords ? [initialCoords.lat, initialCoords.lng] : residentialCoords
  );
  const [zoomLevel, setZoomLevel] = useState(initialCoords ? 16 : district ? 13 : 11);
  const [mapLayer, setMapLayer] = useState('street'); // 'street' | 'satellite'
  const [gpsLoading, setGpsLoading] = useState(false);
  const [locationName, setLocationName] = useState(
    [village, taluk, district].filter(Boolean).join(', ')
  );

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Google Maps link or coordinates paste input
  const [pastedUrl, setPastedUrl] = useState('');
  const [pasteError, setPasteError] = useState('');

  // Step 1: on mount, if no initialCoords, look up residential coords
  useEffect(() => {
    if (!position && residentialCoords) {
      setMapCenter(residentialCoords);
      if (district || taluk) {
        const placeToSearch = [taluk, district, 'Karnataka'].filter(Boolean).join(', ');
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeToSearch)}&limit=1`)
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              setMapCenter([lat, lon]);
              if (!position) {
                setPosition({ lat, lng: lon });
                setLocationName(data[0].display_name ? data[0].display_name.split(',').slice(0, 3).join(',') : placeToSearch);
              }
            }
          })
          .catch(() => {});
      }
    }
  }, [district, taluk, residentialCoords]);

  // Handle GPS location click
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        setMapCenter([coords.lat, coords.lng]);
        setZoomLevel(17);
        setGpsLoading(false);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`)
          .then(r => r.json())
          .then(d => {
            if (d && d.display_name) {
              setLocationName(d.display_name.split(',').slice(0, 3).join(', '));
            }
          })
          .catch(() => {});
      },
      (err) => {
        setGpsLoading(false);
        alert('Could not retrieve GPS location. Please allow browser location access or select on map.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Handle search query
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);

    try {
      const queryWithRegion = searchQuery.toLowerCase().includes('karnataka')
        ? searchQuery.trim()
        : `${searchQuery.trim()}, Karnataka, India`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryWithRegion)}&limit=5`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchError('No matching places found in Karnataka. Try a nearby town or taluk.');
      }
    } catch (err) {
      setSearchError('Search failed. Please check internet connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setPosition({ lat, lng });
    setMapCenter([lat, lng]);
    setZoomLevel(16);
    setLocationName(result.display_name.split(',').slice(0, 3).join(', '));
    setSearchResults([]);
    setSearchQuery('');
  };

  // Handle Google Maps link or coordinates paste
  const handleParsePastedInput = () => {
    setPasteError('');
    const input = pastedUrl.trim();
    if (!input) return;

    // Direct coordinate format
    const coordMatch = input.match(/(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        setPosition({ lat, lng });
        setMapCenter([lat, lng]);
        setZoomLevel(17);
        setLocationName(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
        setPastedUrl('');
        return;
      }
    }

    // Google Maps URL patterns
    const urlMatch = input.match(/@(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/) ||
                     input.match(/[?&]q=(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/) ||
                     input.match(/[?&]ll=(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/);
    if (urlMatch) {
      const lat = parseFloat(urlMatch[1]);
      const lng = parseFloat(urlMatch[2]);
      setPosition({ lat, lng });
      setMapCenter([lat, lng]);
      setZoomLevel(17);
      setLocationName(`From Google Maps: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      setPastedUrl('');
      return;
    }

    setPasteError('Could not recognize coordinates or Google Maps link. E.g. "14.795, 75.399"');
  };

  const handlePinPlaced = (coords) => {
    setPosition(coords);
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`)
      .then(r => r.json())
      .then(d => {
        if (d && d.display_name) {
          setLocationName(d.display_name.split(',').slice(0, 3).join(', '));
        } else {
          setLocationName(`Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`);
        }
      })
      .catch(() => {
        setLocationName(`Lat: ${coords.lat.toFixed(5)}, Lng: ${coords.lng.toFixed(5)}`);
      });
  };

  const handleConfirm = () => {
    if (!position) return;
    onLocationSelected({
      lat: position.lat,
      lng: position.lng,
      address: locationName || `${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`
    });
  };

  return (
    <div style={{
      width: '100%',
      background: 'var(--bg-card, #ffffff)',
      borderRadius: '16px',
      border: '1.5px solid var(--border, #e2e8f0)',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      position: 'relative'
    }}>
      {/* Top Header Controls */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border-light, #f1f5f9)',
        background: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(37,99,235,0.04))',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: '#16a34a', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <MapPin size={16} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary, #0f172a)' }}>
                Pick Complaint Location / ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted, #64748b)' }}>
                Tap anywhere on map or search your village/landmark
              </div>
            </div>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--text-muted, #64748b)',
                padding: '4px 8px', borderRadius: 6
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Search Bar for Village/Taluk/Place */}
        <form onSubmit={handleSearch} style={{ position: 'relative', display: 'flex', gap: 6 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search village, town, or road in Karnataka (e.g. Rattihalli, Haveri)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: '1px solid var(--border, #cbd5e1)',
                background: 'var(--bg-main, #ffffff)',
                color: 'var(--text-primary, #0f172a)',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            style={{
              padding: '9px 16px',
              borderRadius: '10px',
              border: 'none',
              background: '#16a34a',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 13,
              cursor: isSearching ? 'wait' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div style={{
            background: 'var(--bg-card, #ffffff)',
            borderRadius: 10,
            border: '1px solid #cbd5e1',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            maxHeight: 180,
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {searchResults.map((r, i) => (
              <div
                key={i}
                onClick={() => handleSelectSearchResult(r)}
                style={{
                  padding: '9px 12px',
                  borderBottom: i < searchResults.length - 1 ? '1px solid #f1f5f9' : 'none',
                  fontSize: 12,
                  color: 'var(--text-primary, #1e293b)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <MapPin size={14} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.display_name}
                </span>
              </div>
            ))}
          </div>
        )}

        {searchError && (
          <div style={{ fontSize: 12, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertCircle size={14} /> {searchError}
          </div>
        )}

        {/* Quick Jump Action Bar */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {(taluk || district) && (
            <button
              type="button"
              onClick={() => {
                setMapCenter(residentialCoords);
                setZoomLevel(15);
                setPosition({ lat: residentialCoords[0], lng: residentialCoords[1] });
                setLocationName([village, taluk, district].filter(Boolean).join(', '));
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
              }}
            >
              <Compass size={13} />
              <span>🏠 My Residence: {taluk || district}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleGetGpsLocation}
            disabled={gpsLoading}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0',
              borderRadius: 8, padding: '5px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
            }}
          >
            <Crosshair size={13} className={gpsLoading ? 'animate-spin' : ''} />
            <span>{gpsLoading ? 'Acquiring GPS...' : '📡 My Device GPS'}</span>
          </button>

          {/* Map Layer Switcher */}
          <div style={{ marginLeft: 'auto', display: 'flex', background: 'var(--bg-main, #f1f5f9)', borderRadius: 8, padding: 2 }}>
            <button
              type="button"
              onClick={() => setMapLayer('street')}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                background: mapLayer === 'street' ? '#ffffff' : 'transparent',
                color: mapLayer === 'street' ? '#0f172a' : '#64748b',
                boxShadow: mapLayer === 'street' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <MapIcon size={12} /> Street
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('satellite')}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                background: mapLayer === 'satellite' ? '#ffffff' : 'transparent',
                color: mapLayer === 'satellite' ? '#0f172a' : '#64748b',
                boxShadow: mapLayer === 'satellite' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Satellite size={12} /> Satellite
            </button>
          </div>
        </div>
      </div>

      {/* Real Map Container */}
      <div style={{ height: '360px', width: '100%', position: 'relative', zIndex: 0 }}>
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          scrollWheelZoom={true}
        >
          <MapResizeHandler />
          {position && <RecenterMap coords={position} zoom={zoomLevel} />}

          {mapLayer === 'street' ? (
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />
          ) : (
            <TileLayer
              attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={18}
            />
          )}

          <ClickHandler onPinPlaced={handlePinPlaced} />

          {position && (
            <Marker position={[position.lat, position.lng]} icon={pinIcon} />
          )}
        </MapContainer>

        <div style={{
          position: 'absolute', bottom: 12, right: 12, zIndex: 500,
          background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)', color: '#fff',
          padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, pointerEvents: 'none'
        }}>
          🎯 Tap anywhere to set pin
        </div>
      </div>

      {/* Bottom Information & Coordinates Bar */}
      <div style={{ padding: '14px 16px', background: 'var(--bg-card, #ffffff)' }}>
        {position ? (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Selected Spot:
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 1 }}>
                📍 {locationName || `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`}
              </div>
              <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace', marginTop: 2 }}>
                Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: '#2563eb', fontSize: 12, fontWeight: 700, textDecoration: 'none',
                padding: '4px 8px', borderRadius: 6, background: '#eff6ff'
              }}
            >
              <span>View in Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        ) : (
          <div style={{
            background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 10,
            padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#b45309',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <MapPin size={15} />
            <span>Tap on the map or search to place a red pin on your complaint spot.</span>
          </div>
        )}

        {/* Paste Google Maps link or coordinates fallback section */}
        <div style={{ marginBottom: 14, paddingTop: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>
            Or Paste Google Maps Link / Lat-Lng:
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              type="text"
              placeholder="e.g. 14.795, 75.399 or Google Maps link"
              value={pastedUrl}
              onChange={e => setPastedUrl(e.target.value)}
              style={{
                flex: 1, padding: '7px 10px', fontSize: 12, borderRadius: 8,
                border: '1px solid #cbd5e1', outline: 'none'
              }}
            />
            <button
              type="button"
              onClick={handleParsePastedInput}
              style={{
                padding: '7px 12px', borderRadius: 8, border: '1px solid #cbd5e1',
                background: '#f8fafc', fontSize: 12, fontWeight: 600, cursor: 'pointer'
              }}
            >
              Paste &amp; Pin
            </button>
          </div>
          {pasteError && (
            <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
              {pasteError}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 18px', borderRadius: 10, fontWeight: 600, fontSize: 13,
                border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            disabled={!position}
            onClick={handleConfirm}
            style={{
              flex: 1, padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              border: 'none', cursor: position ? 'pointer' : 'not-allowed',
              background: position ? 'linear-gradient(135deg, #16a34a, #15803d)' : '#cbd5e1',
              color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: position ? '0 4px 12px rgba(22,163,74,0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <Check size={16} />
            <span>{position ? 'Confirm This Location' : 'Tap Map to Pin Spot'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

