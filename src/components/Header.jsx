// components/Header.jsx
import { useEffect, useState } from 'react';

export default function Header({ onInstallClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);

    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const links = [
    { href: '#hero', label: 'Início' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#como-funciona', label: 'Como Funciona' },
    { href: '#planos', label: 'Planos' },
    { href: '#contato', label: 'Contato' },
  ];

  const close = () => setMenuOpen(false);
  const animateScrollTo = (top) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, top);
      return;
    }

    const start = window.scrollY;
    const distance = top - start;
    const duration = Math.min(1100, Math.max(520, Math.abs(distance) * 0.55));
    const startTime = performance.now();
    const ease = (progress) => (
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
    );

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToSection = (event, href) => {
    if (!href.startsWith('#')) return;

    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerOffset = window.innerWidth <= 640 ? 86 : 104;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    close();
    animateScrollTo(Math.max(targetTop, 0));
    window.history.replaceState(null, '', href);
  };

  const handleInstall = () => {
    close();
    onInstallClick?.();
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a
          href="#hero"
          className="nav-logo"
          onClick={(event) => scrollToSection(event, '#hero')}
          aria-label="Zenith - início"
        >
          <span className="nav-logo-icon" aria-hidden="true">Z</span>
          <span>Zenith</span>
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="https://wa.me/5519999999999" className="nav-action-link btn-secondary">
            WhatsApp
          </a>
          <button className="nav-action-link btn-primary" onClick={handleInstall}>
            Baixar App
          </button>
        </div>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
            {link.label}
          </a>
        ))}
        <a href="https://wa.me/5519999999999" className="btn-secondary" onClick={close}>
          WhatsApp
        </a>
        <button className="btn-primary" onClick={handleInstall}>
          Baixar App
        </button>
      </div>
    </>
  );
}
