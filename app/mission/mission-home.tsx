"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { missions } from "../../data/missions";
import { getCompletedMissions } from "../../lib/mission-progress";

const missionOrder = Object.values(missions).sort((a, b) => a.number - b.number);

export default function MissionHome() {
  const router = useRouter();
  useEffect(() => {
    const completed = getCompletedMissions();
    const currentMission = missionOrder.find((mission) => !completed.includes(mission.id));

    if (currentMission) {
      router.replace(`/mission/${currentMission.id}`);
    } else {
      router.replace("/ending");
    }
  }, [router]);

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="pt-2 text-center">
        <h1 className="font-story text-2xl font-bold text-[#422a1d]">현재 임무</h1>
      </header>
      <section className="flex flex-1 items-center justify-center py-8">
        <p role="status" className="text-sm text-[#765a44]">현재 임무를 찾고 있습니다.</p>
      </section>
    </main>
  );
}
