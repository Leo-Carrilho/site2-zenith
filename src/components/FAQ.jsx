// components/FAQ.jsx
import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const FAQS = [
  {
    q: 'Como funciona o monitoramento por drones?',
    a: 'Nossos drones sobrevoam sua propriedade capturando imagens multiespectrais. A IA processa os dados identificando áreas de estresse, pragas e necessidade de irrigação, gerando relatórios detalhados automaticamente.',
  },
  {
    q: 'Preciso comprar os drones?',
    a: 'Não! Realizamos todo o serviço com nossos próprios equipamentos. Você contrata o plano e recebe relatórios e análises prontos, sem nenhum investimento em hardware.',
  },
  {
    q: 'Qual a periodicidade do monitoramento?',
    a: 'O monitoramento pode ser semanal, quinzenal ou mensal, conforme sua necessidade e o plano contratado. Também oferecemos missões sob demanda para situações emergenciais.',
  },
  {
    q: 'Atendem todo o Brasil?',
    a: 'Atualmente cobrimos toda a região Sudeste, com planos de expansão para outras regiões em breve. Entre em contato para verificar a disponibilidade na sua área.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const ref = useReveal();

  return (
    <section className="faq" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Dúvidas frequentes</span>
          <h2>Perguntas <span>frequentes</span></h2>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`faq-item reveal${open === i ? ' open' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <div className="faq-arrow">+</div>
              </div>
              {open === i && (
                <div className="faq-a">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
