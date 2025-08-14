const { generateEducationalContent, analyzeTopicComplexity } = require('./aiService');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate 3D scene data from topic description using AI
 */
async function generateSceneFromTopic({
  topic,
  description,
  style = 'realistic',
  complexity = 'medium',
  duration = 120
}) {
  try {
    // First, analyze the topic to understand visualization requirements
    const analysis = await analyzeTopicComplexity({ topic, description });
    
    // Generate educational content with 3D scene specifications
    const content = await generateEducationalContent({
      topic,
      description,
      targetAudience: analysis.difficulty || 'high-school',
      language: 'en',
      includeQuiz: false
    });

    // Create the scene data structure
    const sceneData = {
      id: uuidv4(),
      metadata: {
        topic,
        description,
        style,
        complexity,
        duration,
        generatedAt: new Date().toISOString(),
        version: '1.0'
      },
      content: {
        title: content.title,
        overview: content.overview,
        learningObjectives: content.learningObjectives,
        narration: content.narrationScript,
        vocabulary: content.vocabulary || []
      },
      scene: {
        environment: {
          type: determineEnvironmentType(topic, analysis),
          background: generateBackground(topic, style),
          fog: style === 'realistic' ? { enabled: true, density: 0.01 } : { enabled: false }
        },
        objects: enhanceObjectsWithStyle(content.sceneDescription.objects, style, complexity),
        lighting: enhanceLighting(content.sceneDescription.lighting, style),
        camera: content.sceneDescription.camera
      },
      animation: {
        duration,
        keyframes: generateCameraKeyframes(content.keyMoments, duration),
        style: analysis.cameraStrategy || 'educational'
      },
      audio: {
        narration: {
          text: content.narrationScript,
          language: 'en-US',
          voice: 'female',
          speed: 1.0
        },
        backgroundMusic: {
          enabled: false,
          type: 'ambient'
        }
      }
    };

    return sceneData;

  } catch (error) {
    console.error('Scene generation error:', error);
    throw new Error(`Failed to generate scene: ${error.message}`);
  }
}

/**
 * Validate scene data structure
 */
function validateSceneData(sceneData) {
  const errors = [];
  
  // Check required fields
  if (!sceneData.id) errors.push('Missing scene ID');
  if (!sceneData.metadata) errors.push('Missing metadata');
  if (!sceneData.scene) errors.push('Missing scene data');
  if (!sceneData.animation) errors.push('Missing animation data');
  
  // Validate scene objects
  if (sceneData.scene && sceneData.scene.objects) {
    sceneData.scene.objects.forEach((obj, index) => {
      if (!obj.name) errors.push(`Object ${index} missing name`);
      if (!obj.type) errors.push(`Object ${index} missing type`);
      if (!obj.position || obj.position.length !== 3) {
        errors.push(`Object ${index} invalid position`);
      }
    });
  }
  
  // Validate animation keyframes
  if (sceneData.animation && sceneData.animation.keyframes) {
    sceneData.animation.keyframes.forEach((keyframe, index) => {
      if (typeof keyframe.time !== 'number') {
        errors.push(`Keyframe ${index} invalid time`);
      }
      if (!keyframe.camera || !keyframe.camera.position || keyframe.camera.position.length !== 3) {
        errors.push(`Keyframe ${index} invalid camera position`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Determine environment type based on topic
 */
function determineEnvironmentType(topic, analysis) {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('space') || topicLower.includes('solar') || topicLower.includes('planet')) {
    return 'space';
  } else if (topicLower.includes('ocean') || topicLower.includes('marine') || topicLower.includes('water')) {
    return 'underwater';
  } else if (topicLower.includes('cell') || topicLower.includes('molecule') || topicLower.includes('atom')) {
    return 'microscopic';
  } else if (topicLower.includes('history') || topicLower.includes('ancient') || topicLower.includes('civilization')) {
    return 'historical';
  }
  
  return 'laboratory';
}

/**
 * Generate background based on topic and style
 */
function generateBackground(topic, style) {
  const backgrounds = {
    space: {
      realistic: { type: 'skybox', texture: 'starfield', color: '#000011' },
      cartoon: { type: 'gradient', colors: ['#1a1a2e', '#16213e'] },
      abstract: { type: 'solid', color: '#0d1421' }
    },
    underwater: {
      realistic: { type: 'gradient', colors: ['#006994', '#001f3f'] },
      cartoon: { type: 'gradient', colors: ['#4FC3F7', '#0277BD'] },
      abstract: { type: 'solid', color: '#004d7a' }
    },
    laboratory: {
      realistic: { type: 'solid', color: '#f5f5f5' },
      cartoon: { type: 'gradient', colors: ['#ffffff', '#e0e0e0'] },
      abstract: { type: 'solid', color: '#fafafa' }
    }
  };
  
  const envType = determineEnvironmentType(topic, {});
  return backgrounds[envType]?.[style] || backgrounds.laboratory[style];
}

/**
 * Enhance objects with style-specific properties
 */
function enhanceObjectsWithStyle(objects, style, complexity) {
  if (!objects) return [];
  
  return objects.map(obj => {
    const enhanced = { ...obj };
    
    // Add style-specific material properties
    if (style === 'cartoon') {
      enhanced.material = {
        ...enhanced.material,
        type: 'toon',
        outlineWidth: 0.02,
        outlineColor: '#000000'
      };
    } else if (style === 'realistic') {
      enhanced.material = {
        ...enhanced.material,
        type: 'physically-based',
        roughness: 0.5,
        metalness: 0.1
      };
    }
    
    // Add complexity-based details
    if (complexity === 'complex') {
      enhanced.details = {
        levelOfDetail: 'high',
        subsurface: true,
        particles: obj.name.includes('energy') || obj.name.includes('field')
      };
    }
    
    return enhanced;
  });
}

/**
 * Enhance lighting based on style
 */
function enhanceLighting(lighting, style) {
  if (!lighting) {
    lighting = {
      ambient: '#404040',
      directional: {
        color: '#ffffff',
        position: [10, 10, 5]
      }
    };
  }
  
  const enhanced = { ...lighting };
  
  if (style === 'cartoon') {
    enhanced.ambient = '#606060';
    enhanced.shadows = false;
  } else if (style === 'realistic') {
    enhanced.shadows = true;
    enhanced.softShadows = true;
    enhanced.environmentMap = true;
  }
  
  return enhanced;
}

/**
 * Generate camera keyframes from key moments
 */
function generateCameraKeyframes(keyMoments, duration) {
  if (!keyMoments || keyMoments.length === 0) {
    // Default keyframes for basic camera movement
    return [
      {
        time: 0,
        camera: {
          position: [10, 5, 10],
          target: [0, 0, 0],
          fov: 75
        },
        transition: 'smooth'
      },
      {
        time: duration,
        camera: {
          position: [5, 10, 15],
          target: [0, 0, 0],
          fov: 60
        },
        transition: 'smooth'
      }
    ];
  }
  
  return keyMoments.map(moment => ({
    time: moment.time,
    camera: {
      position: moment.cameraPosition,
      target: moment.cameraTarget,
      fov: 75
    },
    description: moment.description,
    focus: moment.focus,
    transition: 'smooth'
  }));
}

module.exports = {
  generateSceneFromTopic,
  validateSceneData
};
