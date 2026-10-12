"use client";

import Link from "next/link";
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
  const [dialogueIndex, setDialogueIndex] = useState<number | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoUrl = mission.incidentVideoUrl?.trim();
  const dialogues = mission.incidentDialogues ?? [];

  if (dialogueIndex !== null) {
    return (
      <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
        <CheonggwangScene
          dialogue={dialogues[dialogueIndex]}
          actions={
            <div className="flex flex-col-reverse items-start gap-1">
              <button type="button" onClick={() => setDialogueIndex((current) => current === 0 ? null : (current ?? 1) - 1)} className={previousButtonClassName}>이전</button>
              {dialogueIndex === dialogues.length - 1 ? (
                <button type="button" onClick={() => router.push(`/mission/${mission.id}/play`)} className={primaryButtonClassName}>정답 입력하기</button>
              ) : (
                <button type="button" onClick={() => setDialogueIndex((current) => (current ?? 0) + 1)} className={primaryButtonClassName}>계속</button>
              )}
            </div>
          }
        />
      </main>
    );
  }

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="pt-2 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-[#97683f]">{mission.storyLabel}</p>
        <div aria-hidden="true" className="mt-4 h-px w-full bg-[#b99869]/70" />
        <h1 className="font-story mt-7 text-3xl font-bold text-[#422a1d]">사건 기록</h1>
      </header>

      <section className="flex flex-1 flex-col justify-center py-8">
        <div className="rounded-lg border border-[#c9ad83] bg-[#fff8e9]/85 p-4 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
          {videoUrl ? (
            <video src={videoUrl} controls preload="metadata" playsInline onEnded={() => setVideoEnded(true)} className="aspect-video w-full bg-[#4a3022]">
              브라우저에서 영상을 재생할 수 없습니다.
            </video>
          ) : (
            <div className="flex aspect-video items-center justify-center border border-dashed border-[#b59670] bg-[#f0e0c1]/70 px-4 text-center font-story text-lg font-bold text-[#765a44]">
              사건 기록 영상 준비 중
            </div>
          )}
        </div>
      </section>

      <div className="pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <button type="button" disabled={Boolean(videoUrl) && !videoEnded} onClick={() => setDialogueIndex(0)}
          className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold text-[#fff8e9] shadow-[0_7px_0_#d1b792] disabled:cursor-not-allowed disabled:opacity-50">
          기록 확인 완료
        </button>
        <Link href={`/mission/${mission.id}`} className="mt-4 block py-3 text-center text-sm font-semibold text-[#795238] underline underline-offset-4">이전</Link>
      </div>
    </main>
  );
}
