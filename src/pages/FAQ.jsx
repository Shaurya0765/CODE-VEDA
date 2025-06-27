import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the theme of Code Veda Hackathon?",
      answer: "The theme is 'Digital Dharma' - focusing on ethical and purposeful coding that aligns with Vedic values like truth (Satya), duty (Dharma), and selfless service (Seva). We encourage solutions that benefit society while upholding these principles."
    },
    {
      question: "Who can participate in Code Veda?",
      answer: "The hackathon is open to all tech enthusiast students. Whether you're a beginner or an experienced coder, if you're passionate about building solutions with purpose, you're welcome to participate!"
    },
    {
      question: "What is the team size requirement?",
      answer: "Teams should consist of 2-4 members. You can register as a team or as an individual (we'll help match you with other participants)."
    },
    {
      question: "Is there any registration fee?",
      answer: "No, Code Veda is completely free to participate in. We believe in making technology accessible to everyone."
    },
    {
      question: "What are the different phases of the hackathon?",
      answer: `1. Registration (Till 20th August)
2. PPT Submission (15th July - 25th August)
3. Online Round (7th September)
4. Offline Hackathon (16th-17th September)`
    },
    {
      question: "What tracks/challenges can we work on?",
      answer: `• Code For Karma (Social good projects)
• Open Innovation (Most creative ideas)
• Healthcare
• IoT
• AR/VR
• Sustainable Development
• App Development

You can propose your own track if it aligns with Digital Dharma principles.`
    },
    {
      question: "What should we include in our PPT submission?",
      answer: `Your PPT (max 10 slides) should include:
- Problem statement
- Proposed solution
- Technical architecture
- Potential impact
- Team details
- Implementation roadmap`
    },
    {
      question: "What are the judging criteria?",
      answer: `Projects will be evaluated on:
- Innovation (30%)
- Technical Complexity (25%)
- Practical Implementation (20%)
- Presentation (15%)
- Social Impact (10%)`
    },
    {
      question: "What are the prizes?",
      answer: `• Cash prizes for top 3 teams
• Incubation opportunities
• Mentorship from industry leaders
• Certificates for all participants
• Goodies and swag for winners

(Exact prize amounts will be announced soon)`
    },
    {
      question: "What should we bring for the offline round?",
      answer: `• Laptop and charger
• Any special hardware needed for your project
• Valid government ID
• Enthusiasm and creativity!`
    },
    {
      question: "Can we use pre-existing code?",
      answer: "All code must be written during the hackathon. You can use open-source frameworks and libraries, but the core solution should be developed during the event. Plagiarism will result in disqualification."
    },
    {
      question: "Will accommodation be provided for the offline round?",
      answer: "Yes, basic accommodation will be provided for outstation participants during the offline hackathon at Masters' Union. Details will be shared with shortlisted teams."
    },
    {
      question: "How can we prepare for the hackathon?",
      answer: `• Form your team early
• Brainstorm problem statements aligned with Digital Dharma
• Brush up on your technical skills
• Prepare your development environment
• Follow our social media for tips and updates`
    },
    {
      question: "What if I don't have a team?",
      answer: "No worries! Once you register find other candidates on H2S platform and make your team. Many great teams are formed this way!"
    },
    {
      question: "Where can I get updates about the hackathon?",
      answer: "Follow our official social media channels and website for all updates. We'll also be sending regular emails to registered participants."
    }
  ];

  return (
    <FAQContainer>
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>॥ प्रश्नोत्तराणि ॥</h1>
        <p className="subtitle">Frequently Asked Questions</p>
        <div className="decoration-line"></div>
      </motion.div>

      <div className="faq-content">
        {faqData.map((item, index) => (
          <motion.div 
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.question}</h3>
              <motion.span 
                className="indicator"
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
              >
                ▼
              </motion.span>
            </div>
            <motion.div
              className="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: activeIndex === index ? 'auto' : 0,
                opacity: activeIndex === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="answer-content">
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="contact-section">
        <h3>Still have questions?</h3>
        <p>Reach out to us at <a href="mailto:geekroomadgips@gmail.com">geekroomadgips@gmail.com</a></p>
        <p>Or connect on our social media channels</p>
      </div>
    </FAQContainer>
  );
};

const FAQContainer = styled.div`
  font-family: 'Noto Sans', 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #4a3520;

  .faq-header {
    text-align: center;
    margin-bottom: 3rem;
    
    h1 {
      font-size: 2.5rem;
      color: #4a3520;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #6c5b40;
      font-style: italic;
      margin-bottom: 1.5rem;
    }
    
    .decoration-line {
      width: 200px;
      height: 2px;
      background: linear-gradient(to right, transparent, #4a3520, transparent);
      margin: 0 auto;
    }
  }

  .faq-content {
    margin-bottom: 3rem;
  }

  .faq-item {
    margin-bottom: 1rem;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    &.active {
      box-shadow: 0 5px 15px rgba(74, 53, 32, 0.2);
    }
  }

  .faq-question {
    padding: 1.5rem;
    background-color: #f3f0e6;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #4a3520;
      font-weight: 600;
      flex: 1;
    }
    
    .indicator {
      margin-left: 1rem;
      color: #6c5b40;
      transition: all 0.3s ease;
    }
  }

  .faq-answer {
    background-color: rgba(243, 240, 230, 0.7);
    overflow: hidden;
    
    .answer-content {
      padding: 1.5rem;
      white-space: pre-line;
      line-height: 1.8;
    }
  }

  .contact-section {
    text-align: center;
    padding: 2rem;
    background-color: #f3f0e6;
    border-radius: 5px;
    
    h3 {
      color: #4a3520;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 0.5rem;
      color: #6c5b40;
    }
    
    a {
      color: #5d3a17;
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    .faq-header h1 {
      font-size: 2rem;
    }
    
    .faq-question {
      padding: 1rem;
      
      h3 {
        font-size: 1rem;
      }
    }
    
    .faq-answer .answer-content {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .faq-header h1 {
      font-size: 1.8rem;
    }
    
    .faq-question h3 {
      font-size: 0.95rem;
    }
  }
`;

export default FAQ;