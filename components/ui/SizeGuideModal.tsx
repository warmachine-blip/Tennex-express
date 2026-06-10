"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MENS_SIZES = [
  { size: "S",   chest: '34–36"', waist: '28–30"' },
  { size: "M",   chest: '38–40"', waist: '32–34"' },
  { size: "L",   chest: '42–44"', waist: '36–38"' },
  { size: "XL",  chest: '46–48"', waist: '40–42"' },
  { size: "XXL", chest: '50–52"', waist: '44–46"' },
];

const WOMENS_SIZES = [
  { size: "XS", bust: '30–32"', waist: '22–24"', hips: '32–34"' },
  { size: "S",  bust: '34–36"', waist: '26–28"', hips: '36–38"' },
  { size: "M",  bust: '38–40"', waist: '30–32"', hips: '40–42"' },
  { size: "L",  bust: '42–44"', waist: '34–36"', hips: '44–46"' },
  { size: "XL", bust: '46–48"', waist: '38–40"', hips: '48–50"' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gender: "mens" | "womens";
}

export function SizeGuideModal({ isOpen, onClose, gender }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const isMens = gender === "mens";
  const title = isMens ? "Men's size guide" : "Women's size guide";

  return createPortal(
    <div className="fixed inset-0 z-[401] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-bg w-full sm:max-w-[480px] sm:mx-4 rounded-t-[20px] sm:rounded-[20px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
          <h2 className="text-[15px] font-medium text-ink">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-hairline transition-colors duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Measure tip */}
        <p className="px-6 py-4 text-[12px] text-muted border-b border-hairline leading-relaxed">
          Measure yourself with a soft tape. All measurements in inches. When
          between sizes, size up for a relaxed fit.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          {isMens ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-hairline/30">
                  <th className="text-left px-6 py-3 font-medium text-muted">Size</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Chest</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Waist</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {MENS_SIZES.map((row) => (
                  <tr key={row.size} className="hover:bg-hairline/20 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-ink">{row.size}</td>
                    <td className="px-4 py-3.5 text-muted">{row.chest}</td>
                    <td className="px-4 py-3.5 text-muted">{row.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-hairline/30">
                  <th className="text-left px-6 py-3 font-medium text-muted">Size</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Bust</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Waist</th>
                  <th className="text-left px-4 py-3 font-medium text-muted">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {WOMENS_SIZES.map((row) => (
                  <tr key={row.size} className="hover:bg-hairline/20 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-ink">{row.size}</td>
                    <td className="px-4 py-3.5 text-muted">{row.bust}</td>
                    <td className="px-4 py-3.5 text-muted">{row.waist}</td>
                    <td className="px-4 py-3.5 text-muted">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-6 py-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-hairline text-[13px] font-medium text-muted hover:text-ink hover:border-ink transition-colors duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
