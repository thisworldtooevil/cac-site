import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  className = '',
  as = 'div',
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' })
  const prefersReduced = useReducedMotion()
  const Component = motion[as] || motion.div

  return (
    <Component
      ref={ref}
      className={className}
      initial={prefersReduced ? {} : { opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReduced ? { duration: 0 } : {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
