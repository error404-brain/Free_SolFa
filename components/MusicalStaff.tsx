import React, { useRef, useState } from "react";
import { MusicalStaffProps, NotationMode } from "@/types/music";
import { useMusicalStaff } from "@/hooks/useMusicalStaff";
import { getNoteLabel, getLedgerLines } from "@/utils/music";
import { useLanguage } from "@/contexts/LanguageContext";

export const MusicalStaff: React.FC<MusicalStaffProps> = ({
  clef = "treble",
  notes,
  width,
  height,
  noteSpacing,
  useOttava = true,
  notationMode: initialNotationMode = "solfege",
  showModeToggle = true,
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
      {/* Notation Mode Toggle (Đồ Rê Mi vs A B C) */}
      {showModeToggle && (
        <div className="flex items-center justify-end">
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs font-bold gap-1">
            <button
              onClick={() => setNotationMode("solfege")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                notationMode === "solfege"
                  ? "bg-white text-blue-600 shadow-xs font-black"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              Đồ Rê Mi
            </button>
            <button
              onClick={() => setNotationMode("letter")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                notationMode === "letter"
                  ? "bg-white text-blue-600 shadow-xs font-black"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              A B C
            </button>
          </div>
        </div>
      )}

      {/* Staff Canvas Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto select-none rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-6 shadow-sm no-scrollbar transition-shadow hover:shadow-md ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <svg
          width={totalWidth}
          viewBox={`0 ${minViewY} ${totalWidth} ${viewBoxHeight}`}
          className="h-auto overflow-visible"
          style={{ minWidth: `${totalWidth}px` }}
        >
          {/* 1. KHUNG 5 DÒNG KẺ (NGŨ TUYẾN) */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = topMargin + i * lineSpacing;
            return (
              <line
                key={i}
                x1={startX}
                y1={y}
                x2={endX}
                y2={y}
                stroke="#334155"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Vạch mở đầu và vạch kép kết thúc */}
          <line
            x1={startX}
            y1={topMargin}
            x2={startX}
            y2={line1Y}
            stroke="#334155"
            strokeWidth="2.5"
          />
          <line
            x1={endX - 6}
            y1={topMargin}
            x2={endX - 6}
            y2={line1Y}
            stroke="#334155"
            strokeWidth="1.5"
          />
          <line
            x1={endX}
            y1={topMargin}
            x2={endX}
            y2={line1Y}
            stroke="#334155"
            strokeWidth="3.5"
          />

          {/* 2. KHÓA NHẠC VẼ THEO CLEF (TREBLE, BASS, ALTO CHUẨN SMUFL / BRAVURA FONT) */}
          <g transform={`translate(${startX + 32}, ${clefCenterY + clefConfig.yOffset})`}>
            <text
              x="0"
              y="0"
              fontFamily="Bravura, 'Bravura Text', music, serif"
              fontSize={lineSpacing * clefConfig.fontSizeRatio}
              fill="#0f172a"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ userSelect: "none" }}
            >
              {clefConfig.glyph}
            </text>
          </g>

          {/* 3. ĐƯỜNG KÝ HIỆU OTTAVA (8va / 15ma) */}
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
                  fill="#2563eb"
                >
                  {group.type}
                </text>
                <line
                  x1={group.startX + 16}
                  y1={ottavaY}
                  x2={group.endX + 16}
                  y2={ottavaY}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <line
                  x1={group.endX + 16}
                  y1={ottavaY}
                  x2={group.endX + 16}
                  y2={ottavaY + 10}
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* 4. NỐT NHẠC VÀ DÒNG KẺ PHỤ */}
          {processedNotes.map((item, index) => {
            const { note, drawStep, noteX, noteY } = item;
            const stemUp = drawStep < 4;
            const displayLabel = note.label ?? getNoteLabel(note.pitch, notationMode, t.notes);
          const ledgerLines = getLedgerLines(drawStep);

          return (
            <g key={index} transform={`translate(${noteX}, ${noteY})`}>
              {/* Dòng kẻ phụ */}
              {ledgerLines.map((lStep) => {
                const lineRelY = (drawStep - lStep) * (lineSpacing / 2);
                return (
                  <line
                    key={lStep}
                    x1={-13}
                    y1={lineRelY}
                    x2={13}
                    y2={lineRelY}
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Đầu nốt */}
              <ellipse
                cx="0"
                cy="0"
                rx="7"
                ry="5"
                transform="rotate(-20)"
                fill="#0f172a"
              />

              {/* Thân nốt */}
              <line
                x1={stemUp ? 6 : -6}
                y1={0}
                x2={stemUp ? 6 : -6}
                y2={stemUp ? -35 : 35}
                stroke="#0f172a"
                strokeWidth="1.8"
              />

              {/* Tên nốt hiển thị phía dưới nốt thấp nhất với khoảng cách an toàn */}
              <text
                x="0"
                y={labelRowY - noteY}
                textAnchor="middle"
                fontSize="12"
                fill="#334155"
                fontWeight="700"
              >
                {displayLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
    </div>
  );
};

export default MusicalStaff;
