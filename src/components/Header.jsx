import { useEffect, useState } from "react";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";

const LINKS = [
  { href: "#hero", label: "Hero" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Funcionalidades" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#ia-zenith", label: "IA Zenith" },
  { href: "#contato", label: "Contato" },
];

export default function Header({ onInstallClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const scrollToSection = (event, href) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const offset = window.innerWidth <= 700 ? 84 : 104;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;

    close();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: Math.max(y, 0), autoKill: true },
      ease: "power3.inOut",
      onComplete: () => window.history.replaceState(null, "", href),
    });
  };

  const handleInstall = () => {
    close();
    onInstallClick?.();
  };

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a
          href="#hero"
          className="nav-logo"
          onClick={(event) => scrollToSection(event, "#hero")}
          aria-label="Zenith Agro - início"
        >
          <span className="nav-logo-mark" aria-hidden="true">Z</span>
          <span>Zenith Agro</span>
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contato" className="btn btn-ghost small" onClick={(event) => scrollToSection(event, "#contato")}>
            Demo
          </a>
          <button className="btn btn-primary small" onClick={handleInstall} type="button">
            Baixar App <FaArrowRight />
          </button>
        </div>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <button
        className={`menu-backdrop${menuOpen ? " open" : ""}`}
        aria-label="Fechar menu"
        onClick={close}
        type="button"
      />

      <aside className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-head">
          <span>Menu</span>
          <button type="button" onClick={close} aria-label="Fechar menu">×</button>
        </div>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
            {link.label}
          </a>
        ))}
        <button className="btn btn-primary" onClick={handleInstall} type="button">
          Baixar App <FaArrowRight />
        </button>
      </aside>
    </>
  );
}
