import React from "react";
import {
  Shield,
  Award,
  Layers,
  MapPin,
  CheckCircle2,
  FileCode2,
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
              <span className="text-soc-cyan font-mono">SOC Operations & SecOps</span>
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
          Cybersecurity engineer bridging SOC operations, detection engineering, 
          and software development. Triaging 50–80+ daily security events across 150+ facilities with 
          sub-5-minute MTTD. My software background in Python, React, and Node.js allows me to build 
          the custom detection-as-code tooling analysts need, rather than just triaging alerts.
        </p>
      </div>

      {/* Career Narrative Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-soc-cyan font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <Shield className="w-5 h-5 text-soc-cyan" />
            <span>01 // SOC OPERATIONS & TRIAGE</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            As a SOC Operator at Amazon (via SIS), I maintain a 100% SLA compliance rate across 150+ facilities, 
            reducing response times by 66% and eliminating 35% of false positives through log, telemetry, 
            and surveillance correlation.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Sub-5 min MTTD & Sub-15 min MTTR operational benchmarks</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>50–80+ daily security event triages across enterprise facilities</span>
            </li>
          </ul>
        </div>

        <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-4">
          <div className="flex items-center space-x-3 text-soc-emerald font-bold font-mono text-sm border-b border-soc-border/40 pb-3">
            <FileCode2 className="w-5 h-5 text-soc-emerald" />
            <span>02 // SECDEV & LAB INFRASTRUCTURE</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            At Purdue University Global and Innocelf, I author custom KQL/EQL detection rules for virtual 
            labs while engineering production web applications embedded with RBAC, MFA, and OWASP Top 10 defenses.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Tier 2/3 escalation lead maintaining lab availability</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Secrets scanning pipelines & zero critical vulnerabilities at launch</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-soc-cyan font-mono">Detection & SIEM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elastic Security, Kibana, Microsoft Defender, AWS GuardDuty, KQL, EQL, Sysmon, Sigma, MITRE ATT&CK.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-soc-emerald font-mono">Development & Cloud</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Python, TypeScript, Bash, PowerShell, React, Next.js, Node.js, AWS CLI, Docker, PostgreSQL, Firebase.
            </p>
          </div>

          <div className="bg-black/40 border border-soc-border/60 p-4 rounded-lg space-y-2">
            <h3 className="text-sm font-bold text-purple-400 font-mono">Governance & Frameworks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              NIST CSF 2.0, NIST SP 800-53/800-61, ISO 27001, OWASP Top 10, Role-Based Access Controls (RBAC).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}