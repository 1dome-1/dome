import React from 'react'

function HUD({ health, score, combo, character }) {
  return (
    <div className="absolute top-0 left-0 right-0 p-6 z-20 pointer-events-none">
      <div className="flex justify-between items-start max-w-7xl mx-auto">
        {/* Left Side */}
        <div className="flex gap-6">
          <div className="bg-black/60 backdrop-blur px-6 py-4 rounded-lg border-2 border-yellow-500">
            <div className="text-sm text-gray-400 mb-1 font-kanit">CHARACTER</div>
            <div className="text-2xl font-bold text-yellow-400 font-kanit">{character}</div>
          </div>

          <div className="bg-black/60 backdrop-blur px-6 py-4 rounded-lg border-2 border-red-500">
            <div className="text-sm text-gray-400 mb-2 font-kanit">HEALTH</div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`text-2xl transition-all ${
                    i < health ? 'text-red-500 drop-shadow-lg' : 'text-gray-600'
                  }`}
                >
                  ❤️
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          <div className="bg-black/60 backdrop-blur px-6 py-4 rounded-lg border-2 border-green-500 text-right">
            <div className="text-sm text-gray-400 font-kanit">SCORE</div>
            <div className="text-4xl font-bold text-green-400 font-kanit">{score.toLocaleString()}</div>
          </div>

          {combo > 0 && (
            <div className="bg-black/60 backdrop-blur px-6 py-4 rounded-lg border-2 border-purple-500 text-right animate-pulse">
              <div className="text-sm text-gray-400 font-kanit">COMBO</div>
              <div className="text-3xl font-bold text-purple-400 font-kanit">x{combo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HUD
