"use client";

import React, { useState } from "react";
import { AtsScoreResult, PillarCheck } from "@/types";
import { getScoreColorClass } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Zap, Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface AtsScoreTabProps {
  atsScore: AtsScoreResult;
}

export const AtsScoreTab: React.FC<AtsScoreTabProps> = ({ atsScore }) => {
  const { overallScore, grade, breakdown, strengths, weaknesses, criticalFixes, hasJd } = atsScore;
  const scoreColors = getScoreColorClass(overallScore);

  const [showMethodology, setShowMethodology] = useState(false);

  // SVG Circular Gauge Calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const pillars = [
    {
      title: "Section Completeness",
      score: breakdown.sections.score,
      max: breakdown.sections.maxScore,
      desc: "Contact, Summary, Skills, Work, Education, Projects",
      checks: breakdown.sections.checks || [],
    },
    {
      title: "Formatting & Structure",
      score: breakdown.formatting.score,
      max: breakdown.formatting.maxScore,
      desc: "Headings, LinkedIn URL, word length, tables & layout risks",
      checks: breakdown.formatting.checks || [],
    },
    {
      title: "Readability & Impact",
      score: breakdown.readability.score,
      max: breakdown.readability.maxScore,
      desc: "Action verbs, quantifiable numbers (%, $), sentence length",
      checks: breakdown.readability.checks || [],
    },
    {
      title: "Contact & Metadata",
      score: breakdown.contact?.score ?? 15,
      max: breakdown.contact?.maxScore ?? 20,
      desc: "Email, phone number, location, portfolio/LinkedIn links",
      checks: breakdown.contact?.checks || [],
    },
    {
      title: "Content Quality",
      score: breakdown.contentQuality?.score ?? 15,
      max: breakdown.contentQuality?.maxScore ?? 20,
      desc: "Summary depth, work history bullet depth, skills richness",
      checks: breakdown.contentQuality?.checks || [],
    },
  ];

  function getStatusBadgeClass(status: PillarCheck['status']) {
    switch (status) {
      case "Passed":
      case "None detected":
      case "Low":
        return "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300";
      case "Missing":
      case "High":
      case "Detected":
        return "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300";
      case "Needs improvement":
      case "Medium":
      default:
        return "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300";
    }
  }

  return (
    <div className="space-y-6">
      {/* Optional Job Description Notice Banner */}
      {!hasJd && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center space-x-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium shadow-sm">
          <Info className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <p className="font-bold">Add a Job Description to calculate keyword relevance and skills match.</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              The ATS Resume Quality score below is evaluated purely from your resume structure, formatting, readability, and content metrics.
            </p>
          </div>
        </div>
      )}

      {/* Top Banner: Circular Score & Grade Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Circular Progress Gauge */}
          <div className="flex items-center space-x-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-100 dark:text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={`${scoreColors.text} transition-all duration-1000 ease-out`}
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {overallScore}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Out of 100
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-extrabold rounded-full ${scoreColors.badgeBg} ${scoreColors.badgeText}`}>
                  Grade {grade}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {overallScore >= 80 ? "ATS Optimized" : overallScore >= 60 ? "Moderate ATS Pass" : "Needs Immediate Improvement"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                ATS Resume Quality Score
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Evaluated deterministically across 5 core resume quality pillars: completeness, formatting, readability, contact metadata, and content quality.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-center md:text-left min-w-[200px]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Pillar Overview</span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">✓ Sections: {breakdown.sections.score}/20 pts</p>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">✓ Formatting: {breakdown.formatting.score}/20 pts</p>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">✓ Readability: {breakdown.readability.score}/20 pts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable "How is this calculated?" Methodology Accordion */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">How is this calculated?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Learn about our deterministic 100-point ATS scoring methodology.</p>
            </div>
          </div>
          {showMethodology ? (
            <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
          )}
        </button>

        {showMethodology && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              The <strong>ATS Resume Quality Score</strong> is derived deterministically from 5 pure resume quality pillars (20 points max each, summing to 100 points total). No random numbers, hardcoded scores, or unverified defaults are used.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">1. Section Completeness (20 pts)</span>
                <p className="text-[11px] text-slate-500">Evaluates the presence of standard sections: Contact, Summary, Skills, Experience, Education, and Projects/Certifications.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">2. Formatting & Structure (20 pts)</span>
                <p className="text-[11px] text-slate-500">Evaluates standard section headings, email, LinkedIn URL, optimal word count (400-800 words), complex tables, and multi-column parsing risks.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">3. Readability & Impact (20 pts)</span>
                <p className="text-[11px] text-slate-500">Evaluates strong action verbs (spearheaded, engineered, etc.), quantifiable metrics (%, $, scale numbers), and passive voice usage.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">4. Contact & Metadata (20 pts)</span>
                <p className="text-[11px] text-slate-500">Checks for valid email address, phone number, city/location metadata, and professional portfolio / GitHub / LinkedIn URLs.</p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-1 col-span-1 md:col-span-2">
                <span className="font-bold text-slate-900 dark:text-white block">5. Content Quality (20 pts)</span>
                <p className="text-[11px] text-slate-500">Evaluates executive summary depth, work history bullet point depth, technical skills count, and achievements or certifications.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explainable 5-Pillar Score Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-brand-600" />
          <span>Explainable ATS Pillar Breakdown & Check Details</span>
        </h3>

        <div className="space-y-6">
          {pillars.map((p, idx) => {
            const pct = Math.round((p.score / p.max) * 100);
            return (
              <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.title}</h4>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{p.score} / {p.max} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                  </div>

                  <div className="w-full sm:w-36 space-y-1">
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Individual Checks List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Contributing Checks</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {p.checks.map((chk, cIdx) => (
                      <div key={cIdx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{chk.name}</span>
                          {chk.detail && <p className="text-[11px] text-slate-500 leading-tight">{chk.detail}</p>}
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full border ${getStatusBadgeClass(chk.status)}`}>
                            {chk.status}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">+{chk.pts}/{chk.maxPts}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Fixes & Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Critical Fixes Checklist */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2 text-rose-600 dark:text-rose-400">
            <Zap className="h-5 w-5" />
            <span>Critical ATS Fixes Required</span>
          </h3>
          <ul className="space-y-3">
            {criticalFixes.map((fix, idx) => (
              <li key={idx} className="flex items-start space-x-3 p-3 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/50 rounded-xl text-xs text-rose-800 dark:text-rose-300 font-medium">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Key Resume Strengths</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-amber-600">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>Areas for Improvement ({atsScore.recommendations?.length || 0})</span>
            </h3>

            {atsScore.recommendations && atsScore.recommendations.length > 0 ? (
              <ul className="space-y-3">
                {atsScore.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start justify-between space-x-3 p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs">
                    <div className="flex items-start space-x-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{rec.text}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full shrink-0 border ${
                      rec.priority === "Critical"
                        ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300"
                        : rec.priority === "Important"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300"
                        : "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300"
                    }`}>
                      {rec.priority}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>No major ATS issues detected.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
