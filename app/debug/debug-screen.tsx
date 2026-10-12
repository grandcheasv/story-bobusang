"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LAST_MISSION_PATH_KEY, reviewedRecordKey, solvedMissionKey } from "../../lib/mission-progress";

const LOCAL_STORAGE_KEYS = ["bobusangName", "journeyStarted", "completedMissions", LAST_MISSION_PATH_KEY] as const;

type StoredValues = {
  bobusangName: string | null;
  journeyStarted: string | null;
  completedMissions: string | null;
  lastMissionPath: string | null;
};

function readStoredValues(): StoredValues {
  return {
    bobusangName: window.localStorage.getItem("bobusangName"),
    journeyStarted: window.localStorage.getItem("journeyStarted"),
    completedMissions: window.localStorage.getItem("completedMissions"),
    lastMissionPath: window.localStorage.getItem(LAST_MISSION_PATH_KEY),
  };
}

function getCompletedMissionIds(raw: string | null): string[] | null {
  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every((id) => typeof id === "string")
      ? parsed
      : null;
  } catch {
    return null;
  }
}

function clearSolvedMissionFlags() {
  const prefixes = [solvedMissionKey(""), reviewedRecordKey("")];

  for (let index = window.sessionStorage.length - 1; index >= 0; index--) {
    const key = window.sessionStorage.key(index);
    if (key && prefixes.some((prefix) => key.startsWith(prefix))) window.sessionStorage.removeItem(key);
  }
}

export default function DebugScreen() {
  const [values, setValues] = useState<StoredValues | null>(null);
  const [confirmingFullReset, setConfirmingFullReset] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setValues(readStoredValues());
    } catch {
      setError("브라우저 저장 상태를 읽을 수 없습니다.");
    }
  }, []);

  function resetProgress() {
    try {
      window.localStorage.setItem("completedMissions", "[]");
      window.localStorage.removeItem(LAST_MISSION_PATH_KEY);
      clearSolvedMissionFlags();
      setValues(readStoredValues());
      setNotice("미션 진행도가 초기화되었습니다.");
      setError("");
    } catch {
      setError("미션 진행도를 초기화하지 못했습니다. 브라우저 저장소를 확인해주세요.");
    }
  }

  function resetJourney() {
    try {
      LOCAL_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
      clearSolvedMissionFlags();
      setValues(readStoredValues());
      setConfirmingFullReset(false);
      setNotice("여정이 초기화되었습니다.");
      setError("");
    } catch {
      setError("여정을 초기화하지 못했습니다. 브라우저 저장소를 확인해주세요.");
    }
  }

  const completedIds = getCompletedMissionIds(values?.completedMissions ?? null);

  return (
    <main className="paper-surface mx-auto min-h-dvh w-full max-w-[440px] border-x border-[#d8c5a4]/70 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header>
        <p className="text-xs font-bold tracking-[0.18em] text-[#9a6740]">DEVELOPMENT</p>
        <h1 className="font-story mt-2 text-3xl font-bold text-[#422a1d]">개발 테스트</h1>
        <p className="mt-3 text-sm leading-6 text-[#765a44]">이 브라우저에 저장된 여정 상태입니다.</p>
      </header>

      <section className="mt-8 space-y-3" aria-label="현재 저장 상태">
        <div className="rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-5 py-4">
          <h2 className="text-sm font-semibold text-[#765a44]">보부상 이름</h2>
          <p className="mt-2 break-all text-lg font-bold">{values ? values.bobusangName ?? "(저장되지 않음)" : "확인 중..."}</p>
        </div>
        <div className="rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-5 py-4">
          <h2 className="text-sm font-semibold text-[#765a44]">여정 시작 여부</h2>
          <p className="mt-2 text-lg font-bold">{values ? values.journeyStarted ?? "(저장되지 않음)" : "확인 중..."}</p>
        </div>
        <div className="rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-5 py-4">
          <h2 className="text-sm font-semibold text-[#765a44]">완료한 미션</h2>
          {values === null ? (
            <p className="mt-2">확인 중...</p>
          ) : values.completedMissions === null ? (
            <p className="mt-2">(저장되지 않음)</p>
          ) : completedIds === null ? (
            <p className="mt-2 break-all">{values.completedMissions} (배열 형식이 아닙니다)</p>
          ) : completedIds.length === 0 ? (
            <p className="mt-2 font-mono text-lg font-bold">[]</p>
          ) : (
            <ul className="mt-2 space-y-1 font-mono text-sm font-semibold">
              {completedIds.map((id, index) => <li key={`${id}-${index}`} className="break-all">{id}</li>)}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-[#ccb18a] bg-[#fff8e9]/80 px-5 py-4">
          <h2 className="text-sm font-semibold text-[#765a44]">마지막 미션 위치</h2>
          <p className="mt-2 break-all font-mono text-sm font-semibold">{values ? values.lastMissionPath ?? "(저장되지 않음)" : "확인 중..."}</p>
        </div>
      </section>

      <div className="mt-8 space-y-3">
        <button type="button" onClick={resetProgress} disabled={!values} className="min-h-14 w-full rounded-xl border border-[#a88966] bg-[#fff8e9] px-4 font-semibold text-[#593823] disabled:opacity-50">
          미션 진행도만 초기화
        </button>
        <button type="button" onClick={() => { setConfirmingFullReset(true); setNotice(""); }} disabled={!values} className="min-h-14 w-full rounded-xl border border-[#8a6046] bg-[#eed9c4] px-4 font-semibold text-[#593823] disabled:opacity-50">
          여정 전체 초기화
        </button>

        {confirmingFullReset && (
          <div role="group" aria-label="여정 전체 초기화 확인" className="rounded-xl border border-[#b8916d] bg-[#fff8e9] p-4">
            <p className="break-keep text-sm font-semibold leading-6">정말 모든 테스트 진행 상황을 초기화하시겠습니까?</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setConfirmingFullReset(false)} className="min-h-12 rounded-lg border border-[#b9a083] px-3 font-semibold">취소</button>
              <button type="button" onClick={resetJourney} className="min-h-12 rounded-lg bg-[#593823] px-3 font-semibold text-[#fff8e9]">초기화 확인</button>
            </div>
          </div>
        )}

        {notice && <p role="status" className="text-center text-sm font-semibold text-[#68472f]">{notice}</p>}
        {error && <p role="alert" className="text-center text-sm text-[#92503d]">{error}</p>}

        <Link href="/" className="flex min-h-14 w-full items-center justify-center rounded-xl border border-[#4b2d1d] bg-[#593823] px-4 font-semibold text-[#fff8e9]">
          시작 화면으로 이동
        </Link>
      </div>
    </main>
  );
}
