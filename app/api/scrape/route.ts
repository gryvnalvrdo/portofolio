import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, validateExternalUrl } from "@/lib/security";

const MAX_HTML_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit("scrape", ip, 12, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many scrape requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSeconds) },
        }
      );
    }

    const body = await req.json().catch(() => null);
    const targetUrl = validateExternalUrl(body?.url);

    if (!targetUrl) {
      return NextResponse.json(
        { error: "Invalid or restricted URL. Please provide a public http/https job URL." },
        { status: 400 }
      );
    }

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    };

    const res = await fetch(targetUrl.toString(), {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    // Re-validate final URL after redirects to prevent open-redirect SSRF
    if (res.url && !validateExternalUrl(res.url)) {
      return NextResponse.json(
        { error: "Redirect target is not permitted." },
        { status: 400 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "This website blocks automated scraping. Please copy-paste the description manually." },
        { status: 422 }
      );
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      return NextResponse.json(
        { error: "Target URL did not return readable HTML content." },
        { status: 422 }
      );
    }

    const rawHtml = await res.text();
    const html = rawHtml.slice(0, MAX_HTML_BYTES);

    let text = extractJobDescription(html);
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
    return NextResponse.json(
      { error: "Could not reach target URL. Please paste the job description manually." },
      { status: 422 }
    );
  }
}

function extractJobDescription(html: string): string {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ");

  const sitePatterns: RegExp[] = [
    /<div[^>]*class="[^"]*job-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<section[^>]*class="[^"]*job[^"]*"[^>]*>([\s\S]*?)<\/section>/i,
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="jobDescriptionText"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*jobDescriptionContent[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
  ];

  let extracted = "";
  for (const pattern of sitePatterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[1].length > 200) {
      extracted = match[1];
      break;
    }
  }

  extracted = (extracted || text).replace(/<[^>]+>/g, " ");

  extracted = extracted
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'");

  return extracted.replace(/\s+/g, " ").trim();
}
