import { ParsedResume } from "@/types";

const COMMON_SKILLS = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "HTML5", "CSS3", "SQL", "R", "Dart", "Scala",
  // Frontend & UI
  "React", "Next.js", "Vue.js", "Angular", "Svelte", "Redux", "Zustand", "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Webpack", "Vite", "HTML", "CSS", "Sass", "Responsive Design",
  // Backend & Databases
  "Node.js", "Express", "NestJS", "Django", "FastAPI", "Flask", "Spring Boot", "GraphQL", "REST APIs", "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "DynamoDB", "Prisma", "TypeORM", "Firebase", "Supabase",
  // Cloud & DevOps
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Git", "GitHub Actions", "CI/CD", "Terraform", "Nginx", "Linux", "Serverless", "Microservices", "Vercel", "Netlify",
  // Testing & Quality
  "Jest", "Cypress", "Playwright", "Mocha", "Chai", "Postman", "Selenium",
  // AI & Data Science
  "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Pandas", "NumPy", "Scikit-Learn", "NLP", "Computer Vision",
  // Soft Skills
  "Leadership", "Communication", "Problem Solving", "Teamwork", "Agile", "Scrum", "Project Management", "Time Management", "Critical Thinking", "Mentorship"
];

const CLUB_LEADERSHIP_KEYWORDS = [
  "club", "csea", "nss", "ieee", "rotaract", "student coordinator", "event management",
  "public speaking", "cultural secretary", "sports secretary", "placement coordinator",
  "fest coordinator", "volunteer", "society", "student council", "campus ambassador",
  "event management team", "club member", "organizer", "head of department"
];

const INTERN_KEYWORDS = ["intern", "internship", "trainee", "apprentice"];

/**
 * Segment concatenated text where newline/bullet symbols were lost during PDF text extraction.
 * Identifies boundary points where a clause ends and a capitalized action verb begins.
 */
export function segmentConcatenatedText(text: string): string[] {
  if (!text || !text.trim()) return [];

  // Strip standalone leading link labels
  let clean = text.replace(/^(github|gitlab|demo|live demo|view project|project link|repository|repo|website|link)\b[\s:|-]*/i, "").trim();

  // Split by explicit line breaks or bullet symbols first
  const initialLines = clean.split(/(?:^|\n)\s*[-•*–—\d+\.\)]\s*/).flatMap(l => l.split("\n")).map(l => l.trim()).filter(Boolean);

  const segmented: string[] = [];
  const actionVerbPattern = /\b(Built|Extracted|Improved|Evaluated|Designed|Defined|Created|Analyzed|Visualized|Developed|Implemented|Integrated|Deployed|Managed|Led|Engineered|Reduced|Increased|Coordinated|Architected|Streamlined|Formulated|Constructed|Crafted|Executed)\b/g;

  for (const line of initialLines) {
    if (!line) continue;

    let lineClean = line.replace(/^(github|gitlab|demo|live demo|view project|project link|repository|repo|website|link)\b[\s:|-]*/i, "").trim();

    const matches: Array<{ index: number; verb: string }> = [];
    let match: RegExpExecArray | null;

    actionVerbPattern.lastIndex = 0;
    while ((match = actionVerbPattern.exec(lineClean)) !== null) {
      const idx = match.index;
      if (idx === 0) {
        matches.push({ index: idx, verb: match[1] });
      } else {
        const prevText = lineClean.slice(0, idx);
        if (/[.!?\)]\s*$/.test(prevText) || /\b\d+(%|k|x)?\s*$/i.test(prevText) || /\s{2,}$/.test(prevText) || /[,;]\s*$/.test(prevText)) {
          matches.push({ index: idx, verb: match[1] });
        }
      }
    }

    if (matches.length > 1) {
      for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index;
        const end = i < matches.length - 1 ? matches[i + 1].index : lineClean.length;
        let segment = lineClean.slice(start, end).trim();
        segment = segment.replace(/^(github|gitlab|demo|live demo|view project|project link|repository|repo|website|link)\b[\s:|-]*/i, "").trim();
        if (segment.length > 10) {
          segmented.push(segment);
        }
      }
    } else {
      if (lineClean.length > 10) {
        segmented.push(lineClean);
      }
    }
  }

  return segmented;
}

