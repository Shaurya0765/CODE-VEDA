import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext';
import Header from './components/Header/Header.jsx'; // Add the .jsx extension

// Wrapper component to handle navigation state
const HomeWrapper = ({ hasEntered, setHasEntered, HomeComponent }) => {
  const location = useLocation();
  
  // If we get here from the loading page, update the hasEntered state
  React.useEffect(() => {
    if (location.state && location.state.fromLoading) {
      setHasEntered(true);
    }
  }, [location, setHasEntered]);
  
  // If user hasn't entered and didn't come from loading page, redirect
  if (!hasEntered && (!location.state || !location.state.fromLoading)) {
    return <Navigate to="/loading" />;
  }
  
  return <HomeComponent />;
};
import Footer from './components/Footer/Footer';
import AudioPlayer from './components/AudioPlayer';
import Head from './components/Head';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Home from './pages/Home';
import WhyCodeVeda from './pages/WhyCodeVeda';
import Schedule from './pages/Schedule';
import FAQ from "./pages/FAQ";
import ProblemStatements from './pages/ProblemStatements';


// import Events from './pages/Events';
import Prizes from './pages/Prizes';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  
  // Function to update hasEntered state
  const updateHasEntered = () => {
    setHasEntered(true);
  };// Check if user has already entered the site
  useEffect(() => {
    const checkEntryStatus = () => {
      const enteredBefore = sessionStorage.getItem('hasEntered');
      if (enteredBefore === 'true') {
        setHasEntered(true);
      }
    };
    
    // Check on initial load
    checkEntryStatus();
    
    // Listen for the custom event from LoadingPage
    const handleEnteredChange = () => {
      checkEntryStatus();
    };
    
    // Add event listeners
    window.addEventListener('hasEnteredChange', handleEnteredChange);
    window.addEventListener('focus', checkEntryStatus);
    
    return () => {
      window.removeEventListener('hasEnteredChange', handleEnteredChange);
      window.removeEventListener('focus', checkEntryStatus);
    };
  }, []);

  // Preload assets
  useEffect(() => {
    const preloadImages = [
      'mandala-pattern.svg',
      'hero-bg.jpg',
      'logo.png',
      'chakra.svg',
      // Add more image paths as needed
    ];
    
    preloadImages.forEach(image => {
      const img = new Image();
      img.src = `/assets/images/${image}`;
    });
  }, []);

  return (
    <AudioProvider>
      <Router>
        <Head />
        <GlobalStyles />
        
        {/* Only show header and footer if user has entered the site */}        {hasEntered && <Header />}
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>              <Route 
                path="/loading"
                element={
                  <React.Fragment>
                    <LoadingPage onEnter={updateHasEntered} />
                  </React.Fragment>
                }
              /><Route 
                path="/home" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={Home}
                  />
                } 
              />              <Route 
                path="/why-code-veda" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={WhyCodeVeda}
                  />
                } 
              />
              <Route 
                path="/schedule" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={Schedule}
                  />
                } 

                
              />
            
              
              <Route 
                path="/faq" 
                element={<FAQ/>
                } 
              />
              
              <Route 
                path="/problem-statements" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={ProblemStatements}
                  />
                } 
              />
              
              
              <Route 
                path="/prizes" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={Prizes}
                  />
                } 
              />
              <Route 
                path="/sponsors" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={Sponsors}
                  />
                } 


                
              />
              <Route 
                path="/team" 
                element={
                  <HomeWrapper 
                    hasEntered={hasEntered} 
                    setHasEntered={setHasEntered} 
                    HomeComponent={Team}
                  />
                } 
              />
              <Route 
                path="/" 
                element={
                  hasEntered ? 
                    <Navigate to="/home" state={{ fromLoading: true }} /> : 
                    <Navigate to="/loading" />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
          {hasEntered && <Footer />}
        <AudioPlayer />
      </Router>
    </AudioProvider>
  );
}

export default App;