import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryNextScreen from "../../story/next-screen";

const mission = missions.exhibition;

export const metadata: Metadata = {
  title: `다음 이야기 | ${mission.title} | 이야기 보부상`,
  description: "옛 옹암포구로 이어지는 네 번째 이야기",
};

export default function ExhibitionNextPage() {
  return <StoryNextScreen mission={mission} />;
}
