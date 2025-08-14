const express = require('express');
const { generateSceneFromTopic, validateSceneData } = require('../services/sceneGenerator');
const { validateRequest } = require('../middleware/validation');
const Joi = require('joi');

const router = express.Router();

// Validation schemas
const generateSceneSchema = Joi.object({
  topic: Joi.string().required().min(1).max(200),
  description: Joi.string().required().min(10).max(1000),
  style: Joi.string().valid('realistic', 'cartoon', 'abstract').default('realistic'),
  complexity: Joi.string().valid('simple', 'medium', 'complex').default('medium'),
  duration: Joi.number().min(30).max(600).default(120) // seconds
});

// Generate scene from topic description
router.post('/generate', validateRequest(generateSceneSchema), async (req, res) => {
  try {
    const { topic, description, style, complexity, duration } = req.body;
    
    console.log(`🎬 Generating scene for topic: ${topic}`);
    
    const sceneData = await generateSceneFromTopic({
      topic,
      description,
      style,
      complexity,
      duration
    });
    
    // Validate generated scene data
    const validationResult = validateSceneData(sceneData);
    if (!validationResult.isValid) {
      throw new Error(`Invalid scene data: ${validationResult.errors.join(', ')}`);
    }
    
    res.json({
      success: true,
      scene: sceneData,
      metadata: {
        generatedAt: new Date().toISOString(),
        topic,
        style,
        complexity
      }
    });
    
  } catch (error) {
    console.error('Scene generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate scene',
      message: error.message
    });
  }
});

// Get scene by ID (for future database integration)
router.get('/:id', (req, res) => {
  // TODO: Implement database retrieval
  res.status(501).json({
    error: 'Scene retrieval not implemented yet',
    message: 'This feature will be available in future versions'
  });
});

// Update scene
router.put('/:id', (req, res) => {
  // TODO: Implement scene updates
  res.status(501).json({
    error: 'Scene update not implemented yet',
    message: 'This feature will be available in future versions'
  });
});

// List available scene templates
router.get('/templates/list', (req, res) => {
  const templates = [
    {
      id: 'solar-system',
      name: 'Solar System',
      description: 'Explore planets and their orbits',
      category: 'astronomy',
      complexity: 'medium'
    },
    {
      id: 'cell-biology',
      name: 'Cell Biology',
      description: 'Journey inside a living cell',
      category: 'biology',
      complexity: 'complex'
    },
    {
      id: 'molecular-structure',
      name: 'Molecular Structure',
      description: 'Visualize chemical compounds',
      category: 'chemistry',
      complexity: 'simple'
    },
    {
      id: 'historical-events',
      name: 'Historical Events',
      description: 'Recreate historical moments',
      category: 'history',
      complexity: 'medium'
    }
  ];
  
  res.json({
    success: true,
    templates
  });
});

module.exports = router;
