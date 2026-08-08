import React, { useState } from "react";
import {
	Shield,
	Terminal,
	Cloud,
	Cpu,
	FileCheck,
	Activity,
	ExternalLink,
	ChevronRight,
	Radio,
} from "lucide-react";
import AWSIRModule from './components/AWSIRModule';
import SIEMSuiteModule from './components/SIEMSuiteModule';
import ApexIntelModule from './components/ApexIntelModule';
import SentinelGRCModule from './components/SentinelGRCModule';

// Custom clean SVG icons for brand links to prevent package casing errors
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

// Define active view types
type ActiveTab =
	| "overview"
	| "aws-ir"
	| "siem-suite"
	| "apex-intel"
	| "sentinel-grc";


export default function App() {
	const [activeTab, setActiveTab] =
		useState<ActiveTab>("overview");
	const [terminalInput, setTerminalInput] = useState("");

	return (
		<div className="min-h-screen flex flex-col justify-between text-slate-200 bg-soc-bg">
			{/* Top SOC Navigation Bar */}
			<header className="sticky top-0 z-50 bg-soc-card/90 backdrop-blur-md border-b border-soc-border">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Identity / Logo */}
						<div
							className="flex items-center space-x-3 cursor-pointer"
							onClick={() =>
								setActiveTab("overview")
							}
						>
							<div className="p-2 bg-soc-cyan/10 border border-soc-cyan/30 rounded-lg text-soc-cyan">
								<Shield className="w-6 h-6" />
							</div>
							<div>
								<div className="font-bold text-white tracking-wide text-lg flex items-center space-x-2">
									<span>
										DANNY BERMUDEZ
									</span>
									<span className="text-xs bg-soc-cyan/20 text-soc-cyan px-2 py-0.5 rounded font-mono border border-soc-cyan/30">
										SOC / SEC-ENG
									</span>
								</div>
								<div className="text-xs text-slate-400 font-mono flex items-center space-x-1">
									<Radio className="w-3 h-3 text-soc-emerald animate-pulse" />
									<span>
										PORTFOLIO_ENGINE_V2.6
									</span>
								</div>
							</div>
						</div>

						{/* Navigation Tabs */}
						<nav className="hidden md:flex space-x-1 bg-soc-bg p-1 rounded-lg border border-soc-border">
							{[
								{
									id: "overview",
									label: "Overview",
									icon: Terminal,
								},
								{
									id: "aws-ir",
									label: "AWS IR Lab",
									icon: Cloud,
								},
								{
									id: "siem-suite",
									label: "SIEM Suite",
									icon: Cpu,
								},
								{
									id: "apex-intel",
									label: "ApexIntel CTI",
									icon: Activity,
								},
								{
									id: "sentinel-grc",
									label: "SentinelGRC",
									icon: FileCheck,
								},
							].map((tab) => {
								const Icon = tab.icon;
								const isActive =
									activeTab === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() =>
											setActiveTab(
												tab.id as ActiveTab,
											)
										}
										className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
											isActive
												? "bg-soc-card text-soc-cyan border border-soc-cyan/40 shadow-sm"
												: "text-slate-400 hover:text-white hover:bg-soc-card/50"
										}`}
									>
										<Icon className="w-4 h-4" />
										<span>
											{tab.label}
										</span>
									</button>
								);
							})}
						</nav>

						{/* External Links */}
						<div className="flex items-center space-x-3">
  <a
    href="https://github.com/bermudd95"
    target="_blank"
    rel="noreferrer"
    className="p-2 text-slate-400 hover:text-white hover:bg-soc-border rounded-lg transition-colors"
    title="GitHub Profile"
  >
    <GithubIcon className="w-5 h-5" />
  </a>
  <a
    href="https://linkedin.com/in/danny-bermudez-81b704190"
    target="_blank"
    rel="noreferrer"
    className="p-2 text-slate-400 hover:text-white hover:bg-soc-border rounded-lg transition-colors"
    title="LinkedIn Profile"
  >
    <LinkedinIcon className="w-5 h-5" />
  </a>
</div>
					</div>
				</div>
			</header>

			{/* Main Content Viewport */}
			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Terminal Header Banner */}
				<div className="mb-8 bg-black/60 border border-soc-border rounded-xl p-4 font-mono text-sm shadow-inner">
					<div className="flex items-center justify-between pb-2 mb-2 border-b border-soc-border/60 text-xs text-slate-500">
						<div className="flex space-x-2">
							<span className="w-3 h-3 rounded-full bg-soc-rose/80 inline-block"></span>
							<span className="w-3 h-3 rounded-full bg-soc-amber/80 inline-block"></span>
							<span className="w-3 h-3 rounded-full bg-soc-emerald/80 inline-block"></span>
						</div>
						<span>sec-ops-console --bash</span>
					</div>
					<div className="flex items-center text-soc-cyan space-x-2">
						<ChevronRight className="w-4 h-4 text-soc-emerald" />
						<span className="text-slate-400">
							ACTIVE_MODULE:
						</span>
						<span className="text-white font-bold uppercase">
							{activeTab}
						</span>
						<span className="text-xs text-slate-500 font-mono ml-auto hidden sm:inline">
							SYS_STATUS: OPTIMAL
						</span>
					</div>
				</div>

				{/* Dynamic Views */}
				{activeTab === "overview" && (
					<OverviewModule
						setActiveTab={setActiveTab}
					/>
				)}
				{activeTab === "aws-ir" && <AWSIRModule />}
				{activeTab === "siem-suite" && (
					<SIEMSuiteModule />
				)}
				{activeTab === "apex-intel" && (
					<ApexIntelModule />
				)}
				{activeTab === "sentinel-grc" && (
					<SentinelGRCModule />
				)}
			</main>

			{/* Footer */}
			<footer className="border-t border-soc-border bg-soc-card/50 py-6 text-center text-xs text-slate-500 font-mono">
				<div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
					<div>
						© {new Date().getFullYear()} Danny
						Bermudez. Engineered with Vite,
						React, TailwindCSS & Firebase.
					</div>
					<div className="flex items-center space-x-2 text-soc-emerald">
						<span className="w-2 h-2 rounded-full bg-soc-emerald animate-ping"></span>
						<span>All Systems Operational</span>
					</div>
				</div>
			</footer>
		</div>
	);
}

// Placeholder Modules (Will be replaced with full interactive implementations in Sprint 2)

function OverviewModule({
	setActiveTab,
}: {
	setActiveTab: (tab: ActiveTab) => void;
}) {
	return (
		<div className="space-y-6">
			<div className="bg-soc-card border border-soc-border p-6 rounded-xl">
				<h1 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
					<span>
						Security Operations & Engineering
						Portfolio
					</span>
				</h1>
				<p className="text-slate-400 max-w-3xl leading-relaxed">
					Welcome to my interactive security
					application. This platform showcases
					real-world threat detection engineering,
					cloud incident response workflows, live
					threat intelligence aggregation, and
					automated GRC frameworks.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{[
					{
						id: "aws-ir",
						title: "AWS GuardDuty & CloudTrail Incident Response",
						desc: "Pivoted from GuardDuty alerts to raw CloudTrail JSON logs to reconstruct attacker persistence, privilege escalation, and CLI containment.",
						badge: "Cloud IR",
						color: "border-soc-cyan/40 hover:border-soc-cyan",
					},
					{
						id: "siem-suite",
						title: "SOC Threat Detection & SIEM Analytics Suite",
						desc: "Multi-stage attack detection in Elastic Security using Sysmon, EVTX, and Linux logs mapped to MITRE ATT&CK.",
						badge: "SIEM & Detection",
						color: "border-soc-emerald/40 hover:border-soc-emerald",
					},
					{
						id: "apex-intel",
						title: "ApexIntel CTI Threat Engine",
						desc: "Real-time threat aggregator ingesting CISA KEV, EPSS exploit scoring, and VirusTotal IOC reputation feeds.",
						badge: "Threat Intel",
						color: "border-soc-amber/40 hover:border-soc-amber",
					},
					{
						id: "sentinel-grc",
						title: "SentinelGRC Security Platform",
						desc: "Multi-tenant GRC platform automating NIST CSF 2.0 and SP 800-53 control mappings with Firestore security rules.",
						badge: "GRC & AppSec",
						color: "border-purple-500/40 hover:border-purple-500",
					},
				].map((item) => (
					<div
						key={item.id}
						onClick={() =>
							setActiveTab(
								item.id as ActiveTab,
							)
						}
						className={`bg-soc-card p-6 rounded-xl border ${item.color} cursor-pointer transition-all hover:-translate-y-1 shadow-lg`}
					>
						<div className="flex justify-between items-start mb-3">
							<span className="text-xs font-mono px-2 py-1 bg-soc-bg border border-soc-border rounded text-slate-300">
								{item.badge}
							</span>
							<ExternalLink className="w-4 h-4 text-slate-500" />
						</div>
						<h3 className="text-lg font-bold text-white mb-2">
							{item.title}
						</h3>
						<p className="text-sm text-slate-400">
							{item.desc}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
