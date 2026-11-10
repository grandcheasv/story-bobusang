"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getResumableMissionPath } from "../lib/mission-progress";

type JourneyState = "new" | "started" | "missing-name";

export default function Home() {
  const [journeyState, setJourneyState] = useState<JourneyState | null>(null);
  const [bobusangName, setBobusangName] = useState("");
  const [resumePath, setResumePath] = useState("/mission");

  useEffect(() => {
    try {
      if (window.localStorage.getItem("journeyStarted") !== "true") {
        setJourneyState("new");
        return;
      }

      const savedName = window.localStorage.getItem("bobusangName")?.trim();
      if (!savedName) {
        setJourneyState("missing-name");
        return;
      }

      setBobusangName(savedName);
      setResumePath(getResumableMissionPath() ?? "/mission");
      setJourneyState("started");
    } catch {
      setJourneyState("new");
    }
  }, []);

  const destination =
    journeyState === "started"
      ? resumePath
      : journeyState === "missing-name"
        ? "/register"
        : "/onboarding";
  const buttonLabel =
    journeyState === "started"
      ? "여정 이어가기"
      : journeyState === "missing-name"
        ? "보부상 이름 등록하기"
        : "여정 시작하기";

  return (
    <main className="home-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <Image src="/images/ui/KakaoTalk_20261110_104850428_02.png" alt="" fill preload sizes="(max-width: 440px) 100vw, 440px" className="object-cover object-center" />
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center pb-[24dvh] text-center">
        <div className="home-title-enter flex w-full flex-col items-center">
          <h1 className="flex w-full justify-center">
            <Image src="/images/ui/title-logo.png?v=20261110" width={1727} height={1027} alt="이야기 보부상 광천편 임무 장부" unoptimized loading="eager" className="home-title-image object-contain" />
          </h1>
        </div>
      </section>

      <div className="home-action-enter relative z-10 w-full">
        {journeyState === null ? (
          <div aria-live="polite" className="story-button-primary flex min-h-20 w-full items-center justify-center px-6 text-lg font-semibold">
            여정을 확인하고 있습니다.
          </div>
        ) : (
          <Link
            href={destination}
            className="story-button-primary flex min-h-20 w-full items-center justify-center px-6 text-lg font-semibold tracking-tight transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]"
          >
            {buttonLabel}
          </Link>
        )}
        {journeyState === "started" && (
          <p className="mt-4 break-keep text-center text-sm text-[#765a44]">
            {bobusangName} 보부상의 여정이 진행 중입니다.
          </p>
        )}
        {journeyState === "missing-name" && (
          <p className="mt-4 break-keep text-center text-sm text-[#765a44]">
            보부상 이름을 다시 등록해주세요.
          </p>
        )}
      </div>
    </main>
  );
}
