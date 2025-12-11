"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Gift, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyPage() {
  const [status, setStatus] = useState({ responseCount: 0, requiredCount: 3, isReady: false });

  useEffect(() => {
    // Fetch mock status
    fetch("/api/user/user123/status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCopy = () => {
    const link = "https://santa.app/q/user123";
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("링크가 복사되었습니다!", {
          description: "친구들에게 공유해보세요 🎅",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error("복사에 실패했습니다.", {
          description: "다시 시도해주세요.",
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden bg-transparent p-6  text-center space-y-10">
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
          <h1 className="text-3xl font-bold text-white leading-tight">링크가 생성되었어요!</h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            친구들에게 공유해서
            <br />
            나에 대한 솔직한 답변을 받아보세요
          </p>
        </div>
      </div>

      {/* Link Box */}
      <div className="w-full bg-[#1D3557]/60 backdrop-blur-lg rounded-2xl p-6 text-left border border-white/10 space-y-2 shadow-lg animate-fade-in-up delay-100">
        <span className="text-xs text-gray-400 font-medium block ml-1">공유 링크</span>
        <div className="bg-black/20 rounded-lg p-3 truncate font-mono text-white text-base">
          https://santa.app/q/user123
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
          className="w-full h-16 text-xl bg-[#FEE500] hover:bg-[#FDD835] text-[#0B132B] border-none rounded-xl gap-2 font-bold shadow-lg transition-transform active:scale-[0.98]"
          asChild
        >
          <Link href="/result/user123">
            <Gift className="w-6 h-6" />내 결과 보러가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
