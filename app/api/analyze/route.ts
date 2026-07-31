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
import { CompleteAnalysisReport, JobDescription, PdfQualityReport } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let resumeText = "";
    let jdText = "";
    let fileName = "Uploaded_Resume.pdf";

    let fileType = "Pasted Text";
    let fileSize = "Not evaluated";
    let pageCount = "Not evaluated";
    let isPdf = false;
    let isDocx = false;

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
        fileType = "PDF Document";
        fileSize = "142.5 KB";
        pageCount = "1 page(s)";
        isPdf = true;
      } else {
        if (rawResumeText && rawResumeText.trim().length > 20) {
          resumeText = rawResumeText;
          fileType = "Pasted Resume Text";
        }

        if (resumeFile) {
          fileName = resumeFile.name;
          const arrayBuffer = await resumeFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          fileSize = `${(buffer.length / 1024).toFixed(1)} KB`;

          if (resumeFile.name.endsWith(".pdf") || resumeFile.type === "application/pdf") {
            fileType = "PDF Document";
            isPdf = true;
            const pdfRes = await extractTextFromPdf(buffer);
            resumeText = pdfRes.text;
            if (pdfRes.numpages) {
              pageCount = `${pdfRes.numpages} page(s)`;
            }
          } else if (
            resumeFile.name.endsWith(".docx") ||
            resumeFile.type.includes("wordprocessingml")
          ) {
            fileType = "Word Document (.docx)";
            isDocx = true;
            resumeText = await extractTextFromDocx(buffer);
          } else if (resumeFile.name.endsWith(".txt")) {
            fileType = "Plain Text (.txt)";
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

    // 2. Build Job Description Object (only if valid JD text is provided)
    const hasJd = !!(jdText && jdText.trim().length > 10);
    const jobDescription: JobDescription = {
      rawText: hasJd ? jdText : "",
      keywords: hasJd ? extractKeywordsFromJdText(jdText) : [],
      requiredSkills: hasJd ? extractSkillsFromJdText(jdText) : [],
      preferredSkills: [],
    };

    // 3. Calculate Core Metrics
    const atsScore = calculateAtsScore(parsedResume, jobDescription);
    const jobMatch = matchResumeToJd(parsedResume, jobDescription);
    const skillsGap = analyzeSkillsGap(parsedResume, jobDescription);
    const aiSuggestions = await generateAiSuggestions(parsedResume, jobDescription);
    const grammar = analyzeGrammarAndReadability(resumeText);

    // 4. Compute Document Parsing & Quality Report
    const urlMatches = resumeText.match(/https?:\/\/[^\s]+|linkedin\.com\/in\/[^\s]+|github\.com\/[^\s]+/gi) || [];
    const hasHyperlinks = urlMatches.length > 0 ? `Detected (${urlMatches.length} link(s))` : "None detected";

    const hasControlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(resumeText);
    const unusualFormatting = hasControlChars ? "Detected" : "None detected";

    const hasTableTabs = /\t{2,}/.test(resumeText) || resumeText.includes("|---|");
    const tablesOrComplexLayout = hasTableTabs ? "Detected" : "None detected";

    const hasMultiColumn = /\s{4,}/.test(resumeText);
    const multiColumnParsingRisk: PdfQualityReport['multiColumnParsingRisk'] = hasMultiColumn ? "Medium" : "Low";

    const isLowWordCount = parsedResume.wordCount < 30;
    const scannedPdfRisk: PdfQualityReport['scannedPdfRisk'] = isPdf
      ? (isLowWordCount ? "High" : "Low")
      : "Not evaluated";

    const atsTextExtractionQuality: PdfQualityReport['atsTextExtractionQuality'] =
      parsedResume.wordCount >= 250 && parsedResume.experience.length > 0
        ? "High Quality"
        : parsedResume.wordCount >= 100
        ? "Moderate"
        : "Poor";

    let overallRisk: PdfQualityReport['overallRisk'] = "LOW";
    if (scannedPdfRisk === "High" || atsTextExtractionQuality === "Poor") {
      overallRisk = "HIGH";
    } else if (tablesOrComplexLayout === "Detected" || multiColumnParsingRisk === "Medium" || parsedResume.wordCount < 250 || parsedResume.wordCount > 1000) {
      overallRisk = "MEDIUM";
    }

    const detectedIssues: PdfQualityReport['detectedIssues'] = [];

    if (scannedPdfRisk === "High") {
      detectedIssues.push({
        property: "Empty / Scanned PDF Risk",
        status: "High Risk",
        explanation: "Extracted word count is extremely low (<30 words). The file appears to be a scanned image PDF without selectable text vectors."
      });
    }

    if (tablesOrComplexLayout === "Detected") {
      detectedIssues.push({
        property: "Tables or Complex Layout",
        status: "Detected",
        explanation: "Tab-aligned grids or table structures detected. Complex layouts carry a risk of line mixing during ATS text extraction."
      });
    }

    if (multiColumnParsingRisk === "Medium") {
      detectedIssues.push({
        property: "Multi-Column Parsing Risk",
        status: "Medium Risk",
        explanation: "Multi-space column padding detected. Ensure content flows sequentially to prevent side-by-side text scrambling."
      });
    }

    if (parsedResume.wordCount < 250) {
      detectedIssues.push({
        property: "Extracted Word Count",
        status: `${parsedResume.wordCount} words`,
        explanation: "Resume text is shorter than recommended (aim for 400-800 words for comprehensive ATS evaluation)."
      });
    }

    const pdfQuality: PdfQualityReport = {
      fileType,
      fileSize,
      pageCount,
      textExtractionSuccess: true,
      extractedWordCount: parsedResume.wordCount,
      hasHyperlinks,
      unusualFormatting,
      tablesOrComplexLayout,
      multiColumnParsingRisk,
      scannedPdfRisk,
      atsTextExtractionQuality,
      overallRisk,
      detectedIssues,
    };

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
      pdfQuality,
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
  const multiDomainKeywords = [
    // Tech & Data
    "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "SQL", "PostgreSQL",
    "MongoDB", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "GraphQL", "REST APIs", "CI/CD", "Jest",
    "Redux", "Zustand", "Redis", "Security", "Microservices", "Power BI", "Tableau", "Pandas",
    "NumPy", "Machine Learning", "Scikit-Learn", "PyTorch", "TensorFlow", "Snowflake", "BigQuery",
    // Security & DevOps
    "DevOps", "Terraform", "Linux", "Cybersecurity", "SIEM", "Splunk", "Incident Response", "Vulnerability Assessment",
    // Product & Ops
    "Product Management", "Product Roadmap", "Agile", "Scrum", "Jira", "Confluence", "Project Management",
    "Operations Management", "Process Optimization", "Logistics",
    // Marketing & Creative
    "Digital Marketing", "Google Ads", "Meta Ads", "Google Analytics", "SEO", "SEMrush", "Ahrefs",
    "Content Strategy", "Copywriting", "Graphic Design", "Photoshop", "Illustrator", "Figma", "UI/UX Design",
    // Finance & Accounting
    "Financial Analysis", "Financial Modeling", "Budgeting", "Forecasting", "Valuation", "Accounting",
    "General Ledger", "Accounts Payable", "Accounts Receivable", "P&L Analysis",
    // HR & Sales
    "HR Operations", "Employee Onboarding", "HRIS", "Recruitment", "LinkedIn Recruiter", "Talent Acquisition",
    "Sales", "Lead Generation", "Pipeline Management", "Salesforce", "HubSpot", "Customer Success", "Zendesk"
  ];
  return multiDomainKeywords.filter(kw => new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "i").test(jdText));
}

function extractSkillsFromJdText(jdText: string): string[] {
  return extractKeywordsFromJdText(jdText);
}
