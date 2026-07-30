"use client";

import React from "react";
import { JobMatchResult } from "@/types";
import { CheckCircle2, XCircle, FileSpreadsheet, AlertTriangle, FileText, Info } from "lucide-react";
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

  const isCalculated = hasJd && matchPercentage !== null;
  const matchColors = getScoreColorClass(isCalculated ? matchPercentage : 0);

  if (!isCalculated) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
            <FileText className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              Job Match: Not Calculated
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              No Job Description Provided
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Add a Job Description to calculate keyword relevance, skills match, matched keywords, and missing keywords.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-left text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">How to get your Job Match Score:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Return to the <strong>Upload Resume</strong> tab.</li>
              <li>Paste the target Job Description into the input box.</li>
              <li>Click <strong>Run AI ATS Resume Analysis</strong> again.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Match Percentage Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className={`px-3.5 py-1 text-xs font-extrabold rounded-full ${matchColors.badgeBg} ${matchColors.badgeText}`}>
                Job Match Score: {matchPercentage}%
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Explainable Multi-Signal Match
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Resume vs Job Description Match Analysis
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              {relevanceSummary}
            </p>

            {/* Sub-metrics Signal Coverage Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Skills Coverage</span>
                <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">{skillsCoverage}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Keyword Coverage</span>
                <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{keywordCoverage}%</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Text Similarity</span>
                <span className="text-base font-extrabold text-purple-600 dark:text-purple-400">{(similarityScore * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Skills Coverage</span>
                <span className="text-brand-600">{skillsCoverage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all duration-500" style={{ width: `${skillsCoverage}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Keyword Coverage</span>
                <span className="text-indigo-600">{keywordCoverage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${keywordCoverage}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Textual Similarity</span>
                <span className="text-purple-600">{(similarityScore * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${similarityScore * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical Skill Addition Warning Note */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center space-x-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium shadow-sm">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
        <div>
          <p className="font-bold">Ethical Guidance Note:</p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
            Only add missing skills to your resume if you genuinely possess them.
          </p>
        </div>
      </div>

      {/* Skills Overlap Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Matched Skills ({matchingSkills.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchingSkills.length > 0 ? (
              matchingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold"
                >
                  ✓ {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No matching skills detected.</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-rose-600">
            <XCircle className="h-4 w-4" />
            <span>Missing Skills ({missingSkills.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold"
                >
                  ✗ {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-emerald-600 font-medium">No missing core skills detected!</p>
            )}
          </div>
        </div>
      </div>

      {/* Keyword Frequency Analysis Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5 text-indigo-500" />
          <span>Keyword Frequency Analysis</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Keyword / Technology</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-center">In Resume</th>
                <th className="pb-3 text-center">In Job Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {matchingKeywords.map((kw, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{kw.keyword}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded">
                      Matched
                    </span>
                  </td>
                  <td className="py-2.5 text-center font-bold text-emerald-600">{kw.countInResume}x</td>
                  <td className="py-2.5 text-center font-medium text-slate-500">{kw.countInJd}x</td>
                </tr>
              ))}
              {missingKeywords.map((kw, i) => (
                <tr key={`m_${i}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 font-semibold text-slate-900 dark:text-white">{kw.keyword}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded">
                      Missing
                    </span>
                  </td>
                  <td className="py-2.5 text-center font-bold text-rose-500">0x</td>
                  <td className="py-2.5 text-center font-medium text-slate-500">{kw.countInJd}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
