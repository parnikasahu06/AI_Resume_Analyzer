import { ParsedResume, JobDescription } from "@/types";

export const SAMPLE_RESUME_TEXT = `
Alex Morgan
Email: alex.morgan@example.com | Phone: +1 (555) 234-5678 | Location: San Francisco, CA
LinkedIn: linkedin.com/in/alexmorgan-dev | GitHub: github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Full Stack Software Engineer with 4+ years of experience designing and scaling web applications using React, Next.js, Node.js, and TypeScript. Proven track record of optimizing frontend performance by 35% and building RESTful APIs and GraphQL services. Adept in cloud deployments on AWS, Docker containerization, and CI/CD pipelines.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL
- Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Vue.js, Webpack
- Backend: Node.js, Express.js, REST APIs, GraphQL, PostgreSQL, MongoDB, Redis
- DevOps & Cloud: AWS (S3, EC2, Lambda), Docker, Git, GitHub Actions, CI/CD
- Testing & Tools: Jest, Cypress, Postman, Vite, Vercel

WORK EXPERIENCE
Senior Frontend Engineer | TechScale Solutions | San Francisco, CA
Jan 2022 – Present
- Spearheaded the redesign of the core SaaS platform using Next.js 14 and Tailwind CSS, increasing page load speed by 40% and user engagement by 25%.
- Architected reusable UI component library following atomic design principles, serving 12 internal engineering teams and reducing feature development time by 30%.
- Implemented real-time dashboard capabilities using WebSockets and Redis, handling over 100,000 daily active user events.
- Mentored 4 junior engineers, conducted code reviews, and established automated Jest unit testing with 85% code coverage.

Software Engineer | Innovate Cloud Inc | San Jose, CA
Jun 2020 – Dec 2021
- Developed scalable RESTful APIs with Node.js and Express, integrated with PostgreSQL database for enterprise client analytics.
- Migrated legacy monolith architecture to microservices with Docker containerization deployed on AWS ECS.
- Enhanced database query performance by 45% by implementing Redis caching layers and optimizing SQL queries.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley
Graduated: May 2020 | GPA: 3.8/4.0

PROJECTS
AI Content Studio | Next.js, OpenAI API, Tailwind CSS, Prisma
- Built a full-stack SaaS platform enabling users to generate SEO-optimized blog posts using GPT-4.
- Integrated Stripe payment webhooks for tier subscription models and managed database state with PostgreSQL.

DevPulse Developer Portal | React, Node.js, Docker, MongoDB
- Developed an open-source developer dashboard for tracking GitHub repository pull requests and CI/CD workflow status.

CERTIFICATIONS
- AWS Certified Solutions Architect – Associate (2023)
- Meta Front-End Developer Professional Certificate (2022)

ACHIEVEMENTS
- Awarded 'Engineering Team MVP' at TechScale Solutions in 2023 for outstanding architectural contribution.
- 1st Place Winner at Bay Area Hackathon 2021 out of 60 competing teams.
`;

export const SAMPLE_JOB_DESCRIPTION_TEXT = `
Senior Full Stack Engineer (React / Next.js / Node.js)
Company: CloudSphere Technologies
Location: Remote / San Francisco, CA

About the Role:
We are seeking an experienced Senior Full Stack Engineer to lead the design and implementation of our high-volume cloud intelligence platform. You will build cutting-edge user interfaces using Next.js and React, while building robust backend services with Node.js, TypeScript, PostgreSQL, and GraphQL.

Key Responsibilities:
- Lead the architecture and implementation of scalable, high-performance web applications using React, Next.js, and TypeScript.
- Design, build, and maintain production-grade REST APIs and GraphQL microservices.
- Collaborate with Product and UI/UX Designers to craft high-conversion, responsive web experiences.
- Build CI/CD automation pipelines, write unit/integration tests with Jest and Cypress, and ensure top-notch application quality.
- Manage cloud infrastructure on AWS (Lambda, S3, ECS) and containerization using Docker and Kubernetes.
- Drive technical standards, mentor software engineers, and conduct rigorous code reviews.

Qualifications & Skills Required:
- 4+ years of professional software development experience in Full Stack engineering.
- Deep expertise in JavaScript, TypeScript, React, Next.js, and Node.js.
- Strong proficiency with PostgreSQL, MongoDB, Redis, and ORMs like Prisma or TypeORM.
- Hands-on experience with Docker, Kubernetes, AWS Cloud services, and GitHub Actions CI/CD.
- Proven experience with State Management (Redux, Zustand) and CSS frameworks (Tailwind CSS, Radix UI).
- Solid knowledge of web performance optimization, SEO best practices, and security principles.
- Experience with AI API integrations (OpenAI, Gemini API, LangChain, vector databases) is a major plus!
- Bachelor's degree in Computer Science, Software Engineering, or equivalent experience.
`;

