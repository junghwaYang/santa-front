"use client";

import { Button } from "@/components/ui/button";
import { Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { usersApi } from "@/lib/api";
import type { UserInfo } from "@/lib/api";

const NICKNAME_KEY = "santa-nickname";

export default function MyPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/");
      return;
    }

    if (user?.userId) {
      const loadUserInfo = async () => {
        try {
          setIsLoading(true);
          const data = await usersApi.getUser(user.userId);

          // 서버에서 닉네임 설정 여부 확인 (없으면 name !== "사용자"로 폴백)
          const isSet = data.isNicknameSet ?? (data.name && data.name !== "사용자");
          if (!isSet) {
            router.push("/create");
            return;
          }

          // 닉네임을 로컬스토리지에 동기화
          localStorage.setItem(NICKNAME_KEY, data.name);
          setNickname(data.name);
          setUserInfo(data);
        } catch (err) {
          console.error("Failed to load user info:", err);
        } finally {
          setIsLoading(false);
        }
      };
      loadUserInfo();
    }
  }, [user, authLoading, isLoggedIn, router]);

  const shareLink = userInfo
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/q/${userInfo.uniqueLink}`
    : "";

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("링크가 복사되었습니다!", {
          description: "친구들에게 공유해보세요",
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("복사에 실패했습니다.", {
          description: "다시 시도해주세요.",
        });
      });
  };

  // 로딩 상태
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
          <p className="text-lg text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인 안됨
  if (!isLoggedIn || !userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden bg-transparent p-6 text-center space-y-10">
      {/* Header / Success State */}
      <div className="space-y-6 flex flex-col items-center animate-fade-in-down">
        {/* GIF Icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/find.gif"
          alt="Finding Friends"
          className="w-full object-contain drop-shadow-xl animate-bounce-subtle"
        />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white leading-tight">
            {nickname}님의 링크가 생성되었어요!
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            친구들에게 공유해서
            <br />
            나에 대한 솔직한 답변을 받아보세요
          </p>
          {userInfo.responseCount > 0 && (
            <p className="text-sm text-christmas-red font-medium">
              현재 {userInfo.responseCount}명이 응답했어요!
              {!userInfo.canViewResult &&
                ` (${userInfo.minimumResponses - userInfo.responseCount}명 더 필요)`}
            </p>
          )}
        </div>
      </div>

      {/* Link Box */}
      <div className="w-full bg-[#1D3557]/60 backdrop-blur-lg rounded-2xl p-6 text-left border border-white/10 space-y-2 shadow-lg animate-fade-in-up delay-100">
        <span className="text-xs text-gray-400 font-medium block ml-1">공유 링크</span>
        <div className="bg-black/20 rounded-lg p-3 truncate font-mono text-white text-base">
          {shareLink}
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full space-y-3 animate-fade-in-up delay-200">
        <Button
          className="w-full h-16 text-xl bg-white text-christmas-red hover:bg-white/90 rounded-xl gap-2 font-bold transition-transform active:scale-[0.98] shadow-lg"
          onClick={handleCopy}
        >
          <Copy className="w-6 h-6" />
          링크 복사하기
        </Button>

        <Button
          className={`w-full h-16 text-xl rounded-xl gap-2 font-bold shadow-lg transition-transform active:scale-[0.98] ${
            userInfo.canViewResult
              ? "bg-[#FEE500] hover:bg-[#FDD835] text-[#0B132B]"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!userInfo.canViewResult}
          asChild={userInfo.canViewResult}
        >
          {userInfo.canViewResult ? (
            <Link href={`/result/${userInfo.userId}`}>
              <Gift className="size-8" />내 결과 보러가기
            </Link>
          ) : (
            <span className="flex items-center gap-2">
              <Gift className="size-8" />
              {userInfo.minimumResponses - userInfo.responseCount}명 더 응답하면 결과 확인 가능
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
