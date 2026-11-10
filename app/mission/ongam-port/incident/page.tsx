import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryIncidentScreen from "../../story/incident-screen";

const mission = missions["ongam-port"];

export const metadata: Metadata = {
  title: `현장 안내 | ${mission.title} | 이야기 보부상`,
  description: "마지막 이야기의 현장 안내",
};

export default function OngamPortIncidentPage() {
  return <StoryIncidentScreen mission={mission} />;
}
