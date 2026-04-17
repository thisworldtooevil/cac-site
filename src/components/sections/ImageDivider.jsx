import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SplitTextReveal from '../animation/SplitTextReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASE = import.meta.env.BASE_URL

export default function ImageDivider() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section className="image-divider" ref={sectionRef}>
      <motion.div
        className="image-divider-bg"
        style={{
          backgroundImage: `url(${BASE}assets/cac-mistral-detail.jpg)`,
          y: prefersReduced ? 0 : bgY,
        }}
      />
      <div className="image-divider-overlay" />
      <div className="image-divider-content">
        <SplitTextReveal as="blockquote">
          One call. <span style={{ color: 'var(--gold)' }}>Everything handled.</span> That is the promise.
        </SplitTextReveal>
      </div>
    </section>
  )
}
