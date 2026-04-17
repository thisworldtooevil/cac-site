import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'

const AREAS = [
  'Beverly Hills', 'Bel Air', 'Brentwood', 'Santa Monica',
  'Westwood', 'Los Angeles', 'Orange County',
]

export default function Coverage() {
  return (
    <section id="coverage" className="section-pad">
      <div className="container">
        <div className="coverage-wrap">
          <ScrollReveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Areas We Serve</span>
          </ScrollReveal>
          <SplitTextReveal>
            Greater <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Los Angeles</em>
          </SplitTextReveal>
          <ScrollReveal>
            <div className="coverage-areas">
              {AREAS.map((area, i) => (
                <div className="coverage-pill" key={i}>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
