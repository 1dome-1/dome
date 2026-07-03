import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

const GROUND_URL = 'https://res.cloudinary.com/dsucg33fv/image/upload/v1782439980/ground_d1kjrx.png'
const PLAYER_URL = 'https://raw.githubusercontent.com/banyapon/banyapon.github.io/refs/heads/main/studio/images/player.png'

function useKeyState(){
  const keys = useRef({})
  useEffect(()=>{
    const down = (e)=>{ keys.current[e.key.toLowerCase()] = true }
    const up = (e)=>{ keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return ()=>{ window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  },[])
  return keys
}

export default function GameScene(){
  const ground = useLoader(THREE.TextureLoader, GROUND_URL)
  const playerTex = useLoader(THREE.TextureLoader, PLAYER_URL)
  ground.wrapS = ground.wrapT = THREE.RepeatWrapping
  ground.repeat.set(8,8)

  const playerRef = useRef()
  const keys = useKeyState()
  const speed = 0.6
  const [pos, setPos] = useState([0,1.2,0])

  useFrame(()=>{
    const k = keys.current
    let dx = 0, dz = 0
    if (k['w'] || k['arrowup']) dz -= speed
    if (k['s'] || k['arrowdown']) dz += speed
    if (k['a'] || k['arrowleft']) dx -= speed
    if (k['d'] || k['arrowright']) dx += speed
    if (dx!==0 || dz!==0){
      setPos(([x,y,z])=>[x+dx, y, z+dz])
    }
    if (playerRef.current){
      playerRef.current.position.x = pos[0]
      playerRef.current.position.z = pos[2]
      // simple facing
      playerRef.current.rotation.y = Math.atan2(dx, dz)
    }
  })

  return (
    <group>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]}>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial map={ground} />
      </mesh>

      <mesh ref={playerRef} position={pos}>
        <planeGeometry args={[4,4]} />
        <meshBasicMaterial map={playerTex} transparent={true} toneMapped={false} />
      </mesh>

      <gridHelper args={[200,40,'#1f2937','#0f172a']} position={[0,0.01,0]} />
    </group>
  )
}
