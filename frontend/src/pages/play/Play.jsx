import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import "./Play.css"

function Box(props) {
    const meshRef = useRef()
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (
        console.log("ok")
    ))
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[0.5, 2, 0.5]} />
            <meshStandardMaterial color={'black'} />
        </mesh>
    )
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
                <ambientLight intensity={10} />
                <pointLight position={[0, 1, -2]} />
                <Box position={[-5, 0, 0]} />
                <Box position={[5, 0, 0]} />
            </Canvas>
             </div>
        </div>
    )
}

export default Play