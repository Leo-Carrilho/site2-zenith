// components/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { FaDownload, FaSeedling, FaWhatsapp } from 'react-icons/fa';

const BARS = [
  { label: 'NDVI - Vitalidade', pct: 82 },
  { label: 'Solo - Umidade', pct: 67 },
  { label: 'Pragas - Risco', pct: 18 },
];

export default function HeroSection() {
  const textRef = useRef(null);
  const visualRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }

    const elements = textRef.current?.children;
    if (!elements) return;

    Array.from(elements).forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(28px)';
      element.style.transition = `opacity .9s ${index * 0.12}s cubic-bezier(.16,1,.3,1), transform .9s ${index * 0.12}s cubic-bezier(.16,1,.3,1)`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100 + index * 120);
      });
    });

    if (visualRef.current) {
      visualRef.current.style.opacity = '0';
      visualRef.current.style.transform = 'translateX(40px) scale(.96)';
      visualRef.current.style.transition = 'opacity 1.1s .5s cubic-bezier(.16,1,.3,1), transform 1.1s .5s cubic-bezier(.16,1,.3,1)';
      setTimeout(() => {
        visualRef.current.style.opacity = '1';
        visualRef.current.style.transform = 'translateX(0) scale(1)';
      }, 200);
    }
  }, []);

  const handleInstall = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    window.location.href = isAndroid || isIOS
      ? 'https://instalacao-mobile.vercel.app'
      : 'https://Zenith-desketop.vercel.app';
  };

  return (
    <section className="hero" id="hero">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/videos/videoDrone.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" />
      <div className="hero-noise" />
      <div className="hero-grid" />

      <div className="hero-inner">
        <div className="hero-text" ref={textRef}>
          <div className="hero-badge">
            <span className="dot" />
            <FaSeedling style={{ fontSize: '.85rem' }} />
            Agricultura Inteligente
          </div>

          <h1 className="hero-title">
            Sua lavoura,<br />
            no ponto mais <span className="accent">alto</span>
          </h1>

          <p className="hero-desc">
            Monitoramento por drones, análise de IA e relatórios precisos.
            Reduza custos, previna perdas e maximize sua produtividade agrícola.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary" onClick={handleInstall}>
              <FaDownload /> Baixar App
            </button>
            <a href="https://zenith-desktop2.vercel.app" className="btn-secondary">
              Acessar plataforma web
            </a>
            <a href="https://wa.me/5519999999999" className="btn-thirdary">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">+500</span>
              <span className="hero-stat-label">Hectares monitorados</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">98%</span>
              <span className="hero-stat-label">Precisão da IA</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">-35%</span>
              <span className="hero-stat-label">Redução de custos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" ref={visualRef}>
          <div className="hud-float-card top-right">
            <div className="hud-float-label">Alerta IA</div>
            <div className="hud-float-val">Tudo normal</div>
          </div>

          <div className="hud-float-card bottom-left">
            <div className="hud-float-label">Produtividade</div>
            <div className="hud-float-val">+32% safra</div>
          </div>

          <div className="hud-dashboard">
            <div className="hud-top-bar">
              <div className="hud-dots">
                <div className="hud-dot red" />
                <div className="hud-dot amber" />
                <div className="hud-dot green" />
              </div>
              <div className="hud-status">DRONE ATIVO - MISSÃO 04</div>
            </div>

            <div className="hud-map">
              <div className="hud-map-grid" />
              <div className="hud-scan" />
              <div className="hud-ping" />
              <div className="hud-label">AREA MONITORADA - SÃO PAULO</div>
            </div>

            <div className="hud-metrics">
              <div className="hud-metric">
                <div className="hud-metric-val">82%</div>
                <div className="hud-metric-key">Bateria</div>
              </div>
              <div className="hud-metric">
                <div className="hud-metric-val">120m</div>
                <div className="hud-metric-key">Altitude</div>
              </div>
              <div className="hud-metric">
                <div className="hud-metric-val">4.2km</div>
                <div className="hud-metric-key">Cobertura</div>
              </div>
            </div>

            <div className="hud-bar-row">
              {BARS.map((bar) => (
                <div className="hud-bar-item" key={bar.label}>
                  <div className="hud-bar-label">
                    <span>{bar.label}</span>
                    <span>{bar.pct}%</span>
                  </div>
                  <div className="hud-bar-track">
                    <div className="hud-bar-fill" style={{ width: `${bar.pct}%` }} />
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
