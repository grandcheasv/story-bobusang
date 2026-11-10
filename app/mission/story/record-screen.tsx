"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheonggwangCard } from "../../../components/cheonggwang-scene";
import RestoredRecordVideo from "../../../components/restored-record-video";
import type { RestorableMission } from "../../../data/missions";
import { completeMission, getCompletedMissions, reviewedRecordKey, solvedMissionKey } from "../../../lib/mission-progress";

export default function StoryRecordScreen({ mission }: { mission: RestorableMission }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const solved = window.sessionStorage.getItem(solvedMissionKey(mission.id)) === "true";
      if (!solved && !getCompletedMissions().includes(mission.id)) {
        router.replace(`/mission/${mission.id}/play`);
        return;
      }
      setAllowed(true);
    } catch {
      setStorageError(true);
    }
  }, [mission.id, router]);

  function confirmRecord() {
    try {
      window.sessionStorage.setItem(reviewedRecordKey(mission.id), "true");
      completeMission(mission.id);
      router.push(`/mission/${mission.id}/memory`);
    } catch {
      setStorageError(true);
    }
  }

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      {storageError ? (
        <p role="alert" className="flex flex-1 items-center justify-center text-center text-sm text-[#92503d]">기록을 확인할 수 없습니다. 브라우저 저장소를 확인해주세요.</p>
      ) : !allowed ? (
        <p role="status" className="flex flex-1 items-center justify-center text-center text-sm text-[#765a44]">복원된 기록을 준비하고 있습니다.</p>
      ) : (
        <>
          <header className="pt-2 text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#97683f]">{mission.storyLabel}</p>
            <div aria-hidden="true" className="mt-4 h-px w-full bg-[#b99869]/70" />
            <h1 className="font-story mt-7 text-3xl font-bold text-[#422a1d]">복원된 기록</h1>
          </header>

          <section className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
            <CheonggwangCard dialogue={mission.memoryMessage + "\n\n" + (mission.recordPrompt ?? "복원된 기록을 확인해보게.")} />
            <div className="w-full rounded-lg border border-[#c9ad83] bg-[#fff8e9]/85 p-4 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#9a6740]">복원된 기록 {String(mission.number).padStart(2, "0")}</p>
              <RestoredRecordVideo videoUrl={mission.videoUrl} title={`${mission.storyLabel} 복원된 기록 영상`} />
            </div>
          </section>

          <div className="pb-[max(1.75rem,env(safe-area-inset-bottom))]">
            <button type="button" onClick={confirmRecord}
              className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold text-[#fff8e9] shadow-[0_7px_0_#d1b792]">
              기록 확인 완료
            </button>
          </div>
        </>
      )}
    </main>
  );
}
