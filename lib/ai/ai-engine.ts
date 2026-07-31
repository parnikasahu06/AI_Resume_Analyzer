import { GoogleGenerativeAI } from "@google/generative-ai";
import { ParsedResume, JobDescription, AiSuggestionsResult, BulletRewrite } from "@/types";

/**
 * Extracts and filters actual descriptive resume bullet points.
 * Filters out section headings, malformed parser echoes (e.g. "EXPERIENCE: EXPERIENCE"),
 * contact info, URLs, isolated dates, and non-descriptive short snippets.
 */
export function extractValidResumeBullets(resume: ParsedResume): string[] {
  const candidateBullets: string[] = [];

  if (resume.experience && resume.experience.length > 0) {
    resume.experience.forEach(e => candidateBullets.push(...e.description));
  }
  if (resume.internships && resume.internships.length > 0) {
    resume.internships.forEach(i => candidateBullets.push(...i.description));
  }
  if (resume.projects && resume.projects.length > 0) {
    resume.projects.forEach(p => {
      if (p.description) candidateBullets.push(p.description);
    });
  }
  if (resume.leadership && resume.leadership.length > 0) {
    resume.leadership.forEach(l => candidateBullets.push(...l.description));
  }
  if (resume.extracurricular && resume.extracurricular.length > 0) {
    resume.extracurricular.forEach(e => candidateBullets.push(...e.description));
  }
  if (resume.neutralItems && resume.neutralItems.length > 0) {
    candidateBullets.push(...resume.neutralItems);
  }

  // Fallback if structured arrays were empty
  if (candidateBullets.length === 0 && resume.rawText) {
    const lines = resume.rawText.split("\n").map(l => l.trim()).filter(Boolean);
    candidateBullets.push(...lines);
  }

  const cleanBullets: string[] = [];
  const seen = new Set<string>();

  for (const raw of candidateBullets) {
    if (!raw) continue;

    // Clean bullet symbols and leading/trailing whitespace
    let cleaned = raw.replace(/^[-•*–—\d+\.\)\s]+/, "").trim();
    cleaned = cleaned.replace(/\s+/g, " ");

    if (cleaned.length < 15) continue;

    const lower = cleaned.toLowerCase();

    // 1. Filter out malformed parser echoes such as "EXPERIENCE: EXPERIENCE"
    if (cleaned.includes(":")) {
      const parts = cleaned.split(":");
      if (parts.length === 2 && parts[0].trim().toLowerCase() === parts[1].trim().toLowerCase()) {
        continue;
      }
    }

    // 2. Reject standalone section headings
    const headingRegex = /^(experience|work experience|professional experience|employment history|education|academic background|projects|personal projects|key projects|skills|technical skills|certifications|achievements|summary|profile|professional summary|leadership|positions of responsibility|extracurricular|activities|contact|contact information|languages|interests|hobbies)[\s:]*$/i;
    if (headingRegex.test(cleaned) || headingRegex.test(lower)) continue;

    // 3. Reject isolated section words
    if (/^(experience|education|projects|skills|certifications|achievements|summary|leadership)[\s:]*$/i.test(cleaned)) continue;

    // 4. Reject contact info, emails, URLs
    if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(cleaned)) continue;
    if (/(https?:\/\/|linkedin\.com|github\.com|www\.)/i.test(cleaned)) continue;
    if (/^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(cleaned)) continue;

    // 5. Reject isolated date lines
    if (/^(\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|[0-9]{1,2})\b|\d{4}|\bpresent\b|\bcurrent\b|\s|[-–—/])+$/i.test(cleaned)) continue;

    // 6. Reject lines with fewer than 4 words
    const wordCount = cleaned.split(/\s+/).length;
    if (wordCount < 4) continue;

    // Deduplicate
    const norm = cleaned.toLowerCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      cleanBullets.push(cleaned);
    }
  }

  return cleanBullets;
}

