import type { Metadata } from "next";
import EndingScreen from "./ending-screen";

export const metadata: Metadata = {
  title: "광천편 완료 | 이야기 보부상",
  description: "광천의 기억을 모두 복원한 보부상의 완주 확인 화면",
};

export default function EndingPage() {
  return <EndingScreen />;
}