export function extractResumeData(rawText: string): ParsedResume {
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

  // 1. Contact Information Extraction
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "";

  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : "";

  const linkedinMatch = rawText.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[0] : undefined;

  const githubMatch = rawText.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
  const github = githubMatch ? githubMatch[0] : undefined;

  // Name heuristic
  let name = "Candidate";
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (!firstLine.includes("@") && firstLine.length < 40 && !/resume|cv|curriculum/i.test(firstLine)) {
      name = firstLine.replace(/[^a-zA-Z\s]/g, "").trim() || "Candidate";
    }
  }

  // 2. Skills Extraction
  const matchedSkills: string[] = [];

  COMMON_SKILLS.forEach(skill => {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(rawText)) {
      matchedSkills.push(skill);
    }
  });

  const softSkillsKeywords = ["Leadership", "Communication", "Problem Solving", "Teamwork", "Agile", "Scrum", "Mentorship", "Critical Thinking"];
  const softSkills = matchedSkills.filter(s => softSkillsKeywords.includes(s));
  const techSkills = matchedSkills.filter(s => !softSkillsKeywords.includes(s));

  // 3. Section Parsing with Contextual Classification
  const parsedSections = parseSectionsGranular(rawText);

  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  const isSummaryInferred = !parsedSections.summary;
  const summary = parsedSections.summary || generateFallbackSummary(matchedSkills);

  const isExperienceInferred = parsedSections.experience.length === 0 && parsedSections.internships.length === 0 && parsedSections.leadership.length === 0;

  return {
    contact: {
      name,
      email,
      phone,
      linkedin,
      github,
    },
    summary,
    isSummaryInferred,
    skills: {
      technical: techSkills,
      soft: softSkills,
      tools: techSkills.filter(s => ["Git", "Docker", "VS Code", "Postman", "Vite", "Webpack", "Vercel"].includes(s)),
      all: matchedSkills,
    },
    experience: parsedSections.experience,
    isExperienceInferred,
    internships: parsedSections.internships,
    leadership: parsedSections.leadership,
    extracurricular: parsedSections.extracurricular,
    neutralItems: parsedSections.neutralItems,
    education: parsedSections.education,
    projects: parsedSections.projects,
    certifications: parsedSections.certifications,
    achievements: parsedSections.achievements,
    rawText,
    wordCount,
  };
}

interface ParsedSectionsResult {
  summary: string;
  experience: ParsedResume['experience'];
  internships: ParsedResume['internships'];
  leadership: ParsedResume['leadership'];
  extracurricular: ParsedResume['extracurricular'];
  neutralItems: string[];
  education: ParsedResume['education'];
  projects: ParsedResume['projects'];
  certifications: string[];
  achievements: string[];
}

