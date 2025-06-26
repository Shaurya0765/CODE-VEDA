import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope,FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Code<span>Veda</span></h2>
          <p>Where Ancient Wisdom Meets Modern Technology</p>
          <div className="sanskrit-motto">
            प्राचीनज्ञानं नवीनतन्त्रम्
            <span className="motto-translation">"Ancient Wisdom, Modern Technology"</span>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3>Navigation</h3>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/why-code-veda">Why CodeVeda</StyledLink>
            <StyledLink to="/schedule">Schedule</StyledLink>
            <StyledLink to="/events">Events</StyledLink>
            <StyledLink to="/prizes">Prizes</StyledLink>
            <StyledLink to="/sponsors">Sponsors</StyledLink>
            <StyledLink to="/team">Team</StyledLink>
          </div>

          <div className="link-group">
            <h3>Resources</h3>
            <a href="/faq">FAQ</a>
          </div>

          <div className="link-group">
            <h3>Contact</h3>
            <a href="mailto:geekroomadgips@gmail.com">contact@codeveda.com</a>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://x.com/GeekRoomADGIPS" target='_blank' ><FaTwitter /></a>
          <a href="https://www.instagram.com/code_veda" target='_blank'><FaInstagram /></a>
          <a href="https://vision.hack2skill.com/event/codeveda"><FaGlobe/></a>
          {/*<a href="#"><FaLinkedin /></a>
          <a href="#"><FaGithub /></a>*/}
          <a href="mailto:geekroomadgips@gmail.com"><FaEnvelope /></a>
        </div>

        <p className="copyright">
          &copy; {new Date().getFullYear()} CodeVeda. All rights reserved.
        </p>

        <div className="attribution">
          <p>Made with ❤️ by the CodeVeda Team</p>
        </div>
      </div>
    </FooterWrapper>
  );
};

const StyledLink = styled(Link)`
  color: rgba(59, 46, 30, 0.8);
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: color 0.3s ease, font-weight 0.3s ease;

  &:hover {
    color: #5a4631;
    font-weight: bold;
  }
`;

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const FooterWrapper = styled.footer`
  background: #f3e9c6;
  color: #3b2e1e;
  padding: 3rem 2rem 1rem;
  border-top: 1px solid rgba(59, 46, 30, 0.3);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto 3rem auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
  }

  .footer-logo {
    flex: 1;
    min-width: 250px;

    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;

      span {
        color: #3b2e1e;
      }
    }

    p {
      color: rgba(59, 46, 30, 0.8);
      max-width: 300px;
    }

    .sanskrit-motto {
      margin-top: 1rem;
      font-style: italic;

      .motto-translation {
        display: block;
        font-size: 0.85rem;
        color: rgba(59, 46, 30, 0.6);
        margin-top: 0.2rem;
      }
    }
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    flex: 2;
    justify-content: space-around;

    .link-group {
      display: flex;
      flex-direction: column;
      min-width: 150px;

      h3 {
        color: #3b2e1e;
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
        font-weight: bold;
      }

      a,
      p {
        color: rgba(59, 46, 30, 0.8);
        margin-bottom: 0.8rem;
        text-decoration: none;
        transition: color 0.3s ease, font-weight 0.3s ease;

        &:hover {
          color: #5a4631;
          font-weight: bold;
        }
      }
    }
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(59, 46, 30, 0.1);

    .social-icons {
      display: flex;
      gap: 1.5rem;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;

      a {
        color: rgba(59, 46, 30, 0.8);
        transition: transform 0.3s ease, color 0.3s ease;
        animation: ${fadeIn} 0.8s ease-in-out;

        &:hover {
          transform: scale(1.2);
          color: #5a4631;
        }
      }
    }

    .copyright,
    .attribution {
      color: rgba(59, 46, 30, 0.6);
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
    }

    .footer-links {
      flex-direction: column;
      gap: 2rem;
    }
  }
`;

export default Footer;
