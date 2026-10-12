"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNavigation from "../../components/bottom-navigation";
import { missions } from "../../data/missions";
import { getCompletedMissions, TOTAL_MISSIONS } from "../../lib/mission-progress";

const availableMissions = Object.values(missions).sort((a, b) => a.number - b.number);
export default function MapScreen() {
  const [completedMissions, setCompletedMissions] = useState<string[] | null>(null);

  useEffect(() => {
    setCompletedMissions(getCompletedMissions());
  }, []);

  const completedCount = availableMissions.filter((mission) => completedMissions?.includes(mission.id)).length;
  const progressPercent = Math.round((completedCount / TOTAL_MISSIONS) * 100);

  return (
    <>
      <main className="tour-main paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
        <header className="pt-2 text-center">
          <h1 className="font-story text-3xl font-bold tracking-[-0.05em] text-[#422a1d]">광천 지도</h1>
          <p className="mt-4 break-keep text-sm leading-6 text-[#765a44]">
            복원한 기억과 앞으로 찾아갈 장소를 확인할 수 있습니다.
          </p>
          <div className="mt-5 rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-4 py-3 text-left">
            <div className="flex items-center justify-between text-sm font-semibold text-[#68472f]">
              <span>복원한 기억 {String(completedCount).padStart(2, "0")} / {String(TOTAL_MISSIONS).padStart(2, "0")}</span>
              <span>{progressPercent}%</span>
            </div>
            <div role="progressbar" aria-label="전체 미션 진행률" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-2 overflow-hidden rounded-full bg-[#d9c4a3]">
              <div className="h-full rounded-full bg-[#8f6746]" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </header>

        <div
          role="img"
          aria-label="이야기 보부상 지도 이미지가 들어갈 자리"
          className="relative mt-7 flex min-h-56 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#b59670] bg-[#efdfc2]/80 shadow-[inset_0_0_0_8px_rgba(255,248,231,0.5),0_8px_22px_rgba(74,48,34,0.09)]"
        >
          <span aria-hidden="true" className="absolute left-1/4 top-1/4 size-2 rotate-45 bg-[#a77645]/50" />
          <span aria-hidden="true" className="absolute right-1/4 top-1/2 size-2 rotate-45 bg-[#a77645]/50" />
          <span className="rounded-full bg-[#fff8e9]/85 px-5 py-2 text-sm font-medium text-[#806349]">
            이야기 보부상 지도 자리
          </span>
        </div>

        <section className="mt-8">
          <h2 className="font-story text-xl font-bold text-[#422a1d]">기억을 찾는 장소</h2>
          <ol className="mt-4 space-y-3">
            {availableMissions.map((mission) => {
              const completed = completedMissions?.includes(mission.id) ?? false;
              const placeName =
                mission.imageName === mission.location
                  ? mission.location
                  : `${mission.imageName} / ${mission.location}`;

              return (
                <li key={mission.id}>
                  <Link href={`/mission/${mission.id}`} className="block rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635]">
                    <p className="text-xs font-bold tracking-[0.16em] text-[#9a6740]">
                      {(mission.id === "gwangcheon-station" || mission.id === "tunnel" || mission.id === "exhibition" || mission.id === "ongam-port") && mission.storyLabel
                        ? mission.storyLabel
                        : `MISSION ${String(mission.number).padStart(2, "0")}`}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <p className="font-story text-lg font-bold text-[#422a1d]">{mission.mapLabel ?? placeName}</p>
                      <p className={`text-xs font-semibold ${completed ? "text-[#6d593b]" : "text-[#947d65]"}`}>
                        {completed ? "✓ 기억 복원 완료" : completedMissions === null ? "상태 확인 중" : mission.mapAvailableStatus ?? "기억 미복원"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <BottomNavigation />
    </>
  );
}
