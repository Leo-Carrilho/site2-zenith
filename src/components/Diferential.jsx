// components/Diferential.jsx
import { useReveal } from '../hooks/useReveal';
import { FaShieldAlt, FaUsers, FaClock, FaAward } from 'react-icons/fa';

const ITEMS = [
  { icon: <FaShieldAlt />, title: 'Tecnologia de Ponta',    desc: 'Os melhores equipamentos e softwares do mercado agro.' },
  { icon: <FaUsers />,     title: 'Suporte Especializado',  desc: 'Agrônomos e engenheiros disponíveis para você.' },
  { icon: <FaClock />,     title: 'Resposta Rápida',        desc: 'Atendimento em até 24h para qualquer urgência.' },
  { icon: <FaAward />,     title: 'Certificação ISO',       desc: 'Processos certificados garantindo máxima qualidade.' },
];

export default function Diferential() {
  const ref = useReveal();

  return (
    <section className="diferenciais" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <span className="tag">Por que escolher a Zenith</span>
          <h2>Nossos <span>diferenciais</span></h2>
        </div>

        <div className="diff-grid">
          {ITEMS.map((it, i) => (
            <div
              key={i}
              className="diff-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="diff-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