export async function generateAiSuggestions(
  resume: ParsedResume,
  jd?: JobDescription
): Promise<AiSuggestionsResult> {
  const cleanBullets = extractValidResumeBullets(resume);
  const bulletsToAnalyze = cleanBullets.slice(0, 6);

  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey.trim() !== "" && geminiApiKey !== "your_gemini_api_key_here") {
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are a conservative resume editor, not a creative writer.
Analyze these extracted resume bullet points and optional target job description.

CRITICAL EDITING RULES:
1. PRESERVE ALL FACTS: Do NOT invent numbers, percentages, accuracy metrics, user counts, dataset sizes, revenue, team sizes, tools, technologies, or achievements not present in the original text.
2. DO NOT INVENT LEADERSHIP: Do NOT use leadership verbs ("Spearheaded", "Led", "Architected", "Directed") unless the original bullet explicitly describes leadership.
3. CONTEXT-SPECIFIC VERBS: Use accurate, natural action verbs matching the work (e.g. Developed, Built, Implemented for software; Analyzed, Evaluated, Visualized for data; Investigated, Evaluated for research). Avoid repetitive generic AI verbs like Architected/Spearheaded.
4. MINIMAL REWRITES: Make smallest useful improvement while preserving the candidate's natural voice.
5. DO NOT REWRITE STRONG BULLETS: If a bullet is already concise, specific, and uses an appropriate action verb, classify assessment as "strong" and set "suggestion" to null.
6. NO METRIC PLACEHOLDERS IN BULLETS: NEVER insert placeholders like "[add measurable result if available]" into the suggested bullet text. Instead, set the separate field "metricOpportunity" if adding a metric would strengthen the bullet.
7. Output valid JSON ONLY matching this exact schema:

{
  "bulletRewrites": [
    {
      "original": "exact original bullet",
      "assessment": "strong | needs_improvement | weak",
      "suggestion": "improved bullet text string OR null if strong",
      "reason": "explanation of assessment or change",
      "metricOpportunity": "optional advice string on adding a metric, or null"
    }
  ],
  "missingTechToHighlight": ["string"],
  "enhancedSummary": "string",
  "actionVerbsRecommended": ["string"]
}

Resume Bullets:
${bulletsToAnalyze.length > 0 ? bulletsToAnalyze.map((b, i) => `${i + 1}. ${b}`).join("\n") : "1. Worked on building web application components using modern web frameworks."}

Job Description:
${jd ? jd.rawText.slice(0, 1500) : "General Industry Role"}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed && Array.isArray(parsed.bulletRewrites)) {
        // Post-process and sanitize Gemini output
        const sanitizedRewrites: BulletRewrite[] = parsed.bulletRewrites.map((br: any) => {
          let suggestion = br.suggestion;
          if (typeof suggestion === "string") {
            // Strip any accidental metric placeholders
            suggestion = suggestion
              .replace(/\[add\s+measurable\s+result[^\]]*\]/gi, "")
              .replace(/\[add\s+metric[^\]]*\]/gi, "")
              .replace(/\s{2,}/g, " ")
              .trim();
          }

          const assessment: 'strong' | 'needs_improvement' | 'weak' =
            br.assessment === 'strong' || br.assessment === 'weak' || br.assessment === 'needs_improvement'
              ? br.assessment
              : (!suggestion ? 'strong' : 'needs_improvement');

          return {
            original: br.original || "",
            assessment,
            improved: assessment === 'strong' ? (suggestion || null) : (suggestion || br.original),
            rationale: br.reason || br.rationale || "Refined for clarity and action.",
            metricOpportunity: br.metricOpportunity || null,
          };
        }).filter((br: BulletRewrite) => br.original && br.original.length > 10);

        return {
          bulletRewrites: sanitizedRewrites.slice(0, 5),
          missingTechToHighlight: Array.isArray(parsed.missingTechToHighlight) ? parsed.missingTechToHighlight.slice(0, 5) : [],
          wordingEnhancements: [],
          achievementIdeas: [],
          enhancedSummary: parsed.enhancedSummary || generateConservativeSummary(resume),
          actionVerbsRecommended: Array.isArray(parsed.actionVerbsRecommended) && parsed.actionVerbsRecommended.length > 0
            ? parsed.actionVerbsRecommended.slice(0, 7)
            : getContextualVerbs(resume),
          source: "gemini",
        };
      }
    } catch (err) {
      console.warn("Gemini API call failed or returned invalid response. Falling back to heuristic AI engine:", err);
    }
  }

  // Fallback Rule-Based / Heuristic AI Engine
  return generateHeuristicSuggestions(resume, jd, cleanBullets);
}

