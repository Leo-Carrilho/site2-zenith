// components/Contact.jsx
import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { FaRegAddressCard, FaMailBulk, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const INFO_CARDS = [
  { icon: <FaRegAddressCard />, title: 'Endereço', lines: ['Americana — SP', 'Interior Paulista'] },
  { icon: <FaMailBulk />,       title: 'E-mail',   lines: ['contato@zenith.agr.br'] },
  { icon: <FaPhoneAlt />,       title: 'Telefone', lines: ['(19) 99999-9999'] },
  { icon: <FaWhatsapp />,       title: 'WhatsApp', link: { href: 'https://wa.me/5519999999999', label: 'Enviar mensagem →' } },
];

export default function Contact() {
  const [form, setForm]   = useState({ nome: '', email: '', mensagem: '' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ nome: '', email: '', mensagem: '' });
    } catch {
      alert('Erro ao enviar mensagem. Tente via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contato" id="contato" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Fale conosco</span>
          <h2>Entre em <span>contato</span></h2>
          <p>Nossa equipe está pronta para transformar sua produção. Resposta em até 24 horas.</p>
        </div>

        <div className="contato-grid">
          {/* INFO */}
          <div className="contato-info reveal-left">
            <h2 style={{ marginBottom: 12 }}>Vamos conversar <span>sobre sua fazenda</span></h2>
            <p style={{ marginBottom: 36 }}>
              Agende uma demonstração gratuita e veja como a tecnologia Zenith pode transformar seus resultados.
            </p>
            <div className="info-cards">
              {INFO_CARDS.map((c, i) => (
                <div className="info-card" key={i}>
                  <div className="info-card-icon">{c.icon}</div>
                  <div className="info-card-text">
                    <h4>{c.title}</h4>
                    {c.lines?.map(l => <p key={l}>{l}</p>)}
                    {c.link && <a href={c.link.href} style={{ color: 'var(--g6)' }}>{c.link.label}</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="form-box reveal-right">
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">✅</div>
                <h3>Mensagem enviada!</h3>
                <p>Em breve nossa equipe entrará em contato com você.</p>
              </div>
            ) : (
              <>
                <h3>Solicite uma <span style={{ color: 'var(--g6)' }}>demonstração</span></h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nome completo</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={form.nome}
                      onChange={e => setForm({ ...form, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mensagem</label>
                    <textarea
                      rows={4}
                      placeholder="Conte sobre sua propriedade e objetivos..."
                      value={form.mensagem}
                      onChange={e => setForm({ ...form, mensagem: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                  </button>
                  <p style={{ fontSize: '.78rem', color: 'var(--muted)', marginTop: 12, textAlign: 'center' }}>
                    Seus dados estão protegidos pela nossa{' '}
                    <a href="#" style={{ color: 'var(--g6)' }}>Política de Privacidade</a>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
