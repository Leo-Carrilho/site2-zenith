import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaBrain, FaDownload, FaSeedling, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { label: "NDVI médio", value: "82%", tone: "strong" },
  { label: "Risco de pragas", value: "18%", tone: "soft" },
  { label: "Área mapeada", value: "4.2 km", tone: "strong" },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const magneticRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const setSlowMotion = () => {
      if (video) video.playbackRate = 0.55;
    };

    setSlowMotion();
    video?.addEventListener("loadedmetadata", setSlowMotion);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return () => video?.removeEventListener("loadedmetadata", setSlowMotion);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-kicker", { y: 28, opacity: 0, duration: 0.75 })
        .from(".hero-title", { y: 80, opacity: 0, duration: 1 }, "-=0.45")
        .from(".hero-desc", { y: 32, opacity: 0, duration: 0.85 }, "-=0.5")
        .from(".hero-actions", { y: 28, opacity: 0, duration: 0.75 }, "-=0.45")
        .from(".hero-stat", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.35")
        .from(".drone-monitor", { x: 70, scale: 0.94, opacity: 0, duration: 1 }, "-=0.75")
        .from(".floating-chip", { y: 40, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.45");

      gsap.to(".drone-monitor", {
        y: -22,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 36,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray(".count").forEach((el) => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 1.8,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: ".hero-stats",
            start: "top 82%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${el.dataset.prefix || ""}${Math.round(Number(el.innerText))}${suffix}`;
          },
        });
      });
    }, heroRef);

    const button = magneticRef.current;
    const onMove = (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(button, { x: x * 0.18, y: y * 0.18, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, .35)" });

    button?.addEventListener("mousemove", onMove);
    button?.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      video?.removeEventListener("loadedmetadata", setSlowMotion);
      button?.removeEventListener("mousemove", onMove);
      button?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleInstall = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    window.location.href = isAndroid || isIOS
      ? "https://instalacao-mobile.vercel.app"
      : "https://Zenith-desketop.vercel.app";
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg-video" aria-hidden="true">
        <video autoPlay muted loop playsInline ref={videoRef}>
          <source src="/assets/videos/videoDrone.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="pulse-dot" />
            <FaSeedling />
            Plataforma agro inteligente
          </div>

          <h1 className="hero-title">
            Sua precisão agrícola no ponto mais alto
          </h1>

          <p className="hero-desc">
            O Zenith Agro une drones, visão computacional e relatórios acionáveis para antecipar riscos,
            reduzir desperdícios e transformar dados da lavoura em decisões confiáveis.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary magnetic" onClick={handleInstall} ref={magneticRef} type="button">
              <FaDownload /> Baixar App
            </button>
            <a href="https://zenith-desktop2.vercel.app" className="btn btn-secondary">
              Acessar plataforma <FaArrowRight />
            </a>
            <a href="https://wa.me/5519999999999" className="btn btn-whatsapp">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          <div className="hero-stats" aria-label="Indicadores Zenith Agro">
            <div className="hero-stat">
              <strong><span className="count" data-prefix="+" data-target="500" />+500 ha</strong>
              <span>monitorados</span>
            </div>
            <div className="hero-stat">
              <strong><span className="count" data-target="98" data-suffix="%" />95%</strong>
              <span>precisão da IA</span>
            </div>
            <div className="hero-stat">
              <strong><span className="count" data-prefix="-" data-target="35" data-suffix="%" />-35%</strong>
              <span>custos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Mockup do dashboard Zenith Agro">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="floating-chip chip-yield">
            <span className="mini-spark" />
            <div>
              <span>Produtividade</span>
              <strong>+32% na safra</strong>
            </div>
          </div>
          <div className="drone-monitor" aria-hidden="true">
            <div className="sky-grid" />
            <span className="flight-arc" />
            <span className="signal-dot dot-one" />
            <span className="signal-dot dot-two" />
            <span className="signal-dot dot-three" />
            <div className="drone-unit">
              <img src="/assets/images/drone-hero.png" alt="" className="drone-image" />
              <span className="drone-sensor" />
            </div>
            <span className="drone-shadow" />

            <div className="scan-cone">
              <span className="scan-band band-one" />
              <span className="scan-band band-two" />
              <span className="scan-band band-three" />
            </div>

            <div className="crop-field">
              <span className="field-row row-one" />
              <span className="field-row row-two" />
              <span className="field-row row-three" />
              <span className="field-row row-four" />
              {Array.from({ length: 28 }, (_, index) => (
                <span className={`soy-plant plant-${index + 1}`} key={`soy-plant-${index + 1}`} />
              ))}
              <span className="field-hotspot hotspot-one" />
              <span className="field-hotspot hotspot-two" />
              <span className="field-hotspot hotspot-three" />
              <span className="scan-target scan-target-one" />
              <span className="scan-target scan-target-two" />
            </div>

            <div className="drone-data data-main">
              <span>{METRICS[0].label}</span>
              <strong>{METRICS[0].value}</strong>
            </div>
            <div className="drone-data data-risk">
              <span>{METRICS[1].label}</span>
              <strong>{METRICS[1].value}</strong>
            </div>
            <div className="drone-data data-area">
              <span>{METRICS[2].label}</span>
              <strong>{METRICS[2].value}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
