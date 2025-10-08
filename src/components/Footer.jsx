import React from 'react';
import { Heart } from 'lucide-react';

/**
 * Reusable Footer component with branding
 * Designed to be subtle and non-intrusive with dark mode support
 */
const Footer = ({ variant = 'default', className = '' }) => {
  const variants = {
    // Default footer for main pages
    default: 'bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4',
    // Minimal footer for modals/overlays
    minimal: 'py-2 text-xs dark:text-gray-400',
    // Transparent footer for landing page
    transparent: 'py-3 text-sm dark:text-gray-300',
    // Fixed footer for dashboard pages
    fixed: 'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-2 text-xs'
  };

  return (
    <footer className={`${variants[variant]} ${className} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <span>© 2025 Disha AI. Made with</span>
            <Heart className="h-3 w-3 text-red-500 dark:text-red-400 fill-current animate-pulse-slow" />
            <span>by Aditya.</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;