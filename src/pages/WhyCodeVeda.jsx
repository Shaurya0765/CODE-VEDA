import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import mandalaPattern from '../assets/images/mandala-pattern.svg';
import omSymbol from '../assets/images/om-symbol.svg';
import sacredGeometry from '../assets/images/sacred-geometry.svg';
import { useAudioContext } from '../context/AudioContext';

const WhyCodeVeda = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Define chapters content first
  const chapters = [
    {
      title: "आदि पुस्तक: The Genesis",
      sanskrit: "कोडवेद सारः",
      english: "The Essence of CodeVeda",
      content: `
        <p>In the beginning, there was knowledge. And from this knowledge emerged understanding. CodeVeda represents the convergence of ancient Vedic wisdom with modern technological innovation - a new path for those who seek to create with purpose and meaning.</p>
        <p>Like the Vedas, which are repositories of timeless knowledge organized in systematic ways, modern code organizes logic and information to solve problems of our time.</p>
        <div class="vedic-quote">"सत्यं ज्ञानम् अनन्तं ब्रह्म" (Truth, Knowledge, Infinity)</div>
      `
    },
    {
      title: "समारम्भ: The Beginning",
      sanskrit: "आरम्भ ज्ञानम्",
      english: "Origins & Philosophy",
      content: `
        <p>The Vedas, ancient texts from the Indian subcontinent, are organized into four collections, each with its own focus and purpose. Similarly, modern software development follows foundational principles that guide its implementation.</p>
        <p>Just as rishis (sages) received and transmitted Vedic knowledge through careful contemplation and structured organization, developers create systems that organize and process knowledge for the digital age.</p>
        <div class="vedic-quote">"यथा पिण्डे तथा ब्रह्माण्डे" (As in the microcosm, so in the macrocosm)</div>
      `
    },    {
      title: "चतुर्विध सिद्धान्त: Four Principles",
      sanskrit: "आरम्भ सिद्धान्त",
      english: "Foundational Pillars",
      content: `
        <p>Like the four Vedas (Rigveda, Yajurveda, Samaveda, and Atharvaveda), CodeVeda is built upon four foundational principles:</p>
      `
    },
    {
      title: "वेद चतुष्टय: The Four Pillars",
      sanskrit: "वेद सिद्धान्त",
      english: "Core Principles",
      content: `
        <ul>
          <li><span class="sanskrit">ज्ञान (Jñāna)</span> - Knowledge: The pursuit of understanding through study and exploration</li>
          <li><span class="sanskrit">संरचना (Saṃracanā)</span> - Structure: The organized arrangement of information</li>
          <li><span class="sanskrit">सामंजस्य (Sāmañjasya)</span> - Harmony: Balance between ancient wisdom and modern innovation</li>
          <li><span class="sanskrit">प्रयोग (Prayoga)</span> - Application: Practical implementation of knowledge for the benefit of all</li>
        </ul>
      `
    },{
      title: "ज्ञान मार्ग: Path of Knowledge",
      sanskrit: "वेदाङ्ग-विज्ञानयोः समन्वयः",
      english: "Integrating Wisdom & Technology",
      content: `
        <p>Why merge these seemingly disparate domains? The Vedic tradition emphasizes the interconnected nature of all existence - a principle that mirrors modern systems thinking and network theory.</p>
        <div class="vedic-quote">"अहं ब्रह्मास्मि" (I am Brahman/The Infinite Reality)</div>
        <p>This interconnectedness in Vedic philosophy parallels the web of dependencies and relationships in modern software architecture. By approaching technology with Vedic principles, we create more holistic, sustainable, and meaningful solutions.</p>
      `
    },
    {
      title: "प्राचीन पद्धति: Ancient Algorithms",
      sanskrit: "वैदिक-अल्गोरिथम",
      english: "Vedic Computational Methods",
      content: `
        <p>The Vedas contained sophisticated mathematical methods and algorithmic thinking long before modern computing:</p>
        <ul>
          <li>Recursive thinking patterns in Yajurveda</li>
          <li>Pattern recognition methodologies in Rigveda</li>
          <li>Memory optimization techniques in Vedic mathematics</li>
          <li>Modular organization of knowledge components</li>
        </ul>
        <p>These ancient methods inspire new approaches to computational thinking and problem-solving in our digital age.</p>
      `
    },    {
      title: "सृष्टि संरक्षण: Sustainable Creation",
      sanskrit: "संधारणीय प्रौद्योगिकी",
      english: "Sustainable Technology",
      content: `
        <p>The Vedic principle of harmony with nature guides our approach to creating technology that enhances rather than depletes our world. Technology should be a force for balance, not disruption.</p>
        <div class="vedic-quote">"वसुधैव कुटुम्बकम्" (The world is one family)</div>
        <p>Through CodeVeda, we aim to develop solutions that are not only technically excellent but also ethically sound and environmentally conscious. Our code becomes a form of dharma - righteous action in the world.</p>
      `
    },
    {
      title: "पञ्चमहाभूत: Five Elements",
      sanskrit: "पञ्चतत्त्व-कोडिंग",
      english: "Five Elements of Sustainable Code",
      content: `
        <ul>
          <li><span class="sanskrit">पृथ्वी (Pṛthvī)</span> - Earth: Grounded, stable infrastructure</li>
          <li><span class="sanskrit">जल (Jala)</span> - Water: Adaptable, flowing user experience</li>
          <li><span class="sanskrit">अग्नि (Agni)</span> - Fire: Transformative, powerful processing</li>
          <li><span class="sanskrit">वायु (Vāyu)</span> - Air: Lightweight, efficient delivery</li>
          <li><span class="sanskrit">आकाश (Ākāśa)</span> - Space: Expansive, scalable architecture</li>
        </ul>
      `
    },    {
      title: "समुदाय शक्ति: Community Power",
      sanskrit: "सङ्घशक्तिः",
      english: "The Strength of Community",
      content: `
        <p>In ancient times, knowledge was preserved and advanced through communities of learning. Similarly, the modern open-source movement thrives on collective contribution and shared discovery.</p>
        <p>CodeVeda builds a community where knowledge flows freely, where diverse perspectives enrich our understanding, and where collaboration leads to innovations that benefit all.</p>
      `
    },
    {
      title: "आचार संहिता: Guiding Ethics",
      sanskrit: "नैतिक सिद्धान्ताः",
      english: "Our Guiding Principles",
      content: `
        <ul>
          <li><span class="sanskrit">सत्य (Satya)</span> - Truth: Honesty in our code and communications</li>
          <li><span class="sanskrit">अहिंसा (Ahiṃsā)</span> - Non-harm: Creating technology that benefits rather than exploits</li>
          <li><span class="sanskrit">अस्तेय (Asteya)</span> - Non-stealing: Respecting intellectual property and giving proper attribution</li>
          <li><span class="sanskrit">दान (Dāna)</span> - Giving: Contributing to open-source and knowledge-sharing</li>
          <li><span class="sanskrit">धी (Dhī)</span> - Wisdom: Making thoughtful decisions about technology's impact</li>
        </ul>
      `
    },    {
      title: "मार्ग प्रशस्ति: The Path Forward",
      sanskrit: "आगामि मार्गः",
      english: "The Vision Ahead",
      content: `
        <p>CodeVeda isn't just a hackathon—it's a community of thinkers and builders bridging ancient wisdom with future innovation. We invite you to join us in creating technology that reflects the depth and wisdom of our shared human heritage.</p>
        <div class="vedic-quote">"तमसो मा ज्योतिर्गमय" (Lead us from darkness to light)</div>
        <p>Together, we code a more mindful technological future. We blend the best of what has come before with the possibilities that lie ahead.</p>
      `
    },
    {
      title: "यज्ञ: Sacred Creation",
      sanskrit: "सृजन यज्ञ",
      english: "Join The Movement",
      content: `
        <p>A Vedic yajna (ritual sacrifice) was a community gathering for transformation and blessing. CodeVeda is our modern yajna - a coming together to create technology that transforms and blesses our world.</p>
        <p>Bring your skills, your wisdom, and your creative spirit. Join us in this sacred act of creation.</p>
        <div class="join-container">
          <button class="vedic-button">Register for the Hackathon</button>
        </div>
      `
    }  ];

  // Set up state for the current chapter and content control
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [direction, setDirection] = useState(1);
  const contentRef = useRef(null);
  const dragConstraintsRef = useRef(null);
  
  // Add overflowDetected state to track when content overflows
  const [overflowDetected, setOverflowDetected] = useState(false);
  
  // Dragging functionality
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Initial scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle navigation between chapters
  const nextChapter = useCallback(() => {
    if (currentChapter < chapters.length - 1 && !isPageTurning) {
      setIsPageTurning(true);
      setDirection(1);
      setTimeout(() => {
        setCurrentChapter(prev => prev + 1);
        setIsPageTurning(false);
      }, 500);
    }
  }, [currentChapter, chapters.length, isPageTurning]);

  const prevChapter = useCallback(() => {
    if (currentChapter > 0 && !isPageTurning) {
      setIsPageTurning(true);
      setDirection(-1);
      setTimeout(() => {
        setCurrentChapter(prev => prev - 1);
        setIsPageTurning(false);
      }, 500);
    }
  }, [currentChapter, isPageTurning]);
    // Effect to check content overflow and handle pagination
  useEffect(() => {
    if (contentRef.current) {
      const checkContentOverflow = () => {
        const contentElement = contentRef.current;
        const contentHeight = contentElement.scrollHeight;
        const containerHeight = contentElement.clientHeight;
        
        // Set state to track overflow
        setOverflowDetected(contentHeight > containerHeight);
        
        if (contentHeight > containerHeight && !overflowDetected) {
          // Content is overflowing, we should move to next page
          if (currentChapter < chapters.length - 1) {
            setTimeout(() => {
              nextChapter();
            }, 100);
          }
        }
      };
      
      // Check after a small delay to ensure content is rendered
      const timer = setTimeout(checkContentOverflow, 300);
      return () => clearTimeout(timer);
    }
  }, [currentChapter, chapters, nextChapter, overflowDetected]);
  
  // Function to split content if needed
  const splitContentIfNeeded = (content) => {
    // We'll implement this if the overflow detection shows we need it
    return content;
  };
  
  // Page animation variants
  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? -25 : 25,
      boxShadow: direction > 0 
        ? '5px 0 15px rgba(0, 0, 0, 0.3)'
        : '-5px 0 15px rgba(0, 0, 0, 0.3)'
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        boxShadow: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? -25 : 25,
      boxShadow: direction < 0 
        ? '5px 0 15px rgba(0, 0, 0, 0.3)'
        : '-5px 0 15px rgba(0, 0, 0, 0.3)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        boxShadow: { duration: 0.3 }
      }
    }),    drag: {
      cursor: "grabbing",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 }
      }
    }
  };
  
  // Mouse drag handlers
  const handleDragStart = (event, info) => {
    if (!isPageTurning) {
      setIsDragging(true);
      setDragStartX(info.point.x);
      document.body.style.cursor = 'grabbing';
    }
  };

  const handleDragEnd = (event, info) => {
    if (isPageTurning) return;
    
    setIsDragging(false);
    document.body.style.cursor = 'auto';
    const dragDistance = info.point.x - dragStartX;
    const dragThreshold = 100; // minimum distance to trigger page turn
    
    if (dragDistance > dragThreshold && currentChapter > 0) {
      // Dragged right, go to previous chapter
      prevChapter();
    } else if (dragDistance < -dragThreshold && currentChapter < chapters.length - 1) {
      // Dragged left, go to next chapter
      nextChapter();
    }  };

  return (
    <ScriptureContainer>
      {/* Background elements */}
      <BackgroundMandala 
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.07, rotate: 360 }}
        transition={{ rotate: { duration: 150, ease: "linear", repeat: Infinity }, opacity: { duration: 2 } }}
      />
      
      <OmSymbolLeft 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
      />
      
      <OmSymbolRight 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Page title */}
      <PageTitle>
        <motion.div 
          className="title-wrapper"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1>Why <span>Code</span><span className="veda">Veda</span><span className="question">?</span></h1>
          <div className="subtitle">आधुनिक तकनीक वैदिक ज्ञान समन्वय</div>
          <div className="english-subtitle">The Integration of Modern Technology & Ancient Wisdom</div>
        </motion.div>
      </PageTitle>
      
      {/* Sacred Scripture Book */}
      <ScriptureWrapper>
        <PalmLeafManuscript>
          <PageCounter>
            {currentChapter + 1} <span className="divider">॥</span> {chapters.length}
          </PageCounter>
          
          <BookCover ref={dragConstraintsRef}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <ScripturePage
                key={currentChapter}
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag={isPageTurning ? false : "x"}
                dragConstraints={dragConstraintsRef}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className={isDragging ? "grabbing" : "grab"}
              >
                <LeftPage>                  <ChapterTitle>
                    <div className="sanskrit-title">{chapters[currentChapter].sanskrit}</div>
                    <h2>{chapters[currentChapter].title}</h2>
                    <div className="english-title">{chapters[currentChapter].english}</div>
                  </ChapterTitle>                  <div 
                    ref={contentRef} 
                    className={`page-content ${overflowDetected ? 'is-overflowing' : ''}`}
                    dangerouslySetInnerHTML={{ __html: chapters[currentChapter].content }} 
                  />
                </LeftPage>
                <SpineDecoration />
                <RightPage>
                  <DecorativeImage src={sacredGeometry} alt="Sacred Geometry Pattern" />
                  <DecorativeOm src={omSymbol} alt="Om Symbol" />
                  <ChapterNav>
                    <NavLabel>अध्याय अनुक्रमणिका (Chapter Navigation)</NavLabel>
                    <ChapterList>
                      {chapters.map((chapter, index) => (
                        <ChapterItem 
                          key={index}
                          onClick={() => {
                            if (isPageTurning) return;
                            setDirection(index > currentChapter ? 1 : -1);
                            setIsPageTurning(true);
                            setTimeout(() => {
                              setCurrentChapter(index);
                              setIsPageTurning(false);
                            }, 500);
                          }}
                          active={index === currentChapter}
                        >
                          <ChapterNumber>{index + 1}</ChapterNumber>
                          <ChapterName>{chapter.english}</ChapterName>
                        </ChapterItem>
                      ))}
                    </ChapterList>
                  </ChapterNav>
                </RightPage>
              </ScripturePage>
            </AnimatePresence>
          </BookCover>
          
          <NavigationControls>
            <NavButton 
              onClick={prevChapter} 
              disabled={currentChapter === 0 || isPageTurning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon">←</span> Previous Chapter 
            </NavButton>
            <DragInstructions>
              <span className="drag-icon">☟</span>
              Drag pages to turn
              <span className="drag-icon">☟</span>
            </DragInstructions>
            <NavButton 
              onClick={nextChapter} 
              disabled={currentChapter === chapters.length - 1 || isPageTurning}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Chapter <span className="icon">→</span>
            </NavButton>
          </NavigationControls>
        </PalmLeafManuscript>
      </ScriptureWrapper>
      
      {/* Apply responsive styles */}
      <ResponsiveStyles />
    </ScriptureContainer>
  );
};

