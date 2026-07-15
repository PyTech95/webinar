import React, { useEffect, useState, useCallback } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

const SEEN_KEY = "epsilon_exit_modal_seen_v1";
const IDLE_MS = 35000;

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openOnce = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch (_) {}
    setOpen(true);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Idle timer fallback (also triggers if user never moves toward top)
    const idleTimer = setTimeout(openOnce, IDLE_MS);

    // Exit-intent: mouse moves above the viewport
    const onMouseLeave = (e) => {
      if (e.clientY <= 0) openOnce();
    };

    // Mobile fallback: fast scroll up near top
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (lastY - y > 40 && y < 200) openOnce();
      lastY = y;
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [openOnce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  const reserve = () => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector("#register");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-28 lg:pt-24 px-4 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={close}
        tabIndex={open ? 0 : -1}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px] cursor-default"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-[560px] rounded-2xl border border-cyan-400/25 bg-gradient-to-b from-[#0b1628] to-[#080f1e] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-10px_rgba(34,211,238,0.15)] p-7 sm:p-9 transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"
        }`}
      >
        <button
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-flex items-center gap-2 pill-border px-4 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span className="text-[10.5px] tracking-[0.22em] uppercase text-cyan-200 font-medium">
            Wait &mdash; One Moment
          </span>
        </div>

        <h3
          id="exit-intent-title"
          className="mt-6 font-serif-sc text-white text-[36px] sm:text-[44px] leading-[1.05] font-medium"
        >
          Don't Leave AI
        </h3>
        <p className="mt-1 font-italic-serif text-cyan-300/95 text-[26px] sm:text-[32px] leading-tight">
          to chance.
        </p>

        <p className="mt-5 text-[14.5px] leading-relaxed text-slate-300/95 max-w-md">
          Most professionals who watch this masterclass save 5+ hours in their first
          week applying it. Your seat is still free &mdash; it takes 60 seconds.
        </p>

        <button
          onClick={reserve}
          className="group mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-cyan-300 text-slate-900 font-semibold text-[14px] hover:bg-cyan-200 hover:shadow-[0_15px_50px_-15px_rgba(34,211,238,0.6)] transition-all"
        >
          Reserve My Seat
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        <button
          onClick={close}
          className="mt-4 w-full text-center text-[12.5px] text-slate-500 hover:text-slate-300 transition"
        >
          No thanks, I'll figure AI out on my own.
        </button>
      </div>
    </div>
  );
}
