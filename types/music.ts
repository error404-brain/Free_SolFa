export type ClefType = "treble" | "bass" | "alto";
export type NotationMode = "solfege" | "letter";

export interface Note {
  pitch: string;
  label?: string;
  status?: "default" | "correct" | "incorrect";
}

export type OttavaType = "8va" | "15ma";

export interface ProcessedNote {
  note: Note;
  drawStep: number;
  ottava: OttavaType | null;
  noteX: number;
  noteY: number;
}

export interface OttavaGroup {
  type: OttavaType;
  startX: number;
  endX: number;
  maxDrawStep: number;
}

export interface MusicalStaffProps {
  clef?: ClefType;
  notes?: Note[];
  width?: number;
  height?: number;
  noteSpacing?: number;
  useOttava?: boolean;
  notationMode?: NotationMode;
  showModeToggle?: boolean;
  activeIndex?: number;
  showLabels?: boolean;
}

export type TrebleClefStaffProps = Omit<MusicalStaffProps, "clef">;
