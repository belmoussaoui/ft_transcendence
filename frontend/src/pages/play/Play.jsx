import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import "./Play.css"
import { forwardRef } from 'react';
import { Stage, Text } from '@react-three/drei';
import { useLocation, useNavigate } from "react-router-dom";


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
            castShadow
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
            castShadow
            ref={ref}
            {...props}
        >
            <boxGeometry args={[1, 1, 3]} />
            <meshStandardMaterial color={'white'} />
        </mesh>
    )
})

function Screen() {

    return <>
        <mesh position-y={-0.6} receiveShadow>
            <boxGeometry args={[30, 0.01, 22]} />
            <meshStandardMaterial color={'#413b3b'} />
        </mesh>
    </>
    
}

function Logic() {
    const gameSocket = new WebSocket('ws://localhost:8080/ws/game/');
    const { state } = useLocation();
    const navigate = useNavigate();

    
    useEffect(() => {
        gameSocket.onopen = () => {
            console.log(state);
            gameSocket.send(JSON.stringify({
                event: 'CONFIG',
                speed : state.speed,
                points: state.points,
            }))
        };


        gameSocket.onmessage = function(e) {
            let objet = JSON.parse(e.data);
            if (objet.state == "terminate")
            setTimeout(() => {
                navigate("/");
            }, 1000);
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
        keyMap['Space'] && (gameSocket.send(JSON.stringify({
            event: 'START',
        })))
    })
    const keyMap = useKeyboard()

    return <>
        <Screen/>
        <directionalLight shadow-camera-left={-50} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} color={"#FFFFFF"} castShadow position={ [ 20, 5, 15 ] } intensity={ 2 } />
        <directionalLight shadow-camera-left={-50} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} color={"#FFFFFF"} castShadow position={ [ -10, 20, 15 ] } intensity={ 1 } />

        
        <Text rotation-x={-Math.PI / 2} ref={scoreRef} position={[0, 0, -8]} color="#ffffff" fontSize={4}>
            0 - 0
        </Text>
        <Paddle ref={meshRef1} position={[-14, 0, 0]} />
        <Paddle ref={meshRef2} position={[14, 0, 0]} />
        <Ball ref={ballRef} position={[3, 0, 0]} />
    </>
}

function Play() {
    return (
        <div className="d-flex justify-content-center  align-items-center h-100">
            <div>
            <Canvas shadows linear flat camera={{ position: [0, 35, 0], fov: 40 }}>
                <Stage shadows={false} adjustCamera={false}>
                <Logic></Logic>
                </Stage>
            </Canvas>
            </div>
        </div>
    )
}

export default Play