import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAudioContext } from '../../context/AudioContext';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = () => {
  const { isPlaying, toggleAudio } = useAudioContext();
  const [animating, setAnimating] = useState(false);
  const lastClickTime = useRef(0);
  
  // On mount, check if we should be playing
  useEffect(() => {
    const audioState = sessionStorage.getItem('audioPlaying');
    const hasEntered = sessionStorage.getItem('hasEntered');
    
    console.log('AudioPlayer mounted, audio should be:', audioState, 'current state:', isPlaying);
    
    if (hasEntered === 'true' && audioState === 'true' && !isPlaying) {
      console.log('Starting audio from AudioPlayer mount');
      setTimeout(() => {
        toggleAudio();
      }, 1000);
    }
  }, []);

  // Handle button click with debounce
  const handleButtonClick = () => {
    // Prevent rapid clicks
    const now = Date.now();
    if (now - lastClickTime.current < 800) {
      console.log("Click ignored (too soon)");
      return;
    }
    
    lastClickTime.current = now;
    console.log("Audio button clicked, current state:", isPlaying);

    // Visual feedback
    setAnimating(true);
    
    // Toggle audio
    toggleAudio();
    
    // Reset animation state
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };

  return (
    <AudioPlayerContainer>
      <ButtonWrapper>
        <motion.button 
          className="toggle-btn"
          onClick={handleButtonClick}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: "2px" }} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </ButtonWrapper>
      
      <div className="track-info">
        <span className="track-name">Vedic Bamboo Flute</span>
        <span className="track-desc">Traditional Indian meditation music</span>
      </div>
    </AudioPlayerContainer>
  );
};

const ButtonWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 107, 53, 0.3);
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:after {
    opacity: 1;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
      border-color: rgba(255, 107, 53, 0.4);
    }
    70% {
      opacity: 0.2;
      border-color: rgba(255, 204, 41, 0.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1.8);
      opacity: 0;
      border-color: rgba(138, 79, 255, 0.1);
    }
  }
`;

const AudioPlayerContainer = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 107, 53, 0.25);
  border-radius: 50px;
  padding: 10px 18px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 5px 10px rgba(255, 107, 53, 0.15);
  z-index: 1000;
  color: var(--text-light);
  transition: all 0.3s ease;
  
  /* Animated background gradient */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    padding: 1px;
    background: linear-gradient(
      90deg,
      var(--primary-color),
      var(--secondary-color),
      var(--accent-color),
      var(--primary-color)
    );
    background-size: 300% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0.6;
    animation: animatedBorder 8s linear infinite;
    z-index: -1;
  }
  
  @keyframes animatedBorder {
    0% { background-position: 0 0; }
    100% { background-position: 300% 0; }
  }
  
  &:hover {
    border-color: rgba(255, 107, 53, 0);
    box-shadow: 
      0 15px 30px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(255, 107, 53, 0.2);
    transform: translateY(-2px);
    
    &:before {
      opacity: 0.8;
    }
  }
  
  .toggle-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color) 0%, #f39c12 100%);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    position: relative;
    isolation: isolate;
    outline: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    
    /* Play/pause icon glow effect */
    svg {
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    }
    
    /* Button highlight */
    &:before {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: 50%;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.25) 0%, 
        rgba(0, 0, 0, 0.05) 100%);
      z-index: -1;
      opacity: 0.5;
    }
    
    /* Button ring */
    &:after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      background: linear-gradient(135deg, 
        rgba(255, 204, 41, 0.5) 0%,
        rgba(255, 107, 53, 0.5) 50%, 
        rgba(138, 79, 255, 0.5) 100%);
      z-index: -2;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover:after {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.7;
      cursor: wait;
    }
  }
  
  .track-info {
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    position: relative;
    margin-left: 2px;
    
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: linear-gradient(to bottom,
        rgba(255, 107, 53, 0),
        rgba(255, 107, 53, 0.3),
        rgba(255, 107, 53, 0)
      );
    }
    
    .track-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 3px;
      letter-spacing: 0.02em;
      position: relative;
    }
    
    .track-desc {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 0.01em;
      font-style: italic;
    }
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 8px 15px;
    
    .toggle-btn {
      width: 38px;
      height: 38px;
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
    padding: 7px 14px;
    
    .toggle-btn {
      width: 34px;
      height: 34px;
      font-size: 12px;
    }
    
    .track-info {
      .track-name {
        font-size: 12px;
      }
      
      .track-desc {
        font-size: 10px;
      }
    }
  }
`;

export default AudioPlayer;
