"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-slate-900">
              🎼 {t.common.brandName}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            {t.footer.description}
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-0.5">
          <p className="text-xs text-slate-500 font-medium">
            {t.footer.copyright}
          </p>
          <p className="text-[11px] text-slate-400">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
