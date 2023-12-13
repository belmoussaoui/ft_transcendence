import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import "./Play.css"
import { forwardRef } from 'react';

function useKeyboard() {
    const keyMap = useRef({})
  
    useEffect(() => {
      const onDocumentKey = (e) => {
        keyMap.current[e.code] = e.type === 'keydown'
      }
      document.addEventListener('keydown', onDocumentKey)
      document.addEventListener('keyup', onDocumentKey)
      return () => {
        document.removeEventListener('keydown', onDocumentKey)
        document.removeEventListener('keyup', onDocumentKey)
      }
    })
  
    return keyMap.current
  }

const Paddle = forwardRef(function Paddle(props, ref) {
    return (
        <mesh
            ref={ref}
            {...props}
        >
            <boxGeometry args={[0.5, 2, 0.5]} />
            <meshStandardMaterial color={'black'} />
        </mesh>
    )
  }
  )

function Logic() {
    const meshRef1 = useRef()
    const meshRef2 = useRef()

    useFrame((state, delta) => {
        console.log(meshRef1);
        keyMap['KeyW'] && (meshRef1.current.position.y += 3 * delta)
        keyMap['KeyS'] && (meshRef1.current.position.y -= 3 * delta)
        keyMap['ArrowUp'] && (meshRef2.current.position.y += 3 * delta)
        keyMap['ArrowDown'] && (meshRef2.current.position.y -= 3 * delta)
    })
    const keyMap = useKeyboard()

    return <>
        <ambientLight intensity={10} />
        <pointLight position={[0, 1, -2]} />
        <Paddle ref={meshRef1} position={[-5, 0, 0]} />
        <Paddle ref={meshRef2} position={[5, 0, 0]} />
    </>
}

function Play() {
    const gameSocket = new WebSocket('ws://localhost:8080/ws/game/');

    
    useEffect(() => {
        gameSocket.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        gameSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    }, []);    
    return (
        <div className="container-fluid">
            <div className="row">
            <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100]}}>
                <Logic></Logic>
            </Canvas>
             </div>
        </div>
    )
}

export default Play