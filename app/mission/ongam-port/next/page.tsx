import type { Metadata } from "next";
import StoryFinaleScreen from "../../story/story-finale-screen";

export const metadata: Metadata = {
  title: "광천의 기록을 잇다 | 이야기 보부상",
  description: "되찾은 다섯 기록을 연결하는 마지막 이야기",
};

export default function OngamPortNextPage() {
  return <StoryFinaleScreen />;
}
