"use client";

import React from "react";
import { SkillsGapResult } from "@/types";
import { Award, BookOpen, ExternalLink, Sparkles, FileText } from "lucide-react";

interface SkillsGapTabProps {
  skillsGap: SkillsGapResult;
}

export const SkillsGapTab: React.FC<SkillsGapTabProps> = ({ skillsGap }) => {
  const { hasJd, currentSkills, missingSkills, recommendedSkills } = skillsGap;

  if (!hasJd) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
            <FileText className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              Skills Gap: Not Calculated
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              No Job Description Provided
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Add a Job Description to compare your resume skills against required qualifications and build an upskilling roadmap.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">
      {/* Top Banner Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start space-x-2">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600 shrink-0" />
              <span>Skills Gap & Upskilling Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Identify missing technical competencies and targeted learning resources to increase qualification for this job.
            </p>
          </div>
          <div className="flex space-x-3 sm:space-x-4 text-center shrink-0">
            <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[80px] sm:min-w-[90px]">
              <span className="text-[11px] sm:text-xs text-slate-400 font-semibold block">Present</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600">{currentSkills.length}</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[80px] sm:min-w-[90px]">
              <span className="text-[11px] sm:text-xs text-slate-400 font-semibold block">Missing</span>
              <span className="text-lg sm:text-xl font-bold text-rose-600">{missingSkills.length}</span>
            </div>
          </div>
        </div>

        {/* Ethical Notice Banner */}
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2">
          <span className="font-bold shrink-0">💡 Note:</span>
          <span>
            Only add skills to your resume if you genuinely possess them. Avoid keyword stuffing or false skill claims to pass automated screeners.
          </span>
        </div>
      </div>

      {/* Recommended Learning Cards */}
      {recommendedSkills.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-500 shrink-0" />
            <span>Recommended Skills to Learn</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
            {recommendedSkills.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 min-w-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {rec.skill}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full shrink-0 ${
                      rec.priority === "High"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300"
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rec.reason}
                </p>

                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Suggested Learning Resources
                  </span>
                  <ul className="space-y-1 min-w-0">
                    {rec.resources.map((res, rIdx) => (
                      <li key={rIdx} className="text-xs text-brand-600 dark:text-brand-400 flex items-center space-x-1 hover:underline cursor-pointer min-w-0">
                        <BookOpen className="h-3 w-3 shrink-0" />
                        <span className="truncate">{res}</span>
                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
