import React from "react";
import {
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

export default function ResumeModule() {
  const resumeUrl = "/Danny_Bermudez_Resume_Revised.docx";

  const handleViewRaw = (e: React.MouseEvent) => {
    e.preventDefault();
    const docxWindow = window.open(resumeUrl, "_blank");
    if (docxWindow) {
      docxWindow.focus();
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
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Styled Native Resume Document View */}
      <div className="bg-soc-card border border-soc-border p-6 sm:p-10 rounded-xl space-y-8 shadow-2xl">
        {/* Header Summary */}
        <section className="border-b border-soc-border/60 pb-6">
          <h2 className="text-xl font-bold text-white">Danny Bermudez</h2>
          <p className="text-soc-cyan font-mono text-xs mt-1">
            Mountlake Terrace, WA | (747) 228-4581 | bermudd95@icloud.com
          </p>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Portfolio: https://soc-secengportfolio.vercel.app | LinkedIn: linkedin.com/in/danny-bermudez-81b704190 | GitHub: github.com/bermudd95
          </p>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            Cybersecurity engineer with 7+ years of combined security operations and software engineering experience, specializing in detection engineering, incident response, and security automation, built on a foundation from U.S. Navy service in systems maintenance. Builds deployed threat intelligence platforms, mobile threat hunting tools, and detection-as-code pipelines. Background in Python, React, and Node.js means I build the tooling analysts need, not just triage alerts.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Detection & SIEM:</span> Elastic Security, Kibana, Microsoft Defender, AWS GuardDuty, KQL, EQL, Sysmon, Sigma, MITRE ATT&CK
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Cloud & DevOps:</span> AWS (CloudTrail, IAM, CLI), Docker, PostgreSQL, Firebase, CI/CD, GitHub Actions
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Languages & Scripting:</span> Python, JavaScript/TypeScript, Bash, PowerShell, SQL
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60">
              <span className="text-soc-cyan">Development & Systems:</span> React, Next.js, Node.js, Express, REST APIs, Git, Linux/Windows Internals
            </div>
            <div className="bg-black/40 p-3 rounded border border-soc-border/60 sm:col-span-2">
              <span className="text-soc-cyan">Compliance & Frameworks:</span> NIST CSF 2.0, NIST SP 800-53/800-61, ISO 27001, OWASP Top 10
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-6">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Professional Experience
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Security Operations Center Operator — Amazon (contracted through SIS)</span>
                <span className="font-mono text-soc-cyan text-xs">June 2023 – Present</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Triaged 50-80+ security events per shift across 150+ facilities, maintaining 100% SLA compliance with average MTTD under 5 minutes and MTTR under 15 minutes.</li>
                <li>Improved alert triage accuracy by analyzing access control telemetry, video surveillance data, and system logs, escalating only verified high-severity threats.</li>
                <li>Translated technical findings into actionable risk assessments for site security managers and engineering teams, driving organizational threat awareness.</li>
                <li>Mentored new SOC operators on triage procedures and detection rule interpretation.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Cybersecurity Developer (Work-Study) — Purdue University Global</span>
                <span className="font-mono text-soc-cyan text-xs">May 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Diagnosed and resolved 20+ lab environment issues per semester, reducing student downtime by about 40%, while authoring custom KQL/EQL detection rules for student labs.</li>
                <li>Served as Tier 2/3 technical escalation point for virtual lab infrastructure, maintaining high system availability.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Software Engineer — Innocelf, LLC</span>
                <span className="font-mono text-soc-cyan text-xs">Feb 2022 – May 2023</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Built secure web applications across 10+ production deployments (Python, React, Node.js, SQL), embedding RBAC, MFA, and OWASP Top 10 defenses into release workflows.</li>
                <li>Implemented automated secrets scanning (.env/.gitignore pipelines) across 15+ repositories and led security requirements gathering for 5 client engagements.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Software Engineer — Freelance / Self-Employed</span>
                <span className="font-mono text-soc-cyan text-xs">Aug 2019 – Feb 2022</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Developed 12+ custom full-stack web applications with robust SQL input validation and secure authentication workflows, achieving 99.9% application uptime.</li>
                <li>Designed database schemas and optimized queries for 12 client applications, reducing average query time from 200ms to 45ms.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Asset Protection Agent — Nordstrom</span>
                <span className="font-mono text-soc-cyan text-xs">June 2019 – May 2023</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Conducted surveillance and investigations, resolving 150+ theft incidents in 2022; earned the Most Apprehensions Award for detection and response performance.</li>
                <li>Trained and mentored 3+ team members and delivered security awareness training to staff; named team MVP (2022) for performance and teamwork.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-white">Senior Loss Prevention Agent — Ross Stores</span>
                <span className="font-mono text-soc-cyan text-xs">May 2016 – June 2019</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
                <li>Led 50+ internal and external theft investigations across 4 retail locations, directly recovering $85K+ in stolen merchandise.</li>
                <li>Mentored teams on evidence collection procedures, bringing investigative rigor to digital security operations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Military Experience */}
        <section className="space-y-3 border-t border-soc-border/60 pt-6">
          <h3 className="text-sm font-mono uppercase text-soc-emerald font-bold tracking-wider">
            Military Experience
          </h3>
          <div>
            <div className="flex justify-between text-sm">
              <span className="font-bold text-white">Systems Maintenance Technician — U.S. Navy</span>
              <span className="font-mono text-soc-cyan text-xs">Mar 2014 – May 2016</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1">
              <li>Maintained and troubleshot mission-critical shipboard combat and electronic systems, achieving 95%+ system uptime in high-availability operational environments.</li>
              <li>Diagnosed hardware and network issues across fiber/copper infrastructure and performed preventive maintenance to ensure continuous operational readiness.</li>
            </ul>
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
              <p className="text-slate-400 text-[11px] mt-0.5">GPA: 3.98 | Expected Graduation: Jan 2027</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}