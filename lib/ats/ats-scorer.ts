import { ParsedResume, JobDescription, AtsScoreResult } from "@/types";

export function calculateAtsScore(
  resume: ParsedResume,
  jd?: JobDescription
): AtsScoreResult {
  // Pillar 1: Sections Completeness (Max 20)
  const itemsPresent: string[] = [];
  const itemsMissing: string[] = [];

  if (resume.contact.email && resume.contact.phone) itemsPresent.push("Contact Details (Email & Phone)");
  else itemsMissing.push("Complete Contact Information");

  if (resume.summary && resume.summary.length > 30) itemsPresent.push("Professional Summary");
  else itemsMissing.push("Professional Summary / Profile");

  if (resume.skills.all.length >= 5) itemsPresent.push("Skills Section");
  else itemsMissing.push("Detailed Skills Section");

  if (resume.experience.length > 0) itemsPresent.push("Work Experience");
  else itemsMissing.push("Work Experience / Employment History");

  if (resume.education.length > 0) itemsPresent.push("Education Section");
  else itemsMissing.push("Education / Academic Qualifications");

  if (resume.projects.length > 0 || resume.certifications.length > 0) itemsPresent.push("Projects / Certifications");
  else itemsMissing.push("Projects or Certifications");

  const sectionsScore = Math.min(20, Math.round((itemsPresent.length / 6) * 20));

  // Pillar 2: Keyword Density & Relevance (Max 20)
  let keywordScore = 15; // default benchmark
  let keywordDensity = 0.05;
  const frequencyMap: Record<string, number> = {};

  if (jd && jd.keywords && jd.keywords.length > 0) {
    let matchedKws = 0;
    jd.keywords.forEach(kw => {
      const reg = new RegExp(`\\b${kw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, "gi");
      const matches = resume.rawText.match(reg);
      const count = matches ? matches.length : 0;
      if (count > 0) {
        matchedKws++;
        frequencyMap[kw] = count;
      }
    });
    keywordScore = Math.min(20, Math.round((matchedKws / jd.keywords.length) * 20));
    keywordDensity = Number((matchedKws / Math.max(1, resume.wordCount)).toFixed(3));
  } else {
    // If no JD provided, evaluate density of standard technical keywords
    const techCount = resume.skills.technical.length;
    keywordScore = Math.min(20, Math.round((techCount / 12) * 20));
  }

  // Pillar 3: Skills Match Ratio (Max 20)
  let skillsScore = 15;
  let matchedSkillCount = resume.skills.all.length;
  let totalRequiredSkills = 15;

  if (jd && jd.requiredSkills && jd.requiredSkills.length > 0) {
    totalRequiredSkills = jd.requiredSkills.length;
    const reqSet = new Set(jd.requiredSkills.map(s => s.toLowerCase()));
    const resSet = new Set(resume.skills.all.map(s => s.toLowerCase()));

    matchedSkillCount = 0;
    reqSet.forEach(req => {
      if (resSet.has(req)) matchedSkillCount++;
    });

    skillsScore = Math.min(20, Math.round((matchedSkillCount / Math.max(1, totalRequiredSkills)) * 20));
  } else {
    skillsScore = Math.min(20, Math.round((matchedSkillCount / 15) * 20));
  }

  // Pillar 4: Formatting & Structure Check (Max 20)
  const formattingIssues: string[] = [];
  let passCount = 5;

  if (resume.wordCount < 250) {
    formattingIssues.push("Resume is too brief (under 250 words). Aim for 400-800 words.");
    passCount--;
  } else if (resume.wordCount > 1000) {
    formattingIssues.push("Resume is overly lengthy (over 1000 words). Try to condense to 1-2 pages.");
    passCount--;
  }

  if (!resume.contact.linkedin) {
    formattingIssues.push("Missing LinkedIn profile link.");
    passCount--;
  }

  if (!resume.contact.email) {
    formattingIssues.push("Missing professional email address.");
    passCount--;
  }

  const formattingScore = Math.max(5, Math.min(20, passCount * 4));

  // Pillar 5: Readability & Impact Metrics (Max 20)
  // Check for quantifiable impact (numbers, percentages, $, x)
  const numberMatches = resume.rawText.match(/\b\d+(%|\+|k|x|\s*percent|\s*dollars|\s*users|\s*teams)?\b/gi) || [];
  const impactCount = numberMatches.length;

  const actionVerbRegex = /\b(spearheaded|architected|developed|engineered|implemented|increased|reduced|optimized|led|designed|built|managed|delivered|migrated|improved)\b/gi;
  const verbMatches = resume.rawText.match(actionVerbRegex) || [];

  let readabilityScore = 10;
  if (impactCount >= 5 && verbMatches.length >= 6) {
    readabilityScore = 20;
  } else if (impactCount >= 3 || verbMatches.length >= 3) {
    readabilityScore = 15;
  }

  // Calculate Overall Score (Sum of 5 pillars: 20 + 20 + 20 + 20 + 20 = 100)
  const overallScore = Math.min(100, Math.max(10, sectionsScore + keywordScore + skillsScore + formattingScore + readabilityScore));

  // Grade Assignment
  let grade: AtsScoreResult['grade'] = 'C';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 60) grade = 'C';
  else if (overallScore >= 50) grade = 'D';
  else grade = 'F';

  // Strengths & Weaknesses synthesis
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const criticalFixes: string[] = [];

  if (sectionsScore >= 16) strengths.push("Comprehensive section structure with standard headers.");
  else weaknesses.push("Missing essential sections like Summary, Skills, or Projects.");

  if (skillsScore >= 16) strengths.push(`Strong skills alignment matching ${matchedSkillCount} key skills.`);
  else weaknesses.push("Gap between technical skills listed and target position expectations.");

  if (impactCount >= 4) strengths.push(`Includes ${impactCount} quantifiable impact metrics (e.g. percentages, growth numbers).`);
  else {
    weaknesses.push("Lacks quantifiable metrics. Add specific numbers (%, $, time saved) to bullet points.");
    criticalFixes.push("Quantify achievements in your Work Experience bullets.");
  }

  if (formattingIssues.length > 0) {
    criticalFixes.push(...formattingIssues);
  }

  if (itemsMissing.length > 0) {
    criticalFixes.push(`Add missing sections: ${itemsMissing.join(", ")}.`);
  }

  return {
    overallScore,
    grade,
    breakdown: {
      sections: {
        score: sectionsScore,
        maxScore: 20,
        itemsPresent,
        itemsMissing,
      },
      keywords: {
        score: keywordScore,
        maxScore: 20,
        density: keywordDensity,
        frequencyMap,
      },
      skills: {
        score: skillsScore,
        maxScore: 20,
        matchedCount: matchedSkillCount,
        totalRequired: totalRequiredSkills,
      },
      formatting: {
        score: formattingScore,
        maxScore: 20,
        passCount,
        issues: formattingIssues,
      },
      readability: {
        score: readabilityScore,
        maxScore: 20,
        gradeLevel: "Collegiate (Professional)",
        avgSentenceLength: 14,
        wordCount: resume.wordCount,
      },
    },
    strengths,
    weaknesses,
    criticalFixes: criticalFixes.length > 0 ? criticalFixes : ["No critical fixes needed! Resume is well-optimized for ATS."],
  };
}
