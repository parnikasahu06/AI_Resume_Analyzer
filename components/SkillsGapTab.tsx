"use client";

import React from "react";
import { SkillsGapResult } from "@/types";
import { Award, BookOpen, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";

interface SkillsGapTabProps {
  skillsGap: SkillsGapResult;
}

export const SkillsGapTab: React.FC<SkillsGapTabProps> = ({ skillsGap }) => {
  const { currentSkills, requiredSkills, missingSkills, recommendedSkills } = skillsGap;

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="h-6 w-6 text-brand-600" />
              <span>Skills Gap & Upskilling Roadmap</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Identify missing technical competencies and targeted learning resources to increase qualification for this job.
            </p>
          </div>
          <div className="flex space-x-4 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[90px]">
              <span className="text-xs text-slate-400 font-semibold block">Present</span>
              <span className="text-xl font-bold text-emerald-600">{currentSkills.length}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[90px]">
              <span className="text-xs text-slate-400 font-semibold block">Missing</span>
              <span className="text-xl font-bold text-rose-600">{missingSkills.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Learning Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <span>Recommended Skills to Learn</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedSkills.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {rec.skill}
                </span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                    rec.priority === "High"
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300"
                  }`}
                >
                  {rec.priority} Priority
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                {rec.reason}
              </p>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Suggested Learning Resources
                </span>
                <ul className="space-y-1">
                  {rec.resources.map((res, rIdx) => (
                    <li key={rIdx} className="text-xs text-brand-600 dark:text-brand-400 flex items-center space-x-1 hover:underline cursor-pointer">
                      <BookOpen className="h-3 w-3 shrink-0" />
                      <span>{res}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
