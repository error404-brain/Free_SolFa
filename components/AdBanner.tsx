"use client";

import React, { useEffect } from "react";

export interface AdBannerProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  label?: string;
  className?: string;
  variant?: "horizontal" | "skyscraper";
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId,
  format = "auto",
  responsive = true,
  label = "Quảng cáo",
  className = "",
  variant = "horizontal",
}) => {
  useEffect(() => {
    if (slotId && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense Error:", err);
      }
    }
  }, [slotId]);

  if (!slotId) {
    if (variant === "skyscraper") {
      return (
        <div
          className={`w-36 h-137.5 p-3 rounded-2xl border border-dashed border-slate-300 bg-white/90 backdrop-blur-xs shadow-xs text-center text-slate-400 select-none flex flex-col items-center justify-center gap-2 ${className}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {label}
          </span>
          <span className="text-xs text-slate-500 font-bold leading-tight">
            Banner Dọc 2 Bên
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            (Skyscraper 160x600)
          </span>
        </div>
      );
    }

    return (
      <div
        className={`w-full max-w-5xl mx-auto my-6 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs shadow-xs text-center text-slate-400 select-none transition-colors ${className}`}
      >
        <div className="flex flex-col items-center justify-center gap-1 min-h-22.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {label} (Ad Placeholder)
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Vị trí đặt banner quảng cáo Google AdSense (Responsive 728x90 / Auto)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-5xl mx-auto my-6 overflow-hidden text-center ${className}`}>
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </span>
      <ins
        className="adsbygoogle block"
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
