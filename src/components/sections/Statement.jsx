import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'

const BASE = import.meta.env.BASE_URL

export default function Statement() {
  return (
    <section className="statement-section">
      <div
        className="statement-bg"
        style={{
          backgroundImage: `url(${BASE}assets/bugatti-interior.jpg)`,
        }}
      />
      <div className="statement-content">
        <ScrollReveal>
          <div className="statement-rule" />
        </ScrollReveal>
        <SplitTextReveal>
          Precision is not a service.<br />It&rsquo;s a <em>standard.</em>
        </SplitTextReveal>
        <ScrollReveal delay={0.1}>
          <p>We handle every detail so you never have to think about your vehicles again.</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
