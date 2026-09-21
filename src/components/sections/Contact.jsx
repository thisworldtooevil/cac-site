import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'

export default function Contact() {
  return (
    <section id="contact" className="contact section-pad">
      <div className="container">
        <div className="contact-inner">
          <ScrollReveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Get in Touch</span>
          </ScrollReveal>
          <SplitTextReveal>
            Let&rsquo;s discuss what your household <em>needs.</em>
          </SplitTextReveal>
          <ScrollReveal>
            <p className="contact-sub">Every client relationship begins with a conversation. Tell us about your vehicles, your household, and how we can make your life easier.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="contact-grid">
              <div className="contact-block">
                <p className="eyebrow">Call</p>
                <a href="tel:3235550147">(323) 555-0147</a>
              </div>
              <div className="contact-block">
                <p className="eyebrow">Email</p>
                <a href="mailto:info@example.com">info@example.com</a>
              </div>
              <div className="contact-block">
                <p className="eyebrow">Visit</p>
                <p className="contact-note">Serving greater Los Angeles by appointment.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <a href="mailto:info@example.com?subject=Consultation%20Request" className="cta-btn">
              <span>Schedule a Consultation</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
