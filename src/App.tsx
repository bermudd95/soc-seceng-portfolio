import React, { useState } from "react";
import {
  Shield,
  Terminal,
  Cloud,
  Cpu,
  FileCheck,
  Activity,
  ChevronRight,
  Menu,
  X,
  Smartphone,
  User,
  FileText,
  ExternalLink,
  Download,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
} from "lucide-react";

import AWSIRModule from "./components/AWSIRModule";
import SIEMSuiteModule from "./components/SIEMSuiteModule";
import ApexIntelModule from "./components/ApexIntelModule";
import SentinelGRCModule from "./components/SentinelGRCModule";
import MobileTriageModule from "./components/MobileTriageModule";
import ContactModule from "./components/ContactModule";
import AboutModule from "./components/AboutModule";
import ResumeModule from "./components/ResumeModule";

type ActiveTab =
  | "overview"
  | "about"
  | "mobile-triage"
  | "aws-ir"
  | "siem-suite"
  | "apex-intel"
  | "sentinel-grc"
  | "resume"
  | "contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewModule setActiveTab={handleTabChange} />;
      case "about":
        return <AboutModule />;
      case "mobile-triage":
        return <MobileTriageModule />;
      case "aws-ir":
        return <AWSIRModule />;
      case "siem-suite":
        return <SIEMSuiteModule />;
      case "apex-intel":
        return <ApexIntelModule />;
      case "sentinel-grc":
        return <SentinelGRCModule />;
      case "resume":
        return <ResumeModule />;
      case "contact":
        return <ContactModule />;
      default:
        return <OverviewModule setActiveTab={handleTabChange} />;
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: Terminal },
    { id: "about", label: "About", icon: User },
    { id: "mobile-triage", label: "Mobile Triage", icon: Smartphone },
    { id: "aws-ir", label: "AWS IR Lab", icon: Cloud },
    { id: "siem-suite", label: "SIEM Suite", icon: Cpu },
    { id: "apex-intel", label: "ApexIntel CTI", icon: Activity },
    { id: "sentinel-grc", label: "SentinelGRC", icon: FileCheck },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-200 bg-soc-bg">
      {/* Persistent Navigation Header */}
      <header className="border-b border-soc-border bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <button
            onClick={() => handleTabChange("overview")}
            className="flex items-center space-x-2 text-left group"
          >
            <div className="p-1.5 bg-soc-card border border-soc-border rounded-lg group-hover:border-soc-emerald transition">
              <Shield className="w-5 h-5 text-soc-emerald" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide block text-sm sm:text-base font-mono">
                DANNY BERMUDEZ
              </span>
              <span className="text-[10px] text-slate-400 font-mono block -mt-1">
                SEC-OPS PORTFOLIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as ActiveTab)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono transition ${
                    isActive
                      ? "bg-soc-card text-soc-cyan border border-soc-border shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-soc-card border-b border-soc-border px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as ActiveTab)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-mono rounded-md transition ${
                    isActive
                      ? "bg-slate-800 text-soc-cyan border border-soc-border"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 text-soc-cyan" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Terminal Header Banner */}
        <div className="mb-8 bg-black/60 border border-soc-border rounded-xl p-4 font-mono text-sm shadow-inner">
          <div className="flex items-center text-soc-cyan space-x-2">
            <ChevronRight className="w-4 h-4 text-soc-emerald" />
            <span className="text-slate-400">ACTIVE_MODULE:</span>
            <span className="text-white font-bold uppercase">{activeTab}</span>
          </div>
        </div>

        {/* Dynamic View Injection */}
        {renderActiveModule()}
      </main>

      {/* Footer */}
      <footer className="border-t border-soc-border bg-soc-card/50 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Danny Bermudez. Engineered with Vite, React, TailwindCSS & Firebase.
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

function OverviewModule({
  setActiveTab,
}: {
  setActiveTab: (tab: ActiveTab) => void;
}) {
  const resumeUrl = "/Danny_Bermudez_Resume.pdf";

  return (
    <div className="space-y-6">
      {/* Sharpened Headline & Value Proposition */}
      <div className="bg-soc-card border border-soc-border p-6 sm:p-8 rounded-xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-soc-border/60">
          <div>
            <div className="flex items-center space-x-2 text-soc-emerald font-mono text-xs uppercase tracking-wider mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-soc-emerald animate-pulse"></span>
              <span>Available for Opportunities</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Detection Engineer & SOC Operations Specialist
            </h1>
            <p className="text-slate-400 text-sm mt-1 flex flex-wrap items-center gap-2 font-mono">
              <span className="flex items-center gap-1 text-soc-cyan">
                <MapPin className="w-3.5 h-3.5" /> Seattle Area / Remote
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Briefcase className="w-3.5 h-3.5 text-soc-emerald" /> Seeking Detection Engineering & SecOps Roles
              </span>
            </p>
          </div>

          {/* Direct CTAs & Profiles */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <a
              href={resumeUrl}
              download
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-soc-emerald hover:bg-soc-emerald/90 text-slate-950 font-bold rounded-lg transition shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
            
            <a
              href="https://github.com/dannybermudez"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 hover:bg-slate-800 border border-soc-border rounded-lg text-slate-300 transition hover:text-white"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/danny-bermudez-81b704190"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 hover:bg-slate-800 border border-soc-border rounded-lg text-soc-cyan transition hover:text-white"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-4xl">
          I bridge SOC operations and security software development to build automated tools, 
          custom detections, and telemetry pipelines. Select a module below to explore interactive labs, 
          threat intelligence feeds, and security architecture mappings.
        </p>
      </div>

      {/* Certifications & Academic Credentials Grid */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-mono font-bold text-white tracking-wide uppercase">
            Certifications & Academic Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Security+ */}
          <div className="p-4 rounded-xl bg-soc-card border border-soc-border hover:border-soc-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  CompTIA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-semibold">
                  Active
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                CompTIA Security+
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Core Security Operations & Threat Management
            </p>
          </div>

          {/* SkillFront ISO 27001 */}
          <div className="p-4 rounded-xl bg-soc-card border border-soc-border hover:border-soc-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  SkillFront
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-semibold">
                  Active
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                ISO/IEC 27001:2022 Security Associate
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              ISMS Frameworks, Auditing & Risk Management
            </p>
          </div>

          {/* Fortinet NSE 3 */}
          <div className="p-4 rounded-xl bg-soc-card border border-soc-border hover:border-soc-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Fortinet
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-emerald-400 border-emerald-500/30 bg-emerald-500/10 font-semibold">
                  Active
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Fortinet NSE Level 3
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Network Security & Threat Landscape Coverage
            </p>
          </div>

          {/* CISSP */}
          <div className="p-4 rounded-xl bg-soc-card border border-soc-border hover:border-soc-cyan/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  (ISC)²
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-amber-400 border-amber-500/30 bg-amber-500/10 font-semibold">
                  In Progress
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                CISSP
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Target Completion: Q1 2027
            </p>
          </div>

          {/* Purdue Global Degree */}
          <div className="p-4 rounded-xl bg-soc-card border border-soc-border hover:border-soc-cyan/40 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Purdue University Global
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-soc-cyan border-soc-cyan/30 bg-soc-cyan/10 font-semibold">
                  3.96 GPA
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                B.S. in Cybersecurity
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-2">
              Focus: Network Security, Intrusion Detection, Footprinting & Security Operations • Expected Jan 2027
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Project Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[
          {
            id: "about",
            title: "Operator Profile & Background",
            desc: "Learn about my transition from physical asset protection to SOC operations, threat hunting, and detection-as-code engineering.",
            impactMetric: "Transitioned real-world asset security to digital SecOps & threat hunting.",
            badge: "About",
            color: "border-soc-cyan/40 hover:border-soc-cyan",
          },
          {
            id: "resume",
            title: "Curriculum Vitae",
            desc: "View and download my verified resume detailing SOC metrics, certifications, and technical proficiencies.",
            impactMetric: "66% faster triage, 35% FP reduction, 70% CTI time reduction.",
            badge: "Resume",
            color: "border-soc-emerald/40 hover:border-soc-emerald",
          },
          {
            id: "mobile-triage",
            title: "Mobile Threat Triage Engine",
            desc: "Zero-dependency iOS network hunting engine running inside iSH (Alpine Linux). Parses .HAR captures to isolate plaintext transport and high-risk indicators.",
            impactMetric: "480+ flows, 300+ domains; identified 12 suspicious TLDs and 3 C2 patterns.",
            badge: "Mobile IR & Traffic Analysis",
            color: "border-soc-cyan/40 hover:border-soc-cyan",
          },
          {
            id: "aws-ir",
            title: "AWS GuardDuty & CloudTrail Incident Response",
            desc: "Pivoted from GuardDuty alerts to raw CloudTrail JSON logs to reconstruct attacker persistence, privilege escalation, and CLI containment.",
            impactMetric: "Reduced credential revocation time from 20 minutes to under 30 seconds.",
            badge: "Cloud IR",
            color: "border-soc-cyan/40 hover:border-soc-cyan",
          },
          {
            id: "siem-suite",
            title: "SOC Threat Detection & SIEM Analytics Suite",
            desc: "Multi-stage attack detection in Elastic Security using Sysmon, EVTX, and Linux logs mapped to MITRE ATT&CK.",
            impactMetric: "30+ detection rules engineered; 95% coverage across 12 MITRE ATT&CK tactics.",
            badge: "SIEM & Detection",
            color: "border-soc-emerald/40 hover:border-soc-emerald",
          },
          {
            id: "apex-intel",
            title: "ApexIntel CTI Threat Engine",
            desc: "Real-time threat aggregator ingesting CISA KEV, EPSS exploit scoring, and VirusTotal IOC reputation feeds.",
            impactMetric: "Normalized 10,000+ daily IoCs; ~70% analyst enrichment time reduction.",
            badge: "Threat Intel",
            color: "border-soc-amber/40 hover:border-soc-amber",
          },
          {
            id: "sentinel-grc",
            title: "SentinelGRC Security Platform",
            desc: "Multi-tenant GRC platform automating NIST CSF 2.0 and SP 800-53 control mappings with Firestore security rules.",
            impactMetric: "150+ NIST SP 800-53 control mappings; ~60% compliance overhead reduction.",
            badge: "GRC & AppSec",
            color: "border-purple-500/40 hover:border-purple-500",
          },
          {
            id: "contact",
            title: "Secure Communication Channel",
            desc: "Direct contact form with end-to-end telemetry logging to Firestore and serverless email alerting.",
            impactMetric: "Serverless, encrypted, Firestore-backed pipeline with async fallbacks.",
            badge: "Contact",
            color: "border-soc-cyan/40 hover:border-soc-cyan",
          },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(item.id as ActiveTab)}
            className={`bg-soc-card p-6 rounded-xl border ${item.color} cursor-pointer transition-all hover:-translate-y-1 shadow-lg group flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono px-2 py-1 bg-soc-bg border border-soc-border rounded text-slate-300">
                  {item.badge}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-soc-cyan transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-soc-cyan transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{item.desc}</p>
            </div>

            {/* High-visibility impact metric callout */}
            <div className="bg-soc-bg border-l-2 border-soc-cyan p-2.5 rounded-r-md mt-2">
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-soc-cyan uppercase tracking-wider mb-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Key Operational Impact</span>
              </div>
              <p className="text-xs font-mono font-medium text-slate-200">
                {item.impactMetric}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}