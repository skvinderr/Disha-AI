import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Award,
  Zap,
  RotateCcw,
  ArrowRight,
  Star
} from 'lucide-react';

/**
 * AI-Powered Skill Assessment Component
 * Features adaptive quizzes and real-time skill gap analysis
 */
const SkillAssessment = ({ userProfile }) => {
  const [currentStep, setCurrentStep] = useState('select'); // 'select', 'assessment', 'results'
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResults, setShowResults] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);

  // Sample skill domains
  const skillDomains = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'React, JavaScript, HTML/CSS, UI/UX',
      icon: '🎨',
      color: 'from-blue-500 to-purple-600',
      difficulty: 'All Levels',
      questions: 15
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Node.js, Python, Databases, APIs',
      icon: '⚙️',
      color: 'from-green-500 to-blue-600',
      difficulty: 'All Levels',
      questions: 12
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Python, TensorFlow, Data Science',
      icon: '🤖',
      color: 'from-purple-500 to-pink-600',
      difficulty: 'Intermediate+',
      questions: 10
    },
    {
      id: 'devops',
      title: 'DevOps & Cloud',
      description: 'Docker, AWS, CI/CD, Kubernetes',
      icon: '☁️',
      color: 'from-orange-500 to-red-600',
      difficulty: 'All Levels',
      questions: 8
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Python, R, Statistics, Analytics',
      icon: '📊',
      color: 'from-teal-500 to-green-600',
      difficulty: 'All Levels',
      questions: 12
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'React Native, Flutter, iOS, Android',
      icon: '📱',
      color: 'from-indigo-500 to-purple-600',
      difficulty: 'All Levels',
      questions: 10
    }
  ];

  // Sample adaptive questions (in real app, these would come from AI)
  const sampleQuestions = [
    {
      id: 1,
      difficulty: 'beginner',
      question: 'What is the purpose of React hooks?',
      options: [
        'To add styles to components',
        'To manage state and side effects in functional components',
        'To create class components',
        'To handle routing'
      ],
      correct: 1,
      explanation: 'React hooks allow you to use state and other React features in functional components.'
    },
    {
      id: 2,
      difficulty: 'intermediate',
      question: 'Which of the following is true about useEffect?',
      options: [
        'It only runs on component mount',
        'It can only be used once per component',
        'It can handle side effects and cleanup',
        'It replaces useState completely'
      ],
      correct: 2,
      explanation: 'useEffect can handle side effects, run on different lifecycle events, and return cleanup functions.'
    }
  ];

  // Timer effect
  useEffect(() => {
    if (currentStep === 'assessment' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, currentStep]);

  const startAssessment = (domain) => {
    setSelectedDomain(domain);
    setCurrentStep('assessment');
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers, {
      questionId: sampleQuestions[currentQuestion].id,
      answer: answerIndex,
      correct: answerIndex === sampleQuestions[currentQuestion].correct,
      timeSpent: 30 - timeLeft
    }];
    setAnswers(newAnswers);
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      generateResults();
    }
  };

  const generateResults = () => {
    const correctAnswers = answers.filter(a => a.correct).length;
    const accuracy = (correctAnswers / answers.length) * 100;
    const avgTime = answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length;
    
    const results = {
      domain: selectedDomain,
      score: Math.round(accuracy),
      level: accuracy >= 80 ? 'Advanced' : accuracy >= 60 ? 'Intermediate' : 'Beginner',
      strengths: ['Component Architecture', 'State Management'],
      weaknesses: ['Performance Optimization', 'Testing'],
      recommendations: [
        'Practice advanced React patterns',
        'Learn about React performance optimization',
        'Study testing with Jest and React Testing Library'
      ],
      nextSteps: [
        'Complete Advanced React course',
        'Build a full-stack project',
        'Practice coding challenges'
      ]
    };
    
    setAssessmentResults(results);
    setCurrentStep('results');
  };

  const renderDomainSelection = () => (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Skill Assessment</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Take our adaptive assessment to discover your skill level, identify gaps, and get personalized learning recommendations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillDomains.map((domain, index) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                 onClick={() => startAssessment(domain)}>
              <div className={`w-full h-32 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-4xl">{domain.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{domain.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{domain.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{domain.difficulty}</span>
                <span>{domain.questions} questions</span>
              </div>
              
              <motion.button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAssessment = () => {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${selectedDomain.color} rounded-xl flex items-center justify-center`}>
                <span className="text-xl">{selectedDomain.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedDomain.title}</h2>
                <p className="text-gray-600">Question {currentQuestion + 1} of {sampleQuestions.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-orange-500'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{question.question}</h3>
          </div>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-500 group-hover:border-purple-500 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-purple-500">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-gray-900 dark:text-gray-200 group-hover:text-purple-900 dark:group-hover:text-purple-300">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
        <p className="text-gray-600">Here's your detailed skill analysis and recommendations</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <motion.circle 
                    cx="50" cy="50" r="40" 
                    stroke="url(#gradient)" 
                    strokeWidth="8" 
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - assessmentResults.score / 100)}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - assessmentResults.score / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{assessmentResults.score}%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{assessmentResults.level}</h3>
              <p className="text-gray-600">in {assessmentResults.domain.title}</p>
            </div>
          </div>
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h4 className="text-lg font-semibold text-gray-900">Strengths</h4>
              </div>
              <ul className="space-y-2">
                {assessmentResults.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-orange-500" />
                <h4 className="text-lg font-semibold text-gray-900">Areas to Improve</h4>
              </div>
              <ul className="space-y-2">
                {assessmentResults.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h4>
            <div className="space-y-3">
              {assessmentResults.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                  <span className="text-gray-700">{rec}</span>
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
              <span>View Learning Path</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentStep('select')}
              className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Take Another Assessment</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <AnimatePresence mode="wait">
        {currentStep === 'select' && renderDomainSelection()}
        {currentStep === 'assessment' && renderAssessment()}
        {currentStep === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default SkillAssessment;