"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { usersApi, questionsApi, responsesApi } from "@/lib/api";
import type { Question, QuestionAnswer } from "@/lib/api";
import { useAuth } from "@/lib/context/auth-context";

const STORAGE_KEY = "santa-questionnaire";
const SUBMITTED_KEY = "santa-submitted";
const MAX_MESSAGE_LENGTH = 150;
const PROFANITY_LIST = [
  // 욕설
  "시발",
  "씨발",
  "ㅅㅂ",
  "ㅆㅂ",
  "병신",
  "ㅂㅅ",
  "지랄",
  "ㅈㄹ",
  "개새끼",
  "썅",
  "fuck",
  "shit",
  "damn",
  "bitch",
  "ass",
  // 성희롱/성추행 관련
  "섹스",
  "sex",
  "자위",
  "야동",
  "포르노",
  "porn",
  "씹",
  "성관계",
  "성폭행",
  "강간",
  "rape",
  "dick",
  "pussy",
  "cock",
  "가슴만져",
  "엉덩이만져",
  "몸매좋",
  "벗어",
  "nude",
  "naked",
];

const containsProfanity = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return PROFANITY_LIST.some((word) => lowerText.includes(word.toLowerCase()));
};

interface SelectedAnswer {
  questionId: string;
  choiceId: QuestionAnswer;
}

interface QuestionnaireClientProps {
  uniqueLink: string;
}

