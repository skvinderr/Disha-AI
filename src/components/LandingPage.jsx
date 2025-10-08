import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Beaker, Target, Users, Moon, Sun } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Footer from './Footer';

/**
 * Landing page component with hero section and brand introduction
 * @param {Function} onGetStarted - Callback when user clicks "Find Your Path"
 */
const LandingPage = ({ onGetStarted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { signInAnonymously } = useAuth();

  /**
   * Handle the "Find Your Path" button click
   */
  const handleGetStarted = async () => {
    try {
      setIsLoading(true);
      // For development, skip Firebase auth and go directly to onboarding
      console.log('Starting onboarding process...');
      onGetStarted();
    } catch (error) {
      console.error('Error starting onboarding:', error);
      // Still proceed to onboarding
      onGetStarted();
    } finally {
      setIsLoading(false);
    }
  };

  // Add theme toggle function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-electric-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Beaker className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-primary-900 dark:text-primary-100">Disha AI</span>
          </motion.div>

          {/* Add Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center 
              bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              From Career Confusion to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-electric-500 bg-clip-text text-transparent">
                Crystal Clarity
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your Personal Career Chemist. Get AI-powered, hyper-personalized career guidance 
              tailored for Indian students. Discover your perfect career path with precision.
            </p>

            <motion.button
              onClick={handleGetStarted}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Getting Started...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Find Your Path</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto py-16 sm:py-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full 
                flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Hyper-Personalized
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI analyzes your interests, strengths, and skills to recommend careers that truly fit you
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-accent-100 dark:bg-accent-900/20 w-16 h-16 rounded-full 
                flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                India-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recommendations tailored for the Indian job market with local companies and resources
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-electric-100 dark:bg-electric-900/20 w-16 h-16 rounded-full 
                flex items-center justify-center mx-auto mb-4">
                <Beaker className="h-8 w-8 text-electric-600 dark:text-electric-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Actionable Roadmaps
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get detailed learning paths with skill gap analysis and practical next steps
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer with dark mode */}
      <Footer variant="transparent" className="border-t border-gray-200 dark:border-gray-700" />
    </div>
  );
};

export default LandingPage;
