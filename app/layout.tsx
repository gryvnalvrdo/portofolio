import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gryven Alverdo Gunawan | Full-Stack Software Engineer",
  description:
    "Portfolio of Gryven Alverdo Gunawan, Full-Stack Software Engineer building SaaS applications (JobTrail), AI micro-tools (CoverCraft), n8n automation pipelines (AutoApply Flow), and enterprise reservation systems (Hotel Claro Makassar).",
  keywords: [
    "Gryven Alverdo Gunawan",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js 15",
    "Laravel 11",
    "TypeScript",
    "Prisma",
    "Python",
    "Machine Learning",
    "Makassar",
  ],
  openGraph: {
    title: "Gryven Alverdo Gunawan | Full-Stack Software Engineer",
    description:
      "Full-stack SaaS applications, hospitality ERP systems, intelligent n8n automation, and AI workflows.",
    type: "website",
    url: "https://portofolio-seven-lac-56.vercel.app",
    siteName: "Gryven Alverdo Gunawan",
    locale: "en_US",
    images: [
      {
        url: "https://portofolio-seven-lac-56.vercel.app/photo.jpeg",
        width: 800,
        height: 800,
        alt: "Gryven Alverdo Gunawan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gryven Alverdo Gunawan | Full-Stack Software Engineer",
    description:
      "Full-stack SaaS applications, hospitality ERP systems, intelligent n8n automation, and AI workflows.",
    images: ["https://portofolio-seven-lac-56.vercel.app/photo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/photo.jpeg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
