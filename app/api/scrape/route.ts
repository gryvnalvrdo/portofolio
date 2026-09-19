import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Try standard fetch first
    let response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    if (!response.ok) {
      console.log(`Standard fetch failed for ${url} with status ${response.status}. Trying proxy...`);
      // Fallback for sites like WeWorkRemotely that block basic fetches
      response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch via proxy: ${response.status} ${response.statusText}`);
      }
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
