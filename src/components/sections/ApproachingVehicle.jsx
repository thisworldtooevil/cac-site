import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const BASE = import.meta.env.BASE_URL

export default function ApproachingVehicle({
  imageSrc = `${BASE}assets/cac-parallax-mistral-cutout.png`,
}) {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Move car from far away (negative Z) to close
  const z = useTransform(scrollYProgress, [0, 0.7], [-300, 50])

  // Subtle upward drift as it approaches
  const y = useTransform(scrollYProgress, [0, 0.7], [40, -10])

  // Brightness increases as car approaches
  const brightness = useTransform(scrollYProgress, [0, 0.7], [0.7, 1.05])
  const filterStyle = useTransform(brightness, (v) => `brightness(${v})`)

  // Gold glow expands
  const glowScale = useTransform(scrollYProgress, [0, 0.7], [0.8, 1.3])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.06])

  return (
    <section
      className="approaching-vehicle"
      ref={sectionRef}
      style={{
        height: '130vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0a',
        perspective: '1200px',
        perspectiveOrigin: 'center 60%',
      }}
    >
      {/* Gold glow behind car */}
      <motion.div
        style={prefersReduced ? {
          position: 'absolute',
          top: '50%', left: '50%',
          width: '60%', height: '60%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(150,128,62,0.08) 0%, transparent 70%)',
          opacity: 0.04,
          pointerEvents: 'none',
        } : {
          position: 'absolute',
          top: '50%', left: '50%',
          width: '60%', height: '60%',
          x: '-50%', y: '-50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(150,128,62,0.08) 0%, transparent 70%)',
          scale: glowScale,
          opacity: glowOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Frame rules */}
      <div className="approaching-vehicle-rule top" />
      <div className="approaching-vehicle-rule bottom" />

      {/* The car — moves through 3D space via translateZ */}
      <motion.div
        style={prefersReduced ? {
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '75vw',
        } : {
          position: 'absolute',
          top: '50%', left: '50%',
          x: '-50%',
          y,
          translateZ: z,
          filter: filterStyle,
          transformOrigin: 'center bottom',
          willChange: 'transform, filter',
          maxWidth: '75vw',
        }}
      >
        <img
          src={imageSrc}
          alt="Bugatti Mistral approaching"
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
        />
      </motion.div>
    </section>
  )
}
