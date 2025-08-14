# API Documentation

## Base URL
All API endpoints are available at: `http://localhost:3001/api`

## Authentication
Currently, no authentication is required for API access. This will be added in future versions.

## Rate Limiting
- 100 requests per 15-minute window per IP address
- Exceeded limits return HTTP 429 with retry information

## Error Handling
All API responses follow this format:

```json
{
  "success": boolean,
  "data": object | null,
  "error": string | null,
  "message": string | null
}
```

## Endpoints

### Scenes API

#### POST /api/scenes/generate
Generate a 3D scene from topic description.

**Request Body:**
```json
{
  "topic": "Solar System",
  "description": "Explore planets and their orbits around the sun",
  "style": "realistic", // "realistic" | "cartoon" | "abstract"
  "complexity": "medium", // "simple" | "medium" | "complex"
  "duration": 120 // seconds
}
```

**Response:**
```json
{
  "success": true,
  "scene": {
    "id": "uuid",
    "metadata": {
      "topic": "Solar System",
      "style": "realistic",
      "complexity": "medium",
      "duration": 120,
      "generatedAt": "2024-01-01T00:00:00.000Z"
    },
    "content": {
      "title": "Journey Through the Solar System",
      "overview": "Learn about planets and their characteristics",
      "learningObjectives": ["Understand planetary orbits", "..."],
      "narration": "Welcome to our solar system tour...",
      "vocabulary": [...]
    },
    "scene": {
      "environment": {...},
      "objects": [...],
      "lighting": {...},
      "camera": {...}
    },
    "animation": {
      "duration": 120,
      "keyframes": [...],
      "style": "educational"
    },
    "audio": {
      "narration": {...},
      "backgroundMusic": {...}
    }
  }
}
```

#### GET /api/scenes/templates/list
Get available scene templates.

**Response:**
```json
{
  "success": true,
  "templates": [
    {
      "id": "solar-system",
      "name": "Solar System",
      "description": "Explore planets and their orbits",
      "category": "astronomy",
      "complexity": "medium"
    }
  ]
}
```

### AI API

#### POST /api/ai/generate-content
Generate educational content using AI.

**Request Body:**
```json
{
  "topic": "Cell Biology",
  "description": "Learn about cell structure and function",
  "targetAudience": "high-school", // "elementary" | "middle-school" | "high-school" | "college" | "adult"
  "language": "en", // "en" | "vi" | "es" | "fr" | "de"
  "includeQuiz": false
}
```

#### POST /api/ai/analyze-topic
Analyze topic complexity and suggest visualization approach.

**Request Body:**
```json
{
  "topic": "Photosynthesis",
  "description": "How plants convert sunlight into energy"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "complexity": "medium",
    "visualizationApproach": "realistic",
    "keyElements": ["chloroplast", "sunlight", "glucose"],
    "recommendedObjects": [...],
    "cameraStrategy": "focus-sequence",
    "estimatedDuration": 90,
    "difficulty": "high-school",
    "prerequisites": ["basic chemistry"]
  }
}
```

### TTS API

#### POST /api/tts/synthesize
Convert text to speech.

**Request Body:**
```json
{
  "text": "Welcome to our educational journey",
  "voice": "female", // "male" | "female" | "child"
  "language": "en-US", // "en-US" | "vi-VN" | "es-ES"
  "speed": 1.0, // 0.5 - 2.0
  "format": "mp3" // "mp3" | "wav" | "ogg"
}
```

#### POST /api/tts/captions
Generate captions with timestamps.

**Request Body:**
```json
{
  "text": "Welcome to our educational journey through space.",
  "duration": 60, // seconds
  "wordsPerMinute": 150
}
```

**Response:**
```json
{
  "success": true,
  "captions": [
    {
      "start": 0.0,
      "end": 2.5,
      "text": "Welcome to our",
      "wordCount": 3
    },
    {
      "start": 2.5,
      "end": 5.0,
      "text": "educational journey through space.",
      "wordCount": 4
    }
  ]
}
```

#### GET /api/tts/voices
Get available voices.

### Animation API

#### POST /api/animations/create
Create camera animation sequence.

**Request Body:**
```json
{
  "sceneId": "uuid",
  "duration": 60,
  "style": "educational", // "smooth" | "cinematic" | "educational" | "dramatic"
  "keyPoints": [
    {
      "time": 0,
      "position": [10, 5, 10],
      "target": [0, 0, 0],
      "description": "Opening wide shot"
    },
    {
      "time": 30,
      "position": [5, 10, 5],
      "target": [0, 0, 0],
      "description": "Elevated view"
    }
  ]
}
```

#### POST /api/animations/auto-keyframes
Generate automatic keyframes for a scene.

**Request Body:**
```json
{
  "sceneData": {
    "objects": [...]
  },
  "duration": 60,
  "focusPoints": ["sun", "earth"]
}
```

#### GET /api/animations/presets
Get animation presets.

**Response:**
```json
{
  "success": true,
  "presets": [
    {
      "id": "orbit",
      "name": "Orbital View",
      "description": "Smooth orbital camera movement",
      "style": "cinematic",
      "defaultDuration": 30
    }
  ]
}
```

## WebSocket Events (Future)

The following WebSocket events will be implemented for real-time updates:

- `scene:generating` - Scene generation progress
- `scene:completed` - Scene generation completed
- `animation:progress` - Animation rendering progress
- `tts:synthesizing` - Speech synthesis progress

## Error Codes

- `400` - Bad Request (validation errors)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error
- `503` - Service Unavailable (AI service down)

## Usage Examples

### Complete Scene Generation Flow

```javascript
// 1. Generate scene
const sceneResponse = await fetch('/api/scenes/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'Photosynthesis',
    description: 'How plants convert sunlight into energy',
    style: 'realistic',
    complexity: 'medium',
    duration: 120
  })
});

const { scene } = await sceneResponse.json();

// 2. Generate speech for narration
const ttsResponse = await fetch('/api/tts/synthesize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: scene.content.narration,
    voice: 'female',
    language: 'en-US'
  })
});

// 3. Generate captions
const captionsResponse = await fetch('/api/tts/captions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: scene.content.narration,
    duration: scene.animation.duration
  })
});

// 4. Create custom animation
const animationResponse = await fetch('/api/animations/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sceneId: scene.id,
    duration: 120,
    style: 'educational',
    keyPoints: [
      { time: 0, position: [10, 5, 10], target: [0, 0, 0] },
      { time: 60, position: [5, 10, 15], target: [0, 0, 0] },
      { time: 120, position: [15, 8, 5], target: [0, 0, 0] }
    ]
  })
});
```

### Error Handling

```javascript
try {
  const response = await fetch('/api/scenes/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic: 'Physics', description: 'Basic concepts' })
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  
  // Handle successful response
  console.log('Scene generated:', data.scene);
  
} catch (error) {
  if (error.response?.status === 429) {
    console.error('Rate limit exceeded. Please wait and try again.');
  } else if (error.response?.status === 503) {
    console.error('AI service is currently unavailable.');
  } else {
    console.error('Error:', error.message);
  }
}
```
