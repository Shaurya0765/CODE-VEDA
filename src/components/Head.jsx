import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => {
  return (
    <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Yatra+One&family=Tiro+Devanagari+Sanskrit:ital@0;1&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      <title>Code Veda | Ancient Wisdom Meets Modern Technology</title>
      <meta name="description" content="A unique hackathon blending Vedic knowledge with cutting-edge innovation" />
    </Helmet>
  );
};

export default Head;
