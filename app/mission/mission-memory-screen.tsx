"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { RestorableMission } from "../../data/missions";
import {
  completeMission,
  getCompletedMissions,
  reviewedRecordKey,
  solvedMissionKey,
  TOTAL_MISSIONS,
} from "../../lib/mission-progress";

type MemoryMission = Pick<
  RestorableMission,
  "id" | "number" | "storyLabel" | "memoryTitle" | "memoryStory" | "memoryMessage" | "memoryRecordFactLabel" | "memoryRecordFactValue" | "nextMissionId" | "nextMissionNotice" | "endingPath"
>;

type MissionMemoryScreenProps = {
  mission: MemoryMission;
};

const primaryButtonClassName =
  "flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function MissionMemoryScreen({ mission }: MissionMemoryScreenProps) {
  const isStoryMission = Boolean(mission.storyLabel);
  const router = useRouter();
  const [completedMissions, setCompletedMissions] = useState<string[] | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [nextNotice, setNextNotice] = useState(false);

  useEffect(() => {
    try {
      const completed = getCompletedMissions();
      const solvedThisSession =
        window.sessionStorage.getItem(solvedMissionKey(mission.id)) === "true";
      const recordReviewed = !isStoryMission ||
        window.sessionStorage.getItem(reviewedRecordKey(mission.id)) === "true";

      if (!(solvedThisSession && recordReviewed) && !completed.includes(mission.id)) {
        router.replace(isStoryMission && solvedThisSession ? `/mission/${mission.id}/record` : `/mission/${mission.id}/play`);
        return;
      }

      setCompletedMissions(completeMission(mission.id));
    } catch {
      setStorageError(true);
    }
  }, [isStoryMission, mission.id, router]);

  const completedCount = Math.min(completedMissions?.length ?? 0, TOTAL_MISSIONS);
  const progressPercent = Math.round((completedCount / TOTAL_MISSIONS) * 100);

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      {storageError ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p role="alert" className="break-keep text-base leading-7 text-[#765a44]">
            완료 상태를 저장할 수 없습니다. 브라우저 저장소를 확인해주세요.
          </p>
          <Link href={`/mission/${mission.id}/play`} className="mt-6 font-semibold text-[#593823] underline underline-offset-4">
            현장 미션으로 돌아가기
          </Link>
        </div>
      ) : completedMissions === null ? (
        <p role="status" className="flex flex-1 items-center justify-center text-sm text-[#765a44]">
          기억을 불러오고 있습니다.
        </p>
      ) : (
        <>
          <header className="pt-2 text-center">
            <p className="text-xs font-bold tracking-[0.23em] text-[#97683f]">MEMORY RESTORED</p>
            <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 text-[#a77645]">
              <span className="h-px w-11 bg-current opacity-60" />
              <span className="text-sm leading-none">✦</span>
              <span className="h-px w-11 bg-current opacity-60" />
            </div>
            <h1 className="font-story mt-5 text-[clamp(1.75rem,7vw,2.25rem)] font-bold tracking-[-0.05em] text-[#422a1d]">
              {isStoryMission ? `「${mission.memoryTitle}」 획득` : "기억 복원 완료"}
            </h1>
          </header>

          <section className="flex flex-1 flex-col justify-center gap-5 py-6">
            <div className="rounded-2xl border border-[#c9ab80] bg-[#fff8e9]/75 px-5 py-5 shadow-[0_8px_22px_rgba(74,48,34,0.07)]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] text-[#8f6746]">복원한 기억</p>
                  <p className="mt-1 font-story text-2xl font-bold text-[#422a1d]">
                    {String(completedCount).padStart(2, "0")} <span className="text-base font-normal text-[#846247]">/ {String(TOTAL_MISSIONS).padStart(2, "0")}</span>
                  </p>
                </div>
                <p className="text-lg font-bold text-[#593823]">{progressPercent}%</p>
              </div>
              <div
                role="progressbar"
                aria-label="미션 진행률"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#d9c4a3]"
              >
                <div className="h-full rounded-full bg-[#8f6746]" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <article className="rounded-2xl border-2 border-[#a88453] bg-[#efe0bd] px-6 py-7 shadow-[inset_0_0_0_6px_rgba(255,248,231,0.65),0_12px_30px_rgba(74,48,34,0.12)]">
              <p className="text-xs font-bold tracking-[0.18em] text-[#97683f]">기억의 기록</p>
              <h2 className="font-story mt-4 text-2xl font-bold text-[#422a1d]">{isStoryMission ? `「${mission.memoryTitle}」` : mission.memoryTitle}</h2>
              <div aria-hidden="true" className="mt-4 h-px w-full bg-[#b99869]/70" />
              {isStoryMission && mission.memoryRecordFactLabel && mission.memoryRecordFactValue && (
                <div className="mt-5 rounded-lg border border-[#b99869]/70 bg-[#fff8e9]/70 px-4 py-5 text-center">
                  <p className="text-sm font-semibold text-[#765a44]">{mission.memoryRecordFactLabel}</p>
                  <p className="font-story mt-2 text-3xl font-bold text-[#422a1d]">{mission.memoryRecordFactValue}</p>
                </div>
              )}
              <p className="font-story mt-5 whitespace-pre-line break-keep text-[1rem] leading-8 text-[#4a3022]">
                {mission.memoryStory}
              </p>
            </article>

            {!isStoryMission && <div className="rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-5 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">천광</p>
              <p className="font-story mt-3 whitespace-pre-line break-keep text-base font-bold leading-7 text-[#422a1d]">
                {mission.memoryMessage}
              </p>
            </div>}
          </section>

          {isStoryMission ? (
            <Link href={`/mission/${mission.id}/next`} className={primaryButtonClassName}>계속</Link>
          ) : mission.nextMissionId ? (
            <Link
              href={`/mission/${mission.nextMissionId}`}
              className={primaryButtonClassName}
            >
              다음 임무 확인
            </Link>
          ) : mission.endingPath ? (
            <Link href={mission.endingPath} className={primaryButtonClassName}>
              여정 마무리하기
            </Link>
          ) : (
            <div>
              {nextNotice && (
                <p role="status" className="mb-3 break-keep text-center text-sm text-[#76533b]">
                  {mission.nextMissionNotice ?? "다음 기억은 곧 열립니다."}
                </p>
              )}
              <button
                type="button"
                onClick={() => setNextNotice(true)}
                className={primaryButtonClassName}
              >
                다음 임무 확인
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
