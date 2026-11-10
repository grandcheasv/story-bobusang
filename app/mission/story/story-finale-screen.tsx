"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheonggwangScene from "../../../components/cheonggwang-scene";
import {
  finaleOpeningDialogue,
  finaleRecords,
  getFinaleClosingDialogues,
  memoryMapOrder,
  type FinaleRecord,
} from "../../../data/finale";
import { missions } from "../../../data/missions";
import { getCompletedMissions } from "../../../lib/mission-progress";

type Stage = "opening" | "records" | "map" | "closing";
type Access = { name: string; completed: string[] } | null;

const primaryButtonClassName =
  "story-button-primary flex min-h-20 w-full items-center justify-center px-4 text-center text-base font-semibold leading-6 transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";
const previousButtonClassName =
  "story-button-secondary flex min-h-20 w-40 items-center justify-center px-4 text-center text-base font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";
const paperButtonClassName =
  "flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-5 text-base font-semibold text-[#fff8e9] shadow-[0_7px_0_#d1b792] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

function RecordCollection({ records }: { records: readonly FinaleRecord[] }) {
  return (
    <section aria-label="되찾은 다섯 기록" className="flex flex-col gap-3">
      {records.map((record) => (
        <article key={record.id} className="rounded-xl border border-[#c9ab80] bg-[#fff8e9]/85 px-5 py-5 shadow-[0_6px_18px_rgba(74,48,34,0.07)]">
          <h2 className="font-story text-lg font-bold text-[#422a1d]">「{missions[record.id].memoryTitle}」</h2>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {record.place && <p className="text-sm font-semibold text-[#765a44]">{record.place}</p>}
            <p className="font-story text-xl font-bold text-[#593823]">{record.detail}</p>
          </div>
          <p className="font-story mt-3 whitespace-pre-line break-keep text-sm leading-6 text-[#68472f]">{record.description}</p>
        </article>
      ))}
    </section>
  );
}

function MemoryNetwork({ records }: { records: readonly FinaleRecord[] }) {
  const mapRecords = memoryMapOrder
    .map((id) => records.find((record) => record.id === id))
    .filter((record): record is FinaleRecord => Boolean(record));

  return (
    <section aria-label="광천의 기억 관계망" className="mt-7">
      <div className="mx-auto flex size-28 items-center justify-center rounded-full border-2 border-[#8f6746] bg-[#efe0bd] font-story text-2xl font-bold text-[#422a1d] shadow-[0_8px_22px_rgba(74,48,34,0.12)]">
        광천
      </div>
      <div aria-hidden="true" className="mx-auto h-6 w-px bg-[#a88453]" />
      <div aria-hidden="true" className="mx-9 h-px bg-[#a88453]" />
      <div className="grid grid-cols-2 gap-3 pt-3">
        {mapRecords.map((record) => (
          <article key={record.id} className="relative rounded-xl border border-[#c9ab80] bg-[#fff8e9]/85 px-3 py-4 shadow-[0_6px_18px_rgba(74,48,34,0.07)]">
            <span aria-hidden="true" className="absolute -top-3 left-1/2 h-3 w-px bg-[#a88453]" />
            <h2 className="font-story break-keep text-base font-bold text-[#422a1d]">{record.place || record.detail}</h2>
            <p className="mt-2 break-keep text-xs leading-5 text-[#765a44]">{record.relationship}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function StoryFinaleScreen() {
  const router = useRouter();
  const [access, setAccess] = useState<Access>(null);
  const [stage, setStage] = useState<Stage>("opening");
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    try {
      const completed = getCompletedMissions();
      if (!finaleRecords.every((record) => completed.includes(record.id))) {
        router.replace("/mission");
        return;
      }

      const name = window.localStorage.getItem("bobusangName")?.trim();
      if (!name) {
        router.replace("/register");
        return;
      }
      setAccess({ name, completed });
    } catch {
      router.replace("/mission");
    }
  }, [router]);

  if (!access) {
    return (
      <main className="paper-surface mx-auto flex min-h-dvh w-full max-w-[440px] items-center justify-center border-x border-[#d8c5a4]/70 px-6 text-center text-sm text-[#765a44]">
        <p role="status">되찾은 기록을 확인하고 있습니다.</p>
      </main>
    );
  }

  const records = finaleRecords.filter((record) => access.completed.includes(record.id));

  if (stage === "opening" || stage === "closing") {
    const dialogues = stage === "opening" ? [finaleOpeningDialogue] : getFinaleClosingDialogues(access.name);
    return (
      <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
        <CheonggwangScene
          dialogue={dialogues[dialogueIndex]}
          actions={
            <div className="cheonggwang-button-row">
              {stage === "closing" && (
                <button type="button" onClick={() => dialogueIndex === 0 ? setStage("map") : setDialogueIndex((current) => current - 1)} className={previousButtonClassName}>이전</button>
              )}
              {stage === "opening" ? (
                <button type="button" onClick={() => setStage("records")} className={primaryButtonClassName}>되찾은 기록 살펴보기</button>
              ) : dialogueIndex === dialogues.length - 1 ? (
                <Link href="/ending" className={primaryButtonClassName}>광천 접으로 돌아가기</Link>
              ) : (
                <button type="button" onClick={() => setDialogueIndex((current) => current + 1)} className={primaryButtonClassName}>계속</button>
              )}
            </div>
          }
        />
      </main>
    );
  }

  return (
    <main className="paper-surface mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-[#97683f]">마지막 이야기</p>
        <div aria-hidden="true" className="mx-auto mt-4 h-px w-24 bg-[#b99869]/70" />
        <h1 className="font-story mt-6 text-3xl font-bold text-[#422a1d]">{stage === "records" ? "되찾은 다섯 기록" : "광천의 기억 지도"}</h1>
        <p className="font-story mt-4 break-keep text-sm leading-7 text-[#765a44]">
          {stage === "records"
            ? "서로 다른 장소에서 찾은 기록을 모았습니다.\n이 순서는 역사의 연대순이 아닙니다."
            : "서로 다른 장소의 기억들이\n하나의 광천 안에서 이어져 있었다."}
        </p>
      </header>

      <div className="flex-1 py-7">
        {stage === "records" ? <RecordCollection records={records} /> : <MemoryNetwork records={records} />}
      </div>

      <div className="flex flex-col gap-3 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <button type="button" onClick={() => { if (stage === "records") setStage("map"); else { setDialogueIndex(0); setStage("closing"); } }} className={paperButtonClassName}>
          {stage === "records" ? "기억 이어보기" : "계속"}
        </button>
        <button type="button" onClick={() => setStage(stage === "records" ? "opening" : "records")} className="min-h-12 text-sm font-semibold text-[#795238] underline underline-offset-4">이전</button>
      </div>
    </main>
  );
}
