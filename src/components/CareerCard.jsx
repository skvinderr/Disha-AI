import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


/**
 * Career card component for displaying individual career recommendations
 * @param {Object} career - Career recommendation object
 * @param {Function} onClick - Callback when card is clicked
 * @param {Array} userSkills - User's current skills for skill matching
 */
const CareerCard = ({ career, onClick, userSkills = [] }) => {
  /**
   * Calculate skill match percentage
   */
  const calculateSkillMatch = () => {
    if (!career.requiredSkills || career.requiredSkills.length === 0) return 0;
    
    const matchingSkills = career.requiredSkills.filter(skill =>
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    return Math.round((matchingSkills.length / career.requiredSkills.length) * 100);
  };

  /**
   * Get skill match color based on percentage
   */
  const getSkillMatchColor = (percentage) => {
    if (percentage >= 70) return 'text-accent-600 bg-accent-50';
    if (percentage >= 40) return 'text-electric-600 bg-electric-50';
    return 'text-gray-600 bg-gray-50';
  };

  const skillMatchPercentage = calculateSkillMatch();
  const skillMatchColor = getSkillMatchColor(skillMatchPercentage);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card cursor-pointer group transition-all duration-200 hover:border-primary-300"
    >
      {/* Career Title */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">
          
           {career.title || <Skeleton/>}
        </h3>

        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </div>

      {/* Career Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {career.description}
      </p>

      {/* Reasoning */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="h-4 w-4 text-primary-500" />
          <span className="text-xs font-medium text-gray-700">Why it fits you</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {career.reasoning}
        </p>
      </div>

      {/* Skill Match Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${skillMatchColor}`}>
            {skillMatchPercentage}% match
          </div>
          {skillMatchPercentage >= 50 && (
            <CheckCircle className="h-4 w-4 text-accent-500" />
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          {career.requiredSkills?.length || 0} skills needed
        </div>
      </div>

      {/* Preview of top skills */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-1">
          {career.requiredSkills?.slice(0, 3).map((skill, index) => {
            const hasSkill = userSkills.some(userSkill => 
              userSkill.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(userSkill.toLowerCase())
            );
            
            return (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  hasSkill 
                    ? 'bg-accent-100 text-accent-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {skill}
              </span>
            );
          })}
          {career.requiredSkills?.length > 3 && (
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500">
              +{career.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCard;
