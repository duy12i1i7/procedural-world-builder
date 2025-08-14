/**
 * Animation Service
 * Handles camera animation and keyframe generation
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Create camera animation sequence
 */
async function createCameraAnimation({
  sceneId,
  duration,
  style = 'educational',
  keyPoints
}) {
  try {
    console.log(`🎥 Creating ${style} animation for ${duration}s`);
    
    // Validate keyPoints
    if (!keyPoints || keyPoints.length < 2) {
      throw new Error('At least 2 key points are required for animation');
    }
    
    // Sort keyPoints by time
    const sortedKeyPoints = keyPoints.sort((a, b) => a.time - b.time);
    
    // Generate smooth transitions between keypoints
    const frames = generateFrameSequence(sortedKeyPoints, duration, style);
    
    // Apply easing functions based on style
    const easedFrames = applyEasing(frames, style);
    
    const animation = {
      id: uuidv4(),
      sceneId,
      metadata: {
        createdAt: new Date().toISOString(),
        duration,
        style,
        keyPointCount: keyPoints.length,
        frameCount: easedFrames.length
      },
      keyPoints: sortedKeyPoints,
      frames: easedFrames,
      settings: {
        fps: 30,
        interpolation: getInterpolationType(style),
        smoothing: true
      }
    };
    
    console.log(`✅ Generated ${easedFrames.length} animation frames`);
    return animation;
    
  } catch (error) {
    console.error('Animation creation error:', error);
    throw new Error(`Failed to create animation: ${error.message}`);
  }
}

/**
 * Generate automatic keyframes for a scene
 */
async function generateKeyframes({
  sceneData,
  duration = 60,
  focusPoints = []
}) {
  try {
    if (!sceneData || !sceneData.objects) {
      throw new Error('Scene data with objects is required');
    }
    
    const objects = sceneData.objects;
    const keyframes = [];
    
    // Calculate scene bounds
    const bounds = calculateSceneBounds(objects);
    const center = [
      (bounds.min[0] + bounds.max[0]) / 2,
      (bounds.min[1] + bounds.max[1]) / 2,
      (bounds.min[2] + bounds.max[2]) / 2
    ];
    
    // Generate opening shot
    const openingDistance = Math.max(
      bounds.max[0] - bounds.min[0],
      bounds.max[1] - bounds.min[1],
      bounds.max[2] - bounds.min[2]
    ) * 2;
    
    keyframes.push({
      time: 0,
      position: [
        center[0] + openingDistance * 0.8,
        center[1] + openingDistance * 0.5,
        center[2] + openingDistance * 0.8
      ],
      target: center,
      description: 'Opening wide shot of the scene'
    });
    
    // Generate keyframes for important objects
    const importantObjects = objects
      .filter(obj => obj.importance === 'high' || focusPoints.includes(obj.name))
      .slice(0, 4); // Limit to 4 focus objects
    
    const timePerObject = duration / (importantObjects.length + 1);
    
    importantObjects.forEach((obj, index) => {
      const time = timePerObject * (index + 1);
      const focusDistance = Math.max(obj.scale?.[0] || 1, obj.scale?.[1] || 1, obj.scale?.[2] || 1) * 3;
      
      keyframes.push({
        time,
        position: [
          obj.position[0] + focusDistance,
          obj.position[1] + focusDistance * 0.5,
          obj.position[2] + focusDistance
        ],
        target: obj.position,
        description: `Focus on ${obj.name}`
      });
    });
    
    // Generate closing shot
    keyframes.push({
      time: duration,
      position: [
        center[0] - openingDistance * 0.6,
        center[1] + openingDistance * 0.7,
        center[2] + openingDistance * 0.6
      ],
      target: center,
      description: 'Closing panoramic view'
    });
    
    return keyframes;
    
  } catch (error) {
    console.error('Keyframe generation error:', error);
    throw new Error(`Failed to generate keyframes: ${error.message}`);
  }
}

/**
 * Generate frame sequence between keypoints
 */
