import { Note, ClefType } from "@/types/music";

export interface ClefConfig {
  glyph: string;
  lineIndex: number;
  basePitchOffset: number;
  yOffset: number;
  fontSizeRatio: number;
}

export const CLEF_CONFIGS: Record<ClefType, ClefConfig> = {
  treble: {
    glyph: "\uE050",
    lineIndex: 1,
    basePitchOffset: 0,
    yOffset: 0,
    fontSizeRatio: 4.0,
  },
  bass: {
    glyph: "\uE062",
    lineIndex: 3,
    basePitchOffset: -12,
    yOffset: 0,
    fontSizeRatio: 4.0,
  },
  alto: {
    glyph: "\uE05C",
    lineIndex: 2,
    basePitchOffset: -6,
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

export type DifficultyLevel = "easy" | "medium" | "hard";

export const TREBLE_PITCHES_BY_LEVEL: Record<DifficultyLevel, string[]> = {
  easy: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  medium: ["C4", "C#4", "Db4", "D4", "D#4", "Eb4", "E4", "F4", "F#4", "Gb4", "G4", "G#4", "Ab4", "A4", "A#4", "Bb4", "B4", "C5"],
  hard: [
    "C4", "C#4", "Db4", "D4", "D#4", "Eb4", "E4", "F4", "F#4", "Gb4", "G4", "G#4", "Ab4", "A4", "A#4", "Bb4", "B4",
    "C5", "C#5", "Db5", "D5", "D#5", "Eb5", "E5", "F5", "F#5", "Gb5", "G5", "G#5", "Ab5", "A5", "A#5", "Bb5", "B5", "C6"
  ],
};

export const BASS_PITCHES_BY_LEVEL: Record<DifficultyLevel, string[]> = {
  easy: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  medium: ["C3", "C#3", "Db3", "D3", "D#3", "Eb3", "E3", "F3", "F#3", "Gb3", "G3", "G#3", "Ab3", "A3", "A#3", "Bb3", "B3", "C4"],
  hard: [
    "C2", "D2", "E2", "F2", "G2", "A2", "B2",
    "C3", "C#3", "Db3", "D3", "D#3", "Eb3", "E3", "F3", "F#3", "Gb3", "G3", "G#3", "Ab3", "A3", "A#3", "Bb3", "B3", "C4"
  ],
};

export const TREBLE_PITCHES = TREBLE_PITCHES_BY_LEVEL.hard;
export const BASS_PITCHES = BASS_PITCHES_BY_LEVEL.hard;

export interface NoteChoice {
  letter: string;
  vi: string;
  en: string;
  accidental?: "#" | "b";
}

export const NATURAL_CHOICES: NoteChoice[] = [
  { letter: "C", vi: "Đồ", en: "Do" },
  { letter: "D", vi: "Rê", en: "Re" },
  { letter: "E", vi: "Mi", en: "Mi" },
  { letter: "F", vi: "Fa", en: "Fa" },
  { letter: "G", vi: "Sol", en: "Sol" },
  { letter: "A", vi: "La", en: "La" },
  { letter: "B", vi: "Si", en: "Si" },
];

export const SHARP_CHOICES: NoteChoice[] = [
  { letter: "C#", vi: "Đồ♯", en: "Do♯", accidental: "#" },
  { letter: "D#", vi: "Rê♯", en: "Re♯", accidental: "#" },
  { letter: "E#", vi: "Mi♯", en: "Mi♯", accidental: "#" },
  { letter: "F#", vi: "Fa♯", en: "Fa♯", accidental: "#" },
  { letter: "G#", vi: "Sol♯", en: "Sol♯", accidental: "#" },
  { letter: "A#", vi: "La♯", en: "La♯", accidental: "#" },
  { letter: "B#", vi: "Si♯", en: "Ti♯", accidental: "#" },
];

export const FLAT_CHOICES: NoteChoice[] = [
  { letter: "Cb", vi: "Đồ♭", en: "Do♭", accidental: "b" },
  { letter: "Db", vi: "Rê♭", en: "Re♭", accidental: "b" },
  { letter: "Eb", vi: "Mi♭", en: "Mi♭", accidental: "b" },
  { letter: "Fb", vi: "Fa♭", en: "Fa♭", accidental: "b" },
  { letter: "Gb", vi: "Sol♭", en: "Sol♭", accidental: "b" },
  { letter: "Ab", vi: "La♭", en: "La♭", accidental: "b" },
  { letter: "Bb", vi: "Si♭", en: "Ti♭", accidental: "b" },
];

export const NOTE_CHOICES = NATURAL_CHOICES;

export const DEFAULT_SEQUENCE_COUNT = 10;
