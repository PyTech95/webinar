import React from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Logo className="h-12 w-auto" />
            <p className="mt-5 text-[13.5px] text-slate-400 max-w-md leading-relaxed">
              Epsilon Executive Education — turning technical fluency into strategic value.
              Live online cohorts for senior professionals, based in India.
            </p>
          </div>

          <div className="md:justify-self-end">
            <div className="text-[10.5px] tracking-[0.28em] uppercase text-cyan-300 font-medium mb-4">
              Reach Us
            </div>
            <ul className="space-y-3 text-[13.5px] text-slate-300">
              <li className="flex items-center gap-3">
                <Mail className="h-3.5 w-3.5 text-cyan-300" />
                <a href="mailto:admissions@epsilonexec.com" className="hover:text-cyan-300 transition">
                  admissions@epsilonexec.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-3.5 w-3.5 text-cyan-300" />
                <span>WhatsApp Us</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 text-cyan-300" />
                <span>+91 87963 39323</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 text-center">
          <p className="text-[12px] text-slate-500">
            © 2026 Epsilon Executive Education · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
