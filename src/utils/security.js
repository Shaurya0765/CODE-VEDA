import DOMPurify from 'dompurify';

/**
 * Security utilities for CodeVeda application
 * Implements input sanitization, secure storage, and validation
 */

// Configuration for DOMPurify
const PURIFY_CONFIG = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
  ALLOWED_ATTR: ['class', 'id'],
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style', 'link', 'meta'],
  FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'onsubmit', 'onchange'],
  ALLOW_DATA_ATTR: false
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} content - Raw content to sanitize
 * @param {boolean} strictMode - If true, removes all HTML tags
 * @returns {string} - Sanitized content
 */
export const sanitizeContent = (content, strictMode = false) => {
  if (!content || typeof content !== 'string') {
    return '';
  }

  if (strictMode) {
    // Remove all HTML tags for text-only content
    return content.replace(/<[^>]*>/g, '').trim();
  }

  // Sanitize while preserving safe HTML
  return DOMPurify.sanitize(content, PURIFY_CONFIG);
};

/**
 * Validates and sanitizes search terms
 * @param {string} searchTerm - User input search term
 * @returns {string} - Clean search term
 */
export const validateSearchTerm = (searchTerm) => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return '';
  }

  // Remove script tags and dangerous patterns
  let cleanTerm = searchTerm
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onclick=/gi, '');

  // Limit length to prevent buffer overflow attempts
  if (cleanTerm.length > 100) {
    cleanTerm = cleanTerm.substring(0, 100);
  }

  return cleanTerm.trim();
};

/**
 * Secure local storage wrapper with basic encryption
 */
export const secureStorage = {
  /**
   * Encrypts and stores data in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  setItem: (key, value) => {
    try {
      if (!key || value === undefined) {
        console.warn('SecureStorage: Invalid key or value');
        return false;
      }

      // Basic encryption using base64 (in production, use proper encryption)
      const serialized = JSON.stringify(value);
      const encrypted = btoa(unescape(encodeURIComponent(serialized)));
      localStorage.setItem(`cs_${key}`, encrypted);
      return true;
    } catch (error) {
      console.error('SecureStorage setItem error:', error);
      return false;
    }
  },

  /**
   * Retrieves and decrypts data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key not found
   * @returns {any} - Decrypted value or default
   */
  getItem: (key, defaultValue = null) => {
    try {
      if (!key) {
        return defaultValue;
      }

      const encrypted = localStorage.getItem(`cs_${key}`);
      if (!encrypted) {
        return defaultValue;
      }

      // Decrypt
      const decrypted = decodeURIComponent(escape(atob(encrypted)));
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('SecureStorage getItem error:', error);
      return defaultValue;
    }
  },

  /**
   * Removes item from secure storage
   * @param {string} key - Storage key
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(`cs_${key}`);
      return true;
    } catch (error) {
      console.error('SecureStorage removeItem error:', error);
      return false;
    }
  },

  /**
   * Clears all secure storage items
   */
  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cs_')) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('SecureStorage clear error:', error);
      return false;
    }
  }
};

/**
 * Validates file paths to prevent directory traversal attacks
 * @param {string} filePath - File path to validate
 * @returns {boolean} - True if path is safe
 */
export const validateFilePath = (filePath) => {
  if (!filePath || typeof filePath !== 'string') {
    return false;
  }

  // Check for directory traversal patterns
  const dangerousPatterns = [
    '../',
    '..\\',
    '/..',
    '\\..',
    '%2e%2e',
    '%252e%252e',
    'file://',
    'javascript:',
    'data:'
  ];

  const normalizedPath = filePath.toLowerCase();
  
  // Check for dangerous patterns
  for (const pattern of dangerousPatterns) {
    if (normalizedPath.includes(pattern)) {
      return false;
    }
  }

  // Ensure file is in allowed directories
  const allowedPaths = [
    '/public/',
    '/assets/',
    '/documents/',
    '/guidelines'
  ];

  return allowedPaths.some(allowedPath => 
    normalizedPath.startsWith(allowedPath) || 
    normalizedPath.startsWith(`.${allowedPath}`)
  );
};

/**
 * Rate limiting utility using localStorage
 */
