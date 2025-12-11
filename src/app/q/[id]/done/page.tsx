import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function DonePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--snow-white)] max-w-md mx-auto p-6 text-center space-y-8 relative shadow-xl">
            <div className="animate-bounce">
                <CheckCircle2 className="w-24 h-24 text-forest-green drop-shadow-lg" />
            </div>
            
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">답변 완료!</h1>
                <p className="text-muted-foreground text-lg">
                    친구에게 소중한 마음이<br/>
                    성공적으로 전달되었어요.
                </p>
            </div>
            
            <div className="w-full pt-8">
                <div className="bg-cream p-6 rounded-2xl border border-gold/30 shadow-sm space-y-4">
                    <p className="font-bold text-christmas-red">나도 산타 캐릭터를 확인해보고 싶다면?</p>
                    <Button size="lg" className="w-full h-12 bg-christmas-red hover:bg-[#A01830]" asChild>
                        <Link href="/">
                            🎅 나도 해보기
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
