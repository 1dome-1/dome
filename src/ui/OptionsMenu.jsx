import React, { useState } from 'react'

function OptionsMenu({ initialSettings, onBack }) {
  const [settings, setSettings] = useState(initialSettings)

  const handleSave = () => {
    onBack(settings)
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6">
      <div className="bg-gradient-to-b from-gray-900 to-black p-12 rounded-2xl border-4 border-yellow-500 max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-yellow-400 mb-8 text-center font-kanit">OPTIONS</h1>

        {/* Difficulty */}
        <div className="mb-8">
          <label className="block text-xl font-bold text-yellow-400 mb-3 font-kanit">DIFFICULTY</label>
          <div className="flex gap-4">
            {['easy', 'normal', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSettings({ ...settings, difficulty })}
                className={`px-6 py-3 rounded-lg font-bold transition-all font-kanit ${
                  settings.difficulty === difficulty
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {difficulty.toUpperCase()}
              </button>
            ))}</div>
        </div>

        {/* Volume */}
        <div className="mb-8">
          <label className="block text-xl font-bold text-yellow-400 mb-3 font-kanit">VOLUME</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.volume}
            onChange={(e) => setSettings({ ...settings, volume: parseFloat(e.target.value) })}
            className="w-full cursor-pointer"
          />
          <div className="text-gray-400 mt-2 font-kanit">{Math.round(settings.volume * 100)}%</div>
        </div>

        {/* Key Bindings */}
        <div className="mb-8">
          <label className="block text-xl font-bold text-yellow-400 mb-3 font-kanit">KEY BINDINGS</label>
          <div className="bg-black/50 p-4 rounded-lg text-sm text-gray-400 space-y-2 font-kanit">
            <div>W / ↑: Move Up</div>
            <div>S / ↓: Move Down</div>
            <div>A / ←: Move Left</div>
            <div>D / →: Move Right</div>
            <div>P: Attack</div>
            <div>O: Dance</div>
            <div>ESC: Pause</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-lg transition-all font-kanit"
          >
            Save
          </button>
          <button
            onClick={() => onBack(null)}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-lg transition-all font-kanit"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OptionsMenu
