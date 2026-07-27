"use client";

import React from "react";
import { Music, Music2, HelpCircle, Clock, ArrowRight } from "lucide-react";

export interface Exercise {
  id: string;
  title: string;
  desc: string;
  clef: string;
  level: string;
  questions: number;
  time: string;
}

export interface ExerciseCardProps {
  exercise: Exercise;
  questionsCountLabel: string;
  timeMinLabel: string;
  startBtnLabel: string;
  onStart?: (id: string) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  questionsCountLabel,
  timeMinLabel,
  startBtnLabel,
  onStart,
}) => {
  const getClefBadgeColor = (clef: string) => {
    if (clef === "treble") {
      return "bg-blue-50 text-blue-700 border-blue-200/80";
    }
    return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
  };

  const renderClefIcon = (clef: string) => {
    if (clef === "treble") {
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Music className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <Music2 className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group">
      <div>
        {/* Card Top Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {renderClefIcon(exercise.clef)}
          <span
            className={`px-3 py-1 text-[11px] font-bold rounded-full border ${getClefBadgeColor(
              exercise.clef,
            )}`}
          >
            {exercise.level}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {exercise.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {exercise.desc}
        </p>
      </div>
      {/* Card Footer & Meta */}
      <div>
        <button
          onClick={() => onStart?.(exercise.id)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{startBtnLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
