"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, TabType } from "@/components/Sidebar";
import { ResumeUploader } from "@/components/ResumeUploader";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { SummaryTab } from "@/components/SummaryTab";
import { AtsScoreTab } from "@/components/AtsScoreTab";
import { JobMatchTab } from "@/components/JobMatchTab";
import { SkillsGapTab } from "@/components/SkillsGapTab";
import { AiSuggestionsTab } from "@/components/AiSuggestionsTab";
import { GrammarTab } from "@/components/GrammarTab";
import { ReportTab } from "@/components/ReportTab";
import { CompleteAnalysisReport } from "@/types";
import { SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION_TEXT } from "@/lib/sample-data";
import { Sparkles, ArrowRight, Loader2, AlertCircle, CheckCircle2, ShieldCheck, Zap, Award } from "lucide-react";

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [jdText, setJdText] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<CompleteAnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleAnalyze = async (overrideSample = false) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();

      if (overrideSample) {
        formData.append("useSample", "true");
      } else {
        if (file) {
          formData.append("resumeFile", file);
        } else if (rawText) {
          formData.append("resumeText", rawText);
        } else {
          throw new Error("Please upload a resume file or paste resume text first.");
        }

        if (jdText) {
          formData.append("jdText", jdText);
        }
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      setAnalysisReport(data);
      setActiveTab("ats"); // Automatically switch to ATS Score tab upon success
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setFile(null);
    setRawText(SAMPLE_RESUME_TEXT);
    setJdText(SAMPLE_JOB_DESCRIPTION_TEXT);
    handleAnalyze(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Header Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLoadSample={handleLoadSample}
        isAnalyzing={isAnalyzing}
      />

      {/* Main App Layout with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        {/* Navigation Drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasAnalysis={!!analysisReport}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {error && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium shadow-sm">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-rose-500 hover:text-rose-700 text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: HOME / UPLOAD & HERO */}
          {activeTab === "home" && (
            <div className="space-y-8">
              {/* Hero Banner Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-brand-950 to-indigo-950 p-8 sm:p-10 text-white shadow-xl border border-brand-900/40">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-2xl space-y-4 relative z-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Next-Gen Candidate ATS Optimization</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                    Optimize Your Resume for <span className="bg-gradient-to-r from-brand-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">Applicant Tracking Systems</span>
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Upload your PDF or Word resume alongside any target Job Description. Our multi-stage NLP & TF-IDF algorithms calculate ATS scores, identify skills gaps, generate AI bullet rewrites, and export downloadable PDF audit reports.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={handleLoadSample}
                      disabled={isAnalyzing}
                      className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center space-x-2"
                    >
                      <Sparkles className="h-4 w-4 text-amber-300" />
                      <span>Try Instant Demo Analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResumeUploader
                  file={file}
                  setFile={setFile}
                  rawText={rawText}
                  setRawText={setRawText}
                />
                <JobDescriptionInput
                  jdText={jdText}
                  setJdText={setJdText}
                />
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => handleAnalyze(false)}
                  disabled={isAnalyzing || (!file && !rawText.trim())}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-98"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing Resume & Matching Keywords...</span>
                    </>
                  ) : (
                    <>
                      <span>Run AI ATS Resume Analysis</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Value Proposition Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <ShieldCheck className="h-6 w-6 text-brand-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Weighted ATS Engine</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Evaluates 5 pillars: completeness, keyword density, formatting, skills, and readability.</p>
                </div>
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <Zap className="h-6 w-6 text-amber-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">TF-IDF Vector Matching</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Uses cosine similarity algorithms to measure exact candidate-to-job match percentages.</p>
                </div>
                <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
                  <Award className="h-6 w-6 text-emerald-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Suggestion Layer</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Generates metric-driven bullet point rewrites and missing tech recommendations via Google Gemini.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESUME SUMMARY */}
          {activeTab === "summary" && analysisReport && (
            <SummaryTab resume={analysisReport.parsedResume} />
          )}

          {/* TAB 3: ATS SCORE */}
          {activeTab === "ats" && analysisReport && (
            <AtsScoreTab atsScore={analysisReport.atsScore} />
          )}

          {/* TAB 4: JOB MATCH */}
          {activeTab === "match" && analysisReport && (
            <JobMatchTab jobMatch={analysisReport.jobMatch} />
          )}

          {/* TAB 5: SKILLS GAP */}
          {activeTab === "skills" && analysisReport && (
            <SkillsGapTab skillsGap={analysisReport.skillsGap} />
          )}

          {/* TAB 6: AI SUGGESTIONS */}
          {activeTab === "ai" && analysisReport && (
            <AiSuggestionsTab aiSuggestions={analysisReport.aiSuggestions} />
          )}

          {/* TAB 7: GRAMMAR CHECK */}
          {activeTab === "grammar" && analysisReport && (
            <GrammarTab grammar={analysisReport.grammar} />
          )}

          {/* TAB 8: PDF REPORT */}
          {activeTab === "report" && analysisReport && (
            <ReportTab report={analysisReport} />
          )}
        </main>
      </div>
    </div>
  );
}
