# 🚀 AI Resume Analyzer (ATS & Job Matcher)

> A production-ready, SaaS-grade **AI-Powered Resume Analyzer** designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). Built with Next.js (App Router), TypeScript, Tailwind CSS, Google Gemini API, and TF-IDF Cosine Similarity algorithms.

![AI Resume Analyzer Banner](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini API](https://img.shields.io/badge/Google_Gemini_API-1.5_Flash-8E75FF?style=for-the-badge&logo=google)

---

## 🌟 Key Features

1. **📄 Multi-Format Resume Parsing (.PDF & .DOCX)**
   - Extracts structured contact details (Name, Email, Phone, LinkedIn, GitHub).
   - Identifies Technical Skills, Soft Skills, Work Experience timelines, Education, Projects, and Certifications.

2. **🎯 Weighted 5-Pillar ATS Scoring Engine (0-100 Score)**
   - Calculates a mathematically grounded ATS score across 5 key categories:
     - **Sections Completeness (20%)**
     - **Keyword Relevance & Density (20%)**
     - **Skills Match Ratio (20%)**
     - **Formatting & Length Checks (20%)**
     - **Readability & Quantifiable Impact Metrics (20%)**
   - Displays circular progress gauges, grade letter ratings (A+ to F), strengths, weaknesses, and critical fixes.

3. **🔍 TF-IDF & Cosine Similarity Job Description Matcher**
   - Computes term vector representations for the resume and job description.
   - Calculates exact cosine similarity percentages.
   - Displays matching skills, missing skills, and a keyword frequency table.

4. **💡 Skills Gap Analysis & Upskilling Roadmap**
   - Identifies current skills vs required skills.
   - Generates a prioritized learning list (High/Medium/Low priority) complete with direct learning links (FreeCodeCamp, Official Docs).

5. **🤖 AI-Powered Suggestion Layer (Gemini 1.5 Flash + Fallback Engine)**
   - Generates high-impact bullet point rewrites adding action verbs and quantifiable metrics.
   - Proposes tailored executive summaries.
   - Highlights missing technologies and offers wording replacements for weak phrases.
   - Seamlessly falls back to a rule-based AI engine when no API key is provided!

6. **✍️ Grammar, Passive Voice & Readability Check**
   - Evaluates sentence length, passive voice constructions, and weak verbs.
   - Calculates a Flesch-Kincaid style Readability Index.

7. **📊 Downloadable PDF Quality Audit Report**
   - Formats candidate analysis into a clean, printable PDF report using browser print capabilities.

8. **⚡ Instant One-Click Demo Mode**
   - Built-in "Load Demo Resume & JD" button so users, hackathon judges, or recruiters can test the full functionality immediately.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Parsers**: `pdf-parse`, `mammoth` (DOCX parser)
- **AI Integration**: `@google/generative-ai` (Gemini API) + Heuristic Fallback Engine
- **Algorithms**: Custom TF-IDF Vectorizer & Cosine Similarity Math
- **Deployment**: Vercel Ready

---

## 📂 Folder Structure

```
AI-Resume-Analyzer/
├── app/
│   ├── layout.tsx                # Root Layout with Theme & Global Metadata
│   ├── page.tsx                  # Dashboard Page with Tabbed Navigation
│   ├── globals.css               # Tailwind & Custom CSS Variables
│   └── api/
│       └── analyze/route.ts      # Main Analysis Server Endpoint
├── components/
│   ├── Navbar.tsx                # Header with Dark Mode & Demo Loader
│   ├── Sidebar.tsx               # Dashboard Navigation Drawer
│   ├── ResumeUploader.tsx        # Drag-and-Drop PDF/DOCX Uploader
│   ├── JobDescriptionInput.tsx   # Job Description Input Component
│   ├── SummaryTab.tsx            # Parsed Resume Breakdown
│   ├── AtsScoreTab.tsx           # Circular Progress & 5-Pillar Score
│   ├── JobMatchTab.tsx           # Cosine Similarity & Keyword Table
│   ├── SkillsGapTab.tsx          # Upskilling Roadmap & Resources
│   ├── AiSuggestionsTab.tsx      # Bullet Rewrites & Executive Summary
│   ├── GrammarTab.tsx            # Readability & Passive Voice Check
│   └── ReportTab.tsx             # Downloadable PDF Audit Report
├── lib/
│   ├── parser/
│   │   ├── pdf-parser.ts         # PDF text extractor
│   │   ├── docx-parser.ts        # DOCX text extractor
│   │   └── resume-extractor.ts   # Regex & NLP candidate info extractor
│   ├── ats/
│   │   └── ats-scorer.ts         # 5-Pillar ATS scoring algorithm
│   ├── matcher/
│   │   ├── tf-idf.ts             # Tokenizer & TF-IDF vectorizer
│   │   ├── cosine.ts             # Cosine similarity vector math
│   │   └── jd-matcher.ts         # Job description matcher
│   ├── skills/
│   │   └── skills-analyzer.ts    # Skills gap & resource recommendations
│   ├── grammar/
│   │   └── grammar-analyzer.ts   # Readability index & passive voice checker
│   ├── ai/
│   │   └── ai-engine.ts          # Gemini API wrapper with Heuristic Fallback
│   ├── report/
│   │   └── pdf-generator.ts      # HTML to PDF audit report generator
│   ├── sample-data.ts            # Pre-populated demo dataset
│   └── utils.ts                  # Helper utilities & class mergers
├── types/
│   └── index.ts                  # Core TypeScript interface definitions
├── .env.example                  # Environment variable reference
├── README.md                     # Documentation
├── package.json
└── tailwind.config.ts
```

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/your-username/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: If no API key is set, the application automatically uses the built-in Heuristic AI Engine, so all features remain functional out-of-the-box!)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📐 Suggested Algorithms & Logic

1. **Weighted ATS Score**:
   $$\text{ATS Score} = \text{Sections}(20) + \text{Keywords}(20) + \text{Skills}(20) + \text{Formatting}(20) + \text{Impact}(20)$$
2. **Cosine Similarity**:
   $$\text{Similarity}(\mathbf{A}, \mathbf{B}) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}$$

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository.
2. Import project into Vercel Dashboard.
3. Add Environment Variable `GEMINI_API_KEY`.
4. Click **Deploy**.

---

## 🔮 Future Scope

- 🔑 **User Authentication & History**: Save previous analyses & track score improvements over time.
- 📝 **Cover Letter Generator**: AI-generated cover letters tailored to target job descriptions.
- 🔗 **LinkedIn & GitHub Profiler**: Automatically pull profile data for cross-verification.
- 📑 **Multiple Resume Comparison**: Compare 3 candidate resumes against a single job description for recruiters.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
