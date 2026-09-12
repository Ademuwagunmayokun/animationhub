import * as THREE from 'three';

let scene, camera, renderer, animationFrameId;
let mainGroup, particleSystem, coreMesh, outerRings = [];
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
let isWireframe = false;
let currentMode = 'core'; // 'core' | 'rings' | 'galaxy'

export function initThreeScene(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const width = container.clientWidth || 480;
  const height = container.clientHeight || 420;

  // Scene setup
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 28;

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group
  mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const orangeLight = new THREE.PointLight(0xFF5E04, 80, 50);
  orangeLight.position.set(10, 15, 15);
  scene.add(orangeLight);

  const cyanLight = new THREE.PointLight(0x00E5FF, 50, 50);
  cyanLight.position.set(-15, -10, 10);
  scene.add(cyanLight);

  // 1. Core 3D Mesh: Sculpted Animated Octahedron / Polyhedron representing Animation Hub
  const coreGeo = new THREE.OctahedronGeometry(6.5, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xFF5E04,
    metalness: 0.85,
    roughness: 0.15,
    wireframe: false,
    emissive: 0x331100,
  });
  coreMesh = new THREE.Mesh(coreGeo, coreMat);
  mainGroup.add(coreMesh);

  // 2. Internal Glowing Play Triangle
  const triangleGeo = new THREE.ConeGeometry(2.8, 4, 3);
  triangleGeo.rotateZ(-Math.PI / 2);
  const triangleMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.6,
    metalness: 0.2,
    roughness: 0.1
  });
  const playMesh = new THREE.Mesh(triangleGeo, triangleMat);
  playMesh.scale.set(0.7, 0.7, 0.7);
  mainGroup.add(playMesh);

  // 3. Orbiting Gyroscope Rings (like studio gimbal & dry cleaning rack mechanics)
  const ringMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xFF5E04, metalness: 0.9, roughness: 0.1, wireframe: true }),
    new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.7, roughness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xFF7B31, metalness: 0.9, roughness: 0.2, wireframe: true })
  ];

  const ringRadii = [9.5, 11.5, 13.5];
  ringRadii.forEach((radius, i) => {
    const ringGeo = new THREE.TorusGeometry(radius, 0.18, 16, 100);
    const ring = new THREE.Mesh(ringGeo, ringMaterials[i]);
    ring.rotation.x = Math.PI / (i + 1.8);
    ring.rotation.y = Math.PI / (i + 2.2);
    outerRings.push(ring);
    mainGroup.add(ring);
  });

  // 4. Floating Particles Constellation
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const orange = new THREE.Color(0xFF5E04);
  const white = new THREE.Color(0xFFFFFF);

  for (let i = 0; i < particleCount; i++) {
    const r = 15 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random() > 0.4 ? orange : white;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  });

  particleSystem = new THREE.Points(particleGeo, particleMat);
  mainGroup.add(particleSystem);

  // Mouse interaction
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  // Responsive resize
  window.addEventListener('resize', () => {
    if (!container || !renderer || !camera) return;
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  // Start animation loop
  animate();
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  // Smooth mouse inertia
  mouseX += (targetX - mouseX) * 0.05;
  mouseY += (targetY - mouseY) * 0.05;

  if (mainGroup) {
    mainGroup.rotation.y += 0.008;
    mainGroup.rotation.x = mouseY * 0.45;
    mainGroup.rotation.y += mouseX * 0.02;
  }

  if (coreMesh) {
    coreMesh.rotation.x += 0.01;
    coreMesh.rotation.z += 0.007;
  }

  outerRings.forEach((ring, index) => {
    ring.rotation.x += 0.007 * (index % 2 === 0 ? 1 : -1);
    ring.rotation.y += 0.009 * (index % 2 === 0 ? -1 : 1);
  });

  if (particleSystem) {
    particleSystem.rotation.y -= 0.003;
    particleSystem.rotation.x -= 0.002;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

export function toggle3DWireframe() {
  if (!coreMesh) return false;
  isWireframe = !isWireframe;
  coreMesh.material.wireframe = isWireframe;
  return isWireframe;
}

export function pulse3DShockwave() {
  if (!mainGroup) return;
  const startScale = mainGroup.scale.x;
  mainGroup.scale.set(1.25, 1.25, 1.25);
  setTimeout(() => {
    mainGroup.scale.set(startScale, startScale, startScale);
  }, 220);
}
