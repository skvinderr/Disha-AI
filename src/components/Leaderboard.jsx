import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  TrendingUp, 
  Zap, 
  Users, 
  Calendar,
  Target,
  Flame,
  Award,
  Globe,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

/**
 * Global Leaderboard & Hackathon Integration Component
 * Features competitive rankings and hackathon participation
 */
const Leaderboard = ({ userProfile }) => {
  const [currentView, setCurrentView] = useState('global'); // 'global', 'skills', 'hackathons', 'local'
  const [timeRange, setTimeRange] = useState('monthly'); // 'weekly', 'monthly', 'yearly', 'alltime'
  const [skillFilter, setSkillFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock leaderboard data
  const globalLeaderboard = [
    {
      rank: 1,
      name: 'Alexandra Chen',
      avatar: '👩‍💻',
      xp: 15420,
      level: 42,
      streak: 89,
      country: 'Singapore',
      topSkills: ['React', 'Node.js', 'AWS'],
      hackathonsWon: 7,
      change: 0
    },
    {
      rank: 2,
      name: 'Raj Patel',
      avatar: '👨‍💻',
      xp: 14890,
      level: 41,
      streak: 76,
      country: 'India',
      topSkills: ['Python', 'ML', 'Docker'],
      hackathonsWon: 5,
      change: +1
    },
    {
      rank: 3,
      name: 'Maria Rodriguez',
      avatar: '👩‍🎓',
      xp: 14250,
      level: 39,
      streak: 45,
      country: 'Spain',
      topSkills: ['JavaScript', 'Vue.js', 'TypeScript'],
      hackathonsWon: 3,
      change: -1
    },
    {
      rank: 4,
      name: 'David Kim',
      avatar: '👨‍🔬',
      xp: 13780,
      level: 38,
      streak: 52,
      country: 'South Korea',
      topSkills: ['Go', 'Kubernetes', 'DevOps'],
      hackathonsWon: 4,
      change: +2
    },
    {
      rank: 5,
      name: 'Sarah Johnson',
      avatar: '👩‍🚀',
      xp: 13456,
      level: 37,
      streak: 63,
      country: 'USA',
      topSkills: ['React Native', 'Flutter', 'Swift'],
      hackathonsWon: 6,
      change: 0
    },
    // Current user
    {
      rank: 156,
      name: 'You',
      avatar: '🚀',
      xp: userProfile?.xp || 2450,
      level: Math.floor((userProfile?.xp || 2450) / 100) + 1,
      streak: userProfile?.streak || 15,
      country: 'Your Country',
      topSkills: ['React', 'JavaScript', 'Node.js'],
      hackathonsWon: 0,
      change: +12,
      isCurrentUser: true
    }
  ];

  const skillLeaderboards = {
    'React': [
      { rank: 1, name: 'Alexandra Chen', score: 98, projects: 45 },
      { rank: 2, name: 'Tom Wilson', score: 96, projects: 38 },
      { rank: 3, name: 'Lisa Zhang', score: 94, projects: 42 }
    ],
    'Python': [
      { rank: 1, name: 'Raj Patel', score: 99, projects: 67 },
      { rank: 2, name: 'Anna Kowalski', score: 97, projects: 52 },
      { rank: 3, name: 'Carlos Silva', score: 95, projects: 48 }
    ],
    'AI/ML': [
      { rank: 1, name: 'Dr. Emily Zhang', score: 99, projects: 23 },
      { rank: 2, name: 'Raj Patel', score: 96, projects: 31 },
      { rank: 3, name: 'Alex Murphy', score: 94, projects: 28 }
    ]
  };

  const hackathons = [
    {
      id: 1,
      name: 'Gen AI Innovation Challenge',
      organizer: 'TechCorp',
      status: 'active',
      participants: 2847,
      prize: '$50,000',
      timeLeft: '15d 4h',
      difficulty: 'Advanced',
      tags: ['AI/ML', 'Innovation', 'LLM'],
      description: 'Build the next generation AI application',
      registered: true,
      leaderboard: [
        { rank: 1, team: 'Neural Ninjas', score: 94.5, members: 4 },
        { rank: 2, team: 'AI Wizards', score: 92.1, members: 3 },
        { rank: 3, team: 'Code Crusaders', score: 89.8, members: 5 },
        { rank: 47, team: 'Your Team', score: 67.2, members: 3, isCurrentTeam: true }
      ]
    },
    {
      id: 2,
      name: 'Sustainable Tech Hackathon',
      organizer: 'EcoTech',
      status: 'upcoming',
      participants: 1654,
      prize: '$25,000',
      timeLeft: '8d 12h',
      difficulty: 'Intermediate',
      tags: ['Sustainability', 'Web', 'Mobile'],
      description: 'Create technology solutions for environmental challenges',
      registered: false
    },
    {
      id: 3,
      name: 'Frontend Masters Challenge',
      organizer: 'DevCommunity',
      status: 'completed',
      participants: 3421,
      prize: '$15,000',
      timeLeft: 'Ended',
      difficulty: 'All Levels',
      tags: ['Frontend', 'React', 'Design'],
      description: 'Design and build the most innovative user interface',
      registered: true,
      winner: 'Team Pixel Perfect',
      yourRank: 23
    }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const renderGlobalLeaderboard = () => (
    <div className="space-y-6">
      {/* Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-orange-100 rounded-2xl p-8 border border-yellow-200"
      >
        <h3 className="text-xl font-bold text-center text-gray-900 mb-8">🏆 Hall of Fame 🏆</h3>
        <div className="flex items-end justify-center space-x-8">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-20 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-lg flex items-center justify-center mb-4">
              <span className="text-2xl">{globalLeaderboard[1].avatar}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-300">
              <Medal className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{globalLeaderboard[1].name}</div>
              <div className="text-sm text-gray-600">{globalLeaderboard[1].xp.toLocaleString()} XP</div>
              <div className="text-xs text-gray-500">Level {globalLeaderboard[1].level}</div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-24 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-t-lg flex items-center justify-center mb-4">
              <span className="text-3xl">{globalLeaderboard[0].avatar}</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-yellow-300">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-bold text-lg text-gray-900">{globalLeaderboard[0].name}</div>
              <div className="text-sm text-gray-600 font-semibold">{globalLeaderboard[0].xp.toLocaleString()} XP</div>
              <div className="text-xs text-gray-500">Level {globalLeaderboard[0].level}</div>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Flame className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-orange-600">{globalLeaderboard[0].streak} days</span>
              </div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-14 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-lg flex items-center justify-center mb-4">
              <span className="text-2xl">{globalLeaderboard[2].avatar}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-orange-300">
              <Medal className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{globalLeaderboard[2].name}</div>
              <div className="text-sm text-gray-600">{globalLeaderboard[2].xp.toLocaleString()} XP</div>
              <div className="text-xs text-gray-500">Level {globalLeaderboard[2].level}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Global Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {globalLeaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`p-6 hover:bg-gray-50 transition-all duration-200 ${
                user.isCurrentUser ? 'bg-purple-50 border-l-4 border-purple-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className="text-2xl">{user.avatar}</div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-semibold ${user.isCurrentUser ? 'text-purple-700' : 'text-gray-900'}`}>
                        {user.name}
                      </h4>
                      {user.change !== 0 && (
                        <div className={`flex items-center space-x-1 text-xs ${
                          user.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {user.change > 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          <span>{Math.abs(user.change)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{user.country}</span>
                      <span>•</span>
                      <span>Level {user.level}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {user.topSkills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{user.xp.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">XP</div>
                  {user.hackathonsWon > 0 && (
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600">{user.hackathonsWon} wins</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderHackathons = () => (
    <div className="space-y-6">
      {hackathons.map((hackathon, index) => (
        <motion.div
          key={hackathon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1 mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(hackathon.status)}`}>
                  {hackathon.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(hackathon.difficulty)}`}>
                  {hackathon.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{hackathon.name}</h3>
              <p className="text-gray-600 mb-3">{hackathon.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{hackathon.participants.toLocaleString()} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{hackathon.timeLeft}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{hackathon.prize} prize pool</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {hackathon.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="lg:ml-6">
              <div className="text-sm text-gray-500 mb-2">Organized by</div>
              <div className="font-semibold text-gray-900 mb-4">{hackathon.organizer}</div>
              
              <motion.button
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  hackathon.registered 
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : hackathon.status === 'completed'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                }`}
                whileHover={!hackathon.registered && hackathon.status !== 'completed' ? { scale: 1.02 } : {}}
                whileTap={!hackathon.registered && hackathon.status !== 'completed' ? { scale: 0.98 } : {}}
                disabled={hackathon.status === 'completed'}
              >
                {hackathon.registered ? 'Registered ✓' : 
                 hackathon.status === 'completed' ? 'Competition Ended' :
                 'Register Now'}
              </motion.button>
            </div>
          </div>

          {/* Hackathon Leaderboard */}
          {hackathon.leaderboard && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                Current Leaderboard
              </h4>
              <div className="space-y-3">
                {hackathon.leaderboard.map((team, teamIndex) => (
                  <div
                    key={team.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      team.isCurrentTeam ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(team.rank)}
                      </div>
                      <div>
                        <div className={`font-semibold ${team.isCurrentTeam ? 'text-purple-700' : 'text-gray-900'}`}>
                          {team.team}
                        </div>
                        <div className="text-sm text-gray-600">{team.members} members</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{team.score}</div>
                      <div className="text-xs text-gray-500">score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hackathon.status === 'completed' && hackathon.winner && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-2 text-yellow-600 mb-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Winner: {hackathon.winner}</span>
              </div>
              {hackathon.yourRank && (
                <div className="text-sm text-gray-600">
                  Your team finished #{hackathon.yourRank}
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 
          dark:from-yellow-600 dark:to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Global Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Compete with learners worldwide, join hackathons, and climb the rankings
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'global', label: 'Global Rankings', icon: Globe },
            { id: 'skills', label: 'Skill Leaders', icon: Star },
            { id: 'hackathons', label: 'Hackathons', icon: Target },
            { id: 'local', label: 'Local', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 ${
                  currentView === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-600 dark:to-orange-700 text-white shadow-lg'
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

        {/* Filters and Search */}
        <motion.div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-600"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
              <option value="alltime">All Time</option>
            </select>

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-600"
            >
              <option value="all">All Skills</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search learners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 rounded-lg
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-600"
            />
            <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 
              text-gray-400 dark:text-gray-500" />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'global' && renderGlobalLeaderboard()}
            {currentView === 'hackathons' && renderHackathons()}
            {/* Add skill and local leaderboards here */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Leaderboard;