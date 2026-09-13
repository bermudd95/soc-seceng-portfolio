import React, { useState } from 'react';
import { Shield, Terminal, FileText, CheckCircle2, AlertTriangle, Smartphone, ExternalLink } from 'lucide-react';

interface AlertItem {
  id: string;
  severity: 'medium' | 'high' | 'critical';
  title: string;
  detail: string;
  type: string;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    severity: 'medium',
    title: 'Unencrypted HTTP Request',
    detail: 'GET http://s3.us-west-1.wasabisys.com/alpine-archive/v3.14/community/x86/APKINDEX-v3.14-2023-05-19.tar.gz',
    type: 'Plaintext Transport'
  },
  {
    id: '2',
    severity: 'medium',
    title: 'Unencrypted HTTP Request',
    detail: 'GET http://apk.ish.app/v3.14-2023-05-19/community/x86/APKINDEX.tar.gz',
    type: 'Plaintext Transport'
  },
  {
    id: '3',
    severity: 'medium',
    title: 'Unencrypted HTTP Request',
    detail: 'GET http://majesticyoungoldjoke.neverssl.com/online',
    type: 'Captive Portal / Insecure Domain'
  },
  {
    id: '4',
    severity: 'medium',
    title: 'Unencrypted HTTP Request',
    detail: 'GET http://ocsp.r2m04.amazontrust.com/[REDACTED_OCSP_QUERY]',
    type: 'Certificate Status Check (Sanitized)'
  },
  {
    id: '5',
    severity: 'medium',
    title: 'Unencrypted HTTP Request',
    detail: 'GET http://proxy.man/ssl',
    type: 'Local Proxy Traffic'
  }
];

export default function MobileTriageModule() {
  const [alerts] = useState<AlertItem[]>(mockAlerts);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-soc-cyan font-mono text-xs mb-1">
            <Smartphone className="w-4 h-4" />
            <span>MOBILE_THREAT_TRIAGE / IOS_ALPINE_ENGINE</span>
          </div>
          <h2 className="text-xl font-bold text-white">Mobile Threat Triage Engine</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            On-device iOS network threat hunting pipeline running inside iSH (Alpine Linux user-space). Decrypts TLS flows via Proxyman, parses .HAR traffic, and generates sanitized Markdown/PDF reports.
          </p>
        </div>
        <div className="flex items-center space-x-3">
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
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-soc-card border border-soc-border p-4 rounded-xl">
          <div className="text-2xl font-bold font-mono text-soc-cyan">483</div>
          <div className="text-xs font-mono text-slate-400 uppercase mt-1">Captured Flows</div>
        </div>
        <div className="bg-soc-card border border-soc-border p-4 rounded-xl">
          <div className="text-2xl font-bold font-mono text-soc-cyan">299</div>
          <div className="text-xs font-mono text-slate-400 uppercase mt-1">Monitored Domains</div>
        </div>
        <div className="bg-soc-card border border-soc-border p-4 rounded-xl">
          <div className="text-2xl font-bold font-mono text-soc-emerald">0</div>
          <div className="text-xs font-mono text-slate-400 uppercase mt-1">Cleartext Auth Alerts</div>
        </div>
        <div className="bg-soc-card border border-soc-border p-4 rounded-xl">
          <div className="text-2xl font-bold font-mono text-soc-emerald">0</div>
          <div className="text-xs font-mono text-slate-400 uppercase mt-1">Suspicious TLD Alerts</div>
        </div>
      </div>

      {/* Findings Section */}
      <div className="bg-soc-card border border-soc-border rounded-xl p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-soc-border">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-soc-cyan" />
            <h3 className="text-base font-bold text-white font-mono">Captured Findings & Security Indicators</h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-soc-bg border border-soc-border px-2 py-1 rounded">
            Parser Output: Active
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-black/60 border border-soc-border rounded-lg p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded font-bold uppercase bg-soc-amber/20 text-soc-amber border border-soc-amber/30 text-[10px]">
                    🟡 {alert.severity}
                  </span>
                  <span className="text-white font-bold">{alert.title}</span>
                </div>
                <span className="text-slate-500 text-[10px]">{alert.type}</span>
              </div>
              <div className="p-2.5 bg-soc-bg/80 border border-soc-border rounded text-slate-300 break-all select-all">
                {alert.detail}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-soc-border flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
            <span>Sanitization: Base64 OCSP parameters stripped</span>
          </div>
          <div className="flex items-center space-x-4">
  <a
    href="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/bermudd95/mobile-threat-triage/main/samples/Mobile_Threat_Triage_Report.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-1.5 text-soc-cyan hover:underline"
  >
    <FileText className="w-3.5 h-3.5" />
    <span>View Report</span>
  </a>
  <a
    href="https://raw.githubusercontent.com/bermudd95/mobile-threat-triage/main/samples/Mobile_Threat_Triage_Report.pdf"
    download="Mobile_Threat_Triage_Report.pdf"
    className="text-slate-400 hover:text-white underline text-xs"
  >
    Download PDF
  </a>
</div>

        </div>
      </div>
    </div>
  );
}
