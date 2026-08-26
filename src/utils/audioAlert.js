/**
 * Synthesizes a loud, crisp, 2.0-second two-tone resonant notification chime
 * using the Web Audio API. Requires zero external audio files.
 */
export function playLoudNotificationChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Primary High-Impact Tone (D5 -> A5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc1.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.12); // A5

    gain1.gain.setValueAtTime(0.01, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.85, ctx.currentTime + 0.05); // High loud volume
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.95); // 2-second resonant decay

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Harmonic Shimmer Tone (D6 bell harmonic)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.1); // D6
    osc2.frequency.exponentialRampToValueAtTime(1760.00, ctx.currentTime + 0.25); // A6

    gain2.gain.setValueAtTime(0.01, ctx.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0); // Rings out for full 2.0 seconds

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 2.0);

    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 2.0);
  } catch (err) {
    console.warn('Web Audio synthesis error:', err);
  }
}

/**
 * Tactical Radar Ping (for Phase 4 Heatmap) - 2.0 seconds duration
 */
export function playTacticalRadarChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc.frequency.exponentialRampToValueAtTime(493.88, ctx.currentTime + 0.4); // B4 drop
    osc.frequency.exponentialRampToValueAtTime(246.94, ctx.currentTime + 1.2); // B3 bass rumble

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.0);
  } catch (err) {
    console.warn('Tactical Radar Audio error:', err);
  }
}
