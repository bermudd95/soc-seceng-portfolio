import React, { useState } from "react";
import { Cloud, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";

export default function AWSIRModule() {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    {
      title: "1. GuardDuty Alert Ingestion",
      detail: "UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration detected on CloudTrail logs.",
    },
    {
      title: "2. CloudTrail JSON Telemetry Correlation",
      detail: "Identified anomalous API call `GetCallerIdentity` followed by `CreateAccessKey` from IP 198.51.100.45.",
    },
    {
      title: "3. Containment & Remediation",
      detail: "Applied inline deny policy to compromised IAM role, revoked active sessions, and rotated secrets via AWS CLI.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2 mb-2 font-mono">
          <Cloud className="w-5 h-5 text-soc-cyan" />
          <span>AWS GuardDuty & CloudTrail Incident Response</span>
        </h2>
        <p className="text-slate-400 text-sm">
          Interactive forensic investigation flow simulating IAM credential theft and immediate CLI mitigation.
        </p>
      </div>

      <div className="bg-soc-card border border-soc-border p-6 rounded-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-soc-border/60 font-mono text-xs">
          <span className="text-slate-400">INVESTIGATION_PROGRESS: STEP {activeStep + 1} OF {STEPS.length}</span>
          <button
            onClick={() => setActiveStep(0)}
            className="flex items-center space-x-1 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Scenario</span>
          </button>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, idx) => {
            const isCurrent = idx === activeStep;
            const isPassed = idx < activeStep;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border font-mono transition-all ${
                  isCurrent
                    ? "bg-slate-800/80 border-soc-cyan"
                    : isPassed
                    ? "bg-soc-bg border-soc-emerald/40 opacity-80"
                    : "bg-soc-bg border-soc-border/40 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    {isPassed && <CheckCircle2 className="w-4 h-4 text-soc-emerald" />}
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-mono">{step.detail}</p>
              </div>
            );
          })}
        </div>

        {activeStep < STEPS.length - 1 && (
          <button
            onClick={() => setActiveStep((prev) => prev + 1)}
            className="flex items-center space-x-2 px-4 py-2 bg-soc-cyan text-slate-950 font-bold rounded-lg text-xs font-mono hover:bg-soc-cyan/90 transition shadow-md"
          >
            <span>Execute Next Response Phase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}