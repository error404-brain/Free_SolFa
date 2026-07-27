"use client";

import React, { useState } from "react";
import { Music, Music2, Target, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ExerciseCard from "@/components/ExerciseCard";

export default function PracticePage() {
  const { t } = useLanguage();
  const [activeClef, setActiveClef] = useState<string>("all");

  const p = t.practice;

  const filteredExercises = p.exercises.filter((ex) => {
    if (activeClef === "all") return true;
    return ex.clef === activeClef;
  });

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs mb-4">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>{p.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            {p.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {p.subtitle}
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveClef("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
              activeClef === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{p.filterAll}</span>
          </button>
          <button
            onClick={() => setActiveClef("treble")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
              activeClef === "treble"
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>{p.filterTreble}</span>
          </button>
          <button
            onClick={() => setActiveClef("bass")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
              activeClef === "bass"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Music2 className="w-4 h-4" />
            <span>{p.filterBass}</span>
          </button>
        </div>

        {/* EXERCISES GRID LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              questionsCountLabel={p.questionsCount}
              timeMinLabel={p.timeMin}
              startBtnLabel={p.startBtn}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
