"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CheonggwangScene from "../../../components/cheonggwang-scene";
import type { RestorableMission } from "../../../data/missions";

const primaryButtonClassName =
  "story-button-primary flex min-h-20 w-full items-center justify-center px-4 text-center text-base font-semibold leading-6 transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";
const previousButtonClassName =
  "story-button-secondary flex min-h-20 w-40 items-center justify-center px-4 text-center text-base font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function StoryIncidentScreen({ mission }: { mission: RestorableMission }) {
  const router = useRouter();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const dialogues = mission.incidentDialogues ?? [];

  return (
    <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
      <CheonggwangScene
        dialogue={dialogues[dialogueIndex]}
        actions={
          <div className="cheonggwang-button-row">
            <button type="button" onClick={() => dialogueIndex === 0 ? router.push(`/mission/${mission.id}`) : setDialogueIndex((current) => current - 1)} className={previousButtonClassName}>이전</button>
            {dialogueIndex === dialogues.length - 1 ? (
              <button type="button" onClick={() => router.push(`/mission/${mission.id}/play`)} className={primaryButtonClassName}>정답 입력하기</button>
            ) : (
              <button type="button" onClick={() => setDialogueIndex((current) => current + 1)} className={primaryButtonClassName}>계속</button>
            )}
          </div>
        }
      />
    </main>
  );
}
