import type { Metadata } from "next";
import MissionHome from "./mission-home";

export const metadata: Metadata = {
  title: "현재 임무 | 이야기 보부상",
  description: "이야기 보부상의 현재 임무 안내",
};

export default function MissionPage() {
  return <MissionHome />;
}
