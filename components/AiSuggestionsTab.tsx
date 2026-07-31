"use client";

import React, { useState } from "react";
import { AiSuggestionsResult } from "@/types";
import { Sparkles, RefreshCw, Cpu, Check, Copy, CheckCircle2, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

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

  const needsImpCount = bulletRewrites.filter(b => b.assessment === 'needs_improvement' || b.assessment === 'weak').length;
  const strongCount = bulletRewrites.filter(b => b.assessment === 'strong').length;

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
              Preserves your authentic voice and verified facts while evaluating resume bullet strength and providing context-appropriate action verb rewrites.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold shrink-0">
            <Cpu className="h-3.5 w-3.5 text-brand-300 shrink-0" />
            <span>Engine: {source === "gemini" ? "Google Gemini 1.5 Flash (Conservative)" : "Contextual AI Rule Engine"}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Executive Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-500 shrink-0" />
            <span>Recommended Professional Summary</span>
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
          Concise professional summary synthesized from your verified skills and experience without artificial claims:
        </p>
        <div className="p-3.5 sm:p-4 bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic break-words">
          "{enhancedSummary}"
        </div>
      </div>

      {/* Bullet Point Rewrites Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>Resume Bullet Evaluation & Targeted Rewrites</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {needsImpCount > 0
                ? `${needsImpCount} high-impact improvement suggestion${needsImpCount > 1 ? 's' : ''} identified (${strongCount} bullet${strongCount !== 1 ? 's' : ''} already strong).`
                : "All evaluated bullet points are already strong! Minimal refinements suggested."}
            </p>
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          {bulletRewrites.length === 0 ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs text-slate-500 text-center">
              No descriptive resume bullet points detected for rewrite evaluation.
            </div>
          ) : (
            bulletRewrites.map((rewrite, idx) => {
              const isStrong = rewrite.assessment === "strong";
              const isNeedsImp = rewrite.assessment === "needs_improvement";
              const isWeak = rewrite.assessment === "weak";

              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 min-w-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs min-w-0">
                    {/* Original Bullet & Assessment Badge */}
                    <div className="space-y-2 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 min-w-0 flex flex-col justify-between">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Original Bullet
                          </span>
                          {/* Assessment Badge */}
                          {isStrong && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              <span>✓ Already Strong</span>
                            </span>
                          )}
                          {isNeedsImp && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold border border-amber-300 dark:border-amber-800">
                              <AlertTriangle className="h-3 w-3 text-amber-600" />
                              <span>Needs Improvement</span>
                            </span>
                          )}
                          {isWeak && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-[10px] font-bold border border-rose-300 dark:border-rose-800">
                              <AlertCircle className="h-3 w-3 text-rose-600" />
                              <span>Weak Structure</span>
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words font-normal">
                          "{rewrite.original}"
                        </p>
                      </div>
                    </div>

                    {/* Improved / Refinement Section */}
                    <div className={`space-y-2 p-3.5 rounded-xl border flex flex-col justify-between min-w-0 ${
                      isStrong
                        ? "bg-slate-100/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                        : "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                    }`}>
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                            isStrong ? "text-slate-600 dark:text-slate-400" : "text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {isStrong ? (rewrite.improved ? "Optional Refinement" : "Status") : "Suggested Rewrite"}
                          </span>
                          {rewrite.improved && (
                            <button
                              onClick={() => handleCopy(rewrite.improved!, `bullet_${idx}`)}
                              className="px-2 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition-all shadow-xs shrink-0 min-h-[30px]"
                            >
                              {copiedId === `bullet_${idx}` ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                                  <span className="text-emerald-600 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 text-slate-500 shrink-0" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {rewrite.improved ? (
                          <p className="font-semibold text-slate-900 dark:text-white leading-relaxed break-words">
                            "{rewrite.improved}"
                          </p>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-400 italic text-xs leading-relaxed">
                            No rewrite necessary — original bullet is already concise, specific, and well-structured.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Why this change / Rationale */}
                  <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start space-x-2 min-w-0">
                    <span className="font-bold text-brand-600 shrink-0">Why:</span>
                    <span className="break-words">{rewrite.rationale}</span>
                  </div>

                  {/* Optional Metric Opportunity Note (Separated from bullet text) */}
                  {rewrite.metricOpportunity && (
                    <div className="p-2.5 bg-amber-50/80 dark:bg-amber-950/40 rounded-lg border border-amber-200/60 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-start space-x-2 min-w-0">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="break-words font-medium">{rewrite.metricOpportunity}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Verbs & Missing Tech */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 min-w-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recommended Domain Action Verbs</h3>
          <p className="text-xs text-slate-500">Natural action verbs matching your specific technical discipline:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
            {actionVerbsRecommended.map((verb, i) => (
              <span key={i} className="px-2.5 sm:px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-bold break-words">
                {verb}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Missing Target Tech Skills</h3>
          <p className="text-xs text-slate-500">Key job requirements missing from your resume content:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
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
