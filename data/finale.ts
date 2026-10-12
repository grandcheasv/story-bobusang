import { missions } from "./missions";

export type FinaleRecord = {
  id: keyof typeof missions;
  place: string;
  detail: string;
  description: string;
  relationship: string;
};

// 기록 카드의 순서는 탐험 순서이며 역사적 연대나 인과관계를 뜻하지 않습니다.
export const finaleRecords: readonly FinaleRecord[] = [
  {
    id: "mokju",
    place: "광천시장",
    detail: "1926",
    description: "사람들이 모이고\n물건이 오가던 장소.",
    relationship: "사람과 물자가 모이는 장소",
  },
  {
    id: "gwangcheon-station",
    place: "광천역",
    detail: "장항선",
    description: "광천과 더 먼 지역을\n이어주던 길.",
    relationship: "광천과 다른 지역을 이어주는 길",
  },
  {
    id: "tunnel",
    place: "토굴",
    detail: "숙성",
    description: "들어온 재료에\n시간과 맛을 더한 공간.",
    relationship: "새우젓을 저장하고 숙성해온 공간",
  },
  {
    id: "exhibition",
    place: "",
    detail: "육젓",
    description: "사람들의 경험을\n구분하고 전해온 이름.",
    relationship: "광천 새우젓 문화 속에 남은 이름과 경험",
  },
  {
    id: "ongam-port",
    place: "옹암포구",
    detail: "1975",
    description: "바다와 광천을 이어주던\n사라진 길의 기억.",
    relationship: "광천과 바다를 연결했던 통로",
  },
];

// 중심인 광천에 여러 기억이 닿는 모습으로 배치합니다. 탐험 순서와 다릅니다.
export const memoryMapOrder: readonly FinaleRecord["id"][] = [
  "ongam-port",
  "gwangcheon-station",
  "mokju",
  "tunnel",
  "exhibition",
];

export const finaleOpeningDialogue =
  "좋아.\n마지막 기록까지 돌아왔어.\n\n하지만 아직 끝난 건 아니야.\n\n우리가 찾아낸 건\n다섯 개의 서로 다른 이야기가 아니거든.";

export function getFinaleClosingDialogues(name: string): readonly string[] {
  return [
    "처음에는 전부\n다른 이야기처럼 보였지?\n\n오래된 나무 기둥 하나,\n\n기차역 하나,\n\n토굴 하나,\n\n새우젓의 이름 하나,\n\n그리고 사라진 포구 하나.",
    "그런데 자네가 찾아낸 기록을\n다시 이어보면…\n\n전부 하나의 광천으로\n이어지고 있어.",
    "기억이라는 것도 그런 거야.\n\n하나만 놓고 보면\n별것 아닌 흔적처럼 보일 수 있지.\n\n하지만 서로 이어지는 순간,\n그곳의 이야기가 되네.",
    `${name} 보부상.\n\n임무는 끝났네.\n\n이제 광천 접으로 돌아오게.\n\n우리가 되찾은 이야기를\n마지막으로 기록해야 하니까.`,
  ];
}
