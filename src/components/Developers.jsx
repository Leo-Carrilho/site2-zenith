import {
  FaArrowLeft,
  FaBrain,
  FaChartBar,
  FaCheckCircle,
  FaCrosshairs,
  FaImage,
  FaMagic,
  FaMicrochip,
} from "react-icons/fa";

const INSIGHTS = [
  "Risco de praga baixo no talhao 02",
  "Irrigacao recomendada em 36 horas",
  "Vigor vegetativo acima da media",
];

const ANALYSIS_STEPS = [
  { icon: <FaCrosshairs />, label: "Pre-processamento" },
  { icon: <FaBrain />, label: "Inferencia" },
  { icon: <FaChartBar />, label: "Resultado final" },
];

export default function Developers() {
  return (
    <section className="section-shell ai-section" id="ia-zenith">
      <div className="container ai-shell">
        <div className="section-header ai-header">
          <span className="section-eyebrow">IA Zenith</span>
          <h2 className="section-title">Uma camada inteligente entre o drone e sua decisao</h2>
          <p className="section-copy">
            A IA organiza sinais do campo, explica prioridades e entrega recomendacoes em linguagem simples.
          </p>
        </div>

        <div className="ai-card motion-card">
          <div className="ai-card-glow" aria-hidden="true" />

          <div className="ai-panel">
            <div className="ai-panel-top">
              <div className="card-icon"><FaImage /></div>
              <div>
                <span>Pre-visualizacao</span>
                <strong>Imagem da lavoura</strong>
              </div>
              <span className="status-pill">Pronto para analise</span>
            </div>

            <div className="analysis-preview">
              <img src="/assets/images/analise-lavoura.jpeg" alt="Area agricola pronta para analise por IA" />
              <span className="analysis-target target-one" />
              <span className="analysis-target target-two" />
              <span className="analysis-target target-three" />
            </div>

            <div className="analysis-status-row" aria-label="Status da imagem">
              <span><FaCheckCircle /> Imagem carregada com sucesso</span>
              <span><FaChartBar /> Analise por IA em tempo real</span>
            </div>

            <div className="analysis-actions">
              <button className="analysis-btn secondary" type="button">
                <FaArrowLeft /> Nova imagem
              </button>
              <button className="analysis-btn primary" type="button">
                <FaMagic /> Analisar com IA
              </button>
            </div>
          </div>

          <div className="ai-insights analysis-processing">
            <div className="analysis-loader" aria-hidden="true">
              <span />
            </div>
            <div className="analysis-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="analysis-processing-copy">
              <h3>Analisando imagem</h3>
              <p>Processando com inteligencia artificial...</p>
            </div>

            <div className="analysis-steps">
              {ANALYSIS_STEPS.map((step) => (
                <div className="analysis-step" key={step.label}>
                  <span>{step.icon}</span>
                  <strong>{step.label}</strong>
                </div>
              ))}
            </div>

            <div className="analysis-progress" aria-hidden="true">
              <span />
            </div>

            <div className="ai-score">
              <FaMicrochip />
              <div>
                <span>Confianca do diagnostico</span>
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
