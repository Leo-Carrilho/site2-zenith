const TESTIMONIALS = [
  {
    text: "Com a Zenith conseguimos enxergar problemas antes da colheita sentir. A decisão ficou mais rápida e muito mais segura.",
    author: "João Silva",
    role: "Produtor rural, SP",
    initial: "J",
  },
  {
    text: "A IA ajudou a reduzir desperdício de insumos e deixou os relatórios fáceis de explicar para a equipe de campo.",
    author: "Maria Oliveira",
    role: "Gestora agrícola, MG",
    initial: "M",
  },
  {
    text: "O valor está na clareza. Em poucos minutos entendemos onde agir e o que pode esperar.",
    author: "Carlos Mendes",
    role: "Agricultor familiar, MG",
    initial: "C",
  },
];

export default function Depoiments() {
  return (
    <section className="section-shell depoimentos">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Depoimentos</span>
          <h2 className="section-title">Confiança construída em cada recomendação</h2>
        </div>

        <div className="depo-grid">
          {TESTIMONIALS.map((item) => (
            <article className="depo-card motion-card" key={item.author}>
              <div className="depo-stars" aria-label="5 estrelas">★★★★★</div>
              <p>{item.text}</p>
              <div className="depo-author">
                <span className="depo-avatar">{item.initial}</span>
                <div>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
