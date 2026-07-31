"use client";

import React, { useState } from "react";
import { AiSuggestionsResult } from "@/types";
import { Sparkles, RefreshCw, Cpu, Check, Copy } from "lucide-react";

interface AiSuggestionsTabProps {
  aiSuggestions: AiSuggestionsResult;
}

export const AiSuggestionsTab: React.FC<AiSuggestionsTabProps> = ({ aiSuggestions }) => {
  const {
    bulletRewrites,
    missingTechToHighlight,
    enhancedSummary,
    actionVerbsRecommended,
    source,
  } = aiSuggestions;

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 border border-brand-800 rounded-2xl p-4 sm:p-6 shadow-md text-white min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left min-w-0">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold truncate">AI-Powered Bullet & Summary Optimizer</h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Generates contextual, evidence-based bullet rewrites and action verb improvements based on your actual resume content.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold shrink-0">
            <Cpu className="h-3.5 w-3.5 text-brand-300 shrink-0" />
            <span>Engine: {source === "gemini" ? "Google Gemini 1.5 Flash" : "Contextual AI Rule Engine"}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Executive Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-500 shrink-0" />
            <span>Recommended AI Professional Summary</span>
          </h3>
          <button
            onClick={() => handleCopy(enhancedSummary, "summary")}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm self-start sm:self-auto min-h-[38px] shrink-0"
          >
            {copiedId === "summary" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Tailored professional summary based on your extracted resume skills and experience:
        </p>
        <div className="p-3.5 sm:p-4 bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic break-words">
          "{enhancedSummary}"
        </div>
      </div>

      {/* Bullet Point Rewrites Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 min-w-0">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-emerald-500 shrink-0" />
          <span>High-Impact Contextual Bullet Point Rewrites</span>
        </h3>

        <div className="space-y-4 min-w-0">
          {bulletRewrites.map((rewrite, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 min-w-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs min-w-0">
                {/* Original */}
                <div className="space-y-1 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 min-w-0">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                    Original Bullet (From Resume)
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed break-words">{rewrite.original}</p>
                </div>

                {/* Improved */}
                <div className="space-y-2 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between min-w-0">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        Suggested Rewrite
                      </span>
                      <button
                        onClick={() => handleCopy(rewrite.improved, `bullet_${idx}`)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition-all shadow-xs shrink-0 min-h-[34px]"
                      >
                        {copiedId === `bullet_${idx}` ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-slate-500 shrink-0" />
                            <span>Copy Suggestion</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white leading-relaxed break-words">{rewrite.improved}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start space-x-2 min-w-0">
                <span className="font-bold text-brand-600 shrink-0">Reason:</span>
                <span className="break-words">{rewrite.rationale}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Verbs & Wording Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 min-w-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recommended Strong Action Verbs</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {actionVerbsRecommended.map((verb, i) => (
              <span key={i} className="px-2.5 sm:px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-bold break-words">
                {verb}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Missing Tech to Position</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {missingTechToHighlight.map((tech, i) => (
              <span key={i} className="px-2.5 sm:px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-semibold break-words">
                + {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
