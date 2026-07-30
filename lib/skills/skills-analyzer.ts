import { ParsedResume, JobDescription, SkillsGapResult, RecommendedSkill } from "@/types";

const SKILL_RESOURCES: Record<string, string[]> = {
  "Docker": ["Docker Official Docs (docs.docker.com)", "FreeCodeCamp Docker Course"],
  "Kubernetes": ["Kubernetes Basics (kubernetes.io)", "CNCF Certified Kubernetes Administrator Guide"],
  "GraphQL": ["GraphQL.org HowTo", "Apollo GraphQL Tutorials"],
  "Redis": ["Redis University (university.redis.com)", "Redis Crash Course"],
  "AWS": ["AWS Skill Builder", "AWS Certified Solutions Architect Course"],
  "Prisma": ["Prisma Docs (prisma.io)", "Fullstack Next.js + Prisma Guide"],
  "LangChain": ["LangChain Docs", "Pinecone AI & LLM Engineering Series"],
  "PostgreSQL": ["PostgreSQL Tutorial (postgresqltutorial.com)", "SQL for Data Science"],
  "TypeScript": ["TypeScript Handbook (typescriptlang.org)", "Execute Program TypeScript"],
  "Jest": ["Jest Testing Framework Docs", "Testing Library Guide"],
  "Cypress": ["Cypress Real World App Examples"],
};

export function analyzeSkillsGap(
  resume: ParsedResume,
  jd?: JobDescription
): SkillsGapResult {
  const currentSkills = resume.skills.all;
  const hasJd = !!(jd && jd.rawText && jd.rawText.trim().length > 10);

  if (!hasJd || !jd) {
    return {
      hasJd: false,
      currentSkills,
      requiredSkills: [],
      missingSkills: [],
      recommendedSkills: [],
    };
  }

  const resSkillsLower = new Set(currentSkills.map(s => s.toLowerCase()));
  const requiredSkills = jd.requiredSkills;
  const missingSkills: string[] = [];

  requiredSkills.forEach(req => {
    if (!resSkillsLower.has(req.toLowerCase())) {
      missingSkills.push(req);
    }
  });

  const recommendedSkills: RecommendedSkill[] = missingSkills.map(skill => {
    const isHighPriority = ["TypeScript", "Docker", "AWS", "PostgreSQL", "Kubernetes", "GraphQL"].includes(skill);
    return {
      skill,
      priority: isHighPriority ? "High" : "Medium",
      category: isHighPriority ? "Core Infrastructure / Framework" : "Tooling & Backend",
      reason: `Mentioned in target Job Description but omitted in resume.`,
      resources: SKILL_RESOURCES[skill] || [`${skill} Official Documentation`, `FreeCodeCamp ${skill} Guide`],
    };
  });

  return {
    hasJd: true,
    currentSkills,
    requiredSkills,
    missingSkills,
    recommendedSkills,
  };
}
