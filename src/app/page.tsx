import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Snowflake } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Snowflakes Decoration */}
        <div className="absolute top-10 left-10 opacity-20 animate-pulse">
            <Snowflake className="w-12 h-12 text-christmas-red" />
        </div>
        <div className="absolute top-20 right-10 opacity-20 animate-pulse delay-700">
            <Snowflake className="w-8 h-8 text-forest-green" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 animate-pulse delay-300">
            <Snowflake className="w-16 h-16 text-gold" />
        </div>

        <main className="w-full max-w-md flex flex-col items-center text-center space-y-10 z-10 animate-fade-in-up">
            <div className="space-y-2">
                <span className="text-forest-green font-bold tracking-widest text-sm uppercase mb-2 block">2025 Christmas Project</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-christmas-red drop-shadow-sm flex flex-col items-center gap-3">
                   <span>올해의 나는</span>
                   <span className="flex items-center gap-2">
                       <Sparkles className="w-10 h-10 text-gold" />
                       어떤 산타?
                       <Sparkles className="w-10 h-10 text-gold" />
                   </span>
                </h1>
            </div>
            
            <div className="relative group cursor-pointer transition-transform hover:scale-105 duration-300">
                <div className="absolute inset-0 bg-christmas-red/20 rounded-full blur-2xl group-hover:bg-christmas-red/30 transition-colors" />
                <div className="w-72 h-72 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center border-[8px] border-white shadow-2xl relative z-10">
                    <Gift className="w-36 h-36 text-christmas-red drop-shadow-md" />
                </div>
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-forest-green text-white px-6 py-2 rounded-full text-base font-bold shadow-lg whitespace-nowrap">
                    친구들이 만들어주는 내 캐릭터
                </div>
            </div>
            
            <div className="space-y-8 w-full px-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                    내 친구들은 나를<br/>
                    <span className="font-bold text-foreground">어떻게 생각하고 있을까요?</span>
                </p>
                
                <Button size="lg" className="w-full text-xl font-bold h-16 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all bg-christmas-red hover:bg-[#A01830] text-white animate-bounce-subtle" asChild>
                    <Link href="/login">
                       🎅 시작하기
                    </Link>
                </Button>
            </div>
        </main>
        
        <footer className="absolute bottom-6 text-xs text-center text-muted-foreground/60">
            © 2025 Santa Project. All rights reserved.
        </footer>
    </div>
  );
}
