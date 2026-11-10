"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { briefingVideoUrl } from "../../lib/briefing";
import CheonggwangScene from "../../components/cheonggwang-scene";

const dialogues = [
  (name: string) => `${name} 보부상.\n\n이제부터 자네에게\n첫 번째 임무를 맡기겠네.`,
  () => "광천에서 발생한 망각은\n생각보다 빠르게 번지고 있네.\n\n사람들의 기억에서 사라진 이야기도\n\n그 이야기가 머물렀던 장소에는\n아직 흔적이 남아 있어.",
  () => "자네가 해야 할 일은 간단하네.\n\n직접 그 장소로 가서,\n\n남아 있는 흔적을 찾고,\n\n사라진 기억을 되돌리는 것.\n\n그게 우리 이야기 보부상이\n하는 일이지.",
  () => "첫 임무를 맡기기 전에\n자네가 확인해야 할 기록이 하나 있네.\n\n잘 보게.\n\n이번 망각과 관련된\n첫 번째 기록일세.",
  () => "좋아.\n\n그럼 이제 시작하지.\n\n첫 번째 기억의 흔적은\n광천문화시장에 남아 있네.\n\n시장 안에서\n오랜 시간을 버텨온 목주를 찾아가게.",
] as const;

const videoStep = 3;
const finalStep = dialogues.length - 1;

const primaryButtonClassName =
  "story-button-primary flex min-h-20 min-w-0 flex-1 items-center justify-center px-4 text-center text-base font-semibold transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

const previousButtonClassName =
  "story-button-secondary flex min-h-20 w-40 shrink-0 items-center justify-center text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function BriefingScreen() {
  const router = useRouter();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [recordConfirmed, setRecordConfirmed] = useState(false);

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem("bobusangName")?.trim();
      if (!savedName) {
        setName(null);
        router.replace("/onboarding");
        return;
      }
      setName(savedName);
    } catch {
      setName(null);
      router.replace("/onboarding");
    }
  }, [router]);

  function goNext() {
    if (step === videoStep) {
      setRecordConfirmed(true);
    }
    setStep((current) => Math.min(finalStep, current + 1));
  }

  return (
    <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
      {name === undefined ? (
        <p role="status" className="pt-12 text-center text-sm text-[#765a44]">브리핑을 준비하고 있습니다.</p>
      ) : name ? (
        <CheonggwangScene
          dialogue={dialogues[step](name)}
          kind="general"
          afterCard={step === videoStep ? (
            <div className="cheonggwang-after-card border border-[#c9ad83] bg-[#fff8e9]/75 p-4 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#9a6740]">기록 영상</p>
              {briefingVideoUrl ? (
                <video key={briefingVideoUrl} src={briefingVideoUrl} controls preload="metadata"
                  onEnded={() => setRecordConfirmed(true)} className="aspect-video w-full bg-[#4a3022]">
                  브라우저에서 영상을 재생할 수 없습니다.
                </video>
              ) : (
                <div className="flex aspect-video items-center justify-center border border-dashed border-[#b59670] bg-[#f0e0c1]/70 px-4 text-center font-story text-lg font-bold text-[#765a44]">
                  기록 영상 준비 중
                </div>
              )}
            </div>
          ) : undefined}
          actions={
            <div className="cheonggwang-button-row">
              {step > 0 && (
                <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className={previousButtonClassName}>이전</button>
              )}
              {step === finalStep ? (
                <button type="button" onClick={() => router.push("/mission/mokju")}
                  className={primaryButtonClassName + " w-full"}>첫 번째 임무 받기</button>
              ) : step === videoStep ? (
                <button type="button" onClick={goNext}
                  disabled={Boolean(briefingVideoUrl) && !recordConfirmed}
                  className={primaryButtonClassName + " w-full disabled:cursor-not-allowed disabled:opacity-55"}>
                  {briefingVideoUrl ? "계속" : "기록 확인 완료"}
                </button>
              ) : (
                <button type="button" onClick={goNext} className={primaryButtonClassName + " w-full"}>계속</button>
              )}
            </div>
          }
        />
      ) : null}
    </main>
  );
}
