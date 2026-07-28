"use client";

import React from "react";
import MusicalStaff from "@/components/MusicalStaff";
import HeroBanner from "@/components/HeroBanner";
import AdBanner from "@/components/AdBanner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pb-20">
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <AdBanner label="QC Banner Ngang" />
      </div>

      <section id="interactive-staff" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex flex-col gap-12">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
              {t.common.trebleClefTitle}
            </h2>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              C4 - C8 • {t.common.trebleRangeLabel}
            </span>
          </div>
          <MusicalStaff
            clef="treble"
            notes={[
              { pitch: "C4" },
              { pitch: "D4" },
              { pitch: "E4" },
              { pitch: "F4" },
              { pitch: "G4" },
              { pitch: "A4" },
              { pitch: "B4" },
              { pitch: "C5" },
              { pitch: "D5" },
              { pitch: "E5" },
              { pitch: "F5" },
              { pitch: "G5" },
              { pitch: "A5" },
              { pitch: "B5" },
              { pitch: "C6" },
              { pitch: "D6" },
              { pitch: "E6" },
              { pitch: "F6" },
              { pitch: "G6" },
              { pitch: "A6" },
              { pitch: "B6" },
              { pitch: "C7" },
              { pitch: "D7" },
              { pitch: "E7" },
              { pitch: "F7" },
              { pitch: "G7" },
              { pitch: "A7" },
              { pitch: "B7" },
              { pitch: "C8" },
            ]}
          />
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
              {t.common.bassClefTitle}
            </h2>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              C2 - C4 • {t.common.bassRangeLabel}
            </span>
          </div>
          <MusicalStaff
            clef="bass"
            notes={[
              { pitch: "C2" },
              { pitch: "D2" },
              { pitch: "E2" },
              { pitch: "F2" },
              { pitch: "G2" },
              { pitch: "A2" },
              { pitch: "B2" },
              { pitch: "C3" },
              { pitch: "D3" },
              { pitch: "E3" },
              { pitch: "F3" },
              { pitch: "G3" },
              { pitch: "A3" },
              { pitch: "B3" },
              { pitch: "C4" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
