import { useState, useCallback } from 'react'
import { useLenis } from './hooks/useLenis'
import Loader from './components/ui/Loader'
import GrainOverlay from './components/ui/GrainOverlay'
import CursorLight from './components/ui/CursorLight'
import Navigation from './components/layout/Navigation'
import VideoHero from './components/sections/VideoHero'
import Marquee from './components/sections/Marquee'
import Statement from './components/sections/Statement'
import About from './components/sections/About'
import ImageDivider from './components/sections/ImageDivider'
import Services from './components/sections/Services'
// import VehicleShowcase from './components/sections/VehicleShowcase' // 3D vehicle — re-enable when Mistral GLB is ready
import VehicleDivider from './components/sections/VehicleDivider'
import Experience from './components/sections/Experience'
import Coverage from './components/sections/Coverage'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  useLenis(!loaderDone)

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true)
  }, [])

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      {loaderDone && (
        <>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <GrainOverlay />
          <CursorLight />
          <Navigation />
          <main id="main-content">
            <VideoHero />
            <Marquee />
            <Statement />
            <About />
            <ImageDivider />
            <Services />
            <ImageDivider
              image="mistral-gear-shift.jpg"
              variant="craft"
              eyebrow="Craft"
            >
              &ldquo;Every detail, considered.&rdquo;
            </ImageDivider>
            <VehicleDivider />
            <Experience />
            <Coverage />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
