import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryIncidentScreen from "../../story/incident-screen";

const mission = missions.exhibition;

export const metadata: Metadata = {
  title: `사건 기록 | ${mission.title} | 이야기 보부상`,
  description: "네 번째 이야기의 사건 기록",
};

export default function ExhibitionIncidentPage() {
  return <StoryIncidentScreen mission={mission} />;
}
