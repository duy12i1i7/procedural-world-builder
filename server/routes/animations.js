const express = require('express');
const { createCameraAnimation, generateKeyframes } = require('../services/animationService');
const { validateRequest } = require('../middleware/validation');
const Joi = require('joi');

const router = express.Router();

// Validation schemas
const animationSchema = Joi.object({
  sceneId: Joi.string().required(),
  duration: Joi.number().min(1).max(600).required(),
  style: Joi.string().valid('smooth', 'cinematic', 'educational', 'dramatic').default('educational'),
  keyPoints: Joi.array().items(
    Joi.object({
      time: Joi.number().min(0).required(),
      position: Joi.array().items(Joi.number()).length(3).required(),
      target: Joi.array().items(Joi.number()).length(3).required(),
      description: Joi.string().optional()
    })
  ).min(2).required()
});

// Create camera animation sequence
router.post('/create', validateRequest(animationSchema), async (req, res) => {
  try {
    const { sceneId, duration, style, keyPoints } = req.body;
    
    console.log(`🎥 Creating animation for scene: ${sceneId}`);
    
    const animation = await createCameraAnimation({
      sceneId,
      duration,
      style,
      keyPoints
    });
    
    res.json({
      success: true,
      animation,
      metadata: {
        createdAt: new Date().toISOString(),
        duration,
        keyPointCount: keyPoints.length,
        style
      }
    });
    
  } catch (error) {
    console.error('Animation creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create animation',
      message: error.message
    });
  }
});

// Generate automatic keyframes for a scene
router.post('/auto-keyframes', async (req, res) => {
  try {
    const { sceneData, duration = 60, focusPoints = [] } = req.body;
    
    if (!sceneData) {
      return res.status(400).json({
        success: false,
        error: 'Scene data is required'
      });
    }
    
    const keyframes = await generateKeyframes({
      sceneData,
      duration,
      focusPoints
    });
    
    res.json({
      success: true,
      keyframes,
      metadata: {
        generatedAt: new Date().toISOString(),
        duration,
        keyframeCount: keyframes.length
      }
    });
    
  } catch (error) {
    console.error('Keyframe generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate keyframes',
      message: error.message
    });
  }
});

// Get animation presets
router.get('/presets', (req, res) => {
  const presets = [
    {
      id: 'orbit',
      name: 'Orbital View',
      description: 'Smooth orbital camera movement around the main object',
      style: 'cinematic',
      defaultDuration: 30
    },
    {
      id: 'fly-through',
      name: 'Fly Through',
      description: 'Camera flies through the scene showing different perspectives',
      style: 'dramatic',
      defaultDuration: 45
    },
    {
      id: 'zoom-in',
      name: 'Zoom In',
      description: 'Gradual zoom into important details',
      style: 'educational',
      defaultDuration: 20
    },
    {
      id: 'panoramic',
      name: 'Panoramic Sweep',
      description: 'Wide panoramic view of the entire scene',
      style: 'smooth',
      defaultDuration: 35
    },
    {
      id: 'focus-sequence',
      name: 'Focus Sequence',
      description: 'Sequential focus on different objects in the scene',
      style: 'educational',
      defaultDuration: 60
    }
  ];
  
  res.json({
    success: true,
    presets
  });
});

// Preview animation path
router.post('/preview', async (req, res) => {
  try {
    const { keyPoints, resolution = 30 } = req.body;
    
    if (!keyPoints || keyPoints.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'At least 2 keypoints are required'
      });
    }
    
    // Generate interpolated points for preview
    const previewPoints = [];
    for (let i = 0; i < keyPoints.length - 1; i++) {
      const start = keyPoints[i];
      const end = keyPoints[i + 1];
      
      for (let j = 0; j <= resolution; j++) {
        const t = j / resolution;
        const point = {
          time: start.time + (end.time - start.time) * t,
          position: [
            start.position[0] + (end.position[0] - start.position[0]) * t,
            start.position[1] + (end.position[1] - start.position[1]) * t,
            start.position[2] + (end.position[2] - start.position[2]) * t
          ],
          target: [
            start.target[0] + (end.target[0] - start.target[0]) * t,
            start.target[1] + (end.target[1] - start.target[1]) * t,
            start.target[2] + (end.target[2] - start.target[2]) * t
          ]
        };
        previewPoints.push(point);
      }
    }
    
    res.json({
      success: true,
      previewPoints,
      metadata: {
        originalKeypoints: keyPoints.length,
        interpolatedPoints: previewPoints.length,
        resolution
      }
    });
    
  } catch (error) {
    console.error('Animation preview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate preview',
      message: error.message
    });
  }
});

// Export animation for video rendering
router.post('/export', async (req, res) => {
  try {
    const { animationId, format = 'json', fps = 30 } = req.body;
    
    if (!animationId) {
      return res.status(400).json({
        success: false,
        error: 'Animation ID is required'
      });
    }
    
    // TODO: Implement animation export
    res.json({
      success: true,
      exportData: {
        format,
        fps,
        frames: [],
        metadata: {
          exportedAt: new Date().toISOString(),
          animationId
        }
      }
    });
    
  } catch (error) {
    console.error('Animation export error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export animation',
      message: error.message
    });
  }
});

module.exports = router;
