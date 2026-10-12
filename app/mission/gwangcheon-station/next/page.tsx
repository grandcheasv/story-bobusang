import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryNextScreen from "../../story/next-screen";

const mission = missions["gwangcheon-station"];

export const metadata: Metadata = {
  title: `다음 이야기 | ${mission.title} | 이야기 보부상`,
  description: "토굴로 이어지는 두 번째 이야기",
};

export default function GwangcheonStationNextPage() {
  return <StoryNextScreen mission={mission} />;
}
