"use client";

import React, { useState, useEffect, useCallback } from "react";
import MusicalStaff from "@/components/MusicalStaff";
import { ClefType, Note, NotationMode } from "@/types/music";
import { useLanguage } from "@/contexts/LanguageContext";
import { playNoteSound } from "@/utils/audio";
import {
  CheckCircle2,
  XCircle,
  Music,
  Music2,
  ArrowLeft,
} from "lucide-react";

import {
  TREBLE_PITCHES_BY_LEVEL,
  BASS_PITCHES_BY_LEVEL,
  NATURAL_CHOICES,
  SHARP_CHOICES,
  FLAT_CHOICES,
  NoteChoice,
  DEFAULT_SEQUENCE_COUNT as SEQUENCE_COUNT,
  DifficultyLevel,
} from "@/constants/music";

export interface NoteQuizProps {
  initialClef?: ClefType;
  initialDifficulty?: DifficultyLevel;
  onBack?: () => void;
}

export const NoteQuiz: React.FC<NoteQuizProps> = ({
  initialClef = "treble",
  initialDifficulty = "easy",
  onBack,
}) => {
  const { t, locale } = useLanguage();
  const [clef, setClef] = useState<ClefType>(initialClef);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null,
  );
  const [isCompletedRound, setIsCompletedRound] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [notationMode, setNotationMode] = useState<NotationMode>("letter");
  const [showAccidentals, setShowAccidentals] = useState<boolean>(
    initialDifficulty === "medium" || initialDifficulty === "hard"
  );

  const generateNoteSequence = useCallback(
    (selectedClef: ClefType, selectedDiff: DifficultyLevel): Note[] => {
      const pool =
        selectedClef === "treble"
          ? TREBLE_PITCHES_BY_LEVEL[selectedDiff]
          : BASS_PITCHES_BY_LEVEL[selectedDiff];
      const seq: Note[] = [];
      let lastPitch = "";

      for (let i = 0; i < SEQUENCE_COUNT; i++) {
        let nextPitch = pool[Math.floor(Math.random() * pool.length)];
        while (nextPitch === lastPitch && pool.length > 1) {
          nextPitch = pool[Math.floor(Math.random() * pool.length)];
        }
        lastPitch = nextPitch;
        seq.push({ pitch: nextPitch, status: "default" });
      }

      return seq;
    },
    []
  );

  useEffect(() => {
    setNotes(generateNoteSequence(clef, difficulty));
    setActiveIndex(0);
    setFeedback(null);
    setIsCompletedRound(false);
  }, [clef, difficulty, generateNoteSequence]);

  const handleAnswer = (choiceLetter: string) => {
    if (isAnimating || notes.length === 0) return;

    const targetNote = notes[activeIndex];
    const match = targetNote.pitch.match(/^([A-G])(#|b)?(\d)$/i);
    const targetOctave = match ? match[3] : "4";
    const targetKey = match ? `${match[1].toUpperCase()}${match[2] || ""}` : targetNote.pitch;
    const isRight = choiceLetter === targetKey;

    playNoteSound(`${choiceLetter}${targetOctave}`);
    setIsAnimating(true);

    if (isRight) {
      const updatedNotes = [...notes];
      updatedNotes[activeIndex] = { ...targetNote, status: "correct" };
      setNotes(updatedNotes);
      setFeedback("correct");

      setTimeout(() => {
        setFeedback(null);
        if (activeIndex < SEQUENCE_COUNT - 1) {
          setActiveIndex((prev) => prev + 1);
          setIsAnimating(false);
        } else {
          setIsCompletedRound(true);
          setTimeout(() => {
            setNotes(generateNoteSequence(clef, difficulty));
            setActiveIndex(0);
            setIsCompletedRound(false);
            setIsAnimating(false);
          }, 900);
        }
      }, 400);
    } else {
      const updatedNotes = [...notes];
      updatedNotes[activeIndex] = { ...targetNote, status: "incorrect" };
      setNotes(updatedNotes);
      setFeedback("incorrect");

      setTimeout(() => {
        setFeedback(null);
        setIsAnimating(false);
      }, 900);
    }
  };

  const renderChoiceRow = (choices: NoteChoice[], keyPrefix: string) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2" key={keyPrefix}>
      {choices.map((item) => {
        const solName = locale === "vi" ? item.vi : item.en;
        const mainLabel = notationMode === "letter" ? item.letter : solName;
        const subLabel = notationMode === "letter" ? solName : item.letter;

        return (
          <button
            key={item.letter}
            onClick={() => handleAnswer(item.letter)}
            disabled={isAnimating}
            className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-slate-800 dark:text-slate-100 font-black text-sm shadow-2xs hover:shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex flex-col items-center justify-center gap-0.5 group"
          >
            <span>{mainLabel}</span>
            <span className="text-[10px] font-semibold text-slate-400 group-hover:text-blue-100 dark:group-hover:text-blue-100">
              ({subLabel})
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {onBack && (
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.quiz.backToList}</span>
          </button>
        </div>
      )}

      <div className="relative">
        <MusicalStaff
          clef={clef}
          notes={notes}
          activeIndex={activeIndex}
          notationMode={notationMode}
          showModeToggle={false}
          showLabels={false}
        />

        {isCompletedRound && (
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2 z-30 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1 shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {t.quiz.roundCompletedTitle}
            </span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
              {t.quiz.roundCompletedSubtitle}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t.quiz.selectNotePrompt}
          </h4>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAccidentals(!showAccidentals)}
              className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                showAccidentals
                  ? "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-black shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.quiz.accidentalsToggle}
            </button>

            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold gap-1 transition-colors">
              <button
                onClick={() => setNotationMode("solfege")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  notationMode === "solfege"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-black"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                }`}
              >
                {t.common.modeSolfege}
              </button>
              <button
                onClick={() => setNotationMode("letter")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  notationMode === "letter"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-black"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
                }`}
              >
                {t.common.modeLetter}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {showAccidentals && renderChoiceRow(SHARP_CHOICES, "sharps")}
          {renderChoiceRow(NATURAL_CHOICES, "naturals")}
          {showAccidentals && renderChoiceRow(FLAT_CHOICES, "flats")}
        </div>
      </div>
    </div>
  );
};

export default NoteQuiz;
