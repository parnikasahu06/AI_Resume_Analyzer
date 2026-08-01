"use client";

import React, { useState, useMemo } from "react";
import { Briefcase, Sparkles, X, Search, Trash2, Filter, Check, Layers } from "lucide-react";
import { JOB_CATEGORIES, JOB_PRESETS, POPULAR_ROLES, JobPreset } from "@/lib/jobPresets";

interface JobDescriptionInputProps {
  jdText: string;
  setJdText: (text: string) => void;
  selectedRoleId?: string;
  setSelectedRoleId?: (roleId: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
  onClearJd?: () => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jdText,
  setJdText,
  selectedRoleId = "",
  setSelectedRoleId,
  selectedCategory = "",
  setSelectedCategory,
  onClearJd,
}) => {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter presets based on selected category & search query
  const filteredPresets = useMemo(() => {
    return JOB_PRESETS.filter((preset) => {
      const matchesCategory =
        !selectedCategory || selectedCategory === "all" || preset.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        preset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Active selected role object
  const currentPreset = useMemo(() => {
    return JOB_PRESETS.find((p) => p.id === selectedRoleId);
  }, [selectedRoleId]);

  const handleSelectRole = (preset: JobPreset) => {
    setJdText(preset.description);
    if (setSelectedRoleId) setSelectedRoleId(preset.id);
    if (setSelectedCategory) setSelectedCategory(preset.category);
  };

  const handleClear = () => {
    setJdText("");
    if (setSelectedRoleId) setSelectedRoleId("");
    if (setSelectedCategory) setSelectedCategory("");
    setSearchQuery("");
    if (onClearJd) onClearJd();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
      {/* Header Row */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>2. Target Job Description</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose a target role from our library or paste a custom job description.
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium self-start xs:self-auto shrink-0">
          <button
            onClick={() => setActiveTab("preset")}
            className={`px-3 py-1 rounded-md transition-all min-h-[36px] ${
              activeTab === "preset"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Role Library
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-3 py-1 rounded-md transition-all min-h-[36px] ${
              activeTab === "custom"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Custom JD
          </button>
        </div>
      </div>

      {/* Preset Role Library Selectors */}
      {activeTab === "preset" && (
        <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          {/* Category & Role Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Category Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Select Job Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    const newCat = e.target.value;
                    if (setSelectedCategory) setSelectedCategory(newCat);
                    // Reset role if it doesn't belong to selected category
                    if (
                      newCat &&
                      newCat !== "all" &&
                      currentPreset &&
                      currentPreset.category !== newCat
                    ) {
                      if (setSelectedRoleId) setSelectedRoleId("");
                    }
                  }}
                  className="w-full p-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer min-h-[40px]"
                >
                  <option value="">All Job Categories (8 Domains)</option>
                  {JOB_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Filter className="h-3.5 w-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Target Role Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                Select Target Role ({filteredPresets.length} available)
              </label>
              <div className="relative">
                <select
                  value={selectedRoleId}
                  onChange={(e) => {
                    const preset = JOB_PRESETS.find((p) => p.id === e.target.value);
                    if (preset) handleSelectRole(preset);
                  }}
                  className="w-full p-2.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer min-h-[40px]"
                >
                  <option value="">-- Choose Target Role --</option>
                  {filteredPresets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.title} ({preset.category})
                    </option>
                  ))}
                </select>
                <Layers className="h-3.5 w-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Role Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job role (e.g., 'Data Analyst', 'Security', 'Manager')..."
              className="w-full pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all min-h-[36px]"
            />
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Select Popular Roles Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Popular Target Roles
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_ROLES.map((roleId) => {
                const preset = JOB_PRESETS.find((p) => p.id === roleId);
                if (!preset) return null;
                const isSelected = selectedRoleId === preset.id;

                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectRole(preset)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-all flex items-center space-x-1 min-h-[32px] ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{preset.title}</span>
                    {isSelected && <Check className="h-3 w-3 shrink-0 ml-0.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Role Banner / Clear Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2 min-w-0">
          {currentPreset ? (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold truncate max-w-full">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
              <span className="truncate">
                Loaded Target: <strong>{currentPreset.title}</strong> ({currentPreset.category})
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium italic">
              {jdText.trim()
                ? "Custom Job Description loaded (Editable)"
                : "No target role selected"}
            </span>
          )}
        </div>

        {/* Clear JD Button */}
        {jdText.trim() && (
          <button
            onClick={handleClear}
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-all self-start sm:self-auto min-h-[32px] shrink-0"
            title="Clear job description text and role selection"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
            <span>Clear Job Description</span>
          </button>
        )}
      </div>

      {/* Editable Textarea */}
      <div className="w-full min-w-0 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Job Description Content (Always Editable):</span>
          <span>{jdText.trim() ? `${jdText.trim().split(/\s+/).length} words` : "0 words"}</span>
        </div>
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste Job Description requirements, responsibilities, and key tech stack here..."
          rows={4}
          className="w-full p-3.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-y min-w-0 leading-relaxed font-mono min-h-[140px]"
        />
      </div>
    </div>
  );
};
