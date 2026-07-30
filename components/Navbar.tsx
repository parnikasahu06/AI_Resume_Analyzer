"use client";

import React from "react";
import { Sparkles, FileText, Sun, Moon, Trash2, ShieldCheck } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onLoadSample: () => void;
  onClearSession?: () => void;
  hasData?: boolean;
  isAnalyzing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onLoadSample,
  onClearSession,
  hasData = false,
  isAnalyzing,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Sparkles className="h-5 w-5 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                AI Resume Analyzer
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 rounded-full">
                ATS v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In-Memory ATS Resume Optimization
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Demo Button */}
          <button
            onClick={onLoadSample}
            disabled={isAnalyzing}
            className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition-all disabled:opacity-50"
            title="Load sample resume and job description to quickly test the application"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Load Demo Resume & JD</span>
          </button>

          {/* Clear Session Control Button */}
          {hasData && onClearSession && (
            <button
              onClick={onClearSession}
              disabled={isAnalyzing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/70 transition-all"
              title="Purge uploaded resume, JD text, analysis results, and browser state"
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-500" />
              <span>Clear Session</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
