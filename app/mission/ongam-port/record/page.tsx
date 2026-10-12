import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryRecordScreen from "../../story/record-screen";

const mission = missions["ongam-port"];

export const metadata: Metadata = {
  title: `복원된 기록 | ${mission.title} | 이야기 보부상`,
  description: "마지막 이야기의 복원된 기록",
};

export default function OngamPortRecordPage() {
  return <StoryRecordScreen mission={mission} />;
}
