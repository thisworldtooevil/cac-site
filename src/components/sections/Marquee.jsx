import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ITEMS = [
  'Discreet', 'Professional', 'Personalized', 'Available 24/7',
  'Beverly Hills', 'White-Glove Service', 'Fleet Management', 'Complete Discretion',
]

function MarqueeSet() {
  return (
    <div className="marquee-item">
      {ITEMS.map((text, i) => (
        <span key={i}>
          <span>{text}</span>
          <div className="marquee-dot" />
        </span>
      )).reduce((acc, el, i) => {
        // Flatten: text, dot, text, dot...
        return acc
      }, [])}
      {ITEMS.flatMap((text, i) => [
        <span key={`t${i}`}>{text}</span>,
        <div key={`d${i}`} className="marquee-dot" />,
      ])}
    </div>
  )
}

export default function Marquee() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !window.gsap) return

    const track = trackRef.current
    const items = track.querySelectorAll('.marquee-item')
    if (items.length < 2) return

    const itemWidth = items[0].offsetWidth

    tweenRef.current = window.gsap.to(track, {
      x: -itemWidth,
      duration: 32,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: window.gsap.utils.unitize(x => parseFloat(x) % itemWidth)
      }
    })

    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [prefersReduced])

  const handleMouseEnter = () => {
    if (tweenRef.current && window.gsap && window.matchMedia('(pointer: fine)').matches) {
      window.gsap.to(tweenRef.current, { timeScale: 0.4, duration: 0.8, ease: 'power2.out' })
    }
  }

  const handleMouseLeave = () => {
    if (tweenRef.current && window.gsap && window.matchMedia('(pointer: fine)').matches) {
      window.gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out' })
    }
  }

  const renderSet = (keyPrefix) => (
    <div className="marquee-item" key={keyPrefix}>
      {ITEMS.flatMap((text, i) => [
        <span key={`${keyPrefix}-t${i}`}>{text}</span>,
        <div key={`${keyPrefix}-d${i}`} className="marquee-dot" />,
      ])}
    </div>
  )

  return (
    <section
      className="marquee-section"
      aria-hidden="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="marquee-track" ref={trackRef}>
        {renderSet('a')}
        {renderSet('b')}
      </div>
    </section>
  )
}
