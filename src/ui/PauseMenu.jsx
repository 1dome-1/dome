import React from 'react'

function PauseMenu({ onResume, onQuit }) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center">
      <div className="bg-gradient-to-b from-gray-900 to-black p-12 rounded-2xl border-4 border-yellow-500 text-center max-w-md">
        <h1 className="text-5xl font-bold text-yellow-400 mb-8 font-kanit">PAUSED</h1>
        <p className="text-gray-400 text-lg mb-8 font-kanit">เกมชั่วหน่วง</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onResume}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 font-kanit"
          >
            Resume Game
          </button>
          <button
            onClick={onQuit}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 font-kanit"
          >
            Quit to Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default PauseMenu
