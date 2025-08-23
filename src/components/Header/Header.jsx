import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  // Navbar items
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/why-code-veda', name: 'Why Code Veda' },
    { path: '/problem-statements', name: 'Problem Statements' },
    { path: '/schedule', name: 'Schedule' },
    // { path: '/events', name: 'Events' },
    { path: '/prizes', name: 'Prizes' },
    { path: '/sponsors', name: 'Sponsors' },
    { path: '/team', name: 'Team' },
    { path: '/duality-ai', name: 'Duality AI' }


  ]

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when changing routes
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-vedic-beige opacity backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
           
            <img 
              src="/cv.jpeg" 
              alt="Code Veda Logo" 
              className="h-14 w-auto mr-4 rounded-md shadow-sm" 
            />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-gold)] bg-clip-text text-transparent">
              CODE VEDA
            </span>
          </Link>
        </motion.div>
        
        {/* Desktop Menu */}
        <motion.nav 
          className="hidden md:flex items-center space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className={`relative px-1 py-2 font-medium text-sm transition-colors hover:text-[var(--color-saffron)]
                ${location.pathname === item.path ? 'text-[var(--color-saffron)]' : 'text-gray-700'}`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-saffron)]" 
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
          <Link 
            to="https://vision.hack2skill.com/event/codeveda" 
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-gold)] text-white rounded-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            Register
          </Link>
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          className="md:hidden bg-white border-t shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className={`py-2 px-4 rounded-md ${location.pathname === item.path ? 
                  'bg-[var(--color-saffron)]/10 text-[var(--color-saffron)]' : 
                  'text-gray-700 hover:bg-gray-100'}`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="#register" 
              className="px-4 py-3 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-gold)] text-white rounded-md text-center font-medium"
            >
              Register
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
