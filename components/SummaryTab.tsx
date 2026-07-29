"use client";

import React from "react";
import { ParsedResume } from "@/types";
import { User, Mail, Phone, Linkedin, Github, Award, BookOpen, Briefcase, Code, FileCheck } from "lucide-react";

interface SummaryTabProps {
  resume: ParsedResume;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({ resume }) => {
  const { contact, summary, skills, experience, education, projects, certifications, achievements } = resume;

  return (
    <div className="space-y-6">
      {/* Header Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-500/20">
              {contact.name.slice(0, 2).toUpperCase() || "CN"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>{contact.name}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap gap-3">
                {contact.email && (
                  <span className="inline-flex items-center space-x-1">
                    <Mail className="h-3.5 w-3.5 text-brand-500" />
                    <span>{contact.email}</span>
                  </span>
                )}
                {contact.phone && (
                  <span className="inline-flex items-center space-x-1">
                    <Phone className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{contact.phone}</span>
                  </span>
                )}
                {contact.linkedin && (
                  <span className="inline-flex items-center space-x-1">
                    <Linkedin className="h-3.5 w-3.5 text-blue-500" />
                    <span>{contact.linkedin}</span>
                  </span>
                )}
                {contact.github && (
                  <span className="inline-flex items-center space-x-1">
                    <Github className="h-3.5 w-3.5 text-purple-500" />
                    <span>{contact.github}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Word Count</span>
            <p className="text-2xl font-black text-brand-600 dark:text-brand-400">{resume.wordCount} words</p>
          </div>
        </div>

        {/* Executive Summary */}
        {summary && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Parsed Professional Summary</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              "{summary}"
            </p>
          </div>
        )}
      </div>

      {/* Skills Badges Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
          <Code className="h-5 w-5 text-indigo-500" />
          <span>Extracted Skills ({skills.all.length})</span>
        </h3>
        
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Technical Skills</span>
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-lg text-xs font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        {skills.soft.length > 0 && (
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Soft Skills</span>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Experience & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Experience */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-emerald-500" />
            <span>Work Experience</span>
          </h3>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-brand-500 pl-4 space-y-1">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{exp.role}</h4>
                <p className="text-xs font-medium text-brand-600 dark:text-brand-400">{exp.company} • <span className="text-slate-400">{exp.duration}</span></p>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span>Education</span>
            </h3>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{edu.degree}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{edu.institution} {edu.year ? `(${edu.year})` : ""}</p>
                </div>
              ))}
            </div>
          </div>

          {certifications.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span>Certifications</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <FileCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
