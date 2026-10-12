import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import MissionPlayScreen from "../../mission-play-screen";

const mission = missions.exhibition;

export const metadata: Metadata = {
  title: `현장 미션 | ${mission.title} | 이야기 보부상`,
  description: `${mission.location}에서 현장의 흔적을 찾는 미션`,
};

export default function ExhibitionMissionPlayPage() {
  return <MissionPlayScreen mission={mission} />;
}
