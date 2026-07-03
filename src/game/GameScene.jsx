import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Player from './Player'
import Ground from './Ground'
import EnemySystem from './EnemySystem'

function GameScene({ character, isPaused, onPlayerHit, onEnemyKilled, settings }) {
  const playerRef = useRef(null)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
      <pointLight position={[0, 15, 0]} intensity={0.5} />

      {/* Ground */}
      <Ground />

      {/* Player */}
      <Player 
        ref={playerRef}
        character={character} 
        settings={settings} 
        isPaused={isPaused} 
      />

      {/* Enemy System */}
      <EnemySystem 
        playerRef={playerRef}
        isPaused={isPaused}
        onPlayerHit={onPlayerHit}
        onEnemyKilled={onEnemyKilled}
        difficulty={settings.difficulty}
      />
    </>
  )
}

export default GameScene
