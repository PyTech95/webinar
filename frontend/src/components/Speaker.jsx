import React from "react";
import { GraduationCap, Building2, Briefcase, Award } from "lucide-react";

const credentials = [
  { icon: GraduationCap, label: "Former Faculty · New York University" },
  { icon: GraduationCap, label: "Former Faculty · Columbia University" },
  { icon: Briefcase, label: "Founder · Epsilon Executive Education" },
  { icon: Award, label: "Chief Data Scientist · Market Theory AI" },
];

export default function Speaker() {
  return (
    <section id="speaker" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        {/* Portrait */}
        <div className="relative mx-auto lg:mx-0 w-full max-w-md">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <img
              src="https://customer-assets.emergentagent.com/job_logos-11/artifacts/oimw09re_image.png"
              alt="Kent Oliver Bhupathi"
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[9.5px] tracking-[0.28em] uppercase text-cyan-300">Lead Faculty</div>
                  <div className="mt-1 font-serif-sc text-white text-[17px]">Kent O. Bhupathi</div>
                </div>
                <div className="text-right">
                  <div className="text-[9.5px] tracking-[0.28em] uppercase text-cyan-300">Experience</div>
                  <div className="mt-1 font-serif-sc text-white text-[17px]">15+ Years</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-transparent to-amber-500/10 blur-2xl" />
        </div>

        {/* Bio */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="divider-line" />
            <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
              Meet The Instructor
            </span>
            <span className="divider-line" />
          </div>

          <h2 className="font-serif-sc text-white text-[44px] sm:text-[56px] lg:text-[66px] leading-[1.02] font-medium">
            Kent Oliver
          </h2>
          <p className="font-italic-serif text-cyan-300/95 text-[36px] sm:text-[48px] lg:text-[56px] leading-none -mt-1">
            Bhupathi
          </p>

          <p className="mt-4 font-italic-serif text-slate-300 text-[17px]">
            Chief Data Scientist · Economist · Educator
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-300/90 max-w-2xl">
            <p>
              Kent is an economist and data science leader with{" "}
              <span className="text-white font-medium">15+ years</span> across marketing science,
              healthcare analytics, supply chain, BI, litigation and professional services.
              He became the youngest SVP of Data Science in the history of a "Big Six"
              marketing firm.
            </p>
            <p>
              He holds a dual degree in Economics &amp; Architecture from UT Austin and a
              Master's in Applied Econometrics from NYU. He has taught applied statistics,
              data science, machine learning and quantitative methods at NYU, Columbia and ISPP.
            </p>
          </div>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {credentials.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl card-glow px-4 py-3 hover:border-cyan-400/30 transition-colors"
              >
                <c.icon className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                <span className="text-[13px] text-slate-200">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
