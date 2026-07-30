import { CompleteAnalysisReport } from "@/types";

export function generateReportHtml(report: CompleteAnalysisReport): string {
  const { parsedResume, jobDescription, atsScore, jobMatch, skillsGap, aiSuggestions, grammar } = report;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AI Resume Audit Report - ${parsedResume.contact.name}</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      margin: 0;
      padding: 32px;
      background: #ffffff;
    }
    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header h1 { margin: 0; font-size: 24px; color: #0f172a; }
    .header p { margin: 4px 0 0 0; font-size: 14px; color: #64748b; }
    
    .score-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      background: #f8fafc;
    }
    .card-title { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .card-value { font-size: 32px; font-weight: 700; color: #4f46e5; margin: 8px 0; }
    
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      margin: 2px 4px 2px 0;
    }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-amber { background: #fef3c7; color: #92400e; }
    .badge-red { background: #fee2e2; color: #991b1b; }

    ul { margin: 8px 0; padding-left: 20px; }
    li { margin-bottom: 6px; font-size: 13px; }

    .action-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #4f46e5;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
    }
  </style>
</head>
<body>

  <button onclick="window.print()" class="action-btn no-print">🖨️ Download / Print PDF</button>

  <div class="header">
    <div>
      <h1>ATS Resume & Job Match Audit Report</h1>
      <p>Candidate: <strong>${parsedResume.contact.name}</strong> (${parsedResume.contact.email})</p>
    </div>
    <div style="text-align: right;">
      <p style="font-size: 12px; color: #94a3b8;">Generated on ${new Date().toLocaleDateString()}</p>
      <p style="font-size: 12px; font-weight: 600; color: #4f46e5;">AI Resume Analyzer MVP</p>
    </div>
  </div>

  <div class="score-cards">
    <div class="card">
      <div class="card-title">Overall ATS Score</div>
      <div class="card-value" style="color: ${atsScore.overallScore >= 80 ? '#16a34a' : atsScore.overallScore >= 60 ? '#d97706' : '#dc2626'};">
        ${atsScore.overallScore}/100 <span style="font-size: 18px; font-weight: 500;">(Grade ${atsScore.grade})</span>
      </div>
      <p style="font-size: 12px; color: #64748b; margin: 0;">Evaluation of 5 core ATS pillars</p>
    </div>

    <div class="card">
      <div class="card-title">Job Match Similarity</div>
      <div class="card-value">${jobMatch.hasJd && jobMatch.matchPercentage !== null ? `${jobMatch.matchPercentage}%` : 'Not Calculated'}</div>
      <p style="font-size: 12px; color: #64748b; margin: 0;">${jobMatch.hasJd ? 'TF-IDF Cosine Similarity Vector Math' : 'Requires Job Description'}</p>
    </div>

    <div class="card">
      <div class="card-title">Readability Index</div>
      <div class="card-value" style="color: #2563eb;">${grammar.readabilityScore}/100</div>
      <p style="font-size: 12px; color: #64748b; margin: 0;">${grammar.readabilityGrade}</p>
    </div>
  </div>

  ${report.pdfQuality ? `
  <div class="section-title">PDF & Document Parsing Quality Report (Parsing Risk: ${report.pdfQuality.overallRisk})</div>
  <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; margin-bottom: 16px;">
    <p style="margin: 0 0 6px 0;"><strong>File Type:</strong> ${report.pdfQuality.fileType} | <strong>File Size:</strong> ${report.pdfQuality.fileSize} | <strong>Page Count:</strong> ${report.pdfQuality.pageCount}</p>
    <p style="margin: 0 0 6px 0;"><strong>Text Stream:</strong> Successful | <strong>Extracted Word Count:</strong> ${report.pdfQuality.extractedWordCount} words</p>
    <p style="margin: 0 0 6px 0;"><strong>Hyperlinks:</strong> ${report.pdfQuality.hasHyperlinks} | <strong>Unusual Formatting:</strong> ${report.pdfQuality.unusualFormatting}</p>
    <p style="margin: 0 0 6px 0;"><strong>Tables & Layout:</strong> ${report.pdfQuality.tablesOrComplexLayout} | <strong>Multi-Column Risk:</strong> ${report.pdfQuality.multiColumnParsingRisk}</p>
    <p style="margin: 0;"><strong>Scanned PDF Risk:</strong> ${report.pdfQuality.scannedPdfRisk} | <strong>ATS Extraction Quality:</strong> ${report.pdfQuality.atsTextExtractionQuality}</p>
  </div>
  ` : ''}

  <div class="section-title">Critical ATS Fixes & Action Items</div>
  <ul>
    ${atsScore.criticalFixes.map(fix => `<li style="color: #b91c1c; font-weight: 600;">⚠️ ${fix}</li>`).join("")}
  </ul>

  <div class="section-title">Skills Gap & Keyword Comparison</div>
  <p><strong>Matched Skills:</strong></p>
  <div>
    ${jobMatch.matchingSkills.map(s => `<span class="badge badge-green">✓ ${s}</span>`).join("")}
  </div>

  <p style="margin-top: 12px;"><strong>Missing Skills Required:</strong></p>
  <div>
    ${jobMatch.missingSkills.length > 0
      ? jobMatch.missingSkills.map(s => `<span class="badge badge-red">✗ ${s}</span>`).join("")
      : '<span class="badge badge-green">None! All key skills present.</span>'}
  </div>

  <div class="section-title">Top AI Bullet Point Rewrites</div>
  <ul>
    ${aiSuggestions.bulletRewrites.slice(0, 3).map(b => `
      <li style="margin-bottom: 12px;">
        <div style="color: #64748b; font-size: 12px;">Original: "${b.original}"</div>
        <div style="color: #15803d; font-weight: 600; margin-top: 2px;">Improved: "${b.improved}"</div>
        <div style="color: #475569; font-size: 11px; italic; margin-top: 2px;">Rationale: ${b.rationale}</div>
      </li>
    `).join("")}
  </ul>

  <div class="section-title">Executive Summary Enhancement</div>
  <p style="background: #f1f5f9; padding: 12px; border-left: 4px solid #4f46e5; border-radius: 4px; font-style: italic; font-size: 13px;">
    "${aiSuggestions.enhancedSummary}"
  </p>

</body>
</html>
  `;
}
export function downloadReportAsPdf(report: CompleteAnalysisReport) {
  const html = generateReportHtml(report);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
