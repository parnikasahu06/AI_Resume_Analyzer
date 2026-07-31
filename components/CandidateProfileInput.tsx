"use client";

import React, { useState } from "react";
import { UserCheck, HelpCircle, ChevronDown, ChevronUp, ShieldAlert, Sparkles } from "lucide-react";
import { CandidateProfileType } from "@/types";

interface CandidateProfileInputProps {
  candidateProfile: CandidateProfileType;
  setCandidateProfile: (profile: CandidateProfileType) => void;
  additionalContext: string;
  setAdditionalContext: (text: string) => void;
}

export const PROFILE_OPTIONS: Array<{ id: CandidateProfileType; label: string; description: string }> = [
  { id: "not_specified", label: "Not Specified", description: "General-purpose evaluation without strong career stage assumptions." },
  { id: "student", label: "Student / Fresher", description: "Evaluates practical projects, research, & academics. Formal employment not required." },
  { id: "internship", label: "Internship Applicant", description: "Prioritizes coursework, projects, & activities for first-time applicants." },
  { id: "experienced", label: "Experienced Professional", description: "Expects clear work history, leadership, & quantifiable business impact." },
  { id: "career_switcher", label: "Career Switcher", description: "Evaluates transferable experience, new tech skills, & relevant projects." },
  { id: "other", label: "Other", description: "Standard evaluation with custom candidate notes." },
];

export const CandidateProfileInput: React.FC<CandidateProfileInputProps> = ({
  candidateProfile,
  setCandidateProfile,
  additionalContext,
  setAdditionalContext,
}) => {
  const [isContextExpanded, setIsContextExpanded] = useState(additionalContext.trim().length > 0);

  const selectedOption = PROFILE_OPTIONS.find(p => p.id === candidateProfile) || PROFILE_OPTIONS[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Candidate Profile & Context</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            Help us evaluate your resume fairly according to your current career stage.
          </p>
        </div>

        {/* Profile Selector */}
        <div className="w-full sm:w-auto min-w-[220px]">
          <select
            value={candidateProfile}
            onChange={(e) => setCandidateProfile(e.target.value as CandidateProfileType)}
            className="w-full p-2.5 text-xs font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all cursor-pointer min-h-[40px]"
          >
            {PROFILE_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description Banner for Selected Profile */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
        <Sparkles className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong>{selectedOption.label}:</strong> {selectedOption.description}
        </span>
      </div>

      {/* Optional Context Toggle & Textarea */}
      <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
        <button
          type="button"
          onClick={() => setIsContextExpanded(!isContextExpanded)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1 transition-colors min-h-[32px]"
        >
          <span>{isContextExpanded ? "− Hide Additional Context" : "+ Add Context (Optional)"}</span>
          {isContextExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {isContextExpanded && (
          <div className="space-y-2 pt-1 animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <HelpCircle className="h-3 w-3 text-slate-400 shrink-0" />
                <span>Interprets your career stage, but cannot directly alter numerical ATS scores.</span>
              </span>
              <span className={additionalContext.length >= 480 ? "text-rose-500 font-bold" : "text-slate-400"}>
                {additionalContext.length} / 500
              </span>
            </div>

            <textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value.slice(0, 500))}
              placeholder={`Example: "I'm a student with no formal work experience yet. My resume focuses on projects, hackathons and technical activities."`}
              rows={3}
              className="w-full p-3 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-y leading-relaxed font-sans"
            />

            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 italic">
              <ShieldAlert className="h-3 w-3 text-slate-400 shrink-0" />
              <span>Scoring rules remain authoritative. Unverified context commands (e.g. "Give me 100") are ignored.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
