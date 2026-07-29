"use client";

import React from "react";
import { AiSuggestionsResult } from "@/types";
import { Sparkles, ArrowRight, Check, RefreshCw, Cpu, Award } from "lucide-react";

interface AiSuggestionsTabProps {
  aiSuggestions: AiSuggestionsResult;
}

export const AiSuggestionsTab: React.FC<AiSuggestionsTabProps> = ({ aiSuggestions }) => {
  const {
    bulletRewrites,
    missingTechToHighlight,
    wordingEnhancements,
    achievementIdeas,
    enhancedSummary,
    actionVerbsRecommended,
    source,
  } = aiSuggestions;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 border border-brand-800 rounded-2xl p-6 shadow-md text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              <h2 className="text-xl font-bold">AI-Powered Bullet & Summary Optimizer</h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Generates quantifiable accomplishments, action verb replacements, and strategic keyword positioning.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
            <Cpu className="h-3.5 w-3.5 text-brand-300" />
            <span>Engine: {source === "gemini" ? "Google Gemini 1.5 Flash" : "Contextual AI Rule Engine"}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Executive Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span>Recommended AI Professional Summary</span>
        </h3>
        <p className="text-xs text-slate-500">
          Copy and paste this tailored summary to immediately catch the recruiter's eye:
        </p>
        <div className="p-4 bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
          "{enhancedSummary}"
        </div>
      </div>

      {/* Bullet Point Rewrites Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-emerald-500" />
          <span>High-Impact Bullet Point Rewrites</span>
        </h3>

        <div className="space-y-4">
          {bulletRewrites.map((rewrite, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original */}
                <div className="space-y-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                    Before (Weak / Generic)
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">{rewrite.original}</p>
                </div>

                {/* Improved */}
                <div className="space-y-1 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block flex items-center space-x-1">
                    <span>After (AI Optimized)</span>
                    {rewrite.metricAdded && <span className="bg-emerald-200 text-emerald-800 px-1 rounded text-[9px]">+ Metric</span>}
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">{rewrite.improved}</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                💡 Rationale: {rewrite.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Verbs & Wording Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recommended Strong Action Verbs</h3>
          <div className="flex flex-wrap gap-2">
            {actionVerbsRecommended.map((verb, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-bold">
                {verb}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Missing Tech to Position</h3>
          <div className="flex flex-wrap gap-2">
            {missingTechToHighlight.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-semibold">
                + {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
