import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "마이산타",
    short_name: "마이산타",
    description:
      "친구들이 본 나의 크리스마스 캐릭터는? 산타, 루돌프, 요정 중 나는 어떤 타입일까요?",
    start_url: "/",
    display: "standalone",
    background_color: "#0B132B",
    theme_color: "#E63946",
    orientation: "portrait",
    icons: [
      {
        src: "/manyfast.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/manyfast.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
