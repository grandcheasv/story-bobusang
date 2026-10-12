import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryNextScreen from "../../story/next-screen";

const mission = missions.tunnel;

export const metadata: Metadata = {
  title: `다음 이야기 | ${mission.title} | 이야기 보부상`,
  description: "전시관으로 이어지는 세 번째 이야기",
};

export default function TunnelNextPage() {
  return <StoryNextScreen mission={mission} />;
}
