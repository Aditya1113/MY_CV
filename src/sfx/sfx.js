// src/utils/sfx.js
// Synthesized sound effects via the Web Audio API — no .mp3/.wav assets needed.

let ctx = null;
let master = null;
let muted = false;

// Restore the user's mute preference if we've stored one.
try {
  muted = localStorage.getItem('swarnima-muted') === '1';
} catch {
  muted = false;
}

const NOTE = {
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
  C6: 1046.5,
  E6: 1318.51,
  G6: 1567.98,
};

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null; // very old browser — fail silently, never crash the game
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  // Browsers suspend the context until a real user gesture has happened.
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/**
 * Call once from App on mount. Browsers refuse to play audio before the user
 * has interacted with the page, so we wake the context on the first click or
 * keypress and then remove the listeners.
 */
export function initAudio() {
  if (typeof window === 'undefined') return () => {};
  const wake = () => {
    getCtx();
    window.removeEventListener('pointerdown', wake);
    window.removeEventListener('keydown', wake);
  };
  window.addEventListener('pointerdown', wake, { once: true });
  window.addEventListener('keydown', wake, { once: true });
  return () => {
    window.removeEventListener('pointerdown', wake);
    window.removeEventListener('keydown', wake);
  };
}

export function isMuted() {
  return muted;
}

export function setMuted(next) {
  muted = !!next;
  try {
    localStorage.setItem('swarnima-muted', muted ? '1' : '0');
  } catch {
    /* storage unavailable — keep the in-memory flag only */
  }
  return muted;
}

export function toggleMuted() {
  return setMuted(!muted);
}

function playNote(startAt, freq, dur, { type = 'triangle', peak = 0.16, detune = 0 } = {}) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  if (detune) osc.detune.setValueAtTime(detune, startAt);

  // Quick attack, exponential decay — reads as a bell/chime rather than a beep.
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(peak, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);

  osc.connect(gain);
  gain.connect(master);
  osc.start(startAt);
  osc.stop(startAt + dur + 0.03);
}

/** Rising four-note arpeggio — the "level unlocked!" fanfare. */
export function playUnlock() {
  if (muted || !getCtx()) return;
  const t = ctx.currentTime + 0.01;
  const seq = [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6];

  seq.forEach((freq, i) => {
    playNote(t + i * 0.075, freq, 0.32, { peak: 0.15 });
  });

  // A soft shimmer an octave up on the final note gives it a bit of sparkle.
  playNote(t + seq.length * 0.075, NOTE.E6, 0.5, { type: 'sine', peak: 0.07 });
  playNote(t + seq.length * 0.075 + 0.04, NOTE.G6, 0.55, { type: 'sine', peak: 0.05 });
}

/** Short two-note lift for the modal appearing. */
export function playModalOpen() {
  if (muted || !getCtx()) return;
  const t = ctx.currentTime + 0.01;
  playNote(t, NOTE.G5, 0.18, { type: 'sine', peak: 0.11 });
  playNote(t + 0.07, NOTE.C6, 0.26, { type: 'sine', peak: 0.11 });
}

/** Gentle descending pair for closing. */
export function playModalClose() {
  if (muted || !getCtx()) return;
  const t = ctx.currentTime + 0.01;
  playNote(t, NOTE.A5, 0.14, { type: 'sine', peak: 0.08 });
  playNote(t + 0.06, NOTE.C5, 0.22, { type: 'sine', peak: 0.08 });
}

/** Low blip for clicking a building that is still locked. */
export function playLocked() {
  if (muted || !getCtx()) return;
  const t = ctx.currentTime + 0.01;
  playNote(t, 220, 0.12, { type: 'square', peak: 0.06 });
  playNote(t + 0.09, 174.61, 0.16, { type: 'square', peak: 0.05 });
}
