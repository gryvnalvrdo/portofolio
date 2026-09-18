import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoverCraft — AI Cover Letter Generator | Gryven's Job Hunting Suite",
  description: "Generate personalized, ATS-optimized cover letters in seconds using Gemini AI. Free, no sign-up. Part of Gryven's Job Hunting Suite.",
};

export default function CoverCraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
