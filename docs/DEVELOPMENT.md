# Development Guide

## Project Structure

```
procedural-world-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── store/          # Zustand state management
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # Express route handlers
│   ├── services/           # Business logic services
│   ├── middleware/         # Express middleware
│   └── package.json
├── shared/                 # Shared types and utilities
├── docs/                   # Documentation
└── package.json            # Root package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key
- Azure Speech Services key (optional)

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd procedural-world-builder
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure environment:**
   ```bash
   # Edit server/.env
   OPENAI_API_KEY=your_openai_api_key_here
   AZURE_SPEECH_KEY=your_azure_speech_key_here
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

## Development Workflow

### Frontend Development

The frontend is built with React, Three.js, and Tailwind CSS.

**Key Technologies:**
- **React 18** - UI framework with hooks and concurrent features
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Zustand** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

**Component Structure:**
```
src/components/
├── SceneRenderer.jsx       # Main 3D scene renderer
├── AnimationControls.jsx   # Camera animation controls
├── CaptionDisplay.jsx      # Subtitle display
├── SceneSettings.jsx       # Settings modal
└── Navbar.jsx             # Navigation component
```

**Creating New Components:**
```jsx
import React from 'react'
import { motion } from 'framer-motion'

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card"
    >
      {/* Component content */}
    </motion.div>
  )
}

export default MyComponent
```

### Backend Development

The backend uses Node.js with Express and integrates with AI services.

**Key Technologies:**
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI API** - AI content generation
- **Azure Speech SDK** - Text-to-speech
- **Joi** - Request validation

**Service Structure:**
```
server/services/
├── aiService.js           # OpenAI integration
├── sceneGenerator.js      # Scene generation logic
├── ttsService.js          # Text-to-speech
└── animationService.js    # Animation generation
```

**Creating New Routes:**
```javascript
const express = require('express');
const { validateRequest } = require('../middleware/validation');
const Joi = require('joi');

const router = express.Router();

const schema = Joi.object({
  param1: Joi.string().required(),
  param2: Joi.number().optional()
});

router.post('/endpoint', validateRequest(schema), async (req, res) => {
  try {
    const { param1, param2 } = req.body;
    
    // Process request
    const result = await processData(param1, param2);
    
    res.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
```

### 3D Scene Development

Scenes are created using Three.js with React Three Fiber.

**Scene Object Structure:**
```javascript
const sceneObject = {
  name: 'Object Name',
  type: 'sphere', // 'sphere', 'cube', 'cylinder', etc.
  position: [x, y, z],
  scale: [x, y, z],
  rotation: [x, y, z],
  material: {
    type: 'standard',
    color: '#ffffff',
    properties: {
      roughness: 0.5,
      metalness: 0.1
    }
  },
  animation: 'rotate' // Optional animation type
}
```

**Creating Custom 3D Objects:**
```jsx
const CustomObject = ({ object, currentTime, isPlaying }) => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (isPlaying && meshRef.current) {
      // Apply animations based on currentTime
      meshRef.current.rotation.y += delta * 0.5
    }
  })
  
  return (
    <mesh ref={meshRef} position={object.position} scale={object.scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={object.material.color} />
    </mesh>
  )
}
```

### AI Integration

The system uses OpenAI's GPT-4 for content generation.

**Content Generation Process:**
1. Analyze topic complexity
2. Generate educational content structure
3. Create 3D scene descriptions
4. Generate narration scripts
5. Create learning objectives

**Custom AI Prompts:**
```javascript
const createPrompt = (topic, description, audience) => {
  return `
Create comprehensive educational content for: "${topic}"

Description: ${description}
Target Audience: ${audience}

Please provide:
1. Learning objectives
2. 3D scene description
3. Narration script
4. Key vocabulary terms

Format the response as JSON...
`;
}
```

### State Management

Using Zustand for client-side state management.

**Store Structure:**
```javascript
export const useSceneStore = create((set, get) => ({
  // State
  currentScene: null,
  scenes: [],
  isLoading: false,
  
  // Actions
  setCurrentScene: (scene) => set({ currentScene: scene }),
  addScene: (scene) => set((state) => ({
    scenes: [...state.scenes, scene]
  })),
  
  // Getters
  getSceneById: (id) => {
    const state = get()
    return state.scenes.find(scene => scene.id === id)
  }
}))
```

## Testing

### Frontend Testing
```bash
cd client
npm run test
```

### Backend Testing
```bash
cd server
npm run test
```

### API Testing
Use the provided Postman collection or curl commands:
```bash
curl -X POST http://localhost:3001/api/scenes/generate \
  -H "Content-Type: application/json" \
  -d '{"topic":"Solar System","description":"Learn about planets"}'
```

## Performance Optimization

### Frontend Optimization
- Use React.memo for expensive components
- Implement lazy loading for 3D models
- Optimize Three.js scenes with LOD (Level of Detail)
- Use Suspense for async components

### Backend Optimization
- Implement caching for AI responses
- Use connection pooling for databases
- Optimize image/audio processing
- Implement request queuing for AI services

### 3D Optimization
```javascript
// Level of Detail optimization
const OptimizedMesh = ({ distance }) => {
  const geometry = useMemo(() => {
    const detail = distance > 20 ? 8 : distance > 10 ? 16 : 32
    return new SphereGeometry(1, detail, detail)
  }, [distance])
  
  return (
    <mesh>
      <primitive object={geometry} />
      <meshStandardMaterial />
    </mesh>
  )
}
```

## Debugging

### Frontend Debugging
- Use React Developer Tools
- Enable Three.js debug mode
- Use browser performance profiler
- Add debug overlays for 3D scenes

### Backend Debugging
- Use Node.js debugger
- Add comprehensive logging
- Monitor API response times
- Track AI service usage

**Debug Configuration:**
```javascript
// Debug mode for Three.js
if (process.env.NODE_ENV === 'development') {
  window.THREE = THREE
  // Add stats monitor
  const stats = new Stats()
  document.body.appendChild(stats.dom)
}
```

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Variables
```bash
# Production environment
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=your_production_key
AZURE_SPEECH_KEY=your_production_key
CORS_ORIGIN=https://yourdomain.com
```

## Code Style

### JavaScript/JSX
- Use ESLint and Prettier
- Follow React best practices
- Use descriptive variable names
- Add JSDoc comments for functions

### CSS
- Use Tailwind utility classes
- Create custom components for repeated patterns
- Maintain consistent spacing
- Use semantic color names

### File Naming
- Components: PascalCase (e.g., `SceneRenderer.jsx`)
- Services: camelCase (e.g., `apiService.js`)
- Utilities: camelCase (e.g., `mathUtils.js`)
- Constants: UPPER_SNAKE_CASE

## Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/amazing-feature`
3. **Follow code style guidelines**
4. **Add tests for new features**
5. **Update documentation**
6. **Submit pull request**

### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Performance impact considered
- [ ] Accessibility guidelines followed

## Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

**3D Scene Not Rendering:**
- Check WebGL support in browser
- Verify Three.js version compatibility
- Check console for errors
- Ensure proper canvas sizing

**AI API Errors:**
- Verify OpenAI API key
- Check API rate limits
- Monitor token usage
- Implement proper error handling

**Performance Issues:**
- Use React Profiler
- Monitor Three.js performance
- Check network requests
- Optimize asset sizes

### Getting Help

- Check the [API Documentation](./API.md)
- Review existing issues on GitHub
- Join our Discord community
- Contact the development team

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
