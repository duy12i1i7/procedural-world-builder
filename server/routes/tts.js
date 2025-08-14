const express = require('express');
const { synthesizeSpeech, generateCaptions } = require('../services/ttsService');
const { validateRequest } = require('../middleware/validation');
const Joi = require('joi');

const router = express.Router();

// Validation schemas
const speechSynthesisSchema = Joi.object({
  text: Joi.string().required().min(1).max(5000),
  voice: Joi.string().valid('male', 'female', 'child').default('female'),
  language: Joi.string().valid('en-US', 'vi-VN', 'es-ES', 'fr-FR', 'de-DE').default('en-US'),
  speed: Joi.number().min(0.5).max(2.0).default(1.0),
  format: Joi.string().valid('mp3', 'wav', 'ogg').default('mp3')
});

// Synthesize speech from text
router.post('/synthesize', validateRequest(speechSynthesisSchema), async (req, res) => {
  try {
    const { text, voice, language, speed, format } = req.body;
    
    console.log(`🗣️ Synthesizing speech for ${text.length} characters`);
    
    const audioData = await synthesizeSpeech({
      text,
      voice,
      language,
      speed,
      format
    });
    
    res.json({
      success: true,
      audio: {
        data: audioData.buffer,
        format: format,
        duration: audioData.duration,
        size: audioData.size
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        voice,
        language,
        textLength: text.length
      }
    });
    
  } catch (error) {
    console.error('Speech synthesis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to synthesize speech',
      message: error.message
    });
  }
});

// Generate captions with timestamps
router.post('/captions', async (req, res) => {
  try {
    const { text, duration, wordsPerMinute = 150 } = req.body;
    
    if (!text || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Text and duration are required'
      });
    }
    
    const captions = await generateCaptions({
      text,
      duration,
      wordsPerMinute
    });
    
    res.json({
      success: true,
      captions,
      metadata: {
        totalDuration: duration,
        segmentCount: captions.length,
        averageWordsPerMinute: wordsPerMinute
      }
    });
    
  } catch (error) {
    console.error('Caption generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate captions',
      message: error.message
    });
  }
});

// Get available voices
router.get('/voices', (req, res) => {
  const voices = [
    {
      id: 'en-female-1',
      name: 'Sarah',
      language: 'en-US',
      gender: 'female',
      description: 'Clear, professional female voice'
    },
    {
      id: 'en-male-1',
      name: 'David',
      language: 'en-US',
      gender: 'male',
      description: 'Warm, engaging male voice'
    },
    {
      id: 'vi-female-1',
      name: 'Linh',
      language: 'vi-VN',
      gender: 'female',
      description: 'Natural Vietnamese female voice'
    },
    {
      id: 'vi-male-1',
      name: 'Nam',
      language: 'vi-VN',
      gender: 'male',
      description: 'Clear Vietnamese male voice'
    }
  ];
  
  res.json({
    success: true,
    voices
  });
});

// Convert text to speech with advanced options
router.post('/advanced-synthesis', async (req, res) => {
  try {
    const { 
      text, 
      voice, 
      language = 'en-US',
      speed = 1.0,
      pitch = 1.0,
      volume = 1.0,
      emphasis = [],
      pauses = []
    } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text is required'
      });
    }
    
    // TODO: Implement advanced synthesis with SSML
    const audioData = await synthesizeSpeech({
      text,
      voice,
      language,
      speed,
      pitch,
      volume,
      emphasis,
      pauses
    });
    
    res.json({
      success: true,
      audio: audioData
    });
    
  } catch (error) {
    console.error('Advanced synthesis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to synthesize speech',
      message: error.message
    });
  }
});

module.exports = router;
