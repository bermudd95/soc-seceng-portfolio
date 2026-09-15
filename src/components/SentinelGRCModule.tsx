import React, { useState } from 'react';
import { FileCheck, Shield, Lock, Layers, Code2, CheckCircle2, ExternalLink } from 'lucide-react';

interface NISTControl {
  id: string;
  family: string;
  title: string;
  framework: string;
  status: 'Compliant' | 'Audited' | 'In Progress';
  description: string;
  securityRuleSnippet: string;
}

const nistControls: NISTControl[] = [
  {
    id: 'AC-3',
    family: 'Access Control',
    title: 'Access Enforcement & Role Isolation',
    framework: 'NIST SP 800-53 Rev. 5',
    status: 'Compliant',
    description: 'Enforces tenant-level data isolation restricting document reads and writes strictly to authenticated organization principals.',
    securityRuleSnippet: `match /tenants/{tenantId}/audit_logs/{logId} {\n  allow read, write: if request.auth != null \n    && request.auth.token.tenantId == tenantId;\n}`
  },
  {
    id: 'AU-2',
    family: 'Audit and Accountability',
    title: 'Event Logging & Tamper Mitigation',
    framework: 'NIST SP 800-53 Rev. 5',
    status: 'Compliant',
    description: 'Ensures security events, policy updates, and administrative overrides generate immutable audit records.',
    securityRuleSnippet: `match /audit_events/{eventId} {\n  allow create: if request.resource.data.keys().hasAll(['timestamp', 'actor', 'action'])\n                && request.resource.data.actor == request.auth.uid;\n  allow update, delete: if false; // Immutable audit trail\n}`
  },
  {
    id: 'PR.AA-01',
    family: 'Identity Management (NIST CSF 2.0)',
    title: 'Authentication & Session Integrity',
    framework: 'NIST CSF 2.0',
    status: 'Audited',
    description: 'Requires multi-factor token verification and checks session expiration window prior to authorization.',
    securityRuleSnippet: `function isAuthenticated() {\n  return request.auth != null && request.auth.token.auth_time < request.time.seconds() - 3600;\n}`
  }
];

export default function SentinelGRCModule() {
  const [selectedControl, setSelectedControl] = useState<NISTControl>(nistControls[0]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs mb-1">
            <FileCheck className="w-4 h-4" />
            <span>GRC_ENGINE / SENTINEL_PLATFORM</span>
          </div>
          <h2 className="text-xl font-bold text-white">SentinelGRC Automated Compliance & Policy Engine</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Multi-tenant governance platform mapping real-time application security policies and Firestore access controls to NIST CSF 2.0 and SP 800-53 frameworks.
          </p>
              
        </div><div className="flex items-center space-x-3">
          <a
            href="https://github.com/bermudd95/mobile-threat-triage"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 bg-soc-bg border border-soc-border hover:border-soc-cyan px-3 py-2 rounded-lg font-mono text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-soc-cyan" />
            <span>GitHub Repository</span>
          </a>
        </div>
            
        <div className="flex items-center space-x-2 bg-soc-bg border border-soc-border px-3 py-2 rounded-lg font-mono text-xs">
          <Lock className="w-4 h-4 text-purple-400" />
          <span className="text-slate-300">Policy Mode:</span>
          <span className="text-purple-400 font-bold">Multi-Tenant Enforced</span>
        </div>
      </div>

      {/* Main Grid: NIST Control List & Rule Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: NIST Control List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider px-1">Mapped Security Controls</h3>
          {nistControls.map((control) => {
            const isSelected = selectedControl.id === control.id;
            return (
              <div
                key={control.id}
                onClick={() => setSelectedControl(control)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-soc-card border-purple-500 shadow-md shadow-purple-500/10'
                    : 'bg-soc-card/60 border-soc-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-purple-400 font-bold">{control.id} • {control.family}</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {control.status}
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{control.title}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">{control.framework}</div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Rule & Architecture Inspector */}
        <div className="lg:col-span-7 bg-soc-card border border-soc-border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-soc-border pb-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-purple-400 font-mono uppercase">{selectedControl.framework}</span>
                <span className="text-xs text-slate-500 font-mono">Control ID: {selectedControl.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{selectedControl.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedControl.description}</p>
            </div>

            {/* Code / Rule Viewer */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>Enforced AppSec Security Rules (Firestore / IAM Policy):</span>
              </div>
              <div className="bg-black/80 rounded-lg p-4 font-mono text-xs border border-soc-border max-h-[280px] overflow-x-auto">
                <pre className="text-purple-300">{selectedControl.securityRuleSnippet}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-soc-border flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Tenant Boundary Verified</span>
            </span>
            <span className="text-slate-500">Continuous Assessment</span>
          </div>
        </div>

      </div>
    </div>
  );
}