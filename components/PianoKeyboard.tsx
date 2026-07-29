"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PIANO_88_KEYS, PianoKeyData } from "@/constants/music";
import { playNoteSound } from "@/utils/audio";
import { useLanguage } from "@/contexts/LanguageContext";
import { pitchToMidi } from "@/utils/music";

type DragMode = "scroll" | "glissando";

const MIN_OCTAVE = 1;
const MAX_OCTAVE = 7;
const DRAG_THRESHOLD = 4; // px of travel before a press counts as a drag

const clampOctave = (octave: number) =>
  Math.min(MAX_OCTAVE, Math.max(MIN_OCTAVE, octave));

export interface PianoKeyboardProps {
  onKeyPress?: (pitch: string) => void;
  activePitch?: string;
  /**
   * Where to centre the keyboard on mount. Fixed for the whole round — never
   * derive it from the current answer, or the correct key lands dead-centre
   * every question and gives the answer away.
   */
  initialCenterPitch?: string;
  disabled?: boolean;
  activeStatus?: "correct" | "incorrect" | null;
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  onKeyPress,
  activePitch,
  initialCenterPitch = "C4",
  disabled = false,
  activeStatus,
}) => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [pressedKeyPitch, setPressedKeyPitch] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState<DragMode>("scroll");
  const [currentOctave, setCurrentOctave] = useState<number>(() =>
    clampOctave(parseInt(initialCenterPitch.match(/\d/)?.[0] ?? "4", 10)),
  );

  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    lastPitch: string | null;
    panning: boolean;
  } | null>(null);

  const whiteKeyWidth = 40; // width of white keys in px
  const blackKeyWidth = 24; // width of black keys in px
  const whiteKeyHeight = 160; // height of white keys in px
  const blackKeyHeight = 100; // height of black keys in px

  // Calculate position for black keys based on preceding white key index
  const getBlackKeyLeft = (key: PianoKeyData): number => {
    // Find preceding white key index
    let prevWhiteIndex = 0;
    for (let i = 0; i < PIANO_88_KEYS.length; i++) {
      if (PIANO_88_KEYS[i].pitch === key.pitch) break;
      if (
        !PIANO_88_KEYS[i].isBlack &&
        PIANO_88_KEYS[i].whiteKeyIndex !== undefined
      ) {
        prevWhiteIndex = PIANO_88_KEYS[i].whiteKeyIndex!;
      }
    }
    return (prevWhiteIndex + 1) * whiteKeyWidth - blackKeyWidth / 2;
  };

  const scrollToPitch = (pitch: string) => {
    if (!scrollContainerRef.current) return;
    // Match by pitch so flat spellings (Db4) resolve to their sharp-named key.
    const midi = pitchToMidi(pitch);
    const targetKey = PIANO_88_KEYS.find((k) => pitchToMidi(k.pitch) === midi);
    if (midi === null || !targetKey) return;

    let targetX = 0;
    if (!targetKey.isBlack && targetKey.whiteKeyIndex !== undefined) {
      targetX = targetKey.whiteKeyIndex * whiteKeyWidth;
    } else {
      targetX = getBlackKeyLeft(targetKey);
    }

    const containerWidth = scrollContainerRef.current.clientWidth;
    const scrollPos = Math.max(
      0,
      targetX - containerWidth / 2 + whiteKeyWidth / 2,
    );
    scrollContainerRef.current.scrollTo({
      left: scrollPos,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Centre the starting octave once on mount, after layout has settled.
    const timer = setTimeout(() => {
      scrollToPitch(initialCenterPitch);
    }, 100);
    return () => clearTimeout(timer);
    // Mount-only on purpose: re-centring later would fight the user's scrolling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    },
    [],
  );

  const flashKey = (pitch: string) => {
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setPressedKeyPitch(pitch);
    flashTimerRef.current = setTimeout(() => setPressedKeyPitch(null), 300);
  };

  const keyAtPoint = (x: number, y: number): PianoKeyData | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const pitch = el?.closest<HTMLElement>("[data-pitch]")?.dataset.pitch;
    return pitch ? (PIANO_88_KEYS.find((k) => k.pitch === pitch) ?? null) : null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    // On touch in scroll mode, let the browser pan natively.
    const panning = dragMode === "scroll" && e.pointerType === "mouse";
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: container.scrollLeft,
      moved: false,
      lastPitch: null,
      panning,
    };

    if (dragMode === "glissando") {
      container.setPointerCapture(e.pointerId);
      const key = keyAtPoint(e.clientX, e.clientY);
      if (key) {
        dragRef.current.lastPitch = key.pitch;
        playNoteSound(key.pitch);
        flashKey(key.pitch);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    if (!drag.moved && Math.abs(dx) > DRAG_THRESHOLD) drag.moved = true;

    if (dragMode === "scroll") {
      if (drag.panning && drag.moved && scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = drag.startScrollLeft - dx;
      }
      return;
    }

    // Glissando: sound every new key the pointer sweeps over, no answering.
    const key = keyAtPoint(e.clientX, e.clientY);
    if (key && key.pitch !== drag.lastPitch) {
      drag.lastPitch = key.pitch;
      playNoteSound(key.pitch);
      flashKey(key.pitch);
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;

    if (scrollContainerRef.current?.hasPointerCapture(e.pointerId)) {
      scrollContainerRef.current.releasePointerCapture(e.pointerId);
    }

    // Only a tap answers — a sweep is preview-only.
    if (drag.moved || disabled) return;
    const key = keyAtPoint(e.clientX, e.clientY);
    if (!key) return;

    if (dragMode === "scroll") {
      playNoteSound(key.pitch);
      flashKey(key.pitch);
    }
    onKeyPress?.(key.pitch);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === e.pointerId) dragRef.current = null;
  };

  const goToOctave = (octave: number) => {
    const next = clampOctave(octave);
    setCurrentOctave(next);
    scrollToPitch(`C${next}`);
  };

  const whiteKeys = PIANO_88_KEYS.filter((k) => !k.isBlack);
  const blackKeys = PIANO_88_KEYS.filter((k) => k.isBlack);
  const totalWidth = whiteKeys.length * whiteKeyWidth;

  // Keep the octave readout honest across arrows, dragging and auto-scroll.
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const centerIndex = Math.floor(
      (container.scrollLeft + container.clientWidth / 2) / whiteKeyWidth,
    );
    const centerKey =
      whiteKeys[Math.min(whiteKeys.length - 1, Math.max(0, centerIndex))];
    if (!centerKey) return;
    const octave = clampOctave(centerKey.octave);
    setCurrentOctave((prev) => (prev === octave ? prev : octave));
  };

  const modeButtonClass = (mode: DragMode) =>
    `px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
      dragMode === mode
        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-black"
        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
    }`;

  const arrowClass =
    "p-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Drag-mode toggle + octave stepper */}
      <div className="flex items-center justify-between gap-3 flex-wrap px-1">
        <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold gap-1 transition-colors">
          <button
            onClick={() => setDragMode("scroll")}
            className={modeButtonClass("scroll")}
          >
            {t.quiz.pianoModeScroll}
          </button>
          <button
            onClick={() => setDragMode("glissando")}
            className={modeButtonClass("glissando")}
          >
            {t.quiz.pianoModeGlissando}
          </button>
        </div>

        <div className="inline-flex items-center gap-1.5">
          <button
            onClick={() => goToOctave(currentOctave - 1)}
            disabled={currentOctave <= MIN_OCTAVE}
            aria-label={t.quiz.pianoOctavePrev}
            title={t.quiz.pianoOctavePrev}
            className={arrowClass}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-10 text-center text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums">
            C{currentOctave}
          </span>
          <button
            onClick={() => goToOctave(currentOctave + 1)}
            disabled={currentOctave >= MAX_OCTAVE}
            aria-label={t.quiz.pianoOctaveNext}
            title={t.quiz.pianoOctaveNext}
            className={arrowClass}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 88-Key Scrollable Piano Keyboard */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={handlePointerCancel}
        style={{
          touchAction: dragMode === "glissando" ? "none" : "pan-x",
          cursor: dragMode === "scroll" ? "grab" : "pointer",
        }}
        className="w-full overflow-x-auto select-none rounded-2xl bg-slate-950 p-4 border border-slate-800 shadow-md custom-scrollbar relative"
      >
        <div
          className="relative"
          style={{
            width: `${totalWidth}px`,
            height: `${whiteKeyHeight + 20}px`,
          }}
        >
          {/* White Keys */}
          {whiteKeys.map((key) => {
            const isCKey = key.noteLetter === "C";
            const isMiddleC = key.pitch === "C4";
            const isActive = activePitch === key.pitch;
            const isPressed = pressedKeyPitch === key.pitch;

            let keyStyleClass =
              "bg-white text-slate-800 hover:bg-slate-100 border-slate-300";
            if (isActive && activeStatus === "correct") {
              keyStyleClass = "bg-emerald-500 text-white shadow-lg";
            } else if (isActive && activeStatus === "incorrect") {
              keyStyleClass = "bg-red-500 text-white shadow-lg";
            } else if (isPressed) {
              keyStyleClass = "bg-blue-500 text-white shadow-lg scale-[0.99]";
            }

            return (
              <div
                key={key.pitch}
                data-pitch={key.pitch}
                style={{
                  left: `${(key.whiteKeyIndex || 0) * whiteKeyWidth}px`,
                  width: `${whiteKeyWidth - 1}px`,
                  height: `${whiteKeyHeight}px`,
                }}
                className={`absolute top-0 rounded-b-lg border-x border-b shadow-sm transition-all flex flex-col justify-end items-center pb-2 select-none group ${keyStyleClass}`}
              >
                {isMiddleC && (
                  <span
                    className="w-2 h-2 rounded-full bg-red-500 mb-1.5 animate-pulse"
                    title="Middle C (C4)"
                  />
                )}
                {isCKey && (
                  <span className="text-[11px] font-black tracking-tight leading-none text-slate-600 dark:text-slate-400 group-hover:text-slate-900">
                    C{key.octave}
                  </span>
                )}
              </div>
            );
          })}

          {/* Black Keys */}
          {blackKeys.map((key) => {
            const leftPos = getBlackKeyLeft(key);
            const isActive = activePitch === key.pitch;
            const isPressed = pressedKeyPitch === key.pitch;

            let keyStyleClass =
              "bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-700";
            if (isActive && activeStatus === "correct") {
              keyStyleClass = "bg-emerald-600 text-white shadow-lg";
            } else if (isActive && activeStatus === "incorrect") {
              keyStyleClass = "bg-red-600 text-white shadow-lg";
            } else if (isPressed) {
              keyStyleClass = "bg-blue-600 text-white shadow-lg scale-[0.98]";
            }

            return (
              <div
                key={key.pitch}
                data-pitch={key.pitch}
                style={{
                  left: `${leftPos}px`,
                  width: `${blackKeyWidth}px`,
                  height: `${blackKeyHeight}px`,
                  zIndex: 20,
                }}
                className={`absolute top-0 rounded-b-md border shadow-md transition-all select-none ${keyStyleClass}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard;
