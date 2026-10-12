"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { PlayableMission } from "../../data/missions";
import { CheonggwangCard } from "../../components/cheonggwang-scene";
import { solvedMissionKey } from "../../lib/mission-progress";

type MissionPlayScreenProps = {
  mission: PlayableMission;
};

type Feedback = "empty" | "incorrect" | "correct" | null;

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

export default function MissionPlayScreen({ mission }: MissionPlayScreenProps) {
  const router = useRouter();
  const [answerInput, setAnswerInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAdditionalHint, setShowAdditionalHint] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [storageError, setStorageError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submittedAnswer = normalizeAnswer(answerInput);
    if (!submittedAnswer) {
      setFeedback("empty");
      return;
    }

    const comparableAnswer = mission.id === "mokju" || mission.id === "ongam-port"
      ? submittedAnswer.replace(/년$/, "")
      : mission.id === "gwangcheon-station"
        ? submittedAnswer.replace(/역$/, "")
        : mission.id === "exhibition"
          ? submittedAnswer.replace(/입니다$/, "")
        : submittedAnswer;
    const isCorrect = mission.id === "tunnel"
      ? comparableAnswer.includes(normalizeAnswer(mission.answer))
      : comparableAnswer === normalizeAnswer(mission.answer);
    setFeedback(isCorrect ? "correct" : "incorrect");
  }

  function handleRestore() {
    if (mission.storyLabel) {
      try {
        window.sessionStorage.setItem(solvedMissionKey(mission.id), "true");
        router.push(`/mission/${mission.id}/record`);
      } catch {
        setStorageError(true);
      }
      return;
    }

    try {
      window.sessionStorage.setItem(solvedMissionKey(mission.id), "true");
      router.push(`/mission/${mission.id}/memory`);
    } catch {
      setStorageError(true);
    }
  }

  if (mission.storyLabel && feedback !== "correct") {
    return (
      <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
        <header>
          <Link href={`/mission/${mission.id}/incident`} className="inline-flex min-h-12 items-center gap-3 text-xs font-bold tracking-[0.12em] text-[#785036]">
            <span aria-hidden="true" className="text-xl font-normal leading-none">←</span>
            {mission.storyLabel}
          </Link>
          <div aria-hidden="true" className="mt-2 h-px w-full bg-[#b99869]/70" />
          <h1 className="font-story mt-7 break-keep text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-tight tracking-[-0.05em] text-[#422a1d]">{mission.title}</h1>
        </header>

        <section className="flex flex-1 flex-col justify-center py-7">
          <p className="font-story whitespace-pre-line break-keep text-[1.05rem] leading-8 text-[#422a1d]">{mission.question}</p>
          <form onSubmit={handleSubmit} className="mt-7">
            <label htmlFor="mission-answer" className="block text-sm font-semibold text-[#68472f]">{mission.answerLabel}</label>
            <input id="mission-answer" name="answer" type="text" value={answerInput}
              onChange={(event) => { setAnswerInput(event.target.value); setFeedback(null); }}
              autoComplete="off" spellCheck={false} aria-invalid={feedback === "empty" || feedback === "incorrect"}
              aria-describedby={feedback === "empty" ? "answer-feedback" : undefined}
              placeholder={mission.answerPlaceholder}
              className="mt-3 min-h-14 w-full rounded-xl border border-[#b99b75] bg-[#fffbf0] px-4 text-lg font-medium text-[#422a1d] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#9b856d] focus:border-[#765033] focus:ring-2 focus:ring-[#b99b75]/45" />
            {feedback === "empty" && <p id="answer-feedback" role="alert" className="mt-3 text-sm text-[#92503d]">정답을 입력해주세요.</p>}
            <button type="submit" className="mt-6 flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)]">정답 확인</button>
          </form>

          <button type="button" onClick={() => setShowHint((current) => !current)} aria-expanded={showHint} aria-controls="mission-hint"
            className="mt-4 min-h-12 self-center rounded-lg px-4 text-sm font-semibold text-[#795238] underline decoration-[#b99b75] underline-offset-4">
            {showHint ? "힌트 숨기기" : "힌트 보기"}
          </button>
          {(showHint || feedback === "incorrect") && (
            <div className="mt-5 flex flex-col items-center gap-4">
              {feedback === "incorrect" && <div role="alert" className="flex w-full justify-center"><CheonggwangCard dialogue={mission.incorrectMessage} kind="wrong" /></div>}
              {showHint && <div id="mission-hint" className="flex w-full flex-col items-center gap-3"><CheonggwangCard dialogue={mission.hint} />
                {mission.additionalHint && !showAdditionalHint && <button type="button" onClick={() => setShowAdditionalHint(true)} className="min-h-12 px-4 text-sm font-semibold text-[#795238] underline decoration-[#b99b75] underline-offset-4">추가 힌트 보기</button>}
                {mission.additionalHint && showAdditionalHint && <CheonggwangCard dialogue={mission.additionalHint} />}
              </div>}
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header>
        <Link
          href={mission.storyLabel ? `/mission/${mission.id}/incident` : `/mission/${mission.id}`}
          className="inline-flex min-h-12 items-center gap-3 rounded-lg pr-4 text-xs font-bold tracking-[0.18em] text-[#785036] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635]"
        >
          <span aria-hidden="true" className="text-xl font-normal leading-none">←</span>
          {mission.storyLabel ?? `MISSION ${String(mission.number).padStart(2, "0")}`}
        </Link>
        <div aria-hidden="true" className="mt-2 h-px w-full bg-[#b99869]/70" />
        <h1 className="font-story mt-7 break-keep text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-tight tracking-[-0.05em] text-[#422a1d]">
          {mission.storyLabel ? mission.title : "현장의 흔적을 찾아라"}
        </h1>
        {!mission.storyLabel && <p className="font-story mt-3 text-base font-bold text-[#745036]">{mission.playIntro}</p>}
      </header>

      {feedback === "correct" ? (
        <section className="flex flex-1 flex-col justify-center py-8">
          <div role="status" className="flex flex-col items-center rounded-2xl border-2 border-[#a88453] bg-[#efe0bd] px-6 py-10 text-center shadow-[inset_0_0_0_6px_rgba(255,248,231,0.65),0_12px_30px_rgba(74,48,34,0.13)]">
            <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full border-2 border-[#806040] bg-[#fff8e9] font-story text-3xl font-bold text-[#593823]">✓</span>
            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-[#97683f]">{mission.storyLabel ?? `MISSION ${String(mission.number).padStart(2, "0")}`}</p>
            <h2 className="font-story mt-3 break-keep text-2xl font-bold leading-snug text-[#422a1d]">
              {mission.successMessage}
            </h2>
            {mission.storyLabel && <p className="font-story mt-5 text-3xl font-bold text-[#593823]">{mission.answer}</p>}
          </div>
        </section>
      ) : (
        <section className="flex flex-1 flex-col justify-center py-7">
          <div className="rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-6 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">현장 문제</p>
            <p className="font-story mt-4 whitespace-pre-line break-keep text-[1.05rem] font-bold leading-8 text-[#422a1d]">
              {mission.question}
            </p>
          </div>

          <form id="mission-answer-form" onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="mission-answer" className="block text-sm font-semibold text-[#68472f]">
              {mission.answerLabel}
            </label>
            <input
              id="mission-answer"
              name="answer"
              type="text"
              value={answerInput}
              onChange={(event) => {
                setAnswerInput(event.target.value);
                setFeedback(null);
              }}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={feedback === "empty" || feedback === "incorrect"}
              aria-describedby={feedback ? "answer-feedback" : undefined}
              placeholder={mission.answerPlaceholder}
              className="mt-3 min-h-14 w-full rounded-xl border border-[#b99b75] bg-[#fffbf0] px-4 text-lg font-medium text-[#422a1d] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#9b856d] focus:border-[#765033] focus:ring-2 focus:ring-[#b99b75]/45"
            />
            {feedback && (
              <p id="answer-feedback" role="alert" className="mt-3 whitespace-pre-line break-keep text-sm leading-6 text-[#92503d]">
                {feedback === "empty"
                  ? "정답을 입력해주세요."
                  : mission.incorrectMessage}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]"
            >
              정답 제출
            </button>
          </form>

          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            aria-expanded={showHint}
            aria-controls="mission-hint"
            className="mt-3 min-h-12 self-center rounded-lg px-4 text-sm font-semibold text-[#795238] underline decoration-[#b99b75] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635]"
          >
            {showHint ? "힌트 숨기기" : "힌트 보기"}
          </button>
          {showHint && (
            <p id="mission-hint" className="mt-2 rounded-xl border border-[#d2ba95] bg-[#f5e8ce] px-5 py-4 break-keep text-sm leading-6 text-[#68472f]">
              {mission.hint}
            </p>
          )}
        </section>
      )}

      {feedback === "correct" && (
        <div>
          {storageError && (
            <p role="alert" className="mb-3 break-keep text-center text-sm text-[#92503d]">
              완료 상태를 저장할 수 없습니다. 브라우저 저장소를 확인해주세요.
            </p>
          )}
          <button
            type="button"
            onClick={mission.memoryAvailable ? handleRestore : undefined}
            className="flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]"
          >
            {mission.recordButtonLabel ?? (mission.storyLabel ? "복원된 기록 확인하기" : "기억 복원하기")}
          </button>
        </div>
      )}
    </main>
  );
}
