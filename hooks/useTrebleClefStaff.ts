import { useMusicalStaff } from "./useMusicalStaff";

export const useTrebleClefStaff = (options: Parameters<typeof useMusicalStaff>[0] = {}) => {
  return useMusicalStaff({ clef: "treble", ...options });
};
