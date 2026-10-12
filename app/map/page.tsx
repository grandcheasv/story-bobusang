import type { Metadata } from "next";
import MapScreen from "./map-screen";

export const metadata: Metadata = {
  title: "광천 지도 | 이야기 보부상",
  description: "복원한 기억과 앞으로 찾아갈 장소",
};

export default function MapPage() {
  return <MapScreen />;
}
