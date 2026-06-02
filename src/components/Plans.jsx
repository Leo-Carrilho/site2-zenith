// components/Plans.jsx
import { useReveal } from '../hooks/useReveal';

const PLANS = [
  {
    badge: 'Básico',
    name: 'Agro Vision',
    price: 'R$ 799',
    period: '/anual',
    features: [
      'Monitoramento de até 50 ha',
      'Relatórios mensais com IA',
      'Suporte por e-mail',
      'Acesso ao app de monitoramento',
    ],
    featured: false,
  },
  {
    badge: 'Mais popular',
    name: 'Agro Imperial',
    price: 'R$ 1.200',
    period: '/anual',
    features: [
      'Monitoramento de até 200 ha',
      'Relatórios semanais com IA',
      'Suporte prioritário 24/7',
      'Acesso completo ao app',
      'Consultoria especializada',
    ],
    featured: true,
  },
  {
    badge: 'Empresarial',
    name: 'Agro Enterprise',
    price: 'Sob consulta',
    period: '',
    features: [
      'Monitoramento ilimitado',
      'Relatórios em tempo real',
      'API de integração',
      'Gestor de conta exclusivo',
      'Treinamento in loco',
    ],
    featured: false,
  },
];

export default function Plans() {
  const ref = useReveal();

  return (
    <section className="pricing" id="planos" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Planos e preços</span>
          <h2>Escolha o plano <span>ideal para você</span></h2>
          <p>Planos flexíveis que se adaptam às suas necessidades</p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((p, i) => (
            <div
              key={i}
              className={`pricing-card${p.featured ? ' featured' : ''} reveal`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {p.featured && <div className="featured-crown">⭐ Recomendado</div>}
              <div className="pricing-badge">{p.badge}</div>
              <div className="pricing-name">{p.name}</div>

              <div className="pricing-price">
                <span className="value">{p.price}</span>
                {p.period && <span className="period">{p.period}</span>}
              </div>

              <div className="pricing-divider" />

              <ul className="pricing-features-list">
                {p.features.map((f, j) => (
                  <li key={j} className="pricing-feature">{f}</li>
                ))}
              </ul>

              <a
                href="https://wa.me/5519999999999"
                className={`pricing-cta ${p.featured ? 'filled' : 'outline'}`}
              >
                {p.name === 'Agro Enterprise' ? 'Fale conosco' : 'Assinar agora'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
