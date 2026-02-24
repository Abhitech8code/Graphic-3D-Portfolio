import * as THREE from 'three';

export const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.z += sin(pos.y * 10.0 + time) * 0.05;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const hologramFragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    float scanline = sin(vUv.y * 100.0 + time * 2.0) * 0.5 + 0.5;
    float flicker = sin(time * 10.0) * 0.1 + 0.9;
    float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
    edge *= 1.0 - abs(vUv.y - 0.5) * 2.0;
    edge = pow(edge, 2.0);
    
    vec3 finalColor = color * (scanline * 0.3 + 0.7) * flicker;
    float finalOpacity = opacity * (scanline * 0.2 + 0.8) * flicker + edge * 0.5;
    
    gl_FragColor = vec4(finalColor, finalOpacity);
  }
`;

export class HologramMaterial extends THREE.ShaderMaterial {
  constructor(color: THREE.Color, opacity = 0.8) {
    super({
      uniforms: {
        time: { value: 0 },
        color: { value: color },
        opacity: { value: opacity }
      },
      vertexShader: hologramVertexShader,
      fragmentShader: hologramFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }
  
  update(time: number) {
    this.uniforms.time.value = time;
  }
}
