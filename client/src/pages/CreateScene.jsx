import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  Sparkles, 
  Settings, 
  Video, 
  Volume2, 
  Play,
  Loader2,
  Brain,
  Target,
  Clock
} from 'lucide-react'
import { useSceneStore } from '../store/sceneStore'
import { generateScene } from '../services/api'

const CreateScene = () => {
  const navigate = useNavigate()
  const { setCurrentScene } = useSceneStore()
  
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    targetAudience: 'high-school',
    style: 'realistic',
    complexity: 'medium',
    duration: 120,
    language: 'en'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleGenerateScene = async (e) => {
    e.preventDefault()
    
    if (!formData.topic.trim() || !formData.description.trim()) {
      toast.error('Please provide both topic and description')
      return
    }
    
    setIsGenerating(true)
    
    try {
      toast.loading('AI is analyzing your topic...', { id: 'generating' })
      
      const response = await generateScene({
        topic: formData.topic,
        description: formData.description,
        style: formData.style,
        complexity: formData.complexity,
        duration: formData.duration
      })
      
      if (response.success) {
        setCurrentScene(response.scene)
        toast.success('Scene generated successfully!', { id: 'generating' })
        navigate(`/scene/${response.scene.id}`)
      } else {
        throw new Error(response.message || 'Failed to generate scene')
      }
      
    } catch (error) {
      console.error('Scene generation error:', error)
      toast.error(error.message || 'Failed to generate scene', { id: 'generating' })
    } finally {
      setIsGenerating(false)
    }
  }
  
  const targetAudienceOptions = [
    { value: 'elementary', label: 'Elementary (Ages 6-11)' },
    { value: 'middle-school', label: 'Middle School (Ages 11-14)' },
    { value: 'high-school', label: 'High School (Ages 14-18)' },
    { value: 'college', label: 'College (Ages 18+)' },
    { value: 'adult', label: 'Adult Learners' }
  ]
  
  const styleOptions = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic visuals with accurate lighting' },
    { value: 'cartoon', label: 'Cartoon', description: 'Colorful, friendly animated style' },
    { value: 'abstract', label: 'Abstract', description: 'Simplified, conceptual visualization' }
  ]
  
  const complexityOptions = [
    { value: 'simple', label: 'Simple', description: 'Basic objects and interactions' },
    { value: 'medium', label: 'Medium', description: 'Balanced detail and complexity' },
    { value: 'complex', label: 'Complex', description: 'Detailed objects with advanced features' }
  ]
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create Your
          <span className="text-gradient"> AI-Generated </span>
          Educational Scene
        </h1>
        <p className="text-lg text-gray-600">
          Describe your topic and let AI create an immersive 3D learning experience
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[
            { step: 1, icon: Brain, label: 'Topic' },
            { step: 2, icon: Settings, label: 'Settings' },
            { step: 3, icon: Sparkles, label: 'Generate' }
          ].map(({ step, icon: Icon, label }) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 font-medium ${
                currentStep >= step ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {label}
              </span>
              {step < 3 && (
                <div className={`w-8 h-px mx-4 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleGenerateScene} className="space-y-8">
        {/* Step 1: Topic Information */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Topic Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">
                <Target className="w-4 h-4 inline mr-1" />
                Topic Title *
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Solar System, Cell Biology, Ancient Rome"
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                maxLength={200}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.topic.length}/200 characters
              </p>
            </div>
            
            <div>
              <label className="label">Target Audience *</label>
              <select
                className="input"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              >
                {targetAudienceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="label">
              Topic Description *
            </label>
            <textarea
              className="textarea"
              placeholder="Describe what you want to teach about this topic. Include key concepts, learning objectives, and any specific aspects you want to emphasize..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              maxLength={1000}
              rows={4}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>
        </div>
        
        {/* Step 2: Visual Style & Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Visual Style & Settings</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="label">Visual Style</label>
              <div className="space-y-2">
                {styleOptions.map(option => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="style"
                      value={option.value}
                      checked={formData.style === option.value}
                      onChange={(e) => handleInputChange('style', e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="label">Complexity Level</label>
              <div className="space-y-2">
                {complexityOptions.map(option => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="complexity"
                      value={option.value}
                      checked={formData.complexity === option.value}
                      onChange={(e) => handleInputChange('complexity', e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="label">
                <Clock className="w-4 h-4 inline mr-1" />
                Duration (seconds)
              </label>
              <input
                type="number"
                className="input"
                min="30"
                max="600"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              />
              <p className="text-sm text-gray-500 mt-1">
                {Math.floor(formData.duration / 60)}:{(formData.duration % 60).toString().padStart(2, '0')} minutes
              </p>
            </div>
          </div>
        </div>
        
        {/* Generate Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isGenerating || !formData.topic.trim() || !formData.description.trim()}
            className="btn-primary text-lg px-12 py-4 flex items-center space-x-3 mx-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Generating Scene...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>Generate 3D Scene</span>
              </>
            )}
          </button>
          
          {isGenerating && (
            <div className="mt-4 text-sm text-gray-600">
              <p>🤖 AI is analyzing your topic and creating the perfect 3D environment...</p>
              <p className="mt-1">This usually takes 10-30 seconds</p>
            </div>
          )}
        </div>
      </form>
      
      {/* Preview Section */}
      {formData.topic && formData.description && (
        <div className="card mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Topic:</strong> {formData.topic}
              </div>
              <div>
                <strong>Audience:</strong> {targetAudienceOptions.find(opt => opt.value === formData.targetAudience)?.label}
              </div>
              <div>
                <strong>Style:</strong> {styleOptions.find(opt => opt.value === formData.style)?.label}
              </div>
              <div>
                <strong>Duration:</strong> {Math.floor(formData.duration / 60)}:{(formData.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="mt-3">
              <strong>Description:</strong>
              <p className="text-gray-600 mt-1">{formData.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateScene
