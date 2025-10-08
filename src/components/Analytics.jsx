import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Award, 
  Target, 
  Brain,
  Users,
  Clock,
  Trophy,
  Briefcase,
  Download,
  Filter,
  RefreshCw,
  Calendar,
} from 'lucide-react';

/**
 * Comprehensive Analytics Dashboard
 * Features learner progress tracking and recruiter insights
 */
const Analytics = ({ userProfile }) => {
  const [viewMode, setViewMode] = useState('learner'); // 'learner' or 'recruiter'
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'

  // Mock analytics data
  const learnerAnalytics = {
    overview: {
      totalXP: 2450,
      skillsLearned: 18,
      coursesCompleted: 7,
      timeSpent: 124, // hours
      streakDays: 15,
      level: 8
    },
    skillProgress: [
      { skill: 'React', proficiency: 85, change: +12, trend: 'up' },
      { skill: 'JavaScript', proficiency: 90, change: +8, trend: 'up' },
      { skill: 'Node.js', proficiency: 70, change: +15, trend: 'up' },
      { skill: 'Python', proficiency: 65, change: +20, trend: 'up' },
      { skill: 'TypeScript', proficiency: 55, change: +25, trend: 'up' },
      { skill: 'AWS', proficiency: 40, change: +40, trend: 'up' }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 3.5, xp: 280 },
      { day: 'Tue', hours: 2.8, xp: 220 },
      { day: 'Wed', hours: 4.2, xp: 350 },
      { day: 'Thu', hours: 3.1, xp: 240 },
      { day: 'Fri', hours: 2.5, xp: 180 },
      { day: 'Sat', hours: 5.0, xp: 420 },
      { day: 'Sun', hours: 2.2, xp: 160 }
    ],
    learningPaths: [
      { name: 'Full-Stack React', progress: 78, modules: 12, completed: 9 },
      { name: 'AI & Machine Learning', progress: 34, modules: 16, completed: 5 },
      { name: 'DevOps Mastery', progress: 12, modules: 8, completed: 1 }
    ],
    achievements: [
      { name: 'Code Warrior', date: '2024-01-15', category: 'Coding' },
      { name: 'Streak Master', date: '2024-01-10', category: 'Consistency' },
      { name: 'Knowledge Seeker', date: '2024-01-05', category: 'Learning' }
    ]
  };

  const recruiterAnalytics = {
    candidates: {
      total: 1247,
      newThisMonth: 89,
      preScreened: 234,
      interviewed: 67
    },
    skillDemand: [
      { skill: 'React', demand: 95, candidates: 445, avgLevel: 78 },
      { skill: 'Python', demand: 88, candidates: 378, avgLevel: 72 },
      { skill: 'AWS', demand: 82, candidates: 234, avgLevel: 65 },
      { skill: 'TypeScript', demand: 79, candidates: 189, avgLevel: 69 },
      { skill: 'Docker', demand: 75, candidates: 156, avgLevel: 58 },
      { skill: 'Machine Learning', demand: 71, candidates: 134, avgLevel: 61 }
    ],
    topCandidates: [
      { name: 'Sarah Chen', skills: ['React', 'Node.js', 'AWS'], score: 94, experience: '3-5 years' },
      { name: 'Alex Kumar', skills: ['Python', 'ML', 'Docker'], score: 91, experience: '2-4 years' },
      { name: 'Maria Garcia', skills: ['Full-Stack', 'React', 'TypeScript'], score: 89, experience: '4-6 years' },
      { name: 'David Kim', skills: ['DevOps', 'AWS', 'Kubernetes'], score: 87, experience: '5-7 years' },
      { name: 'Emily Zhang', skills: ['AI/ML', 'Python', 'TensorFlow'], score: 85, experience: '2-3 years' }
    ],
    hiringTrends: [
      { month: 'Oct', hires: 23, applications: 145 },
      { month: 'Nov', hires: 31, applications: 178 },
      { month: 'Dec', hires: 28, applications: 156 },
      { month: 'Jan', hires: 35, applications: 201 }
    ]
  };

  const renderLearnerDashboard = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6 rounded-2xl"
        >
          <TrendingUp className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.totalXP}</div>
          <div className="text-sm opacity-90">Total XP</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl"
        >
          <Brain className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.skillsLearned}</div>
          <div className="text-sm opacity-90">Skills Learned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-2xl"
        >
          <Trophy className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.coursesCompleted}</div>
          <div className="text-sm opacity-90">Courses Done</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl"
        >
          <Clock className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.timeSpent}h</div>
          <div className="text-sm opacity-90">Time Spent</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-2xl"
        >
          <Calendar className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.streakDays}</div>
          <div className="text-sm opacity-90">Day Streak</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-2xl"
        >
          <Trophy className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{learnerAnalytics.overview.level}</div>
          <div className="text-sm opacity-90">Current Level</div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
              <span>Hours</span>
              <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
              <span>XP</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {learnerAnalytics.weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-300">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.hours / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{day.hours}h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.xp / 420) * 100}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{day.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Proficiency</h3>
          
          <div className="space-y-4">
            {learnerAnalytics.skillProgress.map((skill, index) => (
              <div key={skill.skill} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-900 dark:text-white">{skill.skill}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 h-3 rounded-full flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                      >
                        <span className="text-xs text-white font-semibold">{skill.proficiency}%</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">+{skill.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Learning Paths Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Path Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learnerAnalytics.learningPaths.map((path, index) => (
            <div key={path.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{path.name}</h4>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Progress</span>
                  <span>{path.completed}/{path.modules} modules</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${path.progress}%` }}
                    transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{path.progress}%</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderRecruiterDashboard = () => (
    <div className="space-y-8">
      {/* Recruiter Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl"
        >
          <Users className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{recruiterAnalytics.candidates.total}</div>
          <div className="text-sm opacity-90">Total Candidates</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl"
        >
          <TrendingUp className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{recruiterAnalytics.candidates.newThisMonth}</div>
          <div className="text-sm opacity-90">New This Month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl"
        >
          <Target className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{recruiterAnalytics.candidates.preScreened}</div>
          <div className="text-sm opacity-90">Pre-screened</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl"
        >
          <Briefcase className="h-6 w-6 mb-2" />
          <div className="text-2xl font-bold">{recruiterAnalytics.candidates.interviewed}</div>
          <div className="text-sm opacity-90">Interviewed</div>
        </motion.div>
      </div>

      {/* Skills in Demand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Skills in High Demand</h3>
        
        <div className="space-y-4">
          {recruiterAnalytics.skillDemand.map((skill, index) => (
            <div key={skill.skill} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-24 font-semibold text-gray-900">{skill.skill}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Demand</span>
                  <span className="text-sm font-semibold text-gray-900">{skill.demand}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.demand}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{skill.candidates}</div>
                <div className="text-xs text-gray-500">candidates</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-blue-600">{skill.avgLevel}%</div>
                <div className="text-xs text-gray-500">avg level</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Top Candidates</h3>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recruiterAnalytics.topCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                  <div className="flex items-center space-x-2">
                    {candidate.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{candidate.score}%</div>
                <div className="text-sm text-gray-500">{candidate.experience}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl 
            flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your progress, analyze skill growth, and identify areas for improvement
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <button
            onClick={() => setViewMode('learner')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              viewMode === 'learner'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Learner Dashboard</span>
            </div>
          </button>
          
          <button
            onClick={() => setViewMode('recruiter')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              viewMode === 'recruiter'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Recruiter Dashboard</span>
            </div>
          </button>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'learner' ? renderLearnerDashboard() : renderRecruiterDashboard()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analytics;