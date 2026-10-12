import type { Metadata } from "next";
import RegisterScreen from "./register-screen";

export const metadata: Metadata = {
  title: "신입 보부상 등록 | 이야기 보부상",
  description: "신입 보부상의 이름을 입력하는 화면",
};

export default function RegisterPage() {
  return <RegisterScreen />;
}
