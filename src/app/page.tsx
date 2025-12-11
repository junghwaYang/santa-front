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
                   <span>올해의 나는 어떤 산타?</span>
                </h1>
            </div>
            
            
            <div className="space-y-8 w-full px-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                    내 친구들은 나를<br/>
                    <span className="font-bold text-foreground">어떻게 생각하고 있을까요?</span>
                </p>
                
                {/* Video GIF Placeholder - User should provide main_video.gif */}
                <div className="flex justify-center pb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/main_move_v2.gif" alt="Christmas Animation" className="w-full object-cover animate-fade-in" />
                </div>

                <div className="space-y-4 pt-4">
                    {/* Kakao Login - Mock Redirect for Dev */}
                    <Button className="w-full h-14 bg-[#FEE500] hover:bg-[#FDD835] text-[#0B132B] font-medium text-lg rounded-xl flex items-center justify-center gap-3 relative shadow-sm border border-[#FEE500]" asChild>
                        <Link href="/create">
                            {/* Kakao Icon Placeholder */}
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true"><path d="M12 3c5.523 0 10 3.737 10 9.141 0 3.109-1.492 5.867-3.834 7.625l.893 3.393c.097.369-.267.703-.615.558l-3.951-1.637c-.822.115-1.666.177-2.493.177-5.523 0-10-3.737-10-9.141S6.477 3 12 3z"/></svg>
                            카카오로 3초만에 시작하기
                        </Link>
                    </Button>
                    
                    {/* Google Login - Mock Redirect for Dev */}
                    <Button variant="outline" className="w-full h-14 bg-white/90 hover:bg-white text-black font-medium text-lg rounded-xl flex items-center justify-center gap-3 relative shadow-sm border-0" asChild>
                         <Link href="/create">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.+81z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Google로 계속하기
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
        
        <footer className="absolute bottom-6 text-xs text-center text-muted-foreground/60">
            © 2025 Santa Project. All rights reserved.
        </footer>
    </div>
  );
}
