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
    
    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error: any) {
    console.error("PDF Parse Error:", error);
    return NextResponse.json({ error: error?.message || error || "Failed to parse PDF" }, { status: 500 });
  }
}
