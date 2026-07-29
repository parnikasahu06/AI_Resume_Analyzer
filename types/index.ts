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

export interface AtsScoreResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  breakdown: {
    sections: {
      score: number;
      maxScore: number;
      itemsPresent: string[];
      itemsMissing: string[];
    };
    keywords: {
      score: number;
      maxScore: number;
      density: number;
      frequencyMap: Record<string, number>;
    };
    skills: {
      score: number;
      maxScore: number;
      matchedCount: number;
      totalRequired: number;
    };
    formatting: {
      score: number;
      maxScore: number;
      passCount: number;
      issues: string[];
    };
    readability: {
      score: number;
      maxScore: number;
      gradeLevel: string;
      avgSentenceLength: number;
      wordCount: number;
    };
  };
  strengths: string[];
  weaknesses: string[];
  criticalFixes: string[];
}

export interface KeywordMatchItem {
  keyword: string;
  countInResume: number;
  countInJd: number;
}

export interface JobMatchResult {
  matchPercentage: number;
  similarityScore: number;
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
  currentSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  recommendedSkills: RecommendedSkill[];
}

export interface BulletRewrite {
  original: string;
  improved: string;
  rationale: string;
  metricAdded: boolean;
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
}
