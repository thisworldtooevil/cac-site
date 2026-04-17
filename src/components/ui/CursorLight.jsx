import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function CursorLight() {
  const lightRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !window.matchMedia('(pointer: fine)').matches) return

    const light = lightRef.current
    const pos = { x: 0, y: 0 }
    const mouse = { x: 0, y: 0 }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    let rafId
    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.1
      pos.y += (mouse.y - pos.y) * 0.1
      light.style.transform = `translate(${pos.x - 300}px, ${pos.y - 300}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const hero = document.querySelector('.hero')
    if (hero) {
      hero.addEventListener('mouseenter', () => { light.style.opacity = '1' })
      hero.addEventListener('mouseleave', () => { light.style.opacity = '0' })
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [prefersReduced])

  return <div className="cursor-light" ref={lightRef} aria-hidden="true" />
}
