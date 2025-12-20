"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Snowflake } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { initKakao, kakaoLogin } from "@/lib/oauth/kakao";
import { googleLogin } from "@/lib/oauth/google";

const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

type ModalType = "privacy" | "terms" | null;

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading, tempLogin } = useAuth();
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [openModal, setOpenModal] = useState<ModalType>(null);

  useEffect(() => {
    initKakao();
  }, []);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push("/my");
    }
  }, [isLoggedIn, isLoading, router]);

  const handleKakaoLogin = () => {
    kakaoLogin();
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleTestLogin = async () => {
    try {
      setIsTestLoading(true);
      await tempLogin();
      router.push("/my");
    } catch (error) {
      console.error("테스트 로그인 실패:", error instanceof Error ? error.message : error);
      alert("테스트 로그인에 실패했습니다.");
    } finally {
      setIsTestLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#0B132B]">
      {/* Snowflakes Decoration */}
      <div className="absolute top-10 left-10 opacity-20 animate-pulse pointer-events-none">
        <Snowflake className="w-12 h-12 text-christmas-red" />
      </div>
      <div className="absolute top-20 right-10 opacity-20 animate-pulse delay-700 pointer-events-none">
        <Snowflake className="w-8 h-8 text-forest-green" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 animate-pulse delay-300 pointer-events-none">
        <Snowflake className="w-16 h-16 text-gold" />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto w-full">
        <main className="w-full max-w-md mx-auto flex flex-col items-center text-center space-y-8 z-10 animate-fade-in-up p-4 pt-12 pb-[320px]">
          <div className="space-y-2">
            <span className="text-forest-green font-bold tracking-widest text-sm uppercase mb-2 block">
              2025 Christmas Project
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-christmas-red drop-shadow-sm flex flex-col items-center gap-3">
              <span>올해의 나는 어떤 산타?</span>
            </h1>
          </div>

          <div className="space-y-8 w-full">
            <p className="text-xl text-muted-foreground leading-relaxed">
              내 친구들은 나를
              <br />
              <span className="font-bold text-foreground">어떻게 생각하고 있을까요?</span>
            </p>

            {/* Video GIF Placeholder */}
            <div className="flex justify-center pb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/main_move_v2.gif"
                alt="Christmas Animation"
                className="w-full object-cover animate-fade-in rounded-2xl"
              />
            </div>

            {/* Service Description Steps */}
            <div className="w-full bg-white/5 rounded-2xl p-6 text-left space-y-5 border border-white/10 backdrop-blur-sm shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-christmas-red flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-christmas-red/20">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed break-keep">
                  <span className="text-christmas-red font-bold">로그인</span>하고 나의{" "}
                  <span className="text-white font-bold decoration-wavy underline decoration-christmas-red/50 items-center">
                    설문 링크
                  </span>
                  를 만들어요.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-forest-green flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-forest-green/20">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed break-keep">
                  링크를{" "}
                  <span className="text-forest-green font-bold">친구들에게 공유</span>
                  해요.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-gold/20">
                  <span className="text-[#0B132B] text-sm font-bold">3</span>
                </div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed break-keep">
                  친구들이{" "}
                  <span className="text-gold font-bold">3명 이상 응답</span>하면 내
                  캐릭터와 응답을 확인할 수 있어요!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fixed Bottom CTA Section */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-md mx-auto relative h-full flex flex-col justify-end pointer-events-auto">
          {/* Gradient Overlay for smooth fade */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#0B132B] via-[#0B132B] to-transparent -z-10" />

          <div className="px-4 pb-8 pt-12 space-y-4">
            {/* Kakao Login */}
            <Button
              className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD835] text-[#0B132B] font-medium text-lg rounded-xl flex items-center justify-center gap-3 relative shadow-lg shadow-yellow-400/10 border border-[#FEE500] transition-transform active:scale-[0.98]"
              onClick={handleKakaoLogin}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
                <path d="M12 3c5.523 0 10 3.737 10 9.141 0 3.109-1.492 5.867-3.834 7.625l.893 3.393c.097.369-.267.703-.615.558l-3.951-1.637c-.822.115-1.666.177-2.493.177-5.523 0-10-3.737-10-9.141S6.477 3 12 3z" />
              </svg>
              카카오로 3초만에 시작하기
            </Button>

            {/* Google Login */}
            <Button
              variant="outline"
              className="w-full h-14 bg-white/90 hover:bg-white text-black font-medium text-lg rounded-xl flex items-center justify-center gap-3 relative shadow-lg border-0 transition-transform active:scale-[0.98]"
              onClick={handleGoogleLogin}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google로 계속하기
            </Button>

            {/* 약관 동의 안내 */}
            <p className="text-xs text-muted-foreground/60 text-center">
              로그인 시{" "}
              <button
                onClick={() => setOpenModal("terms")}
                className="underline hover:text-foreground transition-colors"
              >
                이용약관
              </button>{" "}
              및{" "}
              <button
                onClick={() => setOpenModal("privacy")}
                className="underline hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </button>
              에 동의하는 것으로 간주됩니다.
            </p>

            {/* Test Login for Kakao AdFit Review */}
            {isDevMode && (
              <div className="pt-2 border-t border-border/30">
                <Button
                  variant="ghost"
                  className="w-full h-10 text-muted-foreground/60 font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-muted/30"
                  onClick={handleTestLogin}
                  disabled={isTestLoading}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {isTestLoading ? "로그인 중..." : "테스트 계정(dev)"}
                </Button>
              </div>
            )}

            <footer className="text-[10px] text-center text-muted-foreground/40 pt-2">
              <p>© 2025 Santa Project. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>

      {/* 개인정보처리방침 모달 */}
      <Dialog open={openModal === "privacy"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>개인정보처리방침</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              <strong>1. 수집하는 개인정보</strong>
              <br />
              본 서비스는 소셜 로그인(카카오, 구글)을 통해 다음 정보를 수집합니다:
              이름(닉네임), 이메일
            </p>
            <p>
              <strong>2. 개인정보의 수집 및 이용목적</strong>
              <br />
              - 서비스 제공 및 회원 식별
              <br />
              - 설문 결과 저장 및 공유 기능 제공
              <br />- 서비스 개선 및 통계 분석
            </p>
            <p>
              <strong>3. 개인정보의 보유 및 이용기간</strong>
              <br />
              회원 탈퇴 시 또는 서비스 종료 시까지 보관하며, 이후 지체 없이 파기합니다.
            </p>
            <p>
              <strong>4. 개인정보의 제3자 제공</strong>
              <br />
              본 서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            </p>
            <p>
              <strong>5. 문의</strong>
              <br />
              개인정보 관련 문의사항은 devroder@naver.com 로 연락주시길 바랍니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* 이용약관 모달 */}
      <Dialog open={openModal === "terms"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>이용약관</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              <strong>제1조 (목적)</strong>
              <br />
              본 약관은 &quot;2025 산타 테스트&quot; 서비스 이용에 관한 조건과 절차를 규정함을
              목적으로 합니다.
            </p>
            <p>
              <strong>제2조 (서비스 내용)</strong>
              <br />
              - 친구들의 설문을 통한 크리스마스 캐릭터 결과 제공
              <br />
              - 설문 링크 공유 및 저장 기능
              <br />- 따뜻한 메시지 전달 기능
            </p>
            <p>
              <strong>제3조 (이용자의 의무)</strong>
              <br />
              - 타인의 권리를 침해하는 행위 금지
              <br />
              - 욕설, 비방, 성희롱 등 부적절한 메시지 작성 금지
              <br />- 서비스의 정상적인 운영을 방해하는 행위 금지
            </p>
            <p>
              <strong>제4조 (서비스 변경 및 중단)</strong>
              <br />
              운영자는 필요한 경우 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.
            </p>
            <p>
              <strong>제5조 (면책)</strong>
              <br />
              본 서비스는 무료로 제공되며, 서비스 이용으로 인해 발생하는 손해에 대해 운영자는
              책임을 지지 않습니다.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
