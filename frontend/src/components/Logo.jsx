import React from "react";

export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <div className={`flex items-center ${className}`} aria-label="Epsilon Executive Education">
      <svg viewBox="0 0 320 80" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="eGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="48"
          fontFamily="'Cormorant Garamond', serif"
          fontWeight="600"
          fontSize="52"
          fill="url(#eGradient)"
          letterSpacing="3"
        >
          EPSILON
        </text>
        {/* Gold accent bar across the C's opening (positioned on 2nd letter area — matches source styling) */}
        <rect x="38" y="37" width="20" height="4.5" fill="#d4a574" rx="0.5" />
        <text
          x="1"
          y="70"
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="11"
          letterSpacing="6"
          fill="#e2e8f0"
        >
          EXECUTIVE EDUCATION
        </text>
      </svg>
    </div>
  );
}
