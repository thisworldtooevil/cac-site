import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import { useScroll } from 'motion/react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const MODEL_PATH = `${import.meta.env.BASE_URL}assets/cac-vehicle.glb`

function VehicleModel({ reducedMotion }) {
  const { scene } = useGLTF(MODEL_PATH)
  const groupRef = useRef()

  useEffect(() => {
    if (!scene) return
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 3 / maxDim
    scene.scale.setScalar(scale)
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  }, [scene])

  // Idle float: subtle sine-wave oscillation on multiple axes
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    const t = state.clock.elapsedTime

    // Gentle pitch oscillation (nose up/down): ~2 degrees, 4s cycle
    groupRef.current.rotation.x = Math.sin(t / 4) * 0.035

    // Slow yaw drift (left/right): ~1.5 degrees, 6s cycle
    groupRef.current.rotation.y = Math.sin(t / 6) * 0.026

    // Vertical float (up/down): ~3cm, 5s cycle
    groupRef.current.position.y = Math.sin(t / 5) * 0.03
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function CameraController({ scrollProgress, reducedMotion }) {
  const { camera } = useThree()

  useFrame(() => {
    if (reducedMotion) {
      camera.position.set(0, 1.0, 5.5)
      camera.lookAt(0, 0.3, 0)
      return
    }
    const progress = scrollProgress.get()
    const z = THREE.MathUtils.lerp(8, 3.5, Math.min(progress * 1.4, 1))
    const y = THREE.MathUtils.lerp(1.2, 0.8, Math.min(progress * 1.4, 1))
    camera.position.set(0, y, z)
    camera.lookAt(0, 0.3, 0)
  })

  return null
}

function Scene({ scrollProgress, reducedMotion }) {
  return (
    <>
      <CameraController scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      {/* Lighting: moody automotive studio */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#96803e" />
      <spotLight position={[0, 8, 0]} intensity={0.5} angle={0.4} penumbra={1} color="#ffffff" />

      {/* Ground reflection */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
        color="#000000"
      />

      {/* The car with idle float */}
      <Suspense fallback={null}>
        <VehicleModel reducedMotion={reducedMotion} />
      </Suspense>

      {/* Environment for body reflections */}
      <Environment preset="night" />
    </>
  )
}

export default function VehicleShowcase() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={sectionRef}
      className="vehicle-showcase"
    >
      <div className="vehicle-showcase-sticky">
        <Canvas
          camera={{ fov: 40, near: 0.1, far: 100, position: [0, 1.2, 8] }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: '#0a0a0a' }}
        >
          <Scene scrollProgress={scrollYProgress} reducedMotion={prefersReduced} />
        </Canvas>
      </div>
    </section>
  )
}

useGLTF.preload(MODEL_PATH)
