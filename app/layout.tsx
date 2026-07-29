import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Analyzer - ATS Score & Job Description Matcher",
  description:
    "Production-grade AI-powered Resume Analyzer that parses PDF/DOCX resumes, evaluates against job descriptions, calculates weighted ATS scores, performs TF-IDF job matching, gap analysis, and exports downloadable audit reports.",
  keywords: [
    "AI Resume Analyzer",
    "ATS Resume Checker",
    "Job Description Matcher",
    "Resume Parser",
    "TF-IDF Resume Matcher",
    "ATS Score Generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
