import Link from "next/link";
import MissionMapAction from "../../components/mission-map-action";
import type { Mission } from "../../data/missions";

type MissionScreenProps = {
  mission: Mission;
};

const primaryButtonClassName =
  "flex min-h-16 w-full items-center justify-center rounded-2xl border border-[#4b2d1d] bg-[#593823] px-6 text-lg font-semibold tracking-tight text-[#fff8e9] shadow-[0_7px_0_#d1b792,0_12px_24px_rgba(74,48,34,0.16)] transition-[transform,box-shadow] active:translate-y-1 active:shadow-[0_3px_0_#d1b792,0_6px_12px_rgba(74,48,34,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b5635]";

export default function MissionScreen({ mission }: MissionScreenProps) {
  const isStoryMission = Boolean(mission.storyLabel);

  return (
    <main className="paper-surface relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col overflow-hidden border-x border-[#d8c5a4]/70 px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-[#4a3022] shadow-[0_0_50px_rgba(74,48,34,0.13)] sm:px-9">
      <header className="pt-2 text-center">
        <p className="text-xs font-bold tracking-[0.26em] text-[#97683f]">
          {mission.storyLabel ?? `MISSION ${String(mission.number).padStart(2, "0")}`}
        </p>
        <div aria-hidden="true" className="mt-3 flex items-center justify-center gap-3 text-[#a77645]">
          <span className="h-px w-11 bg-current opacity-60" />
          <span className="text-sm leading-none">✦</span>
          <span className="h-px w-11 bg-current opacity-60" />
        </div>
        <h1 className="font-story mt-5 break-keep text-[clamp(1.75rem,7vw,2.25rem)] font-bold leading-tight tracking-[-0.05em] text-[#422a1d]">
          {mission.title}
        </h1>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c7a77f] bg-[#fff8e9]/70 px-4 py-2 text-sm font-semibold text-[#745036]">
          {isStoryMission ? (
            <span aria-hidden="true">📍</span>
          ) : (
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-[#a77645]" />
          )}
          {mission.location}
        </p>
      </header>

      <section className="flex flex-1 flex-col justify-center gap-4 py-4">
        {isStoryMission ? (
          <>
            <div className="rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-5 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">지금 해야 할 일</p>
              <p className="font-story mt-4 whitespace-pre-line break-keep text-[1.05rem] font-bold leading-8 text-[#422a1d]">{mission.shortDescription}</p>
            </div>
            <div className="rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-5 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">천광</p>
              <p className="font-story mt-4 whitespace-pre-line break-keep text-[1.05rem] font-bold leading-8 text-[#422a1d]">{mission.guideMessage}</p>
            </div>
          </>
        ) : (
        <>
        {/* 실제 장소 사진이 준비되면 아래 placeholder 영역을 이미지로 교체합니다. */}
        <div
          role="img"
          aria-label={`${mission.imageName} 이미지가 들어갈 자리`}
          className="relative flex h-[clamp(9rem,24dvh,12rem)] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#b59670] bg-[#efdfc2]/80 shadow-[inset_0_0_0_8px_rgba(255,248,231,0.5),0_8px_22px_rgba(74,48,34,0.09)]"
        >
          {mission.imageDecoration === "pillar" && (
            <>
              <div aria-hidden="true" className="absolute bottom-8 top-8 w-10 rounded-t-lg border-x-4 border-[#9d7852]/45 bg-[#bc9a6c]/40 shadow-[inset_7px_0_0_rgba(255,248,231,0.18)]" />
              <div aria-hidden="true" className="absolute bottom-7 h-2 w-28 rounded-full bg-[#9d7852]/30" />
            </>
          )}
          <span className="relative mt-auto mb-4 rounded-full bg-[#fff8e9]/85 px-4 py-1.5 text-xs font-medium text-[#806349]">
            {mission.imageName} 이미지 자리
          </span>
        </div>

        <div className="rounded-2xl border border-[#ccb18a] bg-[#fff8e9]/85 px-6 py-5 shadow-[0_8px_24px_rgba(74,48,34,0.08)]">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#9a6740]">천광의 안내</p>
          <p className="font-story mt-4 whitespace-pre-line break-keep text-[1.05rem] font-bold leading-8 text-[#422a1d]">
            {mission.shortDescription}
          </p>
        </div>
        </>
        )}
      </section>

      <div className="flex flex-col gap-3">
        <MissionMapAction mapUrl={mission.mapUrl} label={isStoryMission ? "지도에서 위치 확인" : undefined} />
        {mission.playAvailable ? (
          <Link href={isStoryMission ? `/mission/${mission.id}/incident` : `/mission/${mission.id}/play`} className={primaryButtonClassName}>
            현장에 도착했습니다
          </Link>
        ) : (
          <button type="button" className={primaryButtonClassName}>
            현장에 도착했습니다
          </button>
        )}
      </div>
    </main>
  );
}
