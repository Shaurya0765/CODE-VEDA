import { FileText, Star, Users, Target, Award, Calendar, Sparkles, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants for reusability
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};







// ===================================
//            Code by Mohit Aggarwal
// ===================================







export default function DualityAITrack() {
  const targetDate = new Date("2025-09-13T09:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [bgIndex, setBgIndex] = useState(0);

  // Background images for dynamic effect
  const backgrounds = [
    "radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(127,29,29,0.1) 70%, rgba(99,77,67,0.2) 100%)",
    "radial-gradient(circle, rgba(127,29,29,0.15) 0%, rgba(217,119,6,0.1) 70%, rgba(99,77,67,0.2) 100%)",
    "radial-gradient(circle, rgba(99,77,67,0.2) 0%, rgba(127,29,29,0.15) 70%, rgba(217,119,6,0.1) 100%)"
  ];

  function getTimeRemaining() {
    const total = targetDate - new Date();
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    
    // Change background every 8 seconds
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    
    return () => {
      clearInterval(interval);
      clearInterval(bgInterval);
    };
  }, []);

  return (
    <div className="min-h-screen text-[#f3e9c6] font-sans relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        className="fixed inset-0 transition-all duration-1000 ease-in-out z-0"
        style={{ background: backgrounds[bgIndex] }}
        key={bgIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Vedic Pattern Overlay */}
      <motion.div 
        className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')] opacity-20 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      
      {/* Decorative Gold Elements */}
      <motion.div 
        className="fixed top-20 left-10 w-40 h-40 bg-[#d97706] opacity-20 rounded-full blur-xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="fixed bottom-20 right-20 w-60 h-60 bg-[#7f1d1d] opacity-20 rounded-full blur-xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Gold Ornamental Borders */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d97706] to-transparent z-20"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d97706] to-transparent z-20"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.header 
          className="relative text-center py-20 overflow-hidden bg-gradient-to-b from-[#352518] via-[#3e0b0b] to-[#352518]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Decorative Corner Elements */}
          <motion.div 
            className="absolute top-5 left-5 w-16 h-16 border-t-4 border-l-4 border-[#d97706] opacity-60"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 0.6, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-5 right-5 w-16 h-16 border-t-4 border-r-4 border-[#d97706] opacity-60"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 0.6, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-5 left-5 w-16 h-16 border-b-4 border-l-4 border-[#d97706] opacity-60"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 0.6, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-5 right-5 w-16 h-16 border-b-4 border-r-4 border-[#d97706] opacity-60"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 0.6, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 z-20">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 1, type: "spring" }}
                className="border-2 border-[#d97706] rounded-full p-2 bg-[#352518]/80 shadow-lg backdrop-blur-md"
              >
                <motion.div 
                  className="h-24 w-24 bg-gradient-to-r from-[#d97706] to-[#7f1d1d] rounded-full flex items-center justify-center text-white"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <img src="/duality2.png" alt="" className="rounded-full" />
                </motion.div>
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#f3e9c6] font-serif px-4 pt-12 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              DualityAI Track
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "300px" }}
              transition={{ delay: 0.8, duration: 1, type: "spring" }}
              className="h-1 bg-gradient-to-r from-[#d97706] to-[#7f1d1d] mx-auto mt-4 rounded-full"
            />
            
            <motion.p 
              className="mt-6 text-lg md:text-xl text-[#f3e9c6]/90 italic px-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Bridging Vedic Wisdom with Modern AI
            </motion.p>
          </motion.div>
          
          {/* Register Button */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(217,119,6,0.5)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            href="https://docs.google.com/forms/d/e/1FAIpQLSeh169j_jNCN22rQHb9IbGFkcN4PQA3h-eRgZJJIBtsDrH_rg/viewform"
            className="mt-10 inline-block z-50 bg-gradient-to-r from-[#d97706] to-[#7f1d1d] text-[#f3e9c6] font-semibold px-8 md:px-10 py-4 rounded-full shadow-2xl text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Register Now</span>
            <div className="absolute inset-0  bg-gradient-to-r from-[#7f1d1d] to-[#d97706] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {/* Vedic Pattern Overlay */}
          <motion.div 
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/indian-silk.png')] opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </motion.header>

        {/* Countdown */}
        <motion.section 
          className="text-center py-6 px-4 relative bg-gradient-to-b from-[#352518] to-[#1a120b]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10 z-0" />
          <div className="relative z-10">
            <motion.div 
              className="flex flex-row justify-center gap-5"
              variants={staggerContainer}
            >
              <motion.div
                variants={slideUp}
                className="time flex flex-row items-center justify-between mb-8 px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r from-[#d97706]/80 to-[#7f1d1d]/80 border border-[#d97706] max-w-md"
              >
                <div className="flex items-center space-x-2 ml-4">
                  <Calendar className="text-[#f3e9c6]" size={22} />
                  <span className="font-semibold text-lg md:text-xl text-[#f3e9c6]">Sep 13, 2025</span>
                </div>
              </motion.div>
              <motion.div
                variants={slideUp}
                className="time flex flex-row items-center justify-between mb-8 px-6 py-3 rounded-xl shadow-lg bg-gradient-to-r from-[#d97706]/80 to-[#7f1d1d]/80 border border-[#d97706] max-w-md"
              >
                <div className="flex items-center space-x-2  mr-4">
                  <MapPin className="text-[#f3e9c6]" size={22} />
                  <span className="text-base md:text-lg text-[#f3e9c6]/90">Microsoft, Gurugram</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xl md:text-2xl font-bold max-w-3xl mx-auto"
              variants={staggerContainer}
            >
              {Object.entries(timeLeft).map(([label, value], i) => (
                <motion.div
                  key={label}
                  variants={scaleIn}
                  className="bg-gradient-to-tr from-[#7f1d1d] to-[#d97706] text-[#f3e9c6] rounded-xl px-4 py-3 shadow-xl relative overflow-hidden border border-[#d97706]/30"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold mb-1"
                    key={value}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-sm font-normal uppercase tracking-wider">{label}</div>
                  <div className="absolute -top-3 -right-3 text-[#f3e9c6]/10">
                    <Star size={40} fill="currentColor" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* About */}
        <motion.section 
          className="px-6 md:px-12 py-16 max-w-7xl mx-auto text-center relative bg-gradient-to-b from-[#1a120b] to-[#352518]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <motion.div 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-[#d97706]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#f3e9c6] font-serif mb-6 relative"
            variants={slideUp}
          >
            About the Track
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-[#d97706] to-[#7f1d1d] mx-auto mt-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "96px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-[#f3e9c6]/90"
            variants={slideUp}
          >
            The DuAlityAI Track is where tradition meets innovation. We challenge
            participants to harness AI for sustainability, healthcare, and
            automation — all inspired by Vedic principles of balance and wisdom.
            Join us in this unique convergence of ancient knowledge and cutting-edge
            technology to create solutions that honor both past and future.
          </motion.p>
          
          <motion.div 
            className="mt-10 grid md:grid-cols-3 gap-6 text-left"
            variants={staggerContainer}
          >
            {[
              {
                title: "Vedic Inspiration",
                desc: "Draw from ancient wisdom to create ethical AI solutions that respect natural balance and harmony.",
                icon: <Sparkles className="text-[#d97706]" />
              },
              {
                title: "Modern Technology",
                desc: "Utilize the latest AI frameworks and tools to build innovative, practical applications.",
                icon: <Target className="text-[#d97706]" />
              },
              {
                title: "Holistic Approach",
                desc: "Combine technical excellence with philosophical depth for truly transformative solutions.",
                icon: <Award className="text-[#d97706]" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={scaleIn}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-b from-[#7f1d1d]/30 to-[#352518]/70 p-6 rounded-xl shadow-md border border-[#d97706]/20"
              >
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold text-lg text-[#d97706] mb-2">{item.title}</h3>
                <p className="text-sm text-[#f3e9c6]/80">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Tasks */}
        <motion.section 
          className="px-6 md:px-12 py-16 bg-gradient-to-b from-[#352518] to-[#1a120b] text-[#f3e9c6] relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-10" />
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-10 text-center font-serif"
              variants={slideUp}
            >
              Hackathon Tasks
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
            >
              {[
                {
                  title: "1. AI Engineering",
                  items: [
                    "Train and fine-tune YOLOv8 model",
                    "Evaluate performance metrics",
                    "Optimize accuracy & inference time",
                  ],
                  pdf: "/Dualityai.pdf",
                  color: "from-[#d97706] to-[#b45309]"
                },
                {
                  title: "2. Documentation",
                  items: [
                    "Document dataset & workflow",
                    "Prepare final report & presentation",
                    "Create confusion matrices & graphs",
                  ],
                  pdf: "/Dualityai.pdf",
                  color: "from-[#dc2626] to-[#7f1d1d]"
                },
                {
                  title: "3. Bonus: App",
                  items: [
                    "Build desktop or mobile app",
                    "Plan model updates with Falcon",
                  ],
                  pdf: "/Duality.pdf",
                  color: "from-[#7f1d1d] to-[#991b1b]"
                },
              ].map((task, i) => (
                <motion.div
                  key={task.title}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -8, 
                    rotate: 1,
                    transition: { duration: 0.3 }
                  }}
                  className="p-6 bg-gradient-to-br from-[#1a120b] via-[#8c7853] to-[#a97142] rounded-2xl shadow-2xl h-full flex flex-col border-2 border-[#7f1d1d]/60"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-4 border-b border-[#f3e9c6]/30 pb-2">
                    {task.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base mb-6 flex-grow">
                    {task.items.map((item, j) => (
                      <motion.li 
                        key={j} 
                        className="transition hover:text-white"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.a
                    href={task.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 bg-[#f3e9c6] hover:bg-[#d97706] text-[#352518] px-4 py-2 rounded-lg font-semibold transition mt-auto"
                  >
                    <FileText size={18} /> Read More
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Register Anchor */}
        <motion.section
          id="register"
          className="px-6 md:px-12 py-20 text-center bg-gradient-to-br from-[#352518] to-[#d97706]/60 text-[#f3e9c6] relative border-4 border-[#d97706] rounded-3xl shadow-2xl backdrop-blur-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-10 rounded-3xl" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div 
              className="flex justify-center mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Award className="text-[#d97706] drop-shadow-lg" size={48} />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-serif mb-6 drop-shadow-lg"
              variants={slideUp}
            >
              Ready to Build the Future?
            </motion.h2>
            
            <motion.p 
              className="mb-8 text-base md:text-lg max-w-2xl mx-auto text-[#f3e9c6]/90"
              variants={slideUp}
            >
              Join the DualityAI Track now and showcase your skills at the intersection of ancient wisdom and modern AI technology.
            </motion.p>
            
            <motion.a
              whileHover={{ 
                scale: 1.07, 
                boxShadow: "0 10px 25px -5px rgba(217,119,6,0.7)" 
              }}
              whileTap={{ scale: 0.97 }}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeh169j_jNCN22rQHb9IbGFkcN4PQA3h-eRgZJJIBtsDrH_rg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#d97706] to-[#7f1d1d] text-[#f3e9c6] px-10 py-4 rounded-full text-lg md:text-xl font-bold shadow-xl hover:from-[#f3e9c6] hover:to-[#d97706] hover:text-[#7f1d1d] transition border-2 border-[#f3e9c6]"
            >
              Register Now
            </motion.a>
            
            <motion.div 
              className="mt-12 pt-8 border-t border-[#f3e9c6]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[#f3e9c6]/80">
                <motion.span 
                  className="px-3 py-1 rounded-full bg-[#d97706]/20 border border-[#d97706]/40"
                  whileHover={{ scale: 1.1 }}
                >
                  September 13, 2025
                </motion.span>
                <span>•</span>
                <motion.span 
                  className="px-3 py-1 rounded-full bg-[#d97706]/20 border border-[#d97706]/40"
                  whileHover={{ scale: 1.1 }}
                >
                  9:00 AM IST
                </motion.span>
                <span>•</span>
                <motion.span 
                  className="px-3 py-1 rounded-full bg-[#d97706]/20 border border-[#d97706]/40"
                  whileHover={{ scale: 1.1 }}
                >
                    Microsoft, Gurugram
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}