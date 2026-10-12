"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNavigation from "../../components/bottom-navigation";
import {
  getCompletedMissions,
  hasJourneyStarted,
  startJourney,
  TOTAL_MISSIONS,
} from "../../lib/mission-progress";

const primaryButtonClassName =
  "flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function PermitScreen() {
  const router = useRouter();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      setName(window.localStorage.getItem("bobusangName")?.trim() || null);
      setCompletedMissions(getCompletedMissions());
      setJourneyStarted(hasJourneyStarted());
    } catch {
      setName(null);
    }
  }, []);

  const completedCount = Math.min(completedMissions.length, TOTAL_MISSIONS);
  const progressPercent = Math.round((completedCount / TOTAL_MISSIONS) * 100);

  function handleStartJourney() {
    try {
      startJourney();
      router.push("/briefing");
    } catch {
      setStorageError(true);
    }
  }

  return (
    <main className={`paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9 ${journeyStarted ? "tour-main" : ""}`}>
      <header className="pt-2 text-center">
        <h1 className="font-story text-2xl font-bold tracking-[-0.04em] text-[#422a1d]">험표 발급</h1>
        <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-2 text-[#a77645]">
          <span className="h-px w-11 bg-current opacity-60" />
          <span className="size-1.5 rotate-45 border border-current" />
          <span className="h-px w-11 bg-current opacity-60" />
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-4 sm:py-6">
        {name === undefined ? (
          <p role="status" className="text-center text-sm text-[#765a44]">험표를 준비하고 있습니다.</p>
        ) : name === null ? (
          <p className="break-keep text-center text-base leading-7 text-[#765a44]">
            먼저 보부상 이름을 등록해주세요.
          </p>
        ) : (
          <>
            <article className="permit-card w-full max-w-[350px] border-2 border-[#98734b] p-1.5 shadow-[0_14px_30px_rgba(74,48,34,0.18)]">
              <div className="flex min-h-[330px] flex-col items-center border border-[#b99869] px-5 py-7 text-center sm:min-h-[390px] sm:py-9">
                <div aria-hidden="true" className="mb-5 flex items-center gap-3 text-[#9f794e]">
                  <span className="h-px w-12 bg-current opacity-70" />
                  <span className="text-sm leading-none">✦</span>
                  <span className="h-px w-12 bg-current opacity-70" />
                </div>
                <p className="font-story text-base font-bold tracking-[0.18em] text-[#68472f]">이야기 보부상</p>
                <h2 className="font-story mt-2 text-5xl font-bold tracking-[0.16em] text-[#422a1d]">험표</h2>

                <div className="mt-7 h-px w-full bg-[#b99869]/70" aria-hidden="true" />
                <div className="flex flex-1 flex-col items-center justify-center py-6">
                  <p className="font-story break-keep text-[clamp(1.6rem,7vw,2rem)] font-bold leading-snug text-[#422a1d]">
                    {name} 보부상
                  </p>
                  <p className="font-story mt-4 text-base tracking-[0.22em] text-[#76533b]">광천 접</p>
                </div>
                <div className="h-px w-full bg-[#b99869]/70" aria-hidden="true" />

                <p className="mt-6 font-mono text-sm font-semibold tracking-[0.2em] text-[#76533b]">No. 0027</p>
              </div>
            </article>
            <p className="mt-6 break-keep text-center text-base leading-7 text-[#765a44]">
              신입 보부상 등록이 완료되었습니다.
            </p>
            <div className="mt-4 w-full max-w-[350px] rounded-xl border border-[#ccb18a] bg-[#fff8e9]/75 px-5 py-4 text-[#68472f]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">복원한 기억</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs font-semibold tabular-nums">{completedCount} / {TOTAL_MISSIONS}</span>
                  <span aria-label={`${completedCount}개 복원`} className="flex gap-1 text-lg leading-none">
                    {Array.from({ length: TOTAL_MISSIONS }, (_, index) => (
                      <span key={index} aria-hidden="true" className={index < completedCount ? "text-[#765033]" : "text-[#bba585]"}>
                        {index < completedCount ? "●" : "○"}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <p className="mt-2 flex items-center justify-between text-sm">
                <span>진행률</span>
                <span className="font-bold">{progressPercent}%</span>
              </p>
            </div>
          </>
        )}
      </section>

      {storageError && (
        <p role="alert" className="mb-3 break-keep text-center text-sm text-[#92503d]">
          여행 시작 상태를 저장할 수 없습니다. 브라우저 저장소를 확인해주세요.
        </p>
      )}
      {name === null ? (
        <Link
          href="/register"
          className={primaryButtonClassName}
        >
          등록 화면으로 가기
        </Link>
      ) : name && journeyStarted ? (
        <Link
          href="/mission"
          className={primaryButtonClassName}
        >
          현재 임무 보기
        </Link>
      ) : name ? (
        <button type="button" onClick={handleStartJourney} className={primaryButtonClassName}>
          임무 시작하기
        </button>
      ) : null}
      {journeyStarted && <BottomNavigation />}
    </main>
  );
}
