import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "What You'll Learn", href: "#learn" },
  { label: "Speaker", href: "#speaker" },
  { label: "Programme", href: "#programme" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#060d1c]/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group" aria-label="Epsilon Executive Education">
          <Logo className="h-11 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[11.5px] tracking-[0.18em] uppercase text-slate-300 hover:text-cyan-300 transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("#register")}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/40 text-cyan-300 hover:text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/5 transition-all text-[11.5px] tracking-[0.18em] uppercase font-medium"
          >
            Reserve My Seat <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            className="lg:hidden text-slate-200 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[#060d1c]/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-[12px] tracking-[0.16em] uppercase text-slate-300 hover:text-cyan-300 py-2"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#register")}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-cyan-400/50 text-cyan-300 text-[11.5px] tracking-[0.18em] uppercase"
            >
              Reserve My Seat <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
