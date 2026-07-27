"use client";

import React from "react";
import MusicalStaff from "./MusicalStaff";
import { TrebleClefStaffProps } from "@/types/music";

export type { Note, TrebleClefStaffProps } from "@/types/music";
export { getPitchStep, getNoteLabel } from "@/utils/music";

export const TrebleClefStaff: React.FC<TrebleClefStaffProps> = (props) => {
  return <MusicalStaff clef="treble" {...props} />;
};

export default TrebleClefStaff;
