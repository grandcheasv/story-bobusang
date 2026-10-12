import type { Metadata } from "next";
import { missions } from "../../../data/missions";
import MissionScreen from "../mission-screen";

const mission = missions.exhibition;

export const metadata: Metadata = {
  title: `${mission.title} | 이야기 보부상`,
  description: `${mission.location}에서 시작하는 네 번째 임무`,
};

export default function ExhibitionMissionPage() {
  return <MissionScreen mission={mission} />;
}
