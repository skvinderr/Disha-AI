import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Brain, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle,
  AlertTriangle,
  Star,
  Zap,
  Download,
  RefreshCw,
  Eye,
  BarChart3,
  Users,
  Briefcase
} from 'lucide-react';

/**
 * AI-Powered Resume Analyzer Component
 * Features intelligent parsing, skill extraction, and improvement suggestions
 */
const ResumeAnalyzer = ({ userProfile }) => {
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'analyzing', 'results'
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showImprovedVersion, setShowImprovedVersion] = useState(false);

  // Mock analysis results (in real app, this would come from AI)
  const mockAnalysisResults = {
    overallScore: 78,
    category: 'Software Developer',
    experience: '3-5 years',
    strengths: [
      'Strong technical skills in React and JavaScript',
      'Good project diversity',
      'Clear work experience timeline',
      'Relevant education background'
    ],
    weaknesses: [
      'Missing quantifiable achievements',
      'Lack of leadership experience highlights',
      'No mention of soft skills',
      'Could improve keywords for ATS optimization'
    ],
    extractedSkills: [
      { name: 'React', proficiency: 85, inDemand: true },
      { name: 'JavaScript', proficiency: 90, inDemand: true },
      { name: 'Node.js', proficiency: 70, inDemand: true },
      { name: 'Python', proficiency: 60, inDemand: true },
      { name: 'CSS', proficiency: 75, inDemand: false },
      { name: 'Git', proficiency: 80, inDemand: false }
    ],
    missingSkills: [
      { name: 'TypeScript', demand: 95, category: 'Programming' },
      { name: 'AWS', demand: 88, category: 'Cloud' },
      { name: 'Docker', demand: 82, category: 'DevOps' },
      { name: 'Testing', demand: 78, category: 'Quality Assurance' }
    ],
    atsScore: 65,
    recommendations: [
      'Add quantifiable achievements (e.g., "Improved app performance by 40%")',
      'Include more relevant keywords for ATS optimization',
      'Add a professional summary section',
      'Highlight leadership and collaboration experiences',
      'Include certifications and continuous learning efforts'
    ],
    careerSuggestions: [
      'Senior Frontend Developer',
      'Full-Stack Developer',
      'React Developer',
      'JavaScript Engineer'
    ]
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setCurrentStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults);
      setCurrentStep('results');
    }, 3000);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const renderUpload = () => (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Resume Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get instant AI-powered feedback on your resume with skill gap analysis and improvement suggestions
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <motion.div
            className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${
              dragActive ? 'bg-purple-200 dark:bg-purple-800' : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <Upload className={`h-10 w-10 ${
              dragActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
            }`} />
          </motion.div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {dragActive ? 'Drop your resume here' : 'Upload your resume'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Drag and drop your resume or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports PDF, DOC, and DOCX files (max 10MB)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Analysis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Advanced AI extracts and analyzes your skills, experience, and achievements
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skill Gap Analysis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Identify missing skills and get recommendations for career advancement
          </p>
        </div>
        
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ATS Optimization</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ensure your resume passes Applicant Tracking Systems
          </p>
        </div>
      </motion.div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6">
          <motion.div
            className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="h-10 w-10 text-white" />
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analyzing Your Resume
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Our AI is extracting skills, analyzing content, and generating insights...
        </p>
        
        <div className="space-y-4 max-w-md mx-auto">
          {[
            'Parsing document structure...',
            'Extracting skills and experience...',
            'Analyzing ATS compatibility...',
            'Generating improvement suggestions...'
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                className="w-2 h-2 bg-purple-600 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
              />
              <span className="text-gray-700">{step}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Resume Analysis Complete
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your comprehensive resume analysis and improvement roadmap
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-32 h-32 mx-auto relative mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <motion.circle 
                  cx="50" cy="50" r="40" 
                  stroke="url(#scoreGradient)" 
                  strokeWidth="8" 
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisResults.overallScore / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - analysisResults.overallScore / 100) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{analysisResults.overallScore}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Overall Score</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {analysisResults.overallScore >= 80 ? 'Excellent' : 
               analysisResults.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ATS Score:</span>
                <span className="font-semibold">{analysisResults.atsScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-semibold">{analysisResults.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="font-semibold">{analysisResults.experience}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Skills Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 text-blue-500 mr-2" />
              Extracted Skills
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {analysisResults.extractedSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    {skill.inDemand && <Star className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{skill.proficiency}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="h-5 w-5 text-orange-500 mr-2" />
              Recommended Skills to Add
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {analysisResults.missingSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    <div className="text-xs text-orange-600 dark:text-orange-300">{skill.category}</div>
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-200 font-semibold">{skill.demand}% demand</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {analysisResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Areas to Improve
              </h4>
              <ul className="space-y-2">
                {analysisResults.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Brain className="h-5 w-5 text-purple-500 mr-2" />
              AI Recommendations
            </h4>
            <div className="space-y-3">
              {analysisResults.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                  <div className="w-6 h-6 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-4 w-4" />
              <span>Download Improved Resume</span>
            </motion.button>
            
            <motion.button
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="h-4 w-4" />
              <span>View Learning Path</span>
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentStep('upload')}
              className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Analyze Another Resume</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <AnimatePresence mode="wait">
        {currentStep === 'upload' && renderUpload()}
        {currentStep === 'analyzing' && renderAnalyzing()}
        {currentStep === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default ResumeAnalyzer;