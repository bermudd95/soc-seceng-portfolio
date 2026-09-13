import React from "react";
import {
  FileText,
  Download,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  ExternalLink,
} from "lucide-react";

export default function ResumeModule() {
  const resumeUrl = "/Danny_Bermudez_Resume.pdf";
const handleViewRaw = (e: React.MouseEvent) => {
  e.preventDefault();
  // Opens the PDF asset directly in a dedicated inline preview window
  const pdfWindow = window.open(resumeUrl, "_blank");
  if (pdfWindow) {
    pdfWindow.focus();
  }
};

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-soc-card border border-soc-border p-6 rounded-xl gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-6 h-6 text-soc-cyan" />
            <span>Curriculum Vitae</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Danny Bermudez — Cybersecurity Engineer & Detection Specialist
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
       <a
  href={resumeUrl}
  onClick={handleViewRaw}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center space-x-2 px-4 py-2.5 bg-black/50 hover:bg-slate-800 border border-soc-border text-slate-300 rounded-lg transition"
>
  <ExternalLink className="w-4 h-4 text-soc-cyan" />
  <span>View Raw File</span>
</a>
          <a
            href={resumeUrl}
            download
            className="flex items-center space-x-2 px-4 py-2.5 bg-soc-emerald hover:bg-soc-emerald/90 text-slate-950 font-bold rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Styled Native Resume Document View */}
      <div className="bg-soc-card border border-soc-border p-6 sm:p-10 rounded-xl space-y-8 shadow-2xl">
        {/* Header Summary */}
        <section className="border-b border-soc-border/60 pb-6">
          <h2 className="text-xl font-bold text-white">Danny Bermudez</h2>
          <p className="text-soc-cyan font-mono text-xs mt-1">
            Mountlake Terrace, WA | bermudd95@icloud.com | (747) 228-4581
          </p>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Cybersecurity engineer with 7+ years bridging SOC operations, detection engineering, and full-stack development. Writes custom KQL/EQL detection rules mapped to MITRE ATT&CK while triaging 50–80+ daily security events across 150+ facilities.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Detection & SIEM:</span> Elastic Security, Kibana, Defender, GuardDuty, KQL, EQL, Sysmon, Sigma, MITRE ATT&CK
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Languages & Dev:</span> Python, TypeScript, Bash, PowerShell, SQL, React, Next.js, Node.js, REST APIs, Git
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-6">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Professional Experience
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">SOC Operator — Amazon (contracted via SIS)</span>
                <span className="font-mono text-soc-cyan text-xs">June 2023 – Present</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Reduced incident response time by 66% triaging 50–80+ events per shift with sub-5-minute MTTD.</li>
                <li>Eliminated 35% of false positives by correlating access control telemetry, surveillance, and system logs.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Cybersecurity Developer — Purdue University Global</span>
                <span className="font-mono text-soc-cyan text-xs">May 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Resolved 20+ lab environment issues per semester while authoring 15+ custom KQL/EQL detection rules.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications & Education */}
        <section className="space-y-3 border-t border-soc-border/60 pt-6">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Education & Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <div className="font-bold text-white">CompTIA Security+ ce</div>
              <p className="text-slate-400 font-mono text-[11px] mt-0.5">ID: COMP001023116540</p>
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <div className="font-bold text-white">B.S. Cybersecurity — Purdue University Global</div>
              <p className="text-slate-400 text-[11px] mt-0.5">GPA: 3.96 | Expected Graduation: Jan 2027</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}