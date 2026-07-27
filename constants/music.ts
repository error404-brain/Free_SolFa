import { Note, ClefType } from "@/types/music";

export interface ClefConfig {
  glyph: string; // Unicode glyph trong font SMuFL (Bravura)
  lineIndex: number; // Dòng kẻ đặt tâm khóa (0 = Dòng 1, 1 = Dòng 2, 2 = Dòng 3, 3 = Dòng 4)
  basePitchOffset: number; // Offset số step so với Dòng 1
  yOffset: number; // Tinh chỉnh tọa độ Y cho đẹp mắt
  fontSizeRatio: number; // Tỉ lệ fontSize so với lineSpacing
}

export const CLEF_CONFIGS: Record<ClefType, ClefConfig> = {
  treble: {
    glyph: "\uE050", // Khóa Sol (gClef)
    lineIndex: 1, // Dòng 2 (G4)
    basePitchOffset: 0, // Dòng 1 = E4 (step 0)
    yOffset: 2,
    fontSizeRatio: 4.2,
  },
  bass: {
    glyph: "\uE062", // Khóa Fa (fClef)
    lineIndex: 3, // Dòng 4 (F3)
    basePitchOffset: -12, // Dòng 1 = G2 (step -12 so với E4)
    yOffset: 0,
    fontSizeRatio: 4.2,
  },
  alto: {
    glyph: "\uE05C", // Khóa Đô (cClef)
    lineIndex: 2, // Dòng 3 (C4)
    basePitchOffset: -6, // Dòng 1 = F3 (step -6 so với E4)
    yOffset: 0,
    fontSizeRatio: 4.0,
  },
};

export const NOTE_BASE_STEPS: Record<string, number> = {
  C: -2,
  D: -1,
  E: 0,
  F: 1,
  G: 2,
  A: 3,
  B: 4,
};

export const SOLFEGGIO_NAMES: Record<string, string> = {
  C: "Đồ",
  D: "Rê",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};

export const DEFAULT_STAFF_WIDTH = 800;
export const DEFAULT_STAFF_HEIGHT = 240;
export const DEFAULT_NOTE_SPACING = 55;
export const LINE_SPACING = 16;
export const TOP_MARGIN = 70;
export const START_X = 30;
export const NOTES_START_X = 120;

export const DEFAULT_TREBLE_NOTES: Note[] = [
  { pitch: "C4" },
  { pitch: "D4" },
  { pitch: "E4" },
  { pitch: "F4" },
  { pitch: "G4" },
  { pitch: "A4" },
  { pitch: "B4" },
  { pitch: "C5" },
];

export const DEFAULT_BASS_NOTES: Note[] = [
  { pitch: "C3" },
  { pitch: "D3" },
  { pitch: "E3" },
  { pitch: "F3" },
  { pitch: "G3" },
  { pitch: "A3" },
  { pitch: "B3" },
  { pitch: "C4" },
];
