import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryRecordScreen from "../../story/record-screen";

const mission = missions.tunnel;

export const metadata: Metadata = {
  title: `복원된 기록 | ${mission.title} | 이야기 보부상`,
  description: "세 번째 이야기의 복원된 기록",
};

export default function TunnelRecordPage() {
  return <StoryRecordScreen mission={mission} />;
}
