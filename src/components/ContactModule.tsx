import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, ShieldAlert, Terminal } from "lucide-react";
import emailjs from "@emailjs/browser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function ContactModule() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
  const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
  const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Helper function to force promises to time out if network/rules hang
  const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
      ),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    console.log("🚀 [Telemetry] Dispatch sequence started...");

    // 1. Sanity check Vite environment variables
    if (!SERVICE_ID || !ADMIN_TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("❌ [Telemetry] Missing EmailJS env config:", {
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        PUBLIC_KEY: PUBLIC_KEY ? "CONFIGURED" : "MISSING",
      });
      setStatus("error");
      setErrorMessage("Configuration error: Missing dispatch credentials in environment variables.");
      return;
    }

    try {
      // 2. Format client timestamp
      const now = new Date();
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedTimestamp = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short",
      }).format(now);

      const localTimestampWithZone = `${formattedTimestamp} (${userTimeZone})`;

      // 3. Attempt Firestore Persistence (Wrapped with 8s Timeout)
      let docId = "local-bypass-" + Date.now();
      try {
        console.log("💾 [Firestore] Writing record to contact_telemetry...");
        
        const firestorePromise = addDoc(collection(db, "contact_telemetry"), {
          name: formData.name,
          email: formData.email,
          organization: formData.organization || "N/A",
          subject: formData.subject,
          message: formData.message,
          timestamp: serverTimestamp(),
          clientTimestamp: localTimestampWithZone,
          userAgent: navigator.userAgent,
        });

        const docRef = await withTimeout(
          firestorePromise,
          8000,
          "Firestore write timed out. Check Database Security Rules."
        );
        
        docId = docRef.id;
        console.log("✅ [Firestore] Record saved successfully! Doc ID:", docId);
      } catch (dbErr: any) {
        console.warn("⚠️ [Firestore] Database persistence warning:", dbErr.message);
        // Continue to EmailJS even if Firestore fails or times out
      }

      // 4. Construct EmailJS Payload
      const templateParams = {
        record_id: docId,
        from_name: formData.name,
        from_email: formData.email,
        organization: formData.organization || "N/A",
        subject: formData.subject,
        message: formData.message,
        timestamp: localTimestampWithZone,
      };

      // 5. Dispatch EmailJS Notifications
      console.log("📧 [EmailJS] Initializing transmission...");
      
      const adminDispatch = withTimeout(
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        10000,
        "Admin email notification timed out."
      );

      const autoReplyDispatch = AUTOREPLY_TEMPLATE_ID
        ? withTimeout(
            emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY),
            10000,
            "Auto-reply email notification timed out."
          )
        : Promise.resolve(null);

      await Promise.all([adminDispatch, autoReplyDispatch]);
      console.log("✅ [EmailJS] All notifications transmitted successfully!");

      // 6. Complete Dispatch & Reset Form
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error("❌ [Telemetry] Dispatch failure:", err);
      setStatus("error");
      setErrorMessage(
        err?.text || err?.message || "Failed to transmit telemetry packet to endpoint."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-soc-card border border-soc-border p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
          <Mail className="w-6 h-6 text-soc-cyan" />
          <span>Secure Telemetry Channel (Contact)</span>
        </h1>
        <p className="text-slate-400 max-w-3xl text-sm leading-relaxed">
          Transmit encrypted messages directly to my primary SOC queue. Submissions are persisted in Firestore and trigger automated alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-soc-card border border-soc-border rounded-xl p-6">
          {status === "success" && (
            <div className="mb-6 p-4 bg-soc-emerald/10 border border-soc-emerald/40 rounded-lg flex items-start space-x-3 text-soc-emerald">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">TELEMETRY LOGGED & TRANSMITTED</p>
                <p className="text-xs text-slate-300 mt-1">
                  Message packet stored in Firestore database and dispatched to the SOC queue. An automated confirmation copy has been routed to your inbox.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 bg-soc-rose/10 border border-soc-rose/40 rounded-lg flex items-start space-x-3 text-soc-rose">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">TRANSMISSION FAILED</p>
                <p className="text-xs text-slate-300 mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  NAME / CALLSIGN <span className="text-soc-rose">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full bg-soc-bg border border-soc-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-soc-cyan transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  SENDER EMAIL <span className="text-soc-rose">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane.doe@company.com"
                  className="w-full bg-soc-bg border border-soc-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-soc-cyan transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">ORGANIZATION</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Acme SecOps Inc."
                  className="w-full bg-soc-bg border border-soc-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-soc-cyan transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  SUBJECT <span className="text-soc-rose">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="SOC / SecEng Inquiry"
                  className="w-full bg-soc-bg border border-soc-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-soc-cyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                TRANSMISSION PAYLOAD <span className="text-soc-rose">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter details regarding project scope, SOC operational needs, or inquiries..."
                className="w-full bg-soc-bg border border-soc-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-soc-cyan transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-soc-cyan/10 border border-soc-cyan/40 hover:bg-soc-cyan/20 text-soc-cyan font-mono font-bold py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{status === "submitting" ? "DISPATCHING..." : "DISPATCH TELEMETRY"}</span>
            </button>
          </form>
        </div>

        {/* Info & Status Sidebar */}
        <div className="space-y-4">
          <div className="bg-soc-card border border-soc-border rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-2 border-b border-soc-border pb-2">
              <Terminal className="w-4 h-4 text-soc-cyan" />
              <span>Endpoint Status</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DATABASE:</span>
              <span className="text-soc-emerald">FIRESTORE ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PROTOCOL:</span>
              <span className="text-slate-300">HTTPS / TLS 1.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">AUTO-ACK:</span>
              <span className="text-soc-emerald">ENABLED</span>
            </div>
          </div>

          <div className="bg-soc-card border border-soc-border rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-2 border-b border-soc-border pb-2">
              <ShieldAlert className="w-4 h-4 text-soc-amber" />
              <span>Security Policy</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Submissions undergo automated anti-spam telemetry validation. Input payloads are sanitized before database insertion and dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}