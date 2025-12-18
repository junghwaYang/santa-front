import { apiClient, tokenStorage } from "./client";
import type { AuthResponse, RefreshResponse, User } from "./types";

export const authApi = {
  // 소셜 로그인
  socialLogin: async (provider: "kakao" | "google", accessToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/social", {
      provider,
      accessToken,
    });

    // 토큰 저장
    if (response.accessToken) {
      tokenStorage.setAccessToken(response.accessToken);
    }
    if (response.refreshToken) {
      tokenStorage.setRefreshToken(response.refreshToken);
    }

    return response;
  },

  // 토큰 갱신
  refresh: async (): Promise<RefreshResponse> => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
      refreshToken,
    });

    tokenStorage.setAccessToken(response.accessToken);
    return response;
  },

  // 현재 사용자 정보
  getMe: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      tokenStorage.clearTokens();
    }
  },

  // 로그인 상태 확인
  isLoggedIn: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },

  // 임시 토큰 발급 (카카오 에드핏 심사용)
  getTempToken: async (): Promise<{ tempToken: string }> => {
    return apiClient.post<{ tempToken: string }>("/auth/temp-token");
  },

  // 임시 토큰으로 로그인 (카카오 에드핏 심사용)
  tempLogin: async (tempToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/temp-login", {
      tempToken,
    });

    // 토큰 저장
    if (response.accessToken) {
      tokenStorage.setAccessToken(response.accessToken);
    }
    if (response.refreshToken) {
      tokenStorage.setRefreshToken(response.refreshToken);
    }

    return response;
  },
};
