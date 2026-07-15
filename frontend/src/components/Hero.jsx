import React from "react";
import { ArrowRight, Calendar, Clock, Sparkles, GraduationCap, Building2, LineChart, Radio } from "lucide-react";
import Countdown from "./Countdown";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 grain-overlay">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-cyan-500/[0.04] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
        {/* Left copy */}
        <div className="fade-up">
          <div className="inline-flex items-center gap-2 pill-border px-4 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            <span className="text-[10.5px] tracking-[0.22em] uppercase text-cyan-200 font-medium">
              Live Masterclass · Limited Seats
            </span>
          </div>

          <h1 className="mt-8 font-serif-sc text-white leading-[1.02] text-[46px] sm:text-[58px] lg:text-[72px] font-medium">
            Stop Worrying<br />
            About<br />
            AI Replacing You.
          </h1>
          <p className="mt-4 font-italic-serif text-cyan-300/95 text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.15]">
            Start using it to secure your career.
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-300/90">
            Join global professor and Chief Data Scientist{" "}
            <span className="text-white font-medium">Kent Oliver Bhupathi</span>{" "}
            (formerly NYU &amp; Columbia University) for an exclusive live masterclass on
            practical AI skills professionals can use immediately.
          </p>

          <div className="mt-8">
            <button
              onClick={() => scrollTo("#register")}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-300 text-slate-900 font-medium text-[13px] tracking-wide hover:bg-cyan-200 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] transition-all"
            >
              Reserve My Seat
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Right details card */}
        <div className="relative fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative rounded-2xl card-glow p-7 lg:p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span className="text-[10.5px] tracking-[0.22em] uppercase text-cyan-200 font-medium">
                  Webinar Details
                </span>
              </div>
              <span className="text-[10px] tracking-[0.22em] uppercase text-cyan-300 border border-cyan-400/40 rounded-full px-3 py-1 bg-cyan-500/5">
                Free
              </span>
            </div>

            <h3 className="mt-5 font-serif-sc text-white text-[26px] leading-tight font-medium">
              The Applied AI Masterclass
            </h3>
            <p className="mt-2 text-[13px] text-slate-400">
              A live, interactive 90-minute session with Q&amp;A.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-[10px] tracking-[0.22em] uppercase">Date</span>
                </div>
                <p className="mt-1.5 text-white text-[15px]">August 3, 2026</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-[10px] tracking-[0.22em] uppercase">Time</span>
                </div>
                <p className="mt-1.5 text-white text-[15px]">12:00 PM IST</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/5 bg-black/25 p-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-2">
                Starts In
              </div>
              <Countdown />
            </div>

            <button
              onClick={() => scrollTo("#register")}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-900 font-medium text-[13px] hover:bg-cyan-100 hover:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.5)] transition-all"
            >
              Save My Seat <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Glow decorations */}
          <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10 blur-2xl" />
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative mt-16 lg:mt-20 border-t border-b border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-slate-400">
          {[
            { icon: GraduationCap, label: "Former NYU Faculty" },
            { icon: GraduationCap, label: "Former Columbia Faculty" },
            { icon: LineChart, label: "Chief Data Scientist" },
            { icon: Building2, label: "15+ Years Industry" },
            { icon: Radio, label: "Live Interactive" },
          ].map((t, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <t.icon className="h-3.5 w-3.5 text-cyan-300/80" />
              <span className="text-[11px] tracking-[0.18em] uppercase">{t.label}</span>
              {idx < 4 && <span className="hidden md:inline text-cyan-400/40 ml-6">·</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
