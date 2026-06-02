// components/Footer.jsx

export default function Footer({ onInstallClick }) {
  const handlePlatform = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS     = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isAndroid || isIOS) {
      window.location.href = 'https://instalacao-mobile.vercel.app';
    } else {
      window.open('https://Zenith-desketop.vercel.app', '_blank');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>⬡ Zenith</h2>
            <p>
              Monitoramento inteligente, detecção de pragas, análise de solo e gestão agrícola
              com a precisão que só a tecnologia pode oferecer.
            </p>
          </div>

          <div className="footer-col">
            <h3>Navegação</h3>
            <a href="#hero">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#planos">Planos</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="footer-col">
            <h3>FAQ</h3>
            <a href="#">Como funcionam os drones?</a>
            <a href="#">Quanto custa o serviço?</a>
            <a href="#">Quais regiões atendem?</a>
            <a href="#">Como contratar?</a>
          </div>

          <div className="footer-col">
            <h3>Contato</h3>
            <a href="#">Americana — SP</a>
            <a href="mailto:contato@zenith.agr.br">contato@zenith.agr.br</a>
            <a href="tel:+5519999999999">(19) 99999-9999</a>
            <a href="https://wa.me/5519999999999">WhatsApp</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Zenith Agro — Todos os direitos reservados — Americana, SP</p>
          <div className="footer-bottom-links">
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
            <a href="#" onClick={e => { e.preventDefault(); handlePlatform(); }}>Plataforma</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
