import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header.jsx'; 
import Footer from './components/Footer/Footer';
import Head from './components/Head';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Home from './pages/Home';
import WhyCodeVeda from './pages/WhyCodeVeda';
import Schedule from './pages/Schedule';
import FAQ from "./pages/FAQ";
import ProblemStatements from './pages/ProblemStatements';
import DualityAITrack from './pages/DualityAi.jsx';
import Prizes from './pages/Prizes';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import GlobalStyles from './styles/GlobalStyles';

// Wrapper component to handle navigation state
const HomeWrapper = ({ hasEntered, setHasEntered, HomeComponent }) => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.fromLoading) {
      setHasEntered(true);
    }
  }, [location, setHasEntered]);

  if (!hasEntered && (!location.state || !location.state.fromLoading)) {
    return <Navigate to="/loading" />;
  }

  return <HomeComponent />;
};

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const updateHasEntered = () => {
    setHasEntered(true);
  };

  useEffect(() => {
    const checkEntryStatus = () => {
      const enteredBefore = sessionStorage.getItem('hasEntered');
      if (enteredBefore === 'true') {
        setHasEntered(true);
      }
    };

    checkEntryStatus();

    const handleEnteredChange = () => {
      checkEntryStatus();
    };

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
    ];

    preloadImages.forEach(image => {
      const img = new Image();
      img.src = `/assets/images/${image}`;
    });
  }, []);

  return (
    <Router>
      <Head />
      <GlobalStyles />
      
      {hasEntered && <Header />}
        
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/loading"
              element={<LoadingPage onEnter={updateHasEntered} />}
            />
            <Route 
              path="/home" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={Home} />} 
            />
            <Route 
              path="/why-code-veda" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={WhyCodeVeda} />} 
            />
            <Route 
              path="/schedule" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={Schedule} />} 
            />
            <Route path="/faq" element={<FAQ />} />
            <Route 
              path="/problem-statements" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={ProblemStatements} />} 
            />
          <Route path="/duality-ai" element={<HomeWrapper
      hasEntered={hasEntered}
      setHasEntered={setHasEntered}
      HomeComponent={DualityAITrack}
    />} />


            <Route 
              path="/prizes" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={Prizes} />} 
            />
            <Route 
              path="/sponsors" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={Sponsors} />} 
            />
            <Route 
              path="/team" 
              element={<HomeWrapper hasEntered={hasEntered} setHasEntered={setHasEntered} HomeComponent={Team} />} 
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
    </Router>
  );
}

export default App;
