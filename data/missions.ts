export type Mission = {
  id: string;
  number: number;
  title: string;
  location: string;
  shortDescription: string;
  mapUrl?: string;
  incidentVideoUrl?: string;
  guideMessage?: string;
  storyLabel?: string;
  incidentDialogues?: readonly string[];
  imageName: string;
  imageDecoration?: "pillar";
  mapLabel?: string;
  mapAvailableStatus?: string;
  playAvailable: boolean;
};

export type PlayableMission = Mission & {
  playIntro: string;
  question: string;
  answer: string;
  answerLabel: string;
  answerPlaceholder: string;
  incorrectMessage: string;
  hint: string;
  additionalHint?: string;
  successMessage: string;
  recordButtonLabel?: string;
  memoryAvailable: boolean;
};

export type RestorableMission = PlayableMission & {
  memoryVideoUrl?: string;
  recordPrompt?: string;
  memoryRecordFactLabel?: string;
  memoryRecordFactValue?: string;
  nextDialogues?: readonly string[];
  nextStoryButtonLabel?: string;
  memoryTitle: string;
  memoryStory: string;
  memoryMessage: string;
  nextMissionId?: string;
  nextMissionNotice?: string;
  endingPath?: string;
};

const mokju: RestorableMission = {
  id: "mokju",
  number: 1,
  title: "시간을 잃어버린 목주",
  location: "광천문화시장",
  shortDescription:
    "광천문화시장 안에 남아 있는\n오래된 목주를 찾아가세요.",
  guideMessage:
    "첫 번째 기억의 흔적은\n시장 안에 남아 있어.\n\n오래된 나무 기둥을 찾으면\n다시 이야기하지.",
  storyLabel: "첫 번째 이야기",
  incidentVideoUrl: "",
  incidentDialogues: [
    "이런…\n또 망각이 시작된 모양이야.",
    "저 사람은 오랫동안\n광천시장에 남아 있는 것들을\n기록해온 사람이야.\n\n목주가 어디 있는지도,\n왜 기록했는지도 기억하고 있어.\n\n그런데 시장의 시간이\n언제 시작됐는지만 잊어버렸군.",
    "다행히 목주에는\n아직 흔적이 남아 있어.\n\n현장에 남아 있는 흔적과\n지급받은 미션북을 확인해보게.\n\n답을 찾으면\n내게 알려주게.",
  ],
  mapUrl: "https://map.naver.com/p/entry/coordinates/3z2RQw,2A3ngQ,%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%ED%99%8D%EC%84%B1%EA%B5%B0%20%EA%B4%91%EC%B2%9C%EC%9D%8D%20%EA%B4%91%EC%B2%9C%EB%A6%AC%20195?c=16.25,0,0,0,dh",
  imageName: "목주",
  imageDecoration: "pillar",
  playAvailable: true,
  playIntro: "미션북에서 찾아낸 최종 정답을 입력하세요.",
  question: "미션북에서 찾아낸\n최종 정답을 입력하세요.",
  answer: "1926",
  answerLabel: "정답 입력",
  answerPlaceholder: "정답을 입력하세요",
  incorrectMessage:
    "아직 기억이 돌아오지 않았어.\n\n현장에서 확인한 흔적과\n미션북을 다시 한번 비교해봐.\n\n현장과 수첩을\n번갈아 살펴보는 게 중요해.",
  hint:
    "목주의 뒤쪽을\n자세히 살펴보게.\n\n작은 번호찰 하나가\n붙어 있을 거야.",
  successMessage: "시간의 기억을 복원했습니다.",
  memoryAvailable: true,
  memoryVideoUrl: "",
  memoryTitle: "시간의 기록",
  memoryRecordFactLabel: "광천시장 시작",
  memoryRecordFactValue: "1926년",
  memoryStory:
    "장소는 그대로 남아 있어도\n그 시간을 잊는 순간 이야기는 흐려진다.",
  memoryMessage: "좋아.\n첫 번째 시간이 돌아왔어.",
  nextDialogues: [
    "좋아.\n첫 번째 시간이 돌아왔어.",
    "1926년부터 이곳에는\n수많은 사람들이 오고 갔겠지.\n\n하지만 사람들이 광천으로 들어오는 길은\n시장길만 있었던 게 아니야.\n\n어느 순간부터 많은 사람들이\n새로운 길을 따라\n광천에 도착하기 시작했지.",
    "철길.\n\n그런데 그곳에서도\n누군가 중요한 걸 잊어버린 모양이야.\n\n다음 장소는\n광천역이야.",
  ],
  nextStoryButtonLabel: "두 번째 이야기 확인",
  nextMissionId: "gwangcheon-station",
};

