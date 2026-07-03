import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import GameScene from './game/GameScene'
import HUD from './ui/HUD'
import PauseMenu from './ui/PauseMenu'
import GameOverScreen from './ui/GameOverScreen'

function Game({ character, settings, onGameEnd }) {
  const [gameStatus, setGameStatus] = useState('playing') // 'playing' | 'paused' | 'gameOver'
  const [playerHealth, setPlayerHealth] = useState(5)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameStateData, setGameStateData] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === settings.keyBindings.pause || e.key.toLowerCase() === 'p' || e.key === 'Escape') {
        setGameStatus((prev) => (prev === 'playing' ? 'paused' : 'playing'))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings])

  const handlePlayerHit = () => {
    setPlayerHealth((prev) => {
      const newHealth = Math.max(0, prev - 1)
      if (newHealth === 0) {
        setGameStatus('gameOver')
      }
      return newHealth
    })
  }

  const handleEnemyKilled = (points) => {
    setScore((prev) => prev + points)
    setCombo((prev) => prev + 1)
  }

  const handleResumeGame = () => {
    setGameStatus('playing')
  }

  const handleRestartGame = () => {
    onGameEnd()
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 60 }}
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        <GameScene
          character={character}
          isPaused={gameStatus === 'paused'}
          onPlayerHit={handlePlayerHit}
          onEnemyKilled={handleEnemyKilled}
          settings={settings}
        />
      </Canvas>

      <HUD health={playerHealth} score={score} combo={combo} character={character.name} />

      {gameStatus === 'paused' && (
        <PauseMenu onResume={handleResumeGame} onQuit={handleRestartGame} />
      )}

      {gameStatus === 'gameOver' && (
        <GameOverScreen score={score} character={character.name} onRestart={handleRestartGame} />
      )}
    </div>
  )
}

export default Game
