import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import "./Play.css"
import { forwardRef } from 'react';
import { Text } from '@react-three/drei';


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

const Ball = forwardRef(function Ball(props, ref) {
    return (
        <mesh
            ref={ref}
            {...props}
        >
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color={'white'} />
        </mesh>
    )
})


const Paddle = forwardRef(function Paddle(props, ref) {
    return (
        <mesh
            ref={ref}
            {...props}
        >
            <boxGeometry args={[0.25, 0.8, 0.25]} />
            <meshStandardMaterial color={'white'} />
        </mesh>
    )
})

function Logic() {
    const gameSocket = new WebSocket('ws://localhost:8080/ws/game/');

    
    useEffect(() => {
        gameSocket.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        gameSocket.onmessage = function(e) {
            let objet = JSON.parse(e.data);
            meshRef1.current.position.y = objet.pos1;
            meshRef2.current.position.y = objet.pos2;
            ballRef.current.position.x = objet.ball.x;
            ballRef.current.position.y = objet.ball.y;
            scoreRef.current.text = `${objet.score[0]} - ${objet.score[1]}`;
            if (objet.score[0] == 3 || objet.score[1] == 3)
                setTimeout(() =>
                    alert("a player won the match!"),
                    500
                )
        };
    }, []);


    const meshRef1 = useRef()
    const meshRef2 = useRef()
    const ballRef = useRef()
    const scoreRef = useRef()

    useFrame((state, delta) => {
        keyMap['KeyW'] && (gameSocket.send(JSON.stringify({"p1": "up"})))
        keyMap['KeyS'] && (gameSocket.send(JSON.stringify({"p1": "down"})))
        keyMap['ArrowUp'] && (gameSocket.send(JSON.stringify({"p2": "up"})))
        keyMap['ArrowDown'] && (gameSocket.send(JSON.stringify({"p2": "down"})))
    })
    const keyMap = useKeyboard()

    return <>
        <ambientLight intensity={10} />
        <pointLight position={[0, 1, -2]} />
        <Text ref={scoreRef} position={[0, 2.3, 0]} color="#ffffff" fontSize={1}>
            0 - 0
        </Text>
        <Paddle ref={meshRef1} position={[-3, 0, 0]} />
        <Paddle ref={meshRef2} position={[3, 0, 0]} />
        <Ball ref={ballRef} position={[0, 0, 0]} />
    </>
}

function Play() {
    return (
        <div className="d-flex justify-content-center  align-items-center h-100">
            <div>
            <Canvas linear flat orthographic camera={{ zoom: 100, position: [0, 0, 100]}}>
                <color attach="background" args={["black"]} />
                <Logic></Logic>
            </Canvas>
            </div>
        </div>
    )
}

export default Play