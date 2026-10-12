"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { finaleRecords } from "../../data/finale";
import { missions } from "../../data/missions";
import { getCompletedMissions, TOTAL_MISSIONS } from "../../lib/mission-progress";

// 운영 안내가 확정되면 이 문구만 수정하면 됩니다.
const rewardNotice = "이 화면을 이야기 보부상 운영자에게 보여주세요.\n완주 확인 후 리워드를 받을 수 있습니다.";

type EndingState =
  | { status: "loading" }
  | { status: "incomplete" }
  | { status: "missing-name" }
  | { status: "complete"; name: string };

export default function EndingScreen() {
  const [state, setState] = useState<EndingState>({ status: "loading" });

  useEffect(() => {
    try {
      const completed = getCompletedMissions();
      if (!Object.values(missions).every((mission) => completed.includes(mission.id))) {
        setState({ status: "incomplete" });
        return;
      }

      const name = window.localStorage.getItem("bobusangName")?.trim();
      setState(name ? { status: "complete", name } : { status: "missing-name" });
    } catch {
      setState({ status: "incomplete" });
    }
  }, []);

  if (state.status !== "complete") {
    return (
      <main className="paper-surface mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center justify-center border-x border-[#d8c5a4]/70 px-6 py-10 text-center text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
        <p className="text-xs font-bold tracking-[0.22em] text-[#9a6740]">STORY JOURNEY</p>
        <h1 className="font-story mt-5 text-2xl font-bold text-[#422a1d]">이야기 보부상</h1>
        {state.status === "loading" ? (
          <p role="status" className="mt-8 text-[#765a44]">완주 기록을 확인하고 있습니다.</p>
        ) : (
          <>
            <p role="status" className="mt-8 break-keep text-lg font-semibold leading-8 text-[#593823]">
              {state.status === "incomplete"
                ? "아직 복원하지 못한 기억이 있습니다."
                : "보부상 이름을 등록해주세요."}
            </p>
            <Link href={state.status === "incomplete" ? "/mission" : "/register"} className="mt-8 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#593823] px-5 font-semibold text-[#fff8e9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]">
              {state.status === "incomplete" ? "현재 임무로 돌아가기" : "보부상 이름 등록하기"}
            </Link>
          </>
        )}
      </main>
    );
  }

  const { name } = state;
  const completedCount = finaleRecords.length;
  const progressPercent = Math.round((completedCount / TOTAL_MISSIONS) * 100);

  return (
    <main className="paper-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="text-center">
        <p className="text-xs font-bold tracking-[0.24em] text-[#9a6740]">JOURNEY COMPLETE</p>
        <h1 className="font-story mt-5 text-3xl font-bold text-[#422a1d]">이야기 보부상</h1>
        <p className="mt-2 text-sm font-bold tracking-[0.18em] text-[#8b5635]">광천편 COMPLETE</p>
        <p className="mt-6 break-all text-lg font-semibold text-[#68472f]">{name} 보부상</p>
        <p className="font-story mt-5 whitespace-pre-line break-keep text-lg font-bold leading-8 text-[#422a1d]">광천에서 사라졌던{ "\n" }다섯 개의 기억을{ "\n" }모두 복원했습니다.</p>
        <p className="font-story mt-6 text-2xl font-bold text-[#422a1d]">{String(completedCount).padStart(2, "0")} / {String(TOTAL_MISSIONS).padStart(2, "0")}</p>
        <p className="font-story mt-2 text-5xl font-bold text-[#593823]">{progressPercent}%</p>
        <div role="progressbar" aria-label="광천편 진행률" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} className="mt-5 h-3 overflow-hidden rounded-full bg-[#d9c4a3]">
          <div className="h-full rounded-full bg-[#8f6746]" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="font-story mt-6 whitespace-pre-line text-sm leading-6 text-[#765a44]">이야기를 찾고,{"\n"}지역을 기록하는 여행</p>
      </header>

      <section aria-label="천광의 마지막 메시지" className="mt-8 rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-6 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">천광</p>
        <p className="font-story mt-4 whitespace-pre-line break-words text-base font-bold leading-8 text-[#422a1d]">
          {`${name} 보부상.\n\n자네 덕분에 광천의 기억이\n다시 제자리를 찾았네.\n\n하지만 우리가 찾아야 할 이야기는\n아직 많이 남아 있지.\n\n다음 장터에서 다시 만나세.`}
        </p>
      </section>

      <section aria-label="복원한 다섯 기록" className="mt-8 rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-5 py-5">
        <h2 className="font-story text-lg font-bold text-[#422a1d]">복원한 다섯 기록</h2>
        <ul className="mt-4 space-y-2">
          {finaleRecords.map((record) => (
            <li key={record.id} className="flex items-center gap-3 border-b border-[#d8c5a4]/70 pb-2 text-sm text-[#68472f] last:border-b-0 last:pb-0">
              <span aria-hidden="true" className="font-bold text-[#8f6746]">✓</span>
              {missions[record.id].memoryTitle}
            </li>
          ))}
        </ul>
      </section>

      <p className="font-story mt-8 break-keep text-center text-sm leading-7 text-[#765a44]">당신이 다시 찾아낸 이야기는 이제 광천의 기록으로 남습니다.</p>

      <section aria-label="완주 확인증" className="mt-9 rounded-2xl border-2 border-[#a88453] bg-[#efe0bd] p-3 shadow-[0_12px_30px_rgba(74,48,34,0.12)]">
        <div className="rounded-xl border border-dashed border-[#a88453] bg-[#fff8e9]/45 px-5 py-7 text-center">
          <h2 className="font-story text-2xl font-bold text-[#422a1d]">완주 확인증</h2>
          <p className="mt-5 break-all text-lg font-bold text-[#593823]">{name} 보부상</p>
          <p className="mt-1 text-sm text-[#765a44]">광천편</p>
          <div className="my-5 h-px bg-[#b99869]/70" />
          <p className="font-story text-3xl font-bold text-[#422a1d]">{String(completedCount).padStart(2, "0")} / {String(TOTAL_MISSIONS).padStart(2, "0")}</p>
          <p className="mt-1 text-2xl font-bold text-[#593823]">{progressPercent}%</p>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-[#8b5635]">MISSION COMPLETE</p>
        </div>
      </section>

      <section aria-label="리워드 수령 안내" className="mt-6 rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-5 py-5">
        <h2 className="font-story text-lg font-bold text-[#422a1d]">리워드 수령 안내</h2>
        <p className="mt-3 whitespace-pre-line break-keep text-sm leading-7 text-[#765a44]">{rewardNotice}</p>
      </section>
    </main>
  );
}
