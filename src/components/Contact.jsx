import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const INFO_CARDS = [
  { icon: <FaMapMarkerAlt />, title: "Base", lines: ["Americana - SP"] },
  { icon: <FaEnvelope />, title: "E-mail", lines: ["contato@zenith.agr.br"] },
  { icon: <FaPhoneAlt />, title: "Telefone", lines: ["(19) 99999-9999"] },
  { icon: <FaWhatsapp />, title: "WhatsApp", link: { href: "https://wa.me/5519999999999", label: "Enviar mensagem" } },
];

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ nome: "", email: "", mensagem: "" });
    } catch {
      alert("Erro ao enviar mensagem. Tente via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell contato" id="contato">
      <div className="container">
        <div className="final-cta motion-card">
          <span className="section-eyebrow">Contato</span>
          <h2>Pronto para operar sua fazenda com IA?</h2>
          <p>Agende uma demonstração e veja como o Zenith transforma imagens, dados e alertas em ação.</p>
          <a href="https://wa.me/5519999999999" className="btn btn-primary">Falar com especialista</a>
        </div>

        <div className="contato-grid">
          <div className="contato-info">
            <h2 className="section-title small">Vamos conversar sobre sua propriedade</h2>
            <p className="section-copy">Conte seu cenário e nossa equipe indica a melhor forma de começar.</p>
            <div className="info-cards">
              {INFO_CARDS.map((card) => (
                <article className="info-card motion-card" key={card.title}>
                  <div className="card-icon">{card.icon}</div>
                  <div>
                    <h3>{card.title}</h3>
                    {card.lines?.map((line) => <p key={line}>{line}</p>)}
                    {card.link && <a href={card.link.href}>{card.link.label}</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="form-box motion-card">
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">OK</div>
                <h3>Mensagem enviada</h3>
                <p>Em breve nossa equipe entrará em contato.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Solicite uma demonstração</h3>
                <label className="form-group">
                  <span>Nome completo</span>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={(event) => setForm({ ...form, nome: event.target.value })}
                    required
                  />
                </label>
                <label className="form-group">
                  <span>E-mail</span>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>
                <label className="form-group">
                  <span>Mensagem</span>
                  <textarea
                    rows={5}
                    placeholder="Conte sobre sua propriedade e objetivo..."
                    value={form.mensagem}
                    onChange={(event) => setForm({ ...form, mensagem: event.target.value })}
                    required
                  />
                </label>
                <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
