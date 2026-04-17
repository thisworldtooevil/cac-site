import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'

const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We learn your household, your vehicles, and how you want things handled. No forms. No checkout. A real conversation.',
  },
  {
    num: '02',
    title: 'Onboarding',
    desc: 'We catalog every vehicle, establish vendor relationships, set maintenance schedules, and assign your dedicated account manager.',
  },
  {
    num: '03',
    title: 'Management',
    desc: 'From that point forward, you call us. Scheduling, coordination, pickup, delivery, oversight: handled.',
  },
  {
    num: '04',
    title: 'Ongoing',
    desc: 'Proactive maintenance alerts, transparent billing, and a team that knows your vehicles as well as you do. We anticipate, not just react.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="experience-inner">
        <div className="experience-left">
          <ScrollReveal>
            <span className="eyebrow">The Experience</span>
          </ScrollReveal>
          <SplitTextReveal>
            Built around your life, not <em>the other way around.</em>
          </SplitTextReveal>
          <ScrollReveal>
            <p>Every client relationship begins with a conversation. We learn your household, your vehicles, your preferences, and your expectations. From there, we handle everything.</p>
          </ScrollReveal>
        </div>
        <div className="experience-right">
          <ul className="exp-steps">
            {STEPS.map((step, i) => (
              <ScrollReveal as="li" key={i} delay={i * 0.08}>
                <span className="exp-num">{step.num}</span>
                <div className="exp-text">
                  <strong>{step.title}</strong>
                  <span>{step.desc}</span>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
