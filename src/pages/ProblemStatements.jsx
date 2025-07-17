import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCode, FaHeart, FaVrCardboard, FaMobile, FaLeaf, FaNetworkWired, FaLightbulb, FaChevronLeft, FaChevronRight, FaSearch, FaFilePdf, FaDownload } from 'react-icons/fa';
import { GiScrollQuill } from 'react-icons/gi';

const ProblemStatements = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const problemTracks = [
    {
      id: 'digital-dharma',
      title: 'Code for Karma',
      subtitle: 'For a Healthier, More Humane Digital World',
      icon: <FaHeart />,
      color: '#D4AF37',
      description: `In a world increasingly shaped by algorithms and attention-driven design, technology is evolving faster than our ability to consciously adapt to it. Social media, recommendation engines, and digital platforms often prioritize engagement over well-being, leading to rising concerns about digital addiction, declining mental health, and loss of agency.`,
      challenge: `We challenge you to build solutions that promote digital well-being, ethical tech practices, and mindful tech use. Can you create systems that make users more aware of their online behavior, encourage healthier screen time habits, promote transparency in AI and algorithms, and hold digital products accountable for the impact they have?`,
      keywords: ['Digital Well-being', 'Ethical Tech', 'Mental Health', 'Algorithm Transparency', 'Mindful Technology']
    },
    {
      id: 'healthcare',
      title: 'Healthcare',
      subtitle: 'Making Quality Healthcare Accessible for All',
      icon: <FaHeart />,
      color: '#E74C3C',
      description: `Millions of people across the globe still lack access to timely, affordable, and quality healthcare. From poor infrastructure and lack of specialists in rural areas to data fragmentation and misdiagnosis in urban centers, the challenges in healthcare are vast and varied.`,
      challenge: `How can we use technology to bridge this gap? Can you design systems that enable remote diagnosis, real-time patient monitoring, or community health awareness? Can tech become a frontline responder in underserved areas and a smart assistant in advanced ones?`,
      keywords: ['Remote Diagnosis', 'Patient Monitoring', 'Healthcare Access', 'Medical AI', 'Telemedicine']
    },
    {
      id: 'ar-vr',
      title: 'AR/VR Technology',
      subtitle: 'Designing Immersive Experiences with Purpose',
      icon: <FaVrCardboard />,
      color: '#9B59B6',
      description: `While AR and VR technologies offer immersive storytelling and real-time simulations, their real-world applications are still underexplored. What if AR/VR could help doctors train better, students learn deeper, or workers operate with more precision?`,
      challenge: `We invite you to imagine immersive technologies not just as entertainment tools but as engines for education, inclusion, training, and social good. How can AR/VR reshape the way we learn, heal, connect, and solve real-life problems?`,
      keywords: ['Immersive Learning', 'VR Training', 'AR Education', 'Virtual Therapy', 'Mixed Reality']
    },
    {
      id: 'app-development',
      title: 'App Development',
      subtitle: 'Building the Apps That Shape the Future',
      icon: <FaMobile />,
      color: '#3498DB',
      description: `Applications are the heart of our digital lives—but not all apps are built equally. The world doesn't need more clones or empty tools. It needs applications that solve real problems, empower underserved communities, and enhance everyday life in meaningful ways.`,
      challenge: `Can you create an app that brings utility, joy, or equity? Whether it's for productivity, education, finance, accessibility, or local community engagement—your challenge is to design a solution that is intuitive, impactful, and responsible.`,
      keywords: ['Mobile Solutions', 'User Experience', 'Accessibility', 'Community Apps', 'Productivity Tools']
    },
    {
      id: 'sustainability',
      title: 'Sustainable Development',
      subtitle: 'Innovating for a Greener, Fairer Planet',
      icon: <FaLeaf />,
      color: '#27AE60',
      description: `As climate change accelerates and natural resources dwindle, sustainability is no longer optional—it's urgent. From energy consumption and waste management to food systems and urban design, the world faces the challenge of aligning growth with ecological balance.`,
      challenge: `Build for a sustainable future. Can your solution reduce carbon footprints, encourage circular economies, improve conservation, or make eco-friendly habits more accessible to the average person? The planet needs problem-solvers. Be one.`,
      keywords: ['Climate Tech', 'Circular Economy', 'Green Technology', 'Environmental Monitoring', 'Sustainable Living']
    },
    {
      id: 'iot',
      title: 'Internet of Things (IoT)',
      subtitle: 'Connecting Devices to Empower People',
      icon: <FaNetworkWired />,
      color: '#F39C12',
      description: `From smart homes to connected cities, IoT is revolutionizing how we interact with our environments. But there's still a long way to go in making these systems interoperable, secure, and genuinely helpful. Many IoT solutions fail to address privacy, accessibility, or contextual intelligence.`,
      challenge: `How can we create IoT systems that solve real problems—not just gimmicks? Whether it's in agriculture, health, mobility, or energy—can your solution help us sense better, act smarter, and live easier?`,
      keywords: ['Smart Cities', 'Connected Devices', 'Sensor Networks', 'IoT Security', 'Edge Computing']
    }
  ];

  const filteredTracks = problemTracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Reset active track when search changes
  useEffect(() => {
    if (searchTerm && filteredTracks.length > 0) {
      setActiveTrack(0);
    }
  }, [searchTerm, filteredTracks.length]);

  const nextTrack = () => {
    setActiveTrack((prev) => (prev + 1) % filteredTracks.length);
  };

  const prevTrack = () => {
    setActiveTrack((prev) => (prev - 1 + filteredTracks.length) % filteredTracks.length);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Guidelines For PPT Submission (1).pdf';
    link.download = 'Guidelines_For_PPT_Submission.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProblemStatementsContainer>
      {/* Background decorative elements */}
      <div className="bg-decorations">
        {Array(12).fill().map((_, i) => (
          <motion.div
            key={i}
            className="floating-symbol"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 20}px`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ॐ
          </motion.div>
        ))}
      </div>

      {/* Header Section */}
      <motion.div 
        className="header-section"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>॥ समस्या विवरणानि ॥</h1>
        <p className="subtitle">Problem Statements</p>
        <div className="header-decoration">
          <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 Q30,0 50,10 T90,10" stroke="#D4AF37" strokeWidth="2" fill="none"/>
            <circle cx="10" cy="10" r="3" fill="#D4AF37"/>
            <circle cx="90" cy="10" r="3" fill="#D4AF37"/>
          </svg>
        </div>
        <p className="description">
          Choose your path to innovation. Each track represents a unique opportunity to create meaningful impact through technology.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="search-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search problem tracks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      {/* Track Navigation */}
      <motion.div 
        className="track-navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {filteredTracks.map((track, index) => (
          <motion.button
            key={track.id}
            className={`track-tab ${activeTrack === index ? 'active' : ''}`}
            onClick={() => setActiveTrack(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderColor: track.color }}
          >
            <span className="track-icon" style={{ color: track.color }}>
              {track.icon}
            </span>
            <span className="track-name">{track.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Main Content Area */}
      <div className="content-area">
        <AnimatePresence mode="wait">
          {filteredTracks.length > 0 ? (
            <motion.div
              key={activeTrack}
              className="track-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="track-counter">
                Track {activeTrack + 1} of {filteredTracks.length}
              </div>
              
              <div className="track-header" style={{ borderColor: filteredTracks[activeTrack].color }}>
                <div className="track-icon-large" style={{ color: filteredTracks[activeTrack].color }}>
                  {filteredTracks[activeTrack].icon}
                </div>
                <div className="track-title-section">
                  <h2>{filteredTracks[activeTrack].title}</h2>
                  <h3>{filteredTracks[activeTrack].subtitle}</h3>
                </div>
              </div>

              <div className="track-body">
                <div className="problem-section">
                  <h4>Problem Statement:</h4>
                  <p>{filteredTracks[activeTrack].description}</p>
                </div>

                <div className="challenge-section">
                  <h4>The Challenge:</h4>
                  <p>{filteredTracks[activeTrack].challenge}</p>
                </div>

                <div className="keywords-section">
                  <h4>Key Focus Areas:</h4>
                  <div className="keywords-grid">
                    {filteredTracks[activeTrack].keywords.map((keyword, index) => (
                      <motion.span
                        key={index}
                        className="keyword-tag"
                        style={{ borderColor: filteredTracks[activeTrack].color }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="no-results-content">
                <GiScrollQuill className="no-results-icon" />
                <h3>No Problem Tracks Found</h3>
                <p>Try adjusting your search term or browse all available tracks.</p>
                <button
                  className="clear-search-button"
                  onClick={() => setSearchTerm('')}
                >
                  Show All Tracks
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        {filteredTracks.length > 1 && (
          <div className="navigation-arrows">
            <motion.button
              className="nav-arrow prev"
              onClick={prevTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              className="nav-arrow next"
              onClick={nextTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        )}
      </div>

      {/* PPT Guidelines Section */}
      <motion.div 
        className="guidelines-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="guidelines-card">
          <div className="guidelines-header">
            <div className="guidelines-icon">
              <FaFilePdf />
            </div>
            <div className="guidelines-title">
              <h3>Guidelines for PPT Submission</h3>
              <p>Essential information for your presentation</p>
            </div>
          </div>
          
          <div className="guidelines-content">
            <p>
              Download the comprehensive guidelines for PPT submission including format requirements, 
              content structure, evaluation criteria, and submission deadlines. This document contains 
              all the essential information you need to prepare your presentation effectively.
            </p>
            <p>
              We’re not just looking at your PPT – your <span className='font-semibold'> GitHub </span> contributions and <span className='font-semibold' > LinkedIn </span> profile will also play a vital role in our judging process. So, polish them up and let your work speak for itself!
            </p>
          </div>
          
          <motion.button 
            className="download-button"
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaDownload />
            Download PDF Guidelines
          </motion.button>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3>Ready to Take on the Challenge?</h3>
        <p>No matter what path you choose—whether you're hacking for impact, ethics, creativity, or fun—this is your playground. Think freely. Build courageously. Your idea could be the one that sparks real change.</p>
        <motion.a
          href="https://vision.hack2skill.com/event/codeveda"
          target="_blank"
          rel="noopener noreferrer"
          className="register-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now
        </motion.a>
      </motion.div>
    </ProblemStatementsContainer>
  );
};

const ProblemStatementsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f0e6 0%, #f8f5e8 100%);
  padding: 6rem 2rem 4rem;
  position: relative;
  font-family: 'Noto Sans', 'Arial', sans-serif;
  color: #4a3520;

  /* Background decorations */
  .bg-decorations {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    .floating-symbol {
      position: absolute;
      font-family: 'RaviPrakash-Regular', serif;
      color: #D4AF37;
      pointer-events: none;
    }
  }

  /* All content should be above decorations */
  > * {
    position: relative;
    z-index: 2;
  }

  /* Header Section */
  .header-section {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-family: 'RaviPrakash-Regular', serif;
      font-size: 3.5rem;
      margin-bottom: 0.5rem;
      color: #4a3520;
      text-shadow: 2px 2px 4px rgba(74, 53, 32, 0.1);
    }

    .subtitle {
      font-size: 1.8rem;
      color: #6c5b40;
      margin-bottom: 1.5rem;
      font-weight: 300;
    }

    .header-decoration {
      margin: 2rem auto;
      width: 200px;

      svg {
        width: 100%;
        height: 20px;
      }
    }

    .description {
      max-width: 600px;
      margin: 0 auto;
      font-size: 1.1rem;
      line-height: 1.6;
      color: #6c5b40;
    }
  }

  /* Search Section */
  .search-section {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;

    .search-container {
      position: relative;
      max-width: 400px;
      width: 100%;

      .search-icon {
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #8a7b66;
        font-size: 1rem;
        z-index: 1;
      }

      .search-input {
        width: 100%;
        padding: 1rem 1.5rem;
        padding-left: 3.5rem;
        padding-right: 3rem;
        border: 2px solid rgba(74, 53, 32, 0.2);
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.8);
        font-size: 1rem;
        color: #4a3520;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;

        &:focus {
          outline: none;
          border-color: #D4AF37;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.2);
        }

        &::placeholder {
          color: #8a7b66;
          font-style: italic;
        }
      }

      .clear-search {
        position: absolute;
        right: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6c5b40;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.2rem;
        transition: all 0.2s ease;

        &:hover {
          color: #4a3520;
          transform: translateY(-50%) scale(1.2);
        }
      }
    }
  }

  /* Track Navigation */
  .track-navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 0 1rem;

    .track-tab {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.5rem;
      background: rgba(255, 255, 255, 0.7);
      border: 2px solid transparent;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
      color: #4a3520;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

      .track-icon {
        font-size: 1.1rem;
      }

      .track-name {
        white-space: nowrap;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 0.9);
      }

      &.active {
        background: rgba(255, 255, 255, 0.95);
        border-color: currentColor;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }

  /* Content Area */
  .content-area {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;

    .track-content {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);

      .track-counter {
        text-align: center;
        color: #6c5b40;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        padding: 0.5rem 1rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 15px;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
      }

      .track-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
        border-bottom: 3px solid;

        .track-icon-large {
          font-size: 4rem;
          flex-shrink: 0;
        }

        .track-title-section {
          h2 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #4a3520;
            font-weight: 700;
          }

          h3 {
            font-size: 1.3rem;
            color: #6c5b40;
            font-weight: 400;
            font-style: italic;
          }
        }
      }

      .track-body {
        .problem-section, .challenge-section {
          margin-bottom: 2.5rem;

          h4 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            color: #4a3520;
            font-weight: 600;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              bottom: -0.3rem;
              left: 0;
              width: 50px;
              height: 3px;
              background: #D4AF37;
              border-radius: 2px;
            }
          }

          p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #5d4e3a;
          }
        }

        .keywords-section {
          h4 {
            font-size: 1.4rem;
            margin-bottom: 1.5rem;
            color: #4a3520;
            font-weight: 600;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              bottom: -0.3rem;
              left: 0;
              width: 50px;
              height: 3px;
              background: #D4AF37;
              border-radius: 2px;
            }
          }

          .keywords-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;

            .keyword-tag {
              padding: 0.6rem 1.2rem;
              background: rgba(255, 255, 255, 0.8);
              border: 2px solid;
              border-radius: 20px;
              font-size: 0.9rem;
              font-weight: 500;
              color: #4a3520;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }

    /* No Results Section */
    .no-results {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;

      .no-results-content {
        text-align: center;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        padding: 3rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
        max-width: 500px;

        .no-results-icon {
          font-size: 4rem;
          color: #D4AF37;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.8rem;
          color: #4a3520;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        p {
          font-size: 1.1rem;
          color: #6c5b40;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .clear-search-button {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #D4AF37, #E6D195);
          color: #4a3520;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          }
        }
      }
    }

    /* Navigation Arrows */
    .navigation-arrows {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      z-index: 3;

      .nav-arrow {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #D4AF37;
        color: #D4AF37;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        pointer-events: auto;

        &:hover {
          background: #D4AF37;
          color: white;
          transform: scale(1.1);
        }

        &.prev {
          margin-left: -3rem;
        }

        &.next {
          margin-right: -3rem;
        }
      }
    }
  }

  /* Call to Action */
  .cta-section {
    text-align: center;
    margin-top: 4rem;
    padding: 3rem 2rem;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #4a3520;
      font-weight: 600;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #6c5b40;
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .register-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, #D4AF37, #E6D195);
      color: #4a3520;
      text-decoration: none;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
      }
    }
  }

  /* Guidelines Section */
  .guidelines-section {
    display: flex;
    justify-content: center;
    margin: 4rem 0;
    padding: 0 1rem;

    .guidelines-card {
      background: linear-gradient(135deg, #f5f1e8 0%, #e8dcc6 100%);
      border: 2px solid #D4AF37;
      border-radius: 20px;
      padding: 2.5rem;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
        animation: float 8s ease-in-out infinite;
        z-index: 1;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(180deg); }
      }

      > * {
        position: relative;
        z-index: 2;
      }

      .guidelines-header {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        gap: 1.5rem;

        .guidelines-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #D4AF37 0%, #E6D195 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          
          svg {
            width: 28px;
            height: 28px;
            color: #4a3520;
          }
        }

        .guidelines-title {
          flex: 1;

          h3 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #4a3520;
            margin: 0 0 0.5rem 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          p {
            font-size: 1rem;
            color: #6c5b40;
            margin: 0;
            font-style: italic;
          }
        }
      }

      .guidelines-content {
        color: #5d4e37;
        font-size: 1.1rem;
        line-height: 1.7;
        margin-bottom: 2rem;
        text-align: justify;
      }

      .download-button {
        background: linear-gradient(135deg, #D4AF37 0%, #E6D195 100%);
        color: #4a3520;
        border: none;
        border-radius: 12px;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        margin: 0 auto;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
          background: linear-gradient(135deg, #E6D195 0%, #D4AF37 100%);
        }

        &:active {
          transform: translateY(-1px);
        }

        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 5rem 1rem 3rem;

    .header-section {
      h1 {
        font-size: 2.8rem;
      }

      .subtitle {
        font-size: 1.5rem;
      }

      .description {
        font-size: 1rem;
      }
    }

    .track-navigation {
      .track-tab {
        .track-name {
          display: none;
        }

        .track-icon {
          font-size: 1.3rem;
        }
      }
    }

    .content-area {
      .track-content {
        padding: 1.5rem;

        .track-header {
          flex-direction: column;
          text-align: center;
          gap: 1rem;

          .track-icon-large {
            font-size: 3rem;
          }

          .track-title-section {
            h2 {
              font-size: 2rem;
            }

            h3 {
              font-size: 1.1rem;
            }
          }
        }
      }

      .navigation-arrows {
        .nav-arrow {
          &.prev {
            margin-left: -1rem;
          }

          &.next {
            margin-right: -1rem;
          }
        }
      }
    }

    .cta-section {
      padding: 2rem 1.5rem;
      margin-top: 3rem;

      h3 {
        font-size: 1.7rem;
      }

      p {
        font-size: 1rem;
      }
    }

    .guidelines-section {
      margin: 3rem 0;
      padding: 0 0.5rem;

      .guidelines-card {
        padding: 2rem;

        .guidelines-header {
          gap: 1rem;

          .guidelines-icon {
            width: 50px;
            height: 50px;

            svg {
              width: 24px;
              height: 24px;
            }
          }

          .guidelines-title {
            h3 {
              font-size: 1.5rem;
            }

            p {
              font-size: 0.9rem;
            }
          }
        }

        .guidelines-content {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .download-button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          gap: 0.6rem;

          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .header-section {
      h1 {
        font-size: 2.5rem;
      }
    }

    .content-area {
      .navigation-arrows {
        display: none;
      }
    }

    .guidelines-section {
      .guidelines-card {
        padding: 1.5rem;

        .guidelines-header {
          flex-direction: column;
          text-align: center;
          gap: 1rem;

          .guidelines-title {
            h3 {
              font-size: 1.3rem;
            }
          }
        }

        .guidelines-content {
          font-size: 0.95rem;
          text-align: center;
        }
      }
    }
  }
`;

export default ProblemStatements;