export const PARSED_SAMPLE_RESUME: ParsedResume = {
  contact: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    location: "San Francisco, CA",
  },
  summary:
    "Results-driven Full Stack Software Engineer with 4+ years of experience designing and scaling web applications using React, Next.js, Node.js, and TypeScript. Proven track record of optimizing frontend performance by 35% and building RESTful APIs and GraphQL services. Adept in cloud deployments on AWS, Docker containerization, and CI/CD pipelines.",
  skills: {
    technical: [
      "JavaScript",
      "TypeScript",
      "Python",
      "HTML5",
      "CSS3",
      "SQL",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
      "Git",
      "CI/CD",
      "Jest",
    ],
    soft: ["Leadership", "Mentorship", "Collaboration", "Problem Solving"],
    tools: ["Tailwind CSS", "Vue.js", "Webpack", "Vite", "Vercel", "Cypress", "Postman", "GitHub Actions"],
    all: [
      "JavaScript",
      "TypeScript",
      "Python",
      "HTML5",
      "CSS3",
      "SQL",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
      "Git",
      "CI/CD",
      "Jest",
      "Tailwind CSS",
      "Vue.js",
      "Webpack",
      "Vite",
      "Vercel",
      "Cypress",
      "Postman",
      "GitHub Actions",
    ],
  },
  experience: [
    {
      company: "TechScale Solutions",
      role: "Senior Frontend Engineer",
      duration: "Jan 2022 – Present",
      location: "San Francisco, CA",
      description: [
        "Spearheaded the redesign of the core SaaS platform using Next.js 14 and Tailwind CSS, increasing page load speed by 40% and user engagement by 25%.",
        "Architected reusable UI component library following atomic design principles, serving 12 internal engineering teams and reducing feature development time by 30%.",
        "Implemented real-time dashboard capabilities using WebSockets and Redis, handling over 100,000 daily active user events.",
        "Mentored 4 junior engineers, conducted code reviews, and established automated Jest unit testing with 85% code coverage.",
      ],
    },
    {
      company: "Innovate Cloud Inc",
      role: "Software Engineer",
      duration: "Jun 2020 – Dec 2021",
      location: "San Jose, CA",
      description: [
        "Developed scalable RESTful APIs with Node.js and Express, integrated with PostgreSQL database for enterprise client analytics.",
        "Migrated legacy monolith architecture to microservices with Docker containerization deployed on AWS ECS.",
        "Enhanced database query performance by 45% by implementing Redis caching layers and optimizing SQL queries.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      year: "May 2020",
      gpa: "3.8/4.0",
    },
  ],
  projects: [
    {
      title: "AI Content Studio",
      description:
        "Built a full-stack SaaS platform enabling users to generate SEO-optimized blog posts using GPT-4. Integrated Stripe payment webhooks for tier subscription models.",
      technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Prisma", "PostgreSQL"],
    },
    {
      title: "DevPulse Developer Portal",
      description:
        "Developed an open-source developer dashboard for tracking GitHub repository pull requests and CI/CD workflow status.",
      technologies: ["React", "Node.js", "Docker", "MongoDB"],
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate (2023)",
    "Meta Front-End Developer Professional Certificate (2022)",
  ],
  achievements: [
    "Awarded 'Engineering Team MVP' at TechScale Solutions in 2023 for outstanding architectural contribution.",
    "1st Place Winner at Bay Area Hackathon 2021 out of 60 competing teams.",
  ],
  rawText: SAMPLE_RESUME_TEXT,
  wordCount: 385,
};

export const SAMPLE_JOB_DESCRIPTION: JobDescription = {
  title: "Senior Full Stack Engineer (React / Next.js / Node.js)",
  company: "CloudSphere Technologies",
  rawText: SAMPLE_JOB_DESCRIPTION_TEXT,
  keywords: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Jest",
    "Cypress",
    "Tailwind CSS",
    "Redis",
    "Prisma",
    "LangChain",
    "Vector Databases",
    "Microservices",
    "SEO",
    "REST APIs",
  ],
  requiredSkills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Jest",
  ],
  preferredSkills: [
    "Kubernetes",
    "Prisma",
    "LangChain",
    "Vector Databases",
    "Zustand",
    "Redux",
  ],
  experienceLevel: "Senior (4+ years)",
};
