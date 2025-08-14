import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette, Volume2, Video, Lightbulb } from 'lucide-react'

const SceneSettings = ({ scene, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('visual')
  const [settings, setSettings] = useState({
    visual: {
      style: scene.metadata?.style || 'realistic',
      lighting: scene.scene?.lighting?.ambient || '#404040',
      background: scene.scene?.environment?.background?.color || '#ffffff'
    },
    audio: {
      voice: scene.audio?.narration?.voice || 'female',
      speed: scene.audio?.narration?.speed || 1.0,
      volume: 1.0
    },
    animation: {
      speed: 1.0,
      smoothing: true,
      autoPlay: false
    }
  })
  
  const tabs = [
    { id: 'visual', label: 'Visual', icon: Palette },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'animation', label: 'Animation', icon: Video },
    { id: 'advanced', label: 'Advanced', icon: Lightbulb }
  ]
  
  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }
  
  const handleSave = () => {
    onUpdate(settings)
    onClose()
  }
  
  const handleReset = () => {
    // Reset to default values
    setSettings({
      visual: {
        style: 'realistic',
        lighting: '#404040',
        background: '#ffffff'
      },
      audio: {
        voice: 'female',
        speed: 1.0,
        volume: 1.0
      },
      animation: {
        speed: 1.0,
        smoothing: true,
        autoPlay: false
      }
    })
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Scene Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'visual' && (
              <div className="space-y-6">
                <div>
                  <label className="label">Visual Style</label>
                  <select
                    className="input"
                    value={settings.visual.style}
                    onChange={(e) => handleSettingChange('visual', 'style', e.target.value)}
                  >
                    <option value="realistic">Realistic</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="abstract">Abstract</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">Ambient Lighting</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.visual.lighting}
                      onChange={(e) => handleSettingChange('visual', 'lighting', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.visual.lighting}
                      onChange={(e) => handleSettingChange('visual', 'lighting', e.target.value)}
                      className="input flex-1"
                      placeholder="#404040"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">Background Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.visual.background}
                      onChange={(e) => handleSettingChange('visual', 'background', e.target.value)}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.visual.background}
                      onChange={(e) => handleSettingChange('visual', 'background', e.target.value)}
                      className="input flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'audio' && (
              <div className="space-y-6">
                <div>
                  <label className="label">Narrator Voice</label>
                  <select
                    className="input"
                    value={settings.audio.voice}
                    onChange={(e) => handleSettingChange('audio', 'voice', e.target.value)}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="child">Child</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">
                    Speaking Speed: {settings.audio.speed}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={settings.audio.speed}
                    onChange={(e) => handleSettingChange('audio', 'speed', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0.5x</span>
                    <span>Normal</span>
                    <span>2.0x</span>
                  </div>
                </div>
                
                <div>
                  <label className="label">
                    Volume: {Math.round(settings.audio.volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.audio.volume}
                    onChange={(e) => handleSettingChange('audio', 'volume', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'animation' && (
              <div className="space-y-6">
                <div>
                  <label className="label">
                    Animation Speed: {settings.animation.speed}x
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={settings.animation.speed}
                    onChange={(e) => handleSettingChange('animation', 'speed', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0.1x</span>
                    <span>Normal</span>
                    <span>3.0x</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="smoothing"
                    checked={settings.animation.smoothing}
                    onChange={(e) => handleSettingChange('animation', 'smoothing', e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="smoothing" className="text-sm font-medium text-gray-700">
                    Enable smooth transitions
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="autoplay"
                    checked={settings.animation.autoPlay}
                    onChange={(e) => handleSettingChange('animation', 'autoPlay', e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="autoplay" className="text-sm font-medium text-gray-700">
                    Auto-play on scene load
                  </label>
                </div>
              </div>
            )}
            
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Advanced Settings</h4>
                  <p className="text-sm text-yellow-700">
                    These settings may affect performance and should only be modified by experienced users.
                  </p>
                </div>
                
                <div>
                  <label className="label">Render Quality</label>
                  <select className="input">
                    <option value="low">Low (Better Performance)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (Better Quality)</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="shadows"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="shadows" className="text-sm font-medium text-gray-700">
                    Enable shadows
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="antialiasing"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="antialiasing" className="text-sm font-medium text-gray-700">
                    Enable anti-aliasing
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleReset}
              className="btn-outline"
            >
              Reset to Defaults
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SceneSettings
