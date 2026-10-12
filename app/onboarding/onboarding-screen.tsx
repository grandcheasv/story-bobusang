"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import CheonggwangScene, { type CheonggwangCardKind } from "../../components/cheonggwang-scene";

const prologueScenes = [
  {
    paragraphs: [
      "2026년.",
      "전국 곳곳에서 이상한 현상이\n보고되기 시작했다.",
      "익숙했던 길,\n오래된 약속,\n한때 분명했던 기억들이",
      "아무 이유 없이\n흐려지기 시작한 것이다.",
      "사람들은 이 현상을",
      "'망각'",
      "이라 불렀다.",
    ],
    nextLabel: "계속",
  },
  {
    paragraphs: [
      "이상한 것은 따로 있었다.",
      "사람들의 기억은 사라져도\n그 기억이 머물렀던 장소에는\n흔적이 남아 있었다.",
      "오래된 표식,\n물건,\n기록,",
      "그리고 누군가의 이야기 속에.",
    ],
    nextLabel: "계속",
  },
  {
    paragraphs: [
      "그리고 오래전부터\n그 흔적을 찾아다니는 사람들이 있었다.",
      "보부상의 정신을 이어\n지역 곳곳에 흩어진 이야기를 찾아내고,",
      "사라진 기억을 되돌리는 사람들.",
      "그들의 이름은",
      "'이야기 보부상'.",
      "그리고 이번에\n새로운 망각이 발견된 곳은—",
      "광천.",
      "그날,\n광천 접에 새로운 신입 보부상 한 명이 도착했다.",
    ],
    nextLabel: "광천 접으로 들어가기",
  },
] as const;

const cheonggwangScenes = [
  "……왔군.\n\n자네가 이번에 배정된\n신입 보부상인가?",
  "내 소개가 늦었군.\n\n나는 이야기 보부상\n광천 접의 영수,\n천광이라 하네.\n\n이곳 광천에서 발생한 망각을\n조사하고 있지.",
  "상황이 썩 좋지는 않네.\n\n기억의 흔적은 시간이 지나면\n점점 희미해지거든.\n\n그러니 본격적으로 시작하기 전에 묻겠네.\n\n자네,\n보부상이 될 준비는 되었나?",
] as const;

const readinessDialogues = {
  ready: "좋네.\n\n하지만 말로만 준비됐다고 하는 건\n누구나 할 수 있지.\n\n현장에 내보내기 전에\n몇 가지만 확인하겠네.",
  notReady: "그렇다면 서두르지 말게.\n\n현장에 나선 뒤에\n빠진 물건을 알아차리는 것만큼\n난감한 일도 없으니까.\n\n지급받은 물품들을\n다시 한번 살펴보게.\n\n준비가 끝났다면\n내게 알려주게.",
  readyAfterWaiting: "좋네.\n\n그렇다면 현장에 나가기 전에\n몇 가지만 확인하겠네.",
  waiting: "좋네.\n\n준비가 되기 전에 움직이지 않는 것도\n보부상에게 필요한 판단이지.\n\n천천히 확인하게.\n나는 여기서 기다리고 있겠네.",
  beforeName: "흠, 이 정도면 됐네.\n\n자네를 현장에 내보내도 되겠어.\n\n이제 자네의 험표를 만들 차례군.\n\n험표에 새길 이름을 알려주게.",
} as const;

const readinessQuestions = [
  {
    question: "좋아.\n첫 번째부터 확인하지.\n\n보부상이라면 자신이\n어디에 와 있는지는 알고 있어야 하네.\n\n지금 우리가 있는 곳은 어디인가?",
    options: ["충청남도 홍성군 광천읍", "전라남도 담양군 창평면", "경상북도 안동시 풍천면"],
    correctAnswer: 0,
    successMessage: "맞네.\n충청남도 홍성군 광천읍.\n\n앞으로 자네가\n기억을 찾아다닐 곳이지.",
    wrongMessage: "아직 첫걸음도 떼지 않았는데\n길부터 잃어버리면 곤란하지.\n\n다시 한번 생각해보게.",
  },
  {
    question: "두 번째일세.\n\n예부터 장터와 마을을 오가며\n지게나 봇짐에 물건을 싣고\n장사하던 이들을 무엇이라 불렀는가?",
    options: ["암행어사", "보부상", "화전민"],
    correctAnswer: 1,
    successMessage: "그렇지.\n보부상.\n\n물건을 지고 곳곳을 오갔던 사람들이지.\n\n우리 '이야기 보부상'의 이름도\n바로 거기서 시작됐네.",
    wrongMessage: "그 이름은 아니네.\n\n우리가 누구의 정신을 이어가고 있는지\n다시 한번 생각해보게.",
  },
  {
    question: "마지막 질문이네.\n\n보부상이 자신이 누구인지 증명하기 위해 지녔던\n신분 증표를 우리는 무엇이라 부르고 있는가?",
    options: ["험표", "주민등록증", "호패"],
    correctAnswer: 0,
    successMessage: "정확하네.\n험표.\n\n보부상에게 자신의 신분을 증명하는\n표식이 있다면,\n\n신입인 자네에게도\n하나 필요하겠지.",
    wrongMessage: "아직 그 이름은 아니네.\n\n우리가 신입 보부상에게 건넬\n증표의 이름을 다시 생각해보게.",
  },
] as const;

