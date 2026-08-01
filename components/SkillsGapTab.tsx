"use client";

import React from "react";
import { SkillsGapResult } from "@/types";
import { Award, BookOpen, ExternalLink, Sparkles, FileText, ArrowRight, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

interface SkillsGapTabProps {
  skillsGap: SkillsGapResult;
}

export const SkillsGapTab: React.FC<SkillsGapTabProps> = ({ skillsGap }) => {
  const { hasJd, currentSkills, missingSkills, recommendedSkills } = skillsGap;

  if (!hasJd) {
    return (
      <div className="space-y-6 min-w-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500">
            <FileText className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              Skills Gap: Not Calculated
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              No Job Description Provided
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Add a target Job Description on the Home page to compare your resume skills against required qualifications and build an upskilling roadmap.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 min-w-0">
      {/* 1. Header Overview Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start space-x-2">
              <Award className="h-5 w-5 text-brand-600 shrink-0" />
              <span>Skills Gap & Upskilling Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Identify missing technical competencies and targeted learning resources to increase qualification for this job.
            </p>
          </div>
          <div className="flex space-x-3 text-center shrink-0">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[80px]">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Present</span>
              <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">{currentSkills.length}</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[80px]">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Missing</span>
              <span className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">{missingSkills.length}</span>
            </div>
          </div>
        </div>

        {/* Ethical Reminder Banner */}
        <div className="mt-3.5 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center space-x-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
          <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
          <span>Only include skills and technologies that you can confidently discuss in an interview.</span>
        </div>
      </div>

      {/* 2. Prioritized Recommended Skills to Learn */}
      {recommendedSkills.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 shrink-0" />
              <span>Prioritized Skills to Consider ({recommendedSkills.length})</span>
            </h3>
            <span className="text-xs font-semibold text-slate-400">Targeted Upskilling</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 min-w-0">
            {recommendedSkills.map((rec, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-2.5 min-w-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {rec.skill}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full shrink-0 border ${
                      rec.priority === "High"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rec.reason}
                </p>

                <div className="min-w-0 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Suggested Learning Resources
                  </span>
                  <ul className="space-y-1 min-w-0">
                    {rec.resources.map((res, rIdx) => (
                      <li key={rIdx} className="text-xs text-brand-600 dark:text-brand-400 flex items-center space-x-1.5 hover:underline cursor-pointer min-w-0">
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="truncate flex-1">{res}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <span>No skill gaps identified. Your resume covers all core requirements for this position!</span>
        </div>
      )}

      {/* 3. Action Plan for Upskilling */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
          <span>Recommended Next Steps for Upskilling</span>
        </h3>

        <ol className="space-y-2 text-xs">
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">1</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Prioritize learning high-demand skills that match your target job profile.</span>
          </li>
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">2</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Build a hands-on portfolio project applying the newly acquired skill.</span>
          </li>
          <li className="flex items-start space-x-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[11px] shrink-0 mt-0.5">3</span>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">Once proficient, add the skill and project details to your updated resume.</span>
          </li>
        </ol>
      </div>
    </div>
  );
};
