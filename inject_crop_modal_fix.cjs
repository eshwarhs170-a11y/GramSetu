const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/components/VillagerScreens.jsx');
let content = fs.readFileSync(file, 'utf8');

const modalCode = `
      {/* Crop Info Modal */}
      {selectedCropInfo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }} onClick={() => setSelectedCropInfo(null)}>
          <div className="animate-fadeInUp" style={{
            background: 'var(--bg-card)', borderRadius: 16, padding: 24, maxWidth: 400, width: '100%',
            position: 'relative', border: '1px solid var(--border-light)'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCropInfo(null)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'var(--bg-main)', border: 'none', width: 32, height: 32, borderRadius: 16, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
            >✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                <img src={selectedCropInfo.image} alt={selectedCropInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{selectedCropInfo.name}</h3>
                <span className="badge badge-success">Major Crop</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
              {selectedCropInfo.description}
            </p>
          </div>
        </div>
      )}
`;

if (!content.includes("Crop Info Modal")) {
  content = content.replace(
    "    </div>\n  )\n}\n\nexport function SchemesScreen",
    modalCode + "\n    </div>\n  )\n}\n\nexport function SchemesScreen"
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log('Injection successful');
} else {
  console.log('Modal already exists');
}
