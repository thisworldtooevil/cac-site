import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function SplitTextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.04,
  duration = 1.1,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const prefersReduced = useReducedMotion()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current || prefersReduced) {
      if (prefersReduced && ref.current) {
        ref.current.style.visibility = 'visible'
      }
      return
    }

    const el = ref.current
    if (!el || !window.gsap || !window.SplitText) {
      el.style.visibility = 'visible'
      return
    }

    hasAnimated.current = true

    window.SplitText.create(el, {
      type: 'words',
      mask: 'lines',
      linesClass: 'split-line',
      onSplit(self) {
        el.style.visibility = 'visible'
        window.gsap.from(self.words, {
          y: '100%',
          opacity: 0,
          duration,
          stagger,
          ease: 'power3.out',
        })
      }
    })
  }, [isInView, prefersReduced, stagger, duration])

  return (
    <Tag ref={ref} className={className} data-reveal-heading {...props}>
      {children}
    </Tag>
  )
}
