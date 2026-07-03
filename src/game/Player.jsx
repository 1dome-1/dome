import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Player = forwardRef(({ character, settings, isPaused }, ref) => {
  const meshRef = useRef()
  const groupRef = useRef()
  const textureRef = useRef(null)
  const { camera } = useThree()

  const playerStateRef = useRef({
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    direction: 'down',
    isMoving: false,
    isAttacking: false,
    isDancing: false,
    currentFrame: 0,
    animationTimer: 0,
    health: 5,
  })

  const keysPressed = useRef({})

  useImperativeHandle(ref, () => ({
    getPosition: () => playerStateRef.current.position,
    getHealth: () => playerStateRef.current.health,
  }))

  useEffect(() => {
    // Load player texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      'https://res.cloudinary.com/dsucg33fv/image/upload/v1782709479/player_umd922.png',
      (texture) => {
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        textureRef.current = texture
        if (meshRef.current) {
          meshRef.current.material.map = texture
          meshRef.current.material.needsUpdate = true
        }
      }
    )

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      keysPressed.current[key] = true

      if (key === settings.keyBindings.attack) {
        playerStateRef.current.isAttacking = true
        setTimeout(() => {
          playerStateRef.current.isAttacking = false
        }, 500)
      }
      if (key === settings.keyBindings.dance) {
        playerStateRef.current.isDancing = !playerStateRef.current.isDancing
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [settings])

  useFrame((state, delta) => {
    if (isPaused || !meshRef.current) return

    const state_obj = playerStateRef.current
    const keys = keysPressed.current
    const moveSpeed = character.speed || 5

    // Movement handling (8 directions)
    const moveVector = new THREE.Vector3()

    if (keys[settings.keyBindings.moveUp] || keys['arrowup']) moveVector.z -= 1
    if (keys[settings.keyBindings.moveDown] || keys['arrowdown']) moveVector.z += 1
    if (keys[settings.keyBindings.moveLeft] || keys['arrowleft']) moveVector.x -= 1
    if (keys[settings.keyBindings.moveRight] || keys['arrowright']) moveVector.x += 1

    if (moveVector.length() > 0) {
      moveVector.normalize()
      state_obj.velocity.x = moveVector.x * moveSpeed
      state_obj.velocity.z = moveVector.z * moveSpeed
      state_obj.isMoving = true

      // Determine direction based on angle
      const angle = Math.atan2(moveVector.x, moveVector.z) * (180 / Math.PI)
      if (angle > -45 && angle < 45) state_obj.direction = 'down'
      else if (angle >= 45 && angle < 135) state_obj.direction = 'right'
      else if (angle >= 135 || angle < -135) state_obj.direction = 'up'
      else state_obj.direction = 'left'
    } else {
      state_obj.velocity.x = 0
      state_obj.velocity.z = 0
      state_obj.isMoving = false
    }

    // Update position
    state_obj.position.x += state_obj.velocity.x * delta
    state_obj.position.z += state_obj.velocity.z * delta

    // Clamp position to arena
    const arenaSize = 25
    state_obj.position.x = Math.max(-arenaSize, Math.min(arenaSize, state_obj.position.x))
    state_obj.position.z = Math.max(-arenaSize, Math.min(arenaSize, state_obj.position.z))

    // Update mesh position
    meshRef.current.position.set(state_obj.position.x, 0.5, state_obj.position.z)

    // Camera follows player
    camera.position.x = state_obj.position.x
    camera.position.z = state_obj.position.z + 12
    camera.lookAt(state_obj.position.x, 0, state_obj.position.z)

    // Animation frame update
    state_obj.animationTimer += delta
    const frameSpeed = state_obj.isMoving ? 0.1 : 0.15
    if (state_obj.animationTimer > frameSpeed) {
      state_obj.animationTimer = 0
      state_obj.currentFrame = (state_obj.currentFrame + 1) % 4
    }

    // Update UV coordinates for sprite animation
    if (textureRef.current && meshRef.current.material.map) {
      let rowOffset = 0
      if (state_obj.isDancing) rowOffset = 3
      else if (state_obj.isAttacking) rowOffset = 2
      else if (state_obj.isMoving) rowOffset = 1

      const colFrame = state_obj.currentFrame
      meshRef.current.material.map.offset.set((colFrame * 0.25), (rowOffset * 0.25))
      meshRef.current.material.map.repeat.set(0.25, 0.25)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={textureRef.current}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
})

Player.displayName = 'Player'

export default Player
