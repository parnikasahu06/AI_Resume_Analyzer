"use client";

import React from "react";
import {
  Home,
  FileText,
  Target,
  Search,
  Sparkles,
  Award,
  CheckSquare,
  Printer,
  Lock,
} from "lucide-react";

export type TabType =
  | "home"
  | "summary"
  | "ats"
  | "match"
  | "skills"
  | "ai"
  | "grammar"
  | "report";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  hasAnalysis: boolean;
}

export const NAV_ITEMS = [
  { id: "home", label: "Home / Upload", icon: Home, reqAnalysis: false },
  { id: "summary", label: "Resume Summary", icon: FileText, reqAnalysis: true },
  { id: "ats", label: "ATS Score", icon: Target, reqAnalysis: true },
  { id: "match", label: "Job Match", icon: Search, reqAnalysis: true },
  { id: "skills", label: "Skills Gap", icon: Award, reqAnalysis: true },
  { id: "ai", label: "AI Suggestions", icon: Sparkles, reqAnalysis: true },
  { id: "grammar", label: "Grammar Check", icon: CheckSquare, reqAnalysis: true },
  { id: "report", label: "PDF Quality Report", icon: Printer, reqAnalysis: true },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  hasAnalysis,
}) => {
  return (
    <aside className="hidden md:block w-56 shrink-0 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 p-4 space-y-1">
      <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Navigation
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isDisabled = tab.reqAnalysis && !hasAnalysis;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && setActiveTab(tab.id as TabType)}
              disabled={isDisabled}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/20 font-semibold"
                  : isDisabled
                  ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.reqAnalysis && !hasAnalysis && (
                <Lock className="ml-auto h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
