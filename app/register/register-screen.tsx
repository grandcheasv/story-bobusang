"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Feedback = "empty" | "saved" | "storage-error" | null;

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    try {
      const savedName = window.localStorage.getItem("bobusangName");
      if (savedName) setName(savedName);
    } catch {
      setFeedback("storage-error");
    }
  }, []);

  function handleRegister() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setFeedback("empty");
      return;
    }

    try {
      window.localStorage.setItem("bobusangName", trimmedName);
      setName(trimmedName);
      setFeedback("saved");
      router.push("/permit");
    } catch {
      setFeedback("storage-error");
    }
  }

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center gap-2 rounded-lg pr-3 text-sm font-semibold text-[#76533b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5635]"
        >
          <span aria-hidden="true" className="text-2xl leading-none">‹</span>
          뒤로가기
        </Link>
      </header>

      <section className="flex flex-1 flex-col pt-2 sm:pt-20">
        <div aria-hidden="true" className="mb-4 flex items-center gap-3 text-[#a77645]">
          <span className="size-2 rotate-45 border border-current" />
          <span className="h-px w-16 bg-current opacity-60" />
        </div>

        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#9a6740]">새로운 여정의 첫걸음</p>
        <h1 className="font-story max-w-[21rem] break-keep text-[clamp(2rem,8.5vw,2.55rem)] font-bold leading-[1.35] tracking-[-0.07em] text-[#422a1d]">
          신입 보부상의 이름을 알려주세요.
        </h1>
        <p className="mt-4 max-w-[19rem] break-keep text-balance text-base leading-7 text-[#765a44]">
          앞으로 천광이 당신을 이 이름으로 부르게 됩니다.
        </p>

        <div className="mt-8">
          <label htmlFor="peddler-name" className="mb-2 block text-sm font-semibold text-[#593823]">
            보부상 이름
          </label>
          <input
            id="peddler-name"
            name="peddlerName"
            type="text"
            autoComplete="off"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setFeedback(null);
            }}
            aria-invalid={feedback === "empty"}
            aria-describedby={feedback ? "name-feedback" : undefined}
            className="min-h-15 w-full rounded-xl border border-[#c9b18f] bg-[#fffaf0]/85 px-4 text-base text-[#422a1d] outline-none placeholder:text-[#a9977f] focus:border-[#8b5635] focus:ring-2 focus:ring-[#8b5635]/20"
          />
          {feedback && (
            <p
              id="name-feedback"
              role={feedback === "saved" ? "status" : "alert"}
              className="mt-3 text-sm leading-6 text-[#76533b]"
            >
              {feedback === "empty"
                ? "보부상 이름을 입력해주세요."
                : feedback === "saved"
                  ? "보부상 이름이 등록되었습니다."
                  : "이름을 저장하지 못했습니다. 브라우저 설정을 확인해주세요."}
            </p>
          )}
        </div>
      </section>

      <button
        type="button"
        onClick={handleRegister}
        className="mt-5 flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]"
      >
        등록하기
      </button>
    </main>
  );
}
