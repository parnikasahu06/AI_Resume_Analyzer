export interface JobPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
}

export interface JobCategory {
  id: string;
  name: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  { id: "data-ai", name: "Data, AI & Analytics" },
  { id: "software", name: "Software Development" },
  { id: "cloud-cyber", name: "Cloud, DevOps & Cybersecurity" },
  { id: "product-mgmt", name: "Product & Management" },
  { id: "marketing-creative", name: "Marketing & Creative" },
  { id: "finance", name: "Finance" },
  { id: "hr-recruitment", name: "HR & Recruitment" },
  { id: "sales-cs", name: "Sales & Customer Success" },
];

export const POPULAR_ROLES = [
  "data-analyst",
  "software-engineer",
  "business-analyst",
  "product-manager",
  "hr-executive",
  "digital-marketing-executive",
];

export const JOB_PRESETS: JobPreset[] = [
  // 1. DATA, AI & ANALYTICS
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data, AI & Analytics",
    description: `JOB TITLE: Data Analyst
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking a detail-oriented Data Analyst to transform complex raw datasets into actionable business insights. You will design interactive dashboards, run analytical queries, and collaborate with cross-functional stakeholders to drive data-informed strategic decision making.

KEY RESPONSIBILITIES:
- Write optimized complex SQL queries to extract, transform, and aggregate enterprise data.
- Build and maintain interactive dashboards in Power BI and Tableau for executive leadership.
- Perform exploratory data analysis using Python (Pandas, NumPy) and Excel (Pivot Tables, VLOOKUP).
- Conduct quantitative analysis and hypothesis testing to uncover trends, anomalies, and revenue opportunities.
- Communicate findings via clear data visualization and structured analytical reports.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in SQL, Python, Pandas, Excel, Power BI, Tableau, and Data Visualization.
- Strong grounding in Descriptive Statistics, Data Cleaning, and ETL processes.
- Bachelor's degree in Computer Science, Statistics, Mathematics, Economics, or related quantitative field.

PREFERRED SKILLS:
- Experience with Cloud Data Warehouses (Snowflake, BigQuery), R, or automated data pipelines.`,
    requiredSkills: ["SQL", "Python", "Pandas", "Excel", "Power BI", "Tableau", "Data Visualization", "Statistics"],
    preferredSkills: ["Snowflake", "BigQuery", "R", "ETL"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data, AI & Analytics",
    description: `JOB TITLE: Data Scientist
LOCATION: Remote / On-Site
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are hiring a Data Scientist to build predictive models and machine learning pipelines that solve core business problems. You will leverage statistical modeling, machine learning algorithms, and deep learning architectures to extract predictive value from high-dimensional datasets.

KEY RESPONSIBILITIES:
- Develop, validate, and deploy supervised and unsupervised Machine Learning models (Scikit-Learn, XGBoost, PyTorch).
- Perform feature engineering, statistical modeling, hypothesis testing, and A/B testing experiment evaluation.
- Build automated ML pipelines for data preprocessing, model inference, and continuous validation.
- Collaborate with software engineers to integrate ML models into production API microservices.

REQUIRED SKILLS & QUALIFICATIONS:
- Advanced proficiency in Python, Machine Learning, Scikit-Learn, TensorFlow, PyTorch, SQL, and Statistical Analysis.
- Strong knowledge of Regression, Classification, Clustering, NLP, and Model Optimization.
- Master's or Bachelor's in Data Science, Computer Science, Statistics, or Applied Mathematics.

PREFERRED SKILLS:
- Experience with MLOps tools (MLflow, Docker, SageMaker) and Big Data frameworks (PySpark).`,
    requiredSkills: ["Python", "Machine Learning", "Scikit-Learn", "TensorFlow", "PyTorch", "SQL", "Statistics", "A/B Testing"],
    preferredSkills: ["MLflow", "Docker", "SageMaker", "PySpark"],
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Data, AI & Analytics",
    description: `JOB TITLE: Machine Learning Engineer
LOCATION: Remote / Hybrid
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are looking for a Machine Learning Engineer to productionize ML models and architect scalable MLOps infrastructures. You will bridge the gap between Data Science research and resilient high-throughput software systems.

KEY RESPONSIBILITIES:
- Package, deploy, and monitor scalable ML models into production APIs using Docker, Kubernetes, and FastAPI.
- Build automated MLOps CI/CD data pipelines for continuous model training, versioning, and drift monitoring.
- Optimize model inference speed and latency using TensorRT, ONNX, and GPU acceleration.
- Collaborate with Data Scientists and Cloud Engineers to maintain robust vector data stores.

REQUIRED SKILLS & QUALIFICATIONS:
- Expertise in Python, PyTorch, TensorFlow, Docker, Kubernetes, MLOps, CI/CD, and REST APIs.
- Experience with Vector Databases, Model Deployment, and Cloud Platforms (AWS/GCP).
- Degree in Computer Science, Artificial Intelligence, or Software Engineering.

PREFERRED SKILLS:
- Familiarity with Triton Inference Server, Ray, MLflow, and distributed training setups.`,
    requiredSkills: ["Python", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "MLOps", "CI/CD", "REST APIs"],
    preferredSkills: ["Vector Databases", "MLflow", "Triton", "AWS"],
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Data, AI & Analytics",
    description: `JOB TITLE: AI Engineer (Generative AI & LLMs)
LOCATION: Remote
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are recruiting an innovative AI Engineer to design and deploy Generative AI application architectures. You will construct Retrieval-Augmented Generation (RAG) systems, fine-tune Large Language Models (LLMs), and integrate intelligent agentic frameworks.

KEY RESPONSIBILITIES:
- Architect and implement RAG pipelines using LangChain, LlamaIndex, OpenAI APIs, and Vector Databases (Pinecone, Chroma).
- Fine-tune foundation open-source models (Llama, Mistral) using LoRA/PEFT techniques for domain-specific tasks.
- Build evaluation suites for measuring hallucination, accuracy, latency, and context relevance in LLM outputs.
- Develop backend AI services using Python, FastAPI, and async serverless architectures.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Python, OpenAI, LangChain, LlamaIndex, Vector Databases, Prompt Engineering, and RAG.
- Solid understanding of LLM Fine-Tuning, Embeddings, PyTorch, and API Integration.
- Degree in Computer Science, Software Engineering, or Artificial Intelligence.

PREFERRED SKILLS:
- Experience with AI Agents (AutoGPT, CrewAI), Guardrails, and Docker containerization.`,
    requiredSkills: ["Python", "OpenAI", "LangChain", "Vector Databases", "Prompt Engineering", "RAG", "PyTorch"],
    preferredSkills: ["LlamaIndex", "Fine-Tuning", "Docker", "FastAPI"],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    category: "Data, AI & Analytics",
    description: `JOB TITLE: Business Analyst
LOCATION: Hybrid / On-Site
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a Business Analyst to serve as a vital communication bridge between business stakeholders and technology development teams. You will gather business requirements, document process workflows, and translate business goals into clear technical specifications.

KEY RESPONSIBILITIES:
- Conduct stakeholder interviews, workshops, and requirement gathering sessions.
- Document functional and non-functional requirements in User Stories, BRDs, and FRDs using Jira and Confluence.
- Map end-to-end business process workflows (BPMN, Flowcharts) and conduct gap analyses.
- Analyze business data using Excel, SQL, and Power BI to support business cases and ROI evaluations.
- Facilitate User Acceptance Testing (UAT) and support change management efforts.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Business Analysis, Requirement Gathering, User Stories, Agile, Scrum, Jira, Confluence, SQL, and Excel.
- Exceptional verbal and written communication, documentation, and stakeholder management skills.
- Bachelor's degree in Business Administration, Information Systems, Management, or Computer Science.

PREFERRED SKILLS:
- Knowledge of Tableau, Power BI, process mapping software (Visio, Lucidchart), and CBAP/ECBA certification.`,
    requiredSkills: ["Business Analysis", "Requirement Gathering", "User Stories", "Agile", "Scrum", "Jira", "Confluence", "SQL", "Excel"],
    preferredSkills: ["Power BI", "Visio", "UAT", "BPMN"],
  },

  // 2. SOFTWARE DEVELOPMENT
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Software Development",
    description: `JOB TITLE: Software Engineer
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking a talented Software Engineer to design, code, and maintain robust, scalable software applications. You will work across the full software development lifecycle to deliver clean, well-tested code that powers high-availability software products.

KEY RESPONSIBILITIES:
- Write clean, maintainable, and efficient code in Python, Java, or TypeScript.
- Architect and develop secure RESTful APIs, backend microservices, and database schemas.
- Participate in code reviews, automated unit testing, and agile sprint planning sessions.
- Debug complex production issues, perform root cause analysis, and optimize application performance.

REQUIRED SKILLS & QUALIFICATIONS:
- Strong proficiency in Software Engineering, Python, Java, TypeScript, Data Structures, Algorithms, SQL, and Git.
- solid grasp of Object-Oriented Programming (OOP), Design Patterns, System Architecture, and REST APIs.
- Bachelor's degree in Computer Science, Software Engineering, or related technical field.

PREFERRED SKILLS:
- Experience with Docker, CI/CD pipelines, Cloud infrastructure (AWS/Azure), and Microservices.`,
    requiredSkills: ["Software Engineering", "Python", "Java", "TypeScript", "Data Structures", "Algorithms", "SQL", "Git", "REST APIs"],
    preferredSkills: ["Docker", "CI/CD", "AWS", "Microservices"],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Development",
    description: `JOB TITLE: Frontend Developer (React / Next.js)
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are looking for a creative Frontend Developer to craft responsive, performant, and visual web user interfaces. You will translate UI/UX Figma designs into modular, dynamic web applications with state management and accessible design patterns.

KEY RESPONSIBILITIES:
- Build interactive modern web applications using HTML5, CSS3, JavaScript (ES6+), TypeScript, React, and Next.js.
- Implement sleek, responsive UI components using Tailwind CSS and CSS Modules.
- Manage client-side application state efficiently using Redux Toolkit, Zustand, or React Context.
- Integrate frontend components with RESTful and GraphQL APIs, optimizing web page loading speeds and Core Web Vitals.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Responsive Design, and REST APIs.
- Deep understanding of DOM manipulation, cross-browser compatibility, web performance, and Git.
- Degree in Computer Science, Web Development, or equivalent practical frontend development experience.

PREFERRED SKILLS:
- Familiarity with Jest, React Testing Library, GraphQL, Storybook, and Webpack/Vite.`,
    requiredSkills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "REST APIs", "Git"],
    preferredSkills: ["Redux", "Zustand", "Jest", "GraphQL", "Vite"],
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Development",
    description: `JOB TITLE: Backend Developer (Node.js / Python / Java)
LOCATION: Remote / Hybrid
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are hiring a skilled Backend Developer to architect and build high-throughput backend services, data stores, and server infrastructure. You will be responsible for system reliability, API security, and database query optimization.

KEY RESPONSIBILITIES:
- Architect and deploy scalable backend microservices using Node.js, Express, Python, or Java.
- Design relational and NoSQL database models using PostgreSQL, MongoDB, and Redis caching.
- Secure API endpoints using JWT authentication, OAuth2, and rate-limiting middleware.
- Set up automated unit/integration tests and integrate services into CI/CD deployment pipelines.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Node.js, Express, Python, PostgreSQL, MongoDB, Redis, REST APIs, Microservices, and Git.
- Strong experience with SQL query optimization, ORMs (Prisma, TypeORM, SQLAlchemy), and Docker.
- Bachelor's degree in Computer Science, Information Technology, or Software Engineering.

PREFERRED SKILLS:
- Knowledge of GraphQL, Kafka/RabbitMQ message queues, Kubernetes, and AWS services.`,
    requiredSkills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "Microservices", "Docker", "Git"],
    preferredSkills: ["GraphQL", "Kafka", "Kubernetes", "AWS"],
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Development",
    description: `JOB TITLE: Full Stack Developer
LOCATION: Remote / On-Site
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are seeking a versatile Full Stack Developer to build end-to-end web applications. You will handle both intuitive frontend user experiences and robust backend architecture, taking features from concept to production deployment.

KEY RESPONSIBILITIES:
- Build modern responsive frontends using React, Next.js, TypeScript, and Tailwind CSS.
- Architect backend APIs and services using Node.js, Python, or Java with PostgreSQL and MongoDB.
- Manage database migrations, authentication workflows, server infrastructure, and Docker containers.
- Collaborate with product designers, QA testers, and DevOps engineers in an agile team environment.

REQUIRED SKILLS & QUALIFICATIONS:
- Expert in Full Stack Web Development: React, Next.js, TypeScript, Node.js, JavaScript, HTML5, CSS3, SQL, PostgreSQL, REST APIs, and Git.
- Experience with Docker, ORM databases, authentication mechanisms, and continuous integration.
- Degree in Computer Science, Software Engineering, or demonstrable full-stack application portfolio.

PREFERRED SKILLS:
- AWS/GCP cloud deployment, GraphQL, Redis, CI/CD automation, and automated testing frameworks.`,
    requiredSkills: ["React", "Next.js", "TypeScript", "Node.js", "JavaScript", "HTML5", "CSS3", "SQL", "PostgreSQL", "REST APIs", "Git"],
    preferredSkills: ["MongoDB", "Docker", "AWS", "GraphQL", "CI/CD"],
  },
  {
    id: "python-developer",
    title: "Python Developer",
    category: "Software Development",
    description: `JOB TITLE: Python Developer
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a Python Developer to build backend web applications, automated data scripts, and asynchronous microservices. You will leverage Python web frameworks and data processing libraries to deliver clean, scalable software solutions.

KEY RESPONSIBILITIES:
- Build high-performance RESTful APIs using Django, FastAPI, or Flask.
- Write clean, asynchronous Python code (asyncio) for backend background tasks and web scrapers.
- Integrate relational databases (PostgreSQL, MySQL) using SQLAlchemy or Django ORM.
- Implement unit tests using PyTest and maintain Dockerized microservice deployments.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Python, Django, FastAPI, Flask, SQL, PostgreSQL, REST APIs, PyTest, and Git.
- Solid understand of OOP in Python, virtual environments, async programming, and API documentation (Swagger/OpenAPI).
- Degree in Computer Science, Information Technology, or Software Development.

PREFERRED SKILLS:
- Redis, Celery, Docker, Pandas, NumPy, and AWS cloud deployment.`,
    requiredSkills: ["Python", "Django", "FastAPI", "Flask", "SQL", "PostgreSQL", "REST APIs", "PyTest", "Git"],
    preferredSkills: ["Redis", "Celery", "Docker", "Pandas", "AWS"],
  },
  {
    id: "java-developer",
    title: "Java Developer",
    category: "Software Development",
    description: `JOB TITLE: Java Developer
LOCATION: Remote / Hybrid
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are seeking an experienced Java Developer to build enterprise-grade software applications and high-concurrency microservices. You will work on business-critical backend systems using Spring Boot and cloud-native frameworks.

KEY RESPONSIBILITIES:
- Design and implement enterprise microservices using Java 17+, Spring Boot, and Spring Cloud.
- Manage relational database transactions and queries using Hibernate, JPA, and PostgreSQL/Oracle.
- Implement messaging systems (Kafka, RabbitMQ) for asynchronous event-driven processing.
- Write unit and integration tests using JUnit and Mockito within CI/CD pipelines.

REQUIRED SKILLS & QUALIFICATIONS:
- Expert in Java, Spring Boot, Spring Data JPA, Hibernate, Microservices, SQL, PostgreSQL, JUnit, and Maven/Gradle.
- Deep knowledge of OOP, Multi-threading, Design Patterns, RESTful Web Services, and Git.
- Degree in Computer Science, Software Engineering, or related field.

PREFERRED SKILLS:
- Apache Kafka, Docker, Kubernetes, Spring Security, and AWS.`,
    requiredSkills: ["Java", "Spring Boot", "Hibernate", "Microservices", "SQL", "PostgreSQL", "JUnit", "REST APIs", "Git"],
    preferredSkills: ["Kafka", "Docker", "Kubernetes", "Spring Security"],
  },
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    category: "Software Development",
    description: `JOB TITLE: Mobile App Developer (React Native / Flutter / iOS / Android)
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are recruiting a Mobile App Developer to build smooth, cross-platform or native mobile applications. You will create responsive mobile UIs, integrate device APIs, and maintain app store publish pipelines.

KEY RESPONSIBILITIES:
- Develop mobile applications using React Native, Flutter, Swift (iOS), or Kotlin (Android).
- Integrate native device capabilities (Camera, Push Notifications, Geolocation, Biometrics).
- Connect mobile frontends to REST APIs and handle offline caching / state storage.
- Optimize app rendering performance, startup times, memory usage, and release to App Store & Google Play Store.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in React Native, Flutter, JavaScript, TypeScript, Swift, or Kotlin, Mobile UI Design, REST APIs, and Git.
- Familiarity with Redux, Mobile App Lifecycle, Push Notifications, and App Store guidelines.
- Degree in Computer Science, Mobile Computing, or portfolio of published mobile apps.

PREFERRED SKILLS:
- Xcode, Android Studio, Firebase, App Center CI/CD, and GraphQL.`,
    requiredSkills: ["React Native", "Flutter", "JavaScript", "TypeScript", "Mobile App Development", "REST APIs", "Git"],
    preferredSkills: ["Swift", "Kotlin", "Firebase", "App Store Publishing"],
  },

  // 3. CLOUD, DEVOPS & CYBERSECURITY
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Cloud, DevOps & Cybersecurity",
    description: `JOB TITLE: DevOps Engineer
LOCATION: Remote / Hybrid
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are hiring a DevOps Engineer to automate build, test, and deployment workflows while maintaining high infrastructure availability. You will implement Infrastructure as Code (IaC), manage CI/CD pipelines, and monitor cloud server reliability.

KEY RESPONSIBILITIES:
- Provision and manage cloud infrastructure on AWS/GCP using Terraform, CloudFormation, and Ansible.
- Build and maintain automated CI/CD pipelines in GitHub Actions, GitLab CI, or Jenkins.
- Containerize application workloads using Docker and manage Kubernetes (EKS/GKE) cluster orchestration.
- Implement centralized logging, metrics dashboards, and alerting using Prometheus, Grafana, and ELK stack.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in DevOps, AWS, Linux, Terraform, Docker, Kubernetes, CI/CD, GitHub Actions, Bash, and Python.
- Strong knowledge of Networking, DNS, Security Groups, IAM, and System Administration.
- Bachelor's degree in Computer Science, Systems Engineering, or equivalent certifications (AWS DevOps, CKA).

PREFERRED SKILLS:
- Helm, ArgoCD, Ansible, CloudWatch, and Site Reliability Engineering (SRE) practices.`,
    requiredSkills: ["DevOps", "AWS", "Linux", "Terraform", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Bash", "Python"],
    preferredSkills: ["Prometheus", "Grafana", "Ansible", "ArgoCD"],
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Cloud, DevOps & Cybersecurity",
    description: `JOB TITLE: Cloud Engineer (AWS / Azure / GCP)
LOCATION: Remote / On-Site
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are seeking a Cloud Engineer to design, deploy, and optimize scalable cloud application environments. You will implement cloud architecture solutions, configure VPC networking, manage IAM security policies, and optimize cloud infrastructure costs.

KEY RESPONSIBILITIES:
- Architect and migrate enterprise applications onto AWS, Azure, or Google Cloud Platform (GCP).
- Configure virtual networks, load balancers, serverless functions (Lambda), EC2 instances, and RDS databases.
- Automate cloud infrastructure setup using Infrastructure as Code (Terraform, Bicep).
- Audit cloud environments for security compliance, cost optimization, and disaster recovery readiness.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in AWS, Azure, GCP, Cloud Computing, Terraform, Linux, Networking, IAM Security, and Python/Bash.
- AWS Certified Solutions Architect or Azure Administrator Certification preferred.
- Degree in Computer Science, Cloud Computing, or Systems Administration.

PREFERRED SKILLS:
- Kubernetes, CloudFront CDN, FinOps, Serverless Architecture, and Docker.`,
    requiredSkills: ["AWS", "Azure", "GCP", "Cloud Computing", "Terraform", "Linux", "Networking", "IAM", "Python"],
    preferredSkills: ["Kubernetes", "Lambda", "Docker", "FinOps"],
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Cloud, DevOps & Cybersecurity",
    description: `JOB TITLE: Cybersecurity Analyst
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are recruiting a Cybersecurity Analyst to protect enterprise networks, endpoints, and data assets against cyber threats. You will monitor security alarms, conduct vulnerability assessments, and respond to security incidents.

KEY RESPONSIBILITIES:
- Monitor SIEM tools (Splunk, Sentinel) for security alerts, anomalies, and unauthorized intrusions.
- Perform regular vulnerability scans (Nessus), risk assessments, and patch verification audits.
- Analyze malware samples, phishing reports, and network traffic logs (Wireshark) to investigate security events.
- Enforce IAM policies, Multi-Factor Authentication (MFA), and Zero Trust security controls.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Cybersecurity, SIEM, Splunk, Incident Response, Vulnerability Assessment, Wireshark, Linux, and Network Security.
- Industry certifications preferred: CompTIA Security+, CEH, or CySA+.
- Bachelor's degree in Cybersecurity, Information Assurance, or Computer Science.

PREFERRED SKILLS:
- Python scripting for security automation, Firewalls, Endpoint Detection & Response (EDR), and CIS Benchmarks.`,
    requiredSkills: ["Cybersecurity", "SIEM", "Splunk", "Incident Response", "Vulnerability Assessment", "Wireshark", "Linux", "Network Security"],
    preferredSkills: ["CompTIA Security+", "Python", "EDR", "Firewalls"],
  },
  {
    id: "security-engineer",
    title: "Security Engineer",
    category: "Cloud, DevOps & Cybersecurity",
    description: `JOB TITLE: Security Engineer (Application & Infrastructure Security)
LOCATION: Remote / Hybrid
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are seeking a Security Engineer to integrate security automation into our software development life cycle (DevSecOps) and fortify cloud infrastructure against advanced threats.

KEY RESPONSIBILITIES:
- Perform application security reviews, SAST/DAST scanning, and threat modeling for software release features.
- Build automated security testing checks into CI/CD pipelines (Snyk, SonarQube, Trivy).
- Configure web application firewalls (WAF), IAM access controls, encryption keys (KMS), and VPC network isolation.
- Lead security incident remediation and conduct internal penetration tests.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Application Security, DevSecOps, Penetration Testing, Python, Network Security, AWS Security, and Cryptography.
- Certification such as CISSP, OSCP, or AWS Certified Security Specialist is a plus.
- Degree in Computer Science, Software Engineering, or Cybersecurity.

PREFERRED SKILLS:
- SAST/DAST tools, Kubernetes Security, Docker Security, and OWASP Top 10 mitigation.`,
    requiredSkills: ["Security Engineering", "DevSecOps", "Penetration Testing", "Python", "Network Security", "AWS Security", "OWASP"],
    preferredSkills: ["CISSP", "OSCP", "Docker Security", "SonarQube"],
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst",
    category: "Cloud, DevOps & Cybersecurity",
    description: `JOB TITLE: SOC Analyst (Tier 1 / Tier 2)
LOCATION: On-Site / Shift Rotation
EXPERIENCE: 1+ Years

ROLE OVERVIEW:
We are hiring a SOC Analyst to operate within our 24/7 Security Operations Center. You will monitor security events, triage threat alerts, and isolate compromised endpoints to prevent enterprise data breaches.

KEY RESPONSIBILITIES:
- Monitor 24/7 security log streams across SIEM, EDR, Firewall, and Intrusion Detection Systems (IDS/IPS).
- Validate, triage, and classify incoming security alerts based on severity and impact potential.
- Execute incident response playbooks to isolate infected devices and revoke compromised user credentials.
- Document detailed security incident investigation reports and root cause findings.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in SOC Operations, SIEM Monitoring, Incident Triage, EDR, TCP/IP Networking, Linux, and Windows Security.
- Knowledge of MITRE ATT&CK framework, Log Analysis, and Phishing Analysis.
- CompTIA Security+ or Network+ certification required.

PREFERRED SKILLS:
- Python/PowerShell scripting, Splunk, CrowdStrike, and Security Orchestration (SOAR).`,
    requiredSkills: ["SOC Operations", "SIEM", "Incident Triage", "EDR", "Networking", "Linux", "Windows Security", "Security+"],
    preferredSkills: ["Splunk", "CrowdStrike", "Python", "PowerShell"],
  },

  // 4. PRODUCT & MANAGEMENT
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Product & Management",
    description: `JOB TITLE: Product Manager
LOCATION: Hybrid / Remote
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are seeking a strategic Product Manager to own product vision, roadmap strategy, and execution for key digital product initiatives. You will align cross-functional engineering, design, and business teams to launch user-centric software products.

KEY RESPONSIBILITIES:
- Conduct market research, user interviews, and competitive analysis to define product feature requirements.
- Formulate product roadmaps, prioritize backlogs, and write clear PRDs (Product Requirement Documents) in Jira.
- Partner with UX Designers and Engineering Leads during sprint planning, grooming, and release cycles.
- Analyze user telemetry metrics (Mixpanel, Google Analytics) to optimize product adoption, conversion, and retention.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Product Management, Product Roadmap, PRD Writing, User Research, Agile, Scrum, Jira, and Data Analytics.
- Strong strategic vision, prioritization skills (RICE/Kano), and cross-functional leadership ability.
- Bachelor's degree in Business, Computer Science, Engineering, or related discipline.

PREFERRED SKILLS:
- Figma, Mixpanel, A/B Testing, SQL, and Agile Certifications (PSPO/CSPO).`,
    requiredSkills: ["Product Management", "Product Roadmap", "PRD Writing", "User Research", "Agile", "Scrum", "Jira", "Data Analytics"],
    preferredSkills: ["Figma", "Mixpanel", "SQL", "A/B Testing"],
  },
  {
    id: "project-manager",
    title: "Project Manager",
    category: "Product & Management",
    description: `JOB TITLE: Technical Project Manager
LOCATION: Hybrid / Remote
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are hiring a Project Manager to lead software and technology projects from initiation through final delivery. You will manage project schedules, resource allocations, risk mitigation, and stakeholder communications to ensure on-time delivery.

KEY RESPONSIBILITIES:
- Define project scope, deliverables, milestone schedules, and resource budget allocations.
- Facilitate daily standups, sprint planning, retrospectives, and status meetings using Scrum or Waterfall methodologies.
- Track project timelines, risks, dependencies, and action items in Jira, Asana, or MS Project.
- Manage client and leadership stakeholder expectations with transparent progress reporting.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Project Management, Agile, Scrum, Waterfall, Jira, Asana, Risk Management, and Budgeting.
- Excellent organizational, negotiation, communication, and team management skills.
- Bachelor's degree in Project Management, Business Administration, or Computer Science. PMP or CSM certification is a plus.

PREFERRED SKILLS:
- MS Project, Confluence, Risk Mitigation strategies, and Software Development Lifecycle (SDLC).`,
    requiredSkills: ["Project Management", "Agile", "Scrum", "Jira", "Risk Management", "Budgeting", "Stakeholder Management"],
    preferredSkills: ["PMP", "CSM", "MS Project", "Asana"],
  },
  {
    id: "operations-executive",
    title: "Operations Executive",
    category: "Product & Management",
    description: `JOB TITLE: Operations Executive
LOCATION: On-Site / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking an Operations Executive to oversee day-to-day business operations, workflow optimization, and logistics management. You will implement process improvements to increase operational efficiency and decrease overhead costs.

KEY RESPONSIBILITIES:
- Monitor daily business operational workflows, inventory levels, vendor contracts, and logistics operations.
- Analyze operational KPIs, bottleneck points, and resource utilization using Excel and operational dashboards.
- Standardize Standard Operating Procedures (SOPs) and ensure compliance with company policies.
- Coordinate across procurement, customer service, and finance departments to resolve operational delays.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Business Operations, Process Optimization, Excel, Vendor Management, Inventory Control, and SOP Development.
- Strong problem-solving, organizational, and data analysis abilities.
- Degree in Business Operations, Supply Chain, Management, or related field.

PREFERRED SKILLS:
- ERP Systems (SAP, Oracle), Lean Six Sigma, and Supply Chain Logistics.`,
    requiredSkills: ["Operations Management", "Process Optimization", "Excel", "Vendor Management", "Logistics", "SOP Development"],
    preferredSkills: ["SAP", "Six Sigma", "Supply Chain", "ERP"],
  },
  {
    id: "management-trainee",
    title: "Management Trainee",
    category: "Product & Management",
    description: `JOB TITLE: Management Trainee
LOCATION: On-Site / Hybrid
EXPERIENCE: 0-1 Year (Entry Level / Fresh Graduates)

ROLE OVERVIEW:
We are recruiting ambitious Management Trainees to undergo a structured rotational program across core business functions (Operations, Sales, Marketing, HR, Finance). This role prepares high-potential candidates for future managerial positions.

KEY RESPONSIBILITIES:
- Complete quarterly rotational assignments across business operations, marketing, sales, and client management.
- Conduct market research, competitor benchmarking, and prepare presentation decks for senior executives.
- Assist department heads with project coordination, data entry, report compilation, and administrative tasks.
- Participate in leadership development workshops, cross-departmental initiatives, and strategic business reviews.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Communication, Presentation Skills, MS Office (Excel, PowerPoint, Word), Data Analysis, and Project Support.
- High adaptability, problem-solving mindset, fast learner, and leadership potential.
- Bachelor's or Master's degree in Business Administration, Management, Economics, or related fields.

PREFERRED SKILLS:
- Public speaking, basic SQL, market research tools, and project management fundamentals.`,
    requiredSkills: ["Communication", "MS Office", "Excel", "PowerPoint", "Market Research", "Data Analysis", "Project Support"],
    preferredSkills: ["Public Speaking", "SQL", "Problem Solving"],
  },

  // 5. MARKETING & CREATIVE
  {
    id: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    category: "Marketing & Creative",
    description: `JOB TITLE: Digital Marketing Executive
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a Digital Marketing Executive to plan and execute performance marketing campaigns across digital channels. You will manage paid ads, social media campaigns, search engine marketing (SEM), and email marketing to drive customer acquisition.

KEY RESPONSIBILITIES:
- Plan, execute, and optimize Google Ads, Meta Ads (Facebook/Instagram), and LinkedIn paid acquisition campaigns.
- Manage organic social media content schedules and build email marketing automation flows (Klaviyo/Mailchimp).
- Track campaign ROAS, CPA, CTR, and traffic conversion metrics using Google Analytics 4 (GA4).
- Collaborate with graphic designers and copywriters to produce high-converting ad creative assets.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Digital Marketing, Google Ads, Meta Ads, Google Analytics (GA4), SEO, Social Media Marketing, and Email Marketing.
- Strong analytical skills to interpret traffic data, run A/B copy tests, and optimize marketing budgets.
- Bachelor's degree in Marketing, Communications, Advertising, or Business Administration.

PREFERRED SKILLS:
- HubSpot, SEMrush, Copywriting, Canva, and Conversion Rate Optimization (CRO).`,
    requiredSkills: ["Digital Marketing", "Google Ads", "Meta Ads", "Google Analytics", "SEO", "Social Media Marketing", "Email Marketing"],
    preferredSkills: ["HubSpot", "SEMrush", "Copywriting", "CRO"],
  },
  {
    id: "seo-specialist",
    title: "SEO Specialist",
    category: "Marketing & Creative",
    description: `JOB TITLE: SEO Specialist
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking an SEO Specialist to increase organic search rankings, domain authority, and website traffic. You will manage technical SEO audits, keyword research, on-page optimization, and strategic link building initiatives.

KEY RESPONSIBILITIES:
- Perform comprehensive keyword research, content gap analyses, and competitor search rankings evaluation.
- Conduct technical SEO site audits (Screaming Frog), resolving crawl errors, page speed bottlenecks, and schema markup.
- Optimize on-page elements (Title Tags, Meta Descriptions, H1 headers, internal linking) across web content.
- Build high-quality backlink campaigns and track search rankings using SEMrush, Ahrefs, and Google Search Console.

REQUIRED SKILLS & QUALIFICATIONS:
- Expert in Search Engine Optimization (SEO), Technical SEO, Keyword Research, SEMrush, Ahrefs, Google Search Console, and Google Analytics.
- Solid understanding of HTML/CSS fundamentals, WordPress CMS, schema.org structured data, and Search Algorithms.
- Degree in Marketing, Communications, Computer Science, or equivalent SEO track record.

PREFERRED SKILLS:
- Content Strategy, PageSpeed Optimization, Basic JavaScript, and Local SEO.`,
    requiredSkills: ["SEO", "Technical SEO", "Keyword Research", "SEMrush", "Ahrefs", "Google Search Console", "Google Analytics", "WordPress"],
    preferredSkills: ["HTML/CSS", "Schema Markup", "Content Strategy", "PageSpeed"],
  },
  {
    id: "content-writer",
    title: "Content Writer",
    category: "Marketing & Creative",
    description: `JOB TITLE: Content Writer / Copywriter
LOCATION: Remote
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are recruiting a creative Content Writer to produce engaging, SEO-optimized content across digital channels. You will craft blog posts, website copy, whitepapers, social media posts, and marketing email newsletters.

KEY RESPONSIBILITIES:
- Write well-researched, compelling blog articles, ebooks, and landing page copy aligned with brand voice.
- Perform keyword integration and on-page SEO best practices to maximize organic content rankings.
- Proofread and edit copy for flawless grammar, readability, tone, and brand consistency.
- Collaborate with marketing teams to write engaging ad copy, social posts, and email newsletters.

REQUIRED SKILLS & QUALIFICATIONS:
- Exceptional skills in Content Writing, Copywriting, SEO Writing, Proofreading, Editing, Storytelling, and Content Strategy.
- Knowledge of WordPress, Grammarly, SEO keyword integration, and audience research.
- Bachelor's degree in English, Journalism, Mass Communication, or Marketing.

PREFERRED SKILLS:
- Technical Writing, Social Media Copy, HTML basics, and Canva.`,
    requiredSkills: ["Content Writing", "Copywriting", "SEO Writing", "Proofreading", "Editing", "Content Strategy", "Storytelling"],
    preferredSkills: ["WordPress", "Grammarly", "Technical Writing", "Social Media"],
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    category: "Marketing & Creative",
    description: `JOB TITLE: Graphic Designer
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking a talented Graphic Designer to produce eye-catching visual assets for marketing campaigns, brand identity, and digital media. You will turn creative briefs into high-quality visual content across digital and print mediums.

KEY RESPONSIBILITIES:
- Design digital marketing graphics, social media banners, promotional display ads, and email templates.
- Create brand identity collateral including logos, typography guidelines, iconography, and brand guidelines.
- Produce print materials such as brochures, pitch decks, event banners, and merchandise graphics.
- Collaborate with content writers and marketing managers to deliver polished visual stories on tight deadlines.

REQUIRED SKILLS & QUALIFICATIONS:
- Expert in Graphic Design, Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Figma, Visual Design, Typography, and Branding.
- Strong design portfolio demonstrating layout, color theory, image editing, and vector illustration skills.
- Degree or diploma in Graphic Design, Fine Arts, Visual Communication, or equivalent practical portfolio.

PREFERRED SKILLS:
- Motion Graphics (After Effects), Canva, Photo Retouching, and UI Layouts.`,
    requiredSkills: ["Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Typography", "Branding", "Visual Design"],
    preferredSkills: ["After Effects", "Canva", "Motion Graphics", "Photo Retouching"],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Marketing & Creative",
    description: `JOB TITLE: UI/UX Designer
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are looking for a user-focused UI/UX Designer to design intuitive user interfaces and delightful digital experiences. You will transform complex user workflows into clean wireframes, interactive prototypes, and polished design systems.

KEY RESPONSIBILITIES:
- Conduct user research, construct user personas, user journey maps, and information architecture diagrams.
- Create low-fidelity wireframes, interactive prototypes, and high-fidelity UI mockups in Figma.
- Establish and maintain comprehensive Design Systems, UI component libraries, and visual guidelines.
- Facilitate usability testing sessions and iterate designs based on feedback and analytical user heatmaps.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in UI/UX Design, Figma, Wireframing, Prototyping, User Research, Design Systems, Information Architecture, and Usability Testing.
- Portfolio demonstrating user-centered design processes, mobile & web layouts, and interactive prototypes.
- Bachelor's degree in Design, Human-Computer Interaction (HCI), Graphic Design, or related field.

PREFERRED SKILLS:
- Adobe XD, Design Systems, Micro-interactions, Basic HTML/CSS, and Maze usability testing.`,
    requiredSkills: ["UI/UX Design", "Figma", "Wireframing", "Prototyping", "User Research", "Design Systems", "Usability Testing", "Information Architecture"],
    preferredSkills: ["Adobe XD", "HCI", "Micro-interactions", "HTML/CSS"],
  },

  // 6. FINANCE
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    description: `JOB TITLE: Financial Analyst
LOCATION: Hybrid / On-Site
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a Financial Analyst to perform financial modeling, variance analysis, and corporate budgeting. You will evaluate business financial performance, build forecasting models, and prepare quantitative financial reports for executive leadership.

KEY RESPONSIBILITIES:
- Build dynamic financial models (DCF, 3-Statement Models) in Excel to evaluate business decisions and investments.
- Analyze monthly variance between actual financial results versus budgeted and forecasted targets.
- Prepare quarterly financial reporting packages, P&L analyses, and KPI dashboards for board management.
- Conduct industry benchmark studies, valuation models, and cost-benefit feasibility analyses.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Financial Analysis, Financial Modeling, Advanced Excel (VBA/Macros), Budgeting, Forecasting, P&L Analysis, and Valuation.
- Solid understanding of GAAP/IFRS accounting principles, Financial Statements, and Corporate Finance.
- Bachelor's degree in Finance, Accounting, Economics, or Commerce. CFA or Master's is a plus.

PREFERRED SKILLS:
- SAP, Power BI, Tableau, Bloomberg Terminal, and Financial Planning & Analysis (FP&A).`,
    requiredSkills: ["Financial Analysis", "Financial Modeling", "Excel", "Budgeting", "Forecasting", "P&L Analysis", "Valuation", "Accounting"],
    preferredSkills: ["CFA", "Power BI", "SAP", "FP&A"],
  },
  {
    id: "accountant",
    title: "Accountant",
    category: "Finance",
    description: `JOB TITLE: Staff Accountant
LOCATION: On-Site / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking an accurate Staff Accountant to manage general ledger accounting, financial reconciliations, and regulatory compliance. You will maintain daily accounting records, prepare journal entries, and support month-end closing processes.

KEY RESPONSIBILITIES:
- Prepare and record daily journal entries, general ledger accounts, and bank reconciliations.
- Manage Accounts Payable (AP) and Accounts Receivable (AR) processing and vendor payment schedules.
- Assist with month-end and year-end financial close, preparing trial balances and balance sheet reconciliations.
- Ensure compliance with local tax regulations, GST/VAT filings, and statutory audit requirements.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Accounting, General Ledger, Reconciliations, Accounts Payable (AP), Accounts Receivable (AR), Journal Entries, Excel, and Tax Compliance.
- Experience with accounting software such as QuickBooks, Tally, SAP, or NetSuite.
- Bachelor's degree in Accounting, Finance, or Commerce. CPA/ACCA qualification is a strong advantage.

PREFERRED SKILLS:
- QuickBooks, SAP, Tax Filing, Auditing, and Financial Reporting.`,
    requiredSkills: ["Accounting", "General Ledger", "Reconciliations", "Accounts Payable", "Accounts Receivable", "Journal Entries", "Excel", "Tax Compliance"],
    preferredSkills: ["QuickBooks", "SAP", "CPA", "Audit"],
  },
  {
    id: "investment-analyst",
    title: "Investment Analyst",
    category: "Finance",
    description: `JOB TITLE: Investment Analyst
LOCATION: On-Site / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are recruiting an Investment Analyst to evaluate investment opportunities, asset allocations, and portfolio performance. You will conduct equity research, financial due diligence, and present investment thesis recommendations.

KEY RESPONSIBILITIES:
- Perform qualitative and quantitative fundamental analysis on target companies and market sectors.
- Develop discounted cash flow (DCF) models, comparable company analyses (Comps), and LBO models.
- Prepare investment memos, pitch decks, and due diligence risk reports for investment committees.
- Track portfolio company performance, macroeconomic indicators, and market trends.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Investment Analysis, Financial Modeling, DCF Valuation, Equity Research, Due Diligence, Excel, and Market Research.
- Strong knowledge of Capital Markets, Corporate Finance, and Financial Statement Analysis.
- Degree in Finance, Economics, Statistics, or Business. Progress towards CFA designation highly desired.

PREFERRED SKILLS:
- Bloomberg, FactSet, Python for financial data, and Private Equity / Venture Capital experience.`,
    requiredSkills: ["Investment Analysis", "Financial Modeling", "Valuation", "Equity Research", "Due Diligence", "Excel", "Market Research"],
    preferredSkills: ["CFA", "Bloomberg", "DCF", "Private Equity"],
  },

  // 7. HR & RECRUITMENT
  {
    id: "hr-executive",
    title: "HR Executive",
    category: "HR & Recruitment",
    description: `JOB TITLE: HR Executive
LOCATION: On-Site / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking an HR Executive to support human resource operations, employee onboarding, performance management, and policy compliance. You will serve as a primary contact for employee queries and foster a positive workplace culture.

KEY RESPONSIBILITIES:
- Manage end-to-end employee onboarding, orientation sessions, and offboarding documentation.
- Maintain accurate HRIS employee records, attendance, leave tracking, and payroll processing inputs.
- Organize employee engagement initiatives, team-building events, and wellness programs.
- Assist in performance appraisal cycles, training coordination, and resolving workplace grievances.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in HR Operations, Employee Onboarding, HRIS, Employee Relations, Payroll Coordination, Performance Management, and Labor Laws.
- Excellent interpersonal, conflict resolution, verbal communication, and organizational skills.
- Bachelor's degree in Human Resource Management, Business Administration, or Psychology.

PREFERRED SKILLS:
- Workday, BambooHR, Payroll Software, and SHRM/PHR certification.`,
    requiredSkills: ["HR Operations", "Employee Onboarding", "HRIS", "Employee Relations", "Payroll Coordination", "Performance Management", "Communication"],
    preferredSkills: ["Workday", "BambooHR", "Labor Laws", "SHRM"],
  },
  {
    id: "recruiter",
    title: "Recruiter",
    category: "HR & Recruitment",
    description: `JOB TITLE: Corporate Recruiter
LOCATION: Remote / Hybrid
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a results-driven Recruiter to manage full-lifecycle talent acquisition across technical and business departments. You will source active and passive candidates, conduct screening interviews, and coordinate hiring manager interviews.

KEY RESPONSIBILITIES:
- Source qualified candidates using LinkedIn Recruiter, job boards (Indeed, Glassdoor), and talent databases.
- Screen candidate resumes, conduct behavioral phone screens, and assess role competency fit.
- Partner with hiring managers to define job specifications, interview rubrics, and hiring timelines.
- Manage applicant tracking systems (ATS), interview scheduling, salary offer negotiations, and candidate feedback.

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Full-Cycle Recruitment, Candidate Sourcing, LinkedIn Recruiter, Interviewing, ATS Management, Resume Screening, and Offer Negotiation.
- Strong relationship-building, communication, time management, and candidate experience focus.
- Bachelor's degree in Human Resources, Business, Communications, or related discipline.

PREFERRED SKILLS:
- Greenhouse, Lever, Technical Sourcing, Boolean Search strings, and Employer Branding.`,
    requiredSkills: ["Recruitment", "Candidate Sourcing", "LinkedIn Recruiter", "Interviewing", "ATS Management", "Resume Screening", "Offer Negotiation"],
    preferredSkills: ["Greenhouse", "Lever", "Boolean Search", "Technical Recruitment"],
  },
  {
    id: "talent-acquisition-specialist",
    title: "Talent Acquisition Specialist",
    category: "HR & Recruitment",
    description: `JOB TITLE: Talent Acquisition Specialist
LOCATION: Hybrid / Remote
EXPERIENCE: 3+ Years

ROLE OVERVIEW:
We are looking for a strategic Talent Acquisition Specialist to build talent pipelines and execute talent acquisition strategies. You will focus on attracting top-tier talent for specialized technical and leadership vacancies.

KEY RESPONSIBILITIES:
- Develop innovative candidate sourcing strategies for hard-to-fill technical and executive positions.
- Utilize advanced Boolean search queries, headhunting techniques, and professional networking groups.
- Maintain data accuracy in ATS systems (Greenhouse/Lever) and analyze recruitment funnel metrics (time-to-hire, cost-per-hire).
- Promote employer brand presence at career fairs, campus hiring drives, and industry networking events.

REQUIRED SKILLS & QUALIFICATIONS:
- Expert in Talent Acquisition, Headhunting, Advanced Sourcing, Boolean Search, ATS, Recruitment Analytics, and Stakeholder Management.
- Strong track record of hiring mid-to-senior talent in competitive job markets.
- Degree in Human Resources, Business, or Organizational Psychology.

PREFERRED SKILLS:
- Technical Talent Sourcing, Executive Search, Employer Branding, and Workday ATS.`,
    requiredSkills: ["Talent Acquisition", "Headhunting", "Sourcing", "Boolean Search", "ATS", "Recruitment Analytics", "Interviewing"],
    preferredSkills: ["Technical Sourcing", "Executive Search", "Employer Branding", "Workday"],
  },

  // 8. SALES & CUSTOMER SUCCESS
  {
    id: "sales-executive",
    title: "Sales Executive",
    category: "Sales & Customer Success",
    description: `JOB TITLE: Sales Executive
LOCATION: Hybrid / Field
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are seeking a high-energy Sales Executive to drive revenue growth through proactive outbound sales and relationship building. You will identify prospective business clients, deliver product presentations, and close commercial sales deals.

KEY RESPONSIBILITIES:
- Generate new sales leads through cold calling, email outreach, networking, and industry referrals.
- Conduct product discovery calls, present tailored sales demonstrations, and articulate value propositions.
- Manage sales pipelines and log daily deal activities in CRM software (Salesforce, HubSpot).
- Negotiate contract terms, handle objection handling, and consistently achieve monthly sales quotas.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in B2B Sales, Lead Generation, Pipeline Management, Salesforce, HubSpot CRM, Deal Closing, Negotiation, and Account Prospecting.
- Strong persuasive communication, resilience, and target-driven mindset.
- Bachelor's degree in Business, Marketing, Communications, or related discipline.

PREFERRED SKILLS:
- Solution Selling, Cold Outreach, Strategic Account Management, and Sales Presentations.`,
    requiredSkills: ["Sales", "Lead Generation", "Pipeline Management", "Salesforce", "HubSpot", "Deal Closing", "Negotiation", "Communication"],
    preferredSkills: ["B2B Sales", "Cold Outreach", "Account Management", "CRM"],
  },
  {
    id: "business-development-executive",
    title: "Business Development Executive",
    category: "Sales & Customer Success",
    description: `JOB TITLE: Business Development Executive (BDE)
LOCATION: Hybrid / Remote
EXPERIENCE: 2+ Years

ROLE OVERVIEW:
We are hiring a Business Development Executive to identify strategic growth opportunities, forge corporate partnerships, and expand our market presence. You will prospect enterprise accounts and convert outbound leads into active sales opportunities.

KEY RESPONSIBILITIES:
- Research target industry sectors to identify prospective corporate enterprise accounts and key decision makers.
- Conduct cold outreach via LinkedIn InMail, email, and phone to book qualified discovery meetings.
- Prepare market research proposals, pitch decks, and partnership business cases.
- Maintain accurate deal stages and activity metrics in CRM databases (Salesforce/HubSpot).

REQUIRED SKILLS & QUALIFICATIONS:
- Skilled in Business Development, Outbound Prospecting, Lead Qualification, CRM (Salesforce/HubSpot), Market Research, Pitching, and Relationship Building.
- Excellent verbal, written, presentation, and networking capabilities.
- Degree in Business Administration, Marketing, Economics, or International Business.

PREFERRED SKILLS:
- LinkedIn Sales Navigator, Enterprise B2B Sales, SaaS Selling, and Contract Negotiation.`,
    requiredSkills: ["Business Development", "Prospecting", "Lead Qualification", "CRM", "Salesforce", "Market Research", "Pitching", "Communication"],
    preferredSkills: ["Sales Navigator", "B2B Sales", "SaaS", "Partnerships"],
  },
  {
    id: "customer-success-associate",
    title: "Customer Success Associate",
    category: "Sales & Customer Success",
    description: `JOB TITLE: Customer Success Associate
LOCATION: Remote / Hybrid
EXPERIENCE: 1-2 Years

ROLE OVERVIEW:
We are looking for a customer-focused Customer Success Associate to ensure post-sale client onboarding, retention, and satisfaction. You will act as a trusted advisor to help clients achieve business value from our platform.

KEY RESPONSIBILITIES:
- Guide new clients through post-purchase software onboarding and technical setup training.
- Conduct periodic Executive Business Reviews (EBRs) and health score checks to drive product adoption.
- Identify proactive solution opportunities to increase customer retention and reduce client churn.
- Resolve client inquiries in coordination with technical support and product development teams.

REQUIRED SKILLS & QUALIFICATIONS:
- Proficient in Customer Success, Client Onboarding, Account Management, Customer Retention, Zendesk, Salesforce CRM, and Problem Solving.
- High empathy, excellent active listening, conflict resolution, and communication skills.
- Bachelor's degree in Communications, Business, Marketing, or related field.

PREFERRED SKILLS:
- Gainsight, SaaS Customer Success, Churn Prevention, and Product Training.`,
    requiredSkills: ["Customer Success", "Client Onboarding", "Account Management", "Customer Retention", "Salesforce", "Zendesk", "Problem Solving"],
    preferredSkills: ["Gainsight", "SaaS", "Churn Reduction", "Customer Support"],
  },
];
