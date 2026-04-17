import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function useLenis(stopped = false) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (lenisInstance) {
      lenisRef.current = lenisInstance
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenisInstance = lenis
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (stopped) {
      lenisRef.current.stop()
    } else {
      lenisRef.current.start()
    }
  }, [stopped])

  return lenisRef
}

export function getLenis() {
  return lenisInstance
}
