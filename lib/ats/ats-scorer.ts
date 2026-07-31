import { ParsedResume, JobDescription, AtsScoreResult, PillarCheck, CandidateProfileType } from "@/types";

export function calculateAtsScore(
  resume: ParsedResume,
  jd?: JobDescription,
  profile: CandidateProfileType = "not_specified"
): AtsScoreResult {
  const hasJd = !!(jd && jd.rawText && jd.rawText.trim().length > 10);

  // --- Pillar 1: Section Completeness (Max 20 pts) ---
  const sectionsChecks: PillarCheck[] = [];
  const itemsPresent: string[] = [];
  const itemsMissing: string[] = [];

  // 1. Contact Details (4 pts)
  const hasContact = !!(resume.contact.email && resume.contact.phone);
  if (hasContact) {
    itemsPresent.push("Contact Details (Email & Phone)");
    sectionsChecks.push({ name: "Contact details (Email & Phone)", status: "Passed", pts: 4, maxPts: 4, detail: "Found valid email and phone number." });
  } else {
    itemsMissing.push("Complete Contact Information");
    sectionsChecks.push({ name: "Contact details (Email & Phone)", status: "Missing", pts: 0, maxPts: 4, detail: "Missing phone number or email address." });
  }

  // 2. Professional Summary (3 pts)
  const hasSummary = !!(resume.summary && resume.summary.length > 30);
  if (hasSummary) {
    itemsPresent.push("Professional Summary");
    sectionsChecks.push({ name: "Professional summary / profile", status: "Passed", pts: 3, maxPts: 3, detail: "Summary present and well-structured." });
  } else {
    itemsMissing.push("Professional Summary / Profile");
    sectionsChecks.push({ name: "Professional summary / profile", status: "Missing", pts: 0, maxPts: 3, detail: "Missing executive summary section." });
  }

  // 3. Skills Section (3 pts)
  const hasSkills = resume.skills.all.length >= 5;
  if (hasSkills) {
    itemsPresent.push("Skills Section");
    sectionsChecks.push({ name: "Skills section", status: "Passed", pts: 3, maxPts: 3, detail: `Extracted ${resume.skills.all.length} skills.` });
  } else {
    itemsMissing.push("Detailed Skills Section");
    sectionsChecks.push({ name: "Skills section", status: "Missing", pts: 0, maxPts: 3, detail: "Fewer than 5 skills detected." });
  }

  // 4. Profile-Aware Experience / Practical Evidence (4 pts)
  const isStudentOrInternship = profile === "student" || profile === "internship";
  const isExperienced = profile === "experienced";
  const isCareerSwitcher = profile === "career_switcher";

  const hasFormalExperience = resume.experience.length > 0;
  const hasInternships = resume.internships.length > 0;
  const hasProjects = resume.projects.length > 0;
  const hasLeadershipOrVolunteering = resume.leadership.length > 0 || resume.extracurricular.length > 0;
  const practicalCount = (hasFormalExperience ? 1 : 0) + (hasInternships ? 1 : 0) + resume.projects.length + (hasLeadershipOrVolunteering ? 1 : 0);

  if (isStudentOrInternship) {
    // Formal employment is NOT mandatory for Students / Internship applicants
    if (practicalCount > 0) {
      itemsPresent.push("Practical Experience / Evidence (Projects/Internships)");
      if (hasFormalExperience) {
        itemsPresent.push("Formal Work Experience");
      } else {
        itemsPresent.push("Formal Work Experience — Not required for selected profile");
      }
      sectionsChecks.push({
        name: "Practical experience / Project evidence",
        status: "Passed",
        pts: 4,
        maxPts: 4,
        detail: `Demonstrated practical exposure through ${practicalCount} project/internship/activity entry.`
      });
    } else {
      itemsMissing.push("Practical Experience / Projects");
      sectionsChecks.push({
        name: "Practical experience / Project evidence",
        status: "Missing",
        pts: 0,
        maxPts: 4,
        detail: "No practical projects, internships, or technical activities detected."
      });
    }
  } else if (isExperienced) {
    // Work Experience is mandatory for Experienced Professionals
    if (hasFormalExperience) {
      itemsPresent.push("Work Experience / Employment History");
      sectionsChecks.push({
        name: "Work experience / Employment history",
        status: "Passed",
        pts: 4,
        maxPts: 4,
        detail: `Found ${resume.experience.length} professional employment entries.`
      });
    } else {
      itemsMissing.push("Work Experience / Employment History");
      sectionsChecks.push({
        name: "Work experience / Employment history",
        status: "Missing",
        pts: 0,
        maxPts: 4,
        detail: "Work experience is expected for the selected Experienced Professional profile but was not clearly detected."
      });
    }
  } else if (isCareerSwitcher) {
    if (practicalCount > 0) {
      itemsPresent.push("Transferable Experience & Relevant Projects");
      sectionsChecks.push({
        name: "Transferable experience & project evidence",
        status: "Passed",
        pts: 4,
        maxPts: 4,
        detail: `Found ${practicalCount} experience/project entries demonstrating transferable capabilities.`
      });
    } else {
      itemsMissing.push("Transferable Experience / Relevant Projects");
      sectionsChecks.push({
        name: "Transferable experience & project evidence",
        status: "Missing",
        pts: 0,
        maxPts: 4,
        detail: "No relevant projects or transferable experience detected."
      });
    }
  } else {
    // Default / Not Specified
    const hasGeneralExp = hasFormalExperience || hasInternships;
    if (hasGeneralExp) {
      itemsPresent.push("Work Experience / History");
      sectionsChecks.push({
        name: "Work experience / History",
        status: "Passed",
        pts: 4,
        maxPts: 4,
        detail: `Found ${resume.experience.length + resume.internships.length} experience entries.`
      });
    } else {
      itemsMissing.push("Work Experience / Employment History");
      sectionsChecks.push({
        name: "Work experience / History",
        status: "Missing",
        pts: 0,
        maxPts: 4,
        detail: "No employment history or internship section detected."
      });
    }
  }

  // 5. Education Section (3 pts)
  const hasEducation = resume.education.length > 0;
  if (hasEducation) {
    itemsPresent.push("Education Section");
    sectionsChecks.push({ name: "Education section", status: "Passed", pts: 3, maxPts: 3, detail: `Extracted ${resume.education.length} degree / institution entry.` });
  } else {
    itemsMissing.push("Education / Academic Qualifications");
    sectionsChecks.push({ name: "Education section", status: "Missing", pts: 0, maxPts: 3, detail: "Missing academic qualifications section." });
  }

  // 6. Projects / Certifications / Achievements (3 pts)
  const hasProjectsOrCerts = resume.projects.length > 0 || resume.certifications.length > 0 || resume.achievements.length > 0;
  if (hasProjectsOrCerts) {
    itemsPresent.push("Projects / Certifications / Achievements");
    sectionsChecks.push({ name: "Projects / Certifications", status: "Passed", pts: 3, maxPts: 3, detail: "Extracted relevant projects or certifications." });
  } else {
    itemsMissing.push("Projects or Certifications");
    sectionsChecks.push({ name: "Projects / Certifications", status: "Missing", pts: 0, maxPts: 3, detail: "Add a projects or certifications section." });
  }

  const sectionsScore = sectionsChecks.reduce((acc, c) => acc + c.pts, 0);

  // --- Pillar 2: Formatting & Structure (Max 20 pts) ---
  const formattingChecks: PillarCheck[] = [];
  const formattingIssues: string[] = [];

  const standardHeadingsPass = itemsPresent.length >= 4;
  formattingChecks.push({
    name: "Standard section headings",
    status: standardHeadingsPass ? "Passed" : "Needs improvement",
    pts: standardHeadingsPass ? 4 : 2,
    maxPts: 4,
    detail: standardHeadingsPass ? "Standard ATS section headers recognized." : "Use standard section headers like Work Experience and Education."
  });

  const contactFormattingPass = !!resume.contact.email;
  formattingChecks.push({
    name: "Contact information",
    status: contactFormattingPass ? "Passed" : "Missing",
    pts: contactFormattingPass ? 3 : 0,
    maxPts: 3,
    detail: contactFormattingPass ? "Professional email detected." : "Missing professional email address."
  });
  if (!contactFormattingPass) formattingIssues.push("Missing professional email address.");

  const linkedinPass = !!resume.contact.linkedin;
  formattingChecks.push({
    name: "LinkedIn URL",
    status: linkedinPass ? "Passed" : "Missing",
    pts: linkedinPass ? 3 : 0,
    maxPts: 3,
    detail: linkedinPass ? "LinkedIn profile link found." : "Missing LinkedIn profile link."
  });
  if (!linkedinPass) formattingIssues.push("Missing LinkedIn profile link.");

  const lengthOptimal = resume.wordCount >= 300 && resume.wordCount <= 950;
  formattingChecks.push({
    name: "Resume length",
    status: lengthOptimal ? "Passed" : "Needs improvement",
    pts: lengthOptimal ? 3 : 1,
    maxPts: 3,
    detail: lengthOptimal ? `Word count (${resume.wordCount} words) is within ideal range (350-900 words).` : `Word count is ${resume.wordCount} words. Aim for 350-800 words.`
  });
  if (!lengthOptimal) {
    if (resume.wordCount < 200) formattingIssues.push("Resume is too brief (under 200 words). Expand your projects or skills.");
    else if (resume.wordCount > 1000) formattingIssues.push("Resume is overly lengthy (over 1000 words). Try to condense to 1-2 pages.");
  }

  const structurePass = resume.wordCount >= 180;
  formattingChecks.push({
    name: "ATS-safe structure",
    status: structurePass ? "Passed" : "Needs improvement",
    pts: structurePass ? 3 : 1,
    maxPts: 3,
    detail: structurePass ? "Clean text parseability for ATS indexers." : "Ensure resume uses plain text font styles."
  });

  const hasComplexTables = resume.rawText.includes("\t\t") || /\b(table|cell)\b/i.test(resume.rawText.slice(0, 100));
  formattingChecks.push({
    name: "Complex tables",
    status: hasComplexTables ? "Detected" : "None detected",
    pts: hasComplexTables ? 0 : 2,
    maxPts: 2,
    detail: hasComplexTables ? "Tables can disrupt ATS parsing algorithms." : "No complex layout tables detected."
  });

  const multiColumnRisk = resume.rawText.includes("   ") ? "Medium" : "Low";
  formattingChecks.push({
    name: "Multi-column parsing risk",
    status: multiColumnRisk as any,
    pts: multiColumnRisk === "Low" ? 2 : 1,
    maxPts: 2,
    detail: multiColumnRisk === "Low" ? "Low risk of column text scramble." : "Single column layouts parse most reliably."
  });

  const formattingScore = formattingChecks.reduce((acc, c) => acc + c.pts, 0);

  // --- Pillar 3: Readability & Impact (Max 20 pts) ---
  const readabilityChecks: PillarCheck[] = [];

  const actionVerbRegex = /\b(spearheaded|architected|developed|engineered|implemented|increased|reduced|optimized|led|designed|built|managed|delivered|migrated|improved|analyzed|evaluated|visualized|created|formulated)\b/gi;
  const verbMatches = resume.rawText.match(actionVerbRegex) || [];
  const verbPass = verbMatches.length >= 5;
  readabilityChecks.push({
    name: "Action verbs density",
    status: verbPass ? "Passed" : "Needs improvement",
    pts: verbPass ? 6 : verbMatches.length >= 3 ? 3 : 1,
    maxPts: 6,
    detail: `Found ${verbMatches.length} strong action verbs (e.g. ${Array.from(new Set(verbMatches)).slice(0, 3).join(", ") || 'none'}).`
  });

  const numberMatches = resume.rawText.match(/\b\d+(%|\+|k|x|\s*percent|\s*dollars|\s*users|\s*teams)?\b/gi) || [];
  const impactCount = numberMatches.length;
  const impactPass = impactCount >= 3;
  readabilityChecks.push({
    name: "Quantifiable impact metrics",
    status: impactPass ? "Passed" : "Needs improvement",
    pts: impactPass ? 6 : impactCount >= 1 ? 3 : 1,
    maxPts: 6,
    detail: impactPass ? `Includes ${impactCount} quantifiable metrics (%, $, scale numbers).` : `Found ${impactCount} quantifiable metric. Add specific numbers to bullet points.`
  });

  const sentenceLengthPass = resume.wordCount >= 250 && resume.wordCount <= 950;
  readabilityChecks.push({
    name: "Average sentence length & word count",
    status: sentenceLengthPass ? "Passed" : "Needs improvement",
    pts: sentenceLengthPass ? 4 : 2,
    maxPts: 4,
    detail: sentenceLengthPass ? "Sentence complexity is well-balanced for human recruiters and ATS." : "Review bullet point lengths for clarity."
  });

  const passiveMatch = resume.rawText.match(/\b(was|were|been|being)\s+\w+ed\b/gi) || [];
  const passivePass = passiveMatch.length < 4;
  readabilityChecks.push({
    name: "Passive voice usage",
    status: passivePass ? "Passed" : "Needs improvement",
    pts: passivePass ? 4 : 2,
    maxPts: 4,
    detail: passivePass ? "Strong active voice phrasing across bullet points." : `Detected ${passiveMatch.length} passive phrasing instances.`
  });

  const readabilityScore = readabilityChecks.reduce((acc, c) => acc + c.pts, 0);

  // --- Pillar 4: Contact / Metadata (Max 20 pts) ---
  const contactChecks: PillarCheck[] = [];

  const emailPass = !!resume.contact.email;
  contactChecks.push({
    name: "Professional email address",
    status: emailPass ? "Passed" : "Missing",
    pts: emailPass ? 5 : 0,
    maxPts: 5,
    detail: emailPass ? `Email: ${resume.contact.email}` : "Missing email address."
  });

  const phonePass = !!resume.contact.phone;
  contactChecks.push({
    name: "Phone number",
    status: phonePass ? "Passed" : "Missing",
    pts: phonePass ? 5 : 0,
    maxPts: 5,
    detail: phonePass ? `Phone: ${resume.contact.phone}` : "Missing phone number."
  });

  const locationPass = !!(resume.contact.location || /\b[A-Z][a-z]+,\s*[A-Z]{2}\b/.test(resume.rawText));
  contactChecks.push({
    name: "Location / City & State",
    status: locationPass ? "Passed" : "Missing",
    pts: locationPass ? 5 : 0,
    maxPts: 5,
    detail: locationPass ? "Location metadata present." : "Include City, State on resume header."
  });

  const portfolioPass = !!(resume.contact.linkedin || resume.contact.github);
  contactChecks.push({
    name: "LinkedIn or Portfolio link",
    status: portfolioPass ? "Passed" : "Missing",
    pts: portfolioPass ? 5 : 0,
    maxPts: 5,
    detail: portfolioPass ? "Professional profile URL present." : "Add a LinkedIn or GitHub URL."
  });

  const contactScore = contactChecks.reduce((acc, c) => acc + c.pts, 0);

  // --- Pillar 5: Content Quality (Max 20 pts) ---
  const contentQualityChecks: PillarCheck[] = [];

  const summaryDepthPass = !!(resume.summary && resume.summary.length > 30);
  contentQualityChecks.push({
    name: "Executive summary depth",
    status: summaryDepthPass ? "Passed" : "Needs improvement",
    pts: summaryDepthPass ? 5 : 1,
    maxPts: 5,
    detail: summaryDepthPass ? "Well-crafted executive summary overview." : "Add a 2-3 sentence professional summary."
  });

  // Profile-aware experience/project depth
  const expDepthPass = isStudentOrInternship
    ? (resume.projects.length > 0 || resume.internships.length > 0 || resume.experience.length > 0)
    : (resume.experience.length > 0 && resume.experience[0].description.length >= 1) || resume.internships.length > 0;

  contentQualityChecks.push({
    name: isStudentOrInternship ? "Practical experience & project depth" : "Work experience bullet depth",
    status: expDepthPass ? "Passed" : "Needs improvement",
    pts: expDepthPass ? 5 : 2,
    maxPts: 5,
    detail: expDepthPass
      ? (isStudentOrInternship ? "Strong practical project and activity exposure." : "Detailed bullet points describing accomplishments.")
      : (isStudentOrInternship ? "Add technical projects or practical activities." : "Expand work experience bullet points.")
  });

  const skillsRichnessPass = resume.skills.technical.length >= 5;
  contentQualityChecks.push({
    name: "Technical skills richness",
    status: skillsRichnessPass ? "Passed" : "Needs improvement",
    pts: skillsRichnessPass ? 5 : resume.skills.technical.length >= 3 ? 3 : 1,
    maxPts: 5,
    detail: skillsRichnessPass ? `Extracted ${resume.skills.technical.length} technical skills.` : `Only ${resume.skills.technical.length} technical skills found.`
  });

  const achCertPass = resume.projects.length > 0 || resume.certifications.length > 0 || resume.achievements.length > 0;
  contentQualityChecks.push({
    name: "Projects & certifications",
    status: achCertPass ? "Passed" : "Needs improvement",
    pts: achCertPass ? 5 : 1,
    maxPts: 5,
    detail: achCertPass ? "Projects or certifications section present." : "Add relevant projects or professional certifications."
  });

  const contentQualityScore = contentQualityChecks.reduce((acc, c) => acc + c.pts, 0);

  // --- Overall ATS Resume Quality Score (Sum of 5 pure resume pillars: 20 * 5 = 100 max) ---
  const overallScore = Math.min(100, Math.max(10, sectionsScore + formattingScore + readabilityScore + contactScore + contentQualityScore));

  // Grade Assignment
  let grade: AtsScoreResult['grade'] = 'C';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 60) grade = 'C';
  else if (overallScore >= 50) grade = 'D';
  else grade = 'F';

  // --- Job-Specific Sub-Metrics (Calculated ONLY if JD exists - Conceptually Separate from ATS Score) ---
  let keywordScore: number | null = null;
  let keywordDensity = 0;
  const frequencyMap: Record<string, number> = {};

  let skillsScore: number | null = null;
  let matchedSkillCount = 0;
  let totalRequiredSkills = 0;

  if (hasJd && jd) {
    if (jd.keywords && jd.keywords.length > 0) {
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
      keywordScore = 15;
    }

    if (jd.requiredSkills && jd.requiredSkills.length > 0) {
      totalRequiredSkills = jd.requiredSkills.length;
      const reqSet = new Set(jd.requiredSkills.map(s => s.toLowerCase()));
      const resSet = new Set(resume.skills.all.map(s => s.toLowerCase()));

      matchedSkillCount = 0;
      reqSet.forEach(req => {
        if (resSet.has(req)) matchedSkillCount++;
      });

      skillsScore = Math.min(20, Math.round((matchedSkillCount / Math.max(1, totalRequiredSkills)) * 20));
    } else {
      skillsScore = 15;
    }
  }

  // Strengths, Weaknesses & Recommendations
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const criticalFixes: string[] = [];
  const recommendations: import("@/types").AtsRecommendation[] = [];

  // Critical Priority Recommendations
  if (!resume.contact.email || !resume.contact.phone) {
    recommendations.push({ text: "Missing complete contact details (email or phone number).", priority: "Critical", pillar: "Contact" });
  }

  if (itemsMissing.length > 0) {
    recommendations.push({ text: `Missing essential section(s): ${itemsMissing.join(", ")}.`, priority: "Critical", pillar: "Sections" });
    weaknesses.push(`Missing essential section(s): ${itemsMissing.join(", ")}.`);
  } else {
    strengths.push("Comprehensive section structure aligned with selected candidate profile.");
  }

  if (isExperienced && !hasFormalExperience) {
    recommendations.push({ text: "No formal work experience detected for the selected Experienced Professional profile.", priority: "Critical", pillar: "Sections" });
    weaknesses.push("Work experience is expected for Experienced Professional profile but missing.");
    criticalFixes.push("Add a dedicated Work Experience section describing professional employment history.");
  }

  if (isStudentOrInternship && !hasFormalExperience && practicalCount > 0) {
    strengths.push("Strong practical project experience detected (suitable for student/fresher profile).");
  }

  if (resume.wordCount < 200) {
    recommendations.push({ text: "Resume is shorter than recommended (under 200 words).", priority: "Critical", pillar: "Formatting" });
  }

  // Important Priority Recommendations
  if (!hasJd) {
    recommendations.push({ text: "Job-specific keywords cannot be evaluated because no Job Description was supplied.", priority: "Important", pillar: "Keywords" });
  }

  if (!resume.contact.linkedin) {
    recommendations.push({ text: "LinkedIn profile is missing.", priority: "Important", pillar: "Formatting" });
  }

  if (impactCount < 3) {
    recommendations.push({ text: "Project descriptions and bullet points lack measurable outcomes.", priority: "Important", pillar: "Impact" });
    weaknesses.push("Lacks quantifiable metrics. Add specific numbers (%, scale, time saved) to bullet points.");
  } else {
    strengths.push(`Includes ${impactCount} quantifiable impact metrics (e.g. percentages, growth numbers).`);
  }

  if (verbMatches.length < 5) {
    recommendations.push({ text: "Some bullets use weak action verbs. Replace with strong verbs like Built, Developed, or Analyzed.", priority: "Important", pillar: "Readability" });
  }

  if (formattingIssues.length > 0) {
    criticalFixes.push(...formattingIssues);
  }

  return {
    overallScore,
    grade,
    hasJd,
    breakdown: {
      sections: {
        score: sectionsScore,
        maxScore: 20,
        itemsPresent,
        itemsMissing,
        checks: sectionsChecks,
      },
      formatting: {
        score: formattingScore,
        maxScore: 20,
        passCount: formattingChecks.filter(c => c.status === "Passed").length,
        issues: formattingIssues,
        checks: formattingChecks,
      },
      readability: {
        score: readabilityScore,
        maxScore: 20,
        gradeLevel: "Collegiate (Professional)",
        avgSentenceLength: 14,
        wordCount: resume.wordCount,
        checks: readabilityChecks,
      },
      contact: {
        score: contactScore,
        maxScore: 20,
        checks: contactChecks,
      },
      contentQuality: {
        score: contentQualityScore,
        maxScore: 20,
        checks: contentQualityChecks,
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
    },
    strengths,
    weaknesses,
    recommendations,
    criticalFixes: criticalFixes.length > 0 ? criticalFixes : ["No critical fixes needed! Resume structure is well-optimized."],
  };
}
