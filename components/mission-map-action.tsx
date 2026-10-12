"use client";

import { useState } from "react";

const buttonClassName =
  "flex min-h-14 w-full items-center justify-center rounded-2xl border border-[#a88966] bg-[#fff8e9]/85 px-6 text-base font-semibold text-[#68472f] transition-colors active:bg-[#f0e0c1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function MissionMapAction({ mapUrl, label = "네이버 지도에서 위치 확인" }: { mapUrl?: string; label?: string }) {
  const [showNotice, setShowNotice] = useState(false);
  const url = mapUrl?.trim();

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
        {label}
      </a>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setShowNotice(true)} className={buttonClassName}>
        {label}
      </button>
      {showNotice && (
        <p role="status" className="mt-2 text-center text-sm text-[#765a44]">
          지도 위치를 준비 중입니다.
        </p>
      )}
    </div>
  );
}
