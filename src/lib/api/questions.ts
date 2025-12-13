import { apiClient } from "./client";
import type { QuestionsResponse } from "./types";

export const questionsApi = {
  // 질문 목록 조회
  getQuestions: async (): Promise<QuestionsResponse> => {
    return apiClient.get<QuestionsResponse>("/questions");
  },
};
