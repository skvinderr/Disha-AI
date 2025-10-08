import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Target, 
  Zap,
  MinusIcon,
  MaximizeIcon,
  RefreshCw
} from 'lucide-react';
import { generateCareerResponse } from '../services/chatService';
import Footer from './Footer';

const ChatBot = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `🌟 Hi there! I'm Disha AI, your personal career guidance buddy! I'm here to help you navigate your career journey with AI-powered insights.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "Hello! I'm excited to help you with your career journey! 🚀",
      "Hi there! Ready to explore amazing career opportunities? ✨",
      "Welcome! Let's discover your perfect career path together! 🎯"
    ],
    career_advice: [
      `Based on your profile, I see you're interested in ${userProfile?.interests?.[0] || 'technology'}! Here are some trending careers:
      
🎯 **Best Fit Suggestions:**
• Software Development (High demand, great salary)
• Data Science (Perfect for analytical minds)
• AI/ML Engineering (Future-focused field)
• Product Management (Leadership + tech blend)

Would you like detailed insights about any of these?`,
      
      `Great question! For someone with your background in ${userProfile?.academics?.stream || 'your field'}, I recommend:

💡 **Instant Career Insights:**
• Market demand is highest in tech and healthcare
• Remote work opportunities are expanding rapidly
• Skill-based hiring is becoming more common
• Continuous learning is key to success

What specific area interests you most?`
    ],
    skills: [
      `Let's analyze your current skills! Based on your profile:

🔍 **Skill Assessment:**
• Technical Skills: ${userProfile?.skills?.slice(0, 3).join(', ') || 'Programming, Analysis, Problem-solving'}
• Growth Areas: Communication, Leadership, Industry Knowledge
• Recommended Learning: Cloud Computing, AI/ML, Data Analysis

Want me to create a personalized learning roadmap?`,
      
      `Your skill combination is fantastic! Here's what I see:

⚡ **Interactive Career Support:**
• Your ${userProfile?.skills?.[0] || 'analytical'} skills are in high demand
• Consider adding certifications in emerging technologies
• Soft skills development will accelerate your growth
• Portfolio projects will showcase your abilities

Shall I suggest specific certification paths?`
    ],
    help: [
      `I'm here to provide comprehensive career guidance! Here's what I can help with:

🎯 **Best Fit Advice:**
• Personalized career recommendations based on your profile
• Industry trends and job market insights
• Skill gap analysis and improvement suggestions

⚡ **Instant Career Insights:**
• Real-time job market data
• Salary expectations and growth projections
• Company culture insights and reviews

🤝 **Interactive Career Support:**
• Resume optimization tips
• Interview preparation guidance
• Networking strategies and tips
• Career transition planning

What would you like to explore first?`
    ],
    default: [
      "That's an interesting question! Let me think about the best way to help you with that. 🤔",
      "I'd love to provide more specific guidance! Could you tell me more about what you're looking for? 💭",
      "Great question! While I process that, here are some quick career tips based on current trends... 📈"
    ]
  };

  const getResponseCategory = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'greeting';
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('recommendation')) {
      return 'career_advice';
    }
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('improve')) {
      return 'skills';
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return 'help';
    }
    return 'default';
  };

  const generateBotResponse = (userMessage) => {
    // Use enhanced AI service for better responses
    return generateCareerResponse(userMessage, userProfile);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    "What career suits my profile?",
    "Current salary trends 2025?", 
    "Best skills to learn now?",
    "Interview tips and preparation?"
  ];

  const handleQuickSuggestion = (suggestion) => {
    setInputMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `🌟 Hi there! I'm Disha AI, your personal career guidance buddy! I'm here to help you navigate your career journey with AI-powered insights.`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              !
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col ${
              isMinimized ? 'h-auto' : 'h-[600px]'
            }`}
            style={{ width: '380px' }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Disha AI</h3>
                    <p className="text-xs text-purple-100">Your Personal Career Guide</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    {isMinimized ? <MaximizeIcon className="h-4 w-4" /> : <MinusIcon className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={clearChat}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Feature Pills */}
              {!isMinimized && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    <Target className="h-3 w-3" />
                    <span>Best Fit Advice</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    <Zap className="h-3 w-3" />
                    <span>Instant Insights</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    <Sparkles className="h-3 w-3" />
                    <span>Interactive Support</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <div className="flex flex-col flex-1">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[280px] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-blue-500 dark:bg-blue-600 text-white' 
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white'
                        }`}>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-500 dark:bg-blue-600 text-white rounded-tr-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-md'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Try asking:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickSuggestion(suggestion)}
                          className="text-xs text-left p-2 bg-gray-50 dark:bg-gray-800 
                            text-gray-800 dark:text-gray-200 
                            hover:bg-gray-100 dark:hover:bg-gray-700 
                            rounded-lg transition-colors 
                            border border-gray-200 dark:border-gray-700"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about your career..."
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Footer variant="minimal" className="text-center border-t border-gray-100 dark:border-gray-800" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;