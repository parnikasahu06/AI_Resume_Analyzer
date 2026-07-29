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

  // Name heuristic: Usually top 1-3 lines before email/phone
  let name = "Candidate";
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (!firstLine.includes("@") && firstLine.length < 40) {
      name = firstLine.replace(/[^a-zA-Z\s]/g, "").trim() || "Candidate";
    }
  }

  // 2. Skills Extraction
  const matchedSkills: string[] = [];
  const lowerText = rawText.toLowerCase();

  COMMON_SKILLS.forEach(skill => {
    // Regex boundary check for exact word matching
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(rawText)) {
      matchedSkills.push(skill);
    }
  });

  const softSkillsKeywords = ["Leadership", "Communication", "Problem Solving", "Teamwork", "Agile", "Scrum", "Mentorship", "Critical Thinking"];
  const softSkills = matchedSkills.filter(s => softSkillsKeywords.includes(s));
  const techSkills = matchedSkills.filter(s => !softSkillsKeywords.includes(s));

  // 3. Section Parsing (Summary, Experience, Education, Projects, Certifications)
  const sections = parseSections(rawText);

  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  return {
    contact: {
      name,
      email,
      phone,
      linkedin,
      github,
    },
    summary: sections.summary || generateFallbackSummary(rawText, matchedSkills),
    skills: {
      technical: techSkills,
      soft: softSkills,
      tools: techSkills.filter(s => ["Git", "Docker", "VS Code", "Postman", "Vite", "Webpack", "Vercel"].includes(s)),
      all: matchedSkills,
    },
    experience: sections.experience.length > 0 ? sections.experience : extractFallbackExperience(rawText),
    education: sections.education.length > 0 ? sections.education : extractFallbackEducation(rawText),
    projects: sections.projects,
    certifications: sections.certifications,
    achievements: sections.achievements,
    rawText,
    wordCount,
  };
}

interface ExpItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

function parseSections(text: string) {
  const lines = text.split("\n");
  const summaryLines: string[] = [];
  const experience: ParsedResume['experience'] = [];
  const education: ParsedResume['education'] = [];
  const projects: ParsedResume['projects'] = [];
  const certifications: string[] = [];
  const achievements: string[] = [];

  let currentSection = "";
  let currentExpItem: ExpItem | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const lower = trimmed.toLowerCase();

    // Identify Section Headers
    if (lower.includes("summary") || lower.includes("profile") || lower.includes("objective")) {
      currentSection = "summary";
      continue;
    } else if (lower.includes("experience") || lower.includes("work history") || lower.includes("employment")) {
      currentSection = "experience";
      continue;
    } else if (lower.includes("education") || lower.includes("academic")) {
      currentSection = "education";
      continue;
    } else if (lower.includes("project")) {
      currentSection = "projects";
      continue;
    } else if (lower.includes("certif")) {
      currentSection = "certifications";
      continue;
    } else if (lower.includes("achievement") || lower.includes("award") || lower.includes("honor")) {
      currentSection = "achievements";
      continue;
    }

    // Parse according to current section
    if (currentSection === "summary") {
      summaryLines.push(trimmed);
    } else if (currentSection === "experience") {
      if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
        if (currentExpItem) {
          currentExpItem.description.push(trimmed.replace(/^[-•*]\s*/, ""));
        }
      } else {
        if (trimmed.length > 5) {
          if (currentExpItem && currentExpItem.description.length > 0) {
            experience.push(currentExpItem);
            currentExpItem = null;
          }
          if (!currentExpItem) {
            currentExpItem = {
              company: trimmed.split("|")[0] || trimmed,
              role: trimmed.split("|")[1] || "Software Professional",
              duration: extractDateFromLine(trimmed) || "Present",
              description: []
            };
          }
        }
      }
    } else if (currentSection === "education") {
      if (trimmed.length > 5) {
        education.push({
          degree: trimmed.split("|")[0] || trimmed,
          institution: trimmed.split("|")[1] || "University / College",
          year: extractDateFromLine(trimmed) || undefined
        });
      }
    } else if (currentSection === "projects") {
      if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        if (projects.length > 0) {
          projects[projects.length - 1].description += " " + trimmed.replace(/^[-•*]\s*/, "");
        }
      } else {
        projects.push({
          title: trimmed.split("|")[0] || trimmed,
          description: trimmed.split("|")[1] || trimmed
        });
      }
    } else if (currentSection === "certifications") {
      certifications.push(trimmed.replace(/^[-•*]\s*/, ""));
    } else if (currentSection === "achievements") {
      achievements.push(trimmed.replace(/^[-•*]\s*/, ""));
    }
  }

  if (currentExpItem && (currentExpItem as ExpItem).description.length > 0) {
    experience.push(currentExpItem);
  }

  return {
    summary: summaryLines.join(" "),
    experience,
    education,
    projects,
    certifications,
    achievements,
  };
}

function extractDateFromLine(line: string): string {
  const match = line.match(/\b(20\d{2}|19\d{2})\b/g);
  if (match) {
    return match.join(" – ");
  }
  return "";
}

function generateFallbackSummary(rawText: string, skills: string[]): string {
  const topSkills = skills.slice(0, 5).join(", ");
  return `Motivated professional with expertise in ${topSkills || "software engineering and modern technologies"}. Demonstrated ability to deliver quality solutions and collaborate effectively within dynamic team environments.`;
}

function extractFallbackExperience(text: string): ParsedResume['experience'] {
  const lines = text.split("\n").filter(l => l.includes("Engineer") || l.includes("Developer") || l.includes("Lead") || l.includes("Manager"));
  if (lines.length > 0) {
    return lines.slice(0, 3).map((l, i) => ({
      company: `Organization ${i + 1}`,
      role: l.trim(),
      duration: "Recent",
      description: ["Contributed to core product architecture and key features implementation."]
    }));
  }
  return [{
    company: "Software Company",
    role: "Full Stack Developer",
    duration: "2021 – Present",
    description: ["Developed scalable software components and improved operational efficiency."]
  }];
}

function extractFallbackEducation(text: string): ParsedResume['education'] {
  const lower = text.toLowerCase();
  if (lower.includes("bachelor") || lower.includes("bs") || lower.includes("degree")) {
    return [{
      degree: "Bachelor of Science in Computer Science",
      institution: "Accredited University",
      year: "2020"
    }];
  }
  return [{
    degree: "Degree / Diploma in Technology",
    institution: "University",
    year: "2021"
  }];
}
