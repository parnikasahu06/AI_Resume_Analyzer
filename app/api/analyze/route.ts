import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/parser/pdf-parser";
import { extractTextFromDocx } from "@/lib/parser/docx-parser";
import { extractResumeData } from "@/lib/parser/resume-extractor";
import { calculateAtsScore } from "@/lib/ats/ats-scorer";
import { matchResumeToJd } from "@/lib/matcher/jd-matcher";
import { analyzeSkillsGap } from "@/lib/skills/skills-analyzer";
import { generateAiSuggestions } from "@/lib/ai/ai-engine";
import { analyzeGrammarAndReadability } from "@/lib/grammar/grammar-analyzer";
import { SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION_TEXT } from "@/lib/sample-data";
import { CompleteAnalysisReport, JobDescription } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let resumeText = "";
    let jdText = "";
    let fileName = "Uploaded_Resume.pdf";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const resumeFile = formData.get("resumeFile") as File | null;
      const rawResumeText = formData.get("resumeText") as string | null;
      const rawJdText = formData.get("jdText") as string | null;
      const useSample = formData.get("useSample") === "true";

      if (useSample) {
        resumeText = SAMPLE_RESUME_TEXT;
        jdText = SAMPLE_JOB_DESCRIPTION_TEXT;
        fileName = "Sample_Resume_Alex_Morgan.pdf";
      } else {
        if (rawResumeText && rawResumeText.trim().length > 20) {
          resumeText = rawResumeText;
        }

        if (resumeFile) {
          fileName = resumeFile.name;
          const arrayBuffer = await resumeFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          if (resumeFile.name.endsWith(".pdf") || resumeFile.type === "application/pdf") {
            resumeText = await extractTextFromPdf(buffer);
          } else if (
            resumeFile.name.endsWith(".docx") ||
            resumeFile.type.includes("wordprocessingml")
          ) {
            resumeText = await extractTextFromDocx(buffer);
          } else if (resumeFile.name.endsWith(".txt")) {
            resumeText = buffer.toString("utf-8");
          }
        }

        if (rawJdText && rawJdText.trim().length > 10) {
          jdText = rawJdText;
        }
      }
    } else {
      const body = await req.json();
      resumeText = body.resumeText || "";
      jdText = body.jdText || "";
      fileName = body.fileName || "Uploaded_Resume.txt";
    }

    if (!resumeText || resumeText.trim().length < 30) {
      return NextResponse.json(
        { error: "Resume content is missing or too short. Please provide a valid resume." },
        { status: 400 }
      );
    }

    // 1. Extract Structured Resume Data
    const parsedResume = extractResumeData(resumeText);

    // 2. Build Job Description Object
    const jobDescription: JobDescription = {
      rawText: jdText || "Software Engineer",
      keywords: jdText ? extractKeywordsFromJdText(jdText) : parsedResume.skills.technical.slice(0, 10),
      requiredSkills: jdText ? extractSkillsFromJdText(jdText) : parsedResume.skills.all.slice(0, 8),
      preferredSkills: ["Kubernetes", "AWS", "GraphQL", "Redis"],
    };

    // 3. Calculate Core Metrics
    const atsScore = calculateAtsScore(parsedResume, jobDescription);
    const jobMatch = matchResumeToJd(parsedResume, jobDescription);
    const skillsGap = analyzeSkillsGap(parsedResume, jobDescription);
    const aiSuggestions = await generateAiSuggestions(parsedResume, jobDescription);
    const grammar = analyzeGrammarAndReadability(resumeText);

    const report: CompleteAnalysisReport = {
      id: "rpt_" + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      fileName,
      parsedResume,
      jobDescription,
      atsScore,
      jobMatch,
      skillsGap,
      aiSuggestions,
      grammar,
    };

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing the resume analysis." },
      { status: 500 }
    );
  }
}

function extractKeywordsFromJdText(jdText: string): string[] {
  const common = [
    "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "SQL", "PostgreSQL",
    "MongoDB", "AWS", "Docker", "Kubernetes", "GraphQL", "REST APIs", "CI/CD", "Jest",
    "Redux", "Zustand", "Redis", "Security", "Microservices"
  ];
  return common.filter(kw => new RegExp(`\\b${kw}\\b`, "i").test(jdText));
}

function extractSkillsFromJdText(jdText: string): string[] {
  return extractKeywordsFromJdText(jdText);
}
