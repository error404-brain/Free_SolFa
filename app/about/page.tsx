"use client";

import React from "react";
import Link from "next/link";
import { Info, ArrowLeft, Heart, Mail, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.nav.home}
      </Link>

      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4">
          <Info className="w-4 h-4" />
          <span>{t.aboutPage.title}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {t.aboutPage.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          {t.aboutPage.subtitle}
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white font-bold text-xl">
            <span className="text-2xl">🎼</span>
            <h2>{t.aboutPage.aboutTitle}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {t.aboutPage.aboutText}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white font-bold text-xl">
            <Heart className="w-5 h-5 text-rose-500" />
            <h2>{t.aboutPage.missionTitle}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {t.aboutPage.missionText}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6 text-slate-900 dark:text-white font-bold text-xl">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2>{t.aboutPage.contactTitle}</h2>
          </div>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{t.aboutPage.contactEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Globe className="w-4 h-4 text-slate-400" />
              <a
                href="https://freesolfa.io.vn"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t.aboutPage.contactWebsite}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
