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
            <boxGeometry args={[1, 1, 1]} />
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
            <boxGeometry args={[1, 1, 3]} />
            <meshStandardMaterial color={'white'} />
        </mesh>
    )
})

function Screen() {

    return <mesh position-y={-0.1}>
        <boxGeometry args={[25, 0.1, 21]} />
        <meshStandardMaterial color={'#484646'} />
    </mesh>
}

function Logic() {
    const gameSocket = new WebSocket('ws://localhost:8080/ws/game/');

    
    useEffect(() => {
        gameSocket.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        gameSocket.onmessage = function(e) {
            let objet = JSON.parse(e.data);
            meshRef1.current.position.z = -objet.paddles.player1;
            meshRef2.current.position.z = -objet.paddles.player2;
            ballRef.current.position.x = objet.ball.x;
            ballRef.current.position.z = -objet.ball.y;
            scoreRef.current.text = `${objet.score.player1} - ${objet.score.player2}`;
        };
      
        
    }, []);


    const meshRef1 = useRef()
    const meshRef2 = useRef()
    const ballRef = useRef()
    const scoreRef = useRef()

    useFrame((state, delta) => {
        keyMap['KeyW'] && (gameSocket.send(JSON.stringify({
            event: 'MOVE',
            direction : 1,
            playerId: 1,
        })))
        keyMap['KeyS'] && (gameSocket.send(JSON.stringify({
            event: 'MOVE',
            direction : -1,
            playerId: 1,
        })))
        keyMap['ArrowUp'] && (gameSocket.send(JSON.stringify({
            event: 'MOVE',
            direction : 1,
            playerId: 2,
        })))
        keyMap['ArrowDown'] && (gameSocket.send(JSON.stringify({
            event: 'MOVE',
            direction : -1,
            playerId: 2,
        })))
    })
    const keyMap = useKeyboard()

    return <>
        <Screen/>
        <ambientLight color={"#FFFFFF"} intensity={2} />
        <directionalLight color={"#FFFFFF"} castShadow position={ [ 0, 10, 10 ] } intensity={ 1.5 } />
        <directionalLight color={"#FFFFFF"} castShadow position={ [ 1, 1, 1 ] } intensity={ 1.5 } />
        <directionalLight color={"#FFFFFF"} castShadow position={ [ -1, 1, 1 ] } intensity={ 1.5 } />
        <Text rotation-x={-Math.PI / 2} ref={scoreRef} position={[0, 0, -8]} color="#ffffff" fontSize={4}>
            0 - 0
        </Text>
        <Paddle ref={meshRef1} position={[-11.5, 0, 0]} />
        <Paddle ref={meshRef2} position={[11.5, 0, 0]} />
        <Ball ref={ballRef} position={[3, 0, 0]} />
    </>
}

function Play() {
    return (
        <div className="d-flex justify-content-center  align-items-center h-100">
            <div>
            <Canvas linear flat camera={{ position: [0, 15, 0], fov: 75 }}>
                <color attach="background" args={["black"]} />
                <Logic></Logic>
            </Canvas>
            </div>
        </div>
    )
}

export default Play