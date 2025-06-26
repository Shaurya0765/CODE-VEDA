import { createGlobalStyle } from 'styled-components';
// Removed import for fonts.css as it's now handled by the Head component

const GlobalStyles = createGlobalStyle`
    /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    /* Colors */
    --primary-color: #3b2e1e; /* Dark brown */
    --secondary-color: #3b2e1e; /* Dark brown */
    --accent-color: #5a4631; /* Lighter brown */
    --bg-dark: #3b2e1e; /* Dark brown */
    --bg-light: #f3e9c6; /* Beige/cream background */
    --text-light: #f3e9c6; /* Beige/cream */
    --text-dark: #3b2e1e; /* Dark brown */
    --gold-gradient: linear-gradient(135deg, #3b2e1e 0%, #5a4631 100%); /* Brown gradient */
    --silver-gradient: linear-gradient(135deg, #f3e9c6 0%, #e6dbb9 100%); /* Beige gradient */
    --bronze-gradient: linear-gradient(135deg, #3b2e1e 0%, #5a4631 100%); /* Brown gradient */
    --vedic-pattern-bg: url('/src/assets/images/mandala-pattern.svg');
    
    /* Fonts */
    --font-primary: 'Poppins', sans-serif;
    --font-sanskrit: 'Tiro Devanagari Sanskrit', serif;
    --font-display: 'Yatra One', cursive;
    --font-decorative: 'Yatra One', cursive;
    --font-code: 'Fira Code', monospace;
  }  body {
    font-family: var(--font-primary);
    background-color: var(--bg-light); /* Changed to light beige background */
    color: var(--text-dark); /* Changed to dark brown text */
    overflow-x: hidden;
  }

  main {
    min-height: 100vh;
    padding-top: 80px; /* Account for fixed header */
  }
  
  .sanskrit {
    font-family: var(--font-sanskrit);
    font-weight: normal;
    letter-spacing: 0.05em;
  }
  
  .vedic-title {
    font-family: var(--font-display);
    color: var(--primary-color);
  }
  
  .decorative-text {
    font-family: var(--font-decorative);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Poppins', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(10, 10, 10, 0.8);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  /* For animations */
  .page-transition-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms, transform 400ms;
  }

  .page-transition-exit {
    opacity: 1;
  }

  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

export default GlobalStyles;
