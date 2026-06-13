import { useEffect } from "react";
import gsap from "gsap";
import ScrollMagic from "scrollmagic";
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

    const setupScrollReveal = () => {
      const revealGroups = [
        document.querySelectorAll(".services .motion-card"),
        document.querySelectorAll(".how-works .motion-card"),
        document.querySelectorAll(".team-section .motion-card"),
        document.querySelectorAll(".benefits .motion-card"),
        document.querySelectorAll(".pricing .motion-card"),
        document.querySelectorAll(".depoimentos .motion-card"),
      ];
      const iaRevealItems = document.querySelectorAll(".ai-section > .ai-shell > .ai-card");
      const revealItems = [];

      revealGroups.forEach((group) => {
        group.forEach((item, index) => {
          item.classList.add("scroll-reveal");
          item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
          revealItems.push(item);
        });
      });

      iaRevealItems.forEach((item) => {
        item.classList.add("scroll-reveal-left");
        revealItems.push(item);
      });

      const revealNow = (item) => item.classList.add("is-visible");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      });

      revealItems.forEach((item) => observer.observe(item));

      return () => {
        observer.disconnect();
        revealItems.forEach((item) => {
          item.classList.remove("scroll-reveal", "scroll-reveal-left", "is-visible");
          item.style.removeProperty("--reveal-delay");
        });
      };
    };

    const cleanupScrollReveal = setupScrollReveal();

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
        cleanupScrollReveal();
        if (rafId) cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }

    const controller = new ScrollMagic.Controller();
    const scenes = [];
    const pinnedTimelines = [];
    const createdElements = [];
    const updateScrollMagic = () => controller.update(true);

    lenis?.on("scroll", updateScrollMagic);

    const createPinnedCardsAnimation = (sectionSelector, cardSelector) => {
      const section = document.querySelector(sectionSelector);
      const cards = section?.querySelectorAll(cardSelector);

      if (!section || !cards?.length) return;

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        scale: 0.96,
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
      });

      const timeline = gsap.timeline();
      timeline.pause();

      cards.forEach((card) => {
        timeline.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      const scene = new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.06,
        duration: Math.max(cards.length * 430, 900),
      })
        .setPin(section, { pushFollowers: true })
        .on("progress", (event) => timeline.progress(event.progress))
        .addTo(controller);

      scenes.push(scene);
      pinnedTimelines.push(timeline);
    };

    const createDroneScrollAnimation = () => {
      const drone = document.querySelector(".drone-unit");
      const droneImage = drone?.querySelector(".drone-image");
      const hero = document.querySelector(".hero");
      const services = document.querySelector("#servicos");

      if (!drone || !droneImage || !hero || !services) return;

      const droneRect = drone.getBoundingClientRect();
      const servicesRect = services.getBoundingClientRect();
      const initialX = droneRect.left;
      const initialY = droneRect.top;
      const targetX = Math.min(
        servicesRect.right - droneRect.width * 0.66,
        window.innerWidth - droneRect.width * 0.66 - Math.min(window.innerWidth * 0.035, 48)
      );
      const targetY = Math.min(window.innerHeight * 0.3, 220);
      const targetScale = window.innerWidth < 1120 ? 0.68 : 0.58;
      const scrollDrone = document.createElement("img");

      scrollDrone.src = droneImage.getAttribute("src");
      scrollDrone.alt = "";
      scrollDrone.className = "scroll-drone";
      scrollDrone.setAttribute("aria-hidden", "true");
      document.body.appendChild(scrollDrone);
      createdElements.push(scrollDrone);

      gsap.set(drone, { autoAlpha: 0 });
      gsap.set(scrollDrone, {
        top: initialY,
        left: initialX,
        width: droneRect.width,
        height: droneRect.height,
        transformOrigin: "50% 20%",
        willChange: "transform, opacity",
      });

      const timeline = gsap.timeline();
      timeline.pause();

      timeline.to(scrollDrone, {
        x: targetX - initialX,
        y: targetY - initialY,
        scale: targetScale,
        rotation: 7,
        ease: "none",
      });

      const scene = new ScrollMagic.Scene({
        triggerElement: hero,
        triggerHook: 0,
        duration: Math.max(services.offsetTop - hero.offsetTop + window.innerHeight * 0.22, window.innerHeight * 1.25),
      })
        .on("progress", (event) => timeline.progress(event.progress))
        .addTo(controller);

      scenes.push(scene);
      pinnedTimelines.push(timeline);
    };

    const ctx = gsap.context(() => {
      gsap.from(".navbar", {
        y: -28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.utils.toArray(".section-shell").forEach((section) => {
        const headerItems = section.querySelectorAll(".section-eyebrow, .section-title, .section-copy");
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

      createDroneScrollAnimation();
      createPinnedCardsAnimation("#servicos", ".feature-card");
      createPinnedCardsAnimation("#sobre", ".step-card");
      createPinnedCardsAnimation("#desenvolvedores", ".team-card");
      createPinnedCardsAnimation("#planos", ".pricing-card");
      createPinnedCardsAnimation("#depoimentos", ".depo-card");

      ScrollTrigger.refresh();
    });

    return () => {
      scenes.forEach((scene) => scene.destroy(true));
      pinnedTimelines.forEach((timeline) => timeline.kill());
      createdElements.forEach((element) => element.remove());
      lenis?.off?.("scroll", updateScrollMagic);
      controller.destroy(true);
      ctx.revert();
      cleanupScrollReveal();
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
