import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Download,
  ArrowLeft,
  RotateCcw,
  Maximize
} from 'lucide-react'
import { useSceneStore } from '../store/sceneStore'
import SceneRenderer from '../components/SceneRenderer'
import AnimationControls from '../components/AnimationControls'
import SceneSettings from '../components/SceneSettings'
import CaptionDisplay from '../components/CaptionDisplay'

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 loading-spinner"></div>
        <div className="text-white text-lg font-medium">
          Loading 3D Scene... {Math.round(progress)}%
        </div>
      </div>
    </Html>
  )
}

const SceneViewer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentScene, getSceneById } = useSceneStore()
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const scene = currentScene || getSceneById(id)
  
  useEffect(() => {
    if (!scene) {
      console.warn('Scene not found, redirecting to create page')
      navigate('/create')
    }
  }, [scene, navigate])
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  
  const handleMute = () => {
    setIsMuted(!isMuted)
  }
  
  const handleReset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }
  
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }
  
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export scene')
  }
  
  if (!scene) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scene...</p>
        </div>
      </div>
    )
  }
  
  const duration = scene.animation?.duration || 120
  const progress = (currentTime / duration) * 100
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/create')}
            className="btn-outline flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {scene.content?.title || scene.metadata?.topic}
            </h1>
            {scene.content?.overview && (
              <p className="text-gray-600 mt-1">{scene.content.overview}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn-outline p-2"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="btn-outline flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* 3D Viewer */}
      <div className="relative">
        <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <Canvas
            camera={{ 
              position: scene.scene?.camera?.initialPosition || [10, 5, 10],
              fov: 75 
            }}
            gl={{ antialias: true, alpha: false }}
          >
            <React.Suspense fallback={<Loader />}>
              {/* Lighting */}
              <ambientLight 
                intensity={0.6} 
                color={scene.scene?.lighting?.ambient || '#404040'} 
              />
              <directionalLight
                position={scene.scene?.lighting?.directional?.position || [10, 10, 5]}
                intensity={1}
                color={scene.scene?.lighting?.directional?.color || '#ffffff'}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              
              {/* Environment */}
              <Environment preset="studio" />
              
              {/* Scene Content */}
              <SceneRenderer 
                scene={scene}
                currentTime={currentTime}
                isPlaying={isPlaying}
              />
              
              {/* Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={50}
                target={scene.scene?.camera?.initialTarget || [0, 0, 0]}
              />
            </React.Suspense>
          </Canvas>
          
          {/* Fullscreen button */}
          <button
            onClick={handleFullscreen}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
        
        {/* Caption Display */}
        <CaptionDisplay
          currentTime={currentTime}
          captions={scene.captions || []}
          isVisible={isPlaying}
        />
      </div>
      
      {/* Video Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="btn-primary p-3"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button
              onClick={handleReset}
              className="btn-outline p-3"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleMute}
              className="btn-outline p-3"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <div className="text-sm text-gray-600">
              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {scene.metadata?.style} • {scene.metadata?.complexity} complexity
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      
      {/* Animation Controls */}
      <AnimationControls
        scene={scene}
        currentTime={currentTime}
        onTimeChange={setCurrentTime}
        isPlaying={isPlaying}
      />
      
      {/* Scene Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
          {scene.content?.learningObjectives ? (
            <ul className="space-y-2">
              {scene.content.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No learning objectives defined</p>
          )}
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scene Objects</h3>
          {scene.scene?.objects ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {scene.scene.objects.map((obj, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{obj.name}</span>
                  <span className="text-gray-500 capitalize">{obj.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No objects defined</p>
          )}
        </div>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <SceneSettings
          scene={scene}
          onClose={() => setShowSettings(false)}
          onUpdate={(updates) => {
            // TODO: Implement scene updates
            console.log('Update scene:', updates)
          }}
        />
      )}
    </div>
  )
}

export default SceneViewer
