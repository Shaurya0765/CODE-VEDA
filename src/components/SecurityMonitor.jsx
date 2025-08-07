import { useEffect } from 'react';
import { secureLogger } from '../utils/security';

/**
 * Security monitoring component that detects suspicious activities
 * Should be included at the app level
 */
const SecurityMonitor = () => {
  useEffect(() => {
    // Monitor for XSS attempts
    const detectXSSAttempts = (event) => {
      const target = event.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const value = target.value;
        const xssPatterns = [
          /<script/i,
          /javascript:/i,
          /on\w+\s*=/i,
          /<iframe/i,
          /eval\(/i,
          /document\.cookie/i
        ];

        for (const pattern of xssPatterns) {
          if (pattern.test(value)) {
            secureLogger.logSecurityEvent('xss_attempt', {
              input: target.name || target.id,
              pattern: pattern.toString(),
              value: value.substring(0, 100) // Log only first 100 chars
            });
            break;
          }
        }
      }
    };

    // Monitor for rapid form submissions
    let formSubmissionCount = 0;
    const resetSubmissionCount = () => {
      formSubmissionCount = 0;
    };

    const detectRapidSubmissions = (event) => {
      if (event.target.tagName === 'FORM') {
        formSubmissionCount++;
        if (formSubmissionCount > 5) {
          secureLogger.logSecurityEvent('rapid_form_submission', {
            count: formSubmissionCount,
            form: event.target.name || event.target.id
          });
        }
      }
    };

    // Monitor for console access (potential developer tools usage)
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          secureLogger.logSecurityEvent('devtools_opened', {
            timestamp: Date.now()
          });
        }
      } else {
        devToolsOpen = false;
      }
    };

    // Monitor for right-click attempts (basic protection)
    const detectRightClick = (event) => {
      if (event.button === 2) {
        secureLogger.logSecurityEvent('right_click_attempt', {
          element: event.target.tagName,
          x: event.clientX,
          y: event.clientY
        });
      }
    };

    // Add event listeners
    document.addEventListener('input', detectXSSAttempts);
    document.addEventListener('submit', detectRapidSubmissions);
    document.addEventListener('mousedown', detectRightClick);
    
    // Check for dev tools periodically
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    // Reset submission count every minute
    const submissionResetInterval = setInterval(resetSubmissionCount, 60000);

    // Cleanup
    return () => {
      document.removeEventListener('input', detectXSSAttempts);
      document.removeEventListener('submit', detectRapidSubmissions);
      document.removeEventListener('mousedown', detectRightClick);
      clearInterval(devToolsInterval);
      clearInterval(submissionResetInterval);
    };
  }, []);

  // Monitor for URL manipulation
  useEffect(() => {
    const detectURLManipulation = () => {
      const suspiciousParams = ['<script', 'javascript:', 'eval(', 'onclick='];
      const currentURL = window.location.href;
      
      for (const param of suspiciousParams) {
        if (currentURL.toLowerCase().includes(param.toLowerCase())) {
          secureLogger.logSecurityEvent('url_manipulation', {
            url: currentURL,
            suspiciousParam: param
          });
          // Redirect to safe URL
          window.location.href = '/';
          break;
        }
      }
    };

    detectURLManipulation();
    
    // Monitor for hash changes
    window.addEventListener('hashchange', detectURLManipulation);
    
    return () => {
      window.removeEventListener('hashchange', detectURLManipulation);
    };
  }, []);

  return null; // This is a monitoring component, no UI
};

export default SecurityMonitor;
