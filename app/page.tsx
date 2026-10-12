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
    <main className="story-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="w-full max-w-[390px]">
          <Image src="/images/ui/title-logo.png" width={1774} height={887} alt="이야기 보부상 광천편" priority className="h-auto w-full object-contain" />
        </h1>
        <p className="-mt-2 max-w-[18rem] text-base leading-7 text-[#5c402b]">
          이야기를 찾고, 지역을 기록하는 여행
        </p>
      </section>

      <div className="w-full">
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
