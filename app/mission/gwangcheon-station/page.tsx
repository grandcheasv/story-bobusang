import type { Metadata } from "next";
import { missions } from "../../../data/missions";
import MissionScreen from "../mission-screen";

const mission = missions["gwangcheon-station"];

export const metadata: Metadata = {
  title: `${mission.title} | 이야기 보부상`,
  description: `${mission.location}에서 시작하는 두 번째 임무`,
};

export default function GwangcheonStationMissionPage() {
  return <MissionScreen mission={mission} />;
}
