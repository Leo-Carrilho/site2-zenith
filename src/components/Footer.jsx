export default function Footer() {
  const handlePlatform = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isAndroid || isIOS) {
      window.location.href = "https://instalacao-mobile.vercel.app";
    } else {
      window.open("https://Zenith-desketop.vercel.app", "_blank");
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="nav-logo-mark">Z</span>
          <h2>Zenith Agro</h2>
          <p>IA, drones e dados agrícolas para produtores que querem decidir melhor, mais cedo e com confiança.</p>
        </div>

        <div className="footer-col">
          <h3>Navegação</h3>
          <a href="#hero">Hero</a>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Funcionalidades</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#ia-zenith">IA Zenith</a>
        </div>

        <div className="footer-col">
          <h3>Produto</h3>
          <a href="#planos">Planos</a>
          <a href="#contato">Demonstração</a>
          <a href="#" onClick={(event) => { event.preventDefault(); handlePlatform(); }}>Plataforma</a>
        </div>

        <div className="footer-col">
          <h3>Contato</h3>
          <a href="mailto:contato@zenith.agr.br">contato@zenith.agr.br</a>
          <a href="tel:+5519999999999">(19) 99999-9999</a>
          <a href="https://wa.me/5519999999999">WhatsApp</a>
          <span>Americana - SP</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Zenith Agro. Todos os direitos reservados.</p>
        <div>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
        </div>
      </div>
    </footer>
  );
}
