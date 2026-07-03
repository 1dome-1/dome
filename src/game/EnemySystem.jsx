import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function EnemySystem({ playerRef, isPaused, onPlayerHit, onEnemyKilled, difficulty }) {
  const enemiesRef = useRef([])
  const spawnTimerRef = useRef(0)
  const textureRef = useRef(null)
  const [enemies, setEnemies] = useState([])

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      'https://res.cloudinary.com/dsucg33fv/image/upload/v1782709477/enemy_jykcgz.png',
      (texture) => {
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
        textureRef.current = texture
      }
    )
  }, [])

  const createEnemy = (position) => {
    const enemyId = Date.now() + Math.random()
    const enemy = {
      id: enemyId,
      position: { x: position.x, y: 0.5, z: position.z },
      velocity: { x: 0, y: 0, z: 0 },
      direction: 1, // 1 for right, -1 for left
      state: 'idle', // 'idle', 'chasing', 'knocked-back', 'dead'
      health: 2,
      currentFrame: 0,
      animationTimer: 0,
      knockbackTimer: 0,
      dieVelocityX: 0,
      dieVelocityZ: 0,
      flashTimer: 0,
      flashIntensity: 0,
    }
    enemiesRef.current.push(enemy)
    return enemy
  }

  useFrame((state, delta) => {
    if (isPaused || !playerRef?.current) return

    const playerPos = playerRef.current.getPosition?.()
    if (!playerPos) return

    // Spawn enemies
    spawnTimerRef.current += delta
    const spawnRate = difficulty === 'hard' ? 1.5 : difficulty === 'easy' ? 3 : 2
    if (spawnTimerRef.current > spawnRate) {
      spawnTimerRef.current = 0
      const angle = Math.random() * Math.PI * 2
      const distance = 20
      const spawnPos = {
        x: playerPos.x + Math.cos(angle) * distance,
        z: playerPos.z + Math.sin(angle) * distance,
      }
      createEnemy(spawnPos)
    }

    // Update enemies
    enemiesRef.current = enemiesRef.current.filter((enemy) => {
      const distToPlayer = Math.hypot(
        enemy.position.x - playerPos.x,
        enemy.position.z - playerPos.z
      )

      // Update state based on distance
      if (distToPlayer < 15 && enemy.state === 'idle') {
        enemy.state = 'chasing'
      }

      // Chase player
      if (enemy.state === 'chasing') {
        const dx = playerPos.x - enemy.position.x
        const dz = playerPos.z - enemy.position.z
        const dist = Math.hypot(dx, dz)

        if (dist > 0.1) {
          const speed = 4
          enemy.velocity.x = (dx / dist) * speed
          enemy.velocity.z = (dz / dist) * speed
          enemy.direction = dx > 0 ? 1 : -1
        }
      }

      // Apply knockback
      if (enemy.state === 'knocked-back') {
        enemy.knockbackTimer -= delta
        if (enemy.knockbackTimer <= 0) {
          enemy.state = 'chasing'
        }
        enemy.velocity.x *= 0.95 // Friction
        enemy.velocity.z *= 0.95
      }

      // Falling/dying
      if (enemy.state === 'dead') {
        enemy.position.y -= enemy.dieVelocityX * delta
        enemy.dieVelocityX += 15 * delta // Gravity
        if (enemy.position.y < -10) {
          return false // Remove from array
        }
      }

      // Update position
      enemy.position.x += enemy.velocity.x * delta
      enemy.position.z += enemy.velocity.z * delta

      // Collision with player
      if (distToPlayer < 1 && enemy.state !== 'dead') {
        onPlayerHit()
      }

      // Animation
      enemy.animationTimer += delta
      if (enemy.animationTimer > 0.15) {
        enemy.animationTimer = 0
        enemy.currentFrame = (enemy.currentFrame + 1) % 4
      }

      // Flash effect
      if (enemy.flashTimer > 0) {
        enemy.flashTimer -= delta
        enemy.flashIntensity = Math.max(0, enemy.flashTimer / 0.2)
      }

      return enemy.position.y > -15 // Remove if too far below
    })

    setEnemies([...enemiesRef.current])
  })

  return (
    <group>
      {enemies.map((enemy) => (
        <mesh
          key={enemy.id}
          position={[enemy.position.x, enemy.position.y, enemy.position.z]}
          scale={[enemy.direction, 1, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textureRef.current}
            transparent={true}
            side={THREE.DoubleSide}
            color={new THREE.Color(1 - enemy.flashIntensity * 0.5, 1 - enemy.flashIntensity * 0.5, 1 - enemy.flashIntensity * 0.5)}
          />
        </mesh>
      ))}
    </group>
  )
}

export default EnemySystem
