import { missions } from "../data/missions";

export const TOTAL_MISSIONS = 5;

const COMPLETED_MISSIONS_KEY = "completedMissions";
const JOURNEY_STARTED_KEY = "journeyStarted";
export const LAST_MISSION_PATH_KEY = "lastMissionPath";

function getTrackableMissionId(path: string): string | null {
  const match = /^\/mission\/([a-z0-9-]+)(?:\/(play|incident))?$/.exec(path);
  if (!match || !Object.prototype.hasOwnProperty.call(missions, match[1])) return null;

  const mission = missions[match[1] as keyof typeof missions];
  if (match[2] === "play" && !mission.playAvailable) return null;
  if (match[2] === "incident" && !mission.incidentDialogues) return null;

  return match[1];
}

export function rememberMissionPath(path: string): void {
  const missionId = getTrackableMissionId(path);
  if (missionId && !getCompletedMissions().includes(missionId)) {
    window.localStorage.setItem(LAST_MISSION_PATH_KEY, path);
  }
}

export function getResumableMissionPath(): string | null {
  const path = window.localStorage.getItem(LAST_MISSION_PATH_KEY);
  const missionId = path ? getTrackableMissionId(path) : null;

  return missionId && !getCompletedMissions().includes(missionId) ? path : null;
}

export function hasJourneyStarted(): boolean {
  if (window.localStorage.getItem(JOURNEY_STARTED_KEY) === "true") return true;

  // 하단 메뉴가 없던 이전 버전에서 이미 미션을 완료한 사용자도 이어서 여행할 수 있습니다.
  if (getCompletedMissions().length > 0) {
    window.localStorage.setItem(JOURNEY_STARTED_KEY, "true");
    return true;
  }

  return false;
}

export function startJourney() {
  window.localStorage.setItem(JOURNEY_STARTED_KEY, "true");
}

export function solvedMissionKey(missionId: string) {
  return `solvedMission:${missionId}`;
}

export function reviewedRecordKey(missionId: string) {
  return `reviewedRecord:${missionId}`;
}

export function getCompletedMissions(): string[] {
  let saved: unknown;

  try {
    saved = JSON.parse(window.localStorage.getItem(COMPLETED_MISSIONS_KEY) ?? "[]");
  } catch {
    return [];
  }

  if (!Array.isArray(saved)) return [];

  return [...new Set(saved.filter((id): id is string => typeof id === "string" && id.length > 0))];
}

export function completeMission(missionId: string): string[] {
  const completed = getCompletedMissions();

  if (!completed.includes(missionId)) {
    completed.push(missionId);
    window.localStorage.setItem(COMPLETED_MISSIONS_KEY, JSON.stringify(completed));
  }

  return completed;
}
