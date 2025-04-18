import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { OrbitControls, Stars } from '@react-three/drei';

function AnimatedCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="indigo" />
    </mesh>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <AnimatedCube />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}