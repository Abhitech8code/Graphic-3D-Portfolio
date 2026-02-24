import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const arsenalData = {
  design: {
    name: '🎨 DESIGN',
    color: '#00f0ff',
    tools: ['Canva', 'Photoshop', 'Illustrator', 'After Effects', 'Figma']
  },
  development: {
    name: '💻 DEVELOPMENT',
    color: '#a855f7',
    tools: ['VS Code', 'GitHub', 'React', 'Tailwind', 'Node.js', 'MongoDB', 'Next.js']
  },
  ai: {
    name: '🤖 AI & AUTOMATION',
    color: '#10b981',
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'Runway', 'ElevenLabs', 'n8n', 'Zapier']
  },
  video: {
    name: '🎥 VIDEO & CONTENT',
    color: '#f59e0b',
    tools: ['CapCut', 'Premiere Pro', 'OBS', 'DaVinci Resolve']
  },
  deployment: {
    name: '🚀 DEPLOYMENT',
    color: '#ef4444',
    tools: ['Vercel', 'Netlify', 'Firebase', 'Docker']
  }
};

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function ToolPod({ category, index, total, onHover, isHovered }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const data = arsenalData[category as keyof typeof arsenalData];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = (index / total) * Math.PI * 2 + clock.getElapsedTime() * 0.2;
      const radius = 5;
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() + index) * 0.3;
      meshRef.current.rotation.y = -angle;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerEnter={() => onHover(category)}
        onPointerLeave={() => onHover(null)}
      >
        <mesh scale={isHovered ? 1.2 : 1}>
          <boxGeometry args={[1.5, 2, 0.2]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={isHovered ? 1.5 : 0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <planeGeometry args={[1.4, 1.9]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ onHover }: { onHover: (cat: string | null) => void }) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const categories = Object.keys(arsenalData);

  const handleHover = (cat: string | null) => {
    setHoveredCategory(cat);
    onHover(cat);
  };

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f0ff" />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} color="#a855f7" />
      
      <EnergyCore />
      
      {categories.map((category, index) => (
        <ToolPod
          key={category}
          category={category}
          index={index}
          total={categories.length}
          onHover={handleHover}
          isHovered={hoveredCategory === category}
        />
      ))}
      
      <ParticleField />
      
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={[0.001, 0.001]}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
      
      <Environment preset="night" />
    </>
  );
}

function ToolTooltip({ category }: { category: string | null }) {
  if (!category) return null;
  const data = arsenalData[category as keyof typeof arsenalData];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 rounded-2xl p-6 min-w-[300px] z-10"
      style={{ borderColor: data.color }}
    >
      <h3 className="text-2xl font-bold mb-4" style={{ color: data.color }}>
        {data.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {data.tools.map((tool) => (
          <span
            key={tool}
            className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur"
            style={{ borderColor: data.color, borderWidth: 1 }}
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Arsenal3D() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="relative h-[600px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-black/50 backdrop-blur">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 3, 10], fov: 60 }}
      >
        <Scene onHover={setHoveredCategory} />
      </Canvas>
      
      <AnimatePresence>
        {hoveredCategory && <ToolTooltip category={hoveredCategory} />}
      </AnimatePresence>
    </div>
  );
}
