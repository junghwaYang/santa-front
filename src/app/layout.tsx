import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { MSWProvider } from "@/components/msw-provider";

export const metadata: Metadata = {
  title: "올해의 나는 어떤 산타?",
  description: "친구들이 본 나의 크리스마스 캐릭터는 무엇일까요?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-background text-foreground">
        <MSWProvider>
            {children}
            <Toaster />
        </MSWProvider>
      </body>
    </html>
  );
}