function generateHeuristicSuggestions(
  resume: ParsedResume,
  jd?: JobDescription,
  preFilteredBullets?: string[]
): AiSuggestionsResult {
  const cleanBullets = preFilteredBullets || extractValidResumeBullets(resume);
  const selectedBullets = cleanBullets.slice(0, 5);

  const bulletRewrites: BulletRewrite[] = [];

  const defaultBullets = selectedBullets.length > 0 ? selectedBullets : [
    "Analyzed data models and built web application features for internal platform.",
    "Responsible for developing RESTful APIs and database schemas.",
    "Worked on frontend user interfaces using React and Tailwind CSS."
  ];

  defaultBullets.forEach((bullet) => {
    const isWeakOpening = /^(worked on|responsible for|helped|assisted with|contributed to|involved in|handled|tasked with)\s*/i.test(bullet);
    const hasMetric = /\b\d+(%|\+|k|x|\s*percent|\s*dollars|\s*users|\s*teams)?\b/i.test(bullet);
    const startsWithActionVerb = /^(analyzed|evaluated|visualized|modeled|developed|built|implemented|integrated|designed|created|led|coordinated|managed|investigated|improved|optimized|reduced)\b/i.test(bullet);

    let assessment: 'strong' | 'needs_improvement' | 'weak' = 'needs_improvement';
    let improved: string | null = null;
    let rationale = "";
    let metricOpportunity: string | null = null;

    if (!hasMetric) {
      metricOpportunity = "Consider adding a measurable outcome if available (e.g. accuracy %, time saved, dataset size, or user count).";
    }

    if (startsWithActionVerb && !isWeakOpening && bullet.split(/\s+/).length >= 7) {
      assessment = 'strong';
      improved = null; // No aggressive rewrite for strong bullets
      rationale = "Bullet is already concise, specific, and uses an appropriate action verb.";
    } else if (isWeakOpening) {
      assessment = 'needs_improvement';
      // Pick domain-appropriate replacement verb without inflating leadership or metrics
      const domainVerb = getDomainVerbForBullet(bullet);
      const cleanText = bullet.replace(/^(worked on|responsible for|helped|assisted with|contributed to|involved in|handled|tasked with)\s*/i, "");
      const capitalizedText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
      
      improved = `${domainVerb} ${cleanText.replace(/\.$/, "")}.`;
      rationale = `Replaced passive opening phrase with direct action verb "${domainVerb}" while preserving original information.`;
    } else {
      assessment = 'weak';
      const domainVerb = getDomainVerbForBullet(bullet);
      improved = `${domainVerb} ${bullet.replace(/^(I|we)\s+/i, "").replace(/\.$/, "")}.`;
      rationale = `Structured bullet around direct action verb "${domainVerb}" for clearer technical contribution.`;
    }

    bulletRewrites.push({
      original: bullet,
      assessment,
      improved,
      rationale,
      metricOpportunity,
    });
  });

  // Prioritize suggestions needing improvement first, max 5
  bulletRewrites.sort((a, b) => {
    const score = (x: BulletRewrite) => (x.assessment === 'weak' ? 3 : x.assessment === 'needs_improvement' ? 2 : 1);
    return score(b) - score(a);
  });

  const missingTechToHighlight = jd && jd.requiredSkills.length > 0
    ? jd.requiredSkills.filter(s => !resume.skills.all.map(x => x.toLowerCase()).includes(s.toLowerCase())).slice(0, 5)
    : ["TypeScript", "Docker", "AWS", "GraphQL", "PostgreSQL"];

  return {
    bulletRewrites: bulletRewrites.slice(0, 5),
    missingTechToHighlight,
    wordingEnhancements: [],
    achievementIdeas: [],
    enhancedSummary: generateConservativeSummary(resume),
    actionVerbsRecommended: getContextualVerbs(resume),
    source: "heuristic_engine",
  };
}

function getDomainVerbForBullet(bullet: string): string {
  const lower = bullet.toLowerCase();

  if (/data|analytics|pandas|sql|tableau|model|dataset|risk|pattern|visualization/i.test(lower)) {
    if (lower.includes("visual")) return "Visualized";
    if (lower.includes("model")) return "Modeled";
    return "Analyzed";
  }
  if (/research|study|experiment|paper|literature|investigat/i.test(lower)) {
    return "Investigated";
  }
  if (/lead|coordinate|organiz|manag|supervis|head/i.test(lower)) {
    return "Coordinated";
  }
  if (/optimi|speed|fast|performance|reduc|improv/i.test(lower)) {
    return "Optimized";
  }
  if (/design|ui|ux|frontend|component|layout/i.test(lower)) {
    return "Designed";
  }
  if (/api|backend|database|service|server|pipeline/i.test(lower)) {
    return "Implemented";
  }
  return "Developed";
}

function getContextualVerbs(resume: ParsedResume): string[] {
  const hasData = resume.skills.technical.some(s => /python|sql|pandas|tableau|machine learning|data/i.test(s));
  const hasDev = resume.skills.technical.some(s => /react|javascript|typescript|node|java|c\+\+/i.test(s));

  const verbs = new Set<string>();

  if (hasData) {
    ["Analyzed", "Evaluated", "Visualized", "Modeled", "Identified"].forEach(v => verbs.add(v));
  }
  if (hasDev) {
    ["Developed", "Built", "Implemented", "Integrated", "Designed"].forEach(v => verbs.add(v));
  }

  ["Improved", "Optimized", "Coordinated"].forEach(v => verbs.add(v));

  return Array.from(verbs).slice(0, 7);
}

function generateConservativeSummary(resume: ParsedResume): string {
  const userRole = resume.experience[0]?.role || resume.internships[0]?.role || "Candidate";
  const topSkills = resume.skills.technical.slice(0, 4).join(", ");
  
  if (topSkills) {
    return `Professional ${userRole} with background in ${topSkills}. Experienced in delivering structured software components and technical projects.`;
  }
  return `Dedicated candidate with hands-on experience in software development and project execution.`;
}
