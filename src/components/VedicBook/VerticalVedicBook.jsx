import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './responsive.css';

const VerticalVedicBook = ({ pages, initialPage = 0 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const contentRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Hide scroll indicator after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (showScrollIndicator && window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollIndicator]);

  return (
    <BookContainer>
      <TableOfContents>
        {pages.map((page, index) => (
          <TocItem 
            key={`toc-${index}`}
            $active={currentPage === index}
            onClick={() => {
              setCurrentPage(index);
              const element = document.getElementById(`page-${index}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {index + 1}. {page.props.title || `Chapter ${index + 1}`}
          </TocItem>
        ))}
      </TableOfContents>
      
      <BookWrapper>
        <BookInner ref={contentRef}>
          <PageCounter>
            {currentPage + 1} / {pages.length}
          </PageCounter>
          
        <VerticalScrollContainer className="vedic-scroll-container">
            {pages.map((page, index) => (
              <PageSection 
                key={`page-${index}`}
                id={`page-${index}`}
                className="vertical-book-section"
                onViewportEnter={() => setCurrentPage(index)}
                viewport={{ amount: 0.5, once: false }}
              >
                {page}
              </PageSection>
            ))}
          </VerticalScrollContainer>
          
          <ScrollIndicator $visible={showScrollIndicator}>
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
            <span>Scroll to explore</span>
          </ScrollIndicator>
        </BookInner>
      </BookWrapper>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin: 2rem 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
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

const TableOfContents = styled.div`
  width: 250px;
  padding: 2rem 1rem;
  background: linear-gradient(to right bottom, rgba(255, 107, 53, 0.05), rgba(255, 107, 53, 0.1));
  border-radius: 15px;
  margin-right: 2rem;
  align-self: flex-start;
  position: sticky;
  top: 100px;
  max-height: 70vh;
  overflow-y: auto;
  
  @media (max-width: 1100px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
    position: relative;
    top: 0;
    max-height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const TocItem = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'linear-gradient(45deg, var(--primary-color) 0%, #FF8B55 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'var(--text-dark)'};
  
  &:hover {
    background: ${props => props.$active ? 'linear-gradient(45deg, var(--primary-color) 0%, #FF8B55 100%)' : 'rgba(255, 107, 53, 0.1)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    margin-bottom: 0;
    font-size: 0.8rem;
    flex: 0 0 auto;
  }
`;

const BookWrapper = styled.div`
  flex: 1;
  perspective: 1000px;
`;

const BookInner = styled.div`
  position: relative;
  padding: 2rem 0;
`;

const VerticalScrollContainer = styled.div`
  background: linear-gradient(to right, #f9f3e9, #f5e6cd);
  border-radius: 15px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 8px 15px rgba(123, 78, 39, 0.2),
    inset 0 0 80px rgba(255, 107, 53, 0.07);
  overflow: hidden;
  position: relative;
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
  
  @keyframes slowly-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const PageSection = styled(motion.section)`
  padding: 3.5rem;
  color: #333;
  position: relative;
  background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a67c52' fill-opacity='0.03'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(to right, 
      transparent, 
      rgba(255, 107, 53, 0.2),
      rgba(255, 107, 53, 0.2),
      transparent);
  }
  
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
  
  @media (max-width: 768px) {
    padding: 2rem;
    
    &:before, &:after {
      width: 40px;
      height: 40px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    
    &:before, &:after {
      width: 30px;
      height: 30px;
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
  
  @media (max-width: 480px) {
    padding: 0.4rem 1.5rem;
    font-size: 0.8rem;
    
    &:before, &:after {
      margin: 0 4px;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${props => (props.$visible ? "1" : "0")};
  transition: opacity 0.5s ease;
  color: var(--primary-color);
  z-index: 100;
  
  span {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .chevron {
    margin-top: -8px;
    position: relative;
    width: 28px;
    height: 8px;
    opacity: 0;
    transform: scale(0.3);
    animation: move-chevron 3s ease-out infinite;
  }
  
  .chevron:first-child {
    animation-delay: 0s;
  }
  
  .chevron:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  .chevron:nth-child(3) {
    animation-delay: 1s;
  }
  
  .chevron:before,
  .chevron:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    background: var(--primary-color);
  }
  
  .chevron:before {
    left: 0;
    transform: skewY(30deg);
  }
  
  .chevron:after {
    right: 0;
    width: 50%;
    transform: skewY(-30deg);
  }
  
  @keyframes move-chevron {
    25% {
      opacity: 1;
    }
    33.3% {
      opacity: 0.7;
      transform: translateY(10px) scale(0.3);
    }
    66.6% {
      opacity: 0.7;
      transform: translateY(20px) scale(0.3);
    }
    100% {
      opacity: 0;
      transform: translateY(30px) scale(0.3);
    }
  }
  
  @media (max-width: 768px) {
    bottom: 10px;
    
    span {
      font-size: 0.7rem;
    }
    
    .chevron {
      width: 20px;
      height: 6px;
    }
  }
`;

export default VerticalVedicBook;
