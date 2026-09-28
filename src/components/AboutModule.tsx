import React from "react";
import {
  Shield,
  Award,
  Layers,
  MapPin,
  CheckCircle2,
  FileCode2,
  Anchor,
  Search,
} from "lucide-react";

export default function AboutModule() {
  return (
    <div className="space-y-8 text-slate-200">
      {/* Hero / Identity Banner */}
      <div className="bg-soc-card border border-soc-border p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-soc-border/60">
          <div>
            <div className="flex items-center space-x-2 text-soc-emerald font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-soc-emerald animate-pulse"></span>
              <span>OPERATOR PROFILE // DANNY BERMUDEZ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cybersecurity Engineer & Detection Specialist
            </h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-soc-cyan" />
              <span>Mountlake Terrace, WA</span>
              <span className="text-slate-600">•</span>
              <span className="text-soc-cyan font-mono">SOC Operations & Detection Engineering</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 bg-black/50 border border-soc-border rounded-lg text-soc-emerald font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-soc-emerald" />
              CompTIA Security+ ce
            </span>
            <span className="px-3 py-1.5 bg-black/50 border border-soc-border rounded-lg text-slate-300">
              B.S. Cybersecurity (3.98 GPA)
            </span>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-4xl">
          Cybersecurity engineer with 7+ years of combined security operations and software engineering experience, 
          specializing in detection engineering, incident response, and security automation, built on a foundation 
          from U.S. Navy service in systems maintenance. Builds deployed threat intelligence platforms, mobile threat 
          hunting tools, and detection-as-code pipelines. Background in Python, React, and Node.js means I build the 
          tooling analysts need, not just triage alerts.
        </p>
      </div>

      {/* Career Narrative Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 01 // SOC Operations */}
        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-soc-cyan font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <Shield className="w-5 h-5 text-soc-cyan" />
            <span>01 // SOC OPERATIONS & INCIDENT RESPONSE</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            As a SOC Operator at Amazon (via SIS), I maintain 100% SLA compliance across 150+ facilities, 
            triaging 50–80+ security events per shift with an average MTTD under 5 minutes and MTTR under 15 minutes. 
            I escalate verified high-severity threats by analyzing access control telemetry, surveillance, and logs.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Sub-5 min MTTD & Sub-15 min MTTR operational benchmarks</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Actionable risk assessments for site managers & engineering teams</span>
            </li>
          </ul>
        </div>

        {/* 02 // SecDev & Detection Engineering */}
        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-soc-emerald font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <FileCode2 className="w-5 h-5 text-soc-emerald" />
            <span>02 // SECDEV & SOFTWARE ENGINEERING</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            At Purdue University Global, Innocelf, and through freelance development, I author custom KQL/EQL 
            detection rules while engineering secure web apps across 10+ production deployments (Python, React, Node.js, SQL) 
            embedded with RBAC, MFA, OWASP Top 10 defenses, and automated secrets scanning.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Resolved 20+ lab issues per semester, reducing student downtime by ~40%</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Automated secrets scanning pipelines across 15+ repositories</span>
            </li>
          </ul>
        </div>

        {/* 03 // Physical Security & Investigations */}
        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-purple-400 font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <Search className="w-5 h-5 text-purple-400" />
            <span>03 // INVESTIGATIONS & ASSET PROTECTION</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Former Asset Protection Agent at Nordstrom and Senior Loss Prevention Agent at Ross Stores. Conducted 200+ 
            internal/external investigations, directly recovering $85K+ in assets. Brought investigative rigor, evidence collection 
            standards, and surveillance analysis directly into modern security operations.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Resolved 150+ theft incidents in 2022 (Nordstrom Most Apprehensions Award)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Named Team MVP (2022) for investigative performance and leadership</span>
            </li>
          </ul>
        </div>

        {/* 04 // Military Systems Maintenance */}
        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-amber-400 font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <Anchor className="w-5 h-5 text-amber-400" />
            <span>04 // U.S. NAVY MILITARY FOUNDATION</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Served as a Systems Maintenance Technician in the U.S. Navy, maintaining and troubleshooting mission-critical 
            shipboard combat and electronic systems. Diagnosed complex hardware and network issues across fiber/copper infrastructure 
            to ensure continuous operational readiness in high-availability environments.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Achieved 95%+ system uptime on mission-critical combat systems</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Rigorous preventive maintenance & infrastructure fault isolation</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Core Competencies Matrix */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-soc-border/40 pb-3">
          <Layers className="w-5 h-5 text-soc-cyan" />
          <span>Technical Stack & Core Disciplines</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-soc-cyan font-mono">Detection & SIEM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elastic Security, Kibana, Microsoft Defender, AWS GuardDuty, KQL, EQL, Sysmon, Sigma, MITRE ATT&CK.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-soc-emerald font-mono">Cloud & DevOps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AWS (CloudTrail, IAM, CLI), Docker, PostgreSQL, Firebase, CI/CD, GitHub Actions.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-amber-400 font-mono">Languages & Scripting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python, JavaScript/TypeScript, Bash, PowerShell, SQL.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-sky-400 font-mono">Development & Systems</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              React, Next.js, Node.js, Express, REST APIs, Git, Linux/Windows Internals.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2 sm:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold text-purple-400 font-mono">Compliance & Frameworks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              NIST CSF 2.0, NIST SP 800-53/800-61, ISO 27001, OWASP Top 10, Role-Based Access Controls (RBAC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
}