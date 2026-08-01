"use client";

import React, { useState } from "react";
import { JobMatchResult } from "@/types";
import {
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  AlertTriangle,
  FileText,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { getScoreColorClass } from "@/lib/utils";

interface JobMatchTabProps {
  jobMatch: JobMatchResult;
}

export const JobMatchTab: React.FC<JobMatchTabProps> = ({ jobMatch }) => {
  const {
    hasJd,
    matchPercentage,
    similarityScore,
    skillsCoverage,
    keywordCoverage,
    matchingSkills,
    missingSkills,
    matchingKeywords,
    missingKeywords,
    relevanceSummary,
  } = jobMatch;

  const [showFullKeywords, setShowFullKeywords] = useState(false);

  const isCalculated = hasJd && matchPercentage !== null;
  const matchScore = matchPercentage ?? 0;
  const matchColors = getScoreColorClass(matchScore);

  // Match Level Badge and Explanation
  const getMatchBadge = (score: number) => {
    if (score >= 80) {
      return {
        label: "Excellent Match",
        summary: "Your resume demonstrates excellent alignment with the target role. Key skills and core industry terms are well represented.",
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/80",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        badgeBorder: "border-emerald-300 dark:border-emerald-800",
      };
    }
    if (score >= 65) {
      return {
        label: "Strong Match",
        summary: "Your resume demonstrates strong alignment with the target role. A few secondary skills could be highlighted further.",
        badgeBg: "bg-blue-100 dark:bg-blue-950/80",
        badgeText: "text-blue-700 dark:text-blue-300",
        badgeBorder: "border-blue-300 dark:border-blue-800",
      };
    }
    if (score >= 45) {
      return {
        label: "Moderate Match",
        summary: "This resume demonstrates moderate alignment with the selected role. Core skills are present, but several role-specific technologies are missing.",
        badgeBg: "bg-amber-100 dark:bg-amber-950/80",
        badgeText: "text-amber-700 dark:text-amber-300",
        badgeBorder: "border-amber-300 dark:border-amber-800",
      };
    }
    return {
      label: "Weak Match",
      summary: "Your resume has low keyword overlap with this job description. Consider tailoring your skills, keywords, and project descriptions.",
      badgeBg: "bg-rose-100 dark:bg-rose-950/80",
      badgeText: "text-rose-700 dark:text-rose-300",
      badgeBorder: "border-rose-300 dark:border-rose-800",
    };
  };

  const matchBadgeInfo = getMatchBadge(matchScore);

  if (!isCalculated) {
    return (
      <div className="space-y-6 min-w-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
            <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Job Match: Not Calculated
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              No Job Description Provided
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Add a target Job Description on the Home page to analyze keyword coverage, skill overlap, and role-specific alignment.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">How to unlock Job Match Analysis:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Navigate to the <strong>Upload Resume</strong> page.</li>
              <li>Paste the target Job Description into the right-hand panel.</li>
              <li>Click <strong>Analyze Resume</strong> to compute full match metrics.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // Limited Keyword List (Top 8 of each by default)
  const displayedMatchingKeywords = showFullKeywords ? matchingKeywords : matchingKeywords.slice(0, 8);
  const displayedMissingKeywords = showFullKeywords ? missingKeywords : missingKeywords.slice(0, 8);
  const totalKeywordsCount = matchingKeywords.length + missingKeywords.length;

  return (
    <div className="space-y-4 sm:space-y-5 min-w-0">
      {/* 1. Refined Job Match Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-3 text-center md:text-left min-w-0 w-full md:w-auto">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Match</span>
              <span className={`px-3 py-0.5 text-xs font-extrabold rounded-full border ${matchBadgeInfo.badgeBg} ${matchBadgeInfo.badgeText} ${matchBadgeInfo.badgeBorder}`}>
                {matchScore}% • {matchBadgeInfo.label}
              </span>
            </div>
            
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start space-x-2">
              <Target className="h-5 w-5 text-brand-600 shrink-0" />
              <span>Target Role Alignment</span>
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              {matchBadgeInfo.summary}
            </p>

            {/* Sub-metrics Signal Coverage Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 max-w-md">
              <div className="p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">Skills Coverage</span>
                <span className="text-sm sm:text-base font-black text-brand-600 dark:text-brand-400">{skillsCoverage}%</span>
              </div>
              <div className="p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">Keyword Coverage</span>
                <span className="text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400">{keywordCoverage}%</span>
              </div>
              <div className="p-2 sm:p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block truncate">Resume Alignment</span>
                <span className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400">{(similarityScore * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Progress Bars Stack */}
          <div className="w-full md:w-56 space-y-2.5 shrink-0 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Skills Coverage</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">{skillsCoverage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${skillsCoverage}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Keyword Coverage</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{keywordCoverage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${keywordCoverage}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Resume Alignment</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">{(similarityScore * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${similarityScore * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Match Summary & Key Gaps Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600 shrink-0" />
          <span>Role Match Executive Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Matched Skills */}
          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/50 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Matched Skills ({matchingSkills.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {matchingSkills.length > 0 ? (
                matchingSkills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-md text-[11px] font-semibold">
                    ✓ {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No matching skills detected.</p>
              )}
            </div>
          </div>

          {/* Skills to Consider */}
          <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/50 rounded-xl space-y-2">
            <h4 className="font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center space-x-1.5">
              <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              <span>Skills to Consider ({missingSkills.length})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-md text-[11px] font-semibold">
                    ✗ {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-emerald-600 font-semibold">No missing core skills detected!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Keyword Coverage & Density Table (Top Items + Collapse) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 shrink-0" />
              <span>Keyword Coverage & Density</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Frequency of key terms found in your resume versus the target job description.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowFullKeywords(!showFullKeywords)}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            <span>{showFullKeywords ? "− Show Top Keywords" : `+ View Full Keyword Analysis (${totalKeywordsCount})`}</span>
            {showFullKeywords ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        <div className="overflow-x-auto min-w-0 max-w-full">
          <table className="w-full text-left text-xs min-w-[340px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-2.5">Keyword / Technology</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5 text-center">In Resume</th>
                <th className="pb-2.5 text-center">In Job Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedMatchingKeywords.map((kw, i) => (
                <tr key={`m_${i}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 font-semibold text-slate-900 dark:text-white">{kw.keyword}</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                      Matched
                    </span>
                  </td>
                  <td className="py-2 text-center font-bold text-emerald-600">{kw.countInResume}x</td>
                  <td className="py-2 text-center font-medium text-slate-500">{kw.countInJd}x</td>
                </tr>
              ))}
              {displayedMissingKeywords.map((kw, i) => (
                <tr key={`ms_${i}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 font-semibold text-slate-900 dark:text-white">{kw.keyword}</td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-full">
                      Missing
                    </span>
                  </td>
                  <td className="py-2 text-center font-bold text-rose-500">0x</td>
                  <td className="py-2 text-center font-medium text-slate-500">{kw.countInJd}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. TF-IDF & Alignment Explanation (Plain English) */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-300 space-y-1">
        <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
          <Info className="h-4 w-4 text-purple-500 shrink-0" />
          <span>How Resume Alignment Is Calculated</span>
        </div>
        <p className="leading-relaxed text-[11px] text-slate-500 dark:text-slate-400">
          Textual alignment is calculated using TF-IDF and cosine similarity to estimate how closely your resume language aligns with the selected job description.
        </p>
      </div>

      {/* 5. Priority Action Plan & Ethical Guidance */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
          <span>Recommended Next Steps</span>
        </h3>

        <ol className="space-y-2 text-xs">
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">1</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Strengthen core missing skills if relevant to your target role.</span>
          </li>
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">2</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Tailor your project descriptions using role-specific terminology.</span>
          </li>
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">3</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Highlight measurable project outcomes (%, $, time saved) to prove impact.</span>
          </li>
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">4</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Re-run analysis after updating your resume to track your match progress.</span>
          </li>
        </ol>

        {/* Ethical Reminder */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center space-x-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
          <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
          <span>Only include skills and technologies that you can confidently discuss in an interview.</span>
        </div>
      </div>
    </div>
  );
};
