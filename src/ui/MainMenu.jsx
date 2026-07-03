import React from 'react'

function MainMenu({ onPlay, onOptions }) {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Logo & Title */}
      <div className="mb-12 text-center z-10">
        <img
          src="https://res.cloudinary.com/dsucg33fv/image/upload/v1782709347/logo_i8827v.png"
          alt="Dan Sai Adventure Logo"
          className="h-32 mx-auto mb-6 drop-shadow-2xl animate-bounce"
        />
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mb-4 font-kanit drop-shadow-lg">
          Dan Sai Adventure
        </h1>
        <p className="text-3xl text-yellow-400 font-kanit drop-shadow-lg">ผีตาโขน ด่านซ้าย</p>
      </div>

      {/* Menu Buttons */}
      <div className="z-10 flex flex-col gap-6">
        <button
          onClick={onPlay}
          className="px-12 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-2xl font-bold rounded-lg transition-all transform hover:scale-110 shadow-lg font-kanit"
        >
          ▶ Play Game
        </button>
        <button
          onClick={onOptions}
          className="px-12 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white text-2xl font-bold rounded-lg transition-all transform hover:scale-110 shadow-lg font-kanit"
        >
          ⚙️ Options
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center text-gray-500 text-sm z-10">
        <p>© 2024 Dan Sai Adventure | React + Three.js + Web Audio API</p>
      </div>
    </div>
  )
}

export default MainMenu
