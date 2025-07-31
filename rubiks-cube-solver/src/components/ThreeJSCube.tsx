import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { CubeState, CubeFace, CubeColor } from '../types';
import { colorMap } from '../utils/cubeUtils';

interface ThreeJSCubeProps {
  cubeState: CubeState;
  onFaceClick?: (face: CubeFace, row: number, col: number) => void;
  isAnimating?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export const ThreeJSCube: React.FC<ThreeJSCubeProps> = ({
  cubeState,
  onFaceClick,
  isAnimating = false,
  autoRotate = false,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create cube group
    const cubeGroup = new THREE.Group();
    cubeGroupRef.current = cubeGroup;
    scene.add(cubeGroup);

    // Mouse controls
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !cubeGroupRef.current) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          deltaMove.y * 0.01,
          deltaMove.x * 0.01,
          0,
          'XYZ'
        ));

      cubeGroupRef.current.quaternion.multiplyQuaternions(deltaRotationQuaternion, cubeGroupRef.current.quaternion);
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  // Create cube geometry
  const createCubeFace = (
    faceColors: CubeColor[][],
    position: THREE.Vector3,
    rotation: THREE.Euler,
    face: CubeFace
  ) => {
    const faceGroup = new THREE.Group();
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const geometry = new THREE.PlaneGeometry(0.9, 0.9);
        const material = new THREE.MeshLambertMaterial({
          color: colorMap[faceColors[row][col]],
        });

        const square = new THREE.Mesh(geometry, material);
        square.position.set(
          (col - 1) * 1,
          (1 - row) * 1,
          0
        );

        // Add border
        const borderGeometry = new THREE.EdgesGeometry(geometry);
        const borderMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        const border = new THREE.LineSegments(borderGeometry, borderMaterial);
        border.position.copy(square.position);

        // Add click handling
        square.userData = { face, row, col };
        
        faceGroup.add(square);
        faceGroup.add(border);
      }
    }

    faceGroup.position.copy(position);
    faceGroup.rotation.copy(rotation);
    return faceGroup;
  };

  // Update cube visualization
  useEffect(() => {
    if (!cubeGroupRef.current) return;

    // Clear existing cube
    while (cubeGroupRef.current.children.length > 0) {
      cubeGroupRef.current.remove(cubeGroupRef.current.children[0]);
    }

    // Create faces
    const faces = [
      { face: 'front' as CubeFace, position: new THREE.Vector3(0, 0, 1.5), rotation: new THREE.Euler(0, 0, 0) },
      { face: 'back' as CubeFace, position: new THREE.Vector3(0, 0, -1.5), rotation: new THREE.Euler(0, Math.PI, 0) },
      { face: 'right' as CubeFace, position: new THREE.Vector3(1.5, 0, 0), rotation: new THREE.Euler(0, Math.PI / 2, 0) },
      { face: 'left' as CubeFace, position: new THREE.Vector3(-1.5, 0, 0), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
      { face: 'up' as CubeFace, position: new THREE.Vector3(0, 1.5, 0), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
      { face: 'down' as CubeFace, position: new THREE.Vector3(0, -1.5, 0), rotation: new THREE.Euler(Math.PI / 2, 0, 0) },
    ];

    faces.forEach(({ face, position, rotation }) => {
      const faceGroup = createCubeFace(cubeState[face], position, rotation, face);
      cubeGroupRef.current!.add(faceGroup);
    });

  }, [cubeState]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && cubeGroupRef.current && !isDragging) {
        cubeGroupRef.current.rotation.y += 0.005;
        cubeGroupRef.current.rotation.x += 0.002;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [autoRotate, isDragging]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full min-h-[400px] ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};