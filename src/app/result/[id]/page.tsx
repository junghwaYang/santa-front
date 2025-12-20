"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download, ChevronLeft, ChevronRight, Gift, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { resultsApi } from "@/lib/api";
import type { ResultResponse } from "@/lib/api";
import { useAuth } from "@/lib/context/auth-context";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { user, isLoading: isAuthLoading } = useAuth();

  const [resultData, setResultData] = useState<ResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const MESSAGES_PER_PAGE = 5;

  const captureRef = useRef<HTMLDivElement>(null);

  // 본인 확인: 로그인하지 않았거나 본인이 아니면 접근 불가
  const isOwner = user?.userId === userId;

  // 모바일 감지
  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  useEffect(() => {
    // 인증 로딩 중이면 대기
    if (isAuthLoading) return;

    // 로그인하지 않은 경우 메인으로 리다이렉트
    if (!user) {
      router.replace("/");
      return;
    }

    // 본인이 아닌 경우
    if (!isOwner) {
      setError("본인의 결과만 확인할 수 있습니다.");
      setIsLoading(false);
      return;
    }

    const loadResult = async () => {
      try {
        setIsLoading(true);
        const data = await resultsApi.getResult(userId);
        setResultData(data);
      } catch (err: unknown) {
        console.error("Failed to load result:", err);
        const error = err as { error?: string; data?: { remaining?: number } };
        if (error?.error === "INSUFFICIENT_RESPONSES") {
          setError(
            `아직 결과를 볼 수 없어요. ${error.data?.remaining || 0}명의 친구가 더 응답해야 해요!`
          );
        } else {
          setError("결과를 불러오는데 실패했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadResult();
  }, [userId, user, isOwner, isAuthLoading, router]);

  // 이미지를 base64로 변환 (CORS 우회)
  useEffect(() => {
    if (!resultData?.result.imageUrl) return;

    const convertImageToBase64 = async (url: string) => {
      try {
        // 이미지를 fetch하여 blob으로 변환
        const response = await fetch(url);
        const blob = await response.blob();

        // blob을 base64로 변환
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Failed to convert image to base64:", err);
        // 실패해도 원본 이미지 URL 사용
      }
    };

    convertImageToBase64(resultData.result.imageUrl);
  }, [resultData?.result.imageUrl]);

  const totalPages = resultData ? Math.ceil(resultData.warmMessages.length / MESSAGES_PER_PAGE) : 0;
  const currentMessages = resultData
    ? resultData.warmMessages.slice(
        (currentPage - 1) * MESSAGES_PER_PAGE,
        currentPage * MESSAGES_PER_PAGE
      )
    : [];

  const handleShare = () => {
    const shareLink = user?.uniqueLink
      ? `${window.location.origin}/q/${user.uniqueLink}`
      : window.location.href;
    navigator.clipboard.writeText(shareLink).then(() => {
      toast.success("공유 링크가 복사되었습니다!", {
        duration: 2000,
      });
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownload = async () => {
    if (!captureRef.current || isDownloading) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(captureRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#0B132B",
      });

      if (isMobile) {
        // 모바일: 새 탭에서 이미지 열기 (사용자가 길게 눌러서 저장)
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>산타 테스트 결과</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  body { margin: 0; padding: 20px; background: #0B132B; display: flex; flex-direction: column; align-items: center; min-height: 100vh; }
                  img { max-width: 100%; height: auto; border-radius: 12px; }
                  p { color: white; text-align: center; margin-top: 16px; font-family: sans-serif; }
                </style>
              </head>
              <body>
                <img src="${dataUrl}" alt="산타 테스트 결과" />
                <p>이미지를 길게 눌러서 저장하세요</p>
              </body>
            </html>
          `);
          newTab.document.close();
        }
      } else {
        // 데스크톱: 기존 다운로드 방식
        const link = document.createElement("a");
        link.download = `santa-result-${resultData?.userName || "result"}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("이미지가 저장되었습니다!");
      }
    } catch (err) {
      console.error("Failed to download image:", err);
      toast.error("이미지 저장에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  // 로딩 상태 (인증 로딩 또는 결과 로딩)
  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
          <p className="text-lg text-muted-foreground">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg text-white">{error || "결과를 찾을 수 없습니다."}</p>
          <Button onClick={() => router.push("/my")}>내 페이지로 돌아가기</Button>
        </div>
      </div>
    );
  }

  // base64가 있으면 사용, 없으면 원본 URL 사용
  const characterImage = imageBase64 || resultData.result.imageUrl;
  const questionStatsArray = Object.entries(resultData.questionStats);

  return (
    <div className="min-h-screen flex flex-col items-center max-w-md mx-auto relative shadow-2xl overflow-hidden bg-transparent">
      <main className="w-full animate-fade-in-up">
        {/* Character Section - Full Screen Style */}
        <div ref={captureRef} className="w-full relative aspect-[9/16] md:aspect-[3/4] group">
          {/* Background Image */}
          {characterImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={characterImage}
                alt="Character Result"
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Gradient Overlay for Text Readability - Only Top */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <p className="text-gray-400 text-lg">이미지가 없습니다</p>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-start gap-6 p-8 text-center text-white pt-12">
            {/* Top Header */}
            <div className="space-y-1 animate-fade-in-down">
              <h2 className="text-white/80 text-sm font-medium tracking-widest uppercase drop-shadow-md">
                사람들이 생각하는 2025{" "}
                <span className="text-forest-green font-bold">{resultData.userName}</span> 님은
              </h2>
            </div>

            {/* Title & Description - Now at Top */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-xl break-keep">
                  <span className="text-gold">{resultData.result.title}</span>
                </h1>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg">
                <p className="text-gray-100 text-sm md:text-base leading-relaxed font-light break-keep opacity-95">
                  "{resultData.result.description}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section (Actions, Stats, etc.) */}
        <div className="px-4 py-8 space-y-10">
          {/* Actions */}
          <div className="space-y-2">
            {isMobile && (
              <p className="text-center text-sm text-gray-400">
                💡 이미지 다운로드 시 길게 눌러서 저장하세요
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">내 설문 링크 공유하기</span>
            </Button>
            <Button
              className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">{isDownloading ? "저장중..." : "결과 이미지 다운로드"}</span>
            </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-6 relative z-10">
            <div className="space-y-3">
              {questionStatsArray.map(([questionId, stat]) => (
                <div
                  key={questionId}
                  className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-white font-semibold mb-4 text-base shadow-sm drop-shadow-sm">{stat.question}</h4>

                  <div className="space-y-4">
                    {/* 1st Place */}
                    {stat.first && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-gold font-bold text-lg">{stat.first.text}</span>
                          </div>
                          <span className="font-bold text-white text-base">
                            {stat.first.percentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-christmas-red rounded-full opacity-90"
                            style={{ width: `${stat.first.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 2nd Place */}
                    {stat.second && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300 font-medium text-base">
                              {stat.second.text}
                            </span>
                          </div>
                          <span className="font-medium text-white/70 text-sm">
                            {stat.second.percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-500 rounded-full opacity-50"
                            style={{ width: `${stat.second.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Section - List Visualization */}
          {resultData.warmMessages.length > 0 && (
            <div className="space-y-6 pb-20">
              <h3 className="font-bold text-xl flex items-center gap-2 text-white justify-center drop-shadow-md">
                💌 따뜻한 한마디{" "}
                <span className="bg-christmas-red text-white text-xs px-2 py-1 rounded-full">
                  {resultData.warmMessages.length}
                </span>
              </h3>

              <div className="space-y-3 min-h-[300px]">
                {currentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/5 shadow-sm hover:bg-white/15 transition-colors animate-fade-in-up"
                  >
                    <p className="text-gray-400 text-xs mb-2">{msg.nickname}</p>
                    <p className="text-gray-100 font-medium leading-relaxed">"{msg.message}"</p>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <span className="text-white font-medium text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-white hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>





                {/* Gift CTA */}
        <div className="px-4 pb-4">
          <Button
            className="w-full h-16 text-xl shadow-xl rounded-xl bg-christmas-red hover:bg-red-700 text-white font-bold gap-2"
            asChild
          >
            <Link href="/gift">
              <Gift className="w-5 h-5" />
              친구에게 크리스마스 선물하기
            </Link>
          </Button>
        </div>

        <div className="text-center pb-4 w-full flex justify-center px-4">
          <Button
            className="w-full h-16 text-xl shadow-xl rounded-xl bg-forest-green hover:bg-green-700 text-white font-bold"
            asChild
          >
            <Link href="/">나도 산타 테스트 하러가기 👉</Link>
          </Button>
        </div>

        {/* 버그 제보 및 피드백 */}
        <div className="text-center pb-8 px-4">
          <a
            href="https://open.kakao.com/o/g85Jrr7h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            버그 제보 및 피드백
          </a>
        </div>
      </main>
    </div>
  );
}
