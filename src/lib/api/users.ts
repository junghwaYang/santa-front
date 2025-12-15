import { apiClient } from "./client";
import type { UserInfo, UserByLink } from "./types";

export const usersApi = {
  // 사용자 정보 조회
  getUser: async (userId: string): Promise<UserInfo> => {
    return apiClient.get<UserInfo>(`/users/${userId}`);
  },

  // 고유 링크로 사용자 조회
  getUserByLink: async (uniqueLink: string): Promise<UserByLink> => {
    return apiClient.get<UserByLink>(`/users/link/${uniqueLink}`);
  },

  // 닉네임 설정
  setNickname: async (nickname: string): Promise<void> => {
    return apiClient.post<void>("/users/nickname", { nickname });
  },
};
