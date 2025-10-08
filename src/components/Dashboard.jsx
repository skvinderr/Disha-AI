import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  Target, 
  TrendingUp, 
  BookOpen, 
  ArrowRight,
  Beaker,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile, generateCareerRecommendations } from '../services/userService';
import CareerCard from './CareerCard';
import RoadmapModal from './RoadmapModal';

/**
 * Main dashboard component - the central hub for users
 * @param {Object} userProfile - The user profile data
 * @param {Function} onEditProfile - Callback to edit user profile
 */
const Dashboard = ({ userProfile, onEditProfile }) => {
  const { user } = useAuth();
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  // Use the passed userProfile or create a default one for development
  const currentProfile = userProfile || {
    xp: 500,
    level: 1,
    skillCoins: 100,
    streak: 1,
    achievements: ['onboarding_complete'],
    skills: ['React', 'JavaScript', 'Node.js'],
    interests: 'Web Development',
    academics: 'Computer Science',
    onboardingCompleted: true
  };

  // State for mock recommendations
  const [mockRecommendations, setMockRecommendations] = useState(null);

  /**
   * Generate career recommendations using AI
   */
  const handleGenerateRecommendations = async () => {
    try {
      setIsGeneratingRecommendations(true);
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock recommendations based on user skills
      const recommendations = {
        careers: [
          {
            title: "Full Stack Developer",
            description: "Build end-to-end web applications using modern technologies",
            match: 92,
            salaryRange: "₹8-15 LPA",
            requiredSkills: ["React", "Node.js", "JavaScript", "MongoDB", "Express"],
            skillGaps: ["MongoDB", "Express"],
            companies: ["Microsoft", "Google", "Amazon", "Flipkart"],
            growth: "High"
          },
          {
            title: "Frontend Developer",
            description: "Create beautiful and interactive user interfaces",
            match: 88,
            salaryRange: "₹6-12 LPA",
            requiredSkills: ["React", "JavaScript", "CSS", "TypeScript", "Redux"],
            skillGaps: ["TypeScript", "Redux"],
            companies: ["Netflix", "Uber", "Swiggy", "Zomato"],
            growth: "High"
          },
          {
            title: "Software Engineer",
            description: "Develop scalable software solutions and applications",
            match: 85,
            salaryRange: "₹7-14 LPA",
            requiredSkills: ["JavaScript", "Python", "Git", "AWS", "Docker"],
            skillGaps: ["Python", "AWS", "Docker"],
            companies: ["TCS", "Infosys", "Wipro", "Accenture"],
            growth: "Medium"
          }
        ]
      };
      
      setMockRecommendations(recommendations);
      console.log('Generated recommendations:', recommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };

  /**
   * Handle career card click to show roadmap
   */
  const handleCareerClick = (career) => {
    setSelectedCareer(career);
    setShowRoadmapModal(true);
  };

  /**
   * Close roadmap modal
   */
  const handleCloseRoadmap = () => {
    setShowRoadmapModal(false);
    setSelectedCareer(null);
  };

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="loading-skeleton h-8 w-64"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="loading-skeleton h-6 w-3/4 mb-3"></div>
            <div className="loading-skeleton h-4 w-full mb-2"></div>
            <div className="loading-skeleton h-4 w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Render empty state when no recommendations
   */
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="h-10 w-10 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Ready to discover your perfect career?
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Let our AI analyze your profile and recommend career paths tailored specifically for you.
      </p>
      <button
        onClick={handleGenerateRecommendations}
        disabled={isGeneratingRecommendations}
        className="btn-primary inline-flex items-center space-x-2"
      >
        {isGeneratingRecommendations ? (
          <>
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Analyzing Your Profile...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>Generate Career Recommendations</span>
          </>
        )}
      </button>
    </motion.div>
  );

  /**
   * Render skill blueprint section
   */
  const renderSkillBlueprint = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-accent-100 p-2 rounded-lg">
            <Target className="h-5 w-5 text-accent-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Your Skill Blueprint</h2>
        </div>
        <button
          onClick={onEditProfile}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Edit Profile
        </button>
      </div>

      <div className="space-y-4">
        {/* Interests */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Interests & Passions</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {currentProfile?.interests || 'Not specified'}
          </p>
        </div>

        {/* Academic Strengths */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Academic Strengths</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {currentProfile?.academics || 'Not specified'}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Current Skills ({currentProfile?.skills?.length || 0})
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentProfile?.skills?.map((skill, index) => (
              <span key={index} className="skill-tag owned">
                {skill}
              </span>
            )) || (
              <span className="text-gray-400 text-sm">No skills added yet</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Show the dashboard directly since we have the profile
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-fixed bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-y-auto">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Career Journey Awaits
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore personalized career recommendations and build your skill roadmap.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Career Recommendations Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Recommended Career Paths
              </h2>
            </div>

            {/* Empty State */}
            {!mockRecommendations && !currentProfile?.careerRecommendations && (
              <motion.div className="text-center py-12">
                <div className="bg-primary-100 dark:bg-primary-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to discover your perfect career?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  Let our AI analyze your profile and recommend career paths tailored specifically for you.
                </p>
                <button
                  onClick={handleGenerateRecommendations}
                  disabled={isGeneratingRecommendations}
                  className="btn-primary dark:bg-primary-600 dark:hover:bg-primary-700 inline-flex items-center space-x-2"
                >
                  {isGeneratingRecommendations ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Analyzing Your Profile...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Career Recommendations</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Recommendations Grid */}
            {(mockRecommendations || currentProfile?.careerRecommendations) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {(mockRecommendations?.careers || currentProfile.careerRecommendations?.careers)?.map((career, index) => (
                  <CareerCard
                    key={index}
                    career={career}
                    onClick={() => handleCareerClick(career)}
                    userSkills={currentProfile.skills || []}
                  />
                ))}
              </motion.div>
            )}

            {/* Refresh Button */}
            {(mockRecommendations || currentProfile?.careerRecommendations) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={handleGenerateRecommendations}
                  disabled={isGeneratingRecommendations}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  {isGeneratingRecommendations ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Refreshing...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5" />
                      <span>Refresh Recommendations</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Skill Blueprint Section */}
          <div className="lg:col-span-1">
            {renderSkillBlueprint()}
          </div>
        </div>
      </main>

      {/* Roadmap Modal will inherit dark mode from parent */}
      {showRoadmapModal && selectedCareer && (
        <RoadmapModal
          career={selectedCareer}
          userSkills={currentProfile?.skills || []}
          onClose={handleCloseRoadmap}
        />
      )}
    </div>
  );
};

export default Dashboard;
