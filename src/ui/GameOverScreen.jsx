import React, { useState } from 'react'

function GameOverScreen({ score, character, onRestart }) {
  const [playerName, setPlayerName] = useState('')

  const handleSubmitScore = () => {
    const highScores = JSON.parse(localStorage.getItem('danSaiHighScores') || '[]')
    highScores.push({
      name: playerName || 'Anonymous',
      score,
      character,
      date: new Date().toISOString(),
    })
    highScores.sort((a, b) => b.score - a.score)
    localStorage.setItem('danSaiHighScores', JSON.stringify(highScores.slice(0, 10)))

    onRestart()
  }

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center">
      <div className="bg-gradient-to-b from-gray-900 to-black p-12 rounded-2xl border-4 border-red-500 text-center max-w-md">
        <h1 className="text-5xl font-bold text-red-500 mb-8 font-kanit">GAME OVER</h1>
        <p className="text-gray-400 text-lg mb-8 font-kanit">เกมจบลงแล้ว</p>

        <div className="bg-black/50 p-6 rounded-lg mb-8 border-2 border-yellow-500">
          <div className="text-sm text-gray-400 mb-2 font-kanit">FINAL SCORE</div>
          <div className="text-5xl font-bold text-yellow-400 font-kanit">{score.toLocaleString()}</div>
          <div className="text-gray-500 mt-4 font-kanit">Character: {character}</div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-2 border-yellow-500 focus:outline-none focus:border-green-500 placeholder-gray-500 font-kanit"
          />
        </div>

        <button
          onClick={handleSubmitScore}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 font-kanit"
        >
          Submit & Restart
        </button>
      </div>
    </div>
  )
}

export default GameOverScreen
