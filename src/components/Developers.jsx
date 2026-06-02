// components/Developers.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaCode,
  FaServer,
  FaMobileAlt,
  FaPaintBrush,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: 'Leonardo',
    age: 17,
    role: 'Frontend - Mobile Developer',
    roleTag: 'UI / UX',
    icon: <FaPaintBrush />,
    accent: '#16f29a',
    initials: 'LE',
    bio: 'Responsável pela interface visual da plataforma. Constrói componentes React pixel-perfect, anima com GSAP e garante a identidade visual do Zenith em cada tela.',
    skills: ['React', 'GSAP', 'Figma', 'CSS'],
    github: 'https://github.com/Leo-Carrilho',
  },
  {
    name: 'Octávio',
    age: 17,
    role: 'Backend Developer',
    roleTag: 'API / ML',
    icon: <FaServer />,
    accent: '#16f29a',
    initials: 'OC',
    bio: 'Arquiteta e mantém a infraestrutura do servidor, APIs REST e banco de dados. Garante que os dados do Machine Learning tempo real com segurança e escalabilidade no aplicativo.',
    skills: ['Node.js', 'HuggyFace', 'FastAPI', 'Python'],
    github: 'https://github.com/Octavio345',
  },
  {
    name: 'Pietro',
    age: 17,
    role: 'Desktop Developer',
    roleTag: 'App / React',
    icon: <FaMobileAlt />,
    accent: '#16f29a',
    initials: 'PI',
    bio: 'Desenvolvedor do aplicativo desktop do Zenith. Cria a experiência para navegadores e aplicativos desktop.',
    skills: ['React', 'Expo', 'Maps API', 'iOS/Android'],
    github: 'https://github.com/G1menez',
  },
  {
    name: 'Samuel',
    age: 17,
    role: 'Full Stack Developer',
    roleTag: 'Dev / IA',
    icon: <FaCode />,
    accent: '#16f29a',
    initials: 'SA',
    bio: 'Conecta front, back e os modelos de IA. Integra análise dos drones com os algoritmos de machine learning que geram os relatórios agrícolas.',
    skills: ['Python', 'TensorFlow', 'React', 'API'],
    github: 'https://github.com/Samuel0088',
  },
];

export default function Developers() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // ── Cards stagger
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 88%',
          once: true,
        },
      });

      // ── Skill tags stagger inside each card (after cards appear)
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const tags = card.querySelectorAll('.dev-skill');
        gsap.from(tags, {
          scale: 0.7,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
          },
          delay: 0.35,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Hover GSAP micro-interaction
  const handleMouseEnter = (i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    gsap.to(card, {
      y: -8,
      boxShadow: '0 24px 64px rgba(22, 242, 154, 0.18)',
      borderColor: 'rgba(22, 242, 154, 0.5)',
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('.dev-avatar'), {
      scale: 1.08,
      boxShadow: '0 0 28px rgba(22, 242, 154, 0.4)',
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('.dev-icon'), {
      rotate: 15,
      scale: 1.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    gsap.to(card, {
      y: 0,
      boxShadow: '0 0 0 rgba(22, 242, 154, 0)',
      borderColor: 'rgba(255, 255, 255, 0.07)',
      duration: 0.45,
      ease: 'power2.inOut',
    });
    gsap.to(card.querySelector('.dev-avatar'), {
      scale: 1,
      boxShadow: '0 0 0 rgba(22, 242, 154, 0)',
      duration: 0.45,
      ease: 'power2.inOut',
    });
    gsap.to(card.querySelector('.dev-icon'), {
      rotate: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.inOut',
    });
  };

  return (
    <>
      <section className="developers" id="desenvolvedores" ref={sectionRef}>
        <div className="container">

          {/* ── Section header ── */}
          <div className="section-header" ref={headerRef}>
            <span className="tag">Time por trás do projeto</span>
            <h2>Conheça os <span>desenvolvedores</span></h2>
            <p>Quatro estudantes apaixonados por tecnologia que uniram código, IA e agricultura para criar o Zenith.</p>
          </div>

          {/* ── Cards grid ── */}
          <div className="dev-grid">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="dev-card"
                ref={(el) => (cardsRef.current[i] = el)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                {/* Avatar */}
                <div className="dev-avatar">{member.initials}</div>

                {/* Role badge */}
                <div className="dev-role-badge">
                  <span className="dev-icon">{member.icon}</span>
                  {member.roleTag}
                </div>

                {/* Name + meta */}
                <div>
                  <div className="dev-name">{member.name}</div>
                  <div className="dev-meta">
                    <span className="dev-age">{member.age} anos</span>
                    <span className="dev-separator" />
                    <span className="dev-position">{member.role}</span>
                  </div>
                </div>

                <div className="dev-divider" />

                {/* Bio */}
                <p className="dev-bio">{member.bio}</p>

                {/* Skills */}
                <div className="dev-skills">
                  {member.skills.map((s) => (
                    <span className="dev-skill" key={s}>{s}</span>
                  ))}
                </div>

                {/* Social links */}
                <div className="dev-socials">
                  <a
                    href={`${member.github}`}
                    className="dev-social-link"
                    aria-label={`GitHub de ${member.github}`}
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="#"
                    className="dev-social-link"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}