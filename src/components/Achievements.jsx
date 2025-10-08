import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Medal, 
  Zap, 
  Target, 
  Calendar,
  Flame,
  Award,
  Shield,
  Rocket,
  Brain,
  Code,
  Users,
  TrendingUp,
  CheckCircle,
  Lock,
  Sparkles,
  Gift,
  Heart
} from 'lucide-react';

/**
 * Achievements & Badges System Component
 * Comprehensive gamification with unlockable badges and achievements
 */
const Achievements = ({ userProfile }) => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Achievement categories and their achievements
  const achievementCategories = {
    learning: {
      name: 'Learning',
      icon: Brain,
      color: 'purple',
      achievements: [
        {
          id: 'first_course',
          name: 'First Steps',
          description: 'Complete your first learning module',
          icon: Rocket,
          rarity: 'common',
          points: 100,
          unlocked: true,
          unlockedAt: '2024-01-15',
          progress: 100
        },
        {
          id: 'week_streak',
          name: 'Dedicated Learner',
          description: 'Maintain a 7-day learning streak',
          icon: Flame,
          rarity: 'uncommon',
          points: 250,
          unlocked: true,
          unlockedAt: '2024-01-20',
          progress: 100
        },
        {
          id: 'skill_master',
          name: 'Skill Virtuoso',
          description: 'Achieve mastery in 3 different skills',
          icon: Crown,
          rarity: 'rare',
          points: 500,
          unlocked: false,
          progress: 67,
          requirement: '2/3 skills mastered'
        },
        {
          id: 'knowledge_sage',
          name: 'Knowledge Sage',
          description: 'Complete 100 learning modules',
          icon: Brain,
          rarity: 'epic',
          points: 1000,
          unlocked: false,
          progress: 34,
          requirement: '34/100 modules'
        }
      ]
    },
    assessment: {
      name: 'Assessment',
      icon: Target,
      color: 'blue',
      achievements: [
        {
          id: 'first_assessment',
          name: 'Knowledge Seeker',
          description: 'Complete your first skill assessment',
          icon: Target,
          rarity: 'common',
          points: 150,
          unlocked: true,
          unlockedAt: '2024-01-16',
          progress: 100
        },
        {
          id: 'perfect_score',
          name: 'Perfectionist',
          description: 'Score 100% on any assessment',
          icon: Star,
          rarity: 'rare',
          points: 400,
          unlocked: false,
          progress: 85,
          requirement: 'Best score: 85%'
        },
        {
          id: 'assessment_champion',
          name: 'Assessment Champion',
          description: 'Complete assessments in 10 different skills',
          icon: Medal,
          rarity: 'epic',
          points: 800,
          unlocked: false,
          progress: 30,
          requirement: '3/10 skills assessed'
        }
      ]
    },
    social: {
      name: 'Community',
      icon: Users,
      color: 'green',
      achievements: [
        {
          id: 'first_competition',
          name: 'Competitor',
          description: 'Participate in your first hackathon',
          icon: Trophy,
          rarity: 'uncommon',
          points: 300,
          unlocked: false,
          progress: 0,
          requirement: 'Join any hackathon'
        },
        {
          id: 'leaderboard_top100',
          name: 'Rising Star',
          description: 'Reach top 100 on global leaderboard',
          icon: TrendingUp,
          rarity: 'rare',
          points: 600,
          unlocked: false,
          progress: 0,
          requirement: 'Current rank: #156'
        },
        {
          id: 'hackathon_winner',
          name: 'Champion',
          description: 'Win a hackathon competition',
          icon: Crown,
          rarity: 'legendary',
          points: 2000,
          unlocked: false,
          progress: 0,
          requirement: 'Win any hackathon'
        }
      ]
    },
    special: {
      name: 'Special Events',
      icon: Sparkles,
      color: 'pink',
      achievements: [
        {
          id: 'early_adopter',
          name: 'Early Adopter',
          description: 'Join Disha AI in its first month',
          icon: Rocket,
          rarity: 'rare',
          points: 500,
          unlocked: true,
          unlockedAt: '2024-01-15',
          progress: 100,
          special: true
        },
        {
          id: 'new_year_2024',
          name: 'New Year Motivation',
          description: 'Complete learning activities during New Year week',
          icon: Gift,
          rarity: 'uncommon',
          points: 200,
          unlocked: true,
          unlockedAt: '2024-01-02',
          progress: 100,
          special: true
        }
      ]
    }
  };

  // Get all achievements flattened
  const allAchievements = Object.values(achievementCategories)
    .flatMap(category => category.achievements);

  // Filter achievements based on current category
  const filteredAchievements = currentCategory === 'all' 
    ? allAchievements
    : achievementCategories[currentCategory]?.achievements || [];

  // Stats
  const totalAchievements = allAchievements.length;
  const unlockedAchievements = allAchievements.filter(a => a.unlocked).length;
  const totalPoints = allAchievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'uncommon': return 'from-green-400 to-green-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityTextColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'uncommon': return 'text-green-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const openAchievementModal = (achievement) => {
    setSelectedAchievement(achievement);
    setShowModal(true);
  };

  const renderAchievementCard = (achievement) => {
    const Icon = achievement.icon;
    const isUnlocked = achievement.unlocked;
    
    return (
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => openAchievementModal(achievement)}
        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
          isUnlocked 
            ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl dark:shadow-purple-900/10' 
            : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-75'
        }`}
      >
        {/* Rarity Glow Effect */}
        {isUnlocked && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} 
            opacity-10 dark:opacity-20`} />
        )}
        
        {/* Special Badge */}
        {achievement.special && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        )}
        
        <div className="relative">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
            isUnlocked 
              ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
              : 'bg-gray-300'
          }`}>
            {isUnlocked ? (
              <Icon className="h-8 w-8 text-white" />
            ) : (
              <Lock className="h-8 w-8 text-gray-500" />
            )}
          </div>
          
          {/* Content */}
          <div>
            <h3 className={`text-lg font-bold mb-2 ${
              isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {achievement.name}
            </h3>
            <p className={`text-sm mb-3 ${
              isUnlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {achievement.description}
            </p>
            
            {/* Rarity and Points */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wider ${getRarityTextColor(achievement.rarity)}`}>
                {achievement.rarity}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-semibold text-gray-600">{achievement.points}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            {!isUnlocked && achievement.progress > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 h-2 rounded-full"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                {achievement.requirement && (
                  <p className="text-xs text-gray-500 mt-1">{achievement.requirement}</p>
                )}
              </div>
            )}
            
            {/* Unlock Date */}
            {isUnlocked && achievement.unlockedAt && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 
            dark:from-purple-600 dark:to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Achievements</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Unlock badges and earn points by completing challenges and reaching milestones
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{unlockedAchievements}/{totalAchievements}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Achievements Unlocked</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Achievement Points</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{Math.round((unlockedAchievements / totalAchievements) * 100)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-8">
          <motion.button
            onClick={() => setCurrentCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 ${
              currentCategory === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white shadow-lg dark:shadow-purple-900/20'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trophy className="h-4 w-4" />
            <span>All Achievements</span>
          </motion.button>
          
          {Object.entries(achievementCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={key}
                onClick={() => setCurrentCategory(key)}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 ${
                  currentCategory === key
                    ? `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {renderAchievementCard(achievement)}
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Detail Modal */}
        <AnimatePresence>
          {showModal && selectedAchievement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-60 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full border-2 
                  border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  {/* Achievement Icon */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    selectedAchievement.unlocked 
                      ? `bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)}`
                      : 'bg-gray-300'
                  }`}>
                    {selectedAchievement.unlocked ? (
                      <selectedAchievement.icon className="h-10 w-10 text-white" />
                    ) : (
                      <Lock className="h-10 w-10 text-gray-500" />
                    )}
                  </div>
                  
                  {/* Achievement Details */}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedAchievement.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedAchievement.description}
                  </p>
                  
                  {/* Rarity and Points */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className={`text-sm font-semibold uppercase tracking-wider ${getRarityTextColor(selectedAchievement.rarity)}`}>
                        {selectedAchievement.rarity}
                      </div>
                      <div className="text-xs text-gray-500">Rarity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedAchievement.points}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                  </div>
                  
                  {/* Progress or Unlock Date */}
                  {selectedAchievement.unlocked ? (
                    <div className="text-sm text-gray-500">
                      Unlocked on {new Date(selectedAchievement.unlockedAt).toLocaleDateString()}
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Progress: {selectedAchievement.progress}%</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 h-2 rounded-full"
                          style={{ width: `${selectedAchievement.progress}%` }}
                        />
                      </div>
                      {selectedAchievement.requirement && (
                        <div className="text-xs text-gray-500">{selectedAchievement.requirement}</div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Achievements;