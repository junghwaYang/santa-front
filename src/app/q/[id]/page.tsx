import type { Metadata } from "next";
import QuestionnaireClient from "./questionnaire-client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://4cs3n81u9f.execute-api.ap-northeast-2.amazonaws.com/v1";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mysanta.shop";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getUserByLink(uniqueLink: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/link/${uniqueLink}`, {
      next: { revalidate: 60 }, // 1분 캐시
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    // API 응답이 { success: true, data: ... } 형식인 경우
    if (json && typeof json === "object" && "success" in json && "data" in json) {
      return json.data;
    }
    return json;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: uniqueLink } = await params;
  const user = await getUserByLink(uniqueLink);

  const userName = user?.name || "친구";
  const title = `${userName}님의 성격에 맞는 캐릭터는?`;
  const description = `${userName}님에게 어울리는 크리스마스 캐릭터를 알려주세요!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/q/${uniqueLink}`,
      images: [
        {
          url: "/og-meta.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-meta.png"],
    },
  };
}

export default async function QuestionnairePage({ params }: PageProps) {
  const { id: uniqueLink } = await params;

  return <QuestionnaireClient uniqueLink={uniqueLink} />;
}
