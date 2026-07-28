"use client";

import React, { useState } from "react";
import { Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ExerciseCard from "@/components/ExerciseCard";
import NoteQuiz from "@/components/NoteQuiz";
import { DifficultyLevel } from "@/constants/music";

export default function PracticePage() {
  const { t } = useLanguage();
  const [activeExerciseClef, setActiveExerciseClef] = useState<"treble" | "bass" | null>(null);
  const [activeExerciseDifficulty, setActiveExerciseDifficulty] = useState<DifficultyLevel>("easy");

  const p = t.practice;
  const filteredExercises = p.exercises;

  const handleStartExercise = (exerciseClef: string, exerciseLevel: string) => {
    const clefType = exerciseClef === "bass" ? "bass" : "treble";
    const diff: DifficultyLevel =
      exerciseLevel === "medium"
        ? "medium"
        : exerciseLevel === "hard"
        ? "hard"
        : "easy";
    setActiveExerciseClef(clefType);
    setActiveExerciseDifficulty(diff);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-10">
        {activeExerciseClef ? (
          <NoteQuiz
            initialClef={activeExerciseClef}
            initialDifficulty={activeExerciseDifficulty}
            onBack={() => setActiveExerciseClef(null)}
          />
        ) : (
          <>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs mb-4">
                <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{p.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                {p.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                {p.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  startBtnLabel={p.startBtn}
                  onStart={() => handleStartExercise(exercise.clef, exercise.level)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
