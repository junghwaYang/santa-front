"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Copy, Download, Share2, Gift } from "lucide-react";
import { MessageTree } from "@/components/message-tree";
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
        "운동 좀 그만하고 술 좀 마시자 ㅋㅋㅋ 농담이고 건강해라!"
    ]
};

export default function ResultPage() {
    const params = useParams(); // params.id
    
    const handleCopy = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            toast.success("결과 링크가 복사되었습니다!", {
                duration: 2000,
            });
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center max-w-md mx-auto relative shadow-2xl overflow-hidden py-10 px-4 bg-transparent">
            
            <header className="w-full text-center space-y-3 mb-10 animate-fade-in-down">
                <span className="text-forest-green font-bold text-sm tracking-widest uppercase">Result</span>
                <h1 className="text-xl font-medium text-foreground leading-tight">
                    친구들이 생각하는 2025<br/>
                    <span className="font-bold text-3xl">{RESULT_DATA.userName}</span>님은
                </h1>
            </header>
            
            <main className="w-full space-y-10 animate-fade-in-up">
                {/* Character Card */}
                <div className="w-full">
                    <Card className="relative bg-[#1D3557]/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2rem] overflow-hidden p-8 flex flex-col items-center text-center space-y-6">
                        <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/5 relative mb-4">
                            {/* Character Image Placeholder */}
                            <Gift className="w-24 h-24 text-christmas-red drop-shadow-md" style={{ filter: 'drop-shadow(0 0 20px rgba(230, 57, 70, 0.3))' }} />
                            <div className="absolute -bottom-3 bg-[#0B132B] text-gold text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 tracking-wider">
                                TOP 1%
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-[#2A9D8F] font-bold text-lg tracking-widest uppercase opacity-90">{RESULT_DATA.modifier}</h2>
                            <h3 className="text-4xl font-bold text-white tracking-tight leading-tight">{RESULT_DATA.character}</h3>
                        </div>
                        
                        <p className="text-gray-300 text-base leading-relaxed px-4 font-light opacity-90">
                            {RESULT_DATA.description}
                        </p>
                    </Card>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-3">
                     <Button variant="outline" className="h-14 border-christmas-red text-christmas-red hover:bg-christmas-red/10 bg-transparent flex gap-1 px-0" onClick={handleCopy}>
                        <Copy className="w-5 h-5" />
                        <span className="text-sm font-medium">링크복사</span>
                    </Button>
                    <Button variant="outline" className="h-14 border-christmas-red text-christmas-red hover:bg-christmas-red/10 bg-transparent flex gap-1 px-0">
                        <Download className="w-5 h-5" />
                         <span className="text-sm font-medium">이미지</span>
                    </Button>
                    <Button className="h-14 bg-[#FEE500] hover:bg-[#FDD835] text-black border-none flex gap-1 px-0">
                        <Share2 className="w-5 h-5" />
                         <span className="text-sm font-medium">카카오</span>
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

                {/* Messages Section */}
                {/* Messages Section - Tree Visualization */}
                <div className="space-y-6 pb-20">
                    <h3 className="font-bold text-xl flex items-center gap-2 text-white justify-center">
                        🎄 내 트리에 달린 편지 <span className="bg-christmas-red text-white text-xs px-2 py-1 rounded-full">{RESULT_DATA.messages.length}</span>
                    </h3>
                    
                    <div className="bg-[#1D3557]/20 rounded-[2.5rem] p-4 border border-white/5 shadow-inner">
                         <MessageTree messages={RESULT_DATA.messages} userName={RESULT_DATA.userName} />
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
