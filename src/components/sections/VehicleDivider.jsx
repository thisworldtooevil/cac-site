import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASE = import.meta.env.BASE_URL

export default function VehicleDivider() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section className="vehicle-divider" ref={sectionRef}>
      <motion.div
        className="vehicle-divider-bg"
        style={{
          backgroundImage: `url(${BASE}assets/bugatti-exterior-wide.jpeg)`,
          backgroundPositionY: prefersReduced ? 'center' : bgY,
        }}
      />
      <div className="vehicle-divider-overlay" />
      <div className="vehicle-divider-rule" />
    </section>
  )
}
