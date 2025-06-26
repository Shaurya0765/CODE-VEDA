import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaExpandAlt, FaCompressAlt, FaRegBookmark, FaBookmark, FaInfoCircle } from 'react-icons/fa';
import { GiScrollQuill, GiIndiaGate } from 'react-icons/gi';
import { BsCalendarEvent, BsClock, BsGearFill } from 'react-icons/bs';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedItems, setExpandedItems] = useState({});
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('hackathonBookmarks')) || {};
    setBookmarkedItems(savedBookmarks);
  }, []);

  useEffect(() => {
    // Filter schedule data based on search term
    if (scheduleData[activeDay]) {
      const filtered = scheduleData[activeDay].filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.subItems && item.subItems.some(sub => 
          sub.description && sub.description.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, activeDay]);

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleBookmark = (index) => {
    const newBookmarks = {
      ...bookmarkedItems,
      [index]: !bookmarkedItems[index]
    };
    setBookmarkedItems(newBookmarks);
    localStorage.setItem('hackathonBookmarks', JSON.stringify(newBookmarks));
  };

  // Enhanced schedule data with more structure and icons
  const scheduleData = {
    1: [
      {
        title: "Introduction",
        icon: <GiScrollQuill />,
        highlight: true,
        description: `Welcome to Code Veda, a unique hackathon themed "Digital Dharma" where innovation meets intention. Inspired by timeless Vedic values, Code Veda champions ethical and purposeful coding that aligns with truth (Satya), duty (Dharma), and selfless service (Seva). This is more than just a tech event, it's a call to create solutions that not only solve problems but also uphold principles that guide a responsible and compassionate digital future. Join us as we code with conscience and build with purpose.`
      },
      {
        title: "Overview",
        icon: <FaInfoCircle />,
        highlight: true,
        description: `• Team Size: 2–4 Members 
        • Eligibility: Open to all Tech Enthusiast Students 
        • Mode: Hybrid (Online and Offline)
        • Final Round Venue: Masters' Union`,
        subItems: [
          {
            title: "Participation Benefits",
            description: `- Networking with industry experts
- Chance to win exciting prizes
- Certificate of participation
- Opportunity to work on real-world problems`,
            icon: "🏆"
          }
        ]
      },
      {
        title: "Timeline",
        icon: <BsCalendarEvent />,
        highlight: true,
        description: `➤ 20 August - Registration closes
➤ 15 July–25 August - PPT submission
➤ 1 September - PPT round result
➤ 7 September - Online Round
➤ 8 September - Online round result (Tentative)
➤ 16–17 September - Offline round`,
        timelineVisual: [
          { date: "20 Aug", event: "Registrations Close", completed: false },
          { date: "25 Aug", event: "PPT Submission", completed: false },
          { date: "1 Sep", event: "PPT Results", completed: false },
          { date: "7 Sep", event: "Online Round", completed: false },
          { date: "16-17 Sep", event: "Offline Hackathon", completed: false }
        ]
      },
      {
        title: "Code Of Conduct",
        icon: "⚖️",
        highlight: true,
        description: `As part of our commitment to fostering a safe, respectful, and inclusive environment during the hackathon, we kindly remind you to immediately report any inappropriate behavior to the organizing team.`,
        subItems: [
          {
            title: "Consequences of Inappropriate Behavior",
            description: `• Verbal Warning (for minor infractions)
• Immediate Disqualification from the hackathon
• Removal from the event venue
• Permanent ban from future events`,
            icon: "🚫"
          }
        ]
      },
      {
        title: "Tracks",
        icon: "🛤️",
        highlight: true,
        description: `• Code For Karma • Open Innovation • Healthcare • IoT • AR/VR • Sustainable Development • App Development`,
        subItems: [
          {
            title: "Track Details",
            description: `**Code For Karma**: Solutions that benefit society
**Open Innovation**: Most creative and innovative ideas
**Healthcare**: Medical and wellness technologies
**Sustainable Development**: Environmental solutions`,
            icon: "🔍"
          }
        ]
      },
      {
        title: "Phase Details",
        highlight: true,
        isHeader: true,
        icon: <BsGearFill />
      },
      {
        title: "Phase 1: Registrations",
        icon: "📝",
        highlight: true,
        description: `➤ Registrations will be open till 20th August 2025
➤ All participants are expected to form teams of 2-4 members
➤ No changes will be allowed in team structure after registration closes`,
        time: "Till 20 Aug"
      },
      {
        title: "Phase 2: PPT Submission",
        icon: "📊",
        highlight: true,
        description: `➤ PPT submission starts on 15th July 2025
➤ Deadline for PPT submission is 25th August 2025
➤ Project description should be added alongside the PPT`,
        time: "15 Jul - 25 Aug",
        subItems: [
          {
            title: "PPT Guidelines",
            description: `- Maximum 10 slides
- Clearly define problem statement
- Include proposed solution architecture
- Mention potential impact`,
            icon: "📑"
          }
        ]
      },
      {
        title: "Phase 3: Online Round",
        icon: "💻",
        highlight: true,
        description: `➤ Online round will be conducted on 7th September 2025
➤ Shortlisted teams from the PPT round will move to the online round
➤ Results of this round will be declared next day, i.e. on 8th September 2025`,
        time: "7 Sep",
        subItems: [
          {
            title: "Evaluation Criteria",
            description: `- Innovation (30%)
- Technical Complexity (25%)
- Practical Implementation (20%)
- Presentation (15%)
- Social Impact (10%)`,
            icon: "📋"
          }
        ]
      },
      {
        title: "Requirements",
        icon: "✅",
        highlight: true,
        description: `• Github Repository
• Idea Presentation`,
        time: "All Phases"
      },
      {
        title: "Rules",
        icon: "📜",
        highlight: true,
        description: `• Presentation should clearly outline approach and scope
• Allowed Tools: Any open-source framework and libraries`,
        subItems: [
          {
            title: "Additional Rules",
            description: `- All code must be written during the hackathon
- Plagiarism will result in disqualification
- Teams must be present for all judging sessions`,
            icon: "⚠️"
          }
        ]
      },
      {
        title: "Phase 4: Offline Round",
        icon: <GiIndiaGate />,
        highlight: true,
        description: `➤ Offline round will be conducted on 16th-17th September 2025 at Masters' Union
➤ It will be a 24 hours high energy hackathon`,
        time: "16-17 Sep",
        subItems: [
          {
            title: "What to Bring",
            description: `- Laptop and charger
- Any special hardware needed
- Government ID for verification
- Enthusiasm and creativity!`,
            icon: "🎒"
          }
        ]
      },
      {
        title: "Detailed Schedule",
        icon: <BsClock />,
        highlight: true,
        time: "16-17 Sep 2025",
        description: `• Opening Ceremony: 11a.m. -12 p.m. - Angaar Batch Session
• PW session
• Lunch Break
• Project Development, mentoring and evaluation
• Judging Session
• Results
• Prize Distribution
• Closing`,
        subItems: [
          {
            title: "Detailed Timeline",
            description: `**Day 1 (16 Sep)**
- 11:00 AM: Registration
- 12:00 PM: Opening Ceremony
- 1:00 PM: Lunch
- 2:00 PM: Hacking Begins
- 7:00 PM: Dinner
- 12:00 AM: Midnight Snack

**Day 2 (17 Sep)**
- 8:00 AM: Breakfast
- 12:00 PM: Lunch
- 2:00 PM: Hacking Ends
- 3:00 PM: Judging
- 5:00 PM: Closing Ceremony`,
            icon: "⏱️"
          }
        ]
      }
    ]
  };

  const currentData = searchTerm ? filteredData : scheduleData[activeDay];

  return (
    <AncientManuscriptContainer>
      <motion.div
        className="manuscript-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative elements to mimic manuscript */}
        <div className="manuscript-edge left-edge"></div>
        <div className="manuscript-edge right-edge"></div>
        
        <header className="manuscript-header">
          <div className="decorative-corner top-left"></div>
          <div className="decorative-corner top-right"></div>
          <h1 className="vedic-title">॥ हॅकेथॉन क्रमः ॥</h1>
          <div className="title-translation">Hackathon Schedule</div>
          <div className="manuscript-decoration">
            <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,10 C20,0 40,20 50,10 C60,0 80,20 100,10" stroke="#4a3520" fill="none" strokeWidth="0.5"/>
              <path d="M50,0 C40,5 30,15 50,20 C70,15 60,5 50,0" stroke="#4a3520" fill="none" strokeWidth="0.5"/>
            </svg>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search schedule..."
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
        </header>

        <div className="manuscript-navigation">
          <div className="day-selector active">
            <div className="day-indicator">
              <span className="day-circle"></span>
            </div>
            <div className="day-text">
              <span className="day-number">दिवस 1</span>
              <span className="day-name">सृष्टि (Creation)</span>
            </div>
          </div>
        </div>
        
        <div className="manuscript-content">
          {currentData && currentData.length > 0 ? (
            currentData.map((item, index) => (
              <motion.div
                key={index}
                className={`schedule-item ${item.highlight ? 'highlight' : ''} ${item.isHeader ? 'section-header' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="time-block">
                  <div className="time-marker"></div>
                  <span className="time">{item.time}</span>
                </div>
                
                <div className="event-block">
                  <div className="event-header" onClick={() => item.subItems && toggleExpand(index)}>
                    {item.icon && <span className="event-icon">{item.icon}</span>}
                    <h3 className="event-title">{item.title}</h3>
                    <div className="event-actions">
                      {item.subItems && (
                        <motion.span 
                          className="expand-icon"
                          animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          {expandedItems[index] ? <FaCompressAlt /> : <FaExpandAlt />}
                        </motion.span>
                      )}
                      <motion.span 
                        className="bookmark-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(index);
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        {bookmarkedItems[index] ? <FaBookmark color="#d4a017" /> : <FaRegBookmark />}
                      </motion.span>
                    </div>
                  </div>
                  
                  {item.location && (
                    <div className="event-location">
                      {item.location}
                    </div>
                  )}
                  
                  {!item.isHeader && (
                    <motion.div 
                      className="event-description"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      {item.description}
                    </motion.div>
                  )}
                  
                  {item.highlight && !item.isHeader && (
                    <div className="highlight-marker">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="5" fill="#4a3520" opacity="0.5" />
                      </svg>
                    </div>
                  )}
                  
                  {item.timelineVisual && (
                    <div className="timeline-visual">
                      {item.timelineVisual.map((tl, i) => (
                        <div key={i} className="timeline-item">
                          <div className={`timeline-dot ${tl.completed ? 'completed' : ''}`}></div>
                          <div className="timeline-date">{tl.date}</div>
                          <div className="timeline-event">{tl.event}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <AnimatePresence>
                    {item.subItems && expandedItems[index] && (
                      <motion.div 
                        className="sub-items-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <div key={subIndex} className="sub-item">
                            <div className="sub-item-header">
                              {subItem.icon && <span className="sub-item-icon">{subItem.icon}</span>}
                              {subItem.title && <h4 className="sub-item-title">{subItem.title}</h4>}
                            </div>
                            <div className="sub-item-description">{subItem.description}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <h3>No schedule items found</h3>
              <p>Try adjusting your search term</p>
            </div>
          )}
        </div>

        <div className="manuscript-footer">
          <div className="decoration-line"></div>
          <div className="footer-note">
            <p>॥ सूचना: कार्यक्रमे परिवर्तनं भवितुम् शक्यते ॥</p>
            <p className="translation">Schedule may be subject to minor changes</p>
          </div>
          
          <div className="navigation-links">
            <Link to="/events" className="manuscript-link">
              <span>All Events</span>
              <span className="link-decoration">❉</span>
            </Link>
            <Link to="/prizes" className="manuscript-link">
              <span>Prizes</span>
              <span className="link-decoration">❉</span>
            </Link>
            <Link to="/faq" className="manuscript-link">
              <span>FAQ</span>
              <span className="link-decoration">❉</span>
            </Link>
            <Link to="/bookmarks" className="manuscript-link">
              <span>My Bookmarks</span>
              <span className="link-decoration">❉</span>
            </Link>
          </div>
          
          <div className="footer-seal">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#4a3520" strokeWidth="2" fill="none" />
              <path d="M50,10 A40,40 0 0,1 90,50 A40,40 0 0,1 50,90 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10 Z" 
                stroke="#4a3520" strokeWidth="1" fill="none" strokeDasharray="5,5" />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" 
                fontFamily="Arial" fontSize="12" fill="#4a3520" fontWeight="bold">
                CODE VEDA
              </text>
              <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" 
                fontFamily="Arial" fontSize="8" fill="#4a3520">
                DIGITAL DHARMA
              </text>
            </svg>
          </div>
        </div>
      </motion.div>
    </AncientManuscriptContainer>
  );
};

const AncientManuscriptContainer = styled.div`
  font-family: 'Noto Sans', 'Arial', sans-serif;
  padding: 2rem 0;
  min-height: 100vh;
  background-color: #f3f0e6;
  display: flex;
  justify-content: center;
  color: #4a3520;
  position: relative;

  /* Background texture */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(165, 132, 66, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(165, 132, 66, 0.05) 0%, transparent 20%),
      linear-gradient(to bottom, rgba(243, 240, 230, 0.9), rgba(243, 240, 230, 0.9));
    z-index: -1;
  }

  .manuscript-page {
    position: relative;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"),
      linear-gradient(to bottom, #e8e0cc 0%, #d6cdb2 100%);
    padding: 3rem 2rem;
    box-shadow: 
      0 5px 20px rgba(0, 0, 0, 0.1),
      inset 0 0 50px rgba(210, 190, 150, 0.2);
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid rgba(74, 53, 32, 0.1);

    /* Creating torn page effect */
    &::before, &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 30px;
      top: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='30' height='1000' viewBox='0 0 30 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L5,20 L0,40 L8,60 L0,80 L4,100 L0,120 L10,140 L0,160 L5,180 L0,200 L8,220 L0,240 L4,260 L0,280 L6,300 L0,320 L7,340 L0,360 L5,380 L0,400 L8,420 L0,440 L4,460 L0,480 L6,500 L0,520 L7,540 L0,560 L5,580 L0,600 L8,620 L0,640 L4,660 L0,680 L6,700 L0,720 L7,740 L0,760 L5,780 L0,800 L8,820 L0,840 L4,860 L0,880 L6,900 L0,920 L7,940 L0,960 L5,980 L0,1000' stroke='%23d6cdb2' fill='%23f3f0e6' stroke-width='0.5'/%3E%3C/svg%3E");
      background-repeat: repeat-y;
      z-index: 1;
    }

    &::before {
      left: 0;
      transform: scaleX(-1);
    }

    &::after {
      right: 0;
    }
  }

  .manuscript-edge {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: rgba(74, 53, 32, 0.2);
    z-index: 2;
    
    &.left-edge {
      left: 30px;
    }
    
    &.right-edge {
      right: 30px;
    }
  }

  .manuscript-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    z-index: 2;
    padding: 0 2rem;
    
    .decorative-corner {
      position: absolute;
      width: 50px;
      height: 50px;
      border: 1px solid rgba(74, 53, 32, 0.3);
      border-radius: 5px;
      
      &.top-left {
        top: -10px;
        left: 10px;
        border-right: none;
        border-bottom: none;
      }
      
      &.top-right {
        top: -10px;
        right: 10px;
        border-left: none;
        border-bottom: none;
      }
    }
    
    .vedic-title {
      font-family: 'Noto Sans', 'Arial', sans-serif;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #4a3520;
      letter-spacing: 1px;
      text-shadow: 1px 1px 2px rgba(74, 53, 32, 0.1);
    }
    
    .title-translation {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      font-style: italic;
      color: #6c5b40;
      letter-spacing: 0.5px;
    }
    
    .manuscript-decoration {
      width: 60%;
      margin: 0 auto;
      opacity: 0.6;
    }
    
    .search-container {
      position: relative;
      max-width: 400px;
      margin: 1.5rem auto 0;
      
      .search-input {
        width: 100%;
        padding: 0.8rem 1.5rem;
        padding-right: 2.5rem;
        border: 1px solid rgba(74, 53, 32, 0.3);
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        color: #4a3520;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: #4a3520;
          box-shadow: 0 0 0 2px rgba(74, 53, 32, 0.2);
        }
        
        &::placeholder {
          color: #8a7b66;
          font-style: italic;
        }
      }
      
      .clear-search {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6c5b40;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.2rem;
        transition: all 0.2s ease;
        
        &:hover {
          color: #4a3520;
          transform: translateY(-50%) scale(1.2);
        }
      }
    }
  }

  .manuscript-navigation {
    display: flex;
    justify-content: space-around;
    margin-bottom: 3rem;
    padding: 0 10%;
    position: relative;
    z-index: 2;
    
    .day-selector {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem 1rem;
      transition: all 0.3s ease;
      border-bottom: 1px dashed rgba(74, 53, 32, 0.2);
      position: relative;
      
      &:hover, &.active {
        border-bottom: 1px dashed rgba(74, 53, 32, 0.8);
        
        .day-circle {
          background-color: #4a3520;
        }
        
        .day-number, .day-name {
          color: #000;
        }
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 2px;
          background-color: #4a3520;
          border-radius: 2px;
        }
      }
      
      .day-indicator {
        margin-right: 1rem;
        
        .day-circle {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid #4a3520;
          background-color: transparent;
          transition: all 0.3s ease;
        }
      }
      
      .day-text {
        display: flex;
        flex-direction: column;
        
        .day-number {
          font-weight: 600;
          margin-bottom: 0.2rem;
          font-size: 1.1rem;
        }
        
        .day-name {
          font-size: 0.9rem;
          opacity: 0.8;
          font-style: italic;
        }
      }
    }
  }

  .manuscript-content {
    position: relative;
    padding: 0 3rem;
    z-index: 2;
    
    /* Ancient manuscript line pattern */
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-image: linear-gradient(
        transparent 19px,
        rgba(74, 53, 32, 0.05) 20px
      );
      background-size: 100% 20px;
      z-index: -1;
      pointer-events: none;
    }
    
    /* Creating a stained/aged paper effect with subtle spots */
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-image: radial-gradient(
        circle at 50% 50%, 
        rgba(165, 132, 66, 0.1) 0%, 
        rgba(165, 132, 66, 0.05) 50%,
        transparent 70%
      );
      background-size: 80px 80px;
      background-position: 0 0, 40px 40px;
      z-index: -1;
      opacity: 0.4;
      pointer-events: none;
    }
    
    .no-results {
      text-align: center;
      padding: 2rem;
      color: #6c5b40;
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }
      
      p {
        font-style: italic;
      }
    }
  }

  .schedule-item {
    display: flex;
    margin-bottom: 2.5rem;
    position: relative;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateX(5px);
    }
    
    &.highlight {
      .time-block .time {
        color: #5d3a17;
        font-weight: bold;
      }
      
      .event-block {
        .event-title {
          color: #5d3a17;
          font-weight: 700;
          font-size: 1.3rem;
          border-bottom: 1px solid rgba(93, 58, 23, 0.2);
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }
        
        &::before {
          border-color: rgba(93, 58, 23, 0.4);
        }
      }
    }
    
    &.section-header {
      margin-top: 2.5rem;
      margin-bottom: 0.5rem;
      
      .event-block {
        .event-title {
          color: #422600;
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(93, 58, 23, 0.4);
          padding-bottom: 0.5rem;
        }
      }
    }
    
    .time-block {
      width: 120px;
      flex-shrink: 0;
      position: relative;
      padding-right: 20px;
      
      .time-marker {
        position: absolute;
        right: 0;
        top: 10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid #4a3520;
        background-color: #e8e0cc;
        transition: all 0.3s ease;
      }
      
      .time {
        font-size: 0.9rem;
        color: #6c5b40;
        white-space: nowrap;
        transition: all 0.3s ease;
      }
    }

    .event-block {
      flex-grow: 1;
      padding: 1rem 1.5rem;
      position: relative;
      transition: all 0.3s ease;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        background-image: linear-gradient(
          to bottom,
          transparent 0%,
          rgba(74, 53, 32, 0.2) 20%,
          rgba(74, 53, 32, 0.2) 80%,
          transparent 100%
        );
        transition: all 0.3s ease;
      }
      
      .event-header {
        display: flex;
        align-items: center;
        cursor: ${props => props.subItems ? 'pointer' : 'default'};
        margin-bottom: 0.5rem;
        position: relative;
      }
      
      .event-icon {
        margin-right: 0.8rem;
        font-size: 1.2rem;
        min-width: 24px;
        text-align: center;
      }
      
      .event-actions {
        margin-left: auto;
        display: flex;
        gap: 0.8rem;
      }
      
      .expand-icon, .bookmark-icon {
        font-size: 0.9rem;
        color: #6c5b40;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      
      .event-title {
        font-size: 1.2rem;
        margin-bottom: 0;
        color: #4a3520;
        font-weight: 600;
        letter-spacing: 0.3px;
        transition: all 0.3s ease;
        flex-grow: 1;
      }
      
      .event-location {
        font-size: 0.9rem;
        margin-bottom: 0.6rem;
        color: #6c5b40;
        font-style: italic;
      }
      
      .event-description {
        font-size: 0.95rem;
        line-height: 1.8;
        color: #4a3520;
        white-space: pre-line;
        margin-bottom: 0;
        overflow: hidden;
      }
      
      .highlight-marker {
        position: absolute;
        right: 0;
        top: 0;
        width: 15px;
        height: 15px;
      }
      
      .timeline-visual {
        margin-top: 1rem;
        padding: 1rem;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 5px;
        border: 1px dashed rgba(74, 53, 32, 0.2);
        
        .timeline-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .timeline-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid #4a3520;
            margin-right: 1rem;
            position: relative;
            
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #4a3520;
              opacity: 0;
              transition: all 0.3s ease;
            }
            
            &.completed::after {
              opacity: 1;
            }
          }
          
          .timeline-date {
            min-width: 60px;
            font-weight: bold;
            color: #5d3a17;
          }
          
          .timeline-event {
            color: #4a3520;
          }
        }
      }
      
      .sub-items-container {
        margin-top: 1rem;
        padding-left: 1rem;
        border-left: 2px solid rgba(74, 53, 32, 0.1);
        overflow: hidden;
        
        .sub-item {
          margin-bottom: 1rem;
          padding: 1rem;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .sub-item-header {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          
          .sub-item-icon {
            margin-right: 0.5rem;
            font-size: 1rem;
          }
          
          .sub-item-title {
            font-size: 1rem;
            color: #5d3a17;
            margin-bottom: 0;
            font-weight: 600;
          }
          
          .sub-item-description {
            font-size: 0.9rem;
            line-height: 1.7;
            color: #4a3520;
            white-space: pre-line;
            padding-left: 1.5rem;
          }
        }
      }
    }
  }

  .manuscript-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    position: relative;
    z-index: 2;
    text-align: center;
    
    .decoration-line {
      width: 100%;
      height: 3px;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='3' viewBox='0 0 100 3' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,1.5 Q10,0 20,1.5 T40,1.5 T60,1.5 T80,1.5 T100,1.5' stroke='%234a3520' fill='none' stroke-width='0.5' stroke-dasharray='1,2'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      margin-bottom: 2rem;
    }
    
    .footer-note {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
      
      .translation {
        font-style: italic;
        color: #6c5b40;
        margin-top: 0.5rem;
      }
    }
    
    .navigation-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      
      .manuscript-link {
        margin: 0 0.5rem;
        color: #4a3520;
        text-decoration: none;
        position: relative;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(74, 53, 32, 0.2);
        border-radius: 20px;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: rgba(74, 53, 32, 0.1);
          text-decoration: none;
          transform: translateY(-2px);
          
          .link-decoration {
            transform: rotate(90deg);
          }
        }
        
        .link-decoration {
          display: inline-block;
          margin-left: 0.5rem;
          transition: transform 0.3s ease;
        }
      }
    }
    
    .footer-seal {
      margin-top: 2rem;
      display: inline-block;
      opacity: 0.7;
      transition: all 0.3s ease;
      
      &:hover {
        opacity: 1;
        transform: scale(1.05);
      }
      
      svg {
        width: 80px;
        height: 80px;
      }
    }
  }

  @media (max-width: 768px) {
    .manuscript-page {
      padding: 2rem 1.5rem;
    }
    
    .manuscript-header {
      padding: 0;
      
      .vedic-title {
        font-size: 2rem;
      }
      
      .decorative-corner {
        display: none;
      }
      
      .search-container {
        max-width: 100%;
        padding: 0 1rem;
      }
    }
    
    .manuscript-navigation {
      flex-direction: column;
      align-items: center;
      
      .day-selector {
        margin-bottom: 0.5rem;
      }
    }
    
    .manuscript-content {
      padding: 0 1rem;
    }
    
    .schedule-item {
      flex-direction: column;
      
      .time-block {
        width: 100%;
        margin-bottom: 0.8rem;
        padding-right: 0;
        display: flex;
        align-items: center;
        
        .time-marker {
          position: static;
          margin-right: 0.5rem;
        }
      }
      
      .event-block {
        padding-top: 0;
        padding-left: 0;
        
        &::before {
          display: none;
        }
      }
    }
    
    .manuscript-footer {
      .navigation-links {
        flex-direction: column;
        align-items: center;
      }
    }
  }
  
  @media (max-width: 576px) {
    .manuscript-header .vedic-title {
      font-size: 1.8rem;
    }
    
    .schedule-item {
      &.highlight .event-block .event-title {
        font-size: 1.1rem;
      }
      
      &.section-header .event-block .event-title {
        font-size: 1.3rem;
      }
    }
  }
`;

export default Schedule;