const issuanceStages = [
  { progress: 0, message: "신원 확인 중…" },
  { progress: 30, message: "광천 접 등록 중…" },
  { progress: 65, message: "험표에 이름을 새기는 중…" },
  { progress: 90, message: "험표에 이름을 새기는 중…" },
  { progress: 100, message: "신입 이야기 보부상 등록 완료" },
] as const;

type OnboardingStep =
  | { kind: "story"; index: number }
  | { kind: "ready"; afterWaiting: boolean }
  | { kind: "not-ready"; waiting: boolean }
  | { kind: "quiz"; index: number; result: "question" | "wrong" | "correct" }
  | { kind: "before-name" }
  | { kind: "name-confirmation" }
  | { kind: "issuing" };

const primaryButtonClassName =
  "story-button-primary flex min-h-20 min-w-0 flex-1 items-center justify-center px-4 text-center text-base font-semibold leading-6 transition-transform active:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

const secondaryButtonClassName =
  "story-button-secondary flex min-h-20 items-center justify-center px-4 text-center text-base font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function OnboardingScreen() {
  const [step, setStep] = useState<OnboardingStep>({ kind: "story", index: 0 });
  const [history, setHistory] = useState<OnboardingStep[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [confirmedName, setConfirmedName] = useState("");
  const [nameError, setNameError] = useState<"empty" | "storage" | null>(null);
  const [issuanceIndex, setIssuanceIndex] = useState(0);

  useEffect(() => {
    try {
      setNameInput(window.localStorage.getItem("bobusangName") ?? "");
    } catch {
      // 이름 입력 자체는 저장소를 읽을 수 없어도 사용할 수 있습니다.
    }
  }, []);

  useEffect(() => {
    if (step.kind !== "issuing") return;

    const timers = issuanceStages.slice(1).map((_, index) =>
      window.setTimeout(() => setIssuanceIndex(index + 1), (index + 1) * 600),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [step.kind]);

  function moveTo(next: OnboardingStep) {
    setHistory((current) => [...current, step]);
    setStep(next);
  }

  function goBack() {
    const previous = history.at(-1);
    if (!previous) return;

    setHistory((current) => current.slice(0, -1));
    setStep(
      step.kind === "quiz" && previous.kind === "quiz"
        ? { ...previous, result: "question" }
        : previous,
    );
  }

  function goNext() {
    if (step.kind === "story" && step.index < prologueScenes.length + cheonggwangScenes.length - 1) {
      moveTo({ kind: "story", index: step.index + 1 });
    } else if (step.kind === "ready") {
      moveTo({ kind: "quiz", index: 0, result: "question" });
    } else if (step.kind === "quiz" && step.result === "correct") {
      moveTo(
        step.index < readinessQuestions.length - 1
          ? { kind: "quiz", index: step.index + 1, result: "question" }
          : { kind: "before-name" },
      );
    }
  }

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = nameInput.trim();
    if (!name) {
      setNameError("empty");
      return;
    }

    try {
      window.localStorage.setItem("bobusangName", name);
    } catch {
      setNameError("storage");
      return;
    }

    setNameInput(name);
    setConfirmedName(name);
    setNameError(null);
    moveTo({ kind: "name-confirmation" });
  }

  const prologue = step.kind === "story" && step.index < prologueScenes.length
    ? prologueScenes[step.index]
    : null;
  const question = step.kind === "quiz" ? readinessQuestions[step.index] : null;

  let dialogue: string | null = null;
  if (step.kind === "story" && !prologue) {
    dialogue = cheonggwangScenes[step.index - prologueScenes.length];
  } else if (step.kind === "ready") {
    dialogue = step.afterWaiting ? readinessDialogues.readyAfterWaiting : readinessDialogues.ready;
  } else if (step.kind === "not-ready") {
    dialogue = step.waiting ? readinessDialogues.waiting : readinessDialogues.notReady;
  } else if (step.kind === "quiz" && question) {
    dialogue = step.result === "correct"
      ? question.successMessage
      : step.result === "wrong"
        ? question.wrongMessage
        : question.question;
  } else if (step.kind === "before-name") {
    dialogue = nameError === "empty" ? "험표에 새길 이름을 알려주게." : readinessDialogues.beforeName;
  } else if (step.kind === "name-confirmation") {
    dialogue = `${confirmedName} 보부상.\n\n확인했네.\n\n그럼 지금부터 자네를\n광천 접의 신입 이야기 보부상으로 등록하지.`;
  }

  const issuance = issuanceStages[issuanceIndex];

  const nextLabel = step.kind === "story"
    ? prologue?.nextLabel ?? "계속"
    : step.kind === "ready"
      ? "확인하겠습니다"
      : step.kind === "quiz" && step.result === "correct"
        ? step.index === readinessQuestions.length - 1 ? "계속" : "다음 질문"
        : null;

  const previousButton = (
    <button type="button" onClick={goBack} className={secondaryButtonClassName + " w-40 self-start"}>이전</button>
  );

  const choiceButtons = step.kind === "story" && step.index === prologueScenes.length + cheonggwangScenes.length - 1 ? (
    <>
      <button type="button" onClick={() => moveTo({ kind: "ready", afterWaiting: false })} className={primaryButtonClassName}>예. 준비되었습니다.</button>
      <button type="button" onClick={() => moveTo({ kind: "not-ready", waiting: false })} className={secondaryButtonClassName}>아직 준비되지 않았습니다.</button>
    </>
  ) : step.kind === "not-ready" ? (
    <>
      <button type="button" onClick={() => moveTo({ kind: "ready", afterWaiting: true })} className={primaryButtonClassName}>예. 이제 준비되었습니다.</button>
      <button type="button" onClick={() => { if (!step.waiting) moveTo({ kind: "not-ready", waiting: true }); }} className={secondaryButtonClassName}>아직 조금 더 확인하겠습니다.</button>
    </>
  ) : step.kind === "quiz" && question && step.result !== "correct" ? (
    <div className="flex flex-col gap-3" aria-label={"준비 확인 질문 " + (step.index + 1) + " 선택지"}>
      {question.options.map((option, index) => (
        <button key={option} type="button" onClick={() => setStep({ ...step, result: index === question.correctAnswer ? "correct" : "wrong" })}
          className="flex min-h-16 w-full items-center gap-4 rounded-md border border-[#a88966] bg-[#fff8e9]/90 px-5 py-3 text-left text-base font-semibold leading-6 text-[#68472f] transition-colors active:bg-[#f0e0c1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]">
          <span className="font-story text-lg text-[#8b5635]">{String.fromCharCode(65 + index)}.</span>
          <span>{option}</span>
        </button>
      ))}
    </div>
  ) : null;

  const actionButtons = choiceButtons ? (
    history.length > 0 ? previousButton : null
  ) : step.kind === "name-confirmation" ? (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={() => { setIssuanceIndex(0); moveTo({ kind: "issuing" }); }} className={primaryButtonClassName}>험표 발급하기</button>
      <button type="button" onClick={goBack} className={secondaryButtonClassName}>이름 다시 입력하기</button>
    </div>
  ) : step.kind === "issuing" ? (
    issuance.progress === 100 ? <Link href="/permit" className={primaryButtonClassName}>내 험표 확인하기</Link> : null
  ) : nextLabel ? (
    <div className="flex flex-col-reverse items-start gap-1">
      {history.length > 0 && previousButton}
      <button type="button" onClick={goNext} className={primaryButtonClassName + " w-full"}>{nextLabel}</button>
    </div>
  ) : history.length > 0 ? previousButton : null;

  const cardKind: CheonggwangCardKind = step.kind === "before-name" ? "name-input"
    : step.kind === "quiz" && step.result === "correct" ? "correct"
    : step.kind === "quiz" && step.result === "wrong" ? "wrong"
    : choiceButtons ? "choices" : "general";

  if (!prologue && step.kind !== "issuing") {
    return (
      <main className="story-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 text-[#30271f] shadow-[0_0_50px_rgba(74,48,34,0.13)]">
        <CheonggwangScene key={JSON.stringify(step)} dialogue={dialogue ?? ""} kind={cardKind} choices={choiceButtons}
          cardContent={step.kind === "before-name" ? (
            <form onSubmit={submitName} className="mt-6 border-t border-[#bda586] pt-5">
              <label htmlFor="bobusang-name" className="block text-sm font-bold text-[#68472f]">보부상 이름</label>
              <input id="bobusang-name" type="text" value={nameInput}
                onChange={(event) => { setNameInput(event.target.value); setNameError(null); }}
                placeholder="이름 또는 별칭을 입력하세요" aria-invalid={nameError !== null}
                aria-describedby={nameError === "storage" ? "name-storage-error" : undefined}
                className="mt-3 min-h-14 w-full rounded-md border border-[#a88966] bg-[#fffdf5] px-4 text-base text-[#422a1d] placeholder:text-[#9f8a74] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635]" />
              {nameError === "storage" && <p id="name-storage-error" role="alert" className="mt-3 text-sm text-[#8b5635]">이름을 저장하지 못했습니다. 브라우저 저장 공간을 확인해주세요.</p>}
              <button type="submit" className={primaryButtonClassName + " mt-5 w-full"}>이 이름으로 등록</button>
            </form>
          ) : undefined}
          actions={actionButtons} />
      </main>
    );
  }

  return (
    <main className="story-surface mx-auto flex min-h-dvh w-full max-w-[440px] flex-col border-x border-[#d8c5a4]/70 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="pt-2 text-center">
        <h1 className="font-story text-2xl font-bold tracking-[-0.05em] text-[#422a1d]">이야기 보부상</h1>
        <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 text-[#a77645]">
          <span className="h-px w-11 bg-current opacity-60" /><span className="text-sm leading-none">✦</span><span className="h-px w-11 bg-current opacity-60" />
        </div>
      </header>
      <section className="flex flex-1 flex-col py-6" aria-label={prologue ? "세계관 프롤로그" : "험표 발급"}>
        {prologue ? (
          <article className="mx-auto w-full max-w-[370px] border border-[#c9ad83] bg-[#fff8e9]/75 px-6 py-7 shadow-[0_8px_24px_rgba(74,48,34,0.08)] sm:px-7">
            <div className="flex items-center justify-between border-b border-[#c9ad83] pb-4 text-[11px] font-bold tracking-[0.16em] text-[#9a6740]">
              <span>망각 현상 기록</span><span>{String(step.kind === "story" ? step.index + 1 : 0).padStart(2, "0")} / 03</span>
            </div>
            <div aria-live="polite" className="font-story space-y-5 pt-7 text-[1.05rem] font-bold leading-8 text-[#422a1d]">
              {prologue.paragraphs.map((paragraph, index) => (
                <p key={index} className={"whitespace-pre-line break-keep " + (paragraph === "'망각'" || paragraph === "'이야기 보부상'." || paragraph === "광천." ? "text-xl text-[#8b5635]" : "")}>{paragraph}</p>
              ))}
            </div>
          </article>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            <div className="w-full border border-[#c9ad83] bg-[#fff8e9]/85 px-6 py-9 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="text-xs font-bold tracking-[0.18em] text-[#9a6740]">광천 접 · 신입 보부상 등록</p>
              <div aria-hidden="true" className="mx-auto mt-7 flex size-24 rotate-[-9deg] items-center justify-center rounded-full border-4 border-double border-[#9a6740]/70 text-center font-story text-xl font-bold leading-6 text-[#8b5635]">광천<br />접</div>
              <h2 className="font-story mt-7 text-2xl font-bold text-[#422a1d]">{issuance.progress === 100 ? "험표 발급 완료" : "험표 발급 중"}</h2>
              <p aria-live="polite" className="mt-4 min-h-7 font-story text-base font-bold text-[#68472f]">{issuance.message}</p>
              <div role="progressbar" aria-label="험표 발급 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={issuance.progress} className="mt-7 h-3 overflow-hidden border border-[#a88966] bg-[#ead8b8] p-[2px]">
                <div className="h-full bg-[#8b5635] transition-[width] duration-500 ease-out" style={{ width: issuance.progress + "%" }} />
              </div>
              <p className="mt-3 text-right text-sm font-bold tabular-nums text-[#68472f]">{issuance.progress}%</p>
            </div>
          </div>
        )}
      </section>
      <div className="mt-auto pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">{actionButtons}</div>
    </main>
  );
}
