import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code, redirectUri } = await request.json();

    const restApiKey = process.env.KAKAO_REST_API_KEY;
    console.log("KAKAO_REST_API_KEY exists:", !!restApiKey);
    console.log("Redirect URI:", redirectUri);

    if (!restApiKey) {
      return NextResponse.json(
        { error: "missing_config", message: "KAKAO_REST_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const params: Record<string, string> = {
      grant_type: "authorization_code",
      client_id: restApiKey,
      redirect_uri: redirectUri,
      code,
    };

    // Client Secret이 설정되어 있으면 추가
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    if (clientSecret) {
      params.client_secret = clientSecret;
    }

    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams(params),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Kakao token error:", data);
      return NextResponse.json(
        { error: data.error, message: data.error_description },
        { status: response.status }
      );
    }

    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
  }
}
