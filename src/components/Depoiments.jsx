// components/Depoiments.jsx
import { useReveal } from '../hooks/useReveal';

const TESTIMONIALS = [
  {
    text: 'Com a Zenith aumentamos a produtividade em 40% e reduzimos perdas. O monitoramento por drones revolucionou nossa gestão.',
    author: 'João Silva',
    loc: 'Fazenda Santa Maria, SP',
    initial: 'J',
  },
  {
    text: 'A análise de dados nos ajudou a economizar 30% em insumos. A precisão é impressionante e o suporte está sempre disponível.',
    author: 'Maria Oliveira',
    loc: 'Agropecuária Boa Vista, MG',
    initial: 'M',
  },
  {
    text: 'Melhor investimento que fizemos. A plataforma é intuitiva e os relatórios gerados pela IA são extremamente valiosos.',
    author: 'Carlos Mendes',
    loc: 'Sítio São Pedro, MG',
    initial: 'C',
  },
];

export default function Depoiments() {
  const ref = useReveal();

  return (
    <section className="depoimentos" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">O que dizem nossos clientes</span>
          <h2>Histórias de <span>sucesso</span></h2>
        </div>

        <div className="depo-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="depo-card reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="depo-stars">★★★★★</div>
              <div className="depo-quote">"</div>
              <p className="depo-text">{t.text}</p>
              <div className="depo-author">
                <div className="depo-avatar">{t.initial}</div>
                <div>
                  <div className="depo-name">{t.author}</div>
                  <div className="depo-loc">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
