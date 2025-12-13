import { apiClient } from "./client";
import type { ResultResponse, ShareChannel } from "./types";

export const resultsApi = {
  // 결과 조회
  getResult: async (userId: string): Promise<ResultResponse> => {
    return apiClient.get<ResultResponse>(`/results/${userId}`);
  },

  // 결과 공유 기록
  shareResult: async (
    userId: string,
    channel: ShareChannel
  ): Promise<{ message: string; channel: string }> => {
    return apiClient.post(`/results/${userId}/share`, { channel });
  },
};
