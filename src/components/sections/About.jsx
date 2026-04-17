import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'

const CLIENTS = [
  'Ultra-high-net-worth individuals',
  'Estate and house managers',
  'Personal staff and executive assistants',
  'Celebrities, executives, and athletes',
  'Collector car owners and luxury households',
]

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <ScrollReveal>
              <span className="eyebrow">Who We Are</span>
            </ScrollReveal>
            <SplitTextReveal>
              Your vehicles deserve the same standard as <em>everything else</em> in your life.
            </SplitTextReveal>
            <ScrollReveal>
              <p>Cali Auto Concierge provides comprehensive vehicle management for high-net-worth individuals and their households. We take full responsibility for every automotive need so you and your team never have to think about it.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>We work directly with estate managers, house managers, personal assistants, and clients themselves to ensure every vehicle is maintained, protected, road-ready, and handled with absolute discretion.</p>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal>
              <span className="eyebrow">Who We Serve</span>
            </ScrollReveal>
            <ul className="client-list" style={{ marginTop: 24 }}>
              {CLIENTS.map((client, i) => (
                <ScrollReveal as="li" key={i} delay={i * 0.05}>
                  <span className="cl-num">0{i + 1}</span>
                  <span className="cl-label">{client}</span>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
