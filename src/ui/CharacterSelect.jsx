import React from 'react'

function CharacterSelect({ onSelect, onBack }) {
  const characters = [
    {
      id: 'red',
      name: 'Phi Ta Khon Red',
      thaiName: 'พญายักษ์',
      speed: 6.5,
      description: 'High speed, agile offensive',
      color: 'from-red-600 to-red-400',
    },
    {
      id: 'green',
      name: 'Phi Ta Khon Green',
      thaiName: 'ไพรพฤกษา',
      speed: 5.2,
      description: 'Medium speed, high jump',
      color: 'from-green-600 to-green-400',
    },
    {
      id: 'gold',
      name: 'Phi Ta Khon Thong',
      thaiName: 'สิริมงคล',
      speed: 5.0,
      description: 'Rich stats, score magnet',
      color: 'from-yellow-600 to-yellow-400',
    },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mb-4 font-kanit">
          Select Character
        </h1>
        <p className="text-2xl text-yellow-500 font-kanit">เลือกตัวละคร</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mb-12">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelect(char)}
            className={`p-8 rounded-lg border-4 border-yellow-500 bg-gradient-to-b ${char.color} bg-opacity-20 hover:bg-opacity-40 transition-all transform hover:scale-105 cursor-pointer`}
          >
            <div className="text-3xl font-bold text-yellow-400 mb-2">{char.name}</div>
            <div className="text-lg text-yellow-300 mb-4">{char.thaiName}</div>
            <div className="text-sm text-gray-300 mb-4">{char.description}</div>
            <div className="text-yellow-500 font-bold">Speed: {char.speed}</div>
          </button>
        ))}</div>

      <button
        onClick={onBack}
        className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors font-kanit"
      >
        Back
      </button>
    </div>
  )
}

export default CharacterSelect
