import { apiClient } from "./client";
import type {
  CheckResponseResult,
  SubmitResponseRequest,
  SubmitResponseResult,
  ResponsesListResult,
} from "./types";

export const responsesApi = {
  // 응답 가능 여부 확인
  checkCanRespond: async (userId: string): Promise<CheckResponseResult> => {
    return apiClient.get<CheckResponseResult>(`/responses/check?userId=${userId}`);
  },

  // 응답 제출
  submitResponse: async (data: SubmitResponseRequest): Promise<SubmitResponseResult> => {
    return apiClient.post<SubmitResponseResult>("/responses", data);
  },

  // 응답 목록 조회 (본인만)
  getResponses: async (userId: string): Promise<ResponsesListResult> => {
    return apiClient.get<ResponsesListResult>(`/responses/${userId}`);
  },
};
