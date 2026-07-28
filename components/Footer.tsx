"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8 mt-auto transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-800 dark:text-slate-200">
            🎼 {t.common.brandName}
          </span>
        </div>

        {/* Disclaimer Text */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          <span className="font-bold text-slate-700 dark:text-slate-300">{t.footer.disclaimerTitle}:</span>{" "}
          {t.footer.disclaimerText}
        </p>

        {/* Copyright & Project Type */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 w-full max-w-md">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
