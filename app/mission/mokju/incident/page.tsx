import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryIncidentScreen from "../../story/incident-screen";

export const metadata: Metadata = {
  title: "사건 기록 | 시간을 잃어버린 목주 | 이야기 보부상",
  description: "첫 번째 이야기의 사건 기록",
};

export default function MokjuIncidentPage() {
  return <StoryIncidentScreen mission={missions.mokju} />;
}
