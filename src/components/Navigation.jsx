import { motion } from 'framer-motion';
import { 
  Home, 
  Brain, 
  Map, 
  FileText, 
  GamepadIcon, 
  BarChart3, 
  Trophy, 
  Award,
  Coins,
  Zap,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Enhanced Navigation Component with Gamification Elements
 */
const Navigation = ({ currentView, onViewChange, userProfile }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' },
    { id: 'assessment', label: 'Skill Assessment', icon: Brain, color: 'purple' },
    { id: 'roadmap', label: 'Learning Path', icon: Map, color: 'green' },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText, color: 'orange' },
    { id: 'game', label: 'Game Center', icon: GamepadIcon, color: 'pink' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'indigo' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, color: 'yellow' },
    { id: 'achievements', label: 'Achievements', icon: Award, color: 'purple' }
  ];

  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 border-blue-200',
    purple: 'text-purple-600 bg-purple-100 border-purple-200',
    green: 'text-green-600 bg-green-100 border-green-200',
    orange: 'text-orange-600 bg-orange-100 border-orange-200',
    pink: 'text-pink-600 bg-pink-100 border-pink-200',
    indigo: 'text-indigo-600 bg-indigo-100 border-indigo-200',
    yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200'
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 min-w-[1024px]"> {/* Modified container */}
        <div className="flex items-center justify-between h-16 relative"> {/* Added relative positioning */}
          {/* Logo & Brand - Made more compact */}
          <motion.div 
            className="flex items-center space-x-2 flex-shrink-0 w-48" // Added flex-shrink-0 and fixed width
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-none">
                Disha AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">Career & Skill Advisor</p>
            </div>
          </motion.div>

          {/* Navigation Items - Better space management */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center mx-2"> {/* Adjusted breakpoint and spacing */}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    px-3 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-1.5 text-sm
                    ${isActive 
                      ? colorClasses[item.color] + ' shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Section: Stats & Profile - Prevent shrinking */}
          <div className="flex items-center space-x-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
            {/* XP and Level - Adjusted visibility */}
            <motion.div 
              className="hidden lg:flex items-center space-x-2" // Changed breakpoint
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {userProfile?.xp || 0} XP
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Level</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {Math.floor((userProfile?.xp || 0) / 100) + 1}
                </span>
              </div>
            </motion.div>

            {/* SkillCoins - Always visible */}
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                {userProfile?.skillCoins || 0}
              </span>
            </motion.div>

            {/* Theme and Profile - Always visible */}
            <div className="flex items-center space-x-2 ml-2"> {/* Separate container with margin */}
              <motion.button
                onClick={toggleTheme}
                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>

              <motion.button
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="h-4 w-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Better padding */}
        <div className="lg:hidden py-2"> {/* Adjusted breakpoint and padding */}
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    px-3 py-2 rounded-lg border transition-all duration-200 flex items-center space-x-2 text-xs
                    ${isActive 
                      ? colorClasses[item.color] + ' shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-3 w-3" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;