export type ClefType = "treble" | "bass" | "alto";
export type NotationMode = "solfege" | "letter";

export interface Note {
  pitch: string; // e.g. 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', ..., 'C8'
  label?: string; // Tên nốt hiển thị (Đồ, Rê, Mi...)
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
}

export type TrebleClefStaffProps = Omit<MusicalStaffProps, "clef">;
