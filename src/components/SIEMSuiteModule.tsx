import React, { useState, useMemo } from "react";
import { Terminal, Search, Filter, AlertTriangle } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  eventCode: number;
  source: string;
  ruleName: string;
  mitreTechnique: string;
  severity: "low" | "medium" | "high" | "critical";
}

const MOCK_LOGS: LogEntry[] = [
  {
    id: "evt-001",
    timestamp: "2026-09-13 10:14:22",
    eventCode: 4625,
    source: "WinEventLog:Security",
    ruleName: "SSH / RDP Brute Force Attempt",
    mitreTechnique: "T1110.001",
    severity: "high",
  },
  {
    id: "evt-002",
    timestamp: "2026-09-13 10:18:05",
    eventCode: 1,
    source: "Sysmon",
    ruleName: "Suspicious PowerShell Execution EncodedCommand",
    mitreTechnique: "T1059.001",
    severity: "critical",
  },
];

export default function SIEMSuiteModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  // Defensive filtering prevents breaking on undefined strings
  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter((log) => {
      const matchesSearch =
        (log.ruleName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (log.mitreTechnique?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (log.source?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      const matchesSeverity =
        selectedSeverity === "all" || log.severity === selectedSeverity;

      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, selectedSeverity]);

  return (
    <div className="space-y-6">
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2 mb-2 font-mono">
          <Terminal className="w-5 h-5 text-soc-emerald" />
          <span>SOC Threat Detection & SIEM Analytics Suite</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Multi-stage attack detection correlated across Windows Sysmon, Security EVTX, and Linux auditd telemetry.
        </p>
      </div>

      {/* Control Panel */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/40 p-4 border border-soc-border rounded-xl">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search MITRE, Rule, Source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-soc-card border border-soc-border rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-soc-cyan"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto font-mono text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-soc-card border border-soc-border text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-soc-cyan"
          >
            <option value="all">All Severities</option>
            <option value="critical font-bold">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Log Feed Table / List */}
      <div className="bg-soc-card border border-soc-border rounded-xl overflow-hidden shadow-xl">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-sm">
            <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-soc-amber" />
            No telemetry records matched your active filters.
          </div>
        ) : (
          <div className="divide-y divide-soc-border/60">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-800/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2 py-0.5 bg-soc-bg border border-soc-border rounded text-soc-cyan">
                      {log.mitreTechnique}
                    </span>
                    <span className="text-sm font-bold text-white font-mono">{log.ruleName}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Source: {log.source} | EventID: {log.eventCode} | Time: {log.timestamp}
                  </div>
                </div>

                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded border self-start sm:self-center uppercase font-bold ${
                    log.severity === "critical"
                      ? "bg-red-950/60 border-red-500/50 text-red-400"
                      : "bg-amber-950/60 border-amber-500/50 text-amber-400"
                  }`}
                >
                  {log.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}