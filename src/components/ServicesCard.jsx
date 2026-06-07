import { FaArrowRight, FaBrain, FaChartLine, FaMapMarkedAlt, FaPlane, FaSatelliteDish, FaSeedling } from "react-icons/fa";

const SERVICES = [
  {
    icon: <FaPlane />,
    title: "Monitoramento por drones",
    desc: "Voos planejados para mapear falhas, estresse hídrico, pragas e variações de desenvolvimento com alta precisão.",
  },
  {
    icon: <FaBrain />,
    title: "Diagnóstico com IA",
    desc: "Modelos inteligentes transformam imagens e dados da lavoura em alertas claros para tomada de decisão.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Mapas agrícolas",
    desc: "Visualize talhões, zonas de manejo e indicadores como NDVI em uma experiência simples e moderna.",
  },
  {
    icon: <FaChartLine />,
    title: "Relatórios executivos",
    desc: "Receba recomendações objetivas, histórico de evolução e prioridades para reduzir perdas e custos.",
  },
  {
    icon: <FaSatelliteDish />,
    title: "Alertas em tempo real",
    desc: "Sinais relevantes chegam antes do problema crescer, com foco em urgência, impacto e ação recomendada.",
  },
  {
    icon: <FaSeedling />,
    title: "Gestão da produtividade",
    desc: "Acompanhe safra, insumos e performance para evoluir o manejo com dados confiáveis.",
  },
];

const FEATURE_LABELS = ["Campo", "IA", "Mapa", "Gestao", "Alertas", "Safra"];

export default function ServicesCard() {
  return (
    <section className="section-shell services" id="servicos">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Funcionalidades</span>
          <h2 className="section-title">Tecnologia aplicada ao campo, com clareza de produto SaaS</h2>
          <p className="section-copy">
            Um ecossistema visual, inteligente e acionável para produtores que precisam decidir com velocidade.
          </p>
        </div>

        <div className="feature-grid">
          {SERVICES.map((service, index) => (
            <article className={`feature-card motion-card ${index === 0 ? "featured" : ""} ${index === 4 ? "wide" : ""}`} key={service.title}>
              <div className="feature-top">
                <div className="card-icon">{service.icon}</div>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span className="feature-label">{FEATURE_LABELS[index]}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#contato" className="inline-link">
                Explorar <FaArrowRight />
              </a>
            </article>
          ))}
        </div>

        <div className="section-cta motion-card">
          <div>
            <strong>Veja o Zenith aplicado na sua propriedade</strong>
            <span>Receba uma leitura inicial de como drones e IA podem reduzir perdas na sua safra.</span>
          </div>
          <a href="https://wa.me/5519999999999" className="btn btn-primary small">Agendar demonstração</a>
        </div>
      </div>
    </section>
  );
}
