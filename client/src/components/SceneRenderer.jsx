import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const SceneRenderer = ({ scene, currentTime, isPlaying }) => {
  const groupRef = useRef()
  
  useEffect(() => {
    // Initialize scene setup
    if (groupRef.current && scene) {
      console.log('Initializing 3D scene:', scene.metadata?.topic)
    }
  }, [scene])
  
  useFrame((state, delta) => {
    if (isPlaying && groupRef.current) {
      // Update animations based on currentTime
      // This would be where we interpolate between keyframes
    }
  })
  
  if (!scene || !scene.scene) {
    return null
  }
  
  const { objects = [], environment = {} } = scene.scene
  
  return (
    <group ref={groupRef}>
      {/* Render scene objects */}
      {objects.map((obj, index) => (
        <SceneObject
          key={`${obj.name}-${index}`}
          object={obj}
          currentTime={currentTime}
          isPlaying={isPlaying}
        />
      ))}
      
      {/* Environment effects */}
      {environment.fog?.enabled && (
        <fog 
          attach="fog" 
          args={['#ffffff', 10, 50]} 
          density={environment.fog.density || 0.01}
        />
      )}
      
      {/* Ground plane */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial color="#f0f0f0" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

const SceneObject = ({ object, currentTime, isPlaying }) => {
  const meshRef = useRef()
  const { 
    name, 
    type, 
    position = [0, 0, 0], 
    scale = [1, 1, 1], 
    rotation = [0, 0, 0],
    material = {},
    animation
  } = object
  
  useFrame((state, delta) => {
    if (isPlaying && meshRef.current && animation) {
      // Apply animations based on currentTime
      if (animation.includes('rotate')) {
        meshRef.current.rotation.y += delta * 0.5
      }
      if (animation.includes('float')) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
      }
    }
  })
  
  // Create geometry based on type
  const renderGeometry = () => {
    switch (type.toLowerCase()) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />
      case 'cube':
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2, 32]} />
      case 'cone':
        return <coneGeometry args={[1, 2, 32]} />
      case 'torus':
        return <torusGeometry args={[1, 0.3, 16, 100]} />
      case 'plane':
        return <planeGeometry args={[2, 2]} />
      default:
        return <sphereGeometry args={[1, 32, 32]} />
    }
  }
  
  // Create material based on properties
  const renderMaterial = () => {
    const { type: matType = 'standard', color = '#ffffff', properties = {} } = material
    
    const baseProps = {
      color: new THREE.Color(color),
      ...properties
    }
    
    switch (matType) {
      case 'emissive':
        return <meshBasicMaterial {...baseProps} />
      case 'toon':
        return <meshToonMaterial {...baseProps} />
      case 'physically-based':
      case 'standard':
        return <meshStandardMaterial {...baseProps} />
      case 'lambert':
        return <meshLambertMaterial {...baseProps} />
      default:
        return <meshStandardMaterial {...baseProps} />
    }
  }
  
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {renderGeometry()}
        {renderMaterial()}
      </mesh>
      
      {/* Object label */}
      <Text
        position={[0, scale[1] + 0.5, 0]}
        fontSize={0.3}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

// Predefined scene templates for common educational topics
export const SceneTemplates = {
  'solar-system': {
    objects: [
      {
        name: 'Sun',
        type: 'sphere',
        position: [0, 0, 0],
        scale: [3, 3, 3],
        material: { type: 'emissive', color: '#FFD700' },
        animation: 'rotate'
      },
      {
        name: 'Earth',
        type: 'sphere',
        position: [8, 0, 0],
        scale: [1, 1, 1],
        material: { type: 'standard', color: '#4169E1' },
        animation: 'orbit'
      },
      {
        name: 'Mars',
        type: 'sphere',
        position: [12, 0, 0],
        scale: [0.8, 0.8, 0.8],
        material: { type: 'standard', color: '#CD5C5C' },
        animation: 'orbit'
      }
    ]
  },
  
  'cell-biology': {
    objects: [
      {
        name: 'Cell Membrane',
        type: 'sphere',
        position: [0, 0, 0],
        scale: [4, 4, 4],
        material: { type: 'standard', color: '#90EE90', properties: { transparent: true, opacity: 0.3 } }
      },
      {
        name: 'Nucleus',
        type: 'sphere',
        position: [0, 0, 0],
        scale: [1.5, 1.5, 1.5],
        material: { type: 'standard', color: '#800080' }
      },
      {
        name: 'Mitochondria',
        type: 'cylinder',
        position: [2, 1, 1],
        scale: [0.3, 0.8, 0.3],
        material: { type: 'standard', color: '#FF6347' }
      }
    ]
  },
  
  'molecular-structure': {
    objects: [
      {
        name: 'Carbon',
        type: 'sphere',
        position: [0, 0, 0],
        scale: [0.6, 0.6, 0.6],
        material: { type: 'standard', color: '#333333' }
      },
      {
        name: 'Hydrogen',
        type: 'sphere',
        position: [1.2, 0, 0],
        scale: [0.3, 0.3, 0.3],
        material: { type: 'standard', color: '#FFFFFF' }
      },
      {
        name: 'Oxygen',
        type: 'sphere',
        position: [-1.2, 0, 0],
        scale: [0.5, 0.5, 0.5],
        material: { type: 'standard', color: '#FF0000' }
      }
    ]
  }
}

export default SceneRenderer
