import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import fluteAudio from '../assets/audio/flute-bg.mp3';

// Available audio track
const AUDIO_FILE = fluteAudio;

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef(null);
  
  // Toggle play/pause function - moved to the top to avoid initialization error
  const toggleAudio = () => {
    console.log("Toggle audio called, current state:", isPlaying, "initialized:", isInitialized);
    
    // Make sure we have an audio element
    if (!audioRef.current) {
      console.log("Creating audio element on-demand");
      audioRef.current = new Audio(AUDIO_FILE);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.preload = 'auto';
      setIsInitialized(true);
    }
    
    // Make sure we're initialized
    if (!isInitialized) {
      console.log("Forcing audio initialization");
      setIsInitialized(true);
    }
    
    try {
      // Check the actual playing state of the audio element
      const actuallyPlaying = !audioRef.current.paused;
      console.log("Actual audio element playing state:", actuallyPlaying);
      
      if (actuallyPlaying) {
        // Pause the audio
        audioRef.current.pause();
        setIsPlaying(false);
        console.log("Audio paused successfully");
        sessionStorage.setItem('audioPlaying', 'false');
      } else {
        // Play the audio
        console.log("Attempting to play audio...");
        audioRef.current.volume = 0.4;
        
        // If audio has ended, reset to beginning
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }
        
        // Play with promise to handle browser restrictions
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio playing successfully");
              setIsPlaying(true);
              sessionStorage.setItem('audioPlaying', 'true');
              
              // Handle audio ending
              const handleEnded = () => {
                setIsPlaying(false);
                sessionStorage.setItem('audioPlaying', 'false');
                audioRef.current.removeEventListener('ended', handleEnded);
              };
              
              audioRef.current.addEventListener('ended', handleEnded);
            })
            .catch(error => {
              console.error("Audio play failed:", error);
              setIsPlaying(false);
              sessionStorage.setItem('audioPlaying', 'false');
              
              // iOS specific workaround
              if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                audioRef.current.load();
              }
            });
        }
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
      setIsPlaying(false);
      sessionStorage.setItem('audioPlaying', 'false');
    }
  };

  // Set up audio element once on component mount
  useEffect(() => {
    console.log("Setting up audio element");
    // Create audio element
    audioRef.current = new Audio(AUDIO_FILE);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current.preload = 'auto';
    audioRef.current.autoplay = false;
    
    // Preload audio
    fetch(AUDIO_FILE)
      .then(response => {
        console.log("Audio file preloaded");
        setIsInitialized(true);
        
        // Check if we should auto-play
        const hasEntered = sessionStorage.getItem('hasEntered');
        const audioPlaying = sessionStorage.getItem('audioPlaying');
        
        if (hasEntered === 'true' && audioPlaying === 'true') {
          console.log("Should auto-play on mount");
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  console.log("Auto-play successful");
                })
                .catch(e => console.error("Auto-play failed:", e));
            }
          }, 1000);
        }
      })
      .catch(err => {
        console.error("Failed to preload audio:", err);
        setIsInitialized(true);
      });
    
    // Error handling
    const handleError = (e) => console.error("Audio error:", e);
    audioRef.current.addEventListener('error', handleError);
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Handle user interaction for audio unlocking
  useEffect(() => {
    let audioUnlocked = false;
    
    const handleUserInteraction = () => {
      if (!isInitialized || audioUnlocked) return;
      
      console.log("User interaction detected, unlocking audio");
      
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .then(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            console.log("Audio unlocked successfully");
            audioUnlocked = true;
            
            const previousState = sessionStorage.getItem('audioPlaying');
            if (previousState === 'true') {
              console.log("Restoring audio state to playing");
              toggleAudio();
            }
            
            cleanup();
          })
          .catch(error => {
            console.error("Failed to unlock audio:", error);
            
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
              audioRef.current.load();
            }
          });
      }
    };
    
    // Add interaction listeners
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    const cleanup = () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    return cleanup;
  }, [isInitialized, toggleAudio]);
  
  // Handle page visibility and saved audio state
  useEffect(() => {
    const savedState = sessionStorage.getItem('audioPlaying');
    const hasEntered = sessionStorage.getItem('hasEntered');
    
    console.log("Audio state check - saved:", savedState, "playing:", isPlaying, "entered:", hasEntered);
    
    // Try to restore audio if needed
    if (savedState === 'true' && !isPlaying && isInitialized && audioRef.current) {
      console.log("Attempting to restore audio");
      
      const restoreAudio = () => {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio restored successfully");
          })
          .catch(err => {
            console.error("Failed to restore audio:", err);
          });
      };
      
      restoreAudio();
      setTimeout(restoreAudio, 1000); // Retry after a delay
    }
    
    // Handle visibility changes
    const handleVisibility = () => {
      if (document.hidden) {
        sessionStorage.setItem('audioPlaying', isPlaying);
      } else if (isPlaying && audioRef.current) {
        audioRef.current.play()
          .catch(err => console.log("Failed to resume on visibility change:", err));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isPlaying, isInitialized]);
  
  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