const gwangcheonStation: RestorableMission = {
  id: "gwangcheon-station",
  number: 2,
  title: "목적지를 잃어버린 여행자",
  location: "광천역",
  shortDescription: "광천역으로 이동하세요.",
  guideMessage: "이번 기억의 흔적은\n광천역에 남아 있어.\n\n역에 도착하면\n다시 이야기하지.",
  storyLabel: "두 번째 이야기",
  incidentVideoUrl: "",
  incidentDialogues: [
    "또 시작됐군.\n\n이번에는 사람과 장소를 이어주던\n기억이 끊어진 모양이야.",
    "저 사람은 왜 역에 왔는지도,\n기차를 타야 한다는 것도 기억하고 있어.\n\n그런데 딱 하나.\n\n도착해야 할 곳만\n기억하지 못하고 있군.",
    "광천역에 남아 있는 흔적과\n지급받은 미션북을 함께 살펴보게.\n\n사라진 목적지를 찾으면\n내게 알려주게.",
  ],
  mapUrl: "https://map.naver.com/p/entry/place/19536086?c=15.30,0,0,0,dh&placePath=%3FbookmarkId%3D4649187607",
  imageName: "광천역",
  playAvailable: true,
  playIntro: "미션북에서 찾아낸 최종 정답을 입력하세요.",
  question: "미션북에서 찾아낸\n최종 정답을 입력하세요.",
  answer: "천안",
  answerLabel: "정답 입력",
  answerPlaceholder: "정답을 입력하세요",
  incorrectMessage: "아직 그곳은 아닌 것 같군.\n\n기차 여행에서 중요한 건\n출발점과 방향이야.\n\n광천역을 출발점으로 생각하고\n미션북의 기록을 다시 따라가보게.",
  hint: "기차 여행에서 중요한 건\n출발점과 방향이지.\n\n우선 자네가 지금 서 있는 곳부터\n다시 생각해보게.",
  additionalHint: "광천역을 출발점으로 생각하고\n미션북의 철도 해독표를\n다시 살펴보게.",
  successMessage: "길의 기억을 복원했습니다.",
  memoryAvailable: true,
  memoryVideoUrl: "",
  memoryTitle: "길의 기록",
  memoryRecordFactLabel: "광천을 이어온 철길",
  memoryRecordFactValue: "장항선",
  memoryStory: "길을 잃는다는 것은\n어디로 가야 하는지만 잊는 일이 아니다.\n\n누군가와 이어져 있던 기억도\n함께 흐려진다.",
  memoryMessage: "좋아.\n사라졌던 길이 다시 이어졌군.",
  nextDialogues: [
    "좋아.\n두 번째 기록도 돌아왔어.\n\n시간을 되찾고,\n이번에는 길도 되찾았군.",
    "그런데 광천으로 들어온 건\n사람들만이 아니었어.\n\n바다에서 잡힌 새우와 여러 물자가\n이곳으로 들어왔지.\n\n그리고 사람들은 그것을\n오래 보관할 방법을 찾아야 했어.",
    "그러면서 조금 특별한 공간을\n이용하기 시작했지.\n\n그런데 이번에는 사람들이\n왜 그곳을 사용했는지를\n잊어버린 모양이야.\n\n다음 장소는 토굴이야.",
  ],
  nextStoryButtonLabel: "세 번째 이야기 확인",
  nextMissionId: "tunnel",
};

