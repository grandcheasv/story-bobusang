import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryIncidentScreen from "../../story/incident-screen";

const mission = missions["gwangcheon-station"];

export const metadata: Metadata = {
  title: `현장 안내 | ${mission.title} | 이야기 보부상`,
  description: "두 번째 이야기의 현장 안내",
};

export default function GwangcheonStationIncidentPage() {
  return <StoryIncidentScreen mission={mission} />;
}
