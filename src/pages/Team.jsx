import React, { useEffect } from 'react';
import { RiGithubLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const teamMembers = [
    {
      name: 'Shivansh Baliyan',
      role: ' Karya Sutradhār (Master of Event Orchestration)',
      image: 'sb.jpg',
      bio: 'The guiding thread behind the entire event, overseeing timelines, planning rituals (schedules), and ensuring divine order (logistics).',
      social: {
        linkedin: 'https://www.linkedin.com/in/shivansh-baliyan/',
        github: 'https://github.com/arjunsharma'
      }
    },
    {
      name: 'Shaurya Pratap Singh',
      role: 'Chitrakaār (The Visual Artisan)',
      image: '/sp.jpeg',
      bio: 'Crafts the visual aura of Code Veda through compelling posters, designs, and aesthetic storytelling rooted in creative dharma..',
      social: {
        linkedin: 'https://www.linkedin.com/in/shaurya-pratap-singh-7425822a8/',
        github: 'https://github.com/priyapatel'
      }
    },
    {
      name: 'Sampreeti Rastogi',
      role: ' Sambandh Vidhāyak (Architect of Alliances)',
      image: '/sm.jpeg',
      bio: 'Builds and nurtures ties with sponsors, media houses, and external patrons — channeling support and blessings for the hackathon.',
      social: {
        linkedin: 'https://www.linkedin.com/in/sampreeti-rastogi-868612325/',
        github: 'https://github.com/rahulmehta'
      }
    },
    {
      name: 'Nikhil Sood',
      role: 'Vaarta Doot (Messenger of the Digital Realm)',
      image: '/ns.jpeg',
      bio: 'Spreads the word across the digital skies — managing social media, promotions, and keeping the online Agni alive.',
      social: {
        linkedin: 'https://www.linkedin.com/in/nikhils00d/',
        github: 'https://github.com/vikramsingh'
      }
    },
    {
     name: 'Vidhi Garg',
     role: 'Agni Neta (Marketing Lead of the Digital Frontier)',
     image: '/Vg.jpeg',
     bio: 'Leads the charge in igniting brand presence — strategizing campaigns, fueling growth, and keeping the digital Agni blazing.',
     social: {
     linkedin: 'https://www.linkedin.com/in/vidhi-garg-b40b05316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', 
     github: 'https://github.com/vidhigarg'
     }

    },
    {
       name: 'Chetan Kumar',
      role: 'Agni Neta (Marketing Lead of the Digital Frontier)',
      image: '/chetan.jpeg',
      bio: 'Weaves powerful narratives across platforms — crafting campaigns, building communities, and lighting the flame of engagement in the digital universe.',
      social: {
        linkedin: 'https://www.linkedin.com/in/chetan-kumar-12922a322',
        github: 'https://github.com/Chetankumargithub'
      }

    },
    {
      name: 'Sumit Thakur',
      role: 'Yajna Karta (Executor of the Sacred Ritual)',
      image: '/st.jpeg',
      bio: 'The one who brings the vision to life — ensuring smooth execution, team alignment, and sanctity of every operational task.',
      social: {
        linkedin: 'https://www.linkedin.com/in/sumit-thakur-80ba72278/',
        github: 'https://github.com/meeragupta'
      }
    }
  ];

  return (
    <>
    <div className='h-auto w-screen bg-[url(/om.png)] bg-repeat bg-blend-soft-light bg-contain text-5xl vedic-title bg-[#3b2e1e]  text-center !text-[#f3e9c6] mb-6'>
    <h1 className='text-center pt-7 text-5xl vedic-title !text-[#f3e9c6]'>Our Team</h1>

    <h1 className='text-center p-6 text-3xl vedic-title !text-[#f3e9c6]'>🔱 Code Veda Hackathon – The Council of Leads 🔱
    Infusing ancient wisdom with modern innovation</h1>
    </div>

    <div className='w-full h-auto p-8 flex flex-wrap gap-12 items-center justify-center'>

{teamMembers.map((member, index) => (
  <div key={index} className='flex flex-col h-auto items-center p-4 shadow-md rounded-md transition duration-300 hover:shadow-[0_0_25px_rgba(59,46,30,0.6)] scroll-animate'>

    {/* Profile container */}
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[25rem] md:h-[25rem] lg:w-[29rem] lg:h-[29rem] scroll-animate">
  {/* Spinning border layer */}
 <div className="absolute inset-0 rounded-full bg-[url(/border.png)] bg-cover bg-center animate-spin-slow"></div>


  {/* Static image on top */}
  <img
    src={member.image}
    alt="Profile"
    className="w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
  />
  </div>

    {/* Brown content card below */}
    <div className='w-full h-auto sm:w-[24rem] md:w-[26rem] lg:w-[30rem] mt-6 rounded-md p-2'>
      <h1 className="!text-[#3b2e1e] text-2xl sm:text-3xl text-center pt-4 vedic-title">
        {member.name}
      </h1>
      <p className='text-[#3b2e1e] text-lg sm:text-xl text-center p-2'>
        {member.role}
      </p>
      <p className='text-[#3b2e1e] text-base sm:text-lg text-center p-2'>
        {member.bio}
      </p>

      <div className='flex flex-row gap-4 justify-center p-4 text-[#3b2e1e] text-3xl'>
        {/*<div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#f3e9c6] rounded-full flex items-center justify-center  cursor-pointer'>
          <RiGithubLine><a href={member.social.linkedin} target="_blank" /></RiGithubLine>
        </div>*/}
        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-[#f3e9c6] rounded-full flex items-center justify-center cursor-pointer'>
          <FaLinkedinIn><a href={member.social.github} target="_blank" /></FaLinkedinIn>
        </div>
      </div>
    </div>

  </div>
))}

</div>


      </>
  )
}
export default Team;
