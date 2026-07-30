"use client";

import React from "react";
import { CompleteAnalysisReport } from "@/types";
import { downloadReportAsPdf } from "@/lib/report/pdf-generator";
import { Printer, FileCheck, ShieldCheck, Sparkles, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

interface ReportTabProps {
  report: CompleteAnalysisReport;
}

export const ReportTab: React.FC<ReportTabProps> = ({ report }) => {
  const { parsedResume, atsScore, jobMatch, aiSuggestions, grammar, pdfQuality } = report;

  const risk = pdfQuality?.overallRisk || "LOW";

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
              Export a recruiter-ready PDF report containing complete candidate scoring, PDF parsing risk analysis, skills gap matrix, and AI recommendations.
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

      {/* Document Parsing Quality Analysis Card */}
      {pdfQuality && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-indigo-500 shrink-0" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">PDF & Document Parsing Quality Report</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Technical evaluation of document properties that realistically affect automated ATS text parsing.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-semibold text-slate-500">Overall Parsing Risk:</span>
              <span className={`px-3 py-1 text-xs font-black rounded-full border ${
                risk === "HIGH"
                  ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300"
                  : risk === "MEDIUM"
                  ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300"
                  : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300"
              }`}>
                {risk} RISK
              </span>
            </div>
          </div>

          {/* 11 Technical Properties Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">File Type</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.fileType}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">File Size</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.fileSize}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Page Count</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.pageCount}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Text Extraction Stream</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Successful</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Extracted Word Count</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.extractedWordCount} words</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Presence of Hyperlinks</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.hasHyperlinks}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Unusual Formatting</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.unusualFormatting}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tables & Complex Layout</span>
              <span className={`font-semibold ${pdfQuality.tablesOrComplexLayout === "Detected" ? "text-amber-600" : "text-slate-900 dark:text-white"}`}>
                {pdfQuality.tablesOrComplexLayout}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Multi-Column Parsing Risk</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.multiColumnParsingRisk}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Empty / Scanned PDF Risk</span>
              <span className="font-semibold text-slate-900 dark:text-white">{pdfQuality.scannedPdfRisk}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800 space-y-1 col-span-1 sm:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">ATS Text Extraction Quality</span>
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{pdfQuality.atsTextExtractionQuality}</span>
            </div>
          </div>

          {/* Issue Explanations Card */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Detected Issue Explanations</h4>
            {pdfQuality.detectedIssues.length > 0 ? (
              <div className="space-y-2">
                {pdfQuality.detectedIssues.map((issue, idx) => (
                  <div key={idx} className="p-3 bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-800 dark:text-rose-300">{issue.property}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-200 text-rose-900 rounded">{issue.status}</span>
                    </div>
                    <p className="text-rose-700 dark:text-rose-300 leading-relaxed">{issue.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>No technical document parsing issues detected! Text vectors stream cleanly for ATS indexing.</span>
              </div>
            )}
          </div>
        </div>
      )}

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
            <span className="text-2xl font-black text-indigo-600">{jobMatch.hasJd && jobMatch.matchPercentage !== null ? `${jobMatch.matchPercentage}%` : 'Not Calculated'}</span>
            <span className="text-xs font-semibold text-slate-500 block">{jobMatch.hasJd ? 'TF-IDF Vectorized' : 'Requires JD'}</span>
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
