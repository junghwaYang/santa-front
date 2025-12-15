"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { usersApi } from "@/lib/api";

const NICKNAME_KEY = "santa-nickname";

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    // 로그인 체크
    if (!isLoading && !isLoggedIn) {
      router.push("/");
      return;
    }

    // 이미 닉네임이 설정되어 있으면 /my로 이동
    const savedNickname = localStorage.getItem(NICKNAME_KEY);
    if (savedNickname) {
      router.push("/my");
    }
  }, [isLoading, isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // 닉네임을 서버에 저장
        await usersApi.setNickname(name.trim());
        // 로컬 스토리지에도 저장
        localStorage.setItem(NICKNAME_KEY, name.trim());
        router.push("/my");
      } catch (error) {
        console.error("Failed to set nickname:", error);
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
      <main className="flex-1 flex flex-col px-6 space-y-8 pt-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            <span className="text-christmas-red">산타 이름표</span>를 만들어주세요!
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            친구들이 나를 알아볼 수 있도록
            <br />
            이름이나 닉네임을 입력해주세요.
          </p>
        </div>

        <form id="create-profile-form" onSubmit={handleSubmit} className="space-y-6 pb-32">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              닉네임
            </Label>
            <Input
              id="name"
              placeholder="예: 루돌프, 산타할아버지"
              className="h-12 text-lg bg-[#1D3557] border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-christmas-red focus-visible:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
              required
            />
            <p className="text-xs text-muted-foreground text-right">{name.length}/10</p>
          </div>
        </form>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-50">
          <div className="max-w-md mx-auto">
            <Button
              type="submit"
              form="create-profile-form"
              size="lg"
              className="w-full h-14 text-lg font-bold bg-christmas-red hover:bg-[#A01830] transition-all shadow-lg"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "생성 중..." : "내 산타 링크 만들기"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
