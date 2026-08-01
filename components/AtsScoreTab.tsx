"use client";

import React, { useState } from "react";
import { AtsScoreResult, PillarCheck } from "@/types";
import { getScoreColorClass } from "@/lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileSearch,
  Award,
  Layers,
  ArrowRight
} from "lucide-react";

interface AtsScoreTabProps {
  atsScore: AtsScoreResult;
}

export const AtsScoreTab: React.FC<AtsScoreTabProps> = ({ atsScore }) => {
  const { overallScore, grade, breakdown, strengths, criticalFixes, recommendations, hasJd } = atsScore;
  const scoreColors = getScoreColorClass(overallScore);

  const [showMethodology, setShowMethodology] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  // SVG Circular Gauge Calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  // Determine Overall Rating Label & One-line Summary
  const getScoreRating = (score: number) => {
    if (score >= 85) {
      return {
        label: "Excellent Compatibility",
        summary: "Your resume demonstrates excellent ATS compatibility with strong structure, clean formatting, and rich content.",
        badgeBg: "bg-emerald-100 dark:bg-emerald-950/80",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        badgeBorder: "border-emerald-300 dark:border-emerald-800",
      };
    }
    if (score >= 70) {
      return {
        label: "Good Compatibility",
        summary: "Your resume demonstrates good ATS compatibility with a few high-impact opportunities for improvement.",
        badgeBg: "bg-blue-100 dark:bg-blue-950/80",
        badgeText: "text-blue-700 dark:text-blue-300",
        badgeBorder: "border-blue-300 dark:border-blue-800",
      };
    }
    if (score >= 55) {
      return {
        label: "Moderate Compatibility",
        summary: "Your resume has moderate ATS compatibility. Addressing key missing sections and formatting will boost your score.",
        badgeBg: "bg-amber-100 dark:bg-amber-950/80",
        badgeText: "text-amber-700 dark:text-amber-300",
        badgeBorder: "border-amber-300 dark:border-amber-800",
      };
    }
    return {
      label: "Needs Immediate Improvement",
      summary: "Your resume requires essential formatting, section structure, and content fixes to reliably pass automated ATS filters.",
      badgeBg: "bg-rose-100 dark:bg-rose-950/80",
      badgeText: "text-rose-700 dark:text-rose-300",
      badgeBorder: "border-rose-300 dark:border-rose-800",
    };
  };

  const ratingInfo = getScoreRating(overallScore);

  // Pillar Definitions with Natural Microcopy
  const pillars = [
    {
      id: "sections",
      title: "Resume Structure",
      score: breakdown.sections.score,
      max: breakdown.sections.maxScore,
      desc: "Presence of essential sections: Contact, Summary, Skills, Work/Projects, Education.",
      checks: breakdown.sections.checks || [],
    },
    {
      id: "formatting",
      title: "Formatting & Layout",
      score: breakdown.formatting.score,
      max: breakdown.formatting.maxScore,
      desc: "Standard headings, ATS-friendly length, contact links, and clean structure.",
      checks: breakdown.formatting.checks || [],
    },
    {
      id: "readability",
      title: "Readability & Impact",
      score: breakdown.readability.score,
      max: breakdown.readability.maxScore,
      desc: "Action verb frequency, quantifiable metrics (%, $), and active voice usage.",
      checks: breakdown.readability.checks || [],
    },
    {
      id: "contact",
      title: "Contact & Metadata",
      score: breakdown.contact?.score ?? 15,
      max: breakdown.contact?.maxScore ?? 20,
      desc: "Valid email address, phone number, location, and professional profiles.",
      checks: breakdown.contact?.checks || [],
    },
    {
      id: "contentQuality",
      title: "Content Depth & Quality",
      score: breakdown.contentQuality?.score ?? 15,
      max: breakdown.contentQuality?.maxScore ?? 20,
      desc: "Summary depth, bullet detail, skills variety, and certifications/achievements.",
      checks: breakdown.contentQuality?.checks || [],
    },
  ];

  // Consolidate Top 5 Priority Improvements
  const combinedImprovements = [
    ...criticalFixes.map((fix) => ({ text: fix, priority: "Critical" as const })),
    ...(recommendations || []).map((rec) => ({ text: rec.text, priority: rec.priority })),
  ].slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-5 min-w-0">
      {/* 1. Optional Job Description Notice Banner */}
      {!hasJd && (
        <div className="p-3.5 sm:p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex items-start space-x-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium shadow-sm">
          <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-slate-900 dark:text-amber-200">
              Evaluating Pure Resume Quality
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              The ATS score below measures structure, formatting, readability, contact metadata, and content depth. Add a target Job Description on the home page to also calculate role-specific Keyword Match & Skills Gap.
            </p>
          </div>
        </div>
      )}

      {/* 2. Redesigned Score Hero Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm min-w-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Circular Progress Gauge & Score */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5 text-center sm:text-left min-w-0 w-full md:w-auto">
            <div className="relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 130 130" className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-100 dark:text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={`${scoreColors.text} transition-all duration-1000 ease-out`}
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                  {overallScore}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  out of 100
                </span>
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full ${scoreColors.badgeBg} ${scoreColors.badgeText}`}>
                  Grade {grade}
                </span>
                <span className={`px-2.5 py-0.5 text-xs font-extrabold rounded-full border ${ratingInfo.badgeBg} ${ratingInfo.badgeText} ${ratingInfo.badgeBorder}`}>
                  {ratingInfo.label}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                ATS Compatibility Score
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                {ratingInfo.summary}
              </p>
            </div>
          </div>

          {/* Quick 5-Pillar Score Summary Badges */}
          <div className="w-full md:w-auto p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-1.5 min-w-[220px]">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Pillar Scores Summary
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              {pillars.map((p) => {
                const isGood = p.score >= p.max * 0.8;
                const isFair = p.score >= p.max * 0.6;
                return (
                  <div key={p.id} className="flex items-center justify-between space-x-1.5 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate">{p.title.split(" ")[0]}</span>
                    <span className={isGood ? "text-emerald-600 dark:text-emerald-400" : isFair ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}>
                      {p.score}/{p.max}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top Priority Improvements (Top 5) & Key Strengths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0">
        {/* Top Priority Improvements Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0" />
              <span>Top Priority Improvements</span>
            </h3>
            <span className="text-xs font-semibold text-slate-400">Action Plan</span>
          </div>

          {combinedImprovements.length > 0 ? (
            <ol className="space-y-2">
              {combinedImprovements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed block">
                      {item.text}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full shrink-0 border ${
                    item.priority === "Critical"
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300"
                      : item.priority === "Important"
                      ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300"
                      : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300"
                  }`}>
                    {item.priority}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Great job! No critical improvements required.</span>
            </div>
          )}
        </div>

        {/* Key Resume Strengths Card ("What is already good") */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
              <span>Key Resume Strengths</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Keep These Intact</span>
          </div>

          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map((strength, i) => (
                <li key={i} className="flex items-start space-x-2.5 p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No specific strengths recorded.</p>
          )}
        </div>
      </div>

      {/* 4. Explainable 5-Pillar Score Breakdown & Why Points Were Lost */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 min-w-0">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0" />
            <span>Pillar-by-Pillar Score Breakdown & Deduction Analysis</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent breakdown showing where points were awarded and why points were deducted.
          </p>
        </div>

        <div className="space-y-4">
          {pillars.map((p) => {
            const pct = Math.round((p.score / p.max) * 100);
            const passedChecks = p.checks.filter(
              (c) => c.pts === c.maxPts || c.status === "Passed" || c.status === "None detected" || c.status === "Low"
            );
            const failedChecks = p.checks.filter(
              (c) => c.pts < c.maxPts && c.status !== "Passed" && c.status !== "None detected" && c.status !== "Low"
            );

            return (
              <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-3 min-w-0">
                {/* Pillar Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
                  <div>
                    <div className="flex items-center space-x-2.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{p.title}</h4>
                      <span className="text-xs font-black text-brand-600 dark:text-brand-400">{p.score} / {p.max} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                  </div>

                  <div className="w-full sm:w-32 space-y-1">
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Why Points Were Lost (Deductions) */}
                {failedChecks.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                      Deductions / Areas for Improvement
                    </span>
                    <ul className="space-y-1.5">
                      {failedChecks.map((chk, cIdx) => (
                        <li key={cIdx} className="p-2.5 bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-900/50 rounded-lg flex items-start justify-between gap-2 text-xs">
                          <div className="flex items-start space-x-2 min-w-0">
                            <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <div className="space-y-0.5 min-w-0">
                              <span className="font-semibold text-rose-900 dark:text-rose-200 block">{chk.name}</span>
                              {chk.detail && <p className="text-[11px] text-rose-700 dark:text-rose-300 leading-tight">{chk.detail}</p>}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shrink-0">
                            {chk.pts - chk.maxPts} pts
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Passed Checks (What is good) */}
                {passedChecks.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                      Passed Checks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                      {passedChecks.map((chk, cIdx) => (
                        <div key={cIdx} className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/50 dark:border-slate-800 flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-1.5 min-w-0">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{chk.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 shrink-0">+{chk.pts}/{chk.maxPts}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. How This Score Is Calculated (Methodology Accordion) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden min-w-0">
        <button
          type="button"
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">How is this score calculated?</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">Learn about our 4-step deterministic ATS evaluation pipeline.</p>
            </div>
          </div>
          {showMethodology ? (
            <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
          )}
        </button>

        {showMethodology && (
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-xs text-slate-600 dark:text-slate-300 space-y-4">
            {/* 4-Step Diagram Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-xs">
                  <FileSearch className="h-4 w-4" />
                  <span>1. Resume Parsing</span>
                </div>
                <p className="text-[11px] text-slate-500">Extracts text, contact details, sections, skills, work history, and education.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                  <Layers className="h-4 w-4" />
                  <span>2. Structural Audit</span>
                </div>
                <p className="text-[11px] text-slate-500">Scans for standard section headings, formatting risks, word count, and action verbs.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  <span>3. 5-Pillar Scoring</span>
                </div>
                <p className="text-[11px] text-slate-500">Calculates deterministic points across 5 core quality pillars (20 pts each).</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <Award className="h-4 w-4" />
                  <span>4. Final ATS Score</span>
                </div>
                <p className="text-[11px] text-slate-500">Combines pillar scores into a transparent 100-point rating with actionable feedback.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Collapse Advanced Technical Audit Details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden min-w-0">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <h3 className="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
              Advanced Technical Audit Details
            </h3>
          </div>
          <div className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
            <span>{showTechnicalDetails ? "− Hide technical audit" : "+ Show full technical audit"}</span>
            {showTechnicalDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        {showTechnicalDetails && (
          <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-xs text-slate-600 dark:text-slate-300 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Granular Rule-by-Rule Checks</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 min-w-0">
              {pillars.flatMap((p) => p.checks).map((chk, idx) => (
                <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800 flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs min-w-0">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-medium text-slate-800 dark:text-slate-200 block truncate">{chk.name}</span>
                    {chk.detail && <p className="text-[11px] text-slate-500 leading-tight break-words">{chk.detail}</p>}
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 self-start xs:self-auto">
                    <span className="text-[10px] font-extrabold text-slate-500">
                      {chk.pts}/{chk.maxPts} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
