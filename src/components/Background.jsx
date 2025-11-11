import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background() {
  const bgRef = useRef(null);

  useEffect(() => {
    const mount = bgRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000010, 0.0015); // dark blueish fog

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // ⭐ Starfield (white soft glow)
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

      // White-blue toned stars
      const color = new THREE.Color(`hsl(${200 + Math.random() * 20}, 40%, ${70 + Math.random() * 20}%)`);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 1.3,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 🌌 Soft Nebula Layers (gradient blue tones)
    const createNebula = (radius, colorVec, speed) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vPosition;
          uniform float time;
          void main() {
            float intensity = 0.18 + 0.25 * sin(vPosition.x*0.05 + time*${speed})
                                        * sin(vPosition.y*0.05 + time*${speed})
                                        * sin(vPosition.z*0.05 + time*${speed});
            gl_FragColor = vec4(${colorVec.join(',')}, intensity);
          }
        `,
        transparent: true,
        depthWrite: false,
      });
      const nebula = new THREE.Mesh(geometry, material);
      scene.add(nebula);
      return { nebula, material, speed };
    };

    // Softer gradient blues for better readability
    const nebulaLayers = [
      createNebula(300, [0.1, 0.25, 0.7], 0.05), // deep blue
      createNebula(320, [0.2, 0.5, 0.9], 0.03), // lighter cyan-blue
      createNebula(340, [0.05, 0.15, 0.35], 0.02), // darker shadowy tone
    ];

    // Handle resize
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;

      nebulaLayers.forEach(({ nebula, material, speed }) => {
        nebula.rotation.y += speed * 0.2;
        material.uniforms.time.value = elapsed;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
