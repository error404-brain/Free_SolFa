"use client";

import React, { useEffect } from "react";

export interface AdBannerProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive?: boolean;
  label?: string;
  className?: string;
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
}) => {
  useEffect(() => {
    // Chỉ kích hoạt AdSense khi có slotId thực tế và đang chạy trên trình duyệt
    if (slotId && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense Error:", err);
      }
    }
  }, [slotId]);

  // Nếu chưa có slotId (Đang trong quá trình phát triển / Demo UI)
  if (!slotId) {
    return (
      <div
        className={`w-full max-w-5xl mx-auto my-6 p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 text-center text-slate-400 select-none ${className}`}
      >
        <div className="flex flex-col items-center justify-center gap-1 min-h-[90px]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {label} (Ad Placeholder)
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Vị trí đặt banner quảng cáo Google AdSense (Responsive 728x90 / Auto)
          </span>
        </div>
      </div>
    );
  }

  // Khung quảng cáo AdSense thực tế khi đưa lên Production
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