// Styled Components
const ScriptureContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #f8f3e3; /* Parchment base color */
  padding: 3rem 1rem 5rem;
  overflow: hidden;
  
  @media (max-width: 992px) {
    padding: 2.5rem 1rem 4rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 0.8rem 3.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem 3rem;
  }
  
  /* Subtle texture overlay */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237d5642' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: 0;
  }
`;

const BackgroundMandala = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 200vw;
  background-image: url(${mandalaPattern});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  
  @media (max-width: 768px) {
    opacity: 0.05 !important; /* Override any animation value */
    width: 250vw;
    height: 250vw;
  }
`;

const OmSymbolLeft = styled(motion.div)`
  position: absolute;
  top: 5%;
  left: 2%;
  width: 120px;
  height: 120px;
  background-image: url(${omSymbol});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  pointer-events: none;
  
  @media (max-width: 992px) {
    width: 90px;
    height: 90px;
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    opacity: 0.08 !important; /* Override any animation value */
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    top: 3%;
    left: 1%;
  }
`;

const OmSymbolRight = styled(motion.div)`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 120px;
  height: 120px;
  background-image: url(${omSymbol});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  transform: rotate(180deg);
  pointer-events: none;
  
  @media (max-width: 992px) {
    width: 90px;
    height: 90px;
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    opacity: 0.08 !important; /* Override any animation value */
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: 3%;
    right: 1%;
  }
`;

const PageTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 4rem;
    font-family: 'RaviPrakash-Regular', serif;
    color: #7d5642; /* Deep brown */
    margin-bottom: 0.5rem;
    
    @media (max-width: 992px) {
      font-size: 3.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2.3rem;
    }
    
    span {
      display: inline-block;
      
      &.veda {
        color: #c17e40; /* Saffron */
      }
      
      &.question {
        color: #9c464e; /* Kumkum red */
      }
    }
  }
  
  .subtitle {
    font-family: 'RaviPrakash-Regular', serif;
    font-size: 1.8rem;
    color: #9c464e; /* Kumkum red */
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
  
  .english-subtitle {
    font-family: 'serif';
    font-size: 1.2rem;
    color: #7d5642; /* Deep brown */
    font-style: italic;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const ScriptureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const BookCover = styled.div`
  width: 100%;
  perspective: 1500px;
  min-height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(82, 55, 29, 0.25),
    0 10px 25px rgba(0, 0, 0, 0.15),
    inset 0 0 15px rgba(139, 69, 19, 0.2);
  background: #e8ddbc;
  position: relative;
  
  @media (max-width: 992px) {
    min-height: auto;
  }
  
  @media (max-width: 768px) {
    box-shadow: 
      0 15px 35px rgba(82, 55, 29, 0.2),
      0 8px 15px rgba(0, 0, 0, 0.1),
      inset 0 0 10px rgba(139, 69, 19, 0.15);
  }
  
  @media (max-width: 480px) {
    box-shadow: 
      0 10px 25px rgba(82, 55, 29, 0.18),
      0 5px 10px rgba(0, 0, 0, 0.08),
      inset 0 0 8px rgba(139, 69, 19, 0.12);
  }
  
  /* Ancient palm leaf style border */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 8px solid transparent;
    border-image: linear-gradient(45deg, rgba(193, 126, 64, 0.7), rgba(212, 175, 55, 0.7)) 1;
    pointer-events: none;
    z-index: 10;
    border-radius: 8px;
    
    @media (max-width: 768px) {
      border-width: 6px;
    }
    
    @media (max-width: 480px) {
      border-width: 4px;
    }
  }
`;

const PalmLeafManuscript = styled.div`
  width: 100%;
  position: relative;
  max-width: 90%;
  margin: 0 auto;
  perspective: 2000px;
  
  @media (max-width: 992px) {
    max-width: 95%;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const PageCounter = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #7d5642 0%, #b38566 100%);
  color: #f9f3e1;
  padding: 0.5rem 2.5rem;
  border-radius: 0 0 15px 15px;
  font-family: 'RaviPrakash-Regular', serif;
  font-size: 1.2rem;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(100, 50, 0, 0.15);
  
  @media (max-width: 992px) {
    padding: 0.5rem 2rem;
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 1.8rem;
    font-size: 1rem;
    top: -1.8rem;
    box-shadow: 0 3px 15px rgba(100, 50, 0, 0.12);
  }
  
  @media (max-width: 480px) {
    padding: 0.3rem 1.5rem;
    font-size: 0.9rem;
    top: -1.5rem;
    box-shadow: 0 2px 10px rgba(100, 50, 0, 0.1);
  }
  
  .divider {
    margin: 0 0.5rem;
    opacity: 0.8;
  }
`;

const ScripturePage = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background: #f1e8d3; /* Parchment color */
  border-radius: 15px;
  box-shadow: 
    0 15px 35px rgba(82, 55, 29, 0.2),
    0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 600px;
  max-height: 600px;
  cursor: grab;
  transform-style: preserve-3d;
  
  @media (max-width: 992px) {
    flex-direction: column;
    min-height: auto;
    max-height: none;
  }
  
  @media (max-width: 768px) {
    min-height: auto;
  }
  
  &.grabbing {
    cursor: grabbing;
  }
  
  /* Subtle texture overlay */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a67c52' fill-opacity='0.06'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: 0;
    opacity: 0.8;
    pointer-events: none;
    mix-blend-mode: multiply;
    border-radius: 15px;
  }
  
  /* Edge aging effect */
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    box-shadow: inset 0 0 40px rgba(139, 69, 19, 0.15);
    pointer-events: none;
    z-index: 5;
  }
