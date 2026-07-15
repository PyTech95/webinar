import React from "react";

const LOGO_URL =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_ai-bootcamp-30/artifacts/9tq02zq3_image.png";

export default function Logo({ className = "h-11 w-auto" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Epsilon Executive Education"
      className={className}
      loading="eager"
      draggable={false}
    />
  );
}
