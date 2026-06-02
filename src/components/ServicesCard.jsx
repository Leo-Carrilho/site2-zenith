// components/ServicesCard.jsx
import { useReveal } from '../hooks/useReveal';
import { FaPlane, FaBrain, FaChartLine, FaMap, FaArrowRight } from 'react-icons/fa';

const SERVICES = [
  {
    icon: <FaPlane />,
    title: 'Monitoramento por Drones',
    desc: 'Drones com sensores multiespectrais identificam pragas, doenças e estresse hídrico antes que virem problema.',
    tags: ['Alta resolução', 'Mapeamento NDVI', 'Relatórios automáticos'],
    bars: [75, 50, 88, 62, 40, 95],
    size: 'large',
  },
  {
    icon: <FaBrain />,
    title: 'Análise com IA',
    desc: 'IA avançada para previsão de safras e recomendações personalizadas.',
    tags: ['Previsão', 'Alertas', 'Tempo real'],
    bars: [60, 85, 45, 78, 92, 55],
    size: 'small',
  },
  {
    icon: <FaChartLine />,
    title: 'Gestão de Custos',
    desc: 'Análise de investimentos e otimização de recursos para maximizar o retorno da sua produção.',
    tags: ['Controle financeiro', 'Rentabilidade', 'Planejamento'],
    bars: [80, 65, 50, 90, 70, 45],
    size: 'small',
  },
  {
    icon: <FaMap />,
    title: 'Mapeamento Agrícola',
    desc: 'Mapas detalhados com zoneamento de produtividade e análise completa de solo para decisões precisas.',
    tags: ['Zoneamento', 'Fertilidade', 'Mapas interativos'],
    bars: [55, 88, 72, 40, 95, 68],
    size: 'large',
  },
];

export default function ServicesCard() {
  const ref = useReveal();

  return (
    <section className="services" id="servicos" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">🚀 O que oferecemos</span>
          <h2>Tecnologia que <span>brota do campo</span></h2>
          <p>Soluções completas para o agronegócio moderno</p>
        </div>

        <div className="bento-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`bento-card ${s.size} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="bento-icon">{s.icon}</div>
              <h3 className="bento-title">{s.title}</h3>
              <p className="bento-desc">{s.desc}</p>

              <div className="bento-tags">
                {s.tags.map(t => (
                  <span key={t} className="bento-tag">{t}</span>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="bento-chart">
                {s.bars.map((h, j) => (
                  <div key={j} className="chart-bar" style={{ height: `${h}%` }} />
                ))}
              </div>

              <a
                href="#contato"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 16,
                  fontSize: '.82rem',
                  fontWeight: 600,
                  color: 'var(--g6)',
                  transition: 'gap .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                Saiba mais <FaArrowRight style={{ fontSize: '.75rem' }} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
