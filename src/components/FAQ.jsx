import { useState } from "react";

const FAQS = [
  {
    q: "Preciso comprar drones?",
    a: "Não. O serviço pode ser contratado com operação, análise e relatórios entregues pela Zenith.",
  },
  {
    q: "A IA substitui um agrônomo?",
    a: "Não. Ela acelera diagnóstico e priorização, apoiando o produtor e a equipe técnica com dados mais claros.",
  },
  {
    q: "Qual a frequência do monitoramento?",
    a: "Pode ser mensal, quinzenal, semanal ou sob demanda, conforme cultura, área e objetivo da safra.",
  },
  {
    q: "Como recebo os relatórios?",
    a: "Pelo app, pela plataforma web e também com apoio da equipe para interpretar recomendações importantes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-shell faq">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Perguntas frequentes</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item, index) => (
            <article className={`faq-item motion-card${open === index ? " open" : ""}`} key={item.q}>
              <button className="faq-q" type="button" onClick={() => setOpen(open === index ? null : index)}>
                <span>{item.q}</span>
                <span className="faq-arrow">+</span>
              </button>
              {open === index && <p className="faq-a">{item.a}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
