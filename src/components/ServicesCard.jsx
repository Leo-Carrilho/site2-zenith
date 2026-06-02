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
          {SERVICES.map((service) => (
            <article className="feature-card motion-card" key={service.title}>
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#contato" className="inline-link">
                Explorar <FaArrowRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
