let audioCtx: AudioContext | null = null;
let soundMutedState = false;

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("freesolfa_sound_muted");
  if (saved !== null) {
    soundMutedState = saved === "true";
  }
}

export const isSoundMuted = (): boolean => soundMutedState;

export const setSoundMuted = (muted: boolean): void => {
  soundMutedState = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("freesolfa_sound_muted", String(muted));
  }
};

export const toggleSoundMute = (): boolean => {
  setSoundMuted(!soundMutedState);
  return soundMutedState;
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const pitchToFrequency = (pitch: string): number => {
  const match = pitch.match(/^([A-G])(#|b)?(\d)?$/i);
  if (!match) return 440;
  const note = match[1].toUpperCase();
  const acc = match[2] || "";
  const octave = match[3] ? parseInt(match[3], 10) : 4;

  const baseOffsets: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };
  let semitone = baseOffsets[note] ?? 0;
  if (acc === "#") semitone += 1;
  if (acc === "b") semitone -= 1;

  const midi = (octave + 1) * 12 + semitone;
  return 440 * Math.pow(2, (midi - 69) / 12);
};

export const playNoteSound = (pitch: string, duration = 1.2): void => {
  if (soundMutedState) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = pitchToFrequency(pitch);
    const now = ctx.currentTime;

    // Primary oscillator (sine wave for fundamental pitch)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone (triangle wave for piano warmth)
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Envelope gain nodes for authentic piano decay
    const gainNode1 = ctx.createGain();
    const gainNode2 = ctx.createGain();

    gainNode1.gain.setValueAtTime(0.35, now);
    gainNode1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gainNode2.gain.setValueAtTime(0.08, now);
    gainNode2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

    osc1.connect(gainNode1);
    osc2.connect(gainNode2);
    gainNode1.connect(ctx.destination);
    gainNode2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.error("Audio playback error:", e);
  }
};
