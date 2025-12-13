"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { getKakaoToken } from "@/lib/oauth/kakao";

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const isProcessing = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // 이미 처리 중이면 중복 실행 방지
      if (isProcessing.current) return;
      isProcessing.current = true;

      const code = searchParams.get("code");

      if (!code) {
        console.error("No authorization code");
        router.push("/");
        return;
      }

      try {
        // 1. code를 access_token으로 교환
        const accessToken = await getKakaoToken(code);

        // 2. access_token을 백엔드에 전달
        await login("kakao", accessToken);

        // 닉네임 설정 페이지로 이동
        router.push("/create");
      } catch (error) {
        console.error("Kakao login failed:", error);
        router.push("/");
      }
    };

    handleCallback();
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
        <p className="text-lg text-muted-foreground">로그인 중...</p>
      </div>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
            <p className="text-lg text-muted-foreground">로그인 중...</p>
          </div>
        </div>
      }
    >
      <KakaoCallbackContent />
    </Suspense>
  );
}
