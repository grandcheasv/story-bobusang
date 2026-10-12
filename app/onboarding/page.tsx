import type { Metadata } from "next";
import OnboardingScreen from "./onboarding-screen";

export const metadata: Metadata = {
  title: "새로운 여정 | 이야기 보부상",
  description: "광천에 도착한 신입 보부상의 첫 이야기",
};

export default function OnboardingPage() {
  return <OnboardingScreen />;
}