function parseSectionsGranular(text: string): ParsedSectionsResult {
  const lines = text.split("\n");
  const summaryLines: string[] = [];
  const experience: ParsedResume['experience'] = [];
  const internships: ParsedResume['internships'] = [];
  const leadership: ParsedResume['leadership'] = [];
  const extracurricular: ParsedResume['extracurricular'] = [];
  const neutralItems: string[] = [];
  const education: ParsedResume['education'] = [];
  const projects: ParsedResume['projects'] = [];
  const certifications: string[] = [];
  const achievements: string[] = [];

  let currentSection = "";
  let currentItem: { title: string; org: string; duration: string; bullets: string[] } | null = null;

  function flushCurrentItem() {
    if (!currentItem) return;

    const fullItemText = `${currentItem.title} ${currentItem.org}`.toLowerCase();
    const isIntern = INTERN_KEYWORDS.some(kw => fullItemText.includes(kw)) || currentSection === "internships";
    const isClubOrLeadership = CLUB_LEADERSHIP_KEYWORDS.some(kw => fullItemText.includes(kw)) || currentSection === "leadership" || currentSection === "extracurricular";

    if (isIntern) {
      internships.push({
        company: currentItem.org || "Organization",
        role: currentItem.title || "Intern",
        duration: currentItem.duration || "Period",
        description: currentItem.bullets,
      });
    } else if (isClubOrLeadership) {
      if (currentSection === "extracurricular" || fullItemText.includes("member") || fullItemText.includes("participant")) {
        extracurricular.push({
          title: currentItem.title || "Activity",
          organization: currentItem.org,
          description: currentItem.bullets,
        });
      } else {
        leadership.push({
          role: currentItem.title || "Position of Responsibility",
          organization: currentItem.org || "Organization / Club",
          duration: currentItem.duration,
          description: currentItem.bullets,
        });
      }
    } else if (currentSection === "experience" || currentSection === "work") {
      experience.push({
        company: currentItem.org || "Company",
        role: currentItem.title || "Position",
        duration: currentItem.duration || "Present",
        description: currentItem.bullets,
      });
    } else if (currentSection === "projects") {
      projects.push({
        title: currentItem.title,
        description: currentItem.bullets.join(" • "),
      });
    } else {
      neutralItems.push(`${currentItem.title} ${currentItem.org ? '| ' + currentItem.org : ''}`);
    }

    currentItem = null;
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const lower = trimmed.toLowerCase();

    // Section Header Matching
    if (/^(summary|professional summary|profile|objective|about me)[\s:]*$/i.test(trimmed) || lower === "summary" || lower === "profile") {
      flushCurrentItem();
      currentSection = "summary";
      continue;
    }
    if (/^(work experience|professional experience|employment history|work history|career)[\s:]*$/i.test(trimmed) || lower.includes("work experience") || lower.includes("employment")) {
      flushCurrentItem();
      currentSection = "experience";
      continue;
    }
    if (/^(internship|internships|industrial training)[\s:]*$/i.test(trimmed) || lower.includes("internship")) {
      flushCurrentItem();
      currentSection = "internships";
      continue;
    }
    if (/^(leadership|positions of responsibility|position of responsibility|responsibilities|student leadership)[\s:]*$/i.test(trimmed) || lower.includes("position of responsibility") || lower.includes("leadership")) {
      flushCurrentItem();
      currentSection = "leadership";
      continue;
    }
    if (/^(extracurricular|extra-curricular|co-curricular|activities|volunteering|clubs|societies)[\s:]*$/i.test(trimmed) || lower.includes("extracurricular") || lower.includes("co-curricular")) {
      flushCurrentItem();
      currentSection = "extracurricular";
      continue;
    }
    if (/^(education|academic qualification|academic background|academics)[\s:]*$/i.test(trimmed) || lower.includes("education")) {
      flushCurrentItem();
      currentSection = "education";
      continue;
    }
    if (/^(projects|academic projects|key projects|personal projects)[\s:]*$/i.test(trimmed) || lower.includes("projects")) {
      flushCurrentItem();
      currentSection = "projects";
      continue;
    }
    if (/^(certifications|licenses & certifications|courses|certif)[\s:]*$/i.test(trimmed) || lower.includes("certif")) {
      flushCurrentItem();
      currentSection = "certifications";
      continue;
    }
    if (/^(achievements|awards|honors|accomplishments)[\s:]*$/i.test(trimmed) || lower.includes("achievement") || lower.includes("awards")) {
      flushCurrentItem();
      currentSection = "achievements";
      continue;
    }

    // Process Content by Section
    if (currentSection === "summary") {
      summaryLines.push(trimmed);
    } else if (
      currentSection === "experience" ||
      currentSection === "internships" ||
      currentSection === "leadership" ||
      currentSection === "extracurricular"
    ) {
      if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
        const cleanBullet = trimmed.replace(/^[-•*]\s*/, "");
        const segmented = segmentConcatenatedText(cleanBullet);
        if (currentItem) {
          currentItem.bullets.push(...segmented);
        } else {
          neutralItems.push(...segmented);
        }
      } else {
        if (trimmed.length > 3) {
          flushCurrentItem();

          let title = trimmed;
          let org = "";
          const dateStr = extractDateFromLine(trimmed);

          if (trimmed.includes("|")) {
            const parts = trimmed.split("|");
            title = parts[0].trim();
            org = parts[1] ? parts[1].trim() : "";
          } else if (trimmed.includes(" at ")) {
            const parts = trimmed.split(" at ");
            title = parts[0].trim();
            org = parts[1] ? parts[1].trim() : "";
          } else if (trimmed.includes(" - ")) {
            const parts = trimmed.split(" - ");
            title = parts[0].trim();
            org = parts[1] ? parts[1].trim() : "";
          }

          currentItem = {
            title,
            org,
            duration: dateStr,
            bullets: [],
          };
        }
      }
    } else if (currentSection === "education") {
      if (trimmed.length > 5) {
        let degree = trimmed;
        let institution = "";
        if (trimmed.includes("|")) {
          const parts = trimmed.split("|");
          degree = parts[0].trim();
          institution = parts[1] ? parts[1].trim() : "";
        } else if (trimmed.includes(" - ")) {
          const parts = trimmed.split(" - ");
          degree = parts[0].trim();
          institution = parts[1] ? parts[1].trim() : "";
        }

        education.push({
          degree,
          institution,
          year: extractDateFromLine(trimmed) || undefined,
        });
      }
    } else if (currentSection === "projects") {
      const linkLabelRegex = /^(github|gitlab|demo|live demo|view project|project link|repository|repo|website|link)$/i;

      if (trimmed.includes("|")) {
        const parts = trimmed.split("|");
        const titlePart = parts[0].trim();
        const linkOrDescPart = parts[1] ? parts[1].trim() : "";

        const isPureLinkLabel = linkLabelRegex.test(linkOrDescPart);

        projects.push({
          title: titlePart,
          description: isPureLinkLabel ? "" : segmentConcatenatedText(linkOrDescPart).join(" • "),
          link: isPureLinkLabel ? linkOrDescPart : undefined,
        });
      } else if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
        const cleanBullet = trimmed.replace(/^[-•*]\s*/, "");
        const segmented = segmentConcatenatedText(cleanBullet);
        if (projects.length > 0) {
          const currentDesc = projects[projects.length - 1].description;
          projects[projects.length - 1].description = currentDesc
            ? `${currentDesc} • ${segmented.join(" • ")}`
            : segmented.join(" • ");
        } else {
          projects.push({
            title: "Project",
            description: segmented.join(" • "),
          });
        }
      } else {
        const cleanLine = trimmed.replace(/^(github|gitlab|demo|live demo|view project|project link|repository|repo|website|link)\b[\s:|-]*/i, "").trim();
        const segmented = segmentConcatenatedText(cleanLine);

        if (segmented.length > 0 && /^(built|designed|analyzed|created|developed|implemented|extracted|improved|evaluated)\b/i.test(segmented[0])) {
          // Accomplishment line
          if (projects.length > 0) {
            const currentDesc = projects[projects.length - 1].description;
            projects[projects.length - 1].description = currentDesc
              ? `${currentDesc} • ${segmented.join(" • ")}`
              : segmented.join(" • ");
          } else {
            projects.push({
              title: "Project",
              description: segmented.join(" • "),
            });
          }
        } else {
          // Title line
          projects.push({
            title: cleanLine,
            description: "",
          });
        }
      }
    } else if (currentSection === "certifications") {
      certifications.push(trimmed.replace(/^[-•*]\s*/, ""));
    } else if (currentSection === "achievements") {
      achievements.push(trimmed.replace(/^[-•*]\s*/, ""));
    } else {
      // Neutral unclassified lines
      if (trimmed.length > 10 && !trimmed.startsWith("http")) {
        const segmented = segmentConcatenatedText(trimmed);
        neutralItems.push(...segmented);
      }
    }
  }

  flushCurrentItem();

  return {
    summary: summaryLines.join(" "),
    experience,
    internships,
    leadership,
    extracurricular,
    neutralItems,
    education,
    projects,
    certifications,
    achievements,
  };
}

function extractDateFromLine(line: string): string {
  const match = line.match(/\b(20\d{2}|19\d{2}|\bpresent\b|\bcurrent\b)\b/gi);
  if (match) {
    return match.join(" – ");
  }
  return "";
}

function generateFallbackSummary(skills: string[]): string {
  const topSkills = skills.slice(0, 5).join(", ");
  return `Candidate demonstrating technical capabilities in ${topSkills || "relevant industry domain"}.`;
}
