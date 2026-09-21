import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Browser-like headers to avoid bot detection
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    };

    let html = "";
    let success = false;

    // Strategy 1: Direct fetch with full browser headers
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        html = await res.text();
        success = true;
      }
    } catch {
      console.log("Strategy 1 failed, trying proxy...");
    }

    // Strategy 2: allorigins proxy
    if (!success) {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
        if (res.ok) {
          const data = await res.json();
          html = data.contents || "";
          success = !!html;
        }
      } catch {
        console.log("Strategy 2 failed, trying corsproxy...");
      }
    }

    // Strategy 3: corsproxy.io
    if (!success) {
      try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl, { headers, signal: AbortSignal.timeout(10000) });
        if (res.ok) {
          html = await res.text();
          success = !!html;
        }
      } catch {
        console.log("Strategy 3 failed.");
      }
    }

    if (!success || !html) {
      return NextResponse.json(
        { error: "This website blocks automated scraping. Please copy-paste the description manually." },
        { status: 422 }
      );
    }

    // --- Smart text extraction ---
    let text = extractJobDescription(url, html);

    // Limit payload size
    text = text.slice(0, 12000);

    if (text.length < 100) {
      return NextResponse.json(
        { error: "Could not extract meaningful text. Please copy-paste manually." },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, text }, { status: 200 });
  } catch (error) {
    console.error("Scrape Error:", error);
    return NextResponse.json({ error: "Failed to scrape URL" }, { status: 500 });
  }
}

function extractJobDescription(url: string, html: string): string {
  // Simple regex-based extraction without cheerio dependency issues
  
  // Remove script and style tags with content
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ");

  // Site-specific extraction — target known job description containers
  const sitePatterns: { pattern: RegExp; name: string }[] = [
    // WeWorkRemotely
    { pattern: /<div[^>]*class="[^"]*job-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i, name: "WWR" },
    { pattern: /<section[^>]*class="[^"]*job[^"]*"[^>]*>([\s\S]*?)<\/section>/i, name: "Generic" },
    // LinkedIn
    { pattern: /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i, name: "LinkedIn" },
    // Indeed
    { pattern: /<div[^>]*id="jobDescriptionText"[^>]*>([\s\S]*?)<\/div>/i, name: "Indeed" },
    // Glassdoor
    { pattern: /<div[^>]*class="[^"]*jobDescriptionContent[^"]*"[^>]*>([\s\S]*?)<\/div>/i, name: "Glassdoor" },
    // Generic article/main content
    { pattern: /<article[^>]*>([\s\S]*?)<\/article>/i, name: "Article" },
    { pattern: /<main[^>]*>([\s\S]*?)<\/main>/i, name: "Main" },
  ];

  let extracted = "";
  for (const { pattern } of sitePatterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length > 200) {
      extracted = match[1];
      break;
    }
  }

  // Fallback to full body text
  if (!extracted) {
    extracted = text.replace(/<[^>]+>/g, " ");
  } else {
    extracted = extracted.replace(/<[^>]+>/g, " ");
  }

  // Decode common HTML entities
  extracted = extracted
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8226;/g, "•")
    .replace(/&#x27;/g, "'");

  // Collapse whitespace
  extracted = extracted.replace(/\s+/g, " ").trim();

  return extracted;
}
