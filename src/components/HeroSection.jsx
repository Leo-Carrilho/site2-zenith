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

const BARS = [
  { label: "Vitalidade", pct: 82 },
  { label: "Umidade", pct: 67 },
  { label: "Irrigação", pct: 74 },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const magneticRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-kicker", { y: 28, opacity: 0, duration: 0.75 })
        .from(".hero-title", { y: 80, opacity: 0, duration: 1 }, "-=0.45")
        .from(".hero-desc", { y: 32, opacity: 0, duration: 0.85 }, "-=0.5")
        .from(".hero-actions", { y: 28, opacity: 0, duration: 0.75 }, "-=0.45")
        .from(".hero-stat", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.35")
        .from(".dashboard-card", { x: 70, scale: 0.94, opacity: 0, duration: 1 }, "-=0.75")
        .from(".floating-chip", { y: 40, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.45");

      gsap.to(".dashboard-card", {
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
        <video autoPlay muted loop playsInline>
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
            IA para impulsionar pequenos e médios produtores rurais
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
            <a href="https://wa.me/5519999999999" className="btn btn-ghost">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          <div className="hero-stats" aria-label="Indicadores Zenith Agro">
            <div className="hero-stat">
              <strong><span className="count" data-prefix="+" data-target="500" /> ha</strong>
              <span>monitorados</span>
            </div>
            <div className="hero-stat">
              <strong><span className="count" data-target="98" data-suffix="%" /></strong>
              <span>precisão da IA</span>
            </div>
            <div className="hero-stat">
              <strong><span className="count" data-prefix="-" data-target="35" data-suffix="%" /></strong>
              <span>menos custos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Mockup do dashboard Zenith Agro">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="floating-chip chip-alert">
            <FaBrain />
            <div>
              <span>Alerta IA</span>
              <strong>Talhão 03 estável</strong>
            </div>
          </div>
          <div className="floating-chip chip-yield">
            <span className="mini-spark" />
            <div>
              <span>Produtividade</span>
              <strong>+32% na safra</strong>
            </div>
          </div>

          <div className="dashboard-card motion-card">
            <div className="dashboard-top">
              <div>
                <span>Zenith Command</span>
                <strong>Missão Agro 04</strong>
              </div>
              <div className="status-pill">Ao vivo</div>
            </div>

            <div className="field-map">
              <div className="scan-line" />
              <span className="map-pin one" />
              <span className="map-pin two" />
              <span className="map-pin three" />
              <p>Mapa inteligente da lavoura</p>
            </div>

            <div className="metric-grid">
              {METRICS.map((metric) => (
                <div className={`metric-card ${metric.tone}`} key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="analysis-list">
              {BARS.map((bar) => (
                <div className="analysis-row" key={bar.label}>
                  <div>
                    <span>{bar.label}</span>
                    <strong>{bar.pct}%</strong>
                  </div>
                  <div className="bar-track">
                    <span style={{ width: `${bar.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
