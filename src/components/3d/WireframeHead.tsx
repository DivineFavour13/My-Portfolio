import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Mouse position tracking
const mousePosition = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

// White sphere with wireframe overlay
function HeadSphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Main head sphere geometry (slightly elongated for head shape)
  const headGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 32, 32);
    geo.scale(0.85, 1.08, 0.9);
    return geo;
  }, []);
  
  // Neck geometry
  const neckGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.38, 0.48, 0.7, 16);
    geo.translate(0, -1.2, -0.05);
    return geo;
  }, []);
  
  // Wireframe geometry with more segments for denser grid
  const wireGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.002, 24, 24);
    geo.scale(0.85, 1.08, 0.9);
    return geo;
  }, []);
  
  // Neck wireframe
  const neckWireGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.38, 0.48, 0.7, 12);
    geo.translate(0, -1.2, -0.05);
    return geo;
  }, []);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth mouse tracking
      const targetRotationX = mousePosition.y * 0.2;
      const targetRotationY = mousePosition.x * 0.3;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        delta * 3
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        delta * 3
      );
      
      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Main white sphere body */}
      <mesh geometry={headGeo}>
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh geometry={headGeo}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Cyan wireframe overlay */}
      <mesh geometry={wireGeo}>
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      
      {/* Neck body */}
      <mesh geometry={neckGeo}>
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.8}
          metalness={0.05}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Neck wireframe */}
      <mesh geometry={neckWireGeo}>
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Accent rings */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`ring-${i}`}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0.7 - i * 0.35, 0]}
        >
          <ringGeometry
            args={[
              0.82 + Math.sin(i * 0.5) * 0.08,
              0.82 + Math.sin(i * 0.5) * 0.08 + 0.004,
              64
            ]}
          />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FFFFFF"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Grid floor
function GridFloor() {
  return (
    <gridHelper
      args={[12, 24, '#1a1a1a', '#111111']}
      position={[0, -2, -1]}
      rotation={[-Math.PI / 2.5, 0, 0]}
    />
  );
}

// Scene setup
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 3.8);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-3, 2, 3]} intensity={0.3} color="#00F0FF" />
      <pointLight position={[0, -3, 2]} intensity={0.2} />
      
      {/* Scaled and positioned to avoid navbar overlap */}
      <group scale={0.7} position={[0, -0.4, 0]}>
        <Float
          speed={0.5}
          rotationIntensity={0.03}
          floatIntensity={0.08}
        >
          <HeadSphere />
        </Float>
      </group>
      
      <Particles />
      <GridFloor />
    </>
  );
}

// Main component
export default function WireframeHead({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
