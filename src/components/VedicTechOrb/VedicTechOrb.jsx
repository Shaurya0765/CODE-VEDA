import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Simple camera controls to avoid dependency issues
const SimpleControls = () => {
  const { camera, gl } = useThree();
  const isActive = useRef(true);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Initialize camera
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    
    const handleMouseMove = (event) => {
      if (!isActive.current) return;
      
      // Get normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      
      // Smooth camera movement
      const dampingFactor = 0.05;
      camera.position.x += (Math.sin(x) * 2 - camera.position.x) * dampingFactor;
      camera.position.z += (Math.cos(x) * 5 - camera.position.z) * dampingFactor;
      camera.position.y += (y * 2 - camera.position.y) * dampingFactor;
      
      // Always look at the center
      camera.lookAt(0, 0, 0);
      
      previousMousePosition.current = { x, y };
    };
    
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => {
      gl.domElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, gl]);
  
  return null;
};

// Create and register the custom shader material for the dual-hemisphere orb
const createVedicTechMaterial = () => {
  return new THREE.ShaderMaterial({    uniforms: {
      time: { value: 0 },
      glowFactor: { value: 0.0 },
      // Base colors for each hemisphere
      vedicColor: { value: new THREE.Color(0.9, 0.7, 0.2) }, // Golden/bronze - made more saturated
      techColor: { value: new THREE.Color(0.1, 0.8, 1.0) },  // Cyan-blue - made more vibrant
      // Circuit pattern animation speed
      circuitSpeed: { value: 0.8 }, // Increased speed
      // Pulse effect strength
      pulseStrength: { value: 0.4 }, // Increased for more dramatic effect
      // Glow intensity for hover effect
      hoverGlow: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDisplacement;

      // Perlin noise implementation for texturing
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // First corner
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        // Permutations
        i = mod289(i);
        vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        float n_ = 0.142857142857; // 1.0/7.0
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        // Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      uniform float time;

      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
          // Create displacement for the surface texturing
        // More pronounced on the Vedic side (right hemisphere)
        float noiseFreq = 2.5; // Increased for more detailed texture
        float noiseAmp = 0.08; // Increased for more visible embossing
        vec3 noisePos = position * noiseFreq + vec3(0.0, time * 0.1, 0.0);
        float noise = snoise(noisePos);
        
        // Apply displacement only to the Vedic side (x > 0)
        float displacement = position.x > 0.0 ? noise * noiseAmp : 0.0;
        vDisplacement = displacement;
        
        // Apply displacement to position
        vec3 newPosition = position + normal * displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float glowFactor;
      uniform float hoverGlow;
      uniform float circuitSpeed;
      uniform float pulseStrength;
      uniform vec3 vedicColor;
      uniform vec3 techColor;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDisplacement;
        // Circuit pattern function for tech side - enhanced for more detailed circuits
      float circuit(vec2 uv, float scale, float thickness) {
        // Create grid lines
        vec2 grid = fract(uv * scale);
        float lines = step(thickness, grid.x) * step(thickness, grid.y);
        
        // Create circuit nodes at intersections
        float nodes = 0.0;
        vec2 nodePos = floor(uv * scale);
        float nodeRandom = fract(sin(dot(nodePos, vec2(12.9898, 78.233))) * 43758.5453);
        
        // Different node types based on random value
        if (nodeRandom > 0.7) {
          // Circuit pads
          vec2 circlePos = fract(uv * scale) - 0.5;
          float circle = smoothstep(0.12, 0.05, length(circlePos));
          nodes += circle;
        } else if (nodeRandom > 0.4) {
          // Connection traces
          vec2 tracePos = fract(uv * scale);
          float trace = 0.0;
          if (nodeRandom > 0.6) {
            trace = step(thickness * 2.0, tracePos.x) * (1.0 - step(1.0 - thickness * 2.0, tracePos.x));
          } else {
            trace = step(thickness * 2.0, tracePos.y) * (1.0 - step(1.0 - thickness * 2.0, tracePos.y));
          }
          nodes += trace;
        }
        
        // Additional diagonal traces for more complex circuit look
        if (nodeRandom > 0.85) {
          vec2 diagPos = fract(uv * scale);
          float diag = step(thickness * 1.5, abs(diagPos.x - diagPos.y));
          nodes = max(nodes, 1.0 - diag);
        }
        
        // Animated pulses along the circuits
        float pulse = sin(time * circuitSpeed + uv.x * 15.0 + uv.y * 10.0) * 0.5 + 0.5;
        pulse = smoothstep(0.4, 0.9, pulse); // Sharper pulse
        
        return (1.0 - lines) + nodes * pulse * 1.5; // Increased intensity
      }
        // Sanskrit pattern for Vedic side - enhanced for more detailed patterns
      float sanskrit(vec2 uv, float scale) {
        // Om symbol approximation using math
        vec2 omPos = (uv - 0.5) * 2.0;
        float om = smoothstep(0.8, 0.7, length(omPos));
        
        // Add some Yantra-like patterns - more detailed
        float yantra = 0.0;
        for (int i = 0; i < 5; i++) { // Increased pattern count
          float r = float(i) * 0.15 + 0.25; // More patterns
          yantra += smoothstep(r+0.015, r, length(omPos)) * smoothstep(r-0.04, r-0.025, length(omPos));
        }
        
        // Add Sri Yantra triangles
        vec2 triPos = omPos;
        triPos.y = abs(triPos.y);
        float triangle1 = smoothstep(0.03, 0.02, abs(triPos.y - 0.6 * triPos.x - 0.1));
        float triangle2 = smoothstep(0.03, 0.02, abs(triPos.y - 0.6 * triPos.x - 0.3));
        
        return om + yantra + triangle1 + triangle2;
      }
      
      void main() {
        // Determine which hemisphere we're in based on the x position
        bool isTechSide = vPosition.x < 0.0;
          // Edge glow effect - stronger near the middle divide
        float edgeFactor = 1.0 - abs(vPosition.x) * 2.0;
        edgeFactor = pow(edgeFactor, 3.0) * 0.8; // Made stronger
        
        // Pulsing effect
        float pulse = sin(time * 0.5) * 0.5 + 0.5;
        pulse *= pulseStrength;
        
        // Combine everything for the final color
        vec3 finalColor;
        float finalAlpha = 1.0;
        
        if (isTechSide) {
          // Tech side: Cyan-blue with circuit patterns
          // Circuit pattern animation - more intense and detailed
          float circuitPattern = circuit(vUv * 3.0 + vec2(time * 0.15, time * 0.05), 10.0, 0.04);
          
          // Base color with circuit overlay
          finalColor = techColor * 0.7; // Darker base for better contrast
          
          // Add glowing circuit lines - brighter
          finalColor += vec3(0.0, 0.9, 1.0) * circuitPattern * (1.0 + pulse * 0.8);
          
          // Add edge glow - stronger
          finalColor += vec3(0.0, 0.4, 0.8) * edgeFactor * 1.2; 
          
          // Add hover glow - more intense
          finalColor += vec3(0.0, 0.5, 1.0) * hoverGlow * (0.6 + pulse * 0.6);
          
          // Metallic shine effect - enhanced
          float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
          finalColor += vec3(0.6, 0.9, 1.0) * fresnel * 0.9;
          
          // Add some grid overlay
          vec2 grid = fract(vUv * 20.0);
          float gridLines = step(0.95, grid.x) + step(0.95, grid.y);
          finalColor += vec3(0.0, 0.7, 1.0) * gridLines * 0.3;
        } else {
          // Vedic side: Golden with embossed patterns
          
          // Base color with noise-based texture - richer gold
          finalColor = vedicColor * (1.0 + vDisplacement * 2.5);
          
          // Add Sanskrit/Yantra patterns - more distinct
          float pattern = sanskrit(vUv, 5.0);
          finalColor += vec3(1.0, 0.9, 0.5) * pattern * 0.7;
          
          // Add edge glow - warmer
          finalColor += vec3(0.9, 0.5, 0.1) * edgeFactor * 1.2; 
          
          // Add hover glow - more golden
          finalColor += vec3(1.0, 0.8, 0.2) * hoverGlow * (0.5 + pulse * 0.4);
          
          // Antique metal effect - enhanced
          float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 3.0);
          finalColor += vec3(1.0, 0.9, 0.4) * fresnel * 0.8;
          
          // Darken crevices - deeper
          finalColor *= 1.0 - (vDisplacement < 0.0 ? abs(vDisplacement) * 3.0 : 0.0);
          
          // Add subtle radial patterns
          float radialPattern = sin(length(vUv - 0.5) * 20.0 + time * 0.2) * 0.5 + 0.5;
          finalColor += vec3(1.0, 0.9, 0.4) * radialPattern * 0.1;
        }
        
        // Apply global glow effect - enhanced
        finalColor *= 1.0 + glowFactor * (0.4 + pulse * 0.8);
          // Output final color
        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
};

// Orb component with animation logic
const Orb = ({ hovering }) => {
  const orbRef = useRef();
  const materialRef = useRef();
  const particlesRef = useRef();
  
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }
  }, [hovering]);
    // Create particles data
  const particleData = useMemo(() => {
    const particleCount = 300; // Increased for more particles
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const rotations = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Determine color based on which side of the orb the particle is on
      if (positions[i * 3] < 0) {
        // Tech side: blue/teal particles - brighter
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Vedic side: gold/amber particles - more vibrant
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.2;
      }
      
      // Random movement speed for each particle - slightly faster
      speeds[i] = 0.03 + Math.random() * 0.04;
      
      // Random rotation axis for each particle
      rotations[i * 3] = Math.random() * 2 - 1;
      rotations[i * 3 + 1] = Math.random() * 2 - 1;
      rotations[i * 3 + 2] = Math.random() * 2 - 1;
    }
    
    return { positions, colors, speeds, rotations };
  }, []);
  
  // Animate the orb and particles
  useFrame((state) => {
    const { clock } = state;
      // Slow rotation of the orb
    if (orbRef.current) {
      orbRef.current.rotation.y += hovering ? 0.004 : 0.002; // Speed up on hover
      // Add subtle floating motion
      orbRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
    
    // Update shader time and hover glow
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
      materialRef.current.uniforms.hoverGlow.value = hovering ? 0.7 : 0.0; // Increased glow
      materialRef.current.uniforms.glowFactor.value = hovering ? 
        Math.sin(clock.elapsedTime * 2) * 0.7 + 0.3 : 0.0; // Enhanced pulsing
    }
    
    // Animate particles around the orb
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const { speeds, rotations } = particleData;
      
      for (let i = 0; i < positions.length / 3; i++) {
        // Create orbital motion for each particle
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        
        // Calculate distance from center for radius preservation
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Create a rotation matrix based on the particle's rotation axis and speed
        const angle = clock.elapsedTime * speeds[i];
        const rx = rotations[i * 3];
        const ry = rotations[i * 3 + 1];
        const rz = rotations[i * 3 + 2];
        
        // Apply rotation to the particle
        const newX = x * Math.cos(angle) + z * Math.sin(angle);
        const newZ = -x * Math.sin(angle) + z * Math.cos(angle);
        
        // Update position
        positions[i * 3] = newX;
        positions[i * 3 + 2] = newZ;
          // Add some vertical drifting - more natural movement
        positions[i * 3 + 1] += Math.sin(clock.elapsedTime * speeds[i] + i) * 0.003;
        
        // Keep particles at a consistent distance to maintain the sphere shape
        const newDistance = Math.sqrt(
          positions[i * 3] * positions[i * 3] + 
          positions[i * 3 + 1] * positions[i * 3 + 1] + 
          positions[i * 3 + 2] * positions[i * 3 + 2]
        );
        
        const scale = distance / newDistance;
        positions[i * 3] *= scale;
        positions[i * 3 + 1] *= scale;
        positions[i * 3 + 2] *= scale;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main orb */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial 
          ref={materialRef}
          args={[createVedicTechMaterial()]}
        />
      </mesh>
      
      {/* Ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleData.positions.length / 3}
            array={particleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleData.colors.length / 3}
            array={particleData.colors}
            itemSize={3}
          />
        </bufferGeometry>        <pointsMaterial 
          size={0.06} // Larger particles
          vertexColors
          transparent
          opacity={0.7} // More visible
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
        {/* Ground reflection/shadow */}
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial 
          transparent
          opacity={0.12} // Slightly stronger
          color={hovering ? "#3b9fcc" : "#8c6d1f"}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Outer glow effect - enhanced */}
      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent
          opacity={0.04} // Slightly stronger
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Additional outer glow with color */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial 
          color="#ffaa00" // Amber glow
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.9, 16, 16]} />
        <meshBasicMaterial 
          color="#00aaff" // Blue glow
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh></group>
  );
};

