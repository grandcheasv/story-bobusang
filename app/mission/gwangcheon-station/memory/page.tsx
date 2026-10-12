import type { Metadata } from "next";
import { missions } from "../../../../data/missions";
import MissionMemoryScreen from "../../mission-memory-screen";

const mission = missions["gwangcheon-station"];

export const metadata: Metadata = {
  title: `${mission.memoryTitle} | 이야기 보부상`,
  description: `${mission.location}의 기억 복원 이야기`,
};

export default function GwangcheonStationMissionMemoryPage() {
  return (
    <MissionMemoryScreen
      mission={{
        id: mission.id,
        number: mission.number,
        storyLabel: mission.storyLabel,
        memoryTitle: mission.memoryTitle,
        memoryStory: mission.memoryStory,
        memoryMessage: mission.memoryMessage,
        memoryRecordFactLabel: mission.memoryRecordFactLabel,
        memoryRecordFactValue: mission.memoryRecordFactValue,
        nextMissionId: mission.nextMissionId,
      }}
    />
  );
}
