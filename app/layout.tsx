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
  title: "Gryven Alverdo Gunawan | Portfolio",
  description:
    "Portfolio of Gryven Alverdo Gunawan. Web applications (JobTrail, Hotel Claro Makassar), AI micro-tools (CoverCraft), n8n automation workflows (AutoApply Flow), and AI audio similarity search.",
  keywords: [
    "Gryven Alverdo Gunawan",
    "Software Developer",
    "Web Development",
    "Next.js",
    "Laravel",
    "TypeScript",
    "Prisma",
    "Python",
    "Machine Learning",
    "Makassar",
  ],
  openGraph: {
    title: "Gryven Alverdo Gunawan | Portfolio",
    description:
      "Web applications, hospitality reservation systems, n8n automation workflows, and AI tools.",
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
    title: "Gryven Alverdo Gunawan | Portfolio",
    description:
      "Web applications, hospitality reservation systems, n8n automation workflows, and AI tools.",
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
