import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryRecordScreen from "../../story/record-screen";

const mission = missions.exhibition;

export const metadata: Metadata = {
  title: `복원된 기록 | ${mission.title} | 이야기 보부상`,
  description: "네 번째 이야기의 복원된 기록",
};

export default function ExhibitionRecordPage() {
  return <StoryRecordScreen mission={mission} />;
}
