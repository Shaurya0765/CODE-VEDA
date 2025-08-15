import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [brahmaSponsors, setBrahmaSponsors] = useState([]);
  const [vishnuSponsors, setVishnuSponsors] = useState([]);
  const [shivaSponsors, setShivaSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await fetch('/data/sponsor.json');
        const data = await response.json();
        const allSponsors = data.flatMap(tier =>
          tier.sponsors.map(sponsor => ({ ...sponsor, tier: tier.tier }))
        );

        setSponsors(allSponsors);
        setBrahmaSponsors(data.find(t => t.tier === "Brahma Tier")?.sponsors || []);
        setVishnuSponsors(data.find(t => t.tier === "Vishnu Tier")?.sponsors || []);
        setShivaSponsors(data.find(t => t.tier === "Shiva Tier")?.sponsors || []);
      } catch (error) {
        console.log("API fetch failed", error);
      }
    };

    fetchSponsor();
  }, []);

  // Royal-themed animations
  const royalContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const royalItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    }
  };

  const royalHeader = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 70
      } 
    }
  };

  return (
    <div className="bg-[#d6c088] min-h-screen">
      {/* Header */}
      <p className='bg-[url(/om.png)] bg-repeat bg-blend-soft-light bg-contain text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 vedic-title bg-[#3b2e1e] text-center !text-[#f3e9c6]'>
        Our Sponsors
      </p>
      
      {/* Marquee Section - Made responsive */}
     <div className='w-screen h-auto  flex flex-row mt-6 flex-wrap' >
     <Marquee speed={60} gradient={false} pauseOnHover={false}>
      
      {/* Section One  */}
      {sponsors.map((all,index)=>(
        <div key={index} className='h-96 w-72  m-4 bg-[url(/gate.png)]  bg-center object-contain p-4 flex flex-col justify-center items-center  transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer' >
          <div className='text-center  lg:text-xl my-5 font-semibold bg-[#3b2e1e] !text-[#f3e9c6] px-2 rounded-xl bg-[url(/om.png)] bg-repeat bg-blend-soft-light bg-cover'>{all.tier}</div>
         
        <div className='h-[50%] w-[58%] py-5 flex flex-col gap-2 '>
          <div className='h-[70%] w-full rounded-md overflow-hidden'>
            <img 
              src={all.logo} 
              className={`h-full w-full transition-transform duration-300 ${all.name === "Endless Domains" ? "object-cover scale-150 hover:scale-[1.65]" : "object-contain hover:scale-110"}`}
              alt={all.name}
            />
          </div>
          <div className='h-[30%] w-full text-center font-bold lg:text-md'>{all.name}</div>
        </div>
        </div>

      ))}
      </Marquee>
     </div>

      {/* Royal Tiers Section */}
      <div className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={royalHeader}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3b2e1e] vedic-title relative z-10 px-4 md:px-6">
              The Royal Tiers
            </h2>
            <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-[#d4af37] opacity-40 z-0"></div>
          </div>
          <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-[#3b2e1e] max-w-2xl md:max-w-3xl mx-auto">
            Our sponsors are honored in royal courts befitting their noble contributions
          </p>
        </motion.div>

        {/* Brahma Tier - Royal Court */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-100px" }}
          variants={royalContainer}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <div className="relative">
            <div className="absolute -left-2 md:-left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-[#3b2e1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="ml-12 md:ml-16 pl-6 md:pl-8 border-l-4 border-[#d4af37]">
              <motion.h3 
                variants={royalItem}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#3b2e1e] vedic-title mb-1 md:mb-2"
              >
                Brahma Tier
              </motion.h3>
              <motion.p 
                variants={royalItem}
                className="text-sm md:text-base lg:text-xl text-[#3b2e1e] italic mb-4 md:mb-6 lg:mb-8"
              >
                Our principal sponsors who make the entire CodeVeda hackathon possible.
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={royalContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8"
          >
            {brahmaSponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                variants={royalItem}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border-t-8 border-[#d4af37] relative"
              >
                <div className="absolute -top-1 -right-1 h-8 w-8 md:h-10 md:w-10 z-10 lg:h-12 lg:w-12 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-lg font-bold text-[#3b2e1e]">{index + 1}</span>
                </div>
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <div className="p-2 md:p-3 lg:p-4 h-44 md:h-48 lg:h-48 flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      className="max-h-full max-w-full object-contain transform transition-transform duration-300 hover:scale-110" 
                      alt={sponsor.name}
                    />
                  </div>
                  <div className="bg-[#3b2e1e] p-2 md:p-3 lg:p-4 text-center">
                    <p className="text-xs md:text-sm lg:text-base font-bold text-[#f3e9c6]">{sponsor.name}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Vishnu Tier - Noble Court */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-100px" }}
          variants={royalContainer}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <div className="relative">
            <div className="absolute -left-2 md:-left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-[#3b2e1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-12 md:ml-16 pl-6 md:pl-8 border-l-4 border-[#d4af37]">
              <motion.h3 
                variants={royalItem}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#3b2e1e] vedic-title mb-1 md:mb-2"
              >
                Vishnu Tier
              </motion.h3>
              <motion.p 
                variants={royalItem}
                className="text-sm md:text-base lg:text-xl text-[#3b2e1e] italic mb-4 md:mb-6 lg:mb-8"
              >
                Major supporters who help sustain our innovation ecosystem.
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={royalContainer}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8"
          >
            {vishnuSponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                variants={royalItem}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border-t-8 border-[#a67c52] relative"
              >
                <div className="absolute -top-1 -right-1 h-8 w-8 md:h-10 md:w-10 z-10 lg:h-12 lg:w-12 bg-[#a67c52] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-lg font-bold text-white">{index + 1}</span>
                </div>
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <div className="p-2 md:p-3 lg:p-4 h-40 md:h-48 lg:h-56 flex items-center justify-center overflow-hidden">
                    <img 
                      src={sponsor.logo} 
                      className={`${sponsor.name === "Endless Domains" ? "h-full w-full object-cover scale-150 hover:scale-[1.65]" : "max-h-full max-w-full object-contain hover:scale-110"} transform transition-transform duration-300`} 
                      alt={sponsor.name}
                    />
                  </div>
                  <div className="bg-[#3b2e1e] p-2 md:p-3 lg:p-4 text-center">
                    <p className="text-xs md:text-sm lg:text-base font-bold text-[#f3e9c6]">{sponsor.name}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Shiva Tier - Royal Court */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{  margin: "-100px" }}
          variants={royalContainer}
          className="mb-12 md:mb-16 lg:mb-24"
        >
          <div className="relative">
            <div className="absolute -left-1 md:-left-2 top-1/2 transform -translate-y-1/2 h-12 w-12 md:h-16 md:w-16 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-[#3b2e1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="ml-12 md:ml-16 pl-6 md:pl-8 border-l-4 border-[#d4af37]">
              <motion.h3 
                variants={royalItem}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#3b2e1e] vedic-title mb-1 md:mb-2"
              >
                Shiva Tier
              </motion.h3>
              <motion.p 
                variants={royalItem}
                className="text-sm md:text-base lg:text-xl text-[#3b2e1e] italic mb-4 md:mb-6 lg:mb-8"
              >
                Valued supporters providing essential resources and expertise.
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={royalContainer}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8"
          >
            {shivaSponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                variants={royalItem}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border-t-8 border-[#8c7853] relative"
              >
                <div className="absolute -top-1 z-10 -right-1 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-[#8c7853] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-xs md:text-sm lg:text-lg font-bold text-white">{index + 1}</span>
                </div>
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                  <div className="p-2 md:p-3 lg:p-4 h-32 md:h-40 lg:h-48 flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      className="max-h-full max-w-full object-contain transform transition-transform duration-300 hover:scale-110" 
                      alt={sponsor.name}
                    />
                  </div>
                  <div className="bg-[#3b2e1e] p-2 md:p-3 lg:p-4 text-center">
                    <p className="text-md md:text-md lg:text-base font-bold text-[#f3e9c6]">{sponsor.name}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Why Sponsor Us - Royal Decree */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 md:mt-16 lg:mt-20 xl:mt-28"
        >
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="inline-block relative">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3b2e1e] vedic-title relative z-10 px-4 md:px-6">
                Why Sponsor Us 
              </h2>
              <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-[#d4af37] opacity-40 z-0"></div>
            </div>
            <p className="mt-3 md:mt-4 lg:mt-6 text-sm md:text-base lg:text-lg text-[#3b2e1e] max-w-2xl md:max-w-3xl mx-auto">
              Why your kingdom should align with our noble cause
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="lg:w-2/3 w-full bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-xl border-l-8 border-[#d4af37] relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-[#d4af37] via-[#a67c52] to-[#8c7853]"></div>
              <div className="text-sm md:text-base lg:text-lg space-y-3 md:space-y-4 lg:space-y-6">
                <p className="text-base md:text-lg lg:text-xl font-semibold text-[#3b2e1e]">
                  Sponsoring us is more than just placing your logo on a banner — it's an opportunity to align your brand with a mission that matters. By partnering with us, you gain direct exposure to a highly engaged audience, while demonstrating your commitment to community impact, innovation, and positive change. 
                </p>
              
                <p className="italic text-[#3b2e1e]">
                  Your support helps us deliver meaningful experiences, reach underserved audiences, and drive lasting results. In return, you'll benefit from increased brand visibility, stronger customer loyalty, and the goodwill that comes from supporting a cause that resonates. Together, we can make a real difference — and ensure your brand stands out for all the right reasons.
                  <a href="https://forms.gle/FmU2ktDsAoLFFFGMA">

                  <button className='text-[#d4af37] mx-2 bg-[#3b2e1e] rounded-xl p-1 animate-bounce mt-1'>Click here</button>
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="lg:w-1/3 w-full h-64 md:h-72 lg:h-80 xl:h-96 rounded-xl overflow-hidden shadow-xl border-2 md:border-4 border-[#d4af37] relative"
            >
              <img 
                src="/cv.jpeg"
                className="w-full h-full object-cover"
                alt="Royal Seal"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3b2e1e] to-transparent p-2 md:p-3 lg:p-4">
                <p className="text-[#f3e9c6] text-center font-semibold text-xs md:text-sm lg:text-base">
                 
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sponsors;