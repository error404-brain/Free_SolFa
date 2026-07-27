"use client";

import React from "react";
import MusicalStaff from "./MusicalStaff";
import { TrebleClefStaffProps } from "@/types/music";

export type BassClefStaffProps = TrebleClefStaffProps;

export const BassClefStaff: React.FC<BassClefStaffProps> = (props) => {
  return <MusicalStaff clef="bass" {...props} />;
};

export default BassClefStaff;
