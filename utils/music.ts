import { ClefType, NotationMode } from "@/types/music";
import { NOTE_BASE_STEPS, SOLFEGGIO_NAMES, CLEF_CONFIGS } from "@/constants/music";

export const getPitchStep = (pitch: string, clef: ClefType = "treble"): number => {
  const match = pitch.match(/^([A-G])(#|b)?(\d)$/i);
  if (!match) return 0;
  const noteLetter = match[1].toUpperCase();
  const octave = parseInt(match[3], 10);
  const absoluteStep = (NOTE_BASE_STEPS[noteLetter] ?? 0) + (octave - 4) * 7;

  const clefOffset = CLEF_CONFIGS[clef]?.basePitchOffset ?? 0;
  return absoluteStep - clefOffset;
};

export const getNoteLabel = (
  pitch: string,
  mode: NotationMode = "solfege",
  customNames?: Record<string, string>
): string => {
  const match = pitch.match(/^([A-G])(#|b)?(\d)?$/i);
  if (!match) return pitch;
  const letter = match[1].toUpperCase();
  const acc = match[2] || "";
  const accSymbol = acc === "#" ? "♯" : acc === "b" ? "♭" : "";

  if (mode === "letter") {
    return `${letter}${accSymbol}`;
  }

  const nameMap = customNames || SOLFEGGIO_NAMES;
  const baseName = nameMap[letter] || letter;
  return `${baseName}${accSymbol}`;
};

export const getLedgerLines = (drawStep: number): number[] => {
  const ledgerLines: number[] = [];
  if (drawStep <= -2) {
    const minLedger = drawStep % 2 === 0 ? drawStep : drawStep + 1;
    for (let s = -2; s >= minLedger; s -= 2) {
      ledgerLines.push(s);
    }
  } else if (drawStep >= 10) {
    const maxLedger = drawStep % 2 === 0 ? drawStep : drawStep - 1;
    for (let s = 10; s <= maxLedger; s += 2) {
      ledgerLines.push(s);
    }
  }
  return ledgerLines;
};
