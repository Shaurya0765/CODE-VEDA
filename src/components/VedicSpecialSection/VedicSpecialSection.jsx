import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// SVG Icon Components for each card
const LotusIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 12C32 12 25 18 25 24C25 28 28 32 32 32C36 32 39 28 39 24C39 18 32 12 32 12Z" fill="#D35695"/>
    <path d="M32 12C32 12 39 18 39 24C39 28 36 32 32 32" stroke="#C54B85" strokeWidth="1.5"/>
    <path d="M32 12C32 12 25 18 25 24C25 28 28 32 32 32" stroke="#C54B85" strokeWidth="1.5"/>
    <path d="M22 18C22 18 17 25 19 31C20 35 25 37 29 35C33 33 34 28 32 24C29 19 22 18 22 18Z" fill="#E174A9"/>
    <path d="M42 18C42 18 47 25 45 31C44 35 39 37 35 35C31 33 30 28 32 24C35 19 42 18 42 18Z" fill="#E174A9"/>
    <path d="M18 28C18 28 14 36 18 41C21 44 26 44 29 41C32 38 31 33 28 30C23 26 18 28 18 28Z" fill="#E693BE"/>
    <path d="M46 28C46 28 50 36 46 41C43 44 38 44 35 41C32 38 33 33 36 30C41 26 46 28 46 28Z" fill="#E693BE"/>
    <path d="M32 48C18 48 10 37 8 32C10 37 14 44 32 44C50 44 54 37 56 32C54 37 46 48 32 48Z" fill="#A04077"/>
    <path d="M32 44C16 44 10 37 8 32C8 28 16 18 32 18C48 18 56 28 56 32C54 37 48 44 32 44Z" fill="#D35695"/>
    <path d="M24 32C24 32 28 38 32 38C36 38 40 32 40 32" stroke="#9D366B" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="2" fill="#9D366B"/>
  </svg>
);

const ChakraTechIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="18" stroke="#1E90FF" strokeWidth="1.5" strokeDasharray="4 2"/>
    <circle cx="32" cy="32" r="12" fill="#E6F4FF"/>
    <rect x="26" y="26" width="12" height="12" fill="#47B4FF"/>
    <path d="M26 22V42M38 22V42M22 26H42M22 38H42" stroke="#0078D7" strokeWidth="1.5"/>
    <path d="M28 30H36M28 34H36" stroke="#004C87" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="2" fill="#004C87"/>
    <path d="M32 14V18M32 46V50M14 32H18M46 32H50M17 17L20 20M47 17L44 20M17 47L20 44M47 47L44 44" stroke="#47B4FF" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const KalpavrikshaIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 12V48" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 48C32 48 32 56 36 56C40 56 44 52 44 52" stroke="#5D4037" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 48C32 48 32 56 28 56C24 56 20 52 20 52" stroke="#5D4037" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 24C32 24 24 18 22 24C20 30 26 32 26 32" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 24C32 24 40 18 42 24C44 30 38 32 38 32" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 18C32 18 26 14 24 18C22 22 28 24 28 24" stroke="#66BB6A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 18C32 18 38 14 40 18C42 22 36 24 36 24" stroke="#66BB6A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 30C32 30 24 24 22 30C20 36 26 38 26 38" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 30C32 30 40 24 42 30C44 36 38 38 38 38" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 36C32 36 24 30 22 36C20 42 26 44 26 44" stroke="#A5D6A7" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 36C32 36 40 30 42 36C44 42 38 44 38 44" stroke="#A5D6A7" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="25" cy="28" r="2" fill="#BAECA8"/>
    <circle cx="29" cy="34" r="2" fill="#BAECA8"/>
    <circle cx="35" cy="40" r="2" fill="#BAECA8"/>
    <circle cx="39" cy="26" r="2" fill="#BAECA8"/>
  </svg>
);

const CommunityIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="24" r="6" fill="#5E35B1"/>
    <circle cx="38" cy="24" r="6" fill="#7E57C2"/>
    <path d="M22 36C22 33.8 23.8 32 26 32H38C40.2 32 42 33.8 42 36V42C42 44.2 40.2 46 38 46H26C23.8 46 22 44.2 22 42V36Z" fill="#673AB7"/>
    <path d="M26 24C26 24 22 26 22 30" stroke="#4527A0" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M38 24C38 24 42 26 42 30" stroke="#4527A0" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 38L30 40L32 42L34 40L32 38Z" fill="#B39DDB"/>
    <path d="M26 36H38M26 42H38" stroke="#4527A0" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Keyframe animations
const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(230, 190, 130, 0.5));
    opacity: 0.7;
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(230, 190, 130, 0.8));
    opacity: 1;
  }
