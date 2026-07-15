import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Is the webinar really free?",
    a: "Yes — the masterclass is 100% free. Simply register, and we'll email you the joining link. No credit card, no hidden fees.",
  },
  {
    q: "Will there be a recording?",
    a: "Registered attendees will receive a limited-time replay after the session. However, the live Q&A and interactive elements are only available during the broadcast.",
  },
  {
    q: "Is coding experience required?",
    a: "No coding experience is required. The masterclass is designed for working professionals across roles — we'll cover practical, ready-to-use AI workflows.",
  },
  {
    q: "Who should attend?",
    a: "Working professionals, managers, founders, and job seekers who want to integrate AI into their day-to-day work and long-term career strategy.",
  },
  {
    q: "How do I join the webinar?",
    a: "Once registered, you'll receive the Zoom link via email and WhatsApp. We'll also send reminders 24 hours and 1 hour before the session.",
  },
  {
    q: "Will the Applied AI Programme be discussed?",
    a: "Yes — we'll spend the final 15 minutes walking through Epsilon's flagship Applied AI Programme, including curriculum, mentorship structure and placement support.",
  },
];

function Row({ q, a, open, onClick }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-6 group"
      >
        <span className="font-serif-sc text-white text-[18px] sm:text-[19px] pr-6">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-cyan-300 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-56 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-[14.5px] leading-relaxed text-slate-300/90">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="divider-line" />
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
            Questions
          </span>
          <span className="divider-line" />
        </div>

        <div className="text-center">
          <h2 className="font-serif-sc text-white text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.02] font-medium">
            Everything You
          </h2>
          <p className="font-italic-serif text-cyan-300/95 text-[26px] sm:text-[34px] lg:text-[40px] leading-tight mt-1">
            might be wondering.
          </p>
        </div>

        <div className="mt-12 border-t border-white/10">
          {faqs.map((f, i) => (
            <Row
              key={i}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() =>
              document.querySelector("#register").scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/40 text-cyan-300 text-[11.5px] tracking-[0.18em] uppercase hover:border-cyan-300/70 hover:bg-cyan-400/5 transition-all"
          >
            Reserve My Seat
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
