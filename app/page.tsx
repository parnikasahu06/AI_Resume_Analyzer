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
import { CompleteAnalysisReport, CandidateProfileType } from "@/types";
import { SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION_TEXT } from "@/lib/sample-data";
import { Sparkles, ArrowRight, Loader2, AlertCircle, ShieldCheck, Zap, Award, Trash2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [jdText, setJdText] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [candidateProfile, setCandidateProfile] = useState<CandidateProfileType>("not_specified");
  const [additionalContext, setAdditionalContext] = useState("");
  const [analyzedProfile, setAnalyzedProfile] = useState<CandidateProfileType | null>(null);
  const [analyzedContext, setAnalyzedContext] = useState<string | null>(null);

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

  const isProfileOutdated = !!analysisReport && analyzedProfile !== null && (
    candidateProfile !== analyzedProfile || additionalContext !== analyzedContext
  );

  const handleAnalyze = async (overrideSample = false) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();

      if (overrideSample) {
        formData.append("useSample", "true");
        formData.append("candidateProfile", candidateProfile);
        formData.append("additionalContext", additionalContext);
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

        formData.append("candidateProfile", candidateProfile);
        formData.append("additionalContext", additionalContext);
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
      setAnalyzedProfile(candidateProfile);
      setAnalyzedContext(additionalContext);
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
    setSelectedRoleId("data-analyst");
    setSelectedCategory("Data, AI & Analytics");
    setCandidateProfile("student");
    setAdditionalContext("I'm a student focusing on data analytics projects and machine learning coursework.");
    handleAnalyze(true);
  };

  const handleClearJd = () => {
    setJdText("");
    setSelectedRoleId("");
    setSelectedCategory("");
    if (analysisReport) {
      setAnalysisReport((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          jobDescription: {
            rawText: "",
            keywords: [],
            requiredSkills: [],
            preferredSkills: [],
          },
          jobMatch: {
            hasJd: false,
            matchPercentage: null,
            similarityScore: 0,
            skillsCoverage: 0,
            keywordCoverage: 0,
            matchingSkills: [],
            missingSkills: [],
            matchingKeywords: [],
            missingKeywords: [],
            relevanceSummary: "Select a target role or paste a Job Description to calculate job-specific matching.",
          },
          skillsGap: {
            hasJd: false,
            currentSkills: prev.skillsGap.currentSkills,
            requiredSkills: [],
            missingSkills: [],
            recommendedSkills: [],
          },
        };
      });
    }
  };

  const handleClearSession = () => {
    setFile(null);
    setRawText("");
    setJdText("");
    setSelectedRoleId("");
    setSelectedCategory("");
    setCandidateProfile("not_specified");
    setAdditionalContext("");
    setAnalyzedProfile(null);
    setAnalyzedContext(null);
    setAnalysisReport(null);
    setError(null);
    setActiveTab("home");

    if (typeof window !== "undefined") {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.warn("Storage purge warning:", e);
      }
    }
  };

  const hasActiveData = !!(file || rawText.trim() || jdText.trim() || analysisReport);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors max-w-full overflow-x-hidden">
      {/* Header Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLoadSample={handleLoadSample}
        onClearSession={handleClearSession}
        hasData={hasActiveData}
        isAnalyzing={isAnalyzing}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAnalysis={!!analysisReport}
      />

      {/* Main App Layout with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row min-w-0">
        {/* Navigation Drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasAnalysis={!!analysisReport}
        />

        {/* Content Area */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 overflow-y-auto min-w-0">
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

          {isProfileOutdated && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm font-medium shadow-sm">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-amber-600 animate-spin-slow shrink-0" />
                <span>Candidate profile or context changed. Run analysis again to update your results according to the new profile stage.</span>
              </div>
              <button
                onClick={() => handleAnalyze(false)}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 self-start sm:self-auto transition-all"
              >
                Re-run Analysis
              </button>
            </div>
          )}

          {/* TAB 1: HOME / UPLOAD & HERO */}
          {activeTab === "home" && (
            <div className="space-y-5 sm:space-y-8">
              {/* Hero Banner Card */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-slate-900 via-brand-950 to-indigo-950 p-5 sm:p-8 lg:p-10 text-white shadow-xl border border-brand-900/40">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-2xl space-y-3 sm:space-y-4 relative z-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-[11px] sm:text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span>Profile-Aware Candidate ATS Optimization</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    Optimize Your Resume for <span className="bg-gradient-to-r from-brand-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">Applicant Tracking Systems</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Upload your resume alongside any target Job Description. Select your career stage (Student, Intern, Experienced, Career Switcher) for fair section completeness evaluation, ATS scoring, and AI bullet rewrites.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={handleLoadSample}
                      disabled={isAnalyzing}
                      className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center space-x-2 min-h-[44px]"
                    >
                      <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                      <span>Try Instant Demo Analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Privacy Notice Banner */}
              <div className="p-4 bg-slate-900 dark:bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-300 text-xs space-y-2 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-white font-bold text-xs sm:text-sm min-w-0">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="truncate">Data Processing & Privacy Notice</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    {hasActiveData && (
                      <button
                        onClick={handleClearSession}
                        className="text-rose-400 hover:text-rose-300 font-semibold text-[11px] underline flex items-center space-x-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Clear Session Data</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsPrivacyExpanded(!isPrivacyExpanded)}
                      className="sm:hidden text-brand-400 hover:text-brand-300 font-semibold text-xs flex items-center space-x-1 px-2.5 py-1 bg-slate-800 rounded-lg min-h-[36px]"
                      aria-expanded={isPrivacyExpanded}
                    >
                      <span>{isPrivacyExpanded ? "Hide" : "View details"}</span>
                      {isPrivacyExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className={`${isPrivacyExpanded ? "block" : "hidden sm:block"}`}>
                  <p className="leading-relaxed text-slate-300 dark:text-slate-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 sm:border-transparent">
                    Uploaded resume files, extracted text, and job descriptions are processed <strong>strictly in-memory</strong> during your active session. No database, server disk storage, tracking cookies, or persistent storage are used. Candidate Profile context cannot manipulate numerical ATS scores. Use the <strong>Clear Resume / Clear Session</strong> control below at any time to purge all browser state.
                  </p>
                </div>
              </div>

              {/* Upload Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 min-w-0">
                <ResumeUploader
                  file={file}
                  setFile={setFile}
                  rawText={rawText}
                  setRawText={setRawText}
                  candidateProfile={candidateProfile}
                  setCandidateProfile={setCandidateProfile}
                  additionalContext={additionalContext}
                  setAdditionalContext={setAdditionalContext}
                />
                <JobDescriptionInput
                  jdText={jdText}
                  setJdText={setJdText}
                  selectedRoleId={selectedRoleId}
                  setSelectedRoleId={setSelectedRoleId}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onClearJd={handleClearJd}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => handleAnalyze(false)}
                  disabled={isAnalyzing || (!file && !rawText.trim())}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-98 min-h-[48px]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                      <span>Analyzing Resume & Profile Stage...</span>
                    </>
                  ) : (
                    <>
                      <span>Run AI ATS Resume Analysis</span>
                      <ArrowRight className="h-5 w-5 shrink-0" />
                    </>
                  )}
                </button>

                {hasActiveData && (
                  <button
                    onClick={handleClearSession}
                    disabled={isAnalyzing}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 font-bold text-sm rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-sm min-h-[48px]"
                  >
                    <Trash2 className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Clear Resume / Clear Session</span>
                  </button>
                )}
              </div>

              {/* Value Proposition Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5 sm:space-y-2">
                  <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-brand-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Profile-Aware ATS Engine</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Evaluates section completeness according to candidate career stage (Student, Intern, Experienced).</p>
                </div>
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5 sm:space-y-2">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">TF-IDF Vector Matching</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Uses objective vector similarity math to measure candidate-to-job alignment without stage bias.</p>
                </div>
                <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5 sm:space-y-2">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Suggestion Layer</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Generates factual, evidence-based bullet rewrites while preserving authentic candidate voice.</p>
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
