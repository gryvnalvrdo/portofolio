import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Basic fetch
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Attempt to remove scripts, styles, nav, headers, footers to get clean text
    $('script, style, nav, header, footer, aside, .sidebar, iframe, img, svg').remove();
    
    // For specific job boards (like WeWorkRemotely), we can target their specific classes, 
    // but a general text extraction is usually okay if we've removed the junk.
    let text = $('body').text();
    
    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    // Limit to prevent huge payloads
    text = text.slice(0, 15000); 

    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error) {
    console.error("Scrape Error:", error);
    return NextResponse.json({ error: "Failed to scrape URL" }, { status: 500 });
  }
}
