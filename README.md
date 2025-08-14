# Procedural World Builder for Educational Videos

🌍 **AI-powered 3D environment generator for creating educational content**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-orange)](https://threejs.org/)

## 🚀 Features

- 🤖 **AI-Generated Content**: Automatically creates 3D scenes based on topic descriptions using GPT-4
- 🎬 **Camera Animation**: Smooth camera movements and transitions with timeline controls
- 🗣️ **Text-to-Speech**: Integrated TTS with Azure Speech Services and synchronized captions
- 🎨 **Real-time 3D Rendering**: Interactive 3D environments powered by Three.js
- 📚 **Educational Focus**: Optimized for scientific and educational content creation
- 🌐 **Web-based**: Runs entirely in browser with modern web technologies
- ⚡ **Performance Optimized**: Fast loading and smooth 60fps 3D rendering

## 🏗️ Architecture

```
procedural-world-builder/
├── client/                 # React + Three.js frontend
│   ├── src/
│   │   ├── components/     # React components (SceneRenderer, AnimationControls)
│   │   ├── stores/         # Zustand state management
│   │   ├── utils/          # Helper functions and utilities
│   │   └── styles/         # Tailwind CSS styles
├── server/                # Node.js + Express backend
│   ├── routes/            # API routes (scenes, ai, tts, animations)
│   ├── services/          # Business logic (aiService, ttsService)
│   └── middleware/        # Express middleware
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   └── DEVELOPMENT.md    # Development guide
└── scripts/              # Setup and deployment scripts
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **Three.js + React Three Fiber** - 3D graphics and WebGL rendering
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Vite** - Fast build tool and development server

### Backend
- **Node.js + Express** - Server runtime and web framework
- **OpenAI GPT-4 API** - AI content and scene generation
- **Azure Speech Services** - Text-to-Speech conversion
- **Joi** - Data validation and sanitization
- **CORS & Morgan** - Security and logging middleware

### Development Tools
- **Concurrently** - Parallel script execution
- **Nodemon** - Development server auto-restart
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **OpenAI API key** (required for AI features)
- **Azure Speech Services key** (optional, for TTS features)

### Installation

1. Clone and install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
# Create .env files in both client and server directories
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Start development servers:
```bash
npm run dev
```

This will start both the backend API (port 3001) and frontend (port 5173).

## Usage

1. **Choose Topic**: Select an educational topic (e.g., "Solar System", "Cell Biology")
2. **Describe Content**: Write a description of what you want to teach
3. **Generate Scene**: AI creates a 3D environment with appropriate objects and animations
4. **Customize**: Adjust camera paths, lighting, and scene parameters
5. **Export**: Generate video with TTS narration and captions

## API Endpoints

- `POST /api/scenes/generate` - Generate scene from topic description
- `GET /api/scenes/:id` - Retrieve scene configuration
- `POST /api/tts/synthesize` - Convert text to speech
- `POST /api/animations/create` - Create camera animation

## Scene Definition Format

```json
{
  "id": "solar-system-intro",
  "topic": "Solar System",
  "description": "Introduction to planets and their orbits",
  "objects": [
    {
      "type": "sphere",
      "name": "sun",
      "position": [0, 0, 0],
      "scale": [2, 2, 2],
      "material": {
        "type": "emissive",
        "color": "#ffff00"
      }
    }
  ],
  "cameras": [
    {
      "position": [10, 5, 10],
      "target": [0, 0, 0],
      "duration": 5000
    }
  ],
  "narration": "Welcome to our journey through the Solar System..."
}
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.
