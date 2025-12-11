"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Copy, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

// Mock Data
const RESULT_DATA = {
    userName: "양정화",
    character: "산타",
    modifier: "자기관리 최강자",
    description: "당신은 목표를 향해 꾸준히 달리는 갓생러 산타예요! 친구들은 당신의 성실함과 리더십을 정말 높게 평가하고 있답니다. 2025년에도 당신이 이룰 멋진 성과들이 기대돼요.",
    stats: [
        { 
            question: "Q1. 첫인상과 실제", 
            answers: [
                { text: "다정해요", percent: 51 },
                { text: "시크해요", percent: 25 }
            ]
        },
        { 
            question: "Q2. 모임에서의 역할", 
            answers: [
                { text: "총무 스타일", percent: 34 },
                { text: "분위기 메이커", percent: 30 }
            ]
        },
        { 
            question: "Q3. 힘들 때 모습", 
            answers: [
                { text: "운동으로 극복", percent: 60 },
                { text: "잠수타기", percent: 20 }
            ]
        },
        { 
            question: "Q4. 어울리는 선물", 
            answers: [
                { text: "건강식품", percent: 45 },
                { text: "현금", percent: 35 }
            ]
        },
        { 
            question: "Q5. 10년 후 모습", 
            answers: [
                { text: "성공한 사업가", percent: 70 },
                { text: "건물주", percent: 15 }
            ]
        },
    ],
    messages: [
        "올 한 해도 고생했어! 내년에도 함께하자 ❤️",
        "너랑 친구여서 정말 다행이야. 메리 크리스마스!",
        "항상 배울 점이 많은 친구야. 응원해!",
        "운동 좀 그만하고 술 좀 마시자 ㅋㅋㅋ 농담이고 건강해라!",
        "2025년에는 더 대박나자! 화이팅!",
        "따뜻한 연말 보내고 새해 복 많이 받아~",
        "언제나 긍정적인 에너지 고마워 :)",
        "우리 우정 영원히 변치 말자!"
    ]
};

export default function ResultPage() {
    const params = useParams(); // params.id
    const [currentPage, setCurrentPage] = useState(1);
    const MESSAGES_PER_PAGE = 5;

    const totalPages = Math.ceil(RESULT_DATA.messages.length / MESSAGES_PER_PAGE);
    const currentMessages = RESULT_DATA.messages.slice(
        (currentPage - 1) * MESSAGES_PER_PAGE,
        currentPage * MESSAGES_PER_PAGE
    );

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

    return (
        <div className="min-h-screen flex flex-col items-center max-w-md mx-auto relative shadow-2xl overflow-hidden bg-transparent">
            
            <main className="w-full animate-fade-in-up">
                {/* Character Section - Full Screen Style */}
                <div className="w-full relative aspect-[9/16] md:aspect-[3/4] group">
                    {/* Background Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/reindeer/reindeer_option1.png" 
                        alt="Character Result" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Dark Gradient Overlay for Text Readability - Only Top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-start gap-6 p-8 text-center text-white pt-12">
                        {/* Top Header */}
                        <div className="space-y-1 animate-fade-in-down">
                            <h2 className="text-white/80 text-sm font-medium tracking-widest uppercase drop-shadow-md">
                                사람들이 생각하는 2025 <span className="text-forest-green font-bold">{RESULT_DATA.userName}</span> 님은
                            </h2>
                        </div>

                        {/* Title & Description - Now at Top */}
                        <div className="space-y-4 animate-fade-in-up">
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-xl break-keep">
                                    눈 내리는 창밖 보며<br/>
                                    <span className="text-gold">감동하는 루돌프</span>
                                </h1>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-lg">
                                <p className="text-gray-100 text-sm md:text-base leading-relaxed font-light break-keep opacity-95">
                                    "당신은 목표를 향해 꾸준히 달리는 갓생러 산타예요! 친구들은 당신의 성실함과 리더십을 정말 높게 평가하고 있답니다. 2025년에도 당신이 이룰 멋진 성과들이 기대돼요."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section (Actions, Stats, etc.) */}
                <div className="px-4 py-8 space-y-10">
                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                         <Button className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0" onClick={handleCopy}>
                            <Copy className="w-5 h-5" />
                            <span className="text-sm font-medium">링크복사</span>
                        </Button>
                        <Button className="h-14 bg-christmas-red hover:bg-red-700 text-white flex gap-1 px-0">
                            <Download className="w-5 h-5" />
                             <span className="text-sm font-medium">이미지</span>
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-6 relative z-10">
                        <h3 className="font-bold text-xl flex items-center gap-2 text-white drop-shadow-md">
                            📊 질문별 최다 답변
                        </h3>
                        <div className="space-y-3">
                            {RESULT_DATA.stats.map((stat, i) => (
                                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <h4 className="text-gray-400 font-medium mb-4 text-sm">{stat.question}</h4>
                                    
                                    <div className="space-y-4">
                                        {/* 1st Place */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gold font-bold text-lg">{stat.answers[0].text}</span>
                                                </div>
                                                <span className="font-medium text-white/50 text-sm">{stat.answers[0].percent}%</span>
                                            </div>
                                            {/* Minimal Progress: Solid color or very subtle gradient */}
                                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-christmas-red rounded-full opacity-90" 
                                                    style={{ width: `${stat.answers[0].percent}%` }}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* 2nd Place */}
                                         <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-300 font-medium text-base">{stat.answers[1].text}</span>
                                                </div>
                                                <span className="font-medium text-white/30 text-sm">{stat.answers[1].percent}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gray-500 rounded-full opacity-50" 
                                                    style={{ width: `${stat.answers[1].percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Messages Section - List Visualization */}
                    <div className="space-y-6 pb-20">
                        <h3 className="font-bold text-xl flex items-center gap-2 text-white justify-center drop-shadow-md">
                            💌 따뜻한 한마디 <span className="bg-christmas-red text-white text-xs px-2 py-1 rounded-full">{RESULT_DATA.messages.length}</span>
                        </h3>
                        
                        <div className="space-y-3 min-h-[300px]">
                            {currentMessages.map((msg, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/5 shadow-sm hover:bg-white/15 transition-colors animate-fade-in-up">
                                    <p className="text-gray-100 font-medium leading-relaxed">
                                        "{msg}"
                                    </p>
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
                </div>
                
                <div className="text-center pb-8 sticky bottom-0 w-full bg-gradient-to-t from-[var(--snow-white)] pt-10 to-transparent pointer-events-none flex justify-center">
                    <Button className="pointer-events-auto shadow-xl rounded-full px-8 bg-forest-green hover:bg-green-700 animate-pulse text-white font-bold" asChild>
                         <Link href="/">
                            나도 산타 테스트 하러가기 👉
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
