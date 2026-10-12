import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryNextScreen from "../../story/next-screen";

export const metadata: Metadata = {
  title: "다음 이야기 | 시간을 잃어버린 목주 | 이야기 보부상",
  description: "광천역으로 이어지는 첫 번째 이야기",
};

export default function MokjuNextPage() {
  return <StoryNextScreen mission={missions.mokju} />;
}
