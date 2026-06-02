const PLANS = [
  {
    badge: "Essencial",
    name: "Agro Vision",
    price: "R$ 799",
    period: "/ano",
    features: ["Até 50 ha", "Relatórios mensais com IA", "Suporte por e-mail", "App de monitoramento"],
  },
  {
    badge: "Mais popular",
    name: "Agro Imperial",
    price: "R$ 1.200",
    period: "/ano",
    features: ["Até 200 ha", "Relatórios semanais", "Suporte prioritário", "Consultoria especializada"],
    featured: true,
  },
  {
    badge: "Escala",
    name: "Agro Enterprise",
    price: "Sob consulta",
    period: "",
    features: ["Monitoramento ilimitado", "Relatórios em tempo real", "API de integração", "Gestor de conta"],
  },
];

export default function Plans() {
  return (
    <section className="section-shell pricing" id="planos">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Planos</span>
          <h2 className="section-title">Planos para começar pequeno e escalar com segurança</h2>
          <p className="section-copy">Escolha a cobertura ideal para o tamanho e maturidade digital da sua operação.</p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <article className={`pricing-card motion-card${plan.featured ? " featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="featured-crown">Recomendado</span>}
              <span className="pricing-badge">{plan.badge}</span>
              <h3>{plan.name}</h3>
              <div className="pricing-price">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href="https://wa.me/5519999999999" className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}>
                {plan.price === "Sob consulta" ? "Fale conosco" : "Assinar agora"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