// Loading component
const LoadingFallback = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#8c6d1f" wireframe />
    </mesh>
  );
};

// Main component
const VedicTechOrb = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div 
      className="w-full py-20 bg-gradient-to-b from-amber-800 to-amber-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-amber-800 mb-4 font-bold">Where Technology Meets Tradition</h2>
          <p className="text-lg text-amber-900 opacity-80 max-w-xl mx-auto">
            The fusion of ancient wisdom and modern innovation creates a powerful synergy that guides our hackathon's vision.
          </p>
        </div>
        
        <div 
          className="h-[500px] w-full max-w-[500px] mx-auto relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
            shadows
          >
            <Suspense fallback={<LoadingFallback />}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} color="#f3e9c6" />
              <directionalLight position={[-10, -10, -5]} intensity={0.7} color="#3b9fcc" />
              <pointLight position={[-5, 0, 0]} intensity={1.5} color="#3b9fcc" />
              <pointLight position={[5, 0, 0]} intensity={1.5} color="#f3e9c6" />
              <Orb hovering={hovering} />
              <SimpleControls />
            </Suspense>
          </Canvas>
            {/* Light beams/rays behind the orb */}
          <div className="absolute inset-0 z-[-1] flex items-center justify-center">
            <div className="w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
          <div className="text-center mt-12">
          <p className="text-amber-800 opacity-70 max-w-lg mx-auto">
            Hover over the orb to see the interaction between ancient Vedic wisdom and modern technology.
            The fusion represents our unique approach to innovation that honors tradition while embracing the future.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VedicTechOrb;