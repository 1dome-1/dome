import React, { useState } from 'react'
import MainMenu from './ui/MainMenu'
import CharacterSelect from './ui/CharacterSelect'
import Game from './Game'
import OptionsMenu from './ui/OptionsMenu'

function App() {
  const [gameState, setGameState] = useState('menu') // 'menu' | 'options' | 'character-select' | 'game'
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [gameSettings, setGameSettings] = useState({
    keyBindings: {
      moveUp: 'w',
      moveDown: 's',
      moveLeft: 'a',
      moveRight: 'd',
      attack: 'p',
      dance: 'o',
      pause: 'Escape',
    },
    volume: 0.7,
    difficulty: 'normal',
  })

  const handlePlayGame = () => {
    setGameState('character-select')
  }

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
    setGameState('game')
  }

  const handleOptions = () => {
    setGameState('options')
  }

  const handleBackFromOptions = (newSettings) => {
    if (newSettings) {
      setGameSettings(newSettings)
    }
    setGameState('menu')
  }

  const handleBackToMenu = () => {
    setGameState('menu')
    setSelectedCharacter(null)
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      {gameState === 'menu' && (
        <MainMenu onPlay={handlePlayGame} onOptions={handleOptions} />
      )}
      {gameState === 'options' && (
        <OptionsMenu initialSettings={gameSettings} onBack={handleBackFromOptions} />
      )}
      {gameState === 'character-select' && (
        <CharacterSelect onSelect={handleCharacterSelect} onBack={handleBackToMenu} />
      )}
      {gameState === 'game' && selectedCharacter && (
        <Game character={selectedCharacter} settings={gameSettings} onGameEnd={handleBackToMenu} />
      )}
    </div>
  )
}

export default App
