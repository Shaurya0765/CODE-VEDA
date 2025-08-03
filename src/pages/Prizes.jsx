import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
         







// ===================================
//            Code by Mohit Aggarwal
// ===================================






const VedicPrizeSection = () => {
  const bgRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Base color and accents
  const baseColor = "#745b4f";
  const accentColor = "#c0a062"; // Complementary gold
  const textColor = "#f5f5dc"; // Cream text

  // Dynamic background effect



  const prizes = [
    {
      id: 1,
      rank: "1st",
      title: "Brahma Ratna",
      sanskrit: "ब्रह्म रत्न",
      description: "The Supreme Creator's Jewel for exceptional excellence",
      amount: "₹25,000",
      perks: ["Gold Trophy", "ISRO Tech Tour", "1-Year Mentorship"],
      icon: "🕉️",
      size: "w-80 h-96",
    },
    {
      id: 2,
      rank: "2nd",
      title: "Vishnu Padma",
      sanskrit: "विष्णु पद्म",
      description: "The Preserver's Lotus for remarkable achievement",
      amount: "₹10,000",
      perks: ["Silver Trophy", "6-Month Course", "CTO Sessions"],
      icon: "🪷",
      size: "w-72 h-88",
    },
    {
      id: 3,
      rank: "3rd",
      title: "Shankha Tejas",
      sanskrit: "शंख तेजस्",
      description: "The Conch of Brilliance for outstanding potential",
      amount: "₹5,000",
      perks: ["Bronze Trophy", "Workshops", "Dev Toolkit"],
      icon: "🐚",
      size: "w-72 h-88",
    },
    {
      id: 4,
      rank: "Fresher",
      title: "Agni Ketu",
      sanskrit: "अग्नि केतु",
      description: "The Banner of New Fire for promising beginners",
      amount: "₹10,000",
      perks: ["Certificate", "Starter Kit", "Mentorship"],
      icon: "🔥",
      size: "w-64 h-80",
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const prizeVariants = {
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

  return (
    <section
      ref={ref}
      className="relative py-14 px-4 overflow-hidden min-h-screen"
      style={{ backgroundColor: baseColor }}
    >
      {/* Yantra patterns */}
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="absolute border-4 border-amber-800/10 rounded-full pointer-events-none"
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

      {/* Floating Sanskrit characters */}
      {["ॐ", "ह्रीं", "श्रीं", "क्लीं"].map((char, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300 text-4xl pointer-events-none"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [0, -100],
            x: [0, Math.random() > 0.5 ? 20 : -20],
            rotate: [0, 360],
            opacity: [1],
          }}
          transition={{
            duration: 30 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            fontSize: `${Math.random() * 3 + 2}rem`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}%`,
          }}
        >
          {char}
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/10 to-black/30"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Header with Revealing Animation */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-2 text-center overflow-hidden"
          style={{
            color: textColor,
            fontFamily: "'Yatra One', cursive",
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          Vedic Achievement Honors
        </motion.h2>
        <div className="flex items-center justify-center my-8">
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
        <motion.p
          className="text-sm md:text-xl text-center"
          style={{ color: textColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Where ancient wisdom illuminates modern achievement
        </motion.p>
      </div>

      {/* Prize Pyramid */}
      <motion.div
        className="relative min-h-[600px] flex flex-col items-center mt-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Desktop layout - Only visible on md and up */}
        <div className="hidden md:block w-full h-full">
          {/* 1st Prize - Top Center */}
          <motion.div
            variants={prizeVariants}
            className={`absolute top-0 left-[38%] transform -translate-x-1/2 ${prizes[0].size}  rounded-2xl p-6 md:p-8 border-l-4 shadow-2xl z-10 backdrop-blur-sm mt-8 md:mt-0`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderColor: accentColor,
              color: textColor,
            }}
            whileHover={{ scale: 1.09 }}
          >
         <div
  className="absolute -top-6 -left-12 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full text-white font-bold text-xl md:text-2xl shadow-2xl overflow-hidden"
  style={{ 
    backgroundColor: 'transparent',
    boxShadow: `0 0 30px ${accentColor}80`,
    border: `2px solid ${accentColor}`
  }}
>
  {/* Cosmic background */}
  <motion.div 
    className="absolute inset-0 rounded-full"
    style={{
      background: `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`,
      scale: 1.5
    }}
    animate={{
      rotate: 360,
      background: [
        `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`,
        `radial-gradient(circle at 70% 70%, ${accentColor}20, #000000)`,
        `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`
      ]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  />
  
  {/* Rotating Sanskrit Yantra */}
  <motion.div
    className="absolute opacity-40"
    animate={{ rotate: -360 }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path 
        d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" 
        fill="none" 
        stroke={accentColor} 
        strokeWidth="1"
      />
      <text 
        x="50" y="52" 
        textAnchor="middle" 
        fontSize="12" 
        fill={accentColor}
        fontFamily="sans-serif"
      >
        {Array(8).fill('ॐ').join(' ')}
      </text>
    </svg>
  </motion.div>
  
  {/* Main Rank Text - Pulsing with Divine Energy */}
  <motion.div
    className="relative z-10"
  >
    {prizes[0].rank}
  </motion.div>
  
  {/* Particle Constellation */}
  {[...Array(12)].map((_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    const radius = 30;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          backgroundColor: accentColor,
          width: i % 3 === 0 ? '4px' : '2px',
          height: i % 3 === 0 ? '4px' : '2px',
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          backgroundColor: [accentColor, textColor, accentColor]
        }}
        transition={{
          duration: 3 + Math.random(),
          delay: i * 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )
  })}
  
  {/* Divine Light Rays */}
  <motion.div 
    className="absolute inset-0 rounded-full overflow-hidden"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 60,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute top-0 left-1/2 w-1 h-10 origin-bottom"
        style={{
          backgroundColor: accentColor,
          transform: `rotate(${i * 45}deg) translateX(-50%)`,
          opacity: 0.3
        }}
      />
    ))}
  </motion.div>
</div>

          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  className="text-xl md:text-3xl font-bold"
                  style={{
                    color: textColor,
                    fontFamily: "'Yatra One', cursive",
                  }}
                >
                  {prizes[0].title}
                </h3>
                <p className="text-xs md:text-sm italic opacity-80">
                  {prizes[0].sanskrit}
                </p>
              </div>
              <span className="text-3xl md:text-5xl" style={{ color: accentColor }}>
                {prizes[0].icon}
              </span>
            </div>
            <p className="opacity-90 text-xs md:text-sm mb-4">
              {prizes[0].description}
            </p>
            <div
              className="text-2xl md:text-4xl font-bold my-4"
              style={{ color: accentColor }}
            >
              ₹15,000
              <div className="text-sm md:text-base font-normal opacity-80">
                (Cash + Swags)
              </div>
            </div>
            {/* <ul className="mt-auto space-y-1 md:space-y-2">
              {prizes[0].perks.map((perk, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2" style={{ color: accentColo r }}>
                    ✦
                  </span>
                  <span className="opacity-90 text-xs md:text-sm">{perk}</span>
                </li>
              ))}
            </ul> */}
          </div>
        </motion.div>
    </div>

        {/* Mobile layout - Only visible below md */}
        <div className="flex flex-col items-center w-full mt-8 gap-6 md:hidden">
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={prizes[idx].id}
              variants={prizeVariants}
              custom={idx}
              className="rounded-2xl p-4 border-l-4 shadow-xl backdrop-blur-sm w-full max-w-xs relative"
              style={{
                backgroundColor:
                  idx === 0
                    ? "rgba(255, 255, 255, 0.05)"
                    : idx === 1
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(255, 255, 255, 0.04)",
                borderColor: idx === 0 ? accentColor : idx === 1 ? "#a8a8a8" : "#cd7f32",
                color: textColor,
              }}
              whileHover={{ scale: 1.08 }}
            >
              {/* --- Place your animated .rank badge and prize content here --- */}
              {/* Example: */}
              {/* ...copy the corresponding <div className="absolute ..."> and content for each prize here... */}
              {/* ...and the rest of the prize card content... */}
              {/* For brevity, you can use your existing code for each prize's badge and content */}
              {/* Example for 1st prize: */}
              {idx === 0 && (
                  <div
  className="absolute -top-6 -left-[18px] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full text-white font-bold text-xl md:text-2xl shadow-2xl overflow-hidden"
  style={{ 
    backgroundColor: 'transparent',
    boxShadow: `0 0 30px ${accentColor}80`,
    border: `2px solid ${accentColor}`
  }}
>
  {/* Cosmic background */}
  <motion.div 
    className="absolute inset-0 rounded-full"
    style={{
      background: `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`,
      scale: 1.5
    }}
    animate={{
      rotate: 360,
      background: [
        `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`,
        `radial-gradient(circle at 70% 70%, ${accentColor}20, #000000)`,
        `radial-gradient(circle at 30% 30%, ${accentColor}20, #000000)`
      ]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  />
  
  {/* Rotating Sanskrit Yantra */}
  <motion.div
    className="absolute opacity-40"
    animate={{ rotate: -360 }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path 
        d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" 
        fill="none" 
        stroke={accentColor} 
        strokeWidth="1"
      />
      <text 
        x="50" y="52" 
        textAnchor="middle" 
        fontSize="12" 
        fill={accentColor}
        fontFamily="sans-serif"
      >
        {Array(8).fill('ॐ').join(' ')}
      </text>
    </svg>
  </motion.div>
  
  {/* Main Rank Text - Pulsing with Divine Energy */}
  <motion.div
    className="relative z-10"
  >
    {prizes[0].rank}
  </motion.div>
  
  {/* Particle Constellation */}
  {[...Array(12)].map((_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    const radius = 30;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          backgroundColor: accentColor,
          width: i % 3 === 0 ? '4px' : '2px',
          height: i % 3 === 0 ? '4px' : '2px',
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          backgroundColor: [accentColor, textColor, accentColor]
        }}
        transition={{
          duration: 3 + Math.random(),
          delay: i * 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )
  })}
  
  {/* Divine Light Rays */}
  <motion.div 
    className="absolute inset-0 rounded-full overflow-hidden"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 60,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute top-0 left-1/2 w-1 h-10 origin-bottom"
        style={{
          backgroundColor: accentColor,
          transform: `rotate(${i * 45}deg) translateX(-50%)`,
          opacity: 0.3
        }}
      />
    ))}
  </motion.div>
</div>
              )}
              {idx === 1 && (
                <div
                  className="absolute -top-5 -left-5 w-14 h-14 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-xl overflow-hidden"
                  style={{ 
                    backgroundColor: '#a8a8a8',
                    boxShadow: `0 0 20px #a8a8a880`
                  }}
                >
                  {/* Rotating Chakra */}
                  <motion.div
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg width="60" height="60" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff80" strokeWidth="2" strokeDasharray="5,5" />
                      {[...Array(8)].map((_, i) => (
                        <rect 
                          key={i}
                          x="45" y="5" 
                          width="10" height="10" 
                          fill="#ffffff80"
                          transform={`rotate(${i * 45} 50 50)`}
                        />
                      ))}
                    </svg>
                  </motion.div>
                  <motion.div 
                    className="relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      textShadow: ['0 0 3px #fff', '0 0 8px #fff', '0 0 3px #fff']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    {prizes[1].rank}
                  </motion.div>
                </div>
              )}
              {idx === 2 && (
                <div
                  className="absolute -top-5 -left-5 w-14 h-14 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-lg overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, #cd7f32, #a05a2c)`,
                    boxShadow: `0 0 15px #cd7f3280`
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      background: [
                        `radial-gradient(circle at center, #cd7f32, #a05a2c)`,
                        `radial-gradient(circle at center, #ff9e4d, #cd7f32)`,
                        `radial-gradient(circle at center, #cd7f32, #a05a2c)`
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  />
                  <motion.div 
                    className="relative z-10"
                    animate={{
                      y: [0, -2, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {prizes[2].rank}
                  </motion.div>
                </div>
              )}
              {/* --- Prize content --- */}
              <div className="h-full flex flex-col mt-8">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{
                        color: textColor,
                        fontFamily: "'Yatra One', cursive",
                      }}
                    >
                      {prizes[idx].title}
                    </h3>
                    <p className="text-xs italic opacity-80">{prizes[idx].sanskrit}</p>
                  </div>
                  <span className="text-4xl" style={{ color: accentColor }}>
                    {prizes[idx].icon}
                  </span>
                </div>
                <p className="opacity-90 text-sm mb-3">{prizes[idx].description}</p>
                <div
                  className="text-3xl font-bold my-3"
                  style={{ color: accentColor }}
                >
                  ₹15,000
                  <div className="text-sm font-normal opacity-80">
                    (Cash + Swags)
                  </div>
                </div>
                {/* <ul className="mt-auto space-y-1.5">
                  {prizes[idx].perks.map((perk, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2" style={{ color: accentColor }}>
                        ✦
                      </span>
                      <span className="opacity-90 text-sm">{perk}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop layout - Original positioning */}
        <div className="hidden md:block">
          {/* 2nd Prize - Left */}
          <motion.div
            variants={prizeVariants}
            custom={1}
            className={`absolute top-[300px] left-[12%] transform -translate-x-1/2 ${prizes[1].size} rounded-2xl p-4 md:p-6 border-l-4 shadow-xl backdrop-blur-sm z-5`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: "#a8a8a8", // Silver
              color: textColor,
            }}
            whileHover={{ scale: 1.08 }}
          >
           <div
  className="absolute -top-5 -left-5 w-14 h-14 md:w-18 md:h-18 flex items-center justify-center rounded-full text-white font-bold text-lg md:text-xl shadow-xl overflow-hidden"
  style={{ 
    backgroundColor: '#a8a8a8',
    boxShadow: `0 0 20px #a8a8a880`
  }}
>
  {/* Rotating Sudarshan Chakra */}
  <motion.div
    className="absolute"
    animate={{ rotate: 360 }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg width="70" height="70" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff80" strokeWidth="2" strokeDasharray="5,5" />
      {[...Array(12)].map((_, i) => (
        <rect 
          key={i}
          x="45" y="5" 
          width="10" height="10" 
          fill="#ffffff80"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </svg>
  </motion.div>
  
  {/* Main Rank Text */}
  <motion.div
    className="relative z-10"
    initial={{ scale: 0 }}
    animate={{ 
      scale: [1, 1.05, 1],
      textShadow: [
        `0 0 3px #fff`,
        `0 0 10px #fff`,
        `0 0 3px #fff`
      ]
    }}
    transition={{
      duration: 4,
      repeat: Infinity
    }}
  >
    {prizes[1].rank}
  </motion.div>
  
  {/* Floating Lotus Petals */}
  {[...Array(6)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-xs"
      style={{
        color: '#ffffff80',
        rotate: i * 60
      }}
      animate={{
        y: [0, -5, 0],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 3 + i,
        delay: i * 0.3,
        repeat: Infinity
      }}
    >
      🪷
    </motion.div>
  ))}
</div>
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      color: textColor,
                      fontFamily: "'Yatra One', cursive",
                    }}
                  >
                    {prizes[1].title}
                  </h3>
                  <p className="text-xs italic opacity-80">
                    {prizes[1].sanskrit}
                  </p>
                </div>
                <span className="text-4xl" style={{ color: accentColor }}>
                  {prizes[1].icon}
                </span>
              </div>
              <p className="opacity-90 text-sm mb-3">{prizes[1].description}</p>
              <div
                className="text-3xl font-bold my-3"
                style={{ color: accentColor }}
              >
                ₹10,000
                <div className="text-sm font-normal opacity-80">
                  (Cash + Swags)
                </div>
              </div>
              {/* <ul className="mt-auto space-y-1.5">
                {prizes[1].perks.map((perk, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2" style={{ color: accentColor }}>
                      ✦
                    </span>
                    <span className="opacity-90 text-sm">{perk}</span>
                  </li>
                ))}
              </ul> */}
            </div>
          </motion.div>

          {/* 3rd Prize - Right */}
          <motion.div
            variants={prizeVariants}
            custom={2}
            className={`absolute top-[300px] left-[67%] transform -translate-x-1/2 ${prizes[2].size} rounded-2xl p-4 md:p-6 border-l-4 shadow-xl backdrop-blur-sm z-5`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: "#cd7f32", // Bronze
              color: textColor,
            }}
            whileHover={{ scale: 1.08 }}
          >
            <div
  className="absolute -top-5 -left-8 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full text-white font-bold text-lg shadow-lg overflow-hidden"
  style={{ 
    background: `linear-gradient(135deg, #cd7f32, #a05a2c)`,
    boxShadow: `0 0 15px #cd7f3280`
  }}
>
  {/* Pulsing Core */}
  <motion.div
    className="absolute inset-0 rounded-full"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
      background: [
        `radial-gradient(circle at center, #cd7f32, #a05a2c)`,
        `radial-gradient(circle at center, #ff9e4d, #cd7f32)`,
        `radial-gradient(circle at center, #cd7f32, #a05a2c)`
      ]
    }}
    transition={{
      duration: 3,
      repeat: Infinity
    }}
  />
  
  {/* Trishula Symbol */}
  <motion.div 
    className="relative z-10 flex flex-col items-center"
    animate={{
      y: [0, -2, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{
      duration: 3,
      repeat: Infinity
    }}
  >
    <div className="text-xl">🔱</div>
    <div className="text-sm font-bold">{prizes[2].rank}</div>
  </motion.div>
  
  {/* Fire Particles */}
  {[...Array(8)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute text-xs"
      style={{
        color: ['#ff9e4d', '#ff4500', '#ffcc33'][Math.floor(Math.random() * 3)],
        x: Math.cos((i * 45) * Math.PI/180) * 25,
        y: Math.sin((i * 45) * Math.PI/180) * 25
      }}
      animate={{
        y: [0, -10, 0],
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0]
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay: i * 0.2,
        repeat: Infinity
      }}
    >
      {['🔥', '✨', '⚡'][Math.floor(Math.random() * 3)]}
    </motion.div>
  ))}
</div>
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      color: textColor,
                      fontFamily: "'Yatra One', cursive",
                    }}
                  >
                    {prizes[2].title}
                  </h3>
                  <p className="text-xs italic opacity-80">
                    {prizes[2].sanskrit}
                  </p>
                </div>
                <span className="text-4xl" style={{ color: accentColor }}>
                  {prizes[2].icon}
                </span>
              </div>
              <p className="opacity-90 text-sm mb-3">{prizes[2].description}</p>
              <div
                className="text-3xl font-bold my-3"
                style={{ color: accentColor }}
              >
               To Be Announced Soon...
              </div>
              {/* <ul className="mt-auto space-y-1.5">
                {prizes[2].perks.map((perk, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2" style={{ color: accentColor }}>
                      ✦
                    </span>
                    <span className="opacity-90 text-sm">{perk}</span>
                  </li>
                ))}
              </ul> */}
            </div>
          </motion.div>
        </div>

        {/* Animated connecting lines (desktop only) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
          {/* Line from 1st to 2nd */}
          <motion.line
            x1="50%"
            y1="150"
            x2="20%"
            y2="350"
            stroke={accentColor}
            strokeOpacity="0.4"
            strokeWidth="3"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5, // Animation duration
            }}
          />

          {/* Line from 1st to 3rd */}
          <motion.line
            x1="50%"
            y1="150"
            x2="80%"
            y2="350"
            stroke={accentColor}
            strokeOpacity="0.4"
            strokeWidth="3"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5, // Animation duration
            }}
          />
        </svg>
      </motion.div>

      {/* Vedic Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-20 pt-8 border-t max-w-2xl mx-auto"
        style={{ borderColor: `${accentColor}30` }}
      >
        <p className="text-xl italic" style={{ color: textColor }}>
          "Knowledge is the torch that illuminates the path to greatness"
        </p>
        <p className="mt-2" style={{ color: accentColor }}>
          - Rig Veda
        </p>
      </motion.div>
      
    </section>
  );
};

export default VedicPrizeSection;