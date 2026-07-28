"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VN, US } from "country-flag-icons/react/3x2";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
            🎼
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              {t.common.brandName}
            </h1>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {t.common.tagline}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/"
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/practice"
            className={`text-sm font-semibold transition-colors ${
              pathname?.startsWith("/practice")
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {t.nav.practice}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setLocale("vi")}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                locale === "vi"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <VN className="w-4 h-3 rounded-xs shadow-2xs" />
              <span>VI</span>
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                locale === "en"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <US className="w-4 h-3 rounded-xs shadow-2xs" />
              <span>EN</span>
            </button>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
