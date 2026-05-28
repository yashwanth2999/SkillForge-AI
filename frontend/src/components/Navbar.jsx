import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Code2, LogOut, LayoutDashboard, Bookmark } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-card border-b-0 py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-2 rounded-lg text-white">
          <Code2 size={24} />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
          SkillForge AI
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/saved" className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                <Bookmark size={18} /> Saved
              </Link>
            </div>
            
            <Link to="/profile" className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold hover:ring-2 hover:ring-primary-500 transition-all cursor-pointer" title="Profile">
              {user.name.charAt(0).toUpperCase()}
            </Link>
            
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn-secondary text-sm">
              Login
            </Link>
            <Link to="/register" className="btn-primary text-sm hidden sm:block">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