`;

// Firefly component
const Firefly = ({ delay, duration, top, left }) => (
  <FireflyDot 
    style={{
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  />
);

// Styled Components
const SectionContainer = styled.section`
  position: relative;
  background: linear-gradient(to right, #f3e9d2, #f5eed5, #f3e9d2);
  padding: 5rem 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
`;

const SectionInner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
`;

const Title = styled.h2`
  font-family: 'Mukta', serif;
  text-align: center;
  font-size: 2.5rem;
  color: #5D4037;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(212, 175, 55, 0),
      rgba(212, 175, 55, 0.8) 50%,
      rgba(212, 175, 55, 0)
    );
  }
`;

// Modified styled components to achieve the ancient manuscript look
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled(motion.div)`
  position: relative;
  background: linear-gradient(135deg, #f2e8c9 0%, #e8dbb5 100%);
  border-radius: 0px; // Make it rectangular like a manuscript
  padding: 2rem 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 20px rgba(93, 64, 55, 0.15);
  transition: all 0.3s ease;
  border: none;
  
  // Create torn, weathered parchment effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0C10 2 25 20 50 20C75 20 90 2 100 0V100H0V0Z' fill='%23d4af37' fill-opacity='0.03'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
    opacity: 1;
    z-index: 1;
    pointer-events: none;
    border-radius: 0px;
  }
  
  // Add paper texture and Sanskrit-style border
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid rgba(212, 175, 55, 0.3);
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0 10a5 5 0 1 1 0-10 5 5 0 0 1 0 10z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
    box-shadow: inset 0 0 15px rgba(165, 132, 66, 0.15);
  }
  
  // Create irregular, torn edges
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L${100 - Math.random() * 5},${Math.random() * 3} L100,100 L${Math.random() * 5},100 L0,${100 - Math.random() * 5} Z' fill='black'/%3E%3C/svg%3E");
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(93, 64, 55, 0.2);
  }
`;

const IconContainer = styled.div`
  background: radial-gradient(circle, rgba(253, 249, 238, 0.9) 0%, rgba(244, 232, 203, 0.8) 100%);
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(93, 64, 55, 0.15);
  position: relative;
  z-index: 2;
  
  // Add Sanskrit-inspired circular border
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), transparent 70%);
    z-index: -1;
    opacity: 0.7;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px dashed rgba(212, 175, 55, 0.5);
    z-index: -1;
  }
  
  svg {
    filter: drop-shadow(0 3px 5px rgba(93, 64, 55, 0.2));
    z-index: 3;
  }
`;

const CardTitle = styled.h3`
  font-family: 'Mukta', serif;
  font-size: 1.4rem;
  color: #5D4037;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  letter-spacing: 0.5px;
  
  // Add decorative Sanskrit-inspired underline
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 2 Q 10 0, 20 2 T 40 2 T 60 2 T 80 2 T 100 2' stroke='%23d4af37' fill='none' stroke-width='1'/%3E%3C/svg%3E");
    background-repeat: repeat-x;
    background-size: 20px 3px;
  }
`;

const CardDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #6D4C41;
  line-height: 1.6;
  z-index: 2;
  position: relative;
  
  // Add ancient script effect with slightly faded text
  background: linear-gradient(to right, #5D4037, #6D4C41, #5D4037);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);
`;

// Add Sanskrit decorative corner elements to each card
const SanskritCorner = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 3;
  opacity: 0.6;
  background-size: contain;
  background-repeat: no-repeat;
  
  &.top-left {
    top: 5px;
    left: 5px;
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L 20 0 C 15 5, 10 15, 0 20 Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3Cpath d='M5 5 L 15 5 C 12 8, 8 12, 5 15 Z' stroke='%23d4af37' stroke-opacity='0.4' fill='none'/%3E%3C/svg%3E");
  }
  
  &.top-right {
    top: 5px;
    right: 5px;
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L 10 0 C 15 5, 20 15, 30 20 Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3Cpath d='M25 5 L 15 5 C 18 8, 22 12, 25 15 Z' stroke='%23d4af37' stroke-opacity='0.4' fill='none'/%3E%3C/svg%3E");
  }
  
  &.bottom-left {
    bottom: 5px;
    left: 5px;
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L 20 30 C 15 25, 10 15, 0 10 Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3Cpath d='M5 25 L 15 25 C 12 22, 8 18, 5 15 Z' stroke='%23d4af37' stroke-opacity='0.4' fill='none'/%3E%3C/svg%3E");
  }
  
  &.bottom-right {
    bottom: 5px;
    right: 5px;
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L 10 30 C 15 25, 20 15, 30 10 Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3Cpath d='M25 25 L 15 25 C 18 22, 22 18, 25 15 Z' stroke='%23d4af37' stroke-opacity='0.4' fill='none'/%3E%3C/svg%3E");
  }
`;

// Sanskrit script decoration along the top of the cards
const SanskritScript = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Noto Sans', sans-serif;
  font-size: 8px;
  color: rgba(165, 132, 66, 0.5);
  letter-spacing: 2px;
  z-index: 3;
  white-space: nowrap;
  overflow: hidden;
  width: 80%;
  text-align: center;
`;

// Firefly dot styling
const FireflyDot = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(230, 190, 130, 0.7);
  border-radius: 50%;
  filter: blur(1px);
  animation: ${glow} 3s infinite ease-in-out, ${float} 5s infinite ease-in-out;
`;

// Border decoration
const BorderDecor = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  pointer-events: none;
  
  .corner {
    position: absolute;
    width: 40px;
    height: 40px;
    
    &.top-left {
      top: 0;
      left: 0;
      border-top: 2px solid rgba(212, 175, 55, 0.3);
      border-left: 2px solid rgba(212, 175, 55, 0.3);
    }
    
    &.top-right {
      top: 0;
      right: 0;
      border-top: 2px solid rgba(212, 175, 55, 0.3);
      border-right: 2px solid rgba(212, 175, 55, 0.3);
    }
    
    &.bottom-left {
      bottom: 0;
      left: 0;
      border-bottom: 2px solid rgba(212, 175, 55, 0.3);
      border-left: 2px solid rgba(212, 175, 55, 0.3);
    }
    
    &.bottom-right {
      bottom: 0;
      right: 0;
      border-bottom: 2px solid rgba(212, 175, 55, 0.3);
      border-right: 2px solid rgba(212, 175, 55, 0.3);
    }
  }
`;

// Add water stains to make it look aged
const WaterStain = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(165, 132, 66, 0.1) 0%, rgba(165, 132, 66, 0.05) 50%, transparent 70%);
  z-index: 1;
  opacity: 0.4;
`;

const VedicSpecialSection = () => {
  // Generate random positions for fireflies
  const fireflies = [];
  for (let i = 0; i < 15; i++) {
    fireflies.push({
      id: i,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3,
      top: Math.random() * 100,
      left: Math.random() * 100
    });
  }
  
  // Sanskrit script snippets for each card (for decorative purposes only)
  const sanskritScripts = [
    "ॐ विद्या ज्ञानं च धर्म:",
    "तकनिकी विज्ञानस्य आधुनिक:",
    "प्रकृति संरक्षण कल्याण:",
    "सामाजिक सद्भावना एकता:"
  ];
  
  const features = [
    {
      icon: <LotusIcon />,
      title: "Ancient Wisdom",
      description: "Integrate timeless Vedic principles into modern technological solutions."
    },
    {
      icon: <ChakraTechIcon />,
      title: "Cutting-Edge Tech",
      description: "Work with the latest tools and frameworks to build innovative applications."
    },
    {
      icon: <KalpavrikshaIcon />,
      title: "Sustainable Focus",
      description: "Create technology that's not just efficient, but also ethical and sustainable."
    },
    {
      icon: <CommunityIcon />,
      title: "Community",
      description: "Join a community of like-minded innovators passionate about meaningful tech."
    }
  ];

  return (
    <SectionContainer>
      {/* Fireflies */}
      {fireflies.map(fly => (
        <Firefly 
          key={fly.id} 
          delay={fly.delay}
          duration={fly.duration}
          top={fly.top}
          left={fly.left}
        />
      ))}
      
      {/* Decorative border */}
      <BorderDecor>
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </BorderDecor>
      
      <SectionInner>
        <Title>What Makes CodeVeda Special</Title>
        <CardGrid>
          {features.map((feature, index) => (
            <Card 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              {/* Sanskrit decorative corners */}
              <SanskritCorner className="top-left" />
              <SanskritCorner className="top-right" />
              <SanskritCorner className="bottom-left" />
              <SanskritCorner className="bottom-right" />
              
              {/* Sanskrit script at the top */}
              <SanskritScript>{sanskritScripts[index]}</SanskritScript>
              
              {/* Water stains for aged effect - randomly positioned */}
              <WaterStain 
                style={{ 
                  width: `${Math.random() * 40 + 60}px`, 
                  height: `${Math.random() * 40 + 60}px`,
                  top: `${Math.random() * 70}%`,
                  left: `${Math.random() * 70}%`
                }} 
              />
              <WaterStain 
                style={{ 
                  width: `${Math.random() * 30 + 40}px`, 
                  height: `${Math.random() * 30 + 40}px`,
                  top: `${Math.random() * 80}%`,
                  right: `${Math.random() * 40}%`
                }} 
              />
              
              <IconContainer>
                {feature.icon}
              </IconContainer>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </CardGrid>
      </SectionInner>
    </SectionContainer>
  );
};

export default VedicSpecialSection;