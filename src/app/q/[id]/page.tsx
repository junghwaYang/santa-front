"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation"; // useParams for ID
import { QUESTIONS, AnswerOption } from "@/lib/data/questions"; // Assuming aliases work
// If aliases like @/ don't work in write_to_file check, I will try relative path. usually @/ works if tsconfig has it.
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Need to install progress if not yet
import { Textarea } from "@/components/ui/textarea"; // Need to install textarea? I only installed input. I will use Input or semantic textarea.
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function QuestionnairePage() {
    const router = useRouter();
    const params = useParams(); // params.id
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerOption[]>([]);
    const [warmMessage, setWarmMessage] = useState("");
    
    // Total steps: 5 questions + 1 message
    const totalSteps = QUESTIONS.length + 1;
    const progress = ((currentIndex + 1) / totalSteps) * 100;

    const handleAnswer = (option: AnswerOption) => {
        setAnswers([...answers, option]);
        if (currentIndex < QUESTIONS.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSubmit = () => {
        // TODO: Submit answers and message to API
        console.log("Answers:", answers);
        console.log("Message:", warmMessage);
        
        // Redirect to done page
        router.push(`/q/${params.id}/done`);
    };

    const userName = "양정화"; // Mock user name from API fetch based on ID

    if (currentIndex < QUESTIONS.length) {
        const question = QUESTIONS[currentIndex];
        return (
            <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
                <header className="p-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => {
                        if(currentIndex > 0) setCurrentIndex(currentIndex - 1);
                        else router.back();
                    }}>
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Progress value={progress} className="h-2 flex-1 bg-gray-200" indicatorClassName="bg-christmas-red" />
                    <span className="text-xs font-bold text-christmas-red">{currentIndex + 1}/{totalSteps}</span>
                </header>

                <main className="flex-1 flex flex-col p-6 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 key={currentIndex}">
                    <div className="space-y-4">
                        <span className="text-christmas-red font-bold text-xl tracking-wider">Q.{question.id}</span>
                        <h1 className="text-3xl font-bold text-foreground leading-snug whitespace-pre-wrap">
                            {question.text.replace("[이름]", userName)}
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {question.options.map((option) => (
                            <Card 
                                key={option.id} 
                                className="p-5 cursor-pointer bg-[#1D3557]/80 backdrop-blur-md hover:border-christmas-red hover:bg-[#1D3557] transition-all active:scale-[0.98] border-2 border-transparent hover:shadow-[0_0_15px_rgba(230,57,70,0.5)]"
                                onClick={() => handleAnswer(option)}
                            >
                                <span className="text-xl font-medium text-white">{option.text}</span>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Message Step
    return (
        <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
            <header className="p-4 flex items-center gap-4">
                 <Button variant="ghost" size="icon" onClick={() => setCurrentIndex(currentIndex - 1)} className="hover:bg-white/10 text-white">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Progress value={100} className="h-2 flex-1 bg-white/20" indicatorClassName="bg-christmas-red" />
                <span className="text-xs font-bold text-christmas-red">Last</span>
            </header>

            <main className="flex-1 flex flex-col p-6 space-y-10 animate-in fade-in">
                 <div className="space-y-4">
                    <span className="text-christmas-red font-bold text-xl">To. {userName}</span>
                    <h1 className="text-3xl font-bold text-white leading-snug">
                        친구에게 따뜻한<br/>
                        한마디를 남겨주세요!
                    </h1>
                </div>
                
                <div className="space-y-4 flex-1">
                    <Textarea 
                        className="w-full h-48 p-5 rounded-xl border border-christmas-red/30 focus:border-christmas-red focus:ring-1 focus:ring-christmas-red bg-[#1D3557]/90 resize-none text-xl placeholder:text-gray-500 text-white leading-relaxed"
                        placeholder="올 한 해도 고생했어! 내년에도 함께하자 ❤️"
                        value={warmMessage}
                        onChange={(e) => setWarmMessage(e.target.value)}
                    />
                    <p className="text-sm text-gray-400 text-right">{warmMessage.length}자</p>
                </div>

                <Button 
                    size="lg" 
                    className="w-full h-16 text-xl font-bold bg-christmas-red hover:bg-[#A01830] shadow-lg mb-8"
                    disabled={!warmMessage.trim()}
                    onClick={handleSubmit}
                >
                    💌 답변 보내기
                </Button>
            </main>
        </div>
    );
}
