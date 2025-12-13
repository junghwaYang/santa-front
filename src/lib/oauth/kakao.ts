declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; scope?: string }) => void;
        setAccessToken: (token: string) => void;
        getAccessToken: () => string | null;
        logout: () => Promise<void>;
      };
      API: {
        request: (options: { url: string }) => Promise<unknown>;
      };
    };
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "";

export const initKakao = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.Kakao?.isInitialized?.()) {
      resolve();
      return;
    }

    // 카카오 SDK 스크립트가 이미 로드되어 있는지 확인
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      resolve();
      return;
    }

    // SDK 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.integrity = "sha384-DKYJZ8NLiK8MN4/C5P2ezmLTBaLcBuD0MgT7CKwHlVPBq2RpMHs9ZtRxHN3sVXt/";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
      resolve();
    };
    document.head.appendChild(script);
  });
};

export const kakaoLogin = (): void => {
  if (typeof window === "undefined" || !window.Kakao) return;

  const redirectUri = `${window.location.origin}/auth/kakao/callback`;
  window.Kakao.Auth.authorize({
    redirectUri,
    scope: "profile_nickname,profile_image,account_email",
  });
};

export const getKakaoAccessToken = (): string | null => {
  if (typeof window === "undefined" || !window.Kakao) return null;
  return window.Kakao.Auth.getAccessToken();
};
