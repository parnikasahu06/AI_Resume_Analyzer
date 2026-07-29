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
      "metricAdded": true
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

Resume Text:
${resume.rawText.slice(0, 3000)}

Job Description:
${jd ? jd.rawText.slice(0, 2000) : "General Tech Role"}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean JSON output block if wrapped in markdown code fence
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

  // Extract original bullets from experience or raw text
  let originalBullets: string[] = [];
  if (resume.experience.length > 0 && resume.experience[0].description.length > 0) {
    originalBullets = resume.experience.flatMap(e => e.description).slice(0, 3);
  }

  if (originalBullets.length === 0) {
    originalBullets = [
      "Worked on web applications using JavaScript and React.",
      "Responsible for building backend APIs and database tables.",
      "Helped the engineering team deliver features on time."
    ];
  }

  const actionVerbs = ["Architected", "Spearheaded", "Engineered", "Optimized", "Orchestrated", "Scaled"];
  const metrics = ["by 35%", "handling 50,000+ daily requests", "reducing latency by 40%", "saving 12 hours of weekly manual work"];

  originalBullets.forEach((bullet, idx) => {
    const verb = actionVerbs[idx % actionVerbs.length];
    const metric = metrics[idx % metrics.length];
    const cleanBullet = bullet.replace(/^(worked on|responsible for|helped|assisted with)\s*/i, "");

    bulletRewrites.push({
      original: bullet,
      improved: `${verb} ${cleanBullet.replace(/\.$/, "")}, ${metric}.`,
      rationale: "Replaced weak opening phrase with strong action verb and added a quantifiable outcome metric.",
      metricAdded: true,
    });
  });

  const missingTechToHighlight = jd && jd.requiredSkills.length > 0
    ? jd.requiredSkills.filter(s => !resume.skills.all.map(x => x.toLowerCase()).includes(s.toLowerCase())).slice(0, 5)
    : ["Docker", "TypeScript", "AWS Cloud", "GraphQL", "Redis Caching"];

  const enhancedSummary = `Results-driven ${resume.experience[0]?.role || "Software Engineer"} with proven expertise in ${resume.skills.technical.slice(0, 4).join(", ") || "full-stack development"}. Demonstrated track record of building high-performance applications, scaling backend services, and driving cross-functional engineering excellence.`;

  return {
    bulletRewrites,
    missingTechToHighlight,
    wordingEnhancements: [
      { weakWord: "worked on", suggestion: "Engineered / Spearheaded", example: "Engineered scalable REST services" },
      { weakWord: "responsible for", suggestion: "Architected / Directed", example: "Architected microservice deployment pipeline" },
      { weakWord: "helped", suggestion: "Collaborated / Enabled", example: "Collaborated with cross-functional teams to accelerate release cycles" }
    ],
    achievementIdeas: [
      "Highlight performance improvements with explicit percentages (e.g., 'Reduced initial bundle size by 30%').",
      "Mention scale metrics such as user volume, API request throughput, or database row counts.",
      "Include hackathon awards, patent filings, or open-source contributions."
    ],
    enhancedSummary,
    actionVerbsRecommended: ["Architected", "Spearheaded", "Engineered", "Optimized", "Scaled", "Accelerated", "Streamlined"],
    source: "heuristic_engine",
  };
}
