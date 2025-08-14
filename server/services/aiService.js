const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate educational content using AI
 */
async function generateEducationalContent({
  topic,
  description,
  targetAudience = 'high-school',
  language = 'en',
  includeQuiz = false
}) {
  try {
    const prompt = createContentPrompt({
      topic,
      description,
      targetAudience,
      language,
      includeQuiz
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational content creator and 3D visualization specialist. Create comprehensive educational content with detailed scene descriptions for 3D visualization.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = JSON.parse(completion.choices[0].message.content);
    return content;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to generate educational content: ${error.message}`);
  }
}

/**
 * Analyze topic complexity and suggest visualization approach
 */
async function analyzeTopicComplexity({ topic, description }) {
  try {
    const prompt = `
Analyze the following educational topic and provide recommendations for 3D visualization:

Topic: ${topic}
Description: ${description}

Please provide a JSON response with the following structure:
{
  "complexity": "simple|medium|complex",
  "visualizationApproach": "realistic|abstract|hybrid",
  "keyElements": ["element1", "element2", ...],
  "recommendedObjects": [
    {
      "name": "object name",
      "type": "geometry type",
      "importance": "high|medium|low",
      "description": "what this represents"
    }
  ],
  "cameraStrategy": "static|orbital|fly-through|focus-sequence",
  "estimatedDuration": number_in_seconds,
  "difficulty": "elementary|middle-school|high-school|college",
  "prerequisites": ["prerequisite1", "prerequisite2", ...]
}`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in educational technology and 3D visualization. Analyze topics and provide detailed recommendations for creating effective 3D educational content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    return JSON.parse(completion.choices[0].message.content);

  } catch (error) {
    console.error('Topic analysis error:', error);
    throw new Error(`Failed to analyze topic: ${error.message}`);
  }
}

/**
 * Create a detailed prompt for content generation
 */
function createContentPrompt({
  topic,
  description,
  targetAudience,
  language,
  includeQuiz
}) {
  const audienceMap = {
    'elementary': 'elementary school students (ages 6-11)',
    'middle-school': 'middle school students (ages 11-14)',
    'high-school': 'high school students (ages 14-18)',
    'college': 'college students (ages 18+)',
    'adult': 'adult learners'
  };

  const languageMap = {
    'en': 'English',
    'vi': 'Vietnamese',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German'
  };

  return `
Create comprehensive educational content for 3D visualization on the topic: "${topic}"

Topic Description: ${description}
Target Audience: ${audienceMap[targetAudience]}
Language: ${languageMap[language]}
Include Quiz: ${includeQuiz}

Please provide a JSON response with the following structure:
{
  "title": "Engaging title for the lesson",
  "overview": "Brief overview of what will be learned",
  "learningObjectives": ["objective1", "objective2", ...],
  "narrationScript": "Complete narration script for the video (detailed, engaging, and educational)",
  "sceneDescription": {
    "environment": "Description of the 3D environment",
    "objects": [
      {
        "name": "object name",
        "type": "3D object type (sphere, cube, model, etc.)",
        "position": [x, y, z],
        "scale": [x, y, z],
        "rotation": [x, y, z],
        "material": {
          "type": "material type",
          "color": "#hexcolor",
          "properties": {}
        },
        "animation": "description of any animations",
        "importance": "high|medium|low"
      }
    ],
    "lighting": {
      "ambient": "#hexcolor",
      "directional": {
        "color": "#hexcolor",
        "position": [x, y, z]
      }
    },
    "camera": {
      "initialPosition": [x, y, z],
      "initialTarget": [x, y, z]
    }
  },
  "keyMoments": [
    {
      "time": seconds,
      "description": "What happens at this moment",
      "cameraPosition": [x, y, z],
      "cameraTarget": [x, y, z],
      "focus": "what to focus on"
    }
  ],
  "vocabulary": [
    {
      "term": "scientific term",
      "definition": "definition appropriate for target audience"
    }
  ]${includeQuiz ? ',\n  "quiz": {\n    "questions": [\n      {\n        "question": "Question text",\n        "type": "multiple-choice|true-false|fill-blank",\n        "options": ["option1", "option2", "option3", "option4"],\n        "correctAnswer": 0,\n        "explanation": "Why this is correct"\n      }\n    ]\n  }' : ''}
}

Make sure the content is:
1. Age-appropriate for ${audienceMap[targetAudience]}
2. Scientifically accurate
3. Engaging and interactive
4. Suitable for 3D visualization
5. Written in ${languageMap[language]}
`;
}

module.exports = {
  generateEducationalContent,
  analyzeTopicComplexity
};
