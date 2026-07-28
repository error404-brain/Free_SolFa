"use client";

import React from "react";
import { Music, Music2, HelpCircle, Clock, ArrowRight } from "lucide-react";

export interface Exercise {
  id: string;
  title: string;
  desc: string;
  clef: string;
  level: string;
  levelLabel?: string;
}

export interface ExerciseCardProps {
  exercise: Exercise;
  startBtnLabel: string;
  onStart?: (id: string) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  startBtnLabel,
  onStart,
}) => {
  const getLevelBadgeColor = (level: string) => {
    if (level === "easy") {
      return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80";
    }
    if (level === "medium") {
      return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80";
    }
    return "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/80";
  };

  const renderClefIcon = (clef: string) => {
    if (clef === "treble") {
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Music className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
        <Music2 className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          {renderClefIcon(exercise.clef)}
          <span
            className={`px-3 py-1 text-[11px] font-bold rounded-full border ${getLevelBadgeColor(
              exercise.level
            )}`}
          >
            {exercise.levelLabel || exercise.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {exercise.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {exercise.desc}
        </p>
      </div>
      <div>
        <button
          onClick={() => onStart?.(exercise.id)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{startBtnLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
