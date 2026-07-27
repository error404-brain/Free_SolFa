"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VN, US } from "country-flag-icons/react/3x2";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
            🎼
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
              {t.common.brandName}
            </h1>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">
              {t.common.tagline}
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "text-blue-600 font-bold"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/practice"
            className={`text-sm font-semibold transition-colors ${
              pathname?.startsWith("/practice")
                ? "text-blue-600 font-bold"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            {t.nav.practice}
          </Link>
        </nav>

        {/* Language Switcher Button Group */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            onClick={() => setLocale("vi")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              locale === "vi"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <VN className="w-4 h-3 rounded-xs shadow-2xs" />
            <span>VI</span>
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              locale === "en"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <US className="w-4 h-3 rounded-xs shadow-2xs" />
            <span>EN</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
