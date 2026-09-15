import React, { useState } from 'react';
import { Activity, ShieldAlert, ExternalLink, Globe, Search, RefreshCw, Cpu } from 'lucide-react';

interface ThreatFeedItem {
  cveId: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  epssScore: number;
  kevStatus: boolean;
  cvssV3: number;
  mitreTactic: string;
  description: string;
  iocs: {
    ipAddresses: string[];
    fileHashes: string[];
  };
}

const initialFeeds: ThreatFeedItem[] = [
  {
    cveId: 'CVE-2024-3400',
    vendorProject: 'Palo Alto Networks',
    product: 'PAN-OS',
    vulnerabilityName: 'Command Injection Vulnerability in GlobalProtect',
    dateAdded: '2024-04-12',
    epssScore: 0.968,
    kevStatus: true,
    cvssV3: 10.0,
    mitreTactic: 'Initial Access / T1190',
    description: 'A command injection vulnerability in the GlobalProtect feature of Palo Alto Networks PAN-OS software enables an unauthenticated attacker to execute arbitrary code with root privileges on the firewall.',
    iocs: {
      ipAddresses: ['198.51.100.12', '203.0.113.99'],
      fileHashes: ['b3a1f8c2e9d401a87b6e123456789abc', '4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b']
    }
  },
  {
    cveId: 'CVE-2023-4966',
    vendorProject: 'Citrix',
    product: 'NetScaler ADC & NetScaler Gateway',
    vulnerabilityName: 'Sensitive Information Disclosure (Citrix Bleed)',
    dateAdded: '2023-10-10',
    epssScore: 0.952,
    kevStatus: true,
    cvssV3: 9.4,
    mitreTactic: 'Credential Access / T1539',
    description: 'Unauthenticated buffer over-read allows unauthorized access to sensitive session tokens, enabling session hijacking past MFA enforcement.',
    iocs: {
      ipAddresses: ['192.0.2.45', '198.51.100.230'],
      fileHashes: ['8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d']
    }
  },
  {
    cveId: 'CVE-2023-34362',
    vendorProject: 'Progress',
    product: 'MOVEit Transfer',
    vulnerabilityName: 'SQL Injection Vulnerability',
    dateAdded: '2023-06-02',
    epssScore: 0.974,
    kevStatus: true,
    cvssV3: 9.8,
    mitreTactic: 'Exploitation for Privilege Escalation / T1068',
    description: 'SQL injection vulnerability in the MOVEit Transfer web application could allow an unauthenticated attacker to gain access to MOVEit Transfer database.',
    iocs: {
      ipAddresses: ['203.0.113.5', '198.51.100.77'],
      fileHashes: ['1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d']
    }
  }
];

export default function ApexIntelModule() {
  const [threats] = useState<ThreatFeedItem[]>(initialFeeds);
  const [selectedThreat, setSelectedThreat] = useState<ThreatFeedItem>(initialFeeds[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreats = threats.filter(
    (t) =>
      t.cveId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vendorProject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-soc-amber font-mono text-xs mb-1">
            <Activity className="w-4 h-4" />
            <span>CTI_ENGINE / APEX_INTEL_FEED</span>
          </div>
          <h2 className="text-xl font-bold text-white">ApexIntel Threat Intelligence Engine</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time Threat Intelligence aggregation ingesting CISA Known Exploited Vulnerabilities (KEV), FIRST EPSS probability scores, and IOC telemetry feeds.
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
        <div className="flex items-center space-x-2 bg-soc-bg border border-soc-border px-3 py-2 rounded-lg font-mono text-xs">
          <Globe className="w-4 h-4 text-soc-amber" />
          <span className="text-slate-300">Feed Status:</span>
          <span className="text-soc-amber font-bold">CISA KEV Sync Active</span>
        </div>
      </div>

      {/* Main Grid: Search & Intel Stream + Detailed Intel Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & CVE Feed Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search CVE, Vendor, or Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-soc-card border border-soc-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-soc-amber font-mono"
            />
          </div>

          <div className="space-y-3">
            {filteredThreats.map((threat) => {
              const isSelected = selectedThreat.cveId === threat.cveId;
              return (
                <div
                  key={threat.cveId}
                  onClick={() => setSelectedThreat(threat)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-soc-card border-soc-amber shadow-md shadow-soc-amber/10'
                      : 'bg-soc-card/60 border-soc-border hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-soc-amber font-bold">{threat.cveId}</span>
                    <span className="px-2 py-0.5 rounded font-bold bg-soc-rose/20 text-soc-rose border border-soc-rose/30">
                      CVSS {threat.cvssV3}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm">{threat.vendorProject} - {threat.product}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1 truncate">{threat.vulnerabilityName}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Intel Details Workspace */}
        <div className="lg:col-span-7 bg-soc-card border border-soc-border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-soc-border pb-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-soc-amber font-mono uppercase">{selectedThreat.mitreTactic}</span>
                <span className="text-xs text-slate-500 font-mono">Added: {selectedThreat.dateAdded}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{selectedThreat.cveId}: {selectedThreat.vulnerabilityName}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{selectedThreat.description}</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-soc-bg border border-soc-border p-3 rounded-lg text-center">
                <div className="text-xs text-slate-500 font-mono">CVSS V3 Score</div>
                <div className="text-lg font-bold text-soc-rose font-mono mt-1">{selectedThreat.cvssV3} / 10</div>
              </div>
              <div className="bg-soc-bg border border-soc-border p-3 rounded-lg text-center">
                <div className="text-xs text-slate-500 font-mono">EPSS Probability</div>
                <div className="text-lg font-bold text-soc-amber font-mono mt-1">{(selectedThreat.epssScore * 100).toFixed(1)}%</div>
              </div>
              <div className="bg-soc-bg border border-soc-border p-3 rounded-lg text-center">
                <div className="text-xs text-slate-500 font-mono">CISA KEV Status</div>
                <div className="text-xs font-bold text-soc-emerald font-mono mt-2 uppercase">Confirmed Exploited</div>
              </div>
            </div>

            {/* IOC List Section */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Associated Indicators of Compromise (IOCs)</h4>
              <div className="bg-black/80 rounded-lg p-4 font-mono text-xs border border-soc-border space-y-3">
                <div>
                  <span className="text-soc-amber block mb-1">Known Malicious IPs:</span>
                  <div className="text-slate-300 space-y-1">
                    {selectedThreat.iocs.ipAddresses.map((ip) => (
                      <div key={ip}>• {ip}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-soc-amber block mb-1">File Hashes (SHA-256 / MD5):</span>
                  <div className="text-slate-300 space-y-1">
                    {selectedThreat.iocs.fileHashes.map((hash) => (
                      <div key={hash} className="truncate">• {hash}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-soc-border flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Cpu className="w-4 h-4 text-soc-amber" />
              <span>STIX / TAXII 2.1 Format Ready</span>
            </span>
            <a
              href={`https://nvd.nist.gov/vuln/detail/${selectedThreat.cveId}`}
              target="_blank"
              rel="noreferrer"
              className="text-soc-amber hover:underline flex items-center space-x-1"
            >
              <span>NVD Entry</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}