export const rateLimiter = {
  /**
   * Checks if action is allowed based on rate limit
   * @param {string} action - Action identifier
   * @param {number} maxAttempts - Maximum attempts allowed
   * @param {number} windowMs - Time window in milliseconds
   * @returns {boolean} - True if action is allowed
   */
  isAllowed: (action, maxAttempts = 5, windowMs = 60000) => {
    try {
      const key = `rl_${action}`;
      const now = Date.now();
      const stored = localStorage.getItem(key);
      
      if (!stored) {
        localStorage.setItem(key, JSON.stringify({ count: 1, firstAttempt: now }));
        return true;
      }

      const { count, firstAttempt } = JSON.parse(stored);
      
      // Reset if window has passed
      if (now - firstAttempt > windowMs) {
        localStorage.setItem(key, JSON.stringify({ count: 1, firstAttempt: now }));
        return true;
      }

      // Check if limit exceeded
      if (count >= maxAttempts) {
        return false;
      }

      // Increment counter
      localStorage.setItem(key, JSON.stringify({ count: count + 1, firstAttempt }));
      return true;
    } catch (error) {
      console.error('Rate limiter error:', error);
      return true; // Fail open for user experience
    }
  },

  /**
   * Gets remaining attempts for an action
   * @param {string} action - Action identifier
   * @param {number} maxAttempts - Maximum attempts allowed
   * @returns {number} - Remaining attempts
   */
  getRemainingAttempts: (action, maxAttempts = 5) => {
    try {
      const key = `rl_${action}`;
      const stored = localStorage.getItem(key);
      
      if (!stored) {
        return maxAttempts;
      }

      const { count } = JSON.parse(stored);
      return Math.max(0, maxAttempts - count);
    } catch (error) {
      console.error('Rate limiter getRemainingAttempts error:', error);
      return maxAttempts;
    }
  }
};

/**
 * Validates URL to ensure it's safe for external links
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL is safe
 */
export const validateURL = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    
    // Allow only specific protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }

    // Block suspicious domains (add more as needed)
    const blockedDomains = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      'file://'
    ];

    if (urlObj.protocol !== 'mailto:' && 
        blockedDomains.some(domain => urlObj.hostname.includes(domain))) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Debounce function to prevent rapid successive calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Enhanced Content Security Policy helpers
 */
export const cspUtils = {
  /**
   * Generates nonce for inline scripts/styles
   * @returns {string} - Generated nonce
   */
  generateNonce: () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, array));
  },

  /**
   * Validates if content meets CSP requirements
   * @param {string} content - Content to validate
   * @returns {boolean} - True if content is CSP compliant
   */
  validateContent: (content) => {
    if (!content) return true;
    
    // Check for inline event handlers
    const inlineEventPattern = /on\w+\s*=/i;
    if (inlineEventPattern.test(content)) {
      return false;
    }

    // Check for javascript: URLs
    if (/javascript:/i.test(content)) {
      return false;
    }

    // Check for data: URLs with javascript
    if (/data:.*javascript/i.test(content)) {
      return false;
    }

    return true;
  }
};

/**
 * Additional security validation utilities
 */
export const securityValidators = {
  /**
   * Validates email addresses
   * @param {string} email - Email to validate
   * @returns {boolean} - True if email is valid
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Validates phone numbers (basic international format)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - True if phone is valid
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validates team names for registration
   * @param {string} teamName - Team name to validate
   * @returns {boolean} - True if team name is valid
   */
  isValidTeamName: (teamName) => {
    if (!teamName || typeof teamName !== 'string') return false;
    
    // Allow only alphanumeric, spaces, hyphens, underscores
    const teamNameRegex = /^[a-zA-Z0-9\s\-_]{2,50}$/;
    return teamNameRegex.test(teamName.trim());
  },

  /**
   * Validates GitHub usernames
   * @param {string} username - GitHub username to validate
   * @returns {boolean} - True if username format is valid
   */
  isValidGitHubUsername: (username) => {
    if (!username || typeof username !== 'string') return false;
    
    // GitHub username rules: alphanumeric and hyphens, 1-39 chars
    const githubRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]){0,38}$/;
    return githubRegex.test(username) && !username.startsWith('-') && !username.endsWith('-');
  }
};

/**
 * Error logging utility with rate limiting
 */
export const secureLogger = {
  /**
   * Logs security events with rate limiting
   * @param {string} event - Event type
   * @param {object} details - Event details
   */
  logSecurityEvent: (event, details = {}) => {
    // Rate limit security logs
    if (!rateLimiter.isAllowed(`log_${event}`, 10, 60000)) {
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details: {
        ...details,
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    };

    // In production, send to security monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement security event logging to monitoring service
      console.warn('Security Event:', logEntry);
    } else {
      console.warn('Security Event:', logEntry);
    }
  }
};

export default {
  sanitizeContent,
  validateSearchTerm,
  secureStorage,
  validateFilePath,
  rateLimiter,
  validateURL,
  debounce,
  cspUtils,
  securityValidators,
  secureLogger
};