const tunnel: RestorableMission = {
  id: "tunnel",
  number: 3,
  title: "이유를 잃어버린 토굴",
  location: "광천 토굴",
  shortDescription: "광천의 토굴로 이동하세요.",
  guideMessage: "이번 기억의 흔적은\n토굴에 남아 있어.\n\n그곳에 도착하면\n다시 이야기하지.",
  storyLabel: "세 번째 이야기",
  incidentVideoUrl: "",
  incidentDialogues: [
    "이번에는 장소를 잊은 게 아니군.\n\n토굴도 기억하고,\n새우젓을 이곳에 가져와야 한다는 것도\n기억하고 있어.",
    "그런데 그 둘을 이어주던\n이유가 사라졌어.\n\n왜 하필 이 공간이어야 했는지\n기억하지 못하는 모양이야.",
    "답은 현장에 남아 있을 거야.\n\n토굴과 지급받은 미션북을\n함께 살펴보게.\n\n이곳을 사용했던 이유를 알아내면\n내게 알려주게.",
  ],
  mapUrl: "https://map.naver.com/p/entry/coordinates/3z2xbS,2A2MAE,%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%ED%99%8D%EC%84%B1%EA%B5%B0%20%EA%B4%91%EC%B2%9C%EC%9D%8D%20%EC%98%B9%EC%95%94%EB%A6%AC%20475?c=16.89,0,0,0,dh",
  imageName: "토굴",
  mapLabel: "토굴",
  mapAvailableStatus: "진행 가능",
  playAvailable: true,
  playIntro: "미션북에서 찾아낸 최종 정답을 입력하세요.",
  question: "미션북에서 찾아낸\n최종 정답을 입력하세요.",
  answer: "숙성",
  answerLabel: "정답 입력",
  answerPlaceholder: "정답을 입력하세요",
  incorrectMessage: "아직 정확한 이유를\n찾지 못한 것 같군.\n\n새우젓을 그곳에 두는 건\n단순히 오래 보관하기 위해서만은 아니야.\n\n토굴 안에서 시간이 흐르는 동안\n새우젓에 어떤 변화가 생기는지\n다시 생각해보게.",
  hint: "토굴을 단순한 창고라고만\n생각하지 말게.\n\n새우젓이 그 안에 머무르는 동안\n무엇이 달라지는지 살펴보게.",
  additionalHint: "단순히 오래 보관하는 것과\n맛이 익어가는 것은 다른 일이야.\n\n미션북에서 새우젓의 변화와 관련된\n기록을 다시 찾아보게.",
  successMessage: "숙성의 기억을 복원했습니다.",
  memoryAvailable: true,
  memoryVideoUrl: "",
  memoryTitle: "숙성의 기록",
  memoryRecordFactLabel: "광천 새우젓을 익혀온 공간",
  memoryRecordFactValue: "토굴",
  memoryStory: "기억해야 할 것은\n무엇을 했는지만이 아니다.\n\n왜 그렇게 했는지를 잊는 순간\n그 안에 담긴 지혜도 함께 사라진다.",
  memoryMessage: "좋아.\n사라졌던 이유가 돌아왔군.",
  nextDialogues: [
    "좋아.\n세 번째 기록도 돌아왔어.\n\n이번에는 사람들이\n토굴을 이용했던 이유를 되찾았군.",
    "그런데 재미있는 건\n새우젓이라고 해서 전부 같은 새우젓은\n아니라는 거야.\n\n언제 잡힌 새우인지,\n어떻게 만들어졌는지에 따라\n서로 다른 이름으로 불리기도 하지.",
    "그런데 이번 망각은\n그 이름들까지 뒤섞어 놓은 모양이야.\n\n조금 더 자세한 기록을\n확인해봐야겠군.\n\n다음 장소는\n토굴새우젓홍보전시관이야.",
  ],
  nextStoryButtonLabel: "네 번째 이야기 확인",
  nextMissionId: "exhibition",
};

const exhibition: RestorableMission = {
  id: "exhibition",
  number: 4,
  title: "이름을 잃어버린 새우젓",
  location: "토굴새우젓홍보전시관",
  shortDescription: "토굴새우젓홍보전시관으로 이동하세요.",
  guideMessage: "이번 기억의 흔적은\n새우젓에 관한 기록 속에 남아 있어.\n\n전시관에 도착하면\n다시 이야기하지.",
  storyLabel: "네 번째 이야기",
  incidentVideoUrl: "",
  incidentDialogues: [
    "이번에는 이름이 사라졌군.\n\n기록도 남아 있고,\n특징도 기억하고 있어.\n\n그런데 그걸 무엇이라 불렀는지만\n사라진 모양이야.",
    "다행히 이번 장소에는\n새우젓에 관한 기록이 많이 남아 있어.\n\n사라진 이름을 찾는 데\n도움이 될 거야.",
    "전시관에 남아 있는 기록과\n지급받은 미션북을 함께 살펴보게.\n\n이름을 알아내면\n내게 알려주게.",
  ],
  imageName: "토굴새우젓홍보전시관",
  mapAvailableStatus: "진행 가능",
  playAvailable: true,
  playIntro: "미션북에서 찾아낸 최종 정답을 입력하세요.",
  question: "미션북에서 찾아낸\n최종 정답을 입력하세요.",
  answer: "육젓",
  answerLabel: "정답 입력",
  answerPlaceholder: "정답을 입력하세요",
  incorrectMessage: "그 이름은 우리가 찾는 기록과\n조금 다른 것 같군.\n\n중요한 건 기록에 남아 있는\n새우의 특징이야.\n\n전시관에서 새우를 잡은 시기와\n이름의 관계를 다시 확인해보게.",
  hint: "이름은 아무렇게나\n붙은 게 아닐 거야.\n\n전시관에서 새우젓의 이름이\n무엇을 기준으로 달라지는지 찾아보게.",
  additionalHint: "새우를 잡은 시기와\n각각의 이름을 비교해보게.\n\n미션북에 남은 기록과 맞는 것이\n하나 있을 거야.",
  successMessage: "이름의 기억을 복원했습니다.",
  memoryAvailable: true,
  memoryVideoUrl: "",
  memoryTitle: "이름의 기록",
  memoryRecordFactLabel: "유월에 잡은 새우로 담근 젓",
  memoryRecordFactValue: "육젓",
  memoryStory: "이름에는 그저 부르는 말만이 아니라\n\n사람들이 구분하고 기억해온\n기준과 경험이 담겨 있다.",
  memoryMessage: "좋아.\n사라졌던 이름이 돌아왔군.",
  nextDialogues: [
    "좋아.\n이번에는 사라졌던 이름까지 되찾았어.",
    "그런데 한 가지 궁금하지 않나?\n\n토굴에서 숙성된 이 새우젓의 재료는\n처음부터 이곳에 있었던 게 아니야.\n\n바다에서 잡힌 새우는\n어떤 길을 따라 광천까지 들어왔을까?",
    "지금까지 자네가 찾아간 곳들은\n아직 눈앞에 흔적이 남아 있었지.\n\n하지만 마지막은 조금 달라.\n\n기록에는 분명 존재하지만\n지금은 눈앞에서 찾을 수 없는 장소가 있거든.",
    "한때 배가 드나들고,\n수많은 사람과 물건이\n광천으로 들어오던 곳.\n\n마지막 장소,\n옛 옹암포구로 가보자.",
  ],
  nextStoryButtonLabel: "마지막 이야기 확인",
  nextMissionId: "ongam-port",
};

