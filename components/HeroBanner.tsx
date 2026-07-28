"use client";

import React from "react";
import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50/80 dark:from-blue-950/40 via-indigo-50/30 dark:via-slate-900/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs mb-6">
          <Music className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
          {t.hero.title.split("&")[0]} &amp;{" "}
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
            {t.hero.title.split("&")[1] || "Nhạc Lý Tương Tác"}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
          {t.hero.subtitle}
        </p>

        {/* Action CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/practice"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{t.hero.startPractice}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
