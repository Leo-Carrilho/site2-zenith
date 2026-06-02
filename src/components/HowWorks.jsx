// components/HowWorks.jsx
import { useReveal } from '../hooks/useReveal';
import { FaRocket, FaPlane, FaBrain, FaChartBar } from 'react-icons/fa';

const STEPS = [
  {
    num: '01',
    icon: <FaRocket />,
    title: 'Agende o Voo',
    desc: 'Defina a área e o objetivo. Nossa equipe programa a missão e agenda o sobrevoo na sua propriedade.',
  },
  {
    num: '02',
    icon: <FaPlane />,
    title: 'Drone em Campo',
    desc: 'Nossos drones autônomos sobrevoam e capturam imagens multiespectrais com precisão centimétrica.',
  },
  {
    num: '03',
    icon: <FaBrain />,
    title: 'IA Processa',
    desc: 'Os dados são analisados pela nossa IA em tempo real, gerando insights acionáveis automaticamente.',
  },
  {
    num: '04',
    icon: <FaChartBar />,
    title: 'Você Decide',
    desc: 'Relatórios detalhados chegam no seu celular. Decisão rápida, resultado superior.',
  },
];

export default function HowWorks() {
  const ref = useReveal();

  return (
    <section className="how-works" id="como-funciona" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Processo simples</span>
          <h2>Como <span>funciona</span></h2>
          <p>Do campo ao relatório em poucas horas</p>
        </div>

        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="step-card reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className="step-num">{s.num}</span>
              <div className="step-icon-wrap">{s.icon}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