export default function QuestionnaireClient({ uniqueLink }: QuestionnaireClientProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SelectedAnswer[]>([]);
  const [warmMessage, setWarmMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);

  // API 데이터
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingData(true);

        // 1. 사용자 정보와 질문 목록 로드
        const [userResponse, questionsResponse] = await Promise.all([
          usersApi.getUserByLink(uniqueLink),
          questionsApi.getQuestions(),
        ]);
        setUserName(userResponse.name);
        setUserId(userResponse.userId);
        setQuestions(questionsResponse.questions);

        // 2. 응답 가능 여부 확인 (로그인 상태일 때만)
        if (isLoggedIn) {
          try {
            await responsesApi.checkCanRespond(userResponse.userId);
            // 성공하면 응답 가능
          } catch (checkErr) {
            const checkError = checkErr as { status?: number; message?: string };
            if (checkError.status === 400) {
              setError("자신에게는 응답할 수 없습니다.");
              return;
            } else if (checkError.status === 404) {
              setError("존재하지 않는 사용자입니다.");
              return;
            } else if (checkError.status === 409) {
              setHasAlreadySubmitted(true);
              localStorage.setItem(`${SUBMITTED_KEY}-${uniqueLink}`, "true");
            }
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, [uniqueLink, isLoggedIn]);

  // 로컬스토리지에서 저장된 답변 및 제출 여부 불러오기
  useEffect(() => {
    if (isLoadingData) return;

    // 이미 제출했는지 확인
    const submitted = localStorage.getItem(`${SUBMITTED_KEY}-${uniqueLink}`);
    if (submitted === "true") {
      setHasAlreadySubmitted(true);
    }

    const saved = localStorage.getItem(`${STORAGE_KEY}-${uniqueLink}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || []);
        setCurrentIndex(parsed.answers?.length || 0);
        setWarmMessage(parsed.warmMessage || "");
      } catch (e) {
        // 파싱 실패 시 무시
      }
    }
    setIsLoaded(true);
  }, [uniqueLink, isLoadingData]);

  // 답변이 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        `${STORAGE_KEY}-${uniqueLink}`,
        JSON.stringify({
          answers,
          warmMessage,
        })
      );
    }
  }, [answers, warmMessage, uniqueLink, isLoaded]);

  // Total steps: questions + 1 message
  const totalSteps = questions.length + 1;
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  const handleAnswer = (questionId: string, choiceId: QuestionAnswer) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { questionId, choiceId };
    setAnswers(newAnswers);

    if (currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGoBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || hasAlreadySubmitted) return;

    try {
      setIsSubmitting(true);

      // 답변을 API 형식으로 변환
      const answersRecord: Record<string, QuestionAnswer> = {};
      answers.forEach((answer) => {
        answersRecord[answer.questionId] = answer.choiceId;
      });

      await responsesApi.submitResponse({
        userId,
        respondentNickname: "익명", // TODO: 닉네임 입력 받기
        answers: answersRecord,
        warmMessage: warmMessage.trim() || undefined,
      });

      // 제출 완료 표시를 로컬스토리지에 저장
      localStorage.setItem(`${SUBMITTED_KEY}-${uniqueLink}`, "true");

      // 로컬스토리지에서 임시 저장 데이터 제거
      localStorage.removeItem(`${STORAGE_KEY}-${uniqueLink}`);

      // Redirect to done page
      router.push(`/q/${uniqueLink}/done`);
    } catch (err) {
      console.error("Failed to submit:", err instanceof Error ? err.message : JSON.stringify(err));
      const errorMessage =
        (err as { message?: string })?.message || "제출에 실패했습니다. 다시 시도해주세요.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 상태
  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red mx-auto"></div>
          <p className="text-lg text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg text-red-500">{error}</p>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  // 이미 제출한 경우 페이지 접근 차단
  if (hasAlreadySubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="text-6xl">💌</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">이미 메시지를 보냈어요</h1>
            <p className="text-gray-400">
              {userName}님에게는 한 번만 메시지를 보낼 수 있어요
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-christmas-red hover:bg-[#A01830]"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (currentIndex < questions.length) {
    const question = questions[currentIndex];
    return (
      <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
        <header className="p-4 flex items-center gap-4">
          {currentIndex > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          ) : (
            <div className="w-10 h-10" />
          )}
          <Progress
            value={progress}
            className="h-2 flex-1 bg-gray-200"
            indicatorClassName="bg-christmas-red"
          />
          <span className="text-xs font-bold text-christmas-red">
            {currentIndex + 1}/{totalSteps}
          </span>
        </header>

        <main className="flex-1 flex flex-col p-6 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="space-y-4">
            <span className="text-christmas-red font-bold text-xl tracking-wider">
              Q.{question.id}
            </span>
            <h1 className="text-3xl font-bold text-foreground leading-snug whitespace-pre-wrap">
              {question.text.replace("[이름]", userName)}
            </h1>
          </div>

          <div className="space-y-4">
            {question.choices.map((choice) => {
              const isSelected = answers[currentIndex]?.choiceId === choice.id;
              return (
                <Card
                  key={choice.id}
                  className={`p-5 cursor-pointer backdrop-blur-md transition-all active:scale-[0.98] border-2 ${
                    isSelected
                      ? "border-christmas-red bg-christmas-red/20 shadow-[0_0_15px_rgba(230,57,70,0.5)]"
                      : "border-transparent bg-[#1D3557]/80 hover:border-christmas-red hover:bg-[#1D3557] hover:shadow-[0_0_15px_rgba(230,57,70,0.5)]"
                  }`}
                  onClick={() => handleAnswer(question.id, choice.id)}
                >
                  <span className="text-xl font-medium text-white">{choice.text}</span>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Message Step
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
      <header className="p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoBack}
          className="hover:bg-white/10 text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Progress
          value={100}
          className="h-2 flex-1 bg-white/20"
          indicatorClassName="bg-christmas-red"
        />
        <span className="text-xs font-bold text-christmas-red">Last</span>
      </header>

      <main className="flex-1 flex flex-col p-6 space-y-10 animate-in fade-in">
        <div className="space-y-4">
          <span className="text-christmas-red font-bold text-xl">To. {userName}</span>
          <h1 className="text-3xl font-bold text-white leading-snug">
            친구에게 따뜻한
            <br />
            한마디를 남겨주세요!
          </h1>
        </div>

        <div className="space-y-2 flex-1">
          <Textarea
            className="w-full h-48 p-5 rounded-xl border border-christmas-red/30 focus:border-christmas-red focus:ring-1 focus:ring-christmas-red bg-[#1D3557]/90 resize-none text-xl placeholder:text-gray-500 placeholder:text-xl text-white leading-relaxed"
            placeholder="올 한 해도 고생했어! 내년에도 함께하자"
            value={warmMessage}
            maxLength={MAX_MESSAGE_LENGTH}
            name="warmMessage"
            onChange={(e) => setWarmMessage(e.target.value)}
          />
          <div className="flex justify-between items-center">
            {containsProfanity(warmMessage) ? (
              <p className="text-sm text-red-400">부적절한 표현이 포함되어 있어요</p>
            ) : (
              <p className="text-sm text-gray-400"></p>
            )}
            <p
              className={`text-sm ${warmMessage.length >= MAX_MESSAGE_LENGTH ? "text-red-400" : "text-gray-400"}`}
            >
              {warmMessage.length}/{MAX_MESSAGE_LENGTH}자
            </p>
          </div>
        </div>

        {hasAlreadySubmitted ? (
          <div className="space-y-2 mb-8">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold bg-gray-500 cursor-not-allowed shadow-lg"
              disabled
            >
              이미 메시지를 보냈어요
            </Button>
            <p className="text-center text-sm text-gray-400">
              같은 친구에게는 한 번만 메시지를 보낼 수 있어요
            </p>
          </div>
        ) : (
          <Button
            size="lg"
            className="w-full h-16 text-xl font-bold bg-christmas-red hover:bg-[#A01830] shadow-lg mb-8"
            disabled={!warmMessage.trim() || containsProfanity(warmMessage) || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "보내는 중..." : "💌 따뜻한 한마디 보내기"}
          </Button>
        )}
      </main>
    </div>
  );
}
