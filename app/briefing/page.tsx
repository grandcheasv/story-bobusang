import type { Metadata } from "next";
import BriefingScreen from "./briefing-screen";

export const metadata: Metadata = {
  title: "천광 브리핑 | 이야기 보부상",
  description: "첫 번째 임무를 받기 전 천광의 브리핑",
};

export default function BriefingPage() {
  return <BriefingScreen />;
}
