"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheonggwangScene from "../../../components/cheonggwang-scene";
import type { RestorableMission } from "../../../data/missions";
import { getCompletedMissions } from "../../../lib/mission-progress";

const primaryButtonClassName =
  "story-button-primary flex min-h-20 w-full items-center justify-center px-4 text-center text-base font-semibold leading-6 transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";
const previousButtonClassName =
  "story-button-secondary flex min-h-20 w-40 items-center justify-center px-4 text-center text-base font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function StoryNextScreen({ mission }: { mission: RestorableMission }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogues = mission.nextDialogues ?? [];

  useEffect(() => {
    try {
      if (!getCompletedMissions().includes(mission.id)) {
        router.replace("/mission");
        return;
      }
      setAllowed(true);
    } catch {
      router.replace("/mission");
    }
  }, [mission.id, router]);

  return (
    <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
      {allowed ? (
        <CheonggwangScene
          dialogue={dialogues[index]}
          actions={
            <div className="flex flex-col-reverse items-start gap-1">
              {index > 0 && <button type="button" onClick={() => setIndex((current) => current - 1)} className={previousButtonClassName}>이전</button>}
              {index === dialogues.length - 1 ? (
                <Link href={`/mission/${mission.nextMissionId}`} className={primaryButtonClassName}>{mission.nextStoryButtonLabel}</Link>
              ) : (
                <button type="button" onClick={() => setIndex((current) => current + 1)} className={primaryButtonClassName}>계속</button>
              )}
            </div>
          }
        />
      ) : (
        <p role="status" className="pt-12 text-center text-sm text-[#765a44]">다음 이야기를 준비하고 있습니다.</p>
      )}
    </main>
  );
}
