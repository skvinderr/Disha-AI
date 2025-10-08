import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GamepadIcon, 
  Trophy, 
  Zap, 
  Target, 
  Clock, 
  Star, 
  Flame, 
  Coins,
  Award,
  TrendingUp,
  Users,
  Calendar,
  Medal,
  Crown,
  Gift,
  Sparkles
} from 'lucide-react';

/**
 * Gamified Game Center Component
 * Features streaks, XP, SkillCoins, challenges, and competitions
 */
const GameCenter = ({ userProfile }) => {
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'challenges', 'competitions', 'rewards'
  const [userStats, setUserStats] = useState({
    level: Math.floor((userProfile?.xp || 0) / 100) + 1,
    xp: userProfile?.xp || 0,
    skillCoins: userProfile?.skillCoins || 0,
    streak: userProfile?.streak || 7,
    totalChallenges: 24,
    completedChallenges: 18,
    rank: 156,
    badges: ['Early Bird', 'Streak Master', 'Code Warrior']
  });

  // Daily Challenges
  const dailyChallenges = [
    {
      id: 1,
      title: 'Complete 3 Coding Exercises',
      description: 'Solve JavaScript problems to earn XP',
      xpReward: 150,
      coinReward: 25,
      progress: 2,
      total: 3,
      difficulty: 'easy',
      category: 'coding',
      timeLeft: '4h 23m',
      completed: false
    },
    {
      id: 2,
      title: 'Watch 2 Tutorial Videos',
      description: 'Learn new concepts from expert tutorials',
      xpReward: 100,
      coinReward: 15,
      progress: 1,
      total: 2,
      difficulty: 'easy',
      category: 'learning',
      timeLeft: '4h 23m',
      completed: false
    },
    {
      id: 3,
      title: 'Take a Skill Assessment',
      description: 'Test your knowledge in any domain',
      xpReward: 200,
      coinReward: 40,
      progress: 0,
      total: 1,
      difficulty: 'medium',
      category: 'assessment',
      timeLeft: '4h 23m',
      completed: false
    }
  ];

  // Weekly Competitions
  const competitions = [
    {
      id: 1,
      title: 'React Developer Championship',
      description: 'Build the best React component in 48 hours',
      participants: 1247,
      timeLeft: '2d 15h',
      prizes: ['$500', '$300', '$200'],
      difficulty: 'advanced',
      registered: true,
      status: 'active'
    },
    {
      id: 2,
      title: 'AI/ML Innovation Challenge',
      description: 'Create an innovative ML solution',
      participants: 892,
      timeLeft: '5d 8h',
      prizes: ['$1000', '$600', '$400'],
      difficulty: 'expert',
      registered: false,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Frontend Speed Challenge',
      description: 'Build a responsive website in 4 hours',
      participants: 2156,
      timeLeft: 'Ended',
      prizes: ['$300', '$200', '$100'],
      difficulty: 'intermediate',
      registered: true,
      status: 'completed'
    }
  ];

  // Rewards & Achievements
  const rewards = [
    {
      id: 1,
      name: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      progress: 7,
      total: 30,
      category: 'streak',
      unlocked: false
    },
    {
      id: 2,
      name: 'Code Warrior',
      description: 'Complete 100 coding challenges',
      icon: '⚔️',
      progress: 67,
      total: 100,
      category: 'challenges',
      unlocked: false
    },
    {
      id: 3,
      name: 'Knowledge Seeker',
      description: 'Complete 10 courses',
      icon: '🎓',
      progress: 10,
      total: 10,
      category: 'learning',
      unlocked: true
    },
    {
      id: 4,
      name: 'Champion',
      description: 'Win a competition',
      icon: '👑',
      progress: 0,
      total: 1,
      category: 'competition',
      unlocked: false
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-6 w-6" />
            <span className="text-2xl font-bold">{userStats.xp}</span>
          </div>
          <div className="text-sm opacity-90">Total XP</div>
          <div className="text-xs opacity-75">Level {userStats.level}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Coins className="h-6 w-6" />
            <span className="text-2xl font-bold">{userStats.skillCoins}</span>
          </div>
          <div className="text-sm opacity-90">SkillCoins</div>
          <div className="text-xs opacity-75">Spend in store</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Flame className="h-6 w-6" />
            <span className="text-2xl font-bold">{userStats.streak}</span>
          </div>
          <div className="text-sm opacity-90">Day Streak</div>
          <div className="text-xs opacity-75">Keep it up!</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-6 w-6" />
            <span className="text-2xl font-bold">#{userStats.rank}</span>
          </div>
          <div className="text-sm opacity-90">Global Rank</div>
          <div className="text-xs opacity-75">Top 15%</div>
        </motion.div>
      </div>

      {/* Daily Challenges Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Target className="h-6 w-6 text-blue-500 mr-2" />
            Daily Challenges
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>4h 23m left</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-600">+{challenge.xpReward}</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
              
              <motion.button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {challenge.progress === 0 ? 'Start Challenge' : 'Continue'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="h-6 w-6 text-yellow-500 mr-2" />
          Recent Achievements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.slice(0, 4).map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border-2 text-center ${
                reward.unlocked 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`text-3xl mb-2 ${reward.unlocked ? '' : 'grayscale'}`}>
                {reward.icon}
              </div>
              <h4 className={`font-semibold mb-1 ${reward.unlocked ? 'text-yellow-700' : 'text-gray-600'}`}>
                {reward.name}
              </h4>
              <p className="text-xs text-gray-600 mb-2">{reward.description}</p>
              {!reward.unlocked && (
                <div className="text-xs text-gray-500">
                  {reward.progress}/{reward.total}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Daily Challenges</h2>
        <div className="flex items-center space-x-2 bg-red-100 px-3 py-2 rounded-lg">
          <Clock className="h-4 w-4 text-red-600" />
          <span className="text-sm font-semibold text-red-700">4h 23m left</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dailyChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-purple-600 mb-1">
                  <Zap className="h-4 w-4" />
                  <span className="font-semibold">+{challenge.xpReward} XP</span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Coins className="h-4 w-4" />
                  <span className="font-semibold">+{challenge.coinReward}</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{challenge.progress}/{challenge.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                >
                  {challenge.progress > 0 && (
                    <span className="text-xs text-white font-semibold">
                      {Math.round((challenge.progress / challenge.total) * 100)}%
                    </span>
                  )}
                </motion.div>
              </div>
            </div>

            <motion.button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {challenge.progress === 0 ? 'Start Challenge' : 'Continue Challenge'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCompetitions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Competitions & Hackathons</h2>

      <div className="space-y-6">
        {competitions.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
              comp.status === 'active' ? 'border-blue-300 shadow-lg shadow-blue-100' :
              comp.status === 'completed' ? 'border-gray-200 opacity-75' :
              'border-gray-200 hover:border-purple-200 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(comp.difficulty)}`}>
                    {comp.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    comp.status === 'active' ? 'bg-green-100 text-green-700' :
                    comp.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {comp.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{comp.title}</h3>
                <p className="text-gray-600 mb-4">{comp.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{comp.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{comp.timeLeft}</span>
                  </div>
                </div>
              </div>

              <div className="lg:ml-6">
                <div className="text-right mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Prizes</h4>
                  <div className="space-y-1">
                    {comp.prizes.map((prize, prizeIndex) => (
                      <div key={prizeIndex} className="flex items-center space-x-2">
                        <Medal className={`h-4 w-4 ${
                          prizeIndex === 0 ? 'text-yellow-500' :
                          prizeIndex === 1 ? 'text-gray-400' :
                          'text-orange-600'
                        }`} />
                        <span className="text-sm font-semibold">{prize}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    comp.registered 
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : comp.status === 'completed'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                  }`}
                  whileHover={!comp.registered && comp.status !== 'completed' ? { scale: 1.02 } : {}}
                  whileTap={!comp.registered && comp.status !== 'completed' ? { scale: 0.98 } : {}}
                  disabled={comp.status === 'completed'}
                >
                  {comp.registered ? 'Registered ✓' : 
                   comp.status === 'completed' ? 'Competition Ended' :
                   'Register Now'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Achievements & Rewards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 ${
              reward.unlocked 
                ? 'border-yellow-300 bg-yellow-50 shadow-lg shadow-yellow-100' 
                : 'border-gray-200 bg-white hover:shadow-lg'
            }`}
          >
            <div className={`text-6xl mb-4 ${reward.unlocked ? '' : 'grayscale opacity-50'}`}>
              {reward.icon}
            </div>
            
            <h3 className={`text-lg font-bold mb-2 ${
              reward.unlocked ? 'text-yellow-700' : 'text-gray-900'
            }`}>
              {reward.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

            {!reward.unlocked && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold">{reward.progress}/{reward.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(reward.progress / reward.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </div>
            )}

            {reward.unlocked && (
              <div className="flex items-center justify-center space-x-2 text-yellow-700 font-semibold">
                <Sparkles className="h-4 w-4" />
                <span>Unlocked!</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GamepadIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Game Center</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Level up your skills with gamified learning, compete in challenges, and earn rewards
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: GamepadIcon },
            { id: 'challenges', label: 'Daily Challenges', icon: Target },
            { id: 'competitions', label: 'Competitions', icon: Trophy },
            { id: 'rewards', label: 'Achievements', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 ${
                  currentView === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg dark:shadow-purple-900/20'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* XP Card */}
          <motion.div className="bg-gradient-to-r from-purple-500 to-blue-600 dark:from-purple-600 dark:to-blue-700 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-6 w-6" />
              <span className="text-2xl font-bold">{userStats.xp}</span>
            </div>
            <div className="text-sm opacity-90">Total XP</div>
            <div className="text-xs opacity-75">Level {userStats.level}</div>
          </motion.div>

          {/* SkillCoins Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <Coins className="h-6 w-6" />
              <span className="text-2xl font-bold">{userStats.skillCoins}</span>
            </div>
            <div className="text-sm opacity-90">SkillCoins</div>
            <div className="text-xs opacity-75">Spend in store</div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <Flame className="h-6 w-6" />
              <span className="text-2xl font-bold">{userStats.streak}</span>
            </div>
            <div className="text-sm opacity-90">Day Streak</div>
            <div className="text-xs opacity-75">Keep it up!</div>
          </motion.div>

          {/* Rank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-6 w-6" />
              <span className="text-2xl font-bold">#{userStats.rank}</span>
            </div>
            <div className="text-sm opacity-90">Global Rank</div>
            <div className="text-xs opacity-75">Top 15%</div>
          </motion.div>
        </div>

        {/* Challenges Section */}
        <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Target className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
              Daily Challenges
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>4h 23m left</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-purple-900/10 transition-all duration-300 bg-white dark:bg-gray-800"
              >
                {/* Challenge content with dark mode classes */}
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {challenge.progress === 0 ? 'Start Challenge' : 'Continue'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
            Recent Achievements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.slice(0, 4).map((reward, index) => (
              <motion.div
                key={reward.id}
                className={`p-4 rounded-xl border-2 text-center ${
                  reward.unlocked 
                    ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900/20' 
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                }`}
                // ...existing motion props...
              >
                {/* Reward content with dark mode classes */}
                <h4 className={`font-semibold mb-1 ${reward.unlocked ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-300'}`}>
                  {reward.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{reward.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameCenter;