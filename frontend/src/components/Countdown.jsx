import React, { useEffect, useState } from "react";

// Target: August 2, 2026 12:00 PM IST (UTC+5:30) => 06:30 UTC
const TARGET_DATE = new Date(Date.UTC(2026, 7, 2, 6, 30, 0)).getTime();

function pad(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getRemaining() {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hrs, mins, secs };
}

export default function Countdown({ compact = false }) {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hrs },
    { label: "Min", value: time.mins },
    { label: "Sec", value: time.secs },
  ];

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3 md:gap-4"}`}>
      {items.map((it, i) => (
        <React.Fragment key={it.label}>
          <div className="flex flex-col items-center min-w-[52px]">
            <span className="font-serif text-3xl md:text-4xl font-medium text-white tabular-nums">
              {pad(it.value)}
            </span>
            <span className="mt-1 text-[9.5px] tracking-[0.22em] uppercase text-slate-400">
              {it.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="text-cyan-400/60 text-sm -mt-4">·</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
