import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';
import chakraImage from '../../assets/images/chakra.svg'; // You'll need to add this image
import { useAudioContext } from '../../context/AudioContext';

const LoadingPage = ({ onEnter }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toggleAudio } = useAudioContext();
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);  const handleEnter = () => {
    // Store in session that user has entered the site
    sessionStorage.setItem('hasEntered', 'true');
    
    // Set audio to play by default
    sessionStorage.setItem('audioPlaying', 'true');
    
    // Force the audio to play
    console.log("User entering site, attempting to start audio");
    try {
      toggleAudio();
    } catch (err) {
      console.error("Error toggling audio in handleEnter:", err);
    }
    
    // Call the provided onEnter function to update App state
    if (onEnter && typeof onEnter === 'function') {
      onEnter();
    }
    
    // Create a custom event to notify App component
    const event = new Event('hasEnteredChange');
    window.dispatchEvent(event);
      // Animate out before navigation
    document.querySelector('.loading-container').classList.add('fade-out');
    setTimeout(() => {
      // Navigate with state information that can be accessed in the destination route
      navigate('/home', { state: { fromLoading: true } });
    }, 1000);
  };
  
  return (
    <div className="loading-container">
      {/* Sanskrit Om symbol background decoration */}
      <div className="bg-symbols">
        {Array(6).fill().map((_, i) => (
          <div 
            key={i}
            className="om-symbol"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15 + 0.05,
              fontSize: `${Math.random() * 5 + 2}rem`
            }}
          >
            ॐ
          </div>
        ))}
      </div>
      
      <div className="chakra-container" style={{ position: 'relative' }}>
        {/* Rotating outer chakra circles - decorative */}
        <div className="chakra-ring ring-1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="chakra-ring ring-2" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="chakra-ring ring-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        
        {/* Main chakra image that rotates */}
        <motion.div 
          className="chakra-wrapper"
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 30,
              ease: "linear",
              repeat: Infinity
            }
          }}
        >
          <img src={chakraImage} alt="Vedic Chakra" className="chakra-image" />
        </motion.div>
        
        {/* Center mandala that rotates in the opposite direction */}
        <motion.div 
          className="inner-mandala"
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: -720,
            transition: { 
              duration: 60,
              ease: "linear",
              repeat: Infinity
            }
          }}
        ></motion.div>
        
        {/* Central content with the title and enter button */}
        <div className="center-content">
          <motion.h1 
            className="site-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.5, duration: 1.2 }
            }}
          >
            <span className="code-text">CODE</span>
            <span className="veda-text">VEDA</span>
          </motion.h1>
          
          <motion.div
            className="sanskrit-subtitle"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 1.2, duration: 1 }
            }}
          >
            प्राचीनज्ञानं नवीनतकनीकी
          </motion.div>
          
          <motion.button 
            className={`enter-button ${loading ? 'loading' : ''}`}
            onClick={handleEnter}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: loading ? [0.8, 1.1, 0.9, 1] : 1,
              opacity: loading ? 0 : 1,
              transition: { 
                delay: loading ? 0 : 1.8, 
                duration: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 15
              }
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <span className="enter-text">ENTER</span>
                <span className="enter-icon">॥</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
