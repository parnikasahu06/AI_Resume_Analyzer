"use client";

import React, { useState } from "react";
import { UserCheck, ChevronDown, ChevronUp } from "lucide-react";
import { CandidateProfileType } from "@/types";

interface CandidateProfileCardProps {
  candidateProfile: CandidateProfileType;
  setCandidateProfile: (profile: CandidateProfileType) => void;
  additionalContext: string;
  setAdditionalContext: (text: string) => void;
}

export const PROFILE_OPTIONS: Array<{ id: CandidateProfileType; label: string }> = [
  { id: "not_specified", label: "Not Specified" },
  { id: "student", label: "Student / Fresher" },
  { id: "internship", label: "Internship Applicant" },
  { id: "experienced", label: "Experienced Professional" },
  { id: "career_switcher", label: "Career Switcher" },
  { id: "other", label: "Other" },
];

export function getProfileHelperText(profile: CandidateProfileType): string {
  switch (profile) {
    case "student":
      return "✓ Formal work experience is optional for this profile.";
    case "internship":
      return "✓ Prior professional experience is not required.";
    case "experienced":
      return "Work experience is considered important for this profile.";
    case "career_switcher":
      return "Transferable experience and relevant projects will be considered.";
    case "other":
    case "not_specified":
    default:
      return "General resume evaluation will be used.";
  }
}

export const CandidateProfileCard: React.FC<CandidateProfileCardProps> = ({
  candidateProfile,
  setCandidateProfile,
  additionalContext,
  setAdditionalContext,
}) => {
  const [isContextExpanded, setIsContextExpanded] = useState(additionalContext.trim().length > 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Candidate Profile</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Need us to evaluate your resume more fairly?
        </p>
      </div>

      {/* Career Stage Dropdown & Helper Text */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
          Career Stage
        </label>
        <select
          value={candidateProfile}
          onChange={(e) => setCandidateProfile(e.target.value as CandidateProfileType)}
          className="w-full p-2.5 text-xs font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all cursor-pointer min-h-[40px]"
        >
          {PROFILE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
          {getProfileHelperText(candidateProfile)}
        </p>
      </div>

      {/* Collapsible Additional Context Accordion */}
      <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => setIsContextExpanded(!isContextExpanded)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1 transition-colors min-h-[30px]"
        >
          <span>{isContextExpanded ? "− Hide context" : "+ Add Career Context (Optional)"}</span>
          {isContextExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {isContextExpanded && (
          <div className="space-y-1.5 pt-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Additional Context (Optional)</span>
              <span className={additionalContext.length >= 480 ? "text-rose-500 font-bold" : "text-slate-400"}>
                {additionalContext.length} / 500
              </span>
            </div>

            <textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value.slice(0, 500))}
              placeholder="I am a second-year Data Science student applying for internships. My resume focuses on projects, hackathons and technical coursework."
              rows={3}
              className="w-full p-3 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-y leading-relaxed font-sans"
            />

            <p className="text-[11px] text-slate-400 leading-normal">
              Provides background for AI interpretation. This cannot directly change your ATS score.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
