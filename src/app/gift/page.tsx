"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import KakaoAdfit from "@/components/kakao-adfit";

export default function GiftPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden bg-white">
      {/* Header */}
      <header className="p-4 flex items-center gap-4 bg-christmas-red">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-bold text-white">크리스마스 선물 추천</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            소중한 친구에게
            <br />
            마음을 전해보세요
          </h2>
          <p className="text-gray-500 text-sm">
            쿠팡에서 인기있는 크리스마스 선물을 확인해보세요
          </p>
        </div>

        {/* Coupang Carousel Banner */}
        <div className="flex justify-center overflow-hidden">
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=950896&template=carousel&trackingCode=AF8549244&subId=&width=680&height=140&tsource="
            width="680"
            height="140"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="max-w-full border-0"
          />
        </div>

        {/* Coupang Partners Grid */}
        <div className="grid grid-cols-3 gap-2 justify-items-center">
          <iframe
            src="https://coupa.ng/ck26pG"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26rT"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26sd"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26sq"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26vV"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26s7"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26tr"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
          <iframe
            src="https://coupa.ng/ck26tS"
            width="120"
            height="240"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="border-0"
          />
        </div>

        <p className="text-center text-xs text-gray-400">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로,
          <br />
          이에 따른 일정액의 수수료를 제공받습니다.
        </p>

        {/* Kakao Adfit */}
        <div className="flex justify-center pt-4">
          <KakaoAdfit unit="DAN-PGMxn4o8PBQp6aoL" width={320} height={100} />
        </div>
      </main>
    </div>
  );
}
