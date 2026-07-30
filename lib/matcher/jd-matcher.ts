import { ParsedResume, JobDescription, JobMatchResult, KeywordMatchItem } from "@/types";
import { computeTfIdfVectors } from "./tf-idf";
import { calculateCosineSimilarity } from "./cosine";

const TECH_KEYWORDS_LIST = [
  "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js", "Express",
  "Python", "Java", "C++", "C#", "Go", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "Redis",
  "AWS", "Docker", "Kubernetes", "CI/CD", "Git", "Jest", "Cypress", "Tailwind CSS", "Prisma",
  "Redux", "Zustand", "Webpack", "Vite", "SEO", "Microservices", "Security", "Agile", "Scrum",
  "Machine Learning", "OpenAI", "LangChain", "Vector Databases", "Pandas", "NumPy"
];

const SKILL_ALIASES: Record<string, string> = {
  "react.js": "React",
  "reactjs": "React",
  "react": "React",
  "node.js": "Node.js",
  "nodejs": "Node.js",
  "node": "Node.js",
  "next.js": "Next.js",
  "nextjs": "Next.js",
  "next": "Next.js",
  "vue.js": "Vue.js",
  "vuejs": "Vue.js",
  "vue": "Vue.js",
  "ts": "TypeScript",
  "typescript": "TypeScript",
  "js": "JavaScript",
  "javascript": "JavaScript",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "postgres sql": "PostgreSQL",
  "mongo": "MongoDB",
  "mongodb": "MongoDB",
  "aws": "AWS",
  "amazon web services": "AWS",
  "gcp": "GCP",
  "google cloud": "GCP",
  "google cloud platform": "GCP",
  "k8s": "Kubernetes",
  "kubernetes": "Kubernetes",
  "ml": "Machine Learning",
  "machine learning": "Machine Learning",
  "py": "Python",
  "python": "Python",
  "tailwind": "Tailwind CSS",
  "tailwindcss": "Tailwind CSS",
  "tailwind css": "Tailwind CSS",
  "rest": "REST APIs",
  "rest api": "REST APIs",
  "restful apis": "REST APIs",
  "rest apis": "REST APIs",
  "graphql": "GraphQL",
  "redis": "Redis",
  "sql": "SQL",
  "git": "Git",
  "ci/cd": "CI/CD",
  "cicd": "CI/CD",
  "docker": "Docker",
  "jest": "Jest",
  "cypress": "Cypress",
  "prisma": "Prisma",
  "pandas": "Pandas",
  "numpy": "NumPy",
  "express": "Express.js",
  "express.js": "Express.js",
};

export function normalizeSkillName(skill: string): string {
  const clean = skill.trim().toLowerCase();
  if (SKILL_ALIASES[clean]) {
    return SKILL_ALIASES[clean];
  }
  return skill.trim().charAt(0).toUpperCase() + skill.trim().slice(1);
}

export function matchResumeToJd(
  resume: ParsedResume,
  jd?: JobDescription
): JobMatchResult {
  if (!jd || !jd.rawText || !jd.rawText.trim()) {
    return {
      hasJd: false,
      matchPercentage: null,
      similarityScore: 0,
      skillsCoverage: 0,
      keywordCoverage: 0,
      matchingSkills: [],
      missingSkills: [],
      matchingKeywords: [],
      missingKeywords: [],
      relevanceSummary: "Add a Job Description to calculate keyword relevance and skills match.",
    };
  }

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
    const normKw = normalizeSkillName(kw);
    const reg = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "gi");
    const resumeMatches = resume.rawText.match(reg) || [];
    const jdMatches = jd.rawText.match(reg) || [];

    const countInResume = resumeMatches.length;
    const countInJd = Math.max(1, jdMatches.length);

    if (countInResume > 0) {
      matchingKeywords.push({ keyword: normKw, countInResume, countInJd });
    } else {
      missingKeywords.push({ keyword: normKw, countInResume: 0, countInJd });
    }
  });

  // 3. Strict Evidence-Based Skills Match with Normalization
  const normalizedResumeSkillSet = new Set<string>();
  resume.skills.all.forEach(s => normalizedResumeSkillSet.add(normalizeSkillName(s).toLowerCase()));

  TECH_KEYWORDS_LIST.forEach(kw => {
    const reg = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "i");
    if (reg.test(resume.rawText)) {
      normalizedResumeSkillSet.add(normalizeSkillName(kw).toLowerCase());
    }
  });

  const rawJdSkills = jd.requiredSkills.length > 0 ? jd.requiredSkills : extractedJdKeywords;
  const uniqueJdSkills = Array.from(new Set(rawJdSkills.map(s => normalizeSkillName(s))));

  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  uniqueJdSkills.forEach(skill => {
    const normLower = skill.toLowerCase();
    if (normalizedResumeSkillSet.has(normLower)) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // 4. Calculate Explainable Signal Coverage Metrics
  const skillsCoverage = Math.min(100, Math.round((matchingSkills.length / Math.max(1, uniqueJdSkills.length)) * 100));
  const keywordCoverage = Math.min(100, Math.round((matchingKeywords.length / Math.max(1, extractedJdKeywords.length)) * 100));
  const textualSimilarity = Math.min(100, Math.round(similarityScore * 100));

  // Weighted Job Match Formula: 50% Skills Coverage + 30% Keyword Coverage + 20% Textual Similarity
  const matchPercentage = Math.min(99, Math.max(10, Math.round((skillsCoverage * 0.5) + (keywordCoverage * 0.3) + (textualSimilarity * 0.2))));

  // 5. Summary Text
  let relevanceSummary = "";
  if (matchPercentage >= 80) {
    relevanceSummary = `Excellent Fit (${matchPercentage}% Match)! Your resume shows high alignment with ${skillsCoverage}% skills coverage and ${keywordCoverage}% keyword coverage.`;
  } else if (matchPercentage >= 65) {
    relevanceSummary = `Good Match (${matchPercentage}% Match). You meet core requirements with ${skillsCoverage}% skills coverage, but key missing technical skills were identified.`;
  } else {
    relevanceSummary = `Moderate Gap (${matchPercentage}% Match). Skills coverage is ${skillsCoverage}%. Several core skills required in the job description are missing.`;
  }

  return {
    hasJd: true,
    matchPercentage,
    similarityScore,
    skillsCoverage,
    keywordCoverage,
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
      found.push(normalizeSkillName(kw));
    }
  });
  return Array.from(new Set(found));
}
