import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const skillsData = {
  frontend: [
    { name: 'HTML5', icon: '🌐', level: 95, color: '#e34c26' },
    { name: 'CSS3', icon: '🎨', level: 95, color: '#264de4' },
    { name: 'JavaScript', icon: '⚡', level: 90, color: '#f0db4f' },
    { name: 'React', icon: '⚛️', level: 92, color: '#61dafb' },
    { name: 'GSAP', icon: '🎬', level: 88, color: '#88ce02' },
    { name: 'Three.js', icon: '🎲', level: 85, color: '#000000' },
  ],
  design: [
    { name: 'Canva', icon: '🎨', level: 95, color: '#00c4cc' },
    { name: 'Photoshop', icon: '🖼️', level: 90, color: '#31a8ff' },
    { name: 'Premiere Pro', icon: '🎥', level: 85, color: '#9999ff' },
    { name: 'Figma', icon: '✨', level: 88, color: '#f24e1e' },
  ],
  tech: [
    { name: 'AI Tools', icon: '🤖', level: 92, color: '#10b981' },
    { name: 'Prompt Eng.', icon: '💬', level: 90, color: '#8b5cf6' },
    { name: 'Automation', icon: '⚙️', level: 87, color: '#f59e0b' },
    { name: 'Web Animations', icon: '🌊', level: 93, color: '#06b6d4' },
    { name: 'UI/UX', icon: '🎯', level: 89, color: '#ec4899' },
  ],
};

const allSkills = [...skillsData.frontend, ...skillsData.design, ...skillsData.tech];

// AI Core Component
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -t * 0.15;
      wireframeRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group>
      {/* Inner Glowing Sphere */}
      <mesh ref={meshRef} renderOrder={2}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Wireframe Sphere */}
      <lineSegments ref={wireframeRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Outer Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rotating Energy Rings */}
      {[0, 60, 120].map((rotation, i) => (
        <mesh key={i} rotation={[0, 0, (rotation * Math.PI) / 180]}>
          <torusGeometry args={[1.6, 0.02, 16, 100]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Center Text */}
      <Html center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none">
          <div className="text-cyan-400 font-bold text-xs whitespace-nowrap animate-pulse">
            AI CORE
          </div>
        </div>
      </Html>
    </group>
  );
}

// Skill Card Component
function SkillCard({ skill, index, total, onHover, isHovered, onClick, isSelected }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current && !isSelected) {
      const t = clock.getElapsedTime();
      const angle = (index / total) * Math.PI * 2 + t * 0.15;
      const radius = 6;
      groupRef.current.position.x = Math.cos(angle) * radius;
      groupRef.current.position.z = Math.sin(angle) * radius;
      groupRef.current.position.y = Math.sin(t * 0.5 + index) * 0.5;
      groupRef.current.rotation.y = -angle + Math.PI / 2;
    }

    if (cardRef.current) {
      const targetScale = hovered || isSelected ? 1.3 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(skill);
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(skill);
        }}
      >
        {/* Glass Card */}
        <mesh ref={cardRef} renderOrder={1}>
          <boxGeometry args={[1.8, 2.4, 0.1]} />
          <meshPhysicalMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered || isSelected ? 0.8 : 0.2}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
            transmission={0.5}
            thickness={0.5}
          />
        </mesh>

        {/* Glowing Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.8, 2.4, 0.1)]} />
          <lineBasicMaterial 
            color={skill.color} 
            transparent 
            opacity={hovered || isSelected ? 1 : 0.5}
            linewidth={2}
          />
        </lineSegments>

        {/* Skill Info */}
        <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
          <div className="text-center select-none" style={{ width: '120px' }}>
            <div className="text-4xl mb-2">{skill.icon}</div>
            <div className="text-white font-bold text-xs mb-2">{skill.name}</div>
            {(hovered || isSelected) && (
              <div className="text-cyan-400 text-xs">
                {skill.level}%
              </div>
            )}
          </div>
        </Html>

        {/* Progress Ring */}
        {(hovered || isSelected) && (
          <mesh rotation={[0, 0, 0]} position={[0, -1.5, 0.1]}>
            <ringGeometry args={[0.4, 0.5, 32, 1, 0, (skill.level / 100) * Math.PI * 2]} />
            <meshBasicMaterial color={skill.color} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

// Starfield Particles
function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
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
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Energy Beam
function EnergyBeam({ from, to, visible }: { from: THREE.Vector3; to: THREE.Vector3; visible: boolean }) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (lineRef.current && visible) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    }
  });

  if (!visible) return null;

  const points = [from, to];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.5} linewidth={2} />
    </line>
  );
}

