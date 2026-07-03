import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Ground() {
  const groundRef = useRef()

  useEffect(() => {
    if (!groundRef.current) return

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      'https://res.cloudinary.com/dsucg33fv/image/upload/v1782439980/ground_d1kjrx.png',
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(4, 4)
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        groundRef.current.material.map = texture
        groundRef.current.material.needsUpdate = true
      }
    )
  }, [])

  return (
    <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={0x4a4a4a} />
    </mesh>
  )
}

export default Ground