`;

const LeftPage = styled.div`
  flex: 1;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(139, 69, 19, 0.15);
  max-height: 500px; /* Control max height to prevent overflow */
  display: flex;
  flex-direction: column;
  
  @media (max-width: 992px) {
    max-height: none;
    border-right: none;
    border-bottom: 1px solid rgba(139, 69, 19, 0.15);
    padding: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
  
  /* Decorative corners */
  &:before, &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    z-index: 1;
    opacity: 0.3;
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
    
    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }
  
  &:before {
    top: 20px;
    left: 20px;
    border-top: 2px solid #d4af37; /* Gold */
    border-left: 2px solid #d4af37;
    border-radius: 15px 0 0 0;
  }
  
  &:after {
    bottom: 20px;
    right: 20px;
    border-bottom: 2px solid #d4af37;
    border-right: 2px solid #d4af37;
    border-radius: 0 0 15px 0;
  }
  .page-content {
    font-family: 'Georgia', serif;
    color: #5d4037; /* Deep brown */
    font-size: 1.1rem;
    line-height: 1.8;
    position: relative;
    z-index: 2;
    max-height: 420px; /* Fixed height to prevent overflow */
    overflow-y: auto; /* Allow scrolling if needed */
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: rgba(193, 126, 64, 0.5) rgba(245, 236, 217, 0.1);
    
    @media (max-width: 992px) {
      max-height: none; /* Allow content to flow naturally on tablets */
      overflow-y: visible;
    }
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(245, 236, 217, 0.1);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(193, 126, 64, 0.5);
      border-radius: 4px;
    }
    
    &.is-overflowing {
      border-bottom: 1px dashed rgba(193, 126, 64, 0.3);
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
    
    p {
      margin-bottom: 1.5rem;
      text-align: justify;
    }
    
    ul {
      margin: 1.5rem 0;
      padding-left: 1rem;
      
      li {
        margin-bottom: 1rem;
        position: relative;
        padding-left: 2rem;
        
        &:before {
          content: "॥";
          position: absolute;
          left: 0;
          color: #c17e40; /* Saffron */
          font-family: 'RaviPrakash-Regular', serif;
        }
      }
    }
    
    h3 {
      font-family: 'RaviPrakash-Regular', serif;
      font-size: 1.6rem;
      color: #7d5642;
      margin: 2rem 0 1.5rem;
      position: relative;
      padding-left: 1.5rem;
      
      &:before {
        content: "॥";
        position: absolute;
        left: 0;
        color: #c17e40;
        font-family: 'RaviPrakash-Regular', serif;
      }
    }
      .vedic-quote {
      font-family: 'RaviPrakash-Regular', serif;
      font-size: 1.5rem;
      text-align: center;
      color: #9c464e; /* Kumkum red */
      margin: 2.5rem auto;
      padding: 1.5rem;
      position: relative;
      
      @media (max-width: 992px) {
        margin: 2rem auto;
        font-size: 1.4rem;
      }
      
      @media (max-width: 768px) {
        font-size: 1.3rem;
        padding: 1rem;
        margin: 1.5rem auto;
      }
      
      @media (max-width: 480px) {
        font-size: 1.2rem;
        padding: 0.8rem;
        margin: 1.2rem auto;
      }
      
      &:before, &:after {
        content: "";
        position: absolute;
        left: 50%;
        width: 150px;
        height: 1px;
        background: linear-gradient(90deg, 
          rgba(193, 126, 64, 0) 0%,
          rgba(193, 126, 64, 0.5) 50%,
          rgba(193, 126, 64, 0) 100%
        );
        transform: translateX(-50%);
        
        @media (max-width: 768px) {
          width: 120px;
        }
        
        @media (max-width: 480px) {
          width: 100px;
        }
      }
      
      &:before {
        top: 0;
      }
      
      &:after {
        bottom: 0;
      }
    }
    
    .vedic-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2rem 0;
      
      &:before, &:after {
        content: "";
        height: 1px;
        flex-grow: 1;
        background: linear-gradient(90deg, 
          rgba(193, 126, 64, 0) 0%,
          rgba(193, 126, 64, 0.3) 50%,
          rgba(193, 126, 64, 0) 100%
        );
      }
      
      &:before {
        margin-right: 1.5rem;
      }
      
      &:after {
        margin-left: 1.5rem;
      }
      
      &:after {
        content: "॥";
        font-family: 'RaviPrakash-Regular', serif;
        color: #c17e40;
        font-size: 1.5rem;
        margin: 0 1rem;
      }
    }
    
    .sanskrit {
      font-family: 'RaviPrakash-Regular', serif;
      color: #9c464e;
    }
    
    .join-container {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
    }
    
    .vedic-button {
      background: linear-gradient(135deg, #c17e40 0%, #d4af37 100%);
      color: #fff;
      font-family: 'Georgia', serif;
      font-size: 1.1rem;
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(193, 126, 64, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(193, 126, 64, 0.4);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
  }
`;

const SpineDecoration = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom,
    rgba(193, 126, 64, 0) 0%,
    rgba(193, 126, 64, 0.2) 20%,
    rgba(193, 126, 64, 0.2) 80%,
    rgba(193, 126, 64, 0) 100%
  );
  transform: translateX(-50%);
  z-index: 10;
`;

const RightPage = styled.div`
  flex: 1;
  padding: 2.5rem;
  position: relative;
  background: #f5ecd9; /* Slightly different parchment color */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 992px) {
    padding: 2rem;
    padding-top: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    padding-top: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
  
  /* Decorative corners */
  &:before, &:after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    z-index: 1;
    opacity: 0.3;
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
    
    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
    }
  }
  
  &:before {
    top: 20px;
    right: 20px;
    border-top: 2px solid #d4af37;
    border-right: 2px solid #d4af37;
    border-radius: 0 15px 0 0;
  }
  
  &:after {
    bottom: 20px;
    left: 20px;
    border-bottom: 2px solid #d4af37;
    border-left: 2px solid #d4af37;
    border-radius: 0 0 0 15px;
  }
`;

const ChapterTitle = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  
  @media (max-width: 992px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.8rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(193, 126, 64, 0) 0%,
      rgba(193, 126, 64, 0.5) 50%,
      rgba(193, 126, 64, 0) 100%
    );
    
    @media (max-width: 768px) {
      width: 120px;
      bottom: -0.8rem;
    }
    
    @media (max-width: 480px) {
      width: 100px;
      bottom: -0.7rem;
    }
  }
  
  .sanskrit-title {
    font-family: 'RaviPrakash-Regular', serif;
    font-size: 1.5rem;
    color: #9c464e; /* Kumkum red */
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 0.4rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.3rem;
    }
  }
  
  h2 {
    font-family: 'RaviPrakash-Regular', serif;
    font-size: 2.3rem;
    color: #7d5642; /* Deep brown */
    margin-bottom: 0.5rem;
    
    @media (max-width: 992px) {
      font-size: 2rem;
    }
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 0.4rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 0.3rem;
    }
  }
  
  .english-title {
    font-family: 'Georgia', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: #7d5642;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const DecorativeImage = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.06;
  z-index: 0;
  pointer-events: none;
`;

const DecorativeOm = styled.img`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 15%;
  right: 5%;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
`;

const ChapterNav = styled.div`
  margin-top: auto;
  position: relative;
  z-index: 2;
  background: rgba(245, 236, 217, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(193, 126, 64, 0.1);
  
  @media (max-width: 992px) {
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const NavLabel = styled.div`
  font-family: 'RaviPrakash-Regular', serif;
  color: #7d5642;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    gap: 0.6rem;
    max-height: 300px;
    overflow-y: auto;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ChapterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(193, 126, 64, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(193, 126, 64, 0.2)' : 'transparent'};
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    gap: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    gap: 0.6rem;
  }
  
  /* Add decorative element for active item */
  ${props => props.active && `
    &:before {
      content: "॥";
      position: absolute;
      left: -10px;
      color: #c17e40;
      font-family: 'RaviPrakash-Regular', serif;
      font-size: 1.2rem;
      
      @media (max-width: 768px) {
        font-size: 1.1rem;
        left: -8px;
      }
      
      @media (max-width: 480px) {
        font-size: 1rem;
        left: -6px;
      }
    }
  `}
  
  &:hover {
    background: rgba(193, 126, 64, 0.1);
  }
`;

const ChapterNumber = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(193, 126, 64, 0.8);
  color: #f9f3e1;
  border-radius: 50%;
  font-family: 'Georgia', serif;
  font-weight: bold;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
`;

const ChapterName = styled.div`
  font-family: 'Georgia', serif;
  color: #5d4037;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const DragInstructions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7d5642;
  font-family: 'Georgia', serif;
  font-size: 0.9rem;
  font-style: italic;
  opacity: 0.8;
  background: rgba(245, 236, 217, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(193, 126, 64, 0.2);
  box-shadow: 0 2px 8px rgba(125, 86, 66, 0.1);
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
  
  .drag-icon {
    margin: 0 0.5rem;
    font-size: 1.1rem;
    transform: rotate(90deg);
    display: inline-block;
    color: #c17e40;
  }
`;

const NavButton = styled(motion.button)`
  background: linear-gradient(135deg, #7d5642 0%, #a67c52 100%);
  color: #f9f3e1;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  cursor: pointer;
  font-family: 'Georgia', serif;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(125, 86, 66, 0.2);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    flex: 1;
    justify-content: center;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7;
  }
  
  .icon {
    font-size: 1.2rem;
    margin: 0 0.5rem;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%);
    opacity: 0;
    transition: opacity 0.3s;
    transform: scale(0.5);
    z-index: 0;
  }
  
  &:hover:not(:disabled):before {
    opacity: 1;
    animation: ripple 1.5s ease-out forwards;
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

// Media query helpers for responsive design
const media = {
  tablet: "@media (max-width: 992px)",
  mobile: "@media (max-width: 768px)",
  smallMobile: "@media (max-width: 480px)"
};

// Add responsive styles using a proper component
const ResponsiveStyles = styled.div`  
  /* Tablet Styles */
  ${media.tablet} {
    ${ScripturePage} {
      flex-direction: column;
      min-height: auto;
      max-height: none;
    }
    
    ${PageTitle} h1 {
      font-size: 3.5rem;
    }
    
    ${LeftPage}, ${RightPage} {
      padding: 2rem;
      max-height: none;
    }
    
    ${LeftPage} {
      border-right: none;
      border-bottom: 1px solid rgba(139, 69, 19, 0.15);
    }
    
    ${LeftPage} .page-content {
      max-height: none;
      overflow-y: visible;
    }
    
    ${RightPage} {
      padding-top: 1rem;
    }
    
    ${ChapterTitle} h2 {
      font-size: 2rem;
    }
    
    ${PalmLeafManuscript} {
      max-width: 95%;
    }
    
    ${OmSymbolLeft}, ${OmSymbolRight} {
      width: 90px;
      height: 90px;
    }
  }
  
  /* Mobile Styles */
  ${media.mobile} {
    ${PageTitle} h1 {
      font-size: 2.8rem;
    }
    
    ${PageTitle} .subtitle {
      font-size: 1.5rem;
    }
    
    ${PageTitle} .english-subtitle {
      font-size: 1.1rem;
    }
    
    ${LeftPage}, ${RightPage} {
      padding: 1.5rem;
    }
    
    ${ChapterTitle} h2 {
      font-size: 1.8rem;
    }
    
    ${ChapterTitle} .sanskrit-title {
      font-size: 1.3rem;
    }
    
    ${LeftPage} .page-content {
      font-size: 1rem;
      line-height: 1.6;
    }
    
    ${LeftPage} .vedic-quote {
      font-size: 1.3rem;
      padding: 1rem;
    }
    
    ${DragInstructions} {
      display: none;
    }
    
    ${NavigationControls} {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    
    ${PalmLeafManuscript} {
      max-width: 100%;
    }
    
    ${ScripturePage} {
      min-height: auto;
      box-shadow: 0 10px 25px rgba(82, 55, 29, 0.2);
    }
    
    ${ChapterNav} {
      padding: 1rem;
    }
    
    ${ChapterList} {
      max-height: 300px;
      overflow-y: auto;
    }
    
    ${OmSymbolLeft}, ${OmSymbolRight} {
      width: 70px;
      height: 70px;
      opacity: 0.08;
    }
    
    ${BackgroundMandala} {
      opacity: 0.05;
    }
  }
  
  /* Small Mobile Styles */
  ${media.smallMobile} {
    ${PageTitle} h1 {
      font-size: 2.3rem;
    }
    
    ${PageTitle} .subtitle {
      font-size: 1.2rem;
    }
    
    ${PageTitle} .english-subtitle {
      font-size: 1rem;
    }
    
    ${LeftPage}, ${RightPage} {
      padding: 1rem;
    }
    
    ${ChapterTitle} h2 {
      font-size: 1.5rem;
    }
    
    ${ChapterTitle} .sanskrit-title {
      font-size: 1.1rem;
    }
    
    ${ChapterTitle} .english-title {
      font-size: 1rem;
    }
    
    ${LeftPage} .page-content {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    ${LeftPage} .vedic-quote {
      font-size: 1.2rem;
      padding: 0.8rem;
    }
    
    ${NavButton} {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      flex: 1;
    }
    
    ${ScripturePage} {
      box-shadow: 0 5px 15px rgba(82, 55, 29, 0.15);
    }
    
    ${ChapterItem} {
      padding: 0.6rem;
    }
    
    ${ChapterName} {
      font-size: 0.9rem;
    }
    
    ${ChapterNumber} {
      width: 25px;
      height: 25px;
      font-size: 0.8rem;
    }
    
    ${OmSymbolLeft}, ${OmSymbolRight} {
      width: 50px;
      height: 50px;
    }
    
    ${NavLabel} {
      font-size: 1rem;
    }
  }
`;



const WhyWrapper = styled.div`
  position: relative;
  padding: 4rem 2rem 6rem;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1a1a1a 100%);
  color: var(--text-light);
  min-height: 100vh;
  
  /* Main background elements */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(138, 79, 255, 0.1) 0%, transparent 20%);
    opacity: 0.5;
    z-index: 0;
    pointer-events: none;
  }
  
  .book-container {
    margin: 4rem auto 6rem;
    max-width: 1000px;
    position: relative;
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 180px;
      height: 180px;
      background-image: var(--vedic-pattern-bg);
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.12;
      z-index: -1;
      pointer-events: none;
    }
    
    &:before {
      top: -80px;
      left: -80px;
      animation: float-rotate 15s infinite alternate ease-in-out;
    }
    
    &:after {
      bottom: -80px;
      right: -80px;
      transform: rotate(180deg);
      animation: float-rotate-reverse 20s infinite alternate ease-in-out;
    }
  }
  
  .bg-mandala {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140vw;
    height: 140vw;
    background-image: var(--vedic-pattern-bg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.05;
    z-index: 0;
    pointer-events: none;
    animation: slow-spin 180s linear infinite;
  }
  
  /* Second mandala for layered effect */
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vw;
    background-image: var(--vedic-pattern-bg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.03;
    z-index: 0;
    pointer-events: none;
    animation: slow-spin-reverse 150s linear infinite;
  }
  
  @keyframes slow-spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes slow-spin-reverse {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(-360deg); }
  }
  
  @keyframes float-rotate {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
    100% { transform: translateY(5px) rotate(-5deg); }
  }
  
  @keyframes float-rotate-reverse {
    0% { transform: translateY(0) rotate(180deg); }
    50% { transform: translateY(-10px) rotate(185deg); }
    100% { transform: translateY(10px) rotate(175deg); }
  }
    .title {
    position: relative;
    font-size: 4.5rem;
    font-family: var(--font-display);
    text-align: center;
    margin-bottom: 1rem;
    z-index: 1;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
    background: linear-gradient(90deg, 
      var(--accent-color) 0%, 
      var(--primary-color) 50%,
      var(--secondary-color) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    
    span {
      color: var(--primary-color);
      position: relative;
      display: inline-block;
      -webkit-text-fill-color: var(--primary-color); /* Needed to override the parent gradient */
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: linear-gradient(90deg, 
          rgba(255, 107, 53, 0) 0%, 
          rgba(255, 107, 53, 0.8) 50%, 
          rgba(255, 107, 53, 0) 100%
        );
        border-radius: 3px;
        opacity: 0.7;
      }
    }
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background-image: var(--vedic-pattern-bg);
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.15;
      z-index: -1;
      top: 50%;
      transform: translateY(-50%);
    }
    
    &:before {
      left: -80px;
    }
    
    &:after {
      right: -80px;
      transform: translateY(-50%) rotate(180deg);
    }
  }
  
  .content-container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    z-index: 1;
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 
      0 20px 50px rgba(0, 0, 0, 0.3),
      0 5px 15px rgba(255, 107, 53, 0.1),
      inset 0 0 30px rgba(138, 79, 255, 0.05);
    border: 1px solid rgba(255, 107, 53, 0.15);
    
    /* Decorative corner elements */
    &:before, &:after {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      opacity: 0.1;
    }
    
    &:before {
      top: 20px;
      left: 20px;
      border-top: 2px solid var(--accent-color);
      border-left: 2px solid var(--accent-color);
      border-radius: 15px 0 0 0;
    }
    
    &:after {
      bottom: 20px;
      right: 20px;
      border-bottom: 2px solid var(--primary-color);
      border-right: 2px solid var(--primary-color);
      border-radius: 0 0 15px 0;
    }
  }
  .section {
    margin-bottom: 4.5rem;
    position: relative;
    padding: 0.5rem 0 0.5rem 2rem;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, 
        rgba(255, 107, 53, 0.2), 
        rgba(255, 107, 53, 0.8) 30%, 
        rgba(138, 79, 255, 0.8) 70%, 
        rgba(138, 79, 255, 0.2)
      );
      border-radius: 3px;
      box-shadow: 0 0 10px rgba(255, 107, 53, 0.2);
    }
    
    /* Section hover effect */
    &:hover:before {
      background: linear-gradient(to bottom, 
        rgba(255, 204, 41, 0.2), 
        rgba(255, 204, 41, 0.8) 30%, 
        rgba(255, 107, 53, 0.8) 70%, 
        rgba(255, 107, 53, 0.2)
      );
      box-shadow: 0 0 15px rgba(255, 204, 41, 0.3);
      transition: all 0.5s ease;
    }
    
    h2 {
      font-family: var(--font-display);
      font-size: 2.3rem;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      position: relative;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      
      /* Decorative element before heading */
      &:before {
        content: '॥';
        font-family: var(--font-sanskrit);
        margin-right: 1rem;
        color: var(--accent-color);
        opacity: 0.8;
        font-size: 2rem;
      }
      
      /* Underline after heading */
      &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 120px;
        height: 2px;
        background: linear-gradient(90deg, 
          var(--primary-color) 0%, 
          var(--secondary-color) 70%, 
          transparent 100%);
      }
    }
    
    p {
      font-size: 1.15rem;
      line-height: 1.8;
      margin-bottom: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 0.01rem;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    }
    
    ul {
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      
      li {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        position: relative;
        padding-left: 1.5rem;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0.01rem;
        
        &:before {
          content: "॥";
          position: absolute;
          left: -0.5rem;
          color: var(--primary-color);
          font-family: var(--font-sanskrit);
          transition: all 0.2s ease;
        }
        
        &:hover:before {
          color: var(--accent-color);
          transform: translateX(3px);
        }
      }
    }
  }
    .quote-section {
    margin: 6rem auto;
    max-width: 700px;
    position: relative;
    
    /* Gradient lines above and below */
    &:before, &:after {
      content: '';
      position: absolute;
      left: 50%;
      width: 250px;
      height: 1px;
      background: linear-gradient(90deg, 
        rgba(255, 204, 41, 0) 0%, 
        rgba(255, 204, 41, 0.7) 50%, 
        rgba(255, 204, 41, 0) 100%
      );
      transform: translateX(-50%);
      box-shadow: 0 0 5px rgba(255, 204, 41, 0.3);
    }
    
    &:before {
      top: -2.5rem;
    }
    
    &:after {
      bottom: -2.5rem;
    }
    
    /* Background decoration */
    &:after {
      content: '';
      position: absolute;
      width: 250px;
      height: 250px;
      background-image: var(--vedic-pattern-bg);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.04;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: slowly-pulse 8s infinite alternate ease-in-out;
    }
    
    @keyframes slowly-pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.03; }
      100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.06; }
    }
    
    blockquote {
      font-size: 1.9rem;
      font-family: var(--font-sanskrit);
      font-style: italic;
      text-align: center;
      background: linear-gradient(135deg, 
        var(--primary-color) 0%, 
        var(--accent-color) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 2.5rem;
      position: relative;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      &:before, &:after {
        content: '"';
        position: absolute;
        font-size: 5rem;
        font-family: serif;
        color: rgba(255, 107, 53, 0.15);
        line-height: 0;
      }
      
      &:before {
        top: 2rem;
        left: 0;
      }
      
      &:after {
        bottom: 1rem;
        right: 0;
        transform: rotate(180deg);
      }
    }
  }
    @media (max-width: 992px) {
    padding: 3rem 1.5rem 5rem;
    
    .title {
      font-size: 3.5rem;
      
      &:before, &:after {
        width: 45px;
        height: 45px;
      }
      
      &:before {
        left: -50px;
      }
      
      &:after {
        right: -50px;
      }
    }
    
    .content-container {
      padding: 2.5rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 4rem;
    
    .title {
      font-size: 2.8rem;
      
      &:before, &:after {
        display: none;
      }
    }
    
    .content-container {
      padding: 2rem 1.5rem;
    }
    
    .section h2 {
      font-size: 1.8rem;
    }
    
    .quote-section blockquote {
      font-size: 1.5rem;
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem 3rem;
    
    .title {
      font-size: 2.3rem;
    }
    
    .content-container {
      padding: 1.5rem 1rem;
    }
    
    .section {
      padding-left: 1.5rem;
      
      h2 {
        font-size: 1.6rem;
        
        &:before {
          font-size: 1.4rem;
        }
      }
      
      p, li {
        font-size: 1rem;
      }
    }
  }
`;



export default WhyCodeVeda;