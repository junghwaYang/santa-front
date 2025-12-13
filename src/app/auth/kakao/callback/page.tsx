"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");

      if (!code) {
        console.error("No authorization code");
        router.push("/");
        return;
      }

      try {
        // 카카오 인증 코드로 액세스 토큰을 받아오는 로직
        // 실제로는 백엔드에서 처리하거나 카카오 REST API를 호출해야 함
        // 여기서는 code를 직접 백엔드에 전달하는 방식으로 구현

        // 백엔드에서 code를 받아 처리하도록 수정 필요
        // 임시로 code를 accessToken으로 사용
        await login("kakao", code);
        router.push("/my");
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
