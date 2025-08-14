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

### System Overview
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PROCEDURAL WORLD BUILDER                        │
│                         Educational Video Generator                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 CLIENT LAYER                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  React 18 + Vite                                                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐              │
│  │   UI Components │ │  3D Renderer    │ │ Animation Tools │              │
│  │                 │ │                 │ │                 │              │
│  │ • CreateScene   │ │ • Three.js      │ │ • Timeline      │              │
│  │ • SceneViewer   │ │ • WebGL         │ │ • Keyframes     │              │
│  │ • Controls      │ │ • Camera Ctrl   │ │ • Playback      │              │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                   HTTP/REST API
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                SERVER LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Node.js + Express                                                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐              │
│  │   API Routes    │ │    Services     │ │   Middleware    │              │
│  │                 │ │                 │ │                 │              │
│  │ • /api/scenes   │ │ • aiService     │ │ • Validation    │              │
│  │ • /api/ai       │ │ • ttsService    │ │ • CORS          │              │
│  │ • /api/tts      │ │ • sceneGen      │ │ • Logging       │              │
│  │ • /api/anim     │ │ • animService   │ │ • Error Handle  │              │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                   External APIs
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL SERVICES                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐              ┌──────────────────────┐             │
│  │    OpenAI GPT-4      │              │   Azure Speech       │             │
│  │                      │              │                      │             │
│  │ • Scene Generation   │              │ • Text-to-Speech     │             │
│  │ • Content Creation   │              │ • Voice Synthesis    │             │
│  │ • Educational Text   │              │ • Audio Processing   │             │
│  └──────────────────────┘              └──────────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    User     │───▶│    React    │───▶│   Express   │───▶│  OpenAI     │
│   Input     │    │  Frontend   │    │   Backend   │    │   GPT-4     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │                    │
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Topic:    │    │  3D Scene   │    │ Scene Data  │    │ Generated   │
│"Solar Sys"  │    │  Renderer   │    │ Processing  │    │ 3D Objects  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │                    │
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ AI Content  │◀───│  Timeline   │◀───│   Audio     │◀───│   Azure     │
│ Generation  │    │ Animation   │    │  Service    │    │   Speech    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │                    │
      │                    │                    │                    │
      ▼                    ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        FINAL OUTPUT                                    │
│  📹 Educational Video with 3D Scenes + Voice-over + Subtitles          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Architecture
```
procedural-world-builder/
├── client/                     # 🎨 Frontend Application
│   ├── src/
│   │   ├── components/         # 🧩 React Components
│   │   │   ├── SceneRenderer.jsx      # 🌍 3D Scene Display
│   │   │   ├── CreateScene.jsx        # ➕ Scene Creation Wizard  
│   │   │   ├── SceneViewer.jsx        # 👁️ 3D Scene Viewer
│   │   │   ├── AnimationControls.jsx  # ⏯️ Timeline Controls
│   │   │   ├── CaptionDisplay.jsx     # 📝 Subtitle Display
│   │   │   ├── SceneSettings.jsx      # ⚙️ Scene Configuration
│   │   │   └── Navbar.jsx             # 🧭 Navigation Bar
│   │   ├── pages/              # 📄 Page Components
│   │   │   ├── HomePage.jsx           # 🏠 Landing Page
│   │   │   ├── CreateScene.jsx        # 🆕 Scene Creation
│   │   │   ├── SceneViewer.jsx        # 👀 Scene Viewing
│   │   │   └── AboutPage.jsx          # ℹ️ About Information
│   │   ├── services/           # 🔧 API Integration
│   │   │   └── api.js                 # 📡 HTTP Client
│   │   ├── store/              # 🗄️ State Management
│   │   │   └── sceneStore.js          # 📊 Scene State (Zustand)
│   │   └── styles/             # 🎨 Styling
│   │       └── index.css              # 💅 Tailwind + Custom CSS
│   └── package.json            # 📦 Frontend Dependencies
├── server/                     # 🖥️ Backend API Server
│   ├── routes/                 # 🛤️ API Routes
│   │   ├── scenes.js                  # 🌍 Scene CRUD Operations
│   │   ├── ai.js                      # 🤖 AI Content Generation
│   │   ├── tts.js                     # 🗣️ Text-to-Speech
│   │   └── animations.js              # 🎬 Animation Management
│   ├── services/               # 🏭 Business Logic
│   │   ├── aiService.js               # 🧠 OpenAI Integration
│   │   ├── ttsService.js              # 🔊 Azure Speech Service
│   │   ├── sceneGenerator.js          # 🏗️ Scene Generation Logic
│   │   └── animationService.js        # 📹 Animation Processing
│   ├── middleware/             # 🔒 Express Middleware
│   │   └── validation.js              # ✅ Input Validation (Joi)
│   └── package.json            # 📦 Backend Dependencies
├── docs/                       # 📚 Documentation
│   ├── API.md                         # 📋 API Reference
│   └── DEVELOPMENT.md                 # 👨‍💻 Dev Guidelines
└── scripts/                    # 🔧 Automation Scripts
    ├── setup.sh                       # 🐧 Unix Setup
    ├── setup.bat                      # 🪟 Windows Setup
    ├── git-setup.sh                   # 📂 Git Initialization
    └── git-setup.bat                  # 📂 Git Initialization (Win)
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
