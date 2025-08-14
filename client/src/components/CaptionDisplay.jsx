import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CaptionDisplay = ({ currentTime, captions, isVisible }) => {
  if (!isVisible || !captions || captions.length === 0) {
    return null
  }
  
  // Find current caption based on time
  const currentCaption = captions.find(caption => 
    currentTime >= caption.start && currentTime <= caption.end
  )
  
  if (!currentCaption) {
    return null
  }
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCaption.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-black/80 text-white px-4 py-2 rounded-lg max-w-lg text-center backdrop-blur-sm"
        >
          <p className="text-sm md:text-base leading-relaxed">
            {currentCaption.text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CaptionDisplay
