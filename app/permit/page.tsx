import type { Metadata } from "next";
import PermitScreen from "./permit-screen";

export const metadata: Metadata = {
  title: "험표 발급 | 이야기 보부상",
  description: "이야기 보부상의 험표 발급 화면",
};

export default function PermitPage() {
  return <PermitScreen />;
}
