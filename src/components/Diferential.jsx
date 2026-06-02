import { FaClock, FaLeaf, FaShieldAlt, FaUsers } from "react-icons/fa";

const ITEMS = [
  {
    icon: <FaShieldAlt />,
    title: "Confiabilidade operacional",
    desc: "Processo guiado, dados organizados e relatórios consistentes para decisões de alto impacto.",
    size: "large",
  },
  {
    icon: <FaClock />,
    title: "Velocidade no diagnóstico",
    desc: "Identifique sinais críticos antes que perdas apareçam na produtividade.",
    size: "small",
  },
  {
    icon: <FaUsers />,
    title: "Suporte especializado",
    desc: "Tecnologia com leitura agrícola, para que o produtor entenda o que fazer em seguida.",
    size: "small",
  },
  {
    icon: <FaLeaf />,
    title: "Uso inteligente de insumos",
    desc: "Aplique onde importa, reduza desperdício e acompanhe a evolução por talhão.",
    size: "wide",
  },
];

export default function Diferential() {
  return (
    <section className="section-shell benefits" id="beneficios">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Benefícios</span>
          <h2 className="section-title">Um bento de valor para cada etapa da safra</h2>
          <p className="section-copy">
            O Zenith traduz complexidade técnica em ganhos práticos para o campo.
          </p>
        </div>

        <div className="bento-grid">
          {ITEMS.map((item) => (
            <article className={`bento-card ${item.size} motion-card`} key={item.title}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="bento-visual" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
