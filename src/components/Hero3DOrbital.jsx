import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 9 Core Tech Nodes with workflow layer and telemetry data
const ORBITAL_BADGES = [
  {
    id: 'react',
    name: 'React',
    sub: 'Frontend Architecture',
    layer: 'fullstack',
    workflowStage: 'CODE',
    telemetry: 'UI Components',
    angleDeg: -130, // Left-Top
    color: '#00D9FF',
    iconType: 'react',
    glow: '#00D9FF'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    sub: 'Backend Runtime',
    layer: 'fullstack',
    workflowStage: 'SERVER',
    telemetry: 'REST APIs & Auth',
    angleDeg: -170, // Far Left
    color: '#539E43',
    iconType: 'nodejs',
    glow: '#539E43'
  },
  {
    id: 'github',
    name: 'GitHub',
    sub: 'Version Control',
    layer: 'devops',
    workflowStage: 'GIT',
    telemetry: 'Git Automation',
    angleDeg: -90, // Top Center
    color: '#FFFFFF',
    iconType: 'github',
    glow: '#38BDF8'
  },
  {
    id: 'playwright',
    name: 'Playwright',
    sub: 'Test Automation',
    layer: 'qa',
    workflowStage: 'TEST',
    telemetry: '42/42 Tests Passing',
    angleDeg: -50, // Top Right
    color: '#2DD4BF',
    iconType: 'playwright',
    glow: '#2DD4BF'
  },
  {
    id: 'docker',
    name: 'Docker',
    sub: 'Containerization',
    layer: 'devops',
    workflowStage: 'DOCKER',
    telemetry: 'Multi-stage Images',
    angleDeg: -10, // Far Right
    color: '#2496ED',
    iconType: 'docker',
    glow: '#2496ED'
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    sub: 'Continuous Delivery',
    layer: 'devops',
    workflowStage: 'PIPELINE',
    telemetry: 'Automated Deploy',
    angleDeg: 30, // Bottom Right
    color: '#00D9FF',
    iconType: 'cicd',
    glow: '#00D9FF'
  },
  {
    id: 'aws',
    name: 'AWS',
    sub: 'Cloud Infrastructure',
    layer: 'devops',
    workflowStage: 'AWS',
    telemetry: '99.9% Uptime',
    angleDeg: 75, // Bottom Center Right
    color: '#FF9900',
    iconType: 'aws',
    glow: '#FF9900'
  },
  {
    id: 'linux',
    name: 'Linux',
    sub: 'Server Admin',
    layer: 'devops',
    workflowStage: 'DEPLOY',
    telemetry: 'Ubuntu & Bash',
    angleDeg: 120, // Bottom Center Left
    color: '#38BDF8',
    iconType: 'linux',
    glow: '#38BDF8'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    sub: 'NoSQL Database',
    layer: 'fullstack',
    workflowStage: 'DATA',
    telemetry: 'Atlas & Schema',
    angleDeg: 160, // Bottom Left
    color: '#00ED64',
    iconType: 'mongodb',
    glow: '#00ED64'
  }
];

// Workflow sequence for data flow particles
const WORKFLOW_ORDER = ['react', 'github', 'playwright', 'docker', 'cicd', 'aws', 'linux'];

