import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Code, Rocket, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: <Sparkles className="text-yellow-500" size={32} />,
      title: "AI-Powered Ideas",
      description: "Get personalized software project ideas based on your unique skills and experience level."
    },
    {
      icon: <Code className="text-blue-500" size={32} />,
      title: "Complete Architecture",
      description: "Receive detailed folder structures, required APIs, and database schemas instantly."
    },
    {
      icon: <Rocket className="text-purple-500" size={32} />,
      title: "30-Day Roadmaps",
      description: "Follow a step-by-step development roadmap to take your project from zero to deployment."
    },
    {
      icon: <BookOpen className="text-green-500" size={32} />,
      title: "Interview Ready",
      description: "Get resume-ready descriptions and common viva questions to ace your technical interviews."
    }
  ];

  return (
    <div className="flex flex-col items-center py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl px-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Forge Your Next <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-600">
            Great Software Project
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Stuck on what to build? Let Generative AI analyze your skills and craft a comprehensive, production-ready project roadmap just for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
            Start Generating Free <Sparkles size={20} />
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4">
            Login to Account
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-start"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPage;
