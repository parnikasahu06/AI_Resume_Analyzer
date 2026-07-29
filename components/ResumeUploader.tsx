"use client";

import React, { useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";

interface ResumeUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  rawText: string;
  setRawText: (text: string) => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  file,
  setFile,
  rawText,
  setRawText,
}) => {
  const [activeMode, setActiveMode] = useState<"file" | "text">("file");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (f: File) => {
    setError(null);
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const extension = f.name.substring(f.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(f.type) && ![".pdf", ".docx", ".txt"].includes(extension)) {
      setError("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <span>1. Upload Resume</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supports PDF, DOCX, or plain text format
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveMode("file")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeMode === "file"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            File Upload
          </button>
          <button
            onClick={() => setActiveMode("text")}
            className={`px-3 py-1 rounded-md transition-all ${
              activeMode === "text"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {activeMode === "file" ? (
        file ? (
          <div className="p-4 bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                {file.name.split(".").pop()}
              </div>
              <div className="truncate">
                <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB • Ready for ATS analysis
                </p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
              title="Remove File"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <label
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive
                ? "border-brand-500 bg-brand-50/60 dark:bg-brand-950/40"
                : "border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 bg-slate-50/50 dark:bg-slate-800/30"
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleChange}
              className="hidden"
            />
            <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
              <Upload className="h-6 w-6" />
            </div>
            <p className="font-semibold text-sm text-slate-900 dark:text-white">
              Click to upload or drag & drop resume
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              PDF, DOCX, or TXT (Max size 10MB)
            </p>
          </label>
        )
      ) : (
        <div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your raw resume text here (Contact, Skills, Experience, Education)..."
            rows={8}
            className="w-full p-3.5 text-xs text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-y font-mono"
          />
        </div>
      )}
    </div>
  );
};
