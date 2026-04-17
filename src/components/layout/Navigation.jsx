import { useState, useEffect, useCallback } from 'react'
import { getLenis } from '../../hooks/useLenis'

const BASE = import.meta.env.BASE_URL

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const scrollTo = useCallback((e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(id)
    if (target) {
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''} aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => {
            e.preventDefault()
            const lenis = getLenis()
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            <img
              src={`${BASE}assets/CAC_WHITE_LOGO.png`}
              alt=""
              className="nav-logo-img"
            />
            Cali Auto <span>Concierge</span>
          </a>
          <ul className="nav-links">
            <li><a href="#services" onClick={(e) => scrollTo(e, '#services')}>Services</a></li>
            <li><a href="#experience" onClick={(e) => scrollTo(e, '#experience')}>Experience</a></li>
            <li><a href="#coverage" onClick={(e) => scrollTo(e, '#coverage')}>Coverage</a></li>
            <li><a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>Contact</a></li>
          </ul>
          <a href="#contact" className="nav-cta" onClick={(e) => scrollTo(e, '#contact')}>Get in Touch</a>
          <button
            className={`nav-toggle${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">&times;</button>
        <a href="#services" className="mobile-nav-link" onClick={(e) => scrollTo(e, '#services')}>Services</a>
        <a href="#experience" className="mobile-nav-link" onClick={(e) => scrollTo(e, '#experience')}>Experience</a>
        <a href="#coverage" className="mobile-nav-link" onClick={(e) => scrollTo(e, '#coverage')}>Coverage</a>
        <a href="#contact" className="mobile-nav-link" onClick={(e) => scrollTo(e, '#contact')}>Contact</a>
        <a href="tel:3234230000" style={{
          fontFamily: 'var(--sans)', fontSize: '14px', letterSpacing: '2px',
          color: 'var(--gold-dim)', fontWeight: 300
        }}>(323) 423-0000</a>
      </div>
    </>
  )
}
