"use client";

import { useEffect, useRef } from "react";

interface KakaoAdfitProps {
  unit: string;
  width: number;
  height: number;
  className?: string;
}

export default function KakaoAdfit({ unit, width, height, className }: KakaoAdfitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 이미 광고가 로드되어 있으면 스킵
    if (container.querySelector("ins.kakao_ad_area")) return;

    // ins 태그 생성
    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", unit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));
    container.appendChild(ins);

    // 스크립트 로드
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [unit, width, height]);

  return <div ref={containerRef} className={className} />;
}