function generateFrameSequence(keyPoints, duration, style) {
  const fps = 30;
  const totalFrames = Math.ceil(duration * fps);
  const frames = [];
  
  for (let frame = 0; frame < totalFrames; frame++) {
    const time = (frame / (totalFrames - 1)) * duration;
    
    // Find the two keypoints this frame falls between
    let startKeyPoint = keyPoints[0];
    let endKeyPoint = keyPoints[keyPoints.length - 1];
    
    for (let i = 0; i < keyPoints.length - 1; i++) {
      if (time >= keyPoints[i].time && time <= keyPoints[i + 1].time) {
        startKeyPoint = keyPoints[i];
        endKeyPoint = keyPoints[i + 1];
        break;
      }
    }
    
    // Calculate interpolation factor
    const segmentDuration = endKeyPoint.time - startKeyPoint.time;
    const segmentTime = time - startKeyPoint.time;
    const t = segmentDuration > 0 ? segmentTime / segmentDuration : 0;
    
    // Interpolate position and target
    const position = interpolateVector3(startKeyPoint.position, endKeyPoint.position, t);
    const target = interpolateVector3(startKeyPoint.target, endKeyPoint.target, t);
    
    frames.push({
      frame,
      time,
      position,
      target,
      fov: 75, // Fixed for now, could be interpolated too
      up: [0, 1, 0] // Standard up vector
    });
  }
  
  return frames;
}

/**
 * Apply easing functions based on animation style
 */
function applyEasing(frames, style) {
  const easingFunction = getEasingFunction(style);
  
  return frames.map((frame, index) => {
    if (index === 0 || index === frames.length - 1) {
      return frame; // Don't modify first and last frames
    }
    
    const progress = index / (frames.length - 1);
    const easedProgress = easingFunction(progress);
    
    // Apply easing to camera movement smoothness
    // This is a simplified implementation - in practice, you'd apply easing
    // to the interpolation between keyframes
    return {
      ...frame,
      smoothness: easedProgress
    };
  });
}

/**
 * Get interpolation type based on style
 */
function getInterpolationType(style) {
  const types = {
    'smooth': 'cubic',
    'cinematic': 'bezier',
    'educational': 'linear',
    'dramatic': 'ease-in-out'
  };
  
  return types[style] || 'linear';
}

/**
 * Get easing function based on style
 */
function getEasingFunction(style) {
  const easings = {
    'smooth': (t) => t * t * (3 - 2 * t), // Smoothstep
    'cinematic': (t) => t * t * t * (t * (6 * t - 15) + 10), // Smootherstep
    'educational': (t) => t, // Linear
    'dramatic': (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // Ease-in-out
  };
  
  return easings[style] || easings['educational'];
}

/**
 * Interpolate between two 3D vectors
 */
function interpolateVector3(start, end, t) {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
    start[2] + (end[2] - start[2]) * t
  ];
}

/**
 * Calculate scene bounds from objects
 */
function calculateSceneBounds(objects) {
  if (!objects || objects.length === 0) {
    return {
      min: [-10, -10, -10],
      max: [10, 10, 10]
    };
  }
  
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
  objects.forEach(obj => {
    if (obj.position) {
      const [x, y, z] = obj.position;
      const scale = obj.scale || [1, 1, 1];
      
      minX = Math.min(minX, x - scale[0]);
      minY = Math.min(minY, y - scale[1]);
      minZ = Math.min(minZ, z - scale[2]);
      
      maxX = Math.max(maxX, x + scale[0]);
      maxY = Math.max(maxY, y + scale[1]);
      maxZ = Math.max(maxZ, z + scale[2]);
    }
  });
  
  return {
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ]
  };
}

/**
 * Create preset animation sequences
 */
function createPresetAnimation(preset, sceneData, duration = 30) {
  const presets = {
    'orbit': createOrbitAnimation(sceneData, duration),
    'fly-through': createFlyThroughAnimation(sceneData, duration),
    'zoom-in': createZoomInAnimation(sceneData, duration),
    'panoramic': createPanoramicAnimation(sceneData, duration),
    'focus-sequence': createFocusSequenceAnimation(sceneData, duration)
  };
  
  return presets[preset] || presets['orbit'];
}

/**
 * Create orbital camera animation
 */
function createOrbitAnimation(sceneData, duration) {
  const objects = sceneData.objects || [];
  const center = calculateSceneBounds(objects);
  const centerPoint = [
    (center.min[0] + center.max[0]) / 2,
    (center.min[1] + center.max[1]) / 2,
    (center.min[2] + center.max[2]) / 2
  ];
  
  const radius = Math.max(
    center.max[0] - center.min[0],
    center.max[1] - center.min[1],
    center.max[2] - center.min[2]
  ) * 1.5;
  
  const keyPoints = [];
  const steps = 8;
  
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const time = (i / steps) * duration;
    
    keyPoints.push({
      time,
      position: [
        centerPoint[0] + Math.cos(angle) * radius,
        centerPoint[1] + radius * 0.3,
        centerPoint[2] + Math.sin(angle) * radius
      ],
      target: centerPoint,
      description: `Orbital position ${i + 1}`
    });
  }
  
  return keyPoints;
}

