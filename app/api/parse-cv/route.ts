import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("cv") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const pdfParse = require("pdf-parse");
    const data = await pdfParse(buffer);
    
    return NextResponse.json({ success: true, text: data.text }, { status: 200 });
  } catch (error) {
    console.error("PDF Parse Error:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
