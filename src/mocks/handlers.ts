import { http, HttpResponse } from "msw";

export const handlers = [
  // Auth - Login (Mock)
  http.post("/api/auth/login", () => {
    return HttpResponse.json({
      user: {
        id: "user-123",
        name: "양정화",
        email: "santa@example.com",
      },
      token: "mock-jwt-token",
    });
  }),

  // User - Get Profile
  http.get("/api/user/profile", () => {
    return HttpResponse.json({
      id: "user-123",
      name: "양정화",
      link: "https://santa.app/q/user-123",
    });
  }),

  // User - Get Status (Response Check)
  http.get("/api/user/:id/status", () => {
    // Mocking 3 responses for testing result view
    return HttpResponse.json({
      responseCount: 3,
      requiredCount: 3,
      isReady: true,
    });
  }),

  // Questions - Submit Answer
  http.post("/api/questions/:id/answer", () => {
    return HttpResponse.json({ success: true });
  }),

  // Result - Get Result
  http.get("/api/result/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id: id,
      userName: "양정화",
      character: "SANTA",
      modifier: "SELF_CARE",
      description:
        "당신은 목표를 향해 꾸준히 달리는 갓생러 산타예요! 친구들은 당신의 성실함과 리더십을 정말 높게 평가하고 있답니다.",
      stats: [
        { question: "첫인상과 실제", topAnswer: "다정해요", percentage: 51 },
        { question: "모임에서의 역할", topAnswer: "총무 스타일", percentage: 34 },
        { question: "힘들 때 모습", topAnswer: "운동으로 극복", percentage: 60 },
        { question: "어울리는 선물", topAnswer: "건강식품", percentage: 45 },
        { question: "10년 후 모습", topAnswer: "성공한 사업가", percentage: 70 },
      ],
      messages: [
        "올 한 해도 고생했어! 내년에도 함께하자 ❤️",
        "너랑 친구여서 정말 다행이야. 메리 크리스마스!",
        "항상 배울 점이 많은 친구야. 응원해!",
      ],
    });
  }),
];
