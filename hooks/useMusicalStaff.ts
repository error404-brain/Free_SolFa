import { useMemo } from "react";
import { Note, ProcessedNote, OttavaGroup, ClefType } from "@/types/music";
import {
  DEFAULT_TREBLE_NOTES,
  DEFAULT_BASS_NOTES,
  DEFAULT_STAFF_WIDTH,
  DEFAULT_STAFF_HEIGHT,
  DEFAULT_NOTE_SPACING,
  LINE_SPACING,
  TOP_MARGIN,
  START_X,
  NOTES_START_X,
  CLEF_CONFIGS,
} from "@/constants/music";
import { getPitchStep, getPitchAccidental } from "@/utils/music";

interface UseMusicalStaffOptions {
  clef?: ClefType;
  notes?: Note[];
  width?: number;
  height?: number;
  noteSpacing?: number;
  useOttava?: boolean;
}

export const useMusicalStaff = ({
  clef = "treble",
  notes,
  width = DEFAULT_STAFF_WIDTH,
  height = DEFAULT_STAFF_HEIGHT,
  noteSpacing = DEFAULT_NOTE_SPACING,
  useOttava = true,
}: UseMusicalStaffOptions) => {
  const actualNotes = notes ?? (clef === "bass" ? DEFAULT_BASS_NOTES : DEFAULT_TREBLE_NOTES);
  const clefConfig = CLEF_CONFIGS[clef] ?? CLEF_CONFIGS.treble;

  return useMemo(() => {
    const line1Y = TOP_MARGIN + 4 * LINE_SPACING;
    const clefCenterY = TOP_MARGIN + (4 - clefConfig.lineIndex) * LINE_SPACING;

    const totalWidth = Math.max(
      width,
      NOTES_START_X + actualNotes.length * noteSpacing + 60
    );
    const endX = totalWidth - START_X;

    const processedNotes: ProcessedNote[] = actualNotes.map((note, index) => {
      const origStep = getPitchStep(note.pitch, clef);
      const accidental = getPitchAccidental(note.pitch);
      let drawStep = origStep;
      let ottava: "8va" | "15ma" | null = null;

      if (useOttava) {
        if (origStep >= 23) {
          drawStep = origStep - 14;
          ottava = "15ma";
        } else if (origStep >= 12) {
          drawStep = origStep - 7;
          ottava = "8va";
        }
      }

      const noteX = NOTES_START_X + index * noteSpacing;
      const noteY = line1Y - drawStep * (LINE_SPACING / 2);
      return {
        note,
        drawStep,
        ottava,
        noteX,
        noteY,
        accidental,
      };
    });

    const ottavaGroups: OttavaGroup[] = [];
    let currentGroup: OttavaGroup | null = null;

    processedNotes.forEach((item) => {
      if (item.ottava) {
        if (currentGroup && currentGroup.type === item.ottava) {
          currentGroup.endX = item.noteX;
          currentGroup.maxDrawStep = Math.max(
            currentGroup.maxDrawStep,
            item.drawStep
          );
        } else {
          if (currentGroup) ottavaGroups.push(currentGroup);
          currentGroup = {
            type: item.ottava,
            startX: item.noteX,
            endX: item.noteX,
            maxDrawStep: item.drawStep,
          };
        }
      } else {
        if (currentGroup) {
          ottavaGroups.push(currentGroup);
          currentGroup = null;
        }
      }
    });
    if (currentGroup) ottavaGroups.push(currentGroup);

    const maxNoteY =
      processedNotes.length > 0
        ? Math.max(...processedNotes.map((n) => n.noteY))
        : line1Y;
    const labelRowY = Math.max(line1Y + 30, maxNoteY + 30);

    const drawSteps = processedNotes.map((n) => n.drawStep);
    const maxStep = drawSteps.length > 0 ? Math.max(...drawSteps) : 8;

    const maxOttavaHeightStep = ottavaGroups.reduce(
      (max, g) => Math.max(max, g.maxDrawStep + 4),
      maxStep
    );

    const minViewY = Math.min(
      0,
      line1Y - maxOttavaHeightStep * (LINE_SPACING / 2) - 40
    );
    const maxViewY = Math.max(height, labelRowY + 40);
    const viewBoxHeight = maxViewY - minViewY;

    return {
      clefConfig,
      clefCenterY,
      lineSpacing: LINE_SPACING,
      topMargin: TOP_MARGIN,
      line1Y,
      startX: START_X,
      endX,
      totalWidth,
      processedNotes,
      ottavaGroups,
      labelRowY,
      minViewY,
      viewBoxHeight,
    };
  }, [clef, actualNotes, width, height, noteSpacing, useOttava, clefConfig]);
};
