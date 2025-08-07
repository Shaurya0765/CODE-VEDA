import React, { useState } from 'react';
import { validateFilePath, rateLimiter } from '../utils/security';

/**
 * Secure file download component
 * Implements validation and rate limiting to prevent abuse
 */
const SecureFileDownload = ({ 
  filePath, 
  fileName, 
  children, 
  className = '',
  maxDownloads = 5,
  rateLimitWindow = 60000 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    setError('');

    // Rate limiting check
    if (!rateLimiter.isAllowed('file_download', maxDownloads, rateLimitWindow)) {
      const remaining = rateLimiter.getRemainingAttempts('file_download', maxDownloads);
      setError(`Download limit exceeded. Try again in ${Math.ceil(rateLimitWindow / 1000)} seconds. Remaining: ${remaining}`);
      return;
    }

    // Validate file path
    if (!validateFilePath(filePath)) {
      setError('Invalid file path. Access denied.');
      console.warn('Attempted access to invalid file path:', filePath);
      return;
    }

    setIsDownloading(true);

    try {
      // Fetch file to verify it exists and is accessible
      const response = await fetch(filePath, {
        method: 'HEAD', // Just check if file exists
      });

      if (!response.ok) {
        throw new Error(`File not found or inaccessible (${response.status})`);
      }

      // Create secure download link
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName || filePath.split('/').pop();
      
      // Add security attributes
      link.rel = 'noopener noreferrer';
      link.target = '_blank';
      
      // Temporarily add to DOM and trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);

    } catch (err) {
      console.error('Download error:', err);
      setError('Download failed. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="secure-download-container">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`secure-download-btn ${className}`}
        aria-label={`Download ${fileName || 'file'}`}
      >
        {isDownloading ? (
          <span>
            <span className="download-spinner">⟳</span>
            Downloading...
          </span>
        ) : (
          children
        )}
      </button>
      
      {error && (
        <div className="download-error" role="alert">
          {error}
        </div>
      )}

      <style jsx>{`
        .secure-download-container {
          position: relative;
        }
        
        .secure-download-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .download-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
          margin-right: 0.5rem;
        }
        
        .download-error {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(220, 53, 69, 0.1);
          border-radius: 4px;
          border: 1px solid rgba(220, 53, 69, 0.2);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SecureFileDownload;
