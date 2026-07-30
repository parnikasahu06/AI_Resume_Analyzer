import { GoogleGenerativeAI } from "@google/generative-ai";
import { ParsedResume, JobDescription, AiSuggestionsResult, BulletRewrite } from "@/types";

export async function generateAiSuggestions(
  resume: ParsedResume,
  jd?: JobDescription
): Promise<AiSuggestionsResult> {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey.trim() !== "" && geminiApiKey !== "your_gemini_api_key_here") {
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert ATS resume writer and recruiter. Analyze this resume text and optional job description.
Return a valid JSON object ONLY with the following exact keys:

{
  "bulletRewrites": [
    {
      "original": "string",
      "improved": "string",
      "rationale": "string",
      "metricAdded": boolean
    }
  ],
  "missingTechToHighlight": ["string"],
  "wordingEnhancements": [
    {
      "weakWord": "string",
      "suggestion": "string",
      "example": "string"
    }
  ],
  "achievementIdeas": ["string"],
  "enhancedSummary": "string",
  "actionVerbsRecommended": ["string"]
}

CRITICAL RULE:
Never invent numbers, percentages, revenue, accuracy scores, user counts, or achievements that are not present in the original resume text.
If an original bullet point lacks a metric, use the explicit placeholder '[add measurable result if available]' instead of fabricating a fake number.

Resume Text:
${resume.rawText.slice(0, 3000)}

Job Description:
${jd ? jd.rawText.slice(0, 2000) : "General Tech Role"}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      return {
        ...parsed,
        source: "gemini"
      };
    } catch (err) {
      console.warn("Gemini API call failed or timed out. Falling back to heuristic AI engine:", err);
    }
  }

  // Fallback Rule-Based / Heuristic AI Engine
  return generateHeuristicSuggestions(resume, jd);
}

function generateHeuristicSuggestions(
  resume: ParsedResume,
  jd?: JobDescription
): AiSuggestionsResult {
  const bulletRewrites: BulletRewrite[] = [];

  // Extract actual original bullets from parsed resume sections
  let originalBullets: string[] = [];

  if (resume.experience.length > 0) {
    originalBullets.push(...resume.experience.flatMap(e => e.description));
  }
  if (resume.internships.length > 0) {
    originalBullets.push(...resume.internships.flatMap(e => e.description));
  }
  if (resume.projects.length > 0) {
    originalBullets.push(...resume.projects.map(p => p.title + ": " + p.description));
  }

  if (originalBullets.length === 0) {
    // Extract raw text lines starting with bullets or dashes
    const bulletLines = resume.rawText.split("\n").map(l => l.trim()).filter(l => /^[-•*]/.test(l));
    if (bulletLines.length > 0) {
      originalBullets = bulletLines.map(l => l.replace(/^[-•*]\s*/, ""));
    }
  }

  if (originalBullets.length === 0) {
    originalBullets = [
      "Worked on web application components using modern web frameworks.",
      "Responsible for building backend services and database queries.",
      "Collaborated with engineering team to deliver project features."
    ];
  }

  const selectedBullets = originalBullets.slice(0, 4);
  const actionVerbs = ["Architected", "Spearheaded", "Engineered", "Optimized", "Scaled", "Accelerated"];

  selectedBullets.forEach((bullet, idx) => {
    const verb = actionVerbs[idx % actionVerbs.length];
    const cleanBullet = bullet.replace(/^(worked on|responsible for|helped|assisted with|contributed to)\s*/i, "");
    
    // Check if original bullet already contains an explicit metric (%, $, numbers, user count)
    const hasMetric = /\b\d+(%|\+|k|x|\s*percent|\s*dollars|\s*users|\s*teams)?\b/i.test(bullet);

    let improved = "";
    let rationale = "";

    if (hasMetric) {
      improved = `${verb} ${cleanBullet.replace(/\.$/, "")}.`;
      rationale = "Replaced opening phrase with strong action verb while preserving the original verified metric.";
    } else {
      improved = `${verb} ${cleanBullet.replace(/\.$/, "")}, achieving [add measurable result if available].`;
      rationale = "Replaced weak opening phrase with strong action verb and added a metric placeholder [add measurable result if available].";
    }

    bulletRewrites.push({
      original: bullet,
      improved,
      rationale,
      metricAdded: !hasMetric,
    });
  });

  const missingTechToHighlight = jd && jd.requiredSkills.length > 0
    ? jd.requiredSkills.filter(s => !resume.skills.all.map(x => x.toLowerCase()).includes(s.toLowerCase())).slice(0, 5)
    : ["Docker", "TypeScript", "AWS Cloud", "GraphQL", "Redis Caching"];

  const userRole = resume.experience[0]?.role || resume.internships[0]?.role || "Software Engineer";
  const enhancedSummary = `Results-driven ${userRole} with expertise in ${resume.skills.technical.slice(0, 4).join(", ") || "full-stack engineering"}. Demonstrated track record of building reliable software components, optimizing application workflows, and driving technical excellence.`;

  return {
    bulletRewrites,
    missingTechToHighlight,
    wordingEnhancements: [
      { weakWord: "worked on", suggestion: "Engineered / Spearheaded", example: "Engineered scalable REST services" },
      { weakWord: "responsible for", suggestion: "Architected / Directed", example: "Architected microservice deployment pipeline" },
      { weakWord: "helped", suggestion: "Collaborated / Enabled", example: "Collaborated with cross-functional teams to accelerate release cycles" }
    ],
    achievementIdeas: [
      "Include explicit quantifiable impact if available (e.g. 'Reduced bundle size by [add % if available]').",
      "Mention scale metrics such as request volume, active users, or throughput if known.",
      "Highlight hackathon awards, patent filings, or open-source contributions."
    ],
    enhancedSummary,
    actionVerbsRecommended: ["Architected", "Spearheaded", "Engineered", "Optimized", "Scaled", "Accelerated", "Streamlined"],
    source: "heuristic_engine",
  };
}
