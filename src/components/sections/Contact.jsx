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
                <a href="tel:3234230000">(323) 423-0000</a>
              </div>
              <div className="contact-block">
                <p className="eyebrow">Email</p>
                <a href="mailto:info@caliautoconcierge.com">info@caliautoconcierge.com</a>
              </div>
              <div className="contact-block">
                <p className="eyebrow">Visit</p>
                <address>Beverly Hills, CA 90210</address>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <a href="mailto:info@caliautoconcierge.com?subject=Consultation%20Request" className="cta-btn">
              <span>Schedule a Consultation</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
