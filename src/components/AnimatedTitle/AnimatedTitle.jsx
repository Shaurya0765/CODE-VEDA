import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedTitle = ({ englishText = "CODE VEDA", hindiText = "कोड वेदा", speed = 0.1, delayBetween = 1, className }) => {
  const [currentText, setCurrentText] = useState('');
  const [isEnglish, setIsEnglish] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    
    if (isTyping) {
      const textToType = isEnglish ? englishText : hindiText;
      
      if (currentText.length < textToType.length) {
        // Still typing
        timeout = setTimeout(() => {
          setCurrentText(textToType.substring(0, currentText.length + 1));
        }, speed * 1000);
      } else {
        // Finished typing, prepare to delete after delay
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween * 1000);
      }
    } else if (isDeleting) {
      if (currentText.length > 0) {
        // Still deleting
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, speed * 700); // Slightly faster deletion
      } else {
        // Finished deleting, switch language and prepare to type again
        setIsDeleting(false);
        setIsEnglish(!isEnglish);
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, 500); // Small pause before switching languages
      }
    }
    
    return () => clearTimeout(timeout);
  }, [currentText, isEnglish, isTyping, isDeleting, englishText, hindiText, speed, delayBetween]);
  
  // Character animation variants
  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <h1 className={className || "text-5xl font-bold tracking-wider"} style={{ minHeight: '4rem' }}>
      <AnimatePresence mode="wait">
        {currentText.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
      <motion.span
        className="inline-block w-[2px] h-10 bg-vedic-beige ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </h1>
  );
};



export default AnimatedTitle;
