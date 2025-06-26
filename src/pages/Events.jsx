import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from 'styled-components';




// ===================================
//            Code by Mohit Aggarwal
// ===================================


// Styled component for event description formatting
const StyledEventPage = styled.div`
  .event-description {
    font-size: 0.95rem;
    line-height: 1.8;
    color: #4a3520;
    white-space: pre-line;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .event-description {
      font-size: 0.85rem;
      line-height: 1.6;
    }
  }
`;

const Event = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Color scheme
  const baseColor = "#745b4f";
  const accentColor = "#c0a062";
  const textColor = "#f5f5dc";

  // 24-Hour Hackathon Timeline
  const timeline = [
    {
      time: "08:00",
      title: "Registration & Breakfast",
      description: "➤ Check-in and registration for all participants\n➤ Complimentary breakfast provided\n➤ Pick up your participant kits",
      phase: "Preparation",
    },
    { 
      time: "09:00", 
      title: "Opening Ceremony", 
      description: "➤ Welcome address by organizers\n➤ Introduction to the hackathon theme and rules\n➤ Special keynote on Digital Dharma", 
      phase: "Kickoff" 
    },
    { 
      time: "09:30", 
      title: "Team Formation", 
      description: "➤ Networking session for solo participants\n➤ Final team registrations\n➤ Mentor introductions", 
      phase: "Teamwork" 
    },
    { 
      time: "10:00", 
      title: "Hackathon Begins!", 
      description: "➤ Official start of the coding period\n➤ Track selection finalization\n➤ Initial mentor check-ins", 
      phase: "Coding" 
    },
    {
      time: "06:00",
      title: "Sunrise Meditation",
      description: "➤ Optional guided meditation session\n➤ Rejuvenate your mind and body\n➤ Light refreshments provided",
      phase: "Recharge",
    },
    { 
      time: "07:00", 
      title: "Final Coding Push", 
      description: "➤ Last sprint before submission deadline\n➤ Technical assistance available\n➤ Project refinement", 
      phase: "Coding" 
    },
    {
      time: "08:00",
      title: "Project Submission",
      description: "➤ Final code submission deadline\n➤ Project documentation submission\n➤ Preparation for presentations",
      phase: "Deadline",
    },
    { 
      time: "09:00", 
      title: "Presentations", 
      description: "➤ Each team presents their solution\n➤ 5 minutes per team + Q&A\n➤ Evaluation begins", 
      phase: "Showcase" 
    },
    {
      time: "10:30",
      title: "Judging & Deliberation",
      description: "➤ Panel evaluation of all projects\n➤ Scoring based on innovation, implementation and impact\n➤ Final decision making",
      phase: "Evaluation",
    },
    { 
      time: "11:00", 
      title: "Closing Ceremony", 
      description: "➤ Announcement of winners\n➤ Prize distribution\n➤ Closing remarks and next steps", 
      phase: "Awards" 
    },
  ];

  // Phase colors
  const phaseColors = {
    Preparation: "bg-blue-900/30",
    Kickoff: "bg-purple-900/30",
    Teamwork: "bg-indigo-900/30",
    Coding: "bg-green-900/30",
    Break: "bg-amber-900/30",
    Guidance: "bg-teal-900/30",
    Recharge: "bg-pink-900/30",
    Energy: "bg-red-900/30",
    Focus: "bg-gray-900/30",
    Deadline: "bg-yellow-900/30",
    Showcase: "bg-blue-900/30",
    Evaluation: "bg-purple-900/30",
    Awards: "bg-indigo-900/30",
  };

  // Floating elements state
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Create floating elements
      const elements = [];
      const elementTypes = ["➤", "•", "॥", "ॐ", "✧", "✦", "❉", "⁂"];

      for (let i = 0; i < 15; i++) {
        elements.push({
          id: i,
          type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
          size: Math.random() * 20 + 10,
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: Math.random() * 0.5 + 0.2,
          delay: Math.random() * 5,
        });
      }

      setFloatingElements(elements);
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Smoother snake path
  const generateSnakePath = () => {
    const points = [];
    const segments = timeline.length;
    const amplitude = 40;
    const wavelength = 100;

    for (let i = 0; i < segments; i++) {
      const x = 50 + (i % 2 === 0 ? -amplitude : amplitude);
      const y = i * wavelength - wavelength / 2;

      if (i === 0) {
        points.push(`M50,0 C50,20 ${x},40 50,60`);
      } else {
        points.push(`C${x},${y + 40} 50,${y + 60} 50,${y + 80}`);
      }
    }

    return points.join(" ");
  };

  // Add this after your existing generateSnakePath function
  const generateMobileSnakePath = () => {
    return `M 20,0 ${Array(timeline.length)
      .fill()
      .map((_, i) => {
        const y = i * 100;
        return `L 20,${y}`;
      })
      .join(' ')}`;
  };

  // Floating element animation
  const floatingVariants = {
    float: {
      y: ["0%", "-20%", "0%"],
      x: ["0%", "5%", "0%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Add these new animation variants after your existing variants
  const mobileTimelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: [1, 1.2, 1],
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      }
    }),
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <StyledEventPage
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: baseColor, color: textColor }}
    >
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="absolute border-2 border-amber-800/20 rounded-full pointer-events-none"
          style={{
            width: `${i * 10 + 10}%`,
            height: `${i * 10 + 10}%`,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
            animation: `spin ${60 - i * 5}s linear infinite`,
          }}
        />
      ))}
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
              opacity: 0.3,
            }}
            variants={floatingVariants}
            initial="float"
            animate="float"
            transition={{
              duration: element.speed * 20,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {element.type}
          </motion.div>
        ))}

        {/* Animated dots pattern */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: accentColor,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>




      {/* Content */}
      <div className="relative z-10">
        {/* Snake Timeline Section */}
        <section className="py-10 md:py-20 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center"
              style={{ color: accentColor, fontFamily: "'Yatra One', cursive" }}
            >
              24-Hour Hackathon Timeline
            </motion.h2>







            <div className="flex items-center justify-center my-8 md:my-2">
          <div
            className="h-[2px] w-16 md:w-24"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          ></div>
          <motion.span
            className="mx-4 md:mx-6 text-3xl md:text-4xl"
            style={{ color: accentColor }}
            animate={{
              scale: [1, 1.2, 1.3],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            ॐ
          </motion.span>
          <div
            className="h-[2px] w-16 md:w-24"
            style={{
              background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            }}
          ></div>
        </div>







            {/* Desktop Timeline (Hidden on mobile) */}
            <div className="hidden md:block relative">
              <svg
                className="absolute w-full h-full left-0 top-0 pointer-events-none"
                viewBox="0 0 100 1000"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  d={generateSnakePath()}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeDasharray="5,3"
                />
              </svg>

              {/* Existing desktop timeline layout */}
              <div className="relative" style={{ height: `${timeline.length * 100}px` }}>
                {timeline.map((item, i) => {
                  const x = i % 2 === 0 ? "30%" : "70%";
                  const y = `${i * 100}px`;

                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      custom={i}
                      className={`absolute w-96 ${
                        i % 2 === 0 ? "left-0" : "right-0"
                      }`}
                      style={{ top: y }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className={`p-6 rounded-lg border-l-4 backdrop-blur-sm ${
                          phaseColors[item.phase]
                        } mx-4`}
                        style={{
                          borderColor: accentColor,
                          boxShadow: `0 4px 6px -1px ${accentColor}20`,
                        }}
                      >
                        <div className="flex items-start">
                          <div
                            className="text-2xl mr-4"
                            style={{ color: accentColor }}
                          >
                            {item.icon}
                          </div>
                          <div className="w-full">
                            <div className="flex items-center mb-1">
                              <div
                                className="font-mono font-bold mr-3"
                                style={{ color: accentColor }}
                              >
                                {item.time}
                              </div>
                              <div className="text-xs px-2 py-1 rounded-full bg-black/20">
                                {item.phase}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            {item.description && (
                              <div className="mt-2 text-sm whitespace-pre-line event-description">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Timeline (Hidden on desktop) */}
            <div className="md:hidden relative">
              {/* Mobile Snake Path */}
              <svg
                className="absolute w-full h-full left-0 top-0 pointer-events-none"
                style={{ height: `${timeline.length * 100}px` }}
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d={generateMobileSnakePath()}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                />
              </svg>

              {/* Timeline Items */}
              <div className="space-y-4 relative">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={mobileTimelineVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="relative ml-8"
                  >
                    {/* Animated connection line */}
                    {i < timeline.length - 1 && (
                      <motion.div
                        className="absolute h-full w-px left-[-24px] top-[28px]"
                        initial={{ height: 0 }}
                        animate={{ height: "calc(100% + 1rem)" }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        style={{
                          background: `linear-gradient(to bottom, ${accentColor}50, transparent)`,
                        }}
                      />
                    )}

                    <motion.div
                      className={`p-4 rounded-lg border-l-4 backdrop-blur-sm ${phaseColors[item.phase]}`}
                      style={{
                        borderColor: accentColor,
                        boxShadow: `0 4px 6px -1px ${accentColor}20`,
                      }}
                      whileHover={{
                        boxShadow: `0 8px 12px -1px ${accentColor}40`,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Content */}
                      <div className="flex items-start">
                        <motion.div
                          className="text-xl mr-3"
                          style={{ color: accentColor }}
                          whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <motion.div
                            className="flex items-center mb-1 flex-wrap gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.2 }}
                          >
                            <div
                              className="font-mono font-bold text-sm"
                              style={{ color: accentColor }}
                            >
                              {item.time}
                            </div>
                            <div className="text-xs px-2 py-0.5 rounded-full bg-black/20">
                              {item.phase}
                            </div>
                          </motion.div>
                          <motion.h3
                            className="text-base font-bold mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.2 + 0.3 }}
                          >
                            {item.title}
                          </motion.h3>
                          {item.description && (
                            <motion.div 
                              className="mt-1 text-xs whitespace-pre-line event-description"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.2 + 0.4 }}
                            >
                              {item.description}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Animated dot connector */}
                    <motion.div
                      variants={dotVariants}
                      custom={i}
                      initial="hidden"
                      animate={["visible", "pulse"]}
                      className="absolute w-3 h-3 rounded-full left-[-24px] top-6"
                      style={{
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${accentColor}80`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </StyledEventPage>
  );
};

export default Event;
