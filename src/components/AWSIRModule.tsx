import React, { useState } from 'react';
import { Cloud, ShieldAlert, Terminal, FileCode, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

interface EventStep {
  id: string;
  timestamp: string;
  eventName: string;
  eventSource: string;
  userIdentity: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitreTechnique: string;
  summary: string;
  cloudTrailJson: object;
  remediationCli: string;
}

const attackTimeline: EventStep[] = [
  {
    id: 'step-1',
    timestamp: '2026-08-08T14:22:10Z',
    eventName: 'CreateAccessKey',
    eventSource: 'iam.amazonaws.com',
    userIdentity: 'arn:aws:iam::123456789012:user/dev-admin',
    severity: 'high',
    mitreTechnique: 'T1098.001 - Account Manipulation: Additional Credentials',
    summary: 'Attacker generated a secondary access key using compromised long-term IAM user credentials to establish persistent access.',
    cloudTrailJson: {
      eventVersion: "1.08",
      userIdentity: {
        type: "IAMUser",
        principalId: "AIDAEXAMPLEUSER",
        arn: "arn:aws:iam::123456789012:user/dev-admin",
        accountId: "123456789012"
      },
      eventTime: "2026-08-08T14:22:10Z",
      eventSource: "iam.amazonaws.com",
      eventName: "CreateAccessKey",
      awsRegion: "us-east-1",
      sourceIPAddress: "198.51.100.45",
      responseElements: {
        accessKey: {
          accessKeyId: "AKIAIOSFODNN7EXAMPLE",
          status: "Active"
        }
      }
    },
    remediationCli: `aws iam update-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --status Inactive --user-name dev-admin\naws iam delete-access-key --access-key-id AKIAIOSFODNN7EXAMPLE --user-name dev-admin`
  },
  {
    id: 'step-2',
    timestamp: '2026-08-08T14:25:44Z',
    eventName: 'AttachUserPolicy',
    eventSource: 'iam.amazonaws.com',
    userIdentity: 'arn:aws:iam::123456789012:user/dev-admin',
    severity: 'critical',
    mitreTechnique: 'T1098 - Account Manipulation / Privilege Escalation',
    summary: 'Privilege escalation attempt: Attached administrator policy (AdministratorAccess) to the compromised IAM identity.',
    cloudTrailJson: {
      eventVersion: "1.08",
      eventTime: "2026-08-08T14:25:44Z",
      eventSource: "iam.amazonaws.com",
      eventName: "AttachUserPolicy",
      awsRegion: "us-east-1",
      sourceIPAddress: "198.51.100.45",
      requestParameters: {
        userName: "dev-admin",
        policyArn: "arn:aws:iam::aws:policy/AdministratorAccess"
      }
    },
    remediationCli: `aws iam detach-user-policy --user-name dev-admin --policy-arn arn:aws:iam::aws:policy/AdministratorAccess`
  },
  {
    id: 'step-3',
    timestamp: '2026-08-08T14:30:02Z',
    eventName: 'DescribeInstances',
    eventSource: 'ec2.amazonaws.com',
    userIdentity: 'arn:aws:iam::123456789012:user/dev-admin',
    severity: 'low',
    mitreTechnique: 'T1082 - System Information Discovery',
    summary: 'Reconnaissance phase: Enumerated active EC2 instances across multiple regions to identify target workloads.',
    cloudTrailJson: {
      eventVersion: "1.08",
      eventTime: "2026-08-08T14:30:02Z",
      eventSource: "ec2.amazonaws.com",
      eventName: "DescribeInstances",
      awsRegion: "us-west-2",
      sourceIPAddress: "198.51.100.45"
    },
    remediationCli: `# Execute Session Revocation to cut off active STS sessions\naws iam put-user-permissions-boundary --user-name dev-admin --permissions-boundary-arn arn:aws:iam::123456789012:policy/ExplicitDenyAll`
  }
];

export default function AWSIRModule() {
  const [selectedStep, setSelectedStep] = useState<EventStep>(attackTimeline[0]);
  const [activeTab, setActiveTab] = useState<'json' | 'remediation'>('json');

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-soc-cyan font-mono text-xs mb-1">
            <Cloud className="w-4 h-4" />
            <span>CLOUD_SECURITY_LAB / AWS_GUARDDUTY_IR</span>
          </div>
          <h2 className="text-xl font-bold text-white">AWS CloudTrail & GuardDuty Incident Response</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulated IAM credential compromise starting from a GuardDuty finding. Pivot through CloudTrail logs to map the attack sequence and execute AWS CLI containment.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-soc-bg border border-soc-border px-3 py-2 rounded-lg font-mono text-xs">
          <ShieldAlert className="w-4 h-4 text-soc-rose animate-pulse" />
          <span className="text-slate-300">Target User:</span>
          <span className="text-soc-rose font-bold">dev-admin</span>
        </div>
      </div>

      {/* Main Grid: Interactive Attack Timeline & Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Attack Sequence Steps */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider px-1">Attack Timeline & Chronology</h3>
          {attackTimeline.map((step, idx) => {
            const isSelected = selectedStep.id === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-soc-card border-soc-cyan shadow-md shadow-soc-cyan/10'
                    : 'bg-soc-card/60 border-soc-border hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-500">Step 0{idx + 1} • {step.timestamp.split('T')[1].replace('Z', '')}</span>
                  <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                    step.severity === 'critical' ? 'bg-soc-rose/20 text-soc-rose border border-soc-rose/30' :
                    step.severity === 'high' ? 'bg-soc-amber/20 text-soc-amber border border-soc-amber/30' :
                    'bg-soc-cyan/20 text-soc-cyan border border-soc-cyan/30'
                  }`}>
                    {step.severity}
                  </span>
                </div>
                <div className="font-bold text-white font-mono flex items-center justify-between">
                  <span>{step.eventName}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-soc-cyan transform translate-x-1' : 'text-slate-600'}`} />
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">{step.eventSource}</div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detail / Code Inspection Panel */}
        <div className="lg:col-span-7 bg-soc-card border border-soc-border rounded-xl p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="border-b border-soc-border pb-4 mb-4">
              <div className="text-xs text-soc-cyan font-mono mb-1">{selectedStep.mitreTechnique}</div>
              <h3 className="text-lg font-bold text-white mb-2">{selectedStep.summary}</h3>
              <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-x-4 gap-y-1">
                <span><strong className="text-slate-300">Identity:</strong> {selectedStep.userIdentity}</span>
              </div>
            </div>

            {/* Panel Tabs */}
            <div className="flex space-x-2 mb-4 border-b border-soc-border/60 pb-2">
              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeTab === 'json' ? 'bg-soc-cyan/20 text-soc-cyan border border-soc-cyan/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>CloudTrail JSON Log</span>
              </button>
              <button
                onClick={() => setActiveTab('remediation')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeTab === 'remediation' ? 'bg-soc-emerald/20 text-soc-emerald border border-soc-emerald/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>AWS CLI Containment Playbook</span>
              </button>
            </div>

            {/* Code / CLI Viewer */}
            <div className="bg-black/80 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-soc-border max-h-[320px]">
              {activeTab === 'json' ? (
                <pre className="text-slate-300">{JSON.stringify(selectedStep.cloudTrailJson, null, 2)}</pre>
              ) : (
                <pre className="text-soc-emerald">{selectedStep.remediationCli}</pre>
              )}
            </div>
          </div>

          {/* Remediation Status Indicator */}
          <div className="mt-6 pt-4 border-t border-soc-border flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-soc-emerald" />
              <span>Identity Containment Status: READY</span>
            </span>
            <span className="text-slate-500">IAM Session Isolation</span>
          </div>
        </div>

      </div>
    </div>
  );
}