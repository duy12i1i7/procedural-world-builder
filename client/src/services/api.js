import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message)
    
    // Handle common errors
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.')
    } else if (error.response?.status === 503) {
      throw new Error('Service temporarily unavailable. Please try again later.')
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    
    return Promise.reject(error)
  }
)

// Scene API
export const sceneAPI = {
  // Generate scene from topic
  async generate(data) {
    const response = await api.post('/scenes/generate', data)
    return response.data
  },
  
  // Get scene by ID
  async getById(id) {
    const response = await api.get(`/scenes/${id}`)
    return response.data
  },
  
  // Update scene
  async update(id, data) {
    const response = await api.put(`/scenes/${id}`, data)
    return response.data
  },
  
  // Get templates
  async getTemplates() {
    const response = await api.get('/scenes/templates/list')
    return response.data
  }
}

// AI API
export const aiAPI = {
  // Generate educational content
  async generateContent(data) {
    const response = await api.post('/ai/generate-content', data)
    return response.data
  },
  
  // Analyze topic complexity
  async analyzeTopic(data) {
    const response = await api.post('/ai/analyze-topic', data)
    return response.data
  },
  
  // Generate quiz
  async generateQuiz(data) {
    const response = await api.post('/ai/generate-quiz', data)
    return response.data
  },
  
  // Get AI status
  async getStatus() {
    const response = await api.get('/ai/status')
    return response.data
  }
}

// TTS API
export const ttsAPI = {
  // Synthesize speech
  async synthesize(data) {
    const response = await api.post('/tts/synthesize', data)
    return response.data
  },
  
  // Generate captions
  async generateCaptions(data) {
    const response = await api.post('/tts/captions', data)
    return response.data
  },
  
  // Get available voices
  async getVoices() {
    const response = await api.get('/tts/voices')
    return response.data
  },
  
  // Advanced synthesis
  async advancedSynthesize(data) {
    const response = await api.post('/tts/advanced-synthesis', data)
    return response.data
  }
}

// Animation API
export const animationAPI = {
  // Create animation
  async create(data) {
    const response = await api.post('/animations/create', data)
    return response.data
  },
  
  // Generate auto keyframes
  async generateKeyframes(data) {
    const response = await api.post('/animations/auto-keyframes', data)
    return response.data
  },
  
  // Get presets
  async getPresets() {
    const response = await api.get('/animations/presets')
    return response.data
  },
  
  // Preview animation
  async preview(data) {
    const response = await api.post('/animations/preview', data)
    return response.data
  },
  
  // Export animation
  async export(data) {
    const response = await api.post('/animations/export', data)
    return response.data
  }
}

// Convenience functions
export const generateScene = async (data) => {
  try {
    return await sceneAPI.generate(data)
  } catch (error) {
    console.error('Scene generation failed:', error)
    throw error
  }
}

export const synthesizeSpeech = async (data) => {
  try {
    return await ttsAPI.synthesize(data)
  } catch (error) {
    console.error('Speech synthesis failed:', error)
    throw error
  }
}

export const createAnimation = async (data) => {
  try {
    return await animationAPI.create(data)
  } catch (error) {
    console.error('Animation creation failed:', error)
    throw error
  }
}

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}

export default api
