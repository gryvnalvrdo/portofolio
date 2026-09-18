import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gryven Alverdo Gunawan — Software Engineer",
  description:
    "Portfolio of Gryven Alverdo Gunawan — Software Engineer actively job hunting. Creator of the Job Hunting Suite: JobTrail, CoverCraft, and AutoApply Flow.",
  keywords: [
    "Gryven Alverdo Gunawan",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "Python",
    "Machine Learning",
    "Makassar",
  ],
  openGraph: {
    title: "Gryven Alverdo Gunawan — Software Engineer",
    description:
      "I'm not just job hunting — I'm engineering the process. Explore my Job Hunting Suite portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
