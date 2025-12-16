import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export default function DonePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-md mx-auto p-6 text-center space-y-8 relative shadow-2xl overflow-hidden bg-transparent">
      {/* GIF Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/find.gif" alt="Done" className="w-full object-contain drop-shadow-xl" />

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white">답변 완료!</h1>
        <p className="text-gray-200 text-lg leading-relaxed">
          친구에게 소중한 마음이
          <br />
          성공적으로 전달되었어요.
        </p>
      </div>

      <div className="w-full pt-8 space-y-4">
        {/* Gift CTA */}
        <Button
          size="lg"
          className="w-full h-14 text-lg bg-forest-green hover:bg-green-700 rounded-xl font-bold gap-2"
          asChild
        >
          <Link href="/gift">
            <Gift className="w-5 h-5" />
            친구에게 크리스마스 선물하기
          </Link>
        </Button>

        <div className="bg-[#1D3557]/60 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg space-y-4">
          <p className="font-bold text-white">나도 산타 캐릭터를 확인해보고 싶다면?</p>
          <Button
            size="lg"
            className="w-full h-14 text-lg bg-christmas-red hover:bg-[#A01830] rounded-xl font-bold"
            asChild
          >
            <Link href="/">나도 해보기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
