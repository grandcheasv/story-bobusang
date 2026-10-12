import type { Metadata } from "next";
import DebugScreen from "./debug-screen";

export const metadata: Metadata = {
  title: "개발 테스트 | 이야기 보부상",
  description: "이야기 보부상 개발용 저장 상태 확인 화면",
};

export default function DebugPage() {
  return <DebugScreen />;
}
