"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, locales, vi, TranslationType } from "@/locales";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "vi",
  setLocale: () => {},
  t: vi,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>("vi");

  useEffect(() => {
    const savedLocale = localStorage.getItem("app_lang") as Locale;
    if (savedLocale === "vi" || savedLocale === "en") {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("app_lang", newLocale);
  };

  const t = locales[locale] || vi;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
