import { GrammarAnalysisResult, GrammarSuggestion } from "@/types";

const WEAK_WORDS = [
  "worked on", "handled", "assisted", "responsible for", "helped", "tried to", "participated in",
  "duties included", "familiar with", "various", "stuff", "etc", "things", "some"
];

const PASSIVE_PATTERNS = [
  /\b(was|were|is|are|been|being)\s+([a-z]+ed)\b/gi
];

export function analyzeGrammarAndReadability(rawText: string): GrammarAnalysisResult {
  const sentences = rawText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  const totalWords = rawText.split(/\s+/).filter(Boolean).length;
  const avgSentenceLength = Math.round(totalWords / Math.max(1, sentences.length));

  // 1. Passive Voice Detection
  const passiveSentences: string[] = [];
  sentences.forEach(s => {
    PASSIVE_PATTERNS.forEach(pattern => {
      if (pattern.test(s) && !passiveSentences.includes(s)) {
        passiveSentences.push(s);
      }
    });
  });

  // 2. Weak Words Detection
  const weakWordsFound: string[] = [];
  WEAK_WORDS.forEach(word => {
    const reg = new RegExp(`\\b${word}\\b`, "gi");
    if (reg.test(rawText) && !weakWordsFound.includes(word)) {
      weakWordsFound.push(word);
    }
  });

  // 3. Long Sentences
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 25);

  // 4. Suggestions
  const suggestions: GrammarSuggestion[] = [];

  passiveSentences.slice(0, 3).forEach(s => {
    suggestions.push({
      type: "passive",
      message: `Passive voice detected in sentence: "${s.slice(0, 60)}..."`,
      recommendation: "Rewrite in active voice using strong action verbs (e.g., 'Architected', 'Spearheaded', 'Engineered').",
    });
  });

  weakWordsFound.forEach(w => {
    suggestions.push({
      type: "weak_word",
      message: `Weak phrase '${w}' reduces achievement impact.`,
      recommendation: `Replace '${w}' with impactful action verbs like 'Engineered', 'Optimized', or 'Directed'.`,
    });
  });

  if (longSentences.length > 0) {
    suggestions.push({
      type: "sentence_length",
      message: `Found ${longSentences.length} sentences over 25 words long.`,
      recommendation: "Break long bullet points into concise, punchy lines for easier recruiter scanning.",
    });
  }

  // Calculate Readability Score (0-100)
  let readabilityScore = 85;
  readabilityScore -= (passiveSentences.length * 3);
  readabilityScore -= (weakWordsFound.length * 4);
  if (avgSentenceLength > 20) readabilityScore -= 10;
  readabilityScore = Math.max(40, Math.min(98, readabilityScore));

  let readabilityGrade = "Professional & Clear";
  if (readabilityScore < 60) readabilityGrade = "Needs Simplification & Action Verbs";
  else if (readabilityScore < 75) readabilityGrade = "Good, Moderate Passive Voice";

  return {
    readabilityScore,
    readabilityGrade,
    passiveVoiceCount: passiveSentences.length,
    passiveSentences,
    weakWordsCount: weakWordsFound.length,
    weakWordsFound,
    longSentences,
    suggestions,
  };
}
