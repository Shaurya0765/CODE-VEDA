import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './responsive.css';

const VedicBook = ({ pages, initialPage = 0 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToNextPage = () => {
    if (currentPage < pages.length - 1 && !isAnimating) {
      setDirection(1);
      setIsAnimating(true);
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setDirection(-1);
      setIsAnimating(true);
      setCurrentPage(prev => prev - 1);
    }
  };
    // Animation variants for page transitions
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? -25 : 25,
      scale: 0.9,
      filter: 'blur(3px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Custom bezier curve for smooth feel
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? -25 : 25,
      scale: 0.9,
      filter: 'blur(3px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Custom bezier curve for smooth feel
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 }
      }
    })
  };

  return (
    <BookContainer>
      <BookWrapper>
        <BookInner>
          <PageCounter>
            {currentPage + 1} / {pages.length}
          </PageCounter>
          
          <PageWrapper>
            <AnimatePresence 
              initial={false} 
              custom={direction}
              onExitComplete={() => setIsAnimating(false)}
            >
              <PageContent
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="page"
              >
                {pages[currentPage]}
              </PageContent>
            </AnimatePresence>
          </PageWrapper>
            <BookControls>
            <Button 
              onClick={goToPrevPage} 
              disabled={currentPage === 0 || isAnimating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>← Previous</span>
            </Button>
            <Button 
              onClick={goToNextPage} 
              disabled={currentPage === pages.length - 1 || isAnimating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Next →</span>
            </Button>
          </BookControls>
        </BookInner>
      </BookWrapper>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
  padding: 2rem 0;
  
  /* Decorative background elements */
  &:before, &:after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background-image: var(--vedic-pattern-bg);
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.03;
    z-index: -1;
    pointer-events: none;
  }
  
  &:before {
    top: -100px;
    left: -150px;
    transform: rotate(-15deg);
  }
  
  &:after {
    bottom: -100px;
    right: -150px;
    transform: rotate(15deg);
  }
`;

const BookWrapper = styled.div`
  width: 100%;
  max-width: 850px;
  perspective: 2000px;
`;

const BookInner = styled.div`
  position: relative;
  padding: 2rem 0;
`;

const PageWrapper = styled.div`
  background: linear-gradient(to right, #f9f3e9, #f5e6cd);
  border-radius: 15px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 8px 15px rgba(123, 78, 39, 0.2),
    inset 0 0 80px rgba(255, 107, 53, 0.07);
  overflow: hidden;
  position: relative;
  min-height: 550px;
  transform-style: preserve-3d;
  perspective: 2000px;
  border: 1px solid rgba(255, 107, 53, 0.1);
  
  /* Main mandala background */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--vedic-pattern-bg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.05;
    pointer-events: none;
    animation: slowly-rotate 120s linear infinite;
  }
  
  /* Decorative spine */
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      transparent, 
      rgba(255, 107, 53, 0.15) 20%, 
      rgba(255, 107, 53, 0.15) 80%, 
      transparent);
    pointer-events: none;
  }
  
  /* Additional decorative corner mandalas */
  &:before, &:after {
    content: '';
    position: absolute;
  }
  
  &:after {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      transparent, 
      rgba(255, 107, 53, 0.15) 20%, 
      rgba(255, 107, 53, 0.15) 80%, 
      transparent);
    pointer-events: none;
  }
  
  /* Corner decorations */
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: var(--vedic-pattern-bg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.05;
    pointer-events: none;
    animation: slowly-rotate 120s linear infinite;
  }
  
  @keyframes slowly-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PageContent = styled(motion.div)`
  padding: 3.5rem;
  color: #333;
  height: 100%;
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a67c52' fill-opacity='0.03'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  
  /* Gold decorative corners */
  &:before, &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    opacity: 0.4;
  }
  
  &:before {
    top: 15px;
    left: 15px;
    border-top: 3px solid #d4af37;
    border-left: 3px solid #d4af37;
    border-radius: 15px 0 0 0;
  }
  
  &:after {
    bottom: 15px;
    right: 15px;
    border-bottom: 3px solid #d4af37;
    border-right: 3px solid #d4af37;
    border-radius: 0 0 15px 0;
  }
    h1 {
    font-family: var(--font-display);
    font-size: 2.7rem;
    margin-bottom: 2rem;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(255, 107, 53, 0.2);
    background: linear-gradient(45deg, var(--primary-color) 30%, var(--accent-color) 70%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 107, 53, 0.1);
  }
  
  h2 {
    font-family: var(--font-display);
    font-size: 2.2rem;
    margin: 1.5rem 0 1.2rem;
    color: var(--primary-color);
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: "॥";
      position: absolute;
      left: 0;
      color: var(--accent-color);
      font-family: var(--font-sanskrit);
      font-size: 1.8rem;
    }
  }
  
  p {
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 1.2rem;
    text-align: justify;
    color: #4a3520;
    letter-spacing: 0.01rem;
  }
    .vedic-quote {
    font-style: italic;
    text-align: center;
    margin: 2.5rem auto;
    width: 90%;
    font-size: 1.3rem;
    color: var(--primary-color);
    line-height: 1.8;
    background-color: rgba(255, 204, 41, 0.1);
    padding: 1.5rem;
    border-radius: 5px;
    position: relative;
    border: 1px solid rgba(255, 204, 41, 0.15);
    
    &:before, &:after {
      content: '"';
      font-family: serif;
      font-size: 4rem;
      color: rgba(255, 107, 53, 0.2);
      position: absolute;
      line-height: 0;
    }
    
    &:before {
      top: 1rem;
      left: 0.5rem;
    }
    
    &:after {
      bottom: -0.5rem;
      right: 0.5rem;
      transform: rotate(180deg);
    }
  }
  
  .sanskrit {
    font-family: var(--font-sanskrit);
    text-align: center;
    font-size: 1.8rem;
    margin: 2rem 0;
    color: var(--accent-color);
    line-height: 1.6;
    text-shadow: 0 1px 1px rgba(255, 107, 53, 0.2);
  }
    ul, ol {
    margin-left: 0;
    padding-left: 0;
    list-style-type: none;
    margin-bottom: 2rem;
    
    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
      position: relative;
      padding-left: 2rem;
      font-size: 1.1rem;
      color: var(--text-dark);
      
      &:before {
        content: "•";
        position: absolute;
        left: 0.5rem;
        color: var(--primary-color);
        font-size: 1.5rem;
        line-height: 1;
      }
    }
  }
`;

const BookControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding: 0 1rem;
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary-color) 0%, #FF8B55 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  font-family: var(--font-display);
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%);
    opacity: 0;
    transition: opacity 0.3s;
    transform: scale(0.5);
    z-index: 0;
  }
  
  &:hover:before {
    opacity: 1;
    animation: ripple 1.5s ease-out forwards;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
  
  &:disabled {
    background: linear-gradient(45deg, #b0b0b0, #d0d0d0);
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
    
    &:hover:before {
      opacity: 0;
      animation: none;
    }
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0.5);
      opacity: 0.3;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const PageCounter = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, var(--primary-color) 0%, #FF8B55 100%);
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 0 0 15px 15px;
  font-size: 0.95rem;
  font-family: var(--font-display);
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  letter-spacing: 1px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: none;
  
  &:before, &:after {
    content: '॥';
    margin: 0 8px;
    opacity: 0.8;
    font-family: var(--font-sanskrit);
  }
`;

export default VedicBook;
