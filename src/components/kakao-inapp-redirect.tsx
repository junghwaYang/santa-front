"use client";

import { useEffect } from "react";

export function KakaoInAppRedirect() {
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    // 카카오톡 인앱 브라우저 감지
    if (userAgent.includes("kakaotalk")) {
      const currentUrl = window.location.href;
      const encodedUrl = encodeURIComponent(currentUrl);

      // 외부 브라우저로 열기
      window.location.href = `kakaotalk://web/openExternal?url=${encodedUrl}`;

      // 인앱 브라우저 닫기 (약간의 딜레이 후)
      setTimeout(() => {
        window.location.href = "kakaoweb://closeBrowser";
      }, 100);
    }
  }, []);

  return null;
}
