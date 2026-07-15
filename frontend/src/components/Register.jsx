import React, { useState } from "react";
import axios from "axios";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "../hooks/use-toast";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const statusOptions = [
  "Student",
  "Working Professional",
  "Founder / Entrepreneur",
  "Job Seeker",
  "Other",
];
const familiarityOptions = ["Beginner", "Intermediate", "Advanced", "Not Used Yet"];
const reasonOptions = [
  "Career Security",
  "Productivity",
  "Automation",
  "Business Decision-Making",
  "Career Transition",
  "Exploring The Applied AI Programme",
];
const interestOptions = ["Yes", "Maybe", "No"];

function Radio({ label, checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all text-[13.5px] w-full ${
        checked
          ? "radio-selected text-white"
          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.04]"
      }`}
    >
      <span
        className={`h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          checked ? "border-cyan-300" : "border-slate-500"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />}
      </span>
      <span>{label}</span>
    </button>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="block text-[10.5px] tracking-[0.22em] uppercase text-cyan-300/90 font-medium mb-2">
      {children}
    </label>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    status: "",
    familiarity: "",
    reason: "",
    interest: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const required = ["fullName", "email", "phone", "city", "status", "familiarity", "reason", "interest"];
    for (const k of required) {
      if (!form[k] || String(form[k]).trim() === "") {
        return "Please fill out all required fields.";
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.agree) return "Please agree to receive webinar details.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast({ title: "Almost there", description: err });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/register`, {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        current_status: form.status,
        ai_familiarity: form.familiarity,
        attend_reason: form.reason,
        interested_in_programme: form.interest,
        consent: form.agree,
      });
      if (res.data && res.data.success) {
        setSuccess(true);
        toast({
          title: "You're registered!",
          description: "Check your inbox and WhatsApp for the joining link.",
        });
      } else {
        toast({ title: "Something went wrong", description: "Please try again." });
      }
    } catch (e2) {
      const msg = e2?.response?.data?.detail || "Failed to register. Please try again.";
      toast({ title: "Registration failed", description: String(msg) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="relative py-24 lg:py-32 section-glow">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="divider-line" />
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
            Reserve Your Seat
          </span>
          <span className="divider-line" />
        </div>

        <div className="text-center">
          <h2 className="font-serif-sc text-white text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.02] font-medium">
            Free Registration.
          </h2>
          <p className="font-italic-serif text-cyan-300/95 text-[26px] sm:text-[34px] lg:text-[40px] leading-tight mt-1">
            Limited live seats.
          </p>
          <p className="mt-4 text-[14px] text-slate-400">
            Takes under 60 seconds. We'll email your confirmation.
          </p>
        </div>

        {success ? (
          <div className="mt-12 rounded-2xl card-glow p-10 text-center">
            <div className="h-14 w-14 mx-auto rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-cyan-300" />
            </div>
            <h3 className="mt-6 font-serif-sc text-white text-[28px]">You're In.</h3>
            <p className="mt-3 text-slate-300 text-[14.5px] max-w-md mx-auto">
              Your seat is reserved for the Applied AI Masterclass on{" "}
              <span className="text-white">August 3, 2026 · 12:00 PM IST</span>.
              We'll send the joining link to your email and WhatsApp.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 text-[12px] tracking-[0.2em] uppercase text-cyan-300 hover:text-cyan-200"
            >
              Register Another
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-12 rounded-2xl card-glow p-6 sm:p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <FieldLabel>Full Name *</FieldLabel>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Priya Sharma"
                  className="w-full rounded-lg bg-black/25 border border-white/10 text-white placeholder-slate-500 px-4 py-3 text-[14px] focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition"
                />
              </div>
              <div>
                <FieldLabel>Email Address *</FieldLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg bg-black/25 border border-white/10 text-white placeholder-slate-500 px-4 py-3 text-[14px] focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition"
                />
              </div>
              <div>
                <FieldLabel>WhatsApp / Mobile *</FieldLabel>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg bg-black/25 border border-white/10 text-white placeholder-slate-500 px-4 py-3 text-[14px] focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition"
                />
                <p className="mt-1.5 text-[11px] text-slate-500">We'll send the joining link here too.</p>
              </div>
              <div>
                <FieldLabel>City *</FieldLabel>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="Bengaluru"
                  className="w-full rounded-lg bg-black/25 border border-white/10 text-white placeholder-slate-500 px-4 py-3 text-[14px] focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition"
                />
              </div>
            </div>

            <div className="mt-7">
              <FieldLabel>Current Status *</FieldLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {statusOptions.map((o) => (
                  <Radio key={o} label={o} checked={form.status === o} onClick={() => update("status", o)} />
                ))}
              </div>
            </div>

            <div className="mt-7">
              <FieldLabel>AI Familiarity *</FieldLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {familiarityOptions.map((o) => (
                  <Radio
                    key={o}
                    label={o}
                    checked={form.familiarity === o}
                    onClick={() => update("familiarity", o)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-7">
              <FieldLabel>Main Reason For Attending *</FieldLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {reasonOptions.map((o) => (
                  <Radio key={o} label={o} checked={form.reason === o} onClick={() => update("reason", o)} />
                ))}
              </div>
            </div>

            <div className="mt-7">
              <FieldLabel>Interested In Applied AI Programme? *</FieldLabel>
              <div className="grid sm:grid-cols-3 gap-3">
                {interestOptions.map((o) => (
                  <Radio key={o} label={o} checked={form.interest === o} onClick={() => update("interest", o)} />
                ))}
              </div>
            </div>

            <label className="mt-7 flex items-start gap-3 cursor-pointer group">
              <span
                onClick={() => update("agree", !form.agree)}
                className={`mt-0.5 h-4 w-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition ${
                  form.agree ? "bg-cyan-300 border-cyan-300" : "border-slate-500 group-hover:border-cyan-400/50"
                }`}
              >
                {form.agree && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[13px] text-slate-300 leading-relaxed" onClick={() => update("agree", !form.agree)}>
                I agree to receive webinar details, reminders and relevant follow-up communication from Epsilon Executive Education.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-cyan-300 text-slate-900 font-semibold text-[14px] hover:bg-cyan-200 hover:shadow-[0_15px_50px_-15px_rgba(34,211,238,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Reserving...
                </>
              ) : (
                <>
                  Reserve My Seat <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-5 text-center text-[12px] text-slate-500 leading-relaxed">
              By registering you'll receive the joining link via email and WhatsApp before the session.
              You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
