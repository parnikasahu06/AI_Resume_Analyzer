"use client";

import React from "react";
import { ParsedResume } from "@/types";
import { User, Mail, Phone, Linkedin, Github, Award, BookOpen, Briefcase, Code, FileCheck, Users, Sparkles, HelpCircle } from "lucide-react";

interface SummaryTabProps {
  resume: ParsedResume;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({ resume }) => {
  const {
    contact,
    summary,
    isSummaryInferred,
    skills,
    experience,
    isExperienceInferred,
    internships,
    leadership,
    extracurricular,
    neutralItems,
    education,
    projects,
    certifications,
    achievements,
  } = resume;

  return (
    <div className="space-y-5 sm:space-y-6 min-w-0">
      {/* Header Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg shadow-brand-500/20 shrink-0">
              {contact.name.slice(0, 2).toUpperCase() || "CN"}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2 truncate">
                <span className="truncate">{contact.name}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap gap-2 sm:gap-3 break-all">
                {contact.email && (
                  <span className="inline-flex items-center space-x-1 max-w-full">
                    <Mail className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    <span className="break-all">{contact.email}</span>
                  </span>
                )}
                {contact.phone && (
                  <span className="inline-flex items-center space-x-1 shrink-0">
                    <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{contact.phone}</span>
                  </span>
                )}
                {contact.linkedin && (
                  <span className="inline-flex items-center space-x-1 max-w-full">
                    <Linkedin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{contact.linkedin}</span>
                  </span>
                )}
                {contact.github && (
                  <span className="inline-flex items-center space-x-1 max-w-full">
                    <Github className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">{contact.github}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Word Count</span>
            <p className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">{resume.wordCount} words</p>
          </div>
        </div>

        {/* Executive Summary with Provenance Badge */}
        {summary && (
          <div className="mt-5 sm:mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parsed Professional Summary</h3>
              <span className={`self-start sm:self-auto px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                isSummaryInferred
                  ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300"
                  : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
              }`}>
                {isSummaryInferred ? "AI Inferred Summary" : "Extracted from Resume"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-800/40 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 break-words">
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

      {/* Experience, Internships, Leadership, Extracurricular Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professional Work Experience */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-emerald-500" />
              <span>Professional Experience ({experience.length})</span>
            </h3>
            {isExperienceInferred && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded">
                Demo Fallback
              </span>
            )}
          </div>
          <div className="space-y-4">
            {experience.length > 0 ? (
              experience.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-emerald-500 pl-4 space-y-1">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{exp.role}</h4>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{exp.company} {exp.duration ? `• ${exp.duration}` : ''}</p>
                  {exp.description.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No formal professional work experience entries detected.</p>
            )}
          </div>
        </div>

        {/* Internships Section (if any) */}
        {internships && internships.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-indigo-500" />
              <span>Internships & Trainee Roles ({internships.length})</span>
            </h3>
            <div className="space-y-4">
              {internships.map((item, idx) => (
                <div key={idx} className="border-l-2 border-indigo-500 pl-4 space-y-1">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{item.role}</h4>
                  <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{item.company} {item.duration ? `• ${item.duration}` : ''}</p>
                  {item.description.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                      {item.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership & Positions of Responsibility */}
        {leadership && leadership.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-amber-500" />
              <span>Leadership & Responsibility ({leadership.length})</span>
            </h3>
            <div className="space-y-4">
              {leadership.map((item, idx) => (
                <div key={idx} className="border-l-2 border-amber-500 pl-4 space-y-1">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{item.role}</h4>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">{item.organization} {item.duration ? `• ${item.duration}` : ''}</p>
                  {item.description.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                      {item.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extracurricular Activities */}
        {extracurricular && extracurricular.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span>Extracurricular Activities ({extracurricular.length})</span>
            </h3>
            <div className="space-y-3">
              {extracurricular.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</p>
                  {item.organization && <p className="text-xs text-slate-500 dark:text-slate-400">{item.organization}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Neutral / Uncategorized Extracted Notes (if any) */}
        {neutralItems && neutralItems.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3 col-span-1 md:col-span-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2 text-slate-500">
              <HelpCircle className="h-4 w-4" />
              <span>Other Extracted Lines ({neutralItems.length})</span>
            </h3>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 italic">
              {neutralItems.slice(0, 6).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
