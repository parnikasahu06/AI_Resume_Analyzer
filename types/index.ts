export interface ParsedResume {
  contact: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
  summary: string;
  isSummaryInferred?: boolean;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    all: string[];
  };
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    location?: string;
    description: string[];
  }>;
  isExperienceInferred?: boolean;
  internships: Array<{
    company: string;
    role: string;
    duration: string;
    location?: string;
    description: string[];
  }>;
  leadership: Array<{
    role: string;
    organization: string;
    duration?: string;
    description: string[];
  }>;
  extracurricular: Array<{
    title: string;
    organization?: string;
    description: string[];
  }>;
  neutralItems: string[];
  education: Array<{
    degree: string;
    institution: string;
    year?: string;
    gpa?: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies?: string[];
    link?: string;
  }>;
  certifications: string[];
  achievements: string[];
  rawText: string;
  wordCount: number;
}

export interface JobDescription {
  title?: string;
  company?: string;
  rawText: string;
  keywords: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel?: string;
}

export interface PillarCheck {
  name: string;
  status: 'Passed' | 'Missing' | 'Needs improvement' | 'Low' | 'Medium' | 'High' | 'None detected' | 'Detected';
  pts: number;
  maxPts: number;
  detail?: string;
}

export interface AtsRecommendation {
  text: string;
  priority: 'Critical' | 'Important' | 'Optional';
  pillar?: string;
}

export interface AtsScoreResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  hasJd: boolean;
  breakdown: {
    sections: {
      score: number;
      maxScore: number;
      itemsPresent: string[];
      itemsMissing: string[];
      checks: PillarCheck[];
    };
    formatting: {
      score: number;
      maxScore: number;
      passCount: number;
      issues: string[];
      checks: PillarCheck[];
    };
    readability: {
      score: number;
      maxScore: number;
      gradeLevel: string;
      avgSentenceLength: number;
      wordCount: number;
      checks: PillarCheck[];
    };
    contact: {
      score: number;
      maxScore: number;
      checks: PillarCheck[];
    };
    contentQuality: {
      score: number;
      maxScore: number;
      checks: PillarCheck[];
    };
    keywords: {
      score: number | null;
      maxScore: number;
      density: number;
      frequencyMap: Record<string, number>;
      checks?: PillarCheck[];
    };
    skills: {
      score: number | null;
      maxScore: number;
      matchedCount: number;
      totalRequired: number;
      checks?: PillarCheck[];
    };
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: AtsRecommendation[];
  criticalFixes: string[];
}

export interface KeywordMatchItem {
  keyword: string;
  countInResume: number;
  countInJd: number;
}

export interface JobMatchResult {
  hasJd: boolean;
  matchPercentage: number | null;
  similarityScore: number;
  skillsCoverage: number;
  keywordCoverage: number;
  matchingSkills: string[];
  missingSkills: string[];
  matchingKeywords: KeywordMatchItem[];
  missingKeywords: KeywordMatchItem[];
  relevanceSummary: string;
}

export interface RecommendedSkill {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  reason: string;
  resources: string[];
}

export interface SkillsGapResult {
  hasJd: boolean;
  currentSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  recommendedSkills: RecommendedSkill[];
}

export interface BulletRewrite {
  original: string;
  assessment: 'strong' | 'needs_improvement' | 'weak';
  improved: string | null;
  rationale: string;
  metricAdded?: boolean;
  metricOpportunity?: string | null;
}

export interface WordingEnhancement {
  weakWord: string;
  suggestion: string;
  example: string;
}

export interface AiSuggestionsResult {
  bulletRewrites: BulletRewrite[];
  missingTechToHighlight: string[];
  wordingEnhancements: WordingEnhancement[];
  achievementIdeas: string[];
  enhancedSummary: string;
  actionVerbsRecommended: string[];
  source: 'gemini' | 'heuristic_engine';
}

export interface GrammarSuggestion {
  type: 'passive' | 'weak_word' | 'sentence_length' | 'formatting';
  message: string;
  line?: string;
  recommendation: string;
}

export interface GrammarAnalysisResult {
  readabilityScore: number;
  readabilityGrade: string;
  passiveVoiceCount: number;
  passiveSentences: string[];
  weakWordsCount: number;
  weakWordsFound: string[];
  longSentences: string[];
  suggestions: GrammarSuggestion[];
}

export interface PdfQualityReport {
  fileType: string;
  fileSize: string;
  pageCount: string;
  textExtractionSuccess: boolean;
  extractedWordCount: number;
  hasHyperlinks: string;
  unusualFormatting: string;
  tablesOrComplexLayout: string;
  multiColumnParsingRisk: 'Low' | 'Medium' | 'High' | 'Not evaluated';
  scannedPdfRisk: 'Low' | 'High' | 'Not evaluated';
  atsTextExtractionQuality: 'High Quality' | 'Moderate' | 'Poor';
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  detectedIssues: Array<{
    property: string;
    status: string;
    explanation: string;
  }>;
}

export interface CompleteAnalysisReport {
  id: string;
  createdAt: string;
  fileName?: string;
  parsedResume: ParsedResume;
  jobDescription: JobDescription;
  atsScore: AtsScoreResult;
  jobMatch: JobMatchResult;
  skillsGap: SkillsGapResult;
  aiSuggestions: AiSuggestionsResult;
  grammar: GrammarAnalysisResult;
  pdfQuality?: PdfQualityReport;
}
