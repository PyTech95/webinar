import React from "react";
import { Brain, Workflow, GraduationCap } from "lucide-react";

const items = [
  {
    num: "01",
    icon: Brain,
    title: "AI For Smarter Business Decisions",
    body: "How professionals across industries use tools like ChatGPT, Claude, R and Python to make smarter business decisions.",
  },
  {
    num: "02",
    icon: Workflow,
    title: "Automate Your Daily Workflow",
    body: "Introducing methods to automate your daily workflow and save hours of manual effort.",
  },
  {
    num: "03",
    icon: GraduationCap,
    title: "Inside Epsilon's Applied AI Programme",
    body: "A look into Epsilon's Applied AI program — live sessions, expert mentorship, and job placement support designed for the Indian market.",
  },
];

export default function WhatYouLearn() {
  return (
    <section id="learn" className="relative py-24 lg:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="divider-line" />
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
            Agenda · 90 Minutes
          </span>
          <span className="divider-line" />
        </div>

        <h2 className="font-serif-sc text-white text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.04] font-medium max-w-3xl">
          What You Will Learn
        </h2>
        <p className="mt-2 font-italic-serif text-cyan-300/95 text-[26px] sm:text-[32px] lg:text-[38px] leading-tight">
          in this live masterclass.
        </p>

        <p className="mt-6 max-w-lg text-[15px] text-slate-400 leading-relaxed">
          Three focused takeaways. Built around the decisions and workflows you actually face at work.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              className="group relative rounded-2xl card-glow p-7 pb-8 overflow-hidden hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="absolute right-4 top-2 font-serif text-[90px] font-medium text-white/[0.045] leading-none pointer-events-none select-none"
              >
                {it.num}
              </div>

              <div className="relative flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <it.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <span className="text-[10px] tracking-[0.22em] text-slate-500">0.{i + 1}</span>
              </div>

              <h3 className="relative mt-8 font-serif-sc text-white text-[20px] leading-snug font-medium">
                {it.title}
              </h3>
              <p className="relative mt-3 text-[14px] text-slate-400 leading-relaxed">
                {it.body}
              </p>

              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
