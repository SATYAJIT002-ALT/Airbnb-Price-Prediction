'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ProceduralHouse = () => {
    const houseRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (houseRef.current) {
            houseRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            houseRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
        }
    });

    return (
        <group ref={houseRef}>
            {/* Base */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[3, 1, 3]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Roof */}
            <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]}>
                <cylinderGeometry args={[0, 2.8, 1, 4]} />
                <meshStandardMaterial color="#ff4081" roughness={0.4} metalness={0.3} />
            </mesh>

            {/* Door */}
            <mesh position={[0, 0.4, 1.51]}>
                <boxGeometry args={[0.6, 0.8, 0.05]} />
                <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Windows */}
            <mesh position={[-0.8, 0.6, 1.51]}>
                <boxGeometry args={[0.5, 0.5, 0.05]} />
                <meshStandardMaterial color="#88ccff" transparent opacity={0.6} envMapIntensity={2} />
            </mesh>
            <mesh position={[0.8, 0.6, 1.51]}>
                <boxGeometry args={[0.5, 0.5, 0.05]} />
                <meshStandardMaterial color="#88ccff" transparent opacity={0.6} envMapIntensity={2} />
            </mesh>
        </group>
    );
};

export default function Hero3D() {
    return (
        <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ProceduralHouse />
                </Float>
                
                <Environment preset="city" />
                <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
