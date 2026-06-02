import { FaBrain, FaCheckCircle, FaMicrochip, FaRobot } from "react-icons/fa";

const INSIGHTS = [
  "Risco de praga baixo no talhão 02",
  "Irrigação recomendada em 36 horas",
  "Vigor vegetativo acima da média",
];

export default function Developers() {
  return (
    <section className="section-shell ai-section" id="ia-zenith">
      <div className="container ai-shell">
        <div className="section-header ai-header">
          <span className="section-eyebrow">IA Zenith</span>
          <h2 className="section-title">Uma camada inteligente entre o drone e sua decisão</h2>
          <p className="section-copy">
            A IA organiza sinais do campo, explica prioridades e entrega recomendações em linguagem simples.
          </p>
        </div>

        <div className="ai-card motion-card">
          <div className="ai-card-glow" aria-hidden="true" />
          <div className="ai-panel">
            <div className="ai-panel-top">
              <div className="card-icon"><FaRobot /></div>
              <div>
                <span>Assistente agronômico</span>
                <strong>Zenith IA</strong>
              </div>
              <span className="status-pill">Online</span>
            </div>

            <div className="chat-thread">
              <div className="chat-bubble user">Como está o talhão norte hoje?</div>
              <div className="chat-bubble bot">
                Detectei boa vitalidade no NDVI e baixa probabilidade de pragas. A atenção deve ficar na umidade do solo.
              </div>
              <div className="chat-bubble user">Qual ação recomenda?</div>
              <div className="chat-bubble bot">
                Priorize irrigação localizada nas próximas 36 horas e monitore a borda leste no próximo voo.
              </div>
            </div>
          </div>

          <div className="ai-insights">
            <div className="ai-chip">
              <FaBrain />
              <span>Modelo preditivo ativo</span>
            </div>
            <div className="ai-score">
              <FaMicrochip />
              <div>
                <span>Confiança do diagnóstico</span>
                <strong>98%</strong>
              </div>
            </div>
            <ul>
              {INSIGHTS.map((insight) => (
                <li key={insight}>
                  <FaCheckCircle />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
