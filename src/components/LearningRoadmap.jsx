import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  Target, 
  CheckCircle, 
  Clock, 
  Star, 
  Trophy, 
  Zap, 
  Lock, 
  Play,
  BookOpen,
  Video,
  Code,
  Award,
  TrendingUp,
  ArrowRight,
  Flame
} from 'lucide-react';

/**
 * Dynamic, Gamified Learning Roadmap Component
 * Features adaptive pathways, progress tracking, and game-inspired design
 */
const LearningRoadmap = ({ userProfile }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [currentStreak, setCurrentStreak] = useState(userProfile?.streak || 7);

  // Sample learning paths with gamification
  const learningPaths = [
    {
      id: 'fullstack-react',
      title: 'Full-Stack React Developer',
      level: 'Beginner to Advanced',
      duration: '12 weeks',
      xpReward: 2500,
      skillCoins: 500,
      description: 'Master modern React development with Node.js backend',
      difficulty: 'intermediate',
      popularity: 95,
      completionRate: 78,
      modules: [
        {
          id: 'react-basics',
          title: 'React Fundamentals',
          duration: '2 weeks',
          xp: 300,
          coins: 50,
          type: 'course',
          status: 'completed',
          lessons: [
            { title: 'Components & JSX', type: 'video', duration: '45min', completed: true },
            { title: 'Props & State', type: 'interactive', duration: '60min', completed: true },
            { title: 'Event Handling', type: 'code', duration: '30min', completed: true },
            { title: 'Build a Todo App', type: 'project', duration: '2hrs', completed: false }
          ]
        },
        {
          id: 'react-advanced',
          title: 'Advanced React Patterns',
          duration: '3 weeks',
          xp: 500,
          coins: 75,
          type: 'course',
          status: 'current',
          lessons: [
            { title: 'Hooks Deep Dive', type: 'video', duration: '60min', completed: true },
            { title: 'Context API', type: 'interactive', duration: '45min', completed: false },
            { title: 'Performance Optimization', type: 'code', duration: '90min', completed: false },
            { title: 'E-commerce App', type: 'project', duration: '4hrs', completed: false }
          ]
        },
        {
          id: 'backend-node',
          title: 'Node.js & Express',
          duration: '3 weeks',
          xp: 600,
          coins: 90,
          type: 'course',
          status: 'locked',
          lessons: [
            { title: 'Server Setup', type: 'video', duration: '40min', completed: false },
            { title: 'REST APIs', type: 'interactive', duration: '75min', completed: false },
            { title: 'Database Integration', type: 'code', duration: '90min', completed: false },
            { title: 'Full-Stack Project', type: 'project', duration: '6hrs', completed: false }
          ]
        }
      ]
    },
    {
      id: 'ai-ml-python',
      title: 'AI & Machine Learning',
      level: 'Intermediate to Expert',
      duration: '16 weeks',
      xpReward: 3500,
      skillCoins: 750,
      description: 'Deep dive into AI/ML with Python and TensorFlow',
      difficulty: 'advanced',
      popularity: 88,
      completionRate: 65,
      modules: [
        {
          id: 'python-ml',
          title: 'Python for ML',
          duration: '3 weeks',
          xp: 400,
          coins: 60,
          type: 'course',
          status: 'available'
        },
        {
          id: 'deep-learning',
          title: 'Deep Learning',
          duration: '4 weeks',
          xp: 700,
          coins: 120,
          type: 'course',
          status: 'locked'
        }
      ]
    },
    {
      id: 'devops-cloud',
      title: 'DevOps & Cloud Mastery',
      level: 'Intermediate',
      duration: '10 weeks',
      xpReward: 2000,
      skillCoins: 400,
      description: 'Master Docker, Kubernetes, and AWS deployment',
      difficulty: 'intermediate',
      popularity: 82,
      completionRate: 71,
      modules: [
        {
          id: 'docker-basics',
          title: 'Docker Fundamentals',
          duration: '2 weeks',
          xp: 350,
          coins: 55,
          type: 'course',
          status: 'available'
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-yellow-500 to-orange-600';
      case 'advanced': return 'from-red-500 to-pink-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current': return <Play className="h-5 w-5 text-blue-500" />;
      case 'locked': return <Lock className="h-5 w-5 text-gray-400" />;
      default: return <Target className="h-5 w-5 text-purple-500" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'interactive': return <Target className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'project': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const renderPathSelection = () => (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/20 px-4 py-2 rounded-lg">
            <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <span className="font-bold text-orange-700 dark:text-orange-300">{currentStreak} day streak!</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
            <Zap className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            <span className="font-bold text-purple-700 dark:text-purple-300">{userProfile?.xp || 0} XP</span>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
            <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            <span className="font-bold text-yellow-700 dark:text-yellow-300">{userProfile?.skillCoins || 0} Coins</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Learning Adventure</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Embark on personalized learning journeys designed to level up your skills with gamified experiences
        </p>
      </motion.div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {learningPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedPath(path)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-2xl dark:hover:shadow-purple-900/10 transition-all duration-300 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getDifficultyColor(path.difficulty)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Map className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400 mb-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold">{path.popularity}%</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{path.completionRate}% complete rate</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {path.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{path.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{path.duration}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{path.level}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
                </div>
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">+{path.xpReward} XP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">+{path.skillCoins} Coins</span>
                </div>
              </div>

              {/* Progress Preview */}
              <div className="space-y-2 mb-4">
                {path.modules.slice(0, 3).map((module) => (
                  <div key={module.id} className="flex items-center space-x-3 text-sm">
                    {getStatusIcon(module.status)}
                    <span className={`${
                      module.status === 'completed' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {module.title}
                    </span>
                  </div>
                ))}
                {path.modules.length > 3 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-8">
                    +{path.modules.length - 3} more modules
                  </div>
                )}
              </div>

              <motion.button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Journey</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPathDetails = () => {
    if (!selectedPath) return null;

    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setSelectedPath(null)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Back to Paths</span>
        </motion.button>

        {/* Path Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-gray-200 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start space-x-4 mb-6 lg:mb-0">
              <div className={`w-16 h-16 bg-gradient-to-r ${getDifficultyColor(selectedPath.difficulty)} rounded-2xl flex items-center justify-center`}>
                <Map className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedPath.title}</h1>
                <p className="text-gray-600 mb-2">{selectedPath.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{selectedPath.duration}</span>
                  <span>•</span>
                  <span>{selectedPath.level}</span>
                  <span>•</span>
                  <span>{selectedPath.modules.length} modules</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 justify-end">
                <Zap className="h-5 w-5 text-purple-500" />
                <span className="font-bold text-purple-700">+{selectedPath.xpReward} XP</span>
              </div>
              <div className="flex items-center space-x-2 justify-end">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">+{selectedPath.skillCoins} Coins</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules */}
        <div className="space-y-6">
          {selectedPath.modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 ${
                module.status === 'current' 
                  ? 'border-blue-300 shadow-lg shadow-blue-100' 
                  : module.status === 'completed'
                  ? 'border-green-300 shadow-lg shadow-green-100'
                  : module.status === 'locked'
                  ? 'border-gray-200 opacity-60'
                  : 'border-gray-200 hover:border-purple-200 hover:shadow-lg'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      module.status === 'completed' ? 'bg-green-100' :
                      module.status === 'current' ? 'bg-blue-100' :
                      module.status === 'locked' ? 'bg-gray-100' :
                      'bg-purple-100'
                    }`}>
                      {getStatusIcon(module.status)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{module.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>{module.duration}</span>
                        <span>•</span>
                        <span className="capitalize">{module.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-purple-600 mb-1">
                      <Zap className="h-4 w-4" />
                      <span className="font-semibold">+{module.xp} XP</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Trophy className="h-4 w-4" />
                      <span className="font-semibold">+{module.coins}</span>
                    </div>
                  </div>
                </div>

                {/* Lessons */}
                {module.lessons && (
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                          lesson.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                          )}
                          <div className="flex items-center space-x-2 text-gray-600">
                            {getTypeIcon(lesson.type)}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                    module.status === 'locked'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : module.status === 'completed'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : module.status === 'current'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                  }`}
                  whileHover={module.status !== 'locked' ? { scale: 1.02 } : {}}
                  whileTap={module.status !== 'locked' ? { scale: 0.98 } : {}}
                  disabled={module.status === 'locked'}
                >
                  {module.status === 'completed' && (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </>
                  )}
                  {module.status === 'current' && (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Continue Learning</span>
                    </>
                  )}
                  {module.status === 'available' && (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start Module</span>
                    </>
                  )}
                  {module.status === 'locked' && (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Complete Previous Module</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <AnimatePresence mode="wait">
        {!selectedPath ? renderPathSelection() : renderPathDetails()}
      </AnimatePresence>
    </div>
  );
};

export default LearningRoadmap;