/**
 * Create fly-through animation
 */
function createFlyThroughAnimation(sceneData, duration) {
  const objects = sceneData.objects || [];
  const bounds = calculateSceneBounds(objects);
  
  return [
    {
      time: 0,
      position: [bounds.min[0] - 10, bounds.max[1] + 5, bounds.max[2] + 10],
      target: [bounds.max[0], bounds.min[1], bounds.min[2]],
      description: 'Fly-through start'
    },
    {
      time: duration * 0.5,
      position: [0, bounds.max[1], 0],
      target: [0, 0, 0],
      description: 'Fly-through middle'
    },
    {
      time: duration,
      position: [bounds.max[0] + 10, bounds.min[1] - 5, bounds.min[2] - 10],
      target: [bounds.min[0], bounds.max[1], bounds.max[2]],
      description: 'Fly-through end'
    }
  ];
}

/**
 * Create zoom-in animation
 */
function createZoomInAnimation(sceneData, duration) {
  const objects = sceneData.objects || [];
  const mainObject = objects.find(obj => obj.importance === 'high') || objects[0];
  
  if (!mainObject) {
    return [
      { time: 0, position: [10, 10, 10], target: [0, 0, 0], description: 'Zoom start' },
      { time: duration, position: [2, 2, 2], target: [0, 0, 0], description: 'Zoom end' }
    ];
  }
  
  const targetPos = mainObject.position;
  const scale = Math.max(...(mainObject.scale || [1, 1, 1]));
  
  return [
    {
      time: 0,
      position: [targetPos[0] + scale * 10, targetPos[1] + scale * 8, targetPos[2] + scale * 10],
      target: targetPos,
      description: 'Zoom start - wide view'
    },
    {
      time: duration,
      position: [targetPos[0] + scale * 2, targetPos[1] + scale * 1.5, targetPos[2] + scale * 2],
      target: targetPos,
      description: 'Zoom end - close view'
    }
  ];
}

/**
 * Create panoramic animation
 */
function createPanoramicAnimation(sceneData, duration) {
  const objects = sceneData.objects || [];
  const bounds = calculateSceneBounds(objects);
  const center = [
    (bounds.min[0] + bounds.max[0]) / 2,
    (bounds.min[1] + bounds.max[1]) / 2,
    (bounds.min[2] + bounds.max[2]) / 2
  ];
  
  const distance = Math.max(
    bounds.max[0] - bounds.min[0],
    bounds.max[1] - bounds.min[1],
    bounds.max[2] - bounds.min[2]
  ) * 2;
  
  const height = center[1] + distance * 0.8;
  
  return [
    {
      time: 0,
      position: [center[0] - distance, height, center[2]],
      target: center,
      description: 'Panoramic start - left'
    },
    {
      time: duration * 0.5,
      position: [center[0], height, center[2] + distance],
      target: center,
      description: 'Panoramic middle - front'
    },
    {
      time: duration,
      position: [center[0] + distance, height, center[2]],
      target: center,
      description: 'Panoramic end - right'
    }
  ];
}

/**
 * Create focus sequence animation
 */
function createFocusSequenceAnimation(sceneData, duration) {
  const objects = sceneData.objects || [];
  const importantObjects = objects.filter(obj => obj.importance === 'high').slice(0, 4);
  
  if (importantObjects.length === 0) {
    return createOrbitAnimation(sceneData, duration);
  }
  
  const keyPoints = [];
  const timePerObject = duration / importantObjects.length;
  
  importantObjects.forEach((obj, index) => {
    const time = index * timePerObject;
    const scale = Math.max(...(obj.scale || [1, 1, 1]));
    
    keyPoints.push({
      time,
      position: [
        obj.position[0] + scale * 3,
        obj.position[1] + scale * 2,
        obj.position[2] + scale * 3
      ],
      target: obj.position,
      description: `Focus on ${obj.name}`
    });
  });
  
  return keyPoints;
}

module.exports = {
  createCameraAnimation,
  generateKeyframes,
  createPresetAnimation,
  calculateSceneBounds,
  interpolateVector3
};
