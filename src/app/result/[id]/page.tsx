"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { resultsApi } from "@/lib/api";
import type { ResultResponse } from "@/lib/api";
import { useAuth } from "@/lib/context/auth-context";
import KakaoAdfit from "@/components/kakao-adfit";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { user } = useAuth();

  const [resultData, setResultData] = useState<ResultResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const MESSAGES_PER_PAGE = 5;

  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [userId]);

  const totalPages = resultData ? Math.ceil(resultData.warmMessages.length / MESSAGES_PER_PAGE) : 0;
  const currentMessages = resultData
    ? resultData.warmMessages.slice(
        (currentPage - 1) * MESSAGES_PER_PAGE,
        currentPage * MESSAGES_PER_PAGE
      )
    : [];

  const handleCopy = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("결과 링크가 복사되었습니다!", {
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

      const link = document.createElement("a");
      link.download = `santa-result-${resultData?.userName || "result"}.png`;
      link.href = dataUrl;
      link.click();

      toast.success("이미지가 저장되었습니다!");
    } catch (err) {
      console.error("Failed to download image:", err);
      toast.error("이미지 저장에 실패했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
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

  const characterImage = resultData.result.imageUrl;
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
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0"
              onClick={handleCopy}
            >
              <Copy className="w-5 h-5" />
              <span className="text-sm font-medium">링크복사</span>
            </Button>
            <Button
              className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium">{isDownloading ? "저장중..." : "이미지"}</span>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="space-y-6 relative z-10">
            <div className="space-y-3">
              {questionStatsArray.map(([questionId, stat]) => (
                <div
                  key={questionId}
                  className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-gray-400 font-medium mb-4 text-sm">{stat.question}</h4>

                  <div className="space-y-4">
                    {/* 1st Place */}
                    {stat.first && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-gold font-bold text-lg">{stat.first.text}</span>
                          </div>
                          <span className="font-medium text-white/50 text-sm">
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
                          <span className="font-medium text-white/30 text-sm">
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

        <div className="text-center pb-8 w-full flex justify-center px-4">
          <Button
            className="w-full h-16 text-xl shadow-xl rounded-xl bg-forest-green hover:bg-green-700 text-white font-bold"
            asChild
          >
            <Link href="/">나도 산타 테스트 하러가기 👉</Link>
          </Button>
        </div>

                {/* Kakao Adfit */}
        <div className="flex justify-center py-4">
          <KakaoAdfit unit="DAN-PGMxn4o8PBQp6aoL" width={320} height={100} />
        </div>
      </main>
    </div>
  );
}
