"use client";

import Image from "next/image";
import { useState } from "react";
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

function CheonggwangPortrait() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div role="img" aria-label="천광의 초상" className="cheonggwang-portrait">
      {imageFailed ? (
        <>
          <span aria-hidden="true" className="cheonggwang-portrait-head" />
          <span aria-hidden="true" className="cheonggwang-portrait-body" />
          <span className="cheonggwang-portrait-caption">천광 이미지 자리</span>
        </>
      ) : (
        <Image
          src="/images/characters/cheongwang.png"
          alt=""
          fill
          sizes="(max-width: 440px) 40vw, 176px"
          loading="eager"
          className="cheonggwang-portrait-image"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}

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

      <CheonggwangPortrait />

      <CheonggwangCard dialogue={dialogue} kind={kind}>{cardContent}</CheonggwangCard>

      {choices && <div className="cheonggwang-choices">{choices}</div>}
      {afterCard}
      {actions && <div className="cheonggwang-actions">{actions}</div>}
    </section>
  );
}
