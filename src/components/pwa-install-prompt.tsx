"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Share, PlusSquare } from "lucide-react";

const PWA_DISMISSED_KEY = "santa-pwa-dismissed";

interface PWAInstallPromptProps {
  onClose?: () => void;
}

export function PWAInstallPrompt({ onClose }: PWAInstallPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 이미 PWA로 실행 중인지 확인
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // 다시 보지 않기 설정 확인
    const dismissed = localStorage.getItem(PWA_DISMISSED_KEY);
    if (dismissed === "true" || standalone) {
      return;
    }

    // 디바이스 타입 확인
    const userAgent = navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    const android = /android/.test(userAgent);

    setIsIOS(ios);
    setIsAndroid(android);

    // 모바일에서만 표시
    if (ios || android) {
      // 약간의 딜레이 후 표시
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (dontShowAgain) {
        localStorage.setItem(PWA_DISMISSED_KEY, "true");
      }
      onClose?.();
    }
    setIsVisible(open);
  };

  // PWA로 이미 실행 중이면 렌더링하지 않음
  if (isStandalone) {
    return null;
  }

  return (
    <Drawer open={isVisible} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-[#1D3557] border-t-white/10">
        <DrawerHeader>
          <DrawerTitle className="text-white text-xl font-bold">
            홈 화면에 추가하고 빠르게 접속하세요!
          </DrawerTitle>
          <DrawerDescription className="text-gray-300">
            앱처럼 바로 실행할 수 있어요
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4">
          {/* iOS Instructions */}
          {isIOS && (
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Share className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">1. 공유 버튼 탭</p>
                  <p className="text-gray-400 text-sm">
                    하단 Safari 메뉴에서 공유 아이콘을 눌러주세요
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <PlusSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    2. &apos;홈 화면에 추가&apos; 선택
                  </p>
                  <p className="text-gray-400 text-sm">
                    스크롤해서 찾은 후 탭해주세요
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Android Instructions */}
          {isAndroid && (
            <div className="bg-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">⋮</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">1. 메뉴 버튼 탭</p>
                  <p className="text-gray-400 text-sm">
                    브라우저 우측 상단의 점 3개 메뉴를 눌러주세요
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <PlusSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    2. &apos;홈 화면에 추가&apos; 또는 &apos;앱 설치&apos;
                  </p>
                  <p className="text-gray-400 text-sm">
                    메뉴에서 해당 옵션을 선택해주세요
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Don't show again checkbox */}
          <label className="flex items-center gap-2 cursor-pointer justify-center py-2">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-christmas-red focus:ring-christmas-red"
            />
            <span className="text-gray-400 text-sm">다시 보지 않기</span>
          </label>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full h-12 bg-christmas-red hover:bg-[#A01830] text-white font-bold rounded-xl">
              확인
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
