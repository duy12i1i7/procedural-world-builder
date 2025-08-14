import { create } from 'zustand'

export const useSceneStore = create((set, get) => ({
  // State
  currentScene: null,
  scenes: [],
  isLoading: false,
  error: null,
  
  // Actions
  setCurrentScene: (scene) => set({ currentScene: scene }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  addScene: (scene) => set((state) => ({
    scenes: [...state.scenes, scene]
  })),
  
  updateScene: (sceneId, updates) => set((state) => ({
    scenes: state.scenes.map(scene => 
      scene.id === sceneId ? { ...scene, ...updates } : scene
    ),
    currentScene: state.currentScene?.id === sceneId 
      ? { ...state.currentScene, ...updates }
      : state.currentScene
  })),
  
  deleteScene: (sceneId) => set((state) => ({
    scenes: state.scenes.filter(scene => scene.id !== sceneId),
    currentScene: state.currentScene?.id === sceneId ? null : state.currentScene
  })),
  
  clearError: () => set({ error: null }),
  
  // Getters
  getSceneById: (sceneId) => {
    const state = get()
    return state.scenes.find(scene => scene.id === sceneId) || null
  },
  
  getScenesByTopic: (topic) => {
    const state = get()
    return state.scenes.filter(scene => 
      scene.metadata?.topic?.toLowerCase().includes(topic.toLowerCase())
    )
  }
}))
