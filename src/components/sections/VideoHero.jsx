import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SplitTextReveal from '../animation/SplitTextReveal'
import ScrollReveal from '../animation/ScrollReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASE = import.meta.env.BASE_URL

export default function VideoHero() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Layer 1: hero video parallax — moves at 0.5x scroll speed
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <>
      {/* VIDEO SECTION — full 100vh, no copy overlay */}
      <section className="hero" ref={sectionRef}>
        <motion.div
          className="hero-video-wrap"
          style={prefersReduced ? {} : { y: videoY }}
        >
          <video autoPlay muted loop playsInline>
            <source src={`${BASE}assets/cac-hero-video.mp4`} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hero-vignette" />
        <div className="hero-gold-glow" />

        <ScrollReveal className="scroll-cue" delay={0.8}>
          <span className="scroll-cue-text">Scroll</span>
          <span className="scroll-cue-line" />
        </ScrollReveal>

        <ScrollReveal className="hero-corner" delay={1.0}>
          Beverly Hills, CA
        </ScrollReveal>
      </section>

      {/* COPY SECTION — immediately after the video, no gap */}
      <section className="hero-copy-section">
        <div className="container">
          <div className="hero-copy-grid">
            <div className="hero-copy-left">
              <SplitTextReveal as="h1" className="hero-headline" stagger={0.06} duration={1.6}>
                You focus on life.<br />We handle the <em>vehicles.</em>
              </SplitTextReveal>
            </div>
            <ScrollReveal className="hero-copy-right" delay={0.2} duration={1.2}>
              <p className="hero-sub">
                White-glove automotive management for those who expect precision, discretion, and care in every detail.
              </p>
              <a href="#contact" className="hero-cta-link">
                Schedule a Consultation
                <span className="line" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
