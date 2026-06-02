import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function LandingPage() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    if (reduceMotion) return () => lenis?.destroy();

    const ctx = gsap.context(() => {
      gsap.from(".navbar", {
        y: -28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.utils.toArray(".section-shell").forEach((section) => {
        const title = section.querySelector(".section-eyebrow, .section-title, .section-copy");
        const cards = section.querySelectorAll(".motion-card, .step-card, .pricing-card, .depo-card, .faq-item, .info-card");

        if (title) {
          gsap.from(section.querySelectorAll(".section-eyebrow, .section-title, .section-copy"), {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 60,
            scale: 0.94,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          });
        }
      });

      gsap.to(".ambient-orb.one", {
        y: 80,
        x: 30,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ambient-orb.two", {
        y: -70,
        x: -40,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="site-ambient" aria-hidden="true">
        <span className="ambient-orb one" />
        <span className="ambient-orb two" />
        <span className="ambient-grid" />
      </div>
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
