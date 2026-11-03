import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function seededRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || import.meta.env.MODE === 'test') return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.z = 6

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCompact = window.matchMedia('(max-width: 700px)').matches
    const particleCount = isCompact ? 34 : 72
    const random = seededRandom(42)
    const positions = new Float32Array(particleCount * 3)

    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (random() - 0.5) * 10
      positions[index * 3 + 1] = (random() - 0.5) * 8
      positions[index * 3 + 2] = (random() - 0.5) * 4
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x6debd2,
      size: isCompact ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    const lineVertices: number[] = []
    for (let first = 0; first < particleCount; first += 1) {
      for (let second = first + 1; second < particleCount; second += 1) {
        const ax = positions[first * 3]
        const ay = positions[first * 3 + 1]
        const az = positions[first * 3 + 2]
        const bx = positions[second * 3]
        const by = positions[second * 3 + 1]
        const bz = positions[second * 3 + 2]
        const distance = Math.hypot(ax - bx, ay - by, az - bz)
        if (distance < 1.25) lineVertices.push(ax, ay, az, bx, by, bz)
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3))
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2ea895,
      transparent: true,
      opacity: 0.12,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    let frameId = 0
    let pointerX = 0
    let pointerY = 0

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const updatePointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.18
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.12
    }

    const render = () => {
      points.rotation.y += 0.0007
      lines.rotation.y = points.rotation.y
      scene.rotation.x += (pointerY - scene.rotation.x) * 0.018
      scene.rotation.y += (pointerX - scene.rotation.y) * 0.018
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', updatePointer, { passive: true })
      render()
    } else {
      renderer.render(scene, camera)
    }

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', updatePointer)
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
