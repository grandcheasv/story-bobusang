import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import StoryRecordScreen from "../../story/record-screen";

export const metadata: Metadata = {
  title: "복원된 기록 | 시간을 잃어버린 목주 | 이야기 보부상",
  description: "첫 번째 이야기의 복원된 기록",
};

export default function MokjuRecordPage() {
  return <StoryRecordScreen mission={missions.mokju} />;
}
