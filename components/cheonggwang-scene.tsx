import Image from "next/image";
import type { ReactNode } from "react";

export type CheonggwangCardKind = "general" | "choices" | "name-input" | "correct" | "wrong";

export function CheonggwangCard({
  dialogue,
  kind = "general",
  children,
}: {
  dialogue: string;
  kind?: CheonggwangCardKind;
  children?: ReactNode;
}) {
  return (
    <article className="cheonggwang-card" data-kind={kind}>
      <h2 className="cheonggwang-card-name font-story">천광</h2>
      <span aria-hidden="true" className="cheonggwang-card-divider" />
      <p aria-live="polite" className="cheonggwang-card-dialogue font-story">{dialogue}</p>
      {children}
    </article>
  );
}

type CheonggwangSceneProps = {
  dialogue: string;
  kind?: CheonggwangCardKind;
  cardContent?: ReactNode;
  choices?: ReactNode;
  afterCard?: ReactNode;
  actions?: ReactNode;
};

export default function CheonggwangScene({
  dialogue,
  kind = "general",
  cardContent,
  choices,
  afterCard,
  actions,
}: CheonggwangSceneProps) {
  return (
    <section className="cheonggwang-scene" aria-label="천광과의 대화">
      <header className="cheonggwang-scene-logo">
        <Image src="/images/ui/title-logo.png" alt="이야기 보부상" width={1774} height={887} priority className="h-auto w-full" />
      </header>

      {/* 실제 천광 이미지가 준비되면 이 영역을 비율을 유지하는 Image로 교체합니다. */}
      <div role="img" aria-label="천광 이미지가 들어갈 자리" className="cheonggwang-portrait">
        <span aria-hidden="true" className="cheonggwang-portrait-head" />
        <span aria-hidden="true" className="cheonggwang-portrait-body" />
        <span className="cheonggwang-portrait-caption">천광 이미지 자리</span>
      </div>

      <CheonggwangCard dialogue={dialogue} kind={kind}>{cardContent}</CheonggwangCard>

      {choices && <div className="cheonggwang-choices">{choices}</div>}
      {afterCard}
      {actions && <div className="cheonggwang-actions">{actions}</div>}
    </section>
  );
}