// Official SVG Brand Logos Dictionary
const OFFICIAL_ICONS_SVG = {
  aws: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 65"><path fill="#FF9900" d="M22 36.4c-2.3 0-4.1-.6-5.4-1.8s-2-2.9-2-5.2c0-2.3.7-4.1 2.1-5.5s3.4-2.1 6-2.1h4.8v-1.7c0-1.6-.4-2.9-1.3-3.7-.8-.9-2.1-1.3-3.9-1.3-1.2 0-2.4.2-3.6.6-1.3.4-2.4.9-3.4 1.6l-1.4-3.5c1.3-.8 2.8-1.4 4.6-1.8s3.7-.7 5.7-.7c3.5 0 6.2.9 7.9 2.7 1.7 1.8 2.6 4.4 2.6 7.9v13.6h-4.4l-.4-2.4c-1 1-2.1 1.7-3.5 2.2-1.4.5-2.9.7-4.5.7zm1-3.6c1.4 0 2.7-.4 3.9-1.1s1.9-1.8 2.4-3.1v-3.4h-4.7c-1.5 0-2.7.4-3.5 1.1-.8.7-1.2 1.7-1.2 2.9 0 1.1.4 2 1.1 2.7.8.6 1.8.9 3.2.9l-1.2-.1zm21.4 3.2L32.2 14.3h5l4.6 17.8 4.6-17.8h4.6l4.6 17.8 4.6-17.8h4.8L63.3 36h-4.9l-4.5-17.3L49.3 36h-4.9zm-5.2 13c-12.5 5.7-26.6 3.9-37.3-3.5-.7-.5-.9-1.4-.3-2 .6-.6 1.5-.5 2.3 0 9.8 6.6 22.8 8.2 34.4 3 .9-.4 1.8.3 1.2 1.3-.1.3-.2.8-.3 1.2zm9.1-1c-1.1-1.4-2.8-2.4-4.5-2.3-.6-.1-1 .4-.8 1 .3 1.5 1.4 4.5 2.9 5.7.5.4 1.1.3 1.3-.3.4-2 1-3.8 1.1-4.1z"/></svg>`,
  
  docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><path fill="#2496ED" d="M14 34h9v-8h-9v8zm12 0h9v-8h-9v8zm12 0h9v-8h-9v8zm-24-11h9v-8h-9v8zm12 0h9v-8h-9v8zm12 0h9v-8h-9v8zm-12-11h9V4h-9v8zm12 0h9V4h-9v8zm47 28.5c-1.2-5.4-5.6-9-10.8-9-2.4 0-4.7.7-6.1 1.7-4.2-4.5-9.3-6.9-13.9-6.9H44v16.1h22.8c3 0 5.6 1.7 6.9 4.3 1.2 2.2 1.2 4.9 0 7.3-2.4 4.8-7.2 7.6-13 7.6H8.2C3.6 48.3 0 44.7 0 40.2c0-3.6 2.4-6.9 6-7.9l2-.5 1-1.9c-.7-1.3-1.1-2.8-1.1-4.3 0-5.4 4.4-9.8 9.9-9.8.7 0 1.4.1 2.1.3l.8-1.6C22.7 1.7 26.8 0 31 0c4.8 0 9.3 2.2 12.3 6l1.2 1.5h1.2c6.8 0 13.2 3.9 16 10.1 4-.4 8.1 1.1 10.9 3.9 3.3 3.3 4.8 7.9 4.1 12.5l-.1.8-.8-.1c-3.7-.7-7.5-1.2-11.3-1.2z"/></svg>`,
  
  react: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="9" ry="9" fill="#00D9FF"/><g stroke="#00D9FF" stroke-width="4.5" fill="none"><ellipse cx="50" cy="50" rx="42" ry="16"/><ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/></g></svg>`,
  
  nodejs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,4 88,26 88,70 50,92 12,70 12,26" fill="#539E43" fill-opacity="0.2" stroke="#539E43" stroke-width="5"/><polygon points="50,16 78,32 78,64 50,80 22,64 22,32" fill="#539E43"/><text x="50" y="58" font-family="monospace" font-weight="900" font-size="28" fill="#070D14" text-anchor="middle">JS</text></svg>`,
  
  mongodb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 100"><path fill="#00ED64" d="M30 0c-.8 0-1.3.5-1.5 1.1C26.8 5.1 20 20.6 20 33.1c0 10.5 6.9 19.1 10.3 22.3V1c0-.5-.3-1-.5-1h.2zm1.5 1.1c-.3 0-.8.5-.8 1v54.4c3.4-3.1 10.3-11.8 10.3-22.3 0-12.5-6.9-28-8.9-32-.2-.6-.5-1.1-.6-1.1z"/><path fill="#FFFFFF" fill-opacity="0.3" d="M30 55v15c0 3-1.5 6-3 8 0 0 1-5 2-8v-15h1z"/></svg>`,
  
  playwright: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 14C30 14 14 30 14 50c0 13 8 25 20 30 2 1 4 0 4-2.5v-4.5c0-1.8-1.2-3-2.7-3.5-9-4.3-14.8-13.3-14.8-23.2C20.5 35 33.7 22 50 22s29.5 13 29.5 28c0 8-3.1 15-8.4 20.2-1.3 1.3-1.3 3.5 0 4.8l3.5 3.5c1.3 1.3 3.5 1.3 4.8 0 7-7.4 11-17.1 11-28.5C90.4 30 72 14 50 14z" fill="#2DD4BF"/><circle cx="36" cy="46" r="7" fill="#45BA4B"/><circle cx="64" cy="46" r="7" fill="#E93D82"/><path d="M38 62c6 6 18 6 24 0" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" fill="none"/></svg>`,
  
  linux: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="14" width="80" height="72" rx="16" fill="#0B1220" stroke="#38BDF8" stroke-width="5"/><path d="M26 36l18 14-18 14" stroke="#38BDF8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="52" y1="64" x2="74" y2="64" stroke="#2DD4BF" stroke-width="7" stroke-linecap="round"/></svg>`,
  
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#FFFFFF" fill-rule="evenodd" d="M50 0C22.4 0 0 22.4 0 50c0 22.1 14.3 40.8 34.2 47.4 2.5.5 3.4-1.1 3.4-2.4 0-1.2-.1-5.2-.1-9.5-13.9 3-16.8-5.9-16.8-5.9-2.3-5.8-5.6-7.3-5.6-7.3-4.5-3.1.3-3 .3-3 5 .4 7.7 5.2 7.7 5.2 4.5 7.6 11.7 5.4 14.6 4.1.5-3.2 1.7-5.4 3.2-6.7-11.1-1.3-22.8-5.6-22.8-24.8 0-5.5 2-9.9 5.1-13.4-.5-1.3-2.2-6.4.5-13.3 0 0 4.2-1.3 13.8 5.1 4-1.1 8.3-1.7 12.5-1.7 4.3 0 8.5.6 12.5 1.7 9.5-6.5 13.7-5.1 13.7-5.1 2.7 6.9 1 12 .5 13.3 3.2 3.5 5.1 7.9 5.1 13.4 0 19.3-11.7 23.5-22.9 24.7 1.8 1.5 3.4 4.6 3.4 9.3 0 6.7-.1 12.1-.1 13.7 0 1.3.9 2.9 3.4 2.4C85.7 90.8 100 72.1 100 50c0-27.6-22.4-50-50-50z"/></svg>`,
  
  cicd: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path d="M72 14c12 0 18 16 7 25-8 7-16-3-27-18C41 7 33-3 25 4 15 11 9 27 22 34c10 5 20-5 30-19" fill="none" stroke="#00D9FF" stroke-width="7" stroke-linecap="round"/></svg>`
};

const MODES = [
  { id: 'all', label: 'ALL ECOSYSTEM', color: '#00D9FF' },
  { id: 'fullstack', label: 'FULL-STACK', color: '#00D9FF' },
  { id: 'qa', label: 'QA AUTOMATION', color: '#2DD4BF' },
  { id: 'devops', label: 'DEVOPS & CLOUD', color: '#38BDF8' }
];

export default function Hero3DOrbital() {
  const mountRef = useRef(null);
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const activeFilterRef = useRef('all');
  activeFilterRef.current = activeFilter;

  // Ref to trigger energy pulse shockwave from outside the Three.js loop
  const triggerShockwaveRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isTabActive = true;

    // 1. 🎬 SCENE & PERSPECTIVE CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.03);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. 💡 BALANCED LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00d9ff, 3.5, 20);
    coreLight.position.set(2.8, 0, 2);
    scene.add(coreLight);

    const leftFillLight = new THREE.PointLight(0x1d4ed8, 2.5, 22);
    leftFillLight.position.set(-4.5, -2, 3);
    scene.add(leftFillLight);

    // 3. 🌐 MAIN ORBITAL GROUP (Positioned on the right side on desktop)
    const mainOrbitalGroup = new THREE.Group();
    scene.add(mainOrbitalGroup);

    // Textures array for disposal
    const texturesToDispose = [];

    // Helper: Generate Canvas Icon Textures with Real SVG Images
    const createBadgeTexture = (badge) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      const renderBase = () => {
        ctx.clearRect(0, 0, 256, 256);

        // Glass Card Background
        ctx.fillStyle = 'rgba(7, 16, 32, 0.90)';
        ctx.strokeStyle = badge.color;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = badge.color;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.roundRect(16, 16, 224, 224, 40);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Subtle Specular Reflection
        const glossGrad = ctx.createLinearGradient(0, 16, 0, 110);
        glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
        ctx.fillStyle = glossGrad;
        ctx.beginPath();
        ctx.roundRect(20, 20, 216, 90, 36);
        ctx.fill();

        // Technology Name Below Icon
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(badge.name, 128, 202);
      };

      renderBase();

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texturesToDispose.push(texture);

      const svgCode = OFFICIAL_ICONS_SVG[badge.iconType];
      if (svgCode) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgCode);
        img.onload = () => {
          renderBase();
          const iconSize = 90;
          const iconX = (256 - iconSize) / 2;
          const iconY = 48;
          ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
          texture.needsUpdate = true;
        };
      }

      return texture;
    };

    // Helper: Radial glow texture
    const createOrbitalGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 217, 255, 0.7)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.35)');
      grad.addColorStop(0.7, 'rgba(29, 78, 216, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const texture = new THREE.CanvasTexture(canvas);
      texturesToDispose.push(texture);
      return texture;
    };

    const glowTexture = createOrbitalGlowTexture();

    // 4. 🌐 COMPACT, CLEAN CENTRAL CORE ("HIMAS")
    const coreGroup = new THREE.Group();
    mainOrbitalGroup.add(coreGroup);

    // Subtle Outer Hologram Wireframe Sphere (radius 0.68)
    const globeGeo = new THREE.IcosahedronGeometry(0.68, 2);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    coreGroup.add(globeMesh);

    // Subtle Inner Core Sphere (radius 0.45)
    const innerGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x071526,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Concentric Gyroscope Rotating Rings
    const gyroRingGeo = new THREE.TorusGeometry(0.95, 0.012, 16, 80);
    const gyroRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6
    });
    const gyro1 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyro1.rotation.x = Math.PI / 3;
    coreGroup.add(gyro1);

    const gyro2 = new THREE.Mesh(gyroRingGeo, gyroRingMat);
    gyro2.rotation.y = Math.PI / 4;
    gyro2.rotation.x = -Math.PI / 4;
    coreGroup.add(gyro2);

    // Central "HIMAS" Text Billboard Sprite
    const himasCanvas = document.createElement('canvas');
    himasCanvas.width = 256;
    himasCanvas.height = 128;
    const hCtx = himasCanvas.getContext('2d');
    hCtx.fillStyle = '#FFFFFF';
    hCtx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    hCtx.textAlign = 'center';
    hCtx.shadowColor = '#00D9FF';
    hCtx.shadowBlur = 14;
    hCtx.fillText('HIMAS', 128, 74);
    const himasTexture = new THREE.CanvasTexture(himasCanvas);
    texturesToDispose.push(himasTexture);

    const himasSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: himasTexture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      })
    );
    himasSprite.scale.set(1.4, 0.7, 1);
    coreGroup.add(himasSprite);

    // 5. 💥 CORE ENERGY SHOCKWAVE PULSE (Click Interaction)
    const shockwaveGeo = new THREE.RingGeometry(0.5, 0.58, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(0, 0, 0.1);
    coreGroup.add(shockwaveMesh);

    let shockwaveProgress = 1; // 0 to 1, 1 means idle
    const triggerShockwave = () => {
      shockwaveProgress = 0;
    };
    triggerShockwaveRef.current = triggerShockwave;

    // 6. ⭕ SUBTLE CONCENTRIC ORBIT TRACK RINGS
    const trackRadius = 3.3;
    const ringGeo = new THREE.TorusGeometry(trackRadius, 0.012, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    mainOrbitalGroup.add(ringMesh);

    const outerRingGeo = new THREE.TorusGeometry(3.85, 0.008, 16, 100);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a5f,
      transparent: true,
      opacity: 0.25
    });
    mainOrbitalGroup.add(new THREE.Mesh(outerRingGeo, outerRingMat));

    // 7. 🧊 MOUNTING 9 3D TECH BADGES ON THE ORBITAL RING
    const ORBIT_RADIUS_X = 3.35;
    const ORBIT_RADIUS_Y = 3.1;
    const badgeMeshes = [];
    const raycastTargets = [];
    const badgePositionsMap = {};

    ORBITAL_BADGES.forEach((badge) => {
      const rad = (badge.angleDeg * Math.PI) / 180;
      const x = Math.cos(rad) * ORBIT_RADIUS_X;
      const y = Math.sin(rad) * ORBIT_RADIUS_Y;
      const z = Math.sin(rad * 2) * 0.25;

      const badgeGroup = new THREE.Group();
      badgeGroup.position.set(x, y, z);

      // 3D Glass Badge Sprite
      const badgeMat = new THREE.SpriteMaterial({
        map: createBadgeTexture(badge),
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      });
      const badgeSprite = new THREE.Sprite(badgeMat);
      badgeSprite.scale.set(1.08, 1.08, 1);
      badgeSprite.userData = { badge, baseScale: 1.08 };
      badgeGroup.add(badgeSprite);
      raycastTargets.push(badgeSprite);

      // Soft Backlight Glow Sprite
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(1.9, 1.9, 1);
      badgeGroup.add(glowSprite);

      // Radial Glowing Connection Line from Core to Badge
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x * 0.75, y * 0.75, z * 0.75)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.18
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      mainOrbitalGroup.add(lineMesh);

      mainOrbitalGroup.add(badgeGroup);
      const entry = {
        id: badge.id,
        group: badgeGroup,
        sprite: badgeSprite,
        glow: glowSprite,
        line: lineMesh,
        basePos: new THREE.Vector3(x, y, z),
        currentScale: 1.08,
        targetScale: 1.08,
        targetZ: z,
        currentZ: z,
        badge
      };
      badgeMeshes.push(entry);
      badgePositionsMap[badge.id] = entry.basePos;
    });

    // 8. 🚀 SUBTLE ANIMATED DATA FLOW PATH & TRAVELING PHOTONS
    const workflowPathPoints = WORKFLOW_ORDER.map((id) => badgePositionsMap[id] || new THREE.Vector3(0, 0, 0));
    const workflowCurve = new THREE.CatmullRomCurve3(workflowPathPoints, true, 'centripetal');
    
    const curvePoints = workflowCurve.getPoints(120);
    const flowPathGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const flowPathMat = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.28
    });
    const flowPathLine = new THREE.Line(flowPathGeo, flowPathMat);
    mainOrbitalGroup.add(flowPathLine);

    const PHOTON_COUNT = 6;
    const photons = [];
    const photonGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.95
    });

    for (let i = 0; i < PHOTON_COUNT; i++) {
      const pMesh = new THREE.Mesh(photonGeo, photonMat);
      mainOrbitalGroup.add(pMesh);
      photons.push({
        mesh: pMesh,
        progress: i / PHOTON_COUNT,
        speed: 0.10 + i * 0.005
      });
    }

    // 9. 💎 FLOATING GEOMETRIC 3D CUBES ACROSS THE ENTIRE HERO PAGE!
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const floatingCubes = [];
    const cubeGeo = new THREE.BoxGeometry(0.38, 0.38, 0.38);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x071526,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.40
    });

    const FULL_HERO_CUBE_COORDS = [
      [-7.5, 3.4, -2.5],
      [-6.8, -2.6, -1.8],
      [-6.0, 0.8, -3.2],
      [-5.2, 4.2, -3.8],
      [-4.6, -3.8, -2.0],
      [-3.8, 2.8, -3.5],
      [-3.0, -1.8, -2.8],
      [-2.4, 4.5, -4.0],
      [-1.0, -3.5, -3.0],
      [-0.4, 3.8, -3.2],
      [0.6, -4.2, -2.4],
      [0.2, 1.2, -4.5],
      [1.8, 3.2, -2.8],
      [2.2, -3.4, -1.8],
      [3.0, 4.4, -3.5],
      [4.8, -4.0, -2.2],
      [5.8, 3.6, -2.0],
      [6.5, -2.8, -1.6],
      [7.2, 1.4, -2.6],
      [7.8, -0.8, -3.2],
      [6.0, -4.5, -2.8],
      [7.4, 3.8, -3.6],
      [-4.0, -4.6, -2.5],
      [3.6, 4.8, -4.2]
    ];

    FULL_HERO_CUBE_COORDS.forEach(([cx, cy, cz], idx) => {
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      const s = 0.7 + (idx % 5) * 0.15;
      mesh.scale.set(s, s, s);
      mesh.position.set(cx, cy, cz);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      const edgeGeo = new THREE.EdgesGeometry(cubeGeo);
      const edgeMat = new THREE.LineBasicMaterial({ 
        color: (idx % 3 === 0) ? 0x2dd4bf : 0x00d9ff, 
        transparent: true, 
        opacity: 0.50 
      });
      const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(edgeMesh);

      cubeGroup.add(mesh);
      floatingCubes.push({
        mesh,
        rotSpeedX: 0.006 + (idx % 4) * 0.003,
        rotSpeedY: 0.005 + (idx % 3) * 0.003,
        baseY: cy,
        speed: 0.8 + (idx % 5) * 0.25
      });
    });

    // 10. 🖱️ MOUSE INTERACTION & RAYCASTING
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse2D = new THREE.Vector2(-100, -100);

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouse2D.x = (x / rect.width) * 2 - 1;
        mouse2D.y = -(y / rect.height) * 2 + 1;
        mouse.targetX = mouse2D.x;
        mouse.targetY = mouse2D.y;
      }
    };

    const onClickCanvas = () => {
      triggerShockwave();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClickCanvas, { passive: true });

    // Handle responsive sizing & camera adjustments
    const handleResize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;

      camera.aspect = w / h;

      if (w >= 1280) {
        camera.position.z = 10.0;
        mainOrbitalGroup.position.set(2.6, 0.1, 0);
        mainOrbitalGroup.scale.set(1.0, 1.0, 1.0);
      } else if (w >= 1024) {
        camera.position.z = 10.5;
        mainOrbitalGroup.position.set(2.0, 0.1, 0);
        mainOrbitalGroup.scale.set(0.90, 0.90, 0.90);
      } else if (w >= 768) {
        camera.position.z = 12.0;
        mainOrbitalGroup.position.set(0, -1.6, 0);
        mainOrbitalGroup.scale.set(0.82, 0.82, 0.82);
      } else {
        camera.position.z = 13.2;
        mainOrbitalGroup.position.set(0, -2.0, 0);
        mainOrbitalGroup.scale.set(0.72, 0.72, 0.72);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    requestAnimationFrame(handleResize);

    // 11. ⚡ TAB VISIBILITY PAUSE ONLY
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 12. ⏱️ GUARANTEED 60 FPS RENDER & ANIMATION LOOP
    let animId = null;
    const clock = new THREE.Clock();
    let currentHoveredId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isTabActive) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 0.85;
      camera.position.y = mouse.y * 0.65;
      camera.lookAt(0, 0, 0);

      // Subtle 3D Tilt for Orbital System
      mainOrbitalGroup.rotation.y = mouse.x * 0.1 + Math.sin(elapsedTime * 0.4) * 0.04;
      mainOrbitalGroup.rotation.x = -mouse.y * 0.1 + Math.cos(elapsedTime * 0.4) * 0.03;

      // Subtle reaction of full-hero cubes to mouse
      cubeGroup.rotation.y = mouse.x * 0.05;
      cubeGroup.rotation.x = -mouse.y * 0.05;

      // Continuous rotation of center core and gyroscopes
      globeMesh.rotation.y += 0.006;
      globeMesh.rotation.x += 0.003;
      gyro1.rotation.z += 0.009;
      gyro2.rotation.z -= 0.008;

      // 💥 Animate shockwave if triggered
      if (shockwaveProgress < 1) {
        shockwaveProgress += delta * 1.5;
        const currentScale = 0.5 + shockwaveProgress * 7.5;
        shockwaveMesh.scale.set(currentScale, currentScale, 1);
        shockwaveMat.opacity = Math.max(0, 0.85 * (1 - shockwaveProgress));
      } else {
        shockwaveMat.opacity = 0;
      }

      // Raycasting for interactive tech badge hover
      raycaster.setFromCamera(mouse2D, camera);
      const intersects = raycaster.intersectObjects(raycastTargets);

      if (intersects.length > 0) {
        const hitBadge = intersects[0].object.userData.badge;
        currentHoveredId = hitBadge.id;
        setHoveredBadge(hitBadge);
        container.style.cursor = 'pointer';
      } else {
        currentHoveredId = null;
        setHoveredBadge(null);
        container.style.cursor = 'default';
      }

      // Filter layer mode check
      const currentMode = activeFilterRef.current;

      // Tech Cards Floating & Hover Transition
      badgeMeshes.forEach((item, idx) => {
        const isHit = item.id === currentHoveredId;
        const offset = idx * 0.7;

        // Is this badge matching the current active filter layer?
        const isLayerMatched = currentMode === 'all' || item.badge.layer === currentMode;

        // Continuous gentle floating
        const floatY = Math.sin(elapsedTime * 1.6 + offset) * 0.08;
        item.group.position.y = item.basePos.y + floatY;

        // Smooth hover response & filter focus
        let baseScaleTarget = isLayerMatched ? 1.08 : 0.88;
        if (isHit) baseScaleTarget = 1.25;

        item.targetScale = baseScaleTarget;
        item.targetZ = isHit ? item.basePos.z + 0.35 : item.basePos.z;

        item.currentScale += (item.targetScale - item.currentScale) * 0.14;
        item.currentZ += (item.targetZ - item.currentZ) * 0.14;

        item.sprite.scale.set(item.currentScale, item.currentScale, 1);
        item.group.position.z = item.currentZ;

        // Opacity transition based on filter mode
        const targetCardOpacity = isLayerMatched ? (isHit ? 1.0 : 0.95) : 0.25;
        item.sprite.material.opacity += (targetCardOpacity - item.sprite.material.opacity) * 0.12;

        // Glow enhancement on hover or active layer
        const targetGlowOpacity = isLayerMatched ? (isHit ? 0.9 : 0.38) : 0.08;
        item.glow.material.opacity += (targetGlowOpacity - item.glow.material.opacity) * 0.12;

        // Radial line opacity
        item.line.material.opacity = isLayerMatched ? 0.22 : 0.05;
      });

      // Traveling Data Flow Photons Animation
      photons.forEach((p) => {
        p.progress += delta * p.speed;
        if (p.progress > 1) p.progress -= 1;
        const pos = workflowCurve.getPointAt(p.progress);
        p.mesh.position.copy(pos);
      });

      // Floating Ambient Cubes across the Full Hero Page
      floatingCubes.forEach(({ mesh, rotSpeedX, rotSpeedY, baseY, speed }, idx) => {
        mesh.rotation.x += rotSpeedX;
        mesh.rotation.y += rotSpeedY;
        mesh.position.y = baseY + Math.sin(elapsedTime * speed + idx) * 0.16;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 13. 🧹 DISPOSAL & CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClickCanvas);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);

      // Dispose textures
      texturesToDispose.forEach((t) => t.dispose());

      // Dispose geometries and materials
      [globeGeo, innerGeo, gyroRingGeo, ringGeo, outerRingGeo, flowPathGeo, photonGeo, cubeGeo, shockwaveGeo].forEach((g) => g.dispose());
      [globeMat, innerMat, gyroRingMat, ringMat, outerRingMat, flowPathMat, photonMat, cubeMat, shockwaveMat].forEach((m) => m.dispose());

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleFilterClick = (modeId) => {
    setActiveFilter(modeId);
    if (triggerShockwaveRef.current) {
      triggerShockwaveRef.current();
    }
  };

  return (
    <div className="relative w-full h-full pointer-events-auto select-none overflow-hidden">
      {/* Three.js Canvas Container spanning full hero */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* 🎛️ Interactive 3D Ecosystem Role Filter Bar (Top-Right on Desktop, Centered on Mobile) */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-12 z-40 flex items-center gap-1.5 p-1 rounded-full bg-[#07101E]/85 border border-[#00D9FF]/30 backdrop-blur-2xl shadow-2xl shadow-black/80">
        {MODES.map((mode) => {
          const isActive = activeFilter === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => handleFilterClick(mode.id)}
              className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#00D9FF] text-[#05070D] shadow-lg shadow-[#00D9FF]/30 scale-105'
                  : 'text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-white/[0.06]'
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* 🔮 Interactive Badge Hover Tooltip with Live Telemetry */}
      {hoveredBadge && (
        <div className="fixed top-36 sm:top-40 right-4 sm:right-8 lg:right-12 pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 rounded-2xl bg-[#0B1220]/95 backdrop-blur-2xl border border-[#00D9FF]/50 shadow-2xl shadow-[#00D9FF]/25 flex items-center gap-3.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: hoveredBadge.color }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FFFFFF]">
                  {hoveredBadge.name}
                </span>
                {hoveredBadge.workflowStage && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/40 font-bold">
                    {hoveredBadge.workflowStage}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#7DD3FC]">
                {hoveredBadge.sub}
              </span>
              {hoveredBadge.telemetry && (
                <span className="text-[10px] font-mono text-[#2DD4BF] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                  {hoveredBadge.telemetry}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