// Main Scene
function Scene({ onHover, onClick, selectedSkill, isMobile }: any) {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);
  const { camera } = useThree();

  const handleHover = (skill: any) => {
    setHoveredSkill(skill);
    onHover(skill);
  };

  useFrame(() => {
    if (selectedSkill) {
      camera.position.lerp(new THREE.Vector3(0, 2, 8), 0.05);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.lerp(new THREE.Vector3(0, 3, 12), 0.05);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate={!selectedSkill}
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00f0ff" />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#a855f7" />
      <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={1} color="#06b6d4" />

      <AICore />

      {allSkills.map((skill, index) => (
        <SkillCard
          key={skill.name}
          skill={skill}
          index={index}
          total={allSkills.length}
          onHover={handleHover}
          isHovered={hoveredSkill?.name === skill.name}
          onClick={onClick}
          isSelected={selectedSkill?.name === skill.name}
        />
      ))}

      <Starfield />

      {selectedSkill && (
        <EnergyBeam
          from={new THREE.Vector3(0, 0, 0)}
          to={new THREE.Vector3(0, 0, 6)}
          visible={true}
        />
      )}

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.05}
          bokehScale={selectedSkill ? 3 : 1.5}
        />
      </EffectComposer>

      <Environment preset="night" />
    </>
  );
}

// Skill Detail Panel
function SkillDetailPanel({ skill, onClose }: any) {
  if (!skill) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-2xl border-2 rounded-3xl p-8 min-w-[350px] z-20"
      style={{ borderColor: skill.color }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
      >
        ✕
      </button>

      <div className="text-center">
        <div className="text-6xl mb-4">{skill.icon}</div>
        <h3 className="text-3xl font-bold mb-4" style={{ color: skill.color }}>
          {skill.name}
        </h3>

        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/10"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke={skill.color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - skill.level / 100)}`}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: skill.color }}>
              {skill.level}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Proficiency</span>
            <span className="text-white font-semibold">{skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile View
function MobileSkillsView({ onSkillSelect }: any) {
  return (
    <div className="grid gap-4 max-w-2xl mx-auto px-4">
      {allSkills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSkillSelect(skill)}
          className="relative p-6 rounded-2xl backdrop-blur-xl bg-black/50 border-2 cursor-pointer hover:scale-105 transition-transform"
          style={{ borderColor: skill.color }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{skill.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2" style={{ color: skill.color }}>
                {skill.name}
              </h3>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold" style={{ color: skill.color }}>
              {skill.level}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Main Export
export function Arsenal3DScene({ isMobile, onSkillSelect, selectedSkill }: any) {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null);

  const handleSkillClick = (skill: any) => {
    onSkillSelect(selectedSkill?.name === skill.name ? null : skill);
  };

  if (isMobile) {
    return (
      <>
        <MobileSkillsView onSkillSelect={onSkillSelect} />
        <AnimatePresence>
          {selectedSkill && (
            <SkillDetailPanel skill={selectedSkill} onClose={() => onSkillSelect(null)} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="relative h-[700px] rounded-3xl overflow-hidden border border-cyan-500/20 bg-black/30 backdrop-blur">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        camera={{ 
          position: [0, 3, 12], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
      >
        <Scene 
          onHover={setHoveredSkill} 
          onClick={handleSkillClick}
          selectedSkill={selectedSkill}
          isMobile={isMobile}
        />
      </Canvas>

      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailPanel skill={selectedSkill} onClose={() => onSkillSelect(null)} />
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredSkill && !selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-xl border z-10"
            style={{ 
              backgroundColor: `${hoveredSkill.color}20`,
              borderColor: hoveredSkill.color 
            }}
          >
            <span className="text-white font-semibold">{hoveredSkill.name}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
