"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { hasJourneyStarted } from "../lib/mission-progress";

const items = [
  { label: "지도", href: "/map" },
  { label: "임무", href: "/mission" },
  { label: "험표", href: "/permit" },
] as const;

export default function BottomNavigation() {
  const pathname = usePathname();
  const [journeyStarted, setJourneyStarted] = useState(false);

  useEffect(() => {
    try {
      setJourneyStarted(hasJourneyStarted());
    } catch {
      setJourneyStarted(false);
    }
  }, []);

  if (!journeyStarted) return null;

  return (
    <nav
      aria-label="여행 메뉴"
      className="paper-surface fixed bottom-0 left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 border-x border-t border-[#c9af89] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(74,48,34,0.12)]"
    >
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const active =
            item.href === "/mission"
              ? pathname === "/mission" || pathname.startsWith("/mission/")
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 items-center justify-center rounded-xl border text-sm font-bold tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635] ${
                active
                  ? "border-[#4b2d1d] bg-[#593823] text-[#fff8e9]"
                  : "border-transparent text-[#6d4c35] active:bg-[#ead8b8]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
