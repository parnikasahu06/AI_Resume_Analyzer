"use client";

import React from "react";
import { GrammarAnalysisResult } from "@/types";
import { CheckSquare, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

interface GrammarTabProps {
  grammar: GrammarAnalysisResult;
}

export const GrammarTab: React.FC<GrammarTabProps> = ({ grammar }) => {
  const {
    readabilityScore,
    readabilityGrade,
    passiveVoiceCount,
    passiveSentences,
    weakWordsCount,
    weakWordsFound,
    longSentences,
    suggestions,
  } = grammar;

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">
      {/* Top Banner Readability Index */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 text-center sm:text-left min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start space-x-2">
              <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 shrink-0" />
              <span>Grammar, Passive Voice & Readability</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluates tone, clarity, sentence structure, and active vs passive phrasing.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl min-w-[120px]">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                Readability Index
              </span>
              <span className="text-2xl font-black text-purple-700 dark:text-purple-300">
                {readabilityScore}/100
              </span>
              <span className="text-[10px] text-slate-500 block">{readabilityGrade}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0">
        <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl min-w-0">
          <span className="text-xs text-slate-400 font-semibold block truncate">Passive Voice Sentences</span>
          <span className={`text-2xl font-black ${passiveVoiceCount > 0 ? "text-amber-600" : "text-emerald-600"}`}>
            {passiveVoiceCount}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Aim for 0 passive constructions</p>
        </div>

        <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl min-w-0">
          <span className="text-xs text-slate-400 font-semibold block truncate">Weak Words / Phrases</span>
          <span className={`text-2xl font-black ${weakWordsCount > 0 ? "text-rose-600" : "text-emerald-600"}`}>
            {weakWordsCount}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Replace with strong verbs</p>
        </div>

        <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl min-w-0">
          <span className="text-xs text-slate-400 font-semibold block truncate">Overly Long Sentences</span>
          <span className={`text-2xl font-black ${longSentences.length > 0 ? "text-indigo-600" : "text-emerald-600"}`}>
            {longSentences.length}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">Sentences &gt; 25 words</p>
        </div>
      </div>

      {/* Grammar Suggestions List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 min-w-0">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          <span>Grammar & Tone Recommendations</span>
        </h3>

        <div className="space-y-3 min-w-0">
          {suggestions.map((sug, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1.5 min-w-0"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shrink-0">
                  {sug.type}
                </span>
                <span className="font-semibold text-xs text-slate-900 dark:text-white break-words">{sug.message}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 break-words leading-relaxed">
                👉 <strong>Fix:</strong> {sug.recommendation}
              </p>
            </div>
          ))}

          {suggestions.length === 0 && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 min-w-0">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Great job! No major grammar or passive voice issues detected.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
