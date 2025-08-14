const express = require('express');
const { generateEducationalContent, analyzeTopicComplexity } = require('../services/aiService');
const { validateRequest } = require('../middleware/validation');
const Joi = require('joi');

const router = express.Router();

// Validation schemas
const contentGenerationSchema = Joi.object({
  topic: Joi.string().required().min(1).max(200),
  description: Joi.string().required().min(10).max(1000),
  targetAudience: Joi.string().valid('elementary', 'middle-school', 'high-school', 'college', 'adult').default('high-school'),
  language: Joi.string().valid('en', 'vi', 'es', 'fr', 'de').default('en'),
  includeQuiz: Joi.boolean().default(false)
});

// Generate educational content using AI
router.post('/generate-content', validateRequest(contentGenerationSchema), async (req, res) => {
  try {
    const { topic, description, targetAudience, language, includeQuiz } = req.body;
    
    console.log(`🤖 Generating AI content for: ${topic}`);
    
    const content = await generateEducationalContent({
      topic,
      description,
      targetAudience,
      language,
      includeQuiz
    });
    
    res.json({
      success: true,
      content,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'gpt-4',
        targetAudience,
        language
      }
    });
    
  } catch (error) {
    console.error('AI content generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate content',
      message: error.message
    });
  }
});

// Analyze topic complexity and suggest visualization
router.post('/analyze-topic', async (req, res) => {
  try {
    const { topic, description } = req.body;
    
    if (!topic || !description) {
      return res.status(400).json({
        success: false,
        error: 'Topic and description are required'
      });
    }
    
    const analysis = await analyzeTopicComplexity({ topic, description });
    
    res.json({
      success: true,
      analysis
    });
    
  } catch (error) {
    console.error('Topic analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze topic',
      message: error.message
    });
  }
});

// Generate quiz questions for a topic
router.post('/generate-quiz', async (req, res) => {
  try {
    const { topic, content, difficulty = 'medium', questionCount = 5 } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        error: 'Topic is required'
      });
    }
    
    // TODO: Implement quiz generation
    const quiz = {
      topic,
      difficulty,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: `What is the main characteristic of ${topic}?`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          explanation: 'This is a placeholder explanation.'
        }
      ]
    };
    
    res.json({
      success: true,
      quiz
    });
    
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quiz',
      message: error.message
    });
  }
});

// Get AI model status and capabilities
router.get('/status', (req, res) => {
  res.json({
    success: true,
    models: {
      textGeneration: {
        available: !!process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-4',
        status: 'active'
      },
      imageGeneration: {
        available: false,
        model: 'dall-e-3',
        status: 'planned'
      }
    },
    capabilities: [
      'Educational content generation',
      'Topic complexity analysis',
      'Scene description creation',
      'Narration script writing',
      'Quiz generation'
    ]
  });
});

module.exports = router;
