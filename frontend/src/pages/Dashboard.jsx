import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { PlusCircle, Bookmark, Code2, Clock } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setRecentProjects(data.slice(0, 3)); // Get top 3
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
    <div className="py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">What would you like to build today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/generate">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center group cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors text-primary-500">
              <PlusCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Generate New Project</h3>
            <p className="text-gray-500 dark:text-gray-400">Let AI tailor a perfect project idea for your skill level.</p>
          </motion.div>
        </Link>

        <Link to="/saved">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center group cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors text-indigo-500">
              <Bookmark size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">View Saved Projects</h3>
            <p className="text-gray-500 dark:text-gray-400">Access your previously generated ideas and roadmaps.</p>
          </motion.div>
        </Link>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="text-primary-500" /> Recent Projects
          </h2>
          {recentProjects.length > 0 && (
            <Link to="/saved" className="text-primary-500 hover:underline text-sm font-medium">View All</Link>
          )}
        </div>

        {loading ? (
          <Loader message="Loading recent projects..." />
        ) : recentProjects.length === 0 ? (
          <div className="glass-card p-10 rounded-2xl text-center border-dashed border-2">
            <Code2 size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">You haven't generated any projects. Generate your first idea now!</p>
            <Link to="/generate" className="btn-primary">Generate Project</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <motion.div 
                key={project._id}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-2xl flex flex-col h-full"
              >
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                <Link to={`/project/${project._id}`} className="btn-secondary w-full text-center text-sm">
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
