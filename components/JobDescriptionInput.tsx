"use client";

import React from "react";
import { Briefcase, Sparkles, X } from "lucide-react";
import { SAMPLE_JOB_DESCRIPTION_TEXT } from "@/lib/sample-data";

interface JobDescriptionInputProps {
  jdText: string;
  setJdText: (text: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jdText,
  setJdText,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Target Job Description</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste the job posting to calculate match percentage & missing keywords
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setJdText(SAMPLE_JOB_DESCRIPTION_TEXT)}
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all"
          >
            <Sparkles className="h-3 w-3" />
            <span>Fill Sample JD</span>
          </button>

          {jdText && (
            <button
              onClick={() => setJdText("")}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear text"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste Job Description requirements, responsibilities, and key tech stack here..."
          rows={8}
          className="w-full p-3.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-y"
        />
      </div>
    </div>
  );
};
