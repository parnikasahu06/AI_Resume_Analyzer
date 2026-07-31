"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, FileText, Sun, Moon, Trash2, Menu, X, Lock } from "lucide-react";
import { NAV_ITEMS, TabType } from "./Sidebar";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onLoadSample: () => void;
  onClearSession?: () => void;
  hasData?: boolean;
  isAnalyzing: boolean;
  activeTab?: TabType;
  setActiveTab?: (tab: TabType) => void;
  hasAnalysis?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onLoadSample,
  onClearSession,
  hasData = false,
  isAnalyzing,
  activeTab = "home",
  setActiveTab,
  hasAnalysis = false,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling while drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleNavClick = (tabId: TabType, isDisabled: boolean) => {
    if (!isDisabled && setActiveTab) {
      setActiveTab(tabId);
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between min-w-0">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse-slow" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white tracking-tight truncate">
                  AI Resume Analyzer
                </h1>
                <span className="hidden min-[380px]:inline-flex px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 rounded-full shrink-0">
                  ATS v2.4
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400">
                In-Memory ATS Resume Optimization
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Quick Demo Button */}
            <button
              onClick={onLoadSample}
              disabled={isAnalyzing}
              className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition-all disabled:opacity-50 min-h-[38px]"
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
                className="inline-flex items-center space-x-1 px-2 py-1.5 sm:px-3 text-[11px] sm:text-xs font-bold rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/70 transition-all min-h-[38px]"
                title="Purge uploaded resume, JD text, analysis results, and browser state"
              >
                <Trash2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span className="hidden min-[360px]:inline">Clear Session</span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Mobile Navigation Menu"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer & Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="space-y-4 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  AI Resume Analyzer
                </span>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                  ATS v2.4 Navigation
                </span>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.reqAnalysis && !hasAnalysis;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id as TabType, isDisabled)}
                  disabled={isDisabled}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all min-h-[44px] ${
                    isActive
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/20 font-semibold"
                      : isDisabled
                      ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                  <span className="truncate">{tab.label}</span>
                  {tab.reqAnalysis && !hasAnalysis && (
                    <span className="ml-auto text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono shrink-0">
                      Lock
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={() => {
              onLoadSample();
              setDrawerOpen(false);
            }}
            disabled={isAnalyzing}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition-all disabled:opacity-50 min-h-[44px]"
          >
            <FileText className="h-4 w-4" />
            <span>Load Demo Resume & JD</span>
          </button>
        </div>
      </div>
    </>
  );
};
