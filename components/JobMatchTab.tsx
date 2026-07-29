"use client";

import React from "react";
import { JobMatchResult } from "@/types";
import { CheckCircle2, XCircle, Search, Layers, FileSpreadsheet } from "lucide-react";
import { getScoreColorClass } from "@/lib/utils";

interface JobMatchTabProps {
  jobMatch: JobMatchResult;
}

export const JobMatchTab: React.FC<JobMatchTabProps> = ({ jobMatch }) => {
  const {
    matchPercentage,
    similarityScore,
    matchingSkills,
    missingSkills,
    matchingKeywords,
    missingKeywords,
    relevanceSummary,
  } = jobMatch;

  const matchColors = getScoreColorClass(matchPercentage);

  return (
    <div className="space-y-6">
      {/* Header Match Percentage Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${matchColors.badgeBg} ${matchColors.badgeText}`}>
                {matchPercentage}% Match
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Cosine Vector Score: {(similarityScore * 100).toFixed(0)}%
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Resume vs Job Description Match
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              {relevanceSummary}
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-500">Alignment Score</span>
              <span className={matchColors.text}>{matchPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 rounded-full ${
                  matchPercentage >= 80 ? "bg-emerald-500" : matchPercentage >= 65 ? "bg-indigo-500" : "bg-amber-500"
                }`}
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Overlap Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Matching Skills ({matchingSkills.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchingSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold"
              >
                ✓ {skill}
              </span>
            ))}
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

      {/* Keyword Frequency & Density Table */}
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
