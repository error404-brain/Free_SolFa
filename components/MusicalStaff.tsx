import React, { useRef, useState } from "react";
import { MusicalStaffProps, NotationMode } from "@/types/music";
import { useMusicalStaff } from "@/hooks/useMusicalStaff";
import { getNoteLabel, getLedgerLines } from "@/utils/music";
import { playNoteSound } from "@/utils/audio";
import { useLanguage } from "@/contexts/LanguageContext";

export const MusicalStaff: React.FC<MusicalStaffProps> = ({
  clef = "treble",
  notes,
  width,
  height,
  noteSpacing,
  useOttava = true,
  notationMode: initialNotationMode = "letter",
  showModeToggle = true,
  activeIndex,
  showLabels = true,
}) => {
  const { t } = useLanguage();
  const [notationMode, setNotationMode] = useState<NotationMode>(initialNotationMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const {
    clefConfig,
    clefCenterY,
    lineSpacing,
    topMargin,
    line1Y,
    startX,
    endX,
    totalWidth,
    processedNotes,
    ottavaGroups,
    labelRowY,
    minViewY,
    viewBoxHeight,
  } = useMusicalStaff({
    clef,
    notes,
    width,
    height,
    noteSpacing,
    useOttava,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {showModeToggle && (
        <div className="flex items-center justify-end">
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold gap-1 transition-colors">
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
            <button
              onClick={() => setNotationMode("none")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                notationMode === "none"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              }`}
            >
              {t.common.modeNone}
            </button>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-6 shadow-sm no-scrollbar transition-all hover:shadow-md ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <svg
          width={totalWidth}
          viewBox={`0 ${minViewY} ${totalWidth} ${viewBoxHeight}`}
          className="h-auto overflow-visible"
          style={{ minWidth: `${totalWidth}px` }}
        >
          {[0, 1, 2, 3, 4].map((i) => {
            const y = topMargin + i * lineSpacing;
            return (
              <line
                key={i}
                x1={startX}
                y1={y}
                x2={endX}
                y2={y}
                strokeWidth="1.5"
                className="stroke-slate-700 dark:stroke-slate-400 transition-colors"
              />
            );
          })}

          <line
            x1={startX}
            y1={topMargin}
            x2={startX}
            y2={line1Y}
            strokeWidth="2.5"
            className="stroke-slate-700 dark:stroke-slate-400 transition-colors"
          />
          <line
            x1={endX - 6}
            y1={topMargin}
            x2={endX - 6}
            y2={line1Y}
            strokeWidth="1.5"
            className="stroke-slate-700 dark:stroke-slate-400 transition-colors"
          />
          <line
            x1={endX}
            y1={topMargin}
            x2={endX}
            y2={line1Y}
            strokeWidth="3.5"
            className="stroke-slate-700 dark:stroke-slate-400 transition-colors"
          />

          <g transform={`translate(${startX + 32}, ${clefCenterY + clefConfig.yOffset})`}>
            <text
              x="0"
              y="0"
              fontFamily="Bravura, 'Bravura Text', music, serif"
              fontSize={lineSpacing * clefConfig.fontSizeRatio}
              textAnchor="middle"
              className="fill-slate-900 dark:fill-slate-100 transition-colors"
              style={{ userSelect: "none" }}
            >
              {clefConfig.glyph}
            </text>
          </g>

          {ottavaGroups.map((group, idx) => {
            const groupMaxY = line1Y - group.maxDrawStep * (lineSpacing / 2);
            const ottavaY = groupMaxY - 26;
            return (
              <g key={idx}>
                <text
                  x={group.startX - 12}
                  y={ottavaY + 4}
                  fontSize="13"
                  fontStyle="italic"
                  fontWeight="bold"
                  className="fill-blue-600 dark:fill-blue-400"
                >
                  {group.type}
                </text>
                <line
                  x1={group.startX + 16}
                  y1={ottavaY}
                  x2={group.endX + 16}
                  y2={ottavaY}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="stroke-blue-600 dark:stroke-blue-400"
                />
                <line
                  x1={group.endX + 16}
                  y1={ottavaY}
                  x2={group.endX + 16}
                  y2={ottavaY + 10}
                  strokeWidth="1.5"
                  className="stroke-blue-600 dark:stroke-blue-400"
                />
              </g>
            );
          })}

          {processedNotes.map((item, index) => {
            const { note, drawStep, noteX, noteY } = item;
            const stemUp = drawStep < 4;
            const displayLabel = note.label ?? getNoteLabel(note.pitch, notationMode, t.notes);
            const ledgerLines = getLedgerLines(drawStep);

            const isCorrect = note.status === "correct";
            const isIncorrect = note.status === "incorrect";
            const isActive = activeIndex !== undefined && index === activeIndex;

            const fillClass = isCorrect
              ? "fill-emerald-500 dark:fill-emerald-400"
              : isIncorrect
              ? "fill-red-500 dark:fill-red-400"
              : isActive
              ? "fill-blue-600 dark:fill-blue-400"
              : "fill-slate-900 dark:fill-slate-100";

            const strokeClass = isCorrect
              ? "stroke-emerald-500 dark:stroke-emerald-400"
              : isIncorrect
              ? "stroke-red-500 dark:stroke-red-400"
              : isActive
              ? "stroke-blue-600 dark:stroke-blue-400"
              : "stroke-slate-900 dark:stroke-slate-100";

            const textClass = isCorrect
              ? "fill-emerald-600 dark:fill-emerald-400 font-black text-sm"
              : isIncorrect
              ? "fill-red-600 dark:fill-red-400 font-black text-sm"
              : isActive
              ? "fill-blue-600 dark:fill-blue-400 font-black text-sm"
              : "fill-slate-700 dark:fill-slate-300 font-bold";

            return (
              <g
                key={index}
                transform={`translate(${noteX}, ${noteY})`}
                onClick={() => playNoteSound(note.pitch)}
                className="cursor-pointer group/note"
              >
                {isActive && (
                  <g transform="translate(0, -22)">
                    <polygon
                      points="0,0 -5,-7 5,-7"
                      className="fill-blue-600 dark:fill-blue-400 animate-bounce"
                    />
                    <circle
                      cx="0"
                      cy="22"
                      r="16"
                      fill="none"
                      strokeWidth="2.5"
                      className="stroke-blue-500 dark:stroke-blue-400 opacity-80"
                      strokeDasharray="4 2"
                    />
                  </g>
                )}

                {ledgerLines.map((lStep) => {
                  const lineRelY = (drawStep - lStep) * (lineSpacing / 2);
                  return (
                    <line
                      key={lStep}
                      x1={-15}
                      y1={lineRelY}
                      x2={15}
                      y2={lineRelY}
                      strokeWidth="1.5"
                      className={`${strokeClass} transition-colors`}
                    />
                  );
                })}

                {item.accidental && (
                  <text
                    x="-18"
                    y="0"
                    fontFamily="Bravura, 'Bravura Text', music, serif"
                    fontSize={lineSpacing * 2.2}
                    textAnchor="middle"
                    className={`${fillClass} transition-colors`}
                    style={{ userSelect: "none" }}
                  >
                    {item.accidental === "#" ? "\uE262" : "\uE260"}
                  </text>
                )}

                <ellipse
                  cx="0"
                  cy="0"
                  rx="10"
                  ry="7.3"
                  transform="rotate(-20)"
                  className={`${fillClass} transition-colors`}
                />

                <line
                  x1={stemUp ? 9 : -9}
                  y1={0}
                  x2={stemUp ? 9 : -9}
                  y2={stemUp ? -35 : 35}
                  strokeWidth="2"
                  className={`${strokeClass} transition-colors`}
                />

                {showLabels && notationMode !== "none" && (
                  <text
                    x="0"
                    y={labelRowY - noteY}
                    textAnchor="middle"
                    fontSize="13"
                    className={`${textClass} transition-colors`}
                  >
                    {displayLabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default MusicalStaff;
