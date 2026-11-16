import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security";

const MAX_PROMPT_LENGTH = 15000;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit("generate", ip, 10, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before generating again." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI generation service is currently unavailable." },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt cannot be empty." },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: "Input exceeds the maximum allowed length." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
        }),
        signal: AbortSignal.timeout(25_000),
      }
    );

    if (!res.ok) {
      const status = res.status === 429 ? 429 : 502;
      return NextResponse.json(
        {
          error:
            status === 429
              ? "AI service is experiencing high demand. Please retry shortly."
              : "Failed to reach AI generation service.",
        },
        { status }
      );
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: "AI service returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: text });
  } catch (error: unknown) {
    console.error("CoverCraft API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while generating your cover letter." },
      { status: 500 }
    );
  }
}
