"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Cookie, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
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
          <ShieldCheck className="w-4 h-4" />
          <span>{t.privacyPage.title}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {t.privacyPage.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base">
          {t.privacyPage.subtitle}
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white font-bold text-xl">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2>{t.privacyPage.introTitle}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {t.privacyPage.introText}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white font-bold text-xl">
            <Cookie className="w-5 h-5 text-amber-500" />
            <h2>{t.privacyPage.cookiesTitle}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {t.privacyPage.cookiesText}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white font-bold text-xl">
            <HelpCircle className="w-5 h-5 text-emerald-500" />
            <h2>{t.privacyPage.contactTitle}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {t.privacyPage.contactText}
          </p>
        </section>
      </div>
    </main>
  );
}
