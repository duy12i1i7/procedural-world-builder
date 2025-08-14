import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SkipForward, SkipBack, Target, Eye } from 'lucide-react'

const AnimationControls = ({ scene, currentTime, onTimeChange, isPlaying }) => {
  const [selectedKeyframe, setSelectedKeyframe] = useState(null)
  
  if (!scene?.animation?.keyframes) {
    return null
  }
  
  const { keyframes, duration } = scene.animation
  
  const handleKeyframeClick = (keyframe) => {
    onTimeChange(keyframe.time)
    setSelectedKeyframe(keyframe)
  }
  
  const handlePreviousKeyframe = () => {
    const currentIndex = keyframes.findIndex(kf => kf.time > currentTime)
    const prevIndex = Math.max(0, currentIndex - 1)
    if (keyframes[prevIndex]) {
      onTimeChange(keyframes[prevIndex].time)
    }
  }
  
  const handleNextKeyframe = () => {
    const nextKeyframe = keyframes.find(kf => kf.time > currentTime)
    if (nextKeyframe) {
      onTimeChange(nextKeyframe.time)
    }
  }
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Camera Animation</span>
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousKeyframe}
            className="btn-outline p-2"
            title="Previous Keyframe"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextKeyframe}
            className="btn-outline p-2"
            title="Next Keyframe"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="relative mb-6">
        <div className="w-full h-8 bg-gray-100 rounded-lg relative overflow-hidden">
          {/* Progress indicator */}
          <motion.div
            className="absolute top-0 w-1 h-full bg-blue-600 z-10"
            style={{
              left: `${(currentTime / duration) * 100}%`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          {/* Keyframe markers */}
          {keyframes.map((keyframe, index) => (
            <button
              key={index}
              onClick={() => handleKeyframeClick(keyframe)}
              className={`absolute top-1 w-6 h-6 rounded-full border-2 transform -translate-x-1/2 transition-all duration-200 ${
                selectedKeyframe === keyframe
                  ? 'bg-blue-600 border-blue-600 scale-110'
                  : 'bg-white border-gray-400 hover:border-blue-400 hover:scale-105'
              }`}
              style={{
                left: `${(keyframe.time / duration) * 100}%`
              }}
              title={keyframe.description || `Keyframe ${index + 1}`}
            >
              <Eye className="w-3 h-3 text-gray-600 mx-auto" />
            </button>
          ))}
        </div>
        
        {/* Time markers */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0:00</span>
          <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>
      
      {/* Keyframe Details */}
      {selectedKeyframe && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <h4 className="font-medium text-gray-900 mb-2">
            Keyframe at {Math.floor(selectedKeyframe.time / 60)}:{(selectedKeyframe.time % 60).toFixed(1).padStart(4, '0')}
          </h4>
          
          {selectedKeyframe.description && (
            <p className="text-sm text-gray-600 mb-3">
              {selectedKeyframe.description}
            </p>
          )}
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-700">Camera Position:</strong>
              <div className="font-mono text-gray-600 mt-1">
                [{selectedKeyframe.camera?.position?.map(v => v.toFixed(1)).join(', ')}]
              </div>
            </div>
            
            <div>
              <strong className="text-gray-700">Camera Target:</strong>
              <div className="font-mono text-gray-600 mt-1">
                [{selectedKeyframe.camera?.target?.map(v => v.toFixed(1)).join(', ')}]
              </div>
            </div>
            
            {selectedKeyframe.focus && (
              <div className="md:col-span-2">
                <strong className="text-gray-700">Focus:</strong>
                <span className="text-gray-600 ml-2">{selectedKeyframe.focus}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Animation Style Info */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>
          Style: <span className="capitalize font-medium">{scene.animation.style}</span>
        </div>
        <div>
          {keyframes.length} keyframes • {duration}s duration
        </div>
      </div>
    </div>
  )
}

export default AnimationControls
