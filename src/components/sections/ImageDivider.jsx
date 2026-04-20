import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SplitTextReveal from '../animation/SplitTextReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASE = import.meta.env.BASE_URL

export default function ImageDivider({
  image = 'cac-mistral-detail.jpg',
  eyebrow,
  variant,
  children,
}) {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  const defaultCopy = (
    <>
      One call. <span style={{ color: 'var(--gold)' }}>Everything handled.</span> That is the promise.
    </>
  )

  const sectionClass = `image-divider${variant ? ` image-divider--${variant}` : ''}`

  return (
    <section className={sectionClass} ref={sectionRef}>
      <motion.div
        className="image-divider-bg"
        style={{
          backgroundImage: `url(${BASE}assets/${image})`,
          y: prefersReduced ? 0 : bgY,
        }}
      />
      <div className="image-divider-overlay" />
      <div className="image-divider-content">
        <div className="image-divider-inner">
          {eyebrow && <span className="divider-eyebrow">{eyebrow}</span>}
          <SplitTextReveal as="blockquote">
            {children || defaultCopy}
          </SplitTextReveal>
        </div>
      </div>
    </section>
  )
}
