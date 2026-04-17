import { useState, useEffect, useRef } from 'react'
import ScrollReveal from '../animation/ScrollReveal'
import SplitTextReveal from '../animation/SplitTextReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SERVICES = [
  {
    num: '01',
    title: 'Full-Service Vehicle Management',
    desc: 'We oversee all maintenance, detailing, repairs, registration, insurance, recalls, and inspections across every vehicle in your household.',
  },
  {
    num: '02',
    title: 'On-Call Concierge',
    desc: 'We pick up and deliver vehicles for any service, appointment, or need. Available when you need us, wherever you are.',
  },
  {
    num: '03',
    title: 'Fleet Oversight',
    desc: 'For multi-vehicle households, we track usage, rotate maintenance, monitor readiness, and ensure every car is road-ready at all times.',
  },
  {
    num: '04',
    title: 'Vendor Coordination',
    desc: 'We liaise directly with dealerships, mechanics, body shops, and specialists. Our trusted network means your vehicle is always in the right hands.',
  },
  {
    num: '05',
    title: 'Storage & Transport',
    desc: 'Secure vehicle storage, seasonal swaps, and transport across all 50 states and internationally. Your collection, protected and accessible.',
  },
  {
    num: '06',
    title: 'Custom Solutions',
    desc: 'Custom builds and wraps, luxury rentals, last-minute requests. We adapt to whatever your life requires.',
  },
]

const ALSO_AVAILABLE = [
  'Oil Changes', 'Tires & Rims', 'Full Body Work',
  'Interior Restoration', 'Classic Car Care', 'Window & Windshield',
  'Wraps & Customization', 'Tow Service', 'DMV Services',
  'Car Sales & Leasing', 'Lease Inspections', 'Full Mechanical',
]

function ServiceRow({ service, index, isOpen, onToggle }) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.08} y={24}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          onClick={onToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '24px 0',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 24,
            fontWeight: 300,
            color: '#96803e',
            width: 48,
            flexShrink: 0,
          }}>
            {service.num}
          </span>
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 20,
            color: hovered ? '#96803e' : '#f5f5f0',
            margin: 0,
            transition: 'color 0.3s ease',
            flex: 1,
          }}>
            {service.title}
          </h3>
          <span style={{
            fontFamily: 'var(--sans)',
            fontSize: 20,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.4)',
            width: 24,
            textAlign: 'center',
            flexShrink: 0,
            transition: 'color 0.3s ease',
          }}>
            {isOpen ? '\u2212' : '+'}
          </span>
        </div>
        <div style={{
          maxHeight: isOpen ? 120 : 0,
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}>
          <p style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 300,
            margin: 0,
            paddingLeft: 48,
            paddingBottom: 24,
          }}>
            {service.desc}
          </p>
        </div>
      </div>
    </ScrollReveal>
  )
}

function AlsoAvailableMarquee() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || !window.gsap) return

    const track = trackRef.current
    const items = track.querySelectorAll('.also-marquee-set')
    if (items.length < 2) return

    const itemWidth = items[0].offsetWidth

    tweenRef.current = window.gsap.to(track, {
      x: -itemWidth,
      duration: 28,
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

  const renderSet = (keyPrefix) => (
    <div className="also-marquee-set marquee-item" key={keyPrefix}>
      {ALSO_AVAILABLE.flatMap((text, i) => [
        <span key={`${keyPrefix}-t${i}`}>{text}</span>,
        <div key={`${keyPrefix}-d${i}`} className="marquee-dot" />,
      ])}
    </div>
  )

  return (
    <div className="also-available-marquee">
      <div className="marquee-track" ref={trackRef}>
        {renderSet('a')}
        {renderSet('b')}
      </div>
    </div>
  )
}

export default function ServicesSection({ data = SERVICES }) {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="services" className="section-pad">
      <div className="container">
        <div className="services-header">
          <div>
            <ScrollReveal>
              <span className="eyebrow">Services</span>
            </ScrollReveal>
            <SplitTextReveal>
              Comprehensive care,<br />managed <em>entirely</em> for you.
            </SplitTextReveal>
          </div>
          <div className="services-header-right">
            <ScrollReveal>
              <p>Your monthly concierge fee covers full management and coordination. Individual services are billed at cost, transparently, with no markup and no hidden fees.</p>
            </ScrollReveal>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {data.map((service, i) => (
            <ServiceRow
              key={service.num}
              service={service}
              index={i}
              isOpen={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>

        <ScrollReveal className="additional-services">
          <p className="add-serv-label">Also Available</p>
          <AlsoAvailableMarquee />
        </ScrollReveal>
      </div>
    </section>
  )
}
