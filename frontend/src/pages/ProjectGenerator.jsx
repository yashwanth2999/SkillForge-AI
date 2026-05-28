import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Save, ArrowRight } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const ProjectGenerator = () => {
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('Beginner');
  const [domain, setDomain] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedProject, setGeneratedProject] = useState(null);
  
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!skills || !domain) {
      toast.error('Please fill all fields');
      return;
    }

    setIsGenerating(true);
    setGeneratedProject(null);

    try {
      const { data } = await api.post('/projects/generate', {
        skills,
        experience,
        domain
      });
      setGeneratedProject(data);
      toast.success('Project idea generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate project. Make sure API key is valid.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedProject) return;
    
    setIsSaving(true);
    try {
      const { data } = await api.post('/projects/save', generatedProject);
      toast.success('Project saved to your dashboard!');
      navigate(`/project/${data._id}`);
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-primary-500" /> AI Project Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Tell us what you know, and we'll tell you what to build.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-${generatedProject ? '4' : '8 lg:col-start-3'} transition-all duration-500`}>
          <motion.div className="glass-card p-6 md:p-8 rounded-2xl sticky top-24">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Skills</label>
                <textarea 
                  className="input-field resize-none h-24"
                  placeholder="e.g., React, Node.js, MongoDB, Tailwind CSS..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Experience Level</label>
                <select 
                  className="input-field"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Interested Domain</label>
                <input 
                  type="text"
                  className="input-field"
                  placeholder="e.g., E-commerce, AI, Healthcare, IoT..."
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary py-3 flex justify-center items-center gap-2 text-lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>Generating Magic... <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span></>
                ) : (
                  <>Generate Project <Sparkles size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {(isGenerating || generatedProject) && (
          <div className="lg:col-span-8">
            {isGenerating ? (
              <div className="glass-card p-12 rounded-2xl h-full flex items-center justify-center min-h-[500px]">
                <Loader message="AI is architecting your project. Please wait..." />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-6 pb-6 border-b dark:border-dark-border">
                  <div>
                    <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{generatedProject.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {generatedProject.techStack.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 shrink-0"
                  >
                    {isSaving ? "Saving..." : <><Save size={18} /> Save Project</>}
                  </button>
                </div>

                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-bold mb-3">Project Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {generatedProject.description}
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold mb-3">Resume Points</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {generatedProject.resumeDescription.split('\n').map((point, idx) => (
                        point.trim() && <li key={idx}>{point.replace(/^- /, '')}</li>
                      ))}
                    </ul>
                  </section>

                  <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-xl flex items-center justify-between border border-primary-100 dark:border-primary-900/30">
                    <div>
                      <h4 className="font-bold text-primary-700 dark:text-primary-300">Like this idea?</h4>
                      <p className="text-sm text-primary-600 dark:text-primary-400">Save it to view the full roadmap, APIs, and viva questions.</p>
                    </div>
                    <button onClick={handleSave} className="btn-primary py-2 px-4 flex items-center gap-2">
                      Save & View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectGenerator;
