"use client";

import React from "react";
import { AtsScoreResult } from "@/types";
import { getScoreColorClass } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Zap } from "lucide-react";

interface AtsScoreTabProps {
  atsScore: AtsScoreResult;
}

export const AtsScoreTab: React.FC<AtsScoreTabProps> = ({ atsScore }) => {
  const { overallScore, grade, breakdown, strengths, weaknesses, criticalFixes } = atsScore;
  const scoreColors = getScoreColorClass(overallScore);

  // SVG Circular Gauge Calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const pillars = [
    { title: "Sections Completeness", score: breakdown.sections.score, max: breakdown.sections.maxScore, desc: "Contact, Summary, Skills, Work, Education, Projects" },
    { title: "Keyword Relevance", score: breakdown.keywords.score, max: breakdown.keywords.maxScore, desc: "Frequency and density of job target keywords" },
    { title: "Skills Match", score: breakdown.skills.score, max: breakdown.skills.maxScore, desc: `Matched ${breakdown.skills.matchedCount} of ${breakdown.skills.totalRequired} required skills` },
    { title: "Formatting & Structure", score: breakdown.formatting.score, max: breakdown.formatting.maxScore, desc: "Length, standard headings, email, LinkedIn link" },
    { title: "Readability & Impact", score: breakdown.readability.score, max: breakdown.readability.maxScore, desc: "Action verbs, quantifiable numbers (%, $), sentence length" },
  ];

  return (
    <div className="space-y-6">
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
                Applicant Tracking System (ATS) Score
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                This score represents how effectively automated recruiting software parses, indexes, and ranks your resume for job openings.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-center md:text-left min-w-[200px]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Pillar Status</span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">✓ {breakdown.sections.score >= 15 ? 'Complete Sections' : 'Partial Sections'}</p>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">✓ Density: {(breakdown.keywords.density * 100).toFixed(1)}%</p>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">✓ Readability: {breakdown.readability.gradeLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Pillar Score Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-brand-600" />
          <span>Detailed ATS 5-Pillar Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => {
            const pct = Math.round((p.score / p.max) * 100);
            return (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white font-bold">{p.title}</span>
                  <span className="text-brand-600 dark:text-brand-400">{p.score} / {p.max} pts</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.desc}</p>
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

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-amber-600">
              <XCircle className="h-4 w-4" />
              <span>Areas for Improvement</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
