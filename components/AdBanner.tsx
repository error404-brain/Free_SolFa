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
    return null;
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
