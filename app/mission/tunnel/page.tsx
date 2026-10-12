import type { Metadata } from "next";
import { missions } from "../../../data/missions";
import MissionScreen from "../mission-screen";

const mission = missions.tunnel;

export const metadata: Metadata = {
  title: `${mission.title} | 이야기 보부상`,
  description: `${mission.location}에서 시작하는 세 번째 임무`,
};

export default function TunnelMissionPage() {
  return <MissionScreen mission={mission} />;
}
