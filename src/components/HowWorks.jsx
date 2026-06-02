import { FaBrain, FaChartBar, FaCheck, FaPlane, FaRocket } from "react-icons/fa";

const STEPS = [
  {
    num: "01",
    icon: <FaRocket />,
    title: "Planejamento",
    desc: "Definimos área, objetivo da análise e periodicidade ideal para a propriedade.",
  },
  {
    num: "02",
    icon: <FaPlane />,
    title: "Coleta em campo",
    desc: "Drones capturam dados visuais e multiespectrais com rotas organizadas e baixa fricção para o produtor.",
  },
  {
    num: "03",
    icon: <FaBrain />,
    title: "IA Zenith",
    desc: "A plataforma cruza imagens, padrões e histórico para identificar riscos e oportunidades.",
  },
  {
    num: "04",
    icon: <FaChartBar />,
    title: "Decisão",
    desc: "Você recebe relatórios objetivos, prioridades de manejo e próximos passos.",
  },
];

export default function HowWorks() {
  return (
    <section className="section-shell how-works" id="sobre">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Como funciona</span>
          <h2 className="section-title">Do voo ao insight, sem complexidade</h2>
          <p className="section-copy">
            A experiência foi pensada para produtores que querem tecnologia avançada sem operação pesada.
          </p>
        </div>

        <div className="timeline">
          {STEPS.map((step) => (
            <article className="step-card motion-card" key={step.num}>
              <span className="step-num">{step.num}</span>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
          <article className="step-card result motion-card">
            <span className="step-num"><FaCheck /></span>
            <h3>Resultado</h3>
            <p>Menos incerteza, melhor uso de insumos e decisões agrícolas mais rápidas.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
