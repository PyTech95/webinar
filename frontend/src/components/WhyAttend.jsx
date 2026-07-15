import React, { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 92,
    suffix: "%",
    unit: "of employers",
    text: "Expect AI and information-processing technologies to transform their business by 2030.",
    source: "World Economic Forum",
  },
  {
    value: 8,
    suffix: "+",
    unit: "hours saved weekly",
    text: "Saved per week by professionals running disciplined AI workflows.",
    source: "London School of Economics",
  },
  {
    value: 5,
    suffix: "×",
    unit: "faster decisions",
    text: "Of leaders report significant improvements in decision-making with AI.",
    source: "Harvard Business Impact",
  },
];

function useCountUp(target, active, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function StatCard({ s, active }) {
  const val = useCountUp(s.value, active);
  return (
    <div className="rounded-2xl card-glow p-8 hover:border-cyan-400/30 transition-colors">
      <div className="flex items-baseline gap-1">
        <span className="font-serif text-[70px] lg:text-[86px] font-medium text-white leading-none tabular-nums">
          {val}
        </span>
        <span className="font-serif text-[42px] lg:text-[54px] text-cyan-300 font-medium">
          {s.suffix}
        </span>
      </div>
      <div className="mt-2 text-[11px] tracking-[0.2em] uppercase text-cyan-300 font-medium">
        {s.unit}
      </div>
      <p className="mt-4 text-[14px] text-slate-300/90 leading-relaxed">{s.text}</p>
      <div className="mt-6 pt-4 border-t border-white/5">
        <span className="text-[10.5px] tracking-[0.22em] uppercase text-slate-500">
          Source · {s.source}
        </span>
      </div>
    </div>
  );
}

export default function WhyAttend() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(true);
        });
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="divider-line" />
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium">
            Why Attend
          </span>
          <span className="divider-line" />
        </div>

        <h2 className="font-serif-sc text-white text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.05] font-medium max-w-3xl">
          The Cost Of Waiting
        </h2>
        <p className="mt-1 font-italic-serif text-cyan-300/95 text-[26px] sm:text-[34px] lg:text-[40px] leading-tight">
          is going up every quarter.
        </p>

        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} s={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
