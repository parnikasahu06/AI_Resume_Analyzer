import { ParsedResume, JobDescription, JobMatchResult, KeywordMatchItem } from "@/types";
import { computeTfIdfVectors } from "./tf-idf";
import { calculateCosineSimilarity } from "./cosine";

const TECH_KEYWORDS_LIST = [
  "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js", "Express",
  "Python", "Java", "C++", "C#", "Go", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Redis",
  "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Jest", "Cypress", "Tailwind CSS", "Prisma",
  "Redux", "Zustand", "Webpack", "Vite", "SEO", "Microservices", "Security", "Agile", "Scrum",
  "Machine Learning", "OpenAI", "LangChain", "Vector Databases"
];

export function matchResumeToJd(
  resume: ParsedResume,
  jd: JobDescription
): JobMatchResult {
  // 1. TF-IDF & Cosine Similarity
  const { vecA, vecB } = computeTfIdfVectors(resume.rawText, jd.rawText);
  const rawSimilarity = calculateCosineSimilarity(vecA, vecB);

  // Normalize similarity score to 0 - 1
  const similarityScore = Number(Math.max(0.1, Math.min(0.98, rawSimilarity * 2.2)).toFixed(2));

  // 2. Keyword Match & Extraction from JD
  const extractedJdKeywords = extractJdKeywords(jd.rawText);
  const matchingKeywords: KeywordMatchItem[] = [];
  const missingKeywords: KeywordMatchItem[] = [];

  extractedJdKeywords.forEach(kw => {
    const reg = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "gi");
    const resumeMatches = resume.rawText.match(reg) || [];
    const jdMatches = jd.rawText.match(reg) || [];

    const countInResume = resumeMatches.length;
    const countInJd = Math.max(1, jdMatches.length);

    if (countInResume > 0) {
      matchingKeywords.push({ keyword: kw, countInResume, countInJd });
    } else {
      missingKeywords.push({ keyword: kw, countInResume: 0, countInJd });
    }
  });

  // 3. Skills Match
  const resSkillsLower = new Set(resume.skills.all.map(s => s.toLowerCase()));
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  const requiredSkills = jd.requiredSkills.length > 0 ? jd.requiredSkills : extractedJdKeywords;

  requiredSkills.forEach(skill => {
    if (resSkillsLower.has(skill.toLowerCase()) || resume.rawText.toLowerCase().includes(skill.toLowerCase())) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 4. Calculate Final Match Percentage
  const skillRatio = matchingSkills.length / Math.max(1, requiredSkills.length);
  const keywordRatio = matchingKeywords.length / Math.max(1, extractedJdKeywords.length);

  const matchPercentage = Math.round((similarityScore * 40) + (skillRatio * 40) + (keywordRatio * 20));

  // 5. Summary Text
  let relevanceSummary = "";
  if (matchPercentage >= 80) {
    relevanceSummary = "Excellent Fit! Your resume shows high alignment with the technical requirements and key responsibilities of this job description.";
  } else if (matchPercentage >= 65) {
    relevanceSummary = "Good Candidate Match. You meet most key requirements, but adding a few missing technical skills and keywords will significantly boost your ATS score.";
  } else {
    relevanceSummary = "Moderate Gap Identified. Your background is related, but important keywords and core skills required in the job description are missing.";
  }

  return {
    matchPercentage: Math.min(99, Math.max(15, matchPercentage)),
    similarityScore,
    matchingSkills,
    missingSkills,
    matchingKeywords,
    missingKeywords,
    relevanceSummary,
  };
}

function extractJdKeywords(jdText: string): string[] {
  const found: string[] = [];
  TECH_KEYWORDS_LIST.forEach(kw => {
    const reg = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "i");
    if (reg.test(jdText)) {
      found.push(kw);
    }
  });
  return found.length > 0 ? found : ["TypeScript", "React", "Node.js", "SQL", "Git", "REST APIs", "AWS"];
}
