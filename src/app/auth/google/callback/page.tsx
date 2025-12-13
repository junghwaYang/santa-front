"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // URL hash에서 access_token 추출 (implicit flow)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");

      if (!accessToken) {
        console.error("No access token");
        router.push("/");
        return;
      }

      try {
        await login("google", accessToken);
        router.push("/my");
      } catch (error) {
        console.error("Google login failed:", error);
        router.push("/");
      }
    };

    handleCallback();
  }, [login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
        <p className="text-lg text-muted-foreground">로그인 중...</p>
      </div>
    </div>
  );
}
