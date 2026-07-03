import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import GameScene from './GameScene'

export default function App(){
  const [started, setStarted] = useState(false)
  return (
    <div className="app-root">
      {!started && (
        <div className="title-screen">
          <img src="https://res.cloudinary.com/dsucg33fv/image/upload/v1782709347/logo_i8827v.png" alt="logo" className="logo" />
          <h1>Crystal Hunter (R3F MVP)</h1>
          <div className="buttons">
            <button onClick={()=>setStarted(true)}>Start Game</button>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
          <p className="hint">Controls: WASD / Arrow keys — P = Attack, O = Skill</p>
        </div>
      )}

      {started && (
        <Canvas camera={{ position: [0, 20, 40], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={0.8} />
          <GameScene />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      )}
    </div>
  )
}
