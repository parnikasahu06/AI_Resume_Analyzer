"use client";

import React, { useState } from "react";
import { Upload, FileText, X, AlertCircle, ChevronDown, ChevronUp, UserCheck } from "lucide-react";
import { CandidateProfileType } from "@/types";

interface ResumeUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  rawText: string;
  setRawText: (text: string) => void;
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

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  file,
  setFile,
  rawText,
  setRawText,
  candidateProfile,
  setCandidateProfile,
  additionalContext,
  setAdditionalContext,
}) => {
  const [activeMode, setActiveMode] = useState<"file" | "text">("file");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isContextExpanded, setIsContextExpanded] = useState(additionalContext.trim().length > 0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (f: File) => {
    setError(null);
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const extension = f.name.substring(f.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(f.type) && ![".pdf", ".docx", ".txt"].includes(extension)) {
      setError("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 min-w-0 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600 dark:text-brand-400 shrink-0" />
              <span>1. Upload Resume</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Supports PDF, DOCX, or plain text format
            </p>
          </div>

          {/* Input Mode Selector */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium self-start xs:self-auto shrink-0">
            <button
              onClick={() => setActiveMode("file")}
              className={`px-2.5 sm:px-3 py-1 rounded-md transition-all min-h-[36px] ${
                activeMode === "file"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              File Upload
            </button>
            <button
              onClick={() => setActiveMode("text")}
              className={`px-2.5 sm:px-3 py-1 rounded-md transition-all min-h-[36px] ${
                activeMode === "text"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Paste Text
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Area */}
        {activeMode === "file" ? (
          file ? (
            <div className="p-3.5 sm:p-4 bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center justify-between gap-3 min-w-0">
              <div className="flex items-center space-x-3 min-w-0 overflow-hidden">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {file.name.split(".").pop()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {(file.size / 1024).toFixed(1)} KB • Ready for ATS analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Remove File"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[140px] sm:min-h-[160px] w-full ${
                dragActive
                  ? "border-brand-500 bg-brand-50/60 dark:bg-brand-950/40"
                  : "border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 bg-slate-50/50 dark:bg-slate-800/30"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleChange}
                className="hidden"
              />
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-2 shrink-0">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                Click to upload or drag & drop resume
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">
                PDF, DOCX, or TXT (Max size 10MB)
              </p>
            </label>
          )
        ) : (
          <div>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste your raw resume text here (Contact, Skills, Experience, Education)..."
              rows={5}
              className="w-full p-3 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-y font-mono"
            />
          </div>
        )}
      </div>

      {/* Secondary Section: Candidate Profile & Context */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
          CANDIDATE PROFILE
        </span>

        {/* Dropdown & Helper Text */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
            <UserCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>Career Stage</span>
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
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
            {getProfileHelperText(candidateProfile)}
          </p>
        </div>

        {/* Collapsible Additional Context */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => setIsContextExpanded(!isContextExpanded)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center space-x-1 transition-colors min-h-[30px]"
          >
            <span>{isContextExpanded ? "− Hide context" : "+ Add optional context"}</span>
            {isContextExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {isContextExpanded && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Additional Context (Optional):</span>
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

              <p className="text-[10px] text-slate-400 italic">
                Add relevant career context. This cannot directly change your ATS score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
