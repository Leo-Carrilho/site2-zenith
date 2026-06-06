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
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    let lenis;
    let rafId;

    if (!reduceMotion && !isMobile) {
      lenis = new Lenis({
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    if (reduceMotion || isMobile) {
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }

    const ctx = gsap.context(() => {
      gsap.from(".navbar", {
        y: -28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.utils.toArray(".section-shell").forEach((section) => {
        const headerItems = section.querySelectorAll(".section-eyebrow, .section-title, .section-copy");
        const cards = section.querySelectorAll(".motion-card, .step-card, .pricing-card, .depo-card, .faq-item, .info-card");
        const icons = section.querySelectorAll(".card-icon, .step-icon, .pricing-badge, .featured-crown");
        const probabilityPanel = section.querySelector(".probability-panel");

        if (headerItems.length) {
          gsap.from(headerItems, {
            y: isMobile ? 22 : 54,
            opacity: 0,
            clipPath: isMobile ? "none" : "inset(0 0 100% 0)",
            duration: isMobile ? 0.55 : 1,
            stagger: isMobile ? 0.06 : 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              once: true,
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: isMobile ? 18 : (index) => 54 + (index % 2) * 18,
            x: isMobile ? 0 : (index) => (index % 2 === 0 ? -18 : 18),
            rotateX: isMobile ? 0 : 8,
            scale: isMobile ? 0.98 : 0.95,
            opacity: 0,
            transformOrigin: "50% 100%",
            duration: isMobile ? 0.5 : 1,
            stagger: { amount: isMobile ? 0.12 : 0.42, from: "start" },
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          });

          if (!isMobile) {
            gsap.to(cards, {
              y: (index) => (index % 2 === 0 ? -18 : -28),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            });
          }
        }

        if (icons.length) {
          gsap.from(icons, {
            scale: 0.72,
            rotate: -10,
            opacity: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              once: true,
            },
          });
        }

        if (probabilityPanel) {
          gsap.fromTo(probabilityPanel, {
            y: isMobile ? 28 : 260,
            opacity: 0,
            scale: isMobile ? 0.98 : 0.9,
            rotateX: isMobile ? 0 : 18,
            clipPath: isMobile ? "none" : "inset(100% 0 0 0)",
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            clipPath: "inset(0% 0 0 0)",
            transformOrigin: "50% 100%",
            duration: isMobile ? 0.55 : 1.25,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 58%",
              once: true,
            },
          });

          gsap.fromTo(probabilityPanel.querySelectorAll(".probability-row"), {
            y: 42,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.45,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 58%",
              once: true,
            },
          });
        }
      });

      if (!isMobile) {
        gsap.utils.toArray(".timeline").forEach((timeline) => {
          gsap.fromTo(timeline, { "--timeline-progress": "0%" }, {
            "--timeline-progress": "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 74%",
              end: "bottom 42%",
              scrub: 0.8,
            },
          });
        });
      }

      if (!isMobile) {
        gsap.utils.toArray(".analysis-target").forEach((target, index) => {
          gsap.to(target, {
            scale: 1.35,
            opacity: 0.35,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
            ease: "sine.inOut",
          });
        });
      }

      if (!isMobile) {
        gsap.to(".ai-card-glow", {
          yPercent: -16,
          xPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".ai-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".bento-visual span", {
          y: -18,
          rotate: 10,
          stagger: 0.12,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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

        gsap.to(".ambient-grid", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.4,
          },
        });
      }

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
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
