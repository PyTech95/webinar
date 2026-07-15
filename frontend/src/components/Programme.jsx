import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const points = [
  "Live Instructor-Led Sessions with senior cohorts",
  "1:1 Expert Mentorship and weekly office hours",
  "Industry Projects you can defend in interviews",
  "Job Placement Support across India",
  "Practical AI Applications, not theory dumps",
  "Designed specifically for the Indian market",
];

export default function Programme() {
  return (
    <section id="programme" className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="divider-line" />
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
            Beyond The Webinar
          </span>
          <span className="divider-line" />
        </div>

        <h2 className="font-serif-sc text-white text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.02] font-medium">
          Go Beyond
        </h2>
        <p className="mt-1 font-italic-serif text-cyan-300/95 text-[26px] sm:text-[34px] lg:text-[40px] leading-tight">
          the webinar.
        </p>

        <p className="mt-6 max-w-2xl text-[15px] text-slate-300/90 leading-relaxed">
          The masterclass is a preview. Epsilon's flagship Applied AI Programme is built for
          professionals who need to make AI useful inside real organisations.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          {points.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl card-glow px-4 py-3.5 hover:border-cyan-400/30 hover:-translate-y-0.5 transition-all"
            >
              <div className="h-7 w-7 rounded-full bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
              </div>
              <span className="text-[13.5px] text-slate-200">{p}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() =>
              document.querySelector("#register").scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-300 text-slate-900 font-medium text-[13px] hover:bg-cyan-200 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] transition-all"
          >
            Learn More During The Webinar
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
