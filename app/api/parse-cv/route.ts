import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFParser = require("pdf2json");

const MAX_PDF_BYTES = 4 * 1024 * 1024; // 4 MB
const MAX_TEXT_CHARS = 12000;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit("parse-cv", ip, 8, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many PDF uploads. Please wait a moment and try again." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const formData = await req.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (file.size === 0 || file.size > MAX_PDF_BYTES) {
      return NextResponse.json(
        { error: "PDF file must be between 1 byte and 4 MB." },
        { status: 400 }
      );
    }

    const isPdfName = file.name.toLowerCase().endsWith(".pdf");
    const isPdfMime = !file.type || file.type === "application/pdf";
    if (!isPdfName || !isPdfMime) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are accepted." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify PDF magic bytes (%PDF-)
    if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return NextResponse.json(
        { error: "Uploaded file is not a valid PDF document." },
        { status: 400 }
      );
    }

    const rawExtracted = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, 1);
      pdfParser.on(
        "pdfParser_dataError",
        (errData: { parserError?: unknown }) => reject(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.parseBuffer(buffer);
    });

    const text = rawExtracted.slice(0, MAX_TEXT_CHARS);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true, text }, { status: 200 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Extract the following from this CV text:\n1. The applicant's full name.\n2. A summary of their Skills and Experience (do not include the entire text, just the key skills and work experience summarized for a cover letter background).\n\nRespond ONLY with a valid JSON object in this format:\n{"name": "...", "background": "..."}\n\nCV Text:\n${text}`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 2048 },
        }),
        signal: AbortSignal.timeout(20_000),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          if (typeof parsed?.background === "string") {
            return NextResponse.json(
              {
                success: true,
                text: parsed.background,
                name: typeof parsed.name === "string" ? parsed.name : undefined,
              },
              { status: 200 }
            );
          }
        } catch {
          // Fallback to extracted raw text
        }
      }
    }

    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error: unknown) {
    console.error("PDF Parse Error:", error);
    return NextResponse.json(
      { error: "Unable to parse the uploaded PDF. Please paste your resume text manually." },
      { status: 500 }
    );
  }
}
