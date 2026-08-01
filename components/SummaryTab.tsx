"use client";

import React, { useState } from "react";
import { ParsedResume } from "@/types";
import {
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Briefcase,
  Code,
  FileCheck,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  HelpCircle,
  GraduationCap
} from "lucide-react";

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
  } = resume;

  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);

  const isStudentOrFresher = experience.length === 0;

  return (
    <div className="space-y-4 sm:space-y-5 min-w-0">
      {/* 1. Candidate Information & Professional Summary Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm min-w-0 space-y-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md shadow-brand-500/20 shrink-0">
              {contact.name ? contact.name.slice(0, 2).toUpperCase() : "CN"}
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {contact.name || "Candidate Name"}
                </h2>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>Successfully Parsed</span>
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-slate-400">
                {contact.email && (
                  <span className="inline-flex items-center space-x-1">
                    <Mail className="h-3.5 w-3.5 text-brand-500 shrink-0" />
                    <span className="break-all">{contact.email}</span>
                  </span>
                )}
                {contact.phone && (
                  <span className="inline-flex items-center space-x-1">
                    <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{contact.phone}</span>
                  </span>
                )}
                {contact.location && (
                  <span className="inline-flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span>{contact.location}</span>
                  </span>
                )}
                {contact.linkedin && (
                  <span className="inline-flex items-center space-x-1 max-w-[200px] truncate">
                    <Linkedin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{contact.linkedin}</span>
                  </span>
                )}
                {contact.github && (
                  <span className="inline-flex items-center space-x-1 max-w-[200px] truncate">
                    <Github className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">{contact.github}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800 shrink-0">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Total Word Count</span>
            <p className="text-lg sm:text-xl font-black text-brand-600 dark:text-brand-400">{resume.wordCount} words</p>
          </div>
        </div>

        {/* Professional Summary Section */}
        {summary && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Professional Summary
              </h3>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                isSummaryInferred
                  ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                  : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
              }`}>
                {isSummaryInferred ? "AI Inferred Summary" : "Extracted Summary"}
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              "{summary}"
            </div>
          </div>
        )}
      </div>

      {/* 2. Extracted Skills Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
            <Code className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 shrink-0" />
            <span>Extracted Skills ({skills.all.length})</span>
          </h3>
          <span className="text-xs font-semibold text-slate-400">Technical & Soft Skills</span>
        </div>

        <div className="space-y-3">
          {/* Technical Skills */}
          {skills.technical.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Technical Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.technical.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-lg text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {skills.soft.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Soft Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.soft.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Experience & Education Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 min-w-0">
        {/* Left Sub-Column: Work Experience & Internships */}
        <div className="space-y-4 sm:space-y-5 flex flex-col min-w-0">
          {/* Professional Work Experience Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                <span>Professional Experience</span>
              </h3>
              {isStudentOrFresher ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-full">
                  Student Profile
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400">{experience.length} entries</span>
              )}
            </div>

            <div className="space-y-3">
              {experience.length > 0 ? (
                experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500 pl-3.5 space-y-1">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{exp.role}</h4>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {exp.company} {exp.duration ? `• ${exp.duration}` : ''}
                    </p>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1.5 leading-relaxed">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-700/70 space-y-1">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    No formal work experience detected.
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Projects, internships, hackathons, research and academic work will be considered throughout the analysis.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Internships Section (If any) */}
          {internships && internships.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500 shrink-0" />
                <span>Internships & Trainee Roles ({internships.length})</span>
              </h3>
              <div className="space-y-3">
                {internships.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-indigo-500 pl-3.5 space-y-1">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{item.role}</h4>
                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {item.company} {item.duration ? `• ${item.duration}` : ''}
                    </p>
                    {item.description.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1.5 leading-relaxed">
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

          {/* Projects Section (If any) */}
          {projects && projects.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500 shrink-0" />
                <span>Key Technical Projects ({projects.length})</span>
              </h3>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="border-l-2 border-brand-500 pl-3.5 space-y-1">
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{proj.title}</h4>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 py-0.5">
                        {proj.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sub-Column: Education, Certifications & Leadership */}
        <div className="space-y-4 sm:space-y-5 flex flex-col min-w-0">
          {/* Education Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 shrink-0" />
              <span>Education & Qualifications ({education.length})</span>
            </h3>
            <div className="space-y-2.5">
              {education.length > 0 ? (
                education.map((edu, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                    <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{edu.degree}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {edu.institution} {edu.year ? `• ${edu.year}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No formal education entries detected.</p>
              )}
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0" />
              <span>Certifications</span>
            </h3>
            {certifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {certifications.map((c, i) => (
                  <div key={i} className="inline-flex items-center space-x-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80 rounded-xl text-xs font-semibold">
                    <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No certifications detected on resume.</p>
            )}
          </div>

          {/* Leadership & Responsibility (if any) */}
          {leadership && leadership.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 shrink-0" />
                <span>Leadership & Activities ({leadership.length})</span>
              </h3>
              <div className="space-y-2.5">
                {leadership.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                    <p className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">{item.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.organization} {item.duration ? `• ${item.duration}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Collapsible Additional Parsed Information */}
      {neutralItems && neutralItems.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3 min-w-0">
          <button
            type="button"
            onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-slate-400 shrink-0" />
              <h3 className="font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Additional Parsed Information ({neutralItems.length})
              </h3>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>{isMetadataExpanded ? "− Hide metadata" : "+ View additional metadata"}</span>
              {isMetadataExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>

          {isMetadataExpanded && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 animate-fadeIn">
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {neutralItems.map((item, i) => (
                  <li key={i} className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
