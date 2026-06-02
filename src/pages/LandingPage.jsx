// pages/LandingPage.jsx
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ServicesCard  from "../components/ServicesCard";
import ComoFunciona from "../components/HowWorks";
import Developers from "../components/Developers";
import Diferenciais from "../components/Diferential";
import Planos from "../components/Plans";
import Depoimentos from "../components/Depoiments";
import FAQ from "../components/FAQ";
import Contato from "../components/Contact";

import "../styles/LandingPage.css";

export default function LandingPage() {
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesCard />
        <ComoFunciona />
        <Developers />
        <Diferenciais />
        <Planos />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
    </>
  );
}