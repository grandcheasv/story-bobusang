"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { rememberMissionPath } from "../lib/mission-progress";

export default function LastMissionPathTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      rememberMissionPath(pathname);
    } catch {
      // 브라우저 저장소를 사용할 수 없어도 미션 화면은 계속 이용할 수 있습니다.
    }
  }, [pathname]);

  return null;
}