const ongamPort: RestorableMission = {
  id: "ongam-port",
  number: 5,
  title: "사라진 포구",
  location: "옛 옹암포구",
  shortDescription: "옛 옹암포구가 있던 곳으로 이동하세요.",
  guideMessage: "마지막 기억의 흔적은\n조금 특별한 곳에 남아 있어.\n\n지금은 예전 모습을\n찾을 수 없는 장소거든.\n\n그곳에 도착하면\n다시 이야기하지.",
  storyLabel: "마지막 이야기",
  incidentVideoUrl: "",
  incidentDialogues: [
    "이번에는 장소 자체를\n잊은 게 아니야.\n\n옹암포구가 이곳에 있었다는 것도,\n광천과 바다를 이어주던 곳이었다는 것도\n기억하고 있어.",
    "그런데 하나가 사라졌군.\n\n이 포구의 시간이\n언제 멈췄는지.\n\n장소가 사라지면\n그 마지막 순간도 함께 잊히기 쉬운 법이지.",
    "눈앞의 풍경과\n지급받은 미션북의 기록을\n함께 살펴보게.\n\n옹암포구의 마지막 시간을\n찾아주게.",
  ],
  imageName: "옛 옹암포구",
  mapAvailableStatus: "진행 가능",
  playAvailable: true,
  playIntro: "미션북에서 찾아낸 최종 정답을 입력하세요.",
  question: "미션북에서 찾아낸\n최종 정답을 입력하세요.",
  answer: "1975",
  answerLabel: "정답 입력",
  answerPlaceholder: "정답을 입력하세요",
  incorrectMessage: "아직 옹암포구의 마지막 시간과\n맞지 않는 것 같군.\n\n이번에는 장소가 아니라\n그 장소가 역할을 멈춘 시점을\n찾는 거야.\n\n옛 기록을 다시 살펴보게.",
  hint: "이번에 찾아야 하는 건\n포구가 어디에 있었는지가 아니야.\n\n그곳의 시간이\n언제까지 이어졌는지를 찾아보게.",
  additionalHint: "미션북에 남아 있는\n옛 기록의 연도들을 자세히 살펴보게.\n\n포구의 마지막과 연결되는\n기록이 있을 거야.",
  successMessage: "마지막 시간의 기억을 복원했습니다.",
  recordButtonLabel: "마지막 기록 확인하기",
  memoryAvailable: true,
  memoryVideoUrl: "",
  recordPrompt: "이곳에 남아 있던\n마지막 기록을 확인해보게.",
  memoryTitle: "마지막 시간의 기록",
  memoryRecordFactLabel: "옹암포구의 마지막 시간",
  memoryRecordFactValue: "1975년",
  memoryStory: "장소는 사라질 수 있다.\n\n하지만 누군가 그 이야기를\n다시 찾아낸다면\n\n기억까지 사라지는 것은 아니다.",
  memoryMessage: "좋아.\n마지막 시간이 돌아왔군.",
  endingPath: "/ending",
};

export const missions = {
  mokju,
  "gwangcheon-station": gwangcheonStation,
  tunnel,
  exhibition,
  "ongam-port": ongamPort,
};
