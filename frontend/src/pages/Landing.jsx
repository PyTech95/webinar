import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WhatYouLearn from "../components/WhatYouLearn";
import Speaker from "../components/Speaker";
import WhyAttend from "../components/WhyAttend";
import Programme from "../components/Programme";
import Register from "../components/Register";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ExitIntentModal from "../components/ExitIntentModal";

export default function Landing() {
  return (
    <main className="relative min-h-screen text-slate-100 overflow-hidden">
      <Header />
      <Hero />
      <WhatYouLearn />
      <Speaker />
      <WhyAttend />
      <Programme />
      <Register />
      <FAQ />
      <Footer />
      <ExitIntentModal />
    </main>
  );
}
