"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Gift } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateProfilePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // TODO: Call API to save user and generate link
      router.push("/my"); // Redirect to Dashboard/Share page
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen bg-transparent">
      <header className="p-4 flex items-center relative z-10">
        <Button variant="ghost" size="icon" asChild className="hover:bg-transparent">
            <Link href="/login">
                <ChevronLeft className="w-6 h-6 text-foreground" />
            </Link>
        </Button>
      </header>
      
      <main className="flex-1 flex flex-col px-6 space-y-8 pt-10">
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground leading-tight">
                <span className="text-christmas-red">산타 이름표</span>를<br/>
                만들어주세요!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
                친구들이 나를 알아볼 수 있도록<br/>
                이름이나 닉네임을 입력해주세요.
            </p>
        </div>
        
        <div className="flex justify-center py-6">
             <div className="w-32 h-32 bg-cream rounded-full flex items-center justify-center border-4 border-gold shadow-inner">
                <Gift className="w-16 h-16 text-christmas-red animate-bounce-subtle" />
             </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">닉네임</Label>
                <Input 
                    id="name" 
                    placeholder="예: 루돌프, 산타할아버지" 
                    className="h-12 text-lg bg-[#1D3557] border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-christmas-red focus-visible:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={10}
                    required
                />
                <p className="text-xs text-muted-foreground text-right">{name.length}/10</p>
            </div>
            
            <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-bold bg-christmas-red hover:bg-[#A01830] transition-all shadow-lg mt-8"
                disabled={!name.trim()}
            >
                내 산타 링크 만들기
            </Button>
        </form>
      </main>
    </div>
  );
}
