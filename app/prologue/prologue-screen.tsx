"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const buttonClassName =
  "flex min-h-16 min-w-0 flex-1 items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

const previousButtonClassName =
  "flex min-h-16 w-[88px] shrink-0 items-center justify-center rounded-2xl border border-[#a88966] bg-[#fff8e9]/85 text-base font-semibold text-[#68472f] transition-colors active:bg-[#f0e0c1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function PrologueScreen() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem("bobusangName")?.trim();
      if (!savedName) {
        router.replace("/register");
        return;
      }
      setName(savedName);
    } catch {
      router.replace("/register");
    }
  }, [router]);

  const dialogues = name
    ? [
        `드디어 왔군.\n${name} 보부상.`,
        "요즘 광천에서\n이상한 일이 벌어지고 있네.",
        "사람들이 하나둘씩\n무언가를 잊기 시작했어.",
        "장소에 남아 있는 흔적을 찾아\n사라진 기억을 복원해주게.",
      ]
    : [];

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="pt-2 text-center">
        <h1 className="font-story text-2xl font-bold tracking-[-0.05em] text-[#422a1d]">이야기 보부상</h1>
        <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 text-[#a77645]">
          <span className="h-px w-11 bg-current opacity-60" />
          <span className="text-sm leading-none">✦</span>
          <span className="h-px w-11 bg-current opacity-60" />
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center py-5">
        {name ? (
          <>
            <div
              role="img"
              aria-label="천광 이미지가 들어갈 자리"
              className="relative flex h-44 w-44 flex-col items-center justify-end overflow-hidden rounded-t-[5rem] rounded-b-2xl border-2 border-dashed border-[#b59670] bg-[#f0e0c1]/75 pb-4 shadow-[inset_0_0_0_7px_rgba(255,248,231,0.55),0_9px_24px_rgba(74,48,34,0.1)] sm:h-52 sm:w-52"
            >
              <span aria-hidden="true" className="absolute top-8 size-14 rounded-full border border-[#b59670]/50 bg-[#d7bd96] sm:top-10" />
              <span aria-hidden="true" className="absolute top-[5.5rem] h-20 w-28 rounded-t-full border border-[#b59670]/50 bg-[#d7bd96] sm:top-[6.5rem]" />
              <span className="relative rounded-full bg-[#f8edd7]/85 px-3 py-1 text-[11px] font-medium text-[#806349]">천광 이미지 자리</span>
            </div>

            <h2 className="font-story mt-5 text-2xl font-bold text-[#422a1d]">천광</h2>

            <div className="mt-5 w-full rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-5 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">천광의 말</p>
              <p aria-live="polite" className="font-story mt-4 min-h-16 whitespace-pre-line break-keep text-[1.125rem] font-bold leading-8 text-[#422a1d]">
                {dialogues[dialogueIndex]}
              </p>
            </div>
          </>
        ) : (
          <p role="status" className="text-sm text-[#765a44]">이야기를 준비하고 있습니다.</p>
        )}
      </section>

      {name && (
        <div className="flex w-full gap-3">
          {dialogueIndex > 0 && (
            <button
              type="button"
              onClick={() => setDialogueIndex((current) => Math.max(0, current - 1))}
              className={previousButtonClassName}
            >
              이전
            </button>
          )}
          {dialogueIndex < dialogues.length - 1 ? (
            <button
              type="button"
              onClick={() => setDialogueIndex((current) => current + 1)}
              className={`${buttonClassName} ${dialogueIndex === 0 ? "px-6 text-lg" : "px-2 text-base"}`}
            >
              계속
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/mission/mokju")}
              className={`${buttonClassName} px-2 text-base`}
            >
              첫 번째 임무 받기
            </button>
          )}
        </div>
      )}
    </main>
  );
}
