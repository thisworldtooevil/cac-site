import { useEffect, useRef, useState } from 'react'
import { animate } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE_SMOOTH = [0.16, 1, 0.3, 1]

export default function Loader({ onComplete }) {
  const prefersReduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const logoRef = useRef(null)
  const screenRef = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    if (prefersReduced) {
      setVisible(false)
      onComplete?.()
      return
    }

    // Preload hero video immediately so it's cached before loader exits
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'video'
    preloadLink.href = `${import.meta.env.BASE_URL}assets/cac-hero-video.mp4`
    document.head.appendChild(preloadLink)

    const sequence = async () => {
      // Step 1: Logo fills from bottom to top via clip-path (0.8s)
      if (!logoRef.current) return
      await animate(logoRef.current, {
        clipPath: 'inset(0 0 0 0)',
      }, {
        duration: 0.8,
        ease: EASE_SMOOTH,
      }).finished

      // Step 2: Hold for 1.2s
      await new Promise(r => setTimeout(r, 1200))

      // Step 3: Mount site content BEFORE fade starts (video begins loading)
      onComplete?.()

      // Step 4: Fade entire loader out (logo + background together)
      if (screenRef.current) {
        await animate(screenRef.current, { opacity: 0 }, {
          duration: 0.8,
          ease: EASE_SMOOTH,
        }).finished
      }

      // Step 5: Unmount loader
      setVisible(false)
    }

    sequence()
  }, [])

  if (!visible) return null

  return (
    <div className="loader-screen" ref={screenRef}>
      <div
        className="loader-logo-wrap"
        ref={logoRef}
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/CAC_WHITE_LOGO.png`}
          alt="Cali Auto Concierge"
          draggable={false}
        />
      </div>
    </div>
  )
}
