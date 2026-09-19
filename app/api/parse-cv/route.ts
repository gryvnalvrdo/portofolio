import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFParser = require("pdf2json");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser(null, 1);
      pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
        resolve(pdfParser.getRawTextContent());
      });
      pdfParser.parseBuffer(buffer);
    });

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
          contents: [{ parts: [{ text: `Extract the following from this CV text:\n1. The applicant's full name.\n2. A summary of their Skills and Experience (do not include the entire text, just the key skills and work experience summarized for a cover letter background).\n\nRespond ONLY with a valid JSON object in this format:\n{"name": "...", "background": "..."}\n\nCV Text:\n${text}` }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 2048 },
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ success: true, text: parsed.background, name: parsed.name }, { status: 200 });
        } catch (e) {}
      }
    }
    
    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error: any) {
    console.error("PDF Parse Error:", error);
    return NextResponse.json({ error: error?.message || error || "Failed to parse PDF" }, { status: 500 });
  }
}
