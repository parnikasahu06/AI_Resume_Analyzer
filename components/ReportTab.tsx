"use client";

import React from "react";
import { CompleteAnalysisReport } from "@/types";
import { downloadReportAsPdf } from "@/lib/report/pdf-generator";
import { Printer, Download, FileCheck, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface ReportTabProps {
  report: CompleteAnalysisReport;
}

export const ReportTab: React.FC<ReportTabProps> = ({ report }) => {
  const { parsedResume, atsScore, jobMatch, skillsGap, aiSuggestions, grammar } = report;

  return (
    <div className="space-y-6">
      {/* Download Action Card */}
      <div className="bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start space-x-2">
              <FileCheck className="h-7 w-7" />
              <span>Full ATS Quality Audit Report</span>
            </h2>
            <p className="text-xs text-indigo-100 max-w-xl">
              Export a recruiter-ready PDF report containing complete candidate scoring, skills gap matrix, ATS fixes, and AI recommendations.
            </p>
          </div>

          <button
            onClick={() => downloadReportAsPdf(report)}
            className="px-6 py-3 bg-white text-brand-700 hover:bg-slate-100 transition-all font-bold text-sm rounded-xl shadow-lg flex items-center space-x-2 shrink-0 transform hover:scale-105 active:scale-95"
          >
            <Printer className="h-4 w-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Audit Preview Sheet */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Audit Executive Summary</h3>
            <p className="text-xs text-slate-500">Candidate: {parsedResume.contact.name} ({parsedResume.contact.email})</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400">Report ID</span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">{report.id}</p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ATS Score</span>
            <span className="text-2xl font-black text-emerald-600">{atsScore.overallScore} / 100</span>
            <span className="text-xs font-semibold text-slate-500 block">Grade {atsScore.grade}</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Job Similarity</span>
            <span className="text-2xl font-black text-indigo-600">{jobMatch.matchPercentage}%</span>
            <span className="text-xs font-semibold text-slate-500 block">TF-IDF Vectorized</span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Readability Index</span>
            <span className="text-2xl font-black text-purple-600">{grammar.readabilityScore} / 100</span>
            <span className="text-xs font-semibold text-slate-500 block">{grammar.readabilityGrade}</span>
          </div>
        </div>

        {/* Key Action Items */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-rose-500" />
            <span>High Priority Action Items</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {atsScore.criticalFixes.map((fix, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">▶</span>
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Optimized Professional Summary</span>
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 italic">
            "{aiSuggestions.enhancedSummary}"
          </p>
        </div>
      </div>
    </div>
  );
};
