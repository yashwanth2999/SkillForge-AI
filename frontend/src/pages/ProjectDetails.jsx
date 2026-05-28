import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Database, Layout, Server, CalendarDays, FileText, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setProject(data);
      } catch (error) {
        toast.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleExportPDF = () => {
    setIsExporting(true);
    const element = document.getElementById('project-content');
    const opt = {
      margin:       10,
      filename:     `${project.title.replace(/\s+/g, '_')}_architecture.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsExporting(false);
      toast.success('PDF Exported Successfully');
    });
  };

  if (loading) return <Loader message="Loading project architecture..." />;
  if (!project) return <div className="text-center py-12 text-xl">Project not found.</div>;

  return (
    <div className="py-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/saved" className="text-gray-500 hover:text-primary-500 flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Back to Saved
        </Link>
        <button 
          onClick={handleExportPDF}
          disabled={isExporting}
          className="btn-secondary flex items-center gap-2"
        >
          {isExporting ? "Exporting..." : <><Download size={18} /> Export PDF</>}
        </button>
      </div>

      <div id="project-content" className="space-y-8 bg-gray-50 dark:bg-dark-bg p-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl"
        >
          <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-lg text-sm font-bold">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Architecture / Folders */}
          <motion.div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-dark-border">
              <Layout className="text-blue-500" /> Folder Structure
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-sm overflow-x-auto whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200">
              {project.folderStructure}
            </pre>
          </motion.div>

          {/* Database */}
          <motion.div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-dark-border">
              <Database className="text-green-500" /> Database Collections
            </h3>
            <ul className="space-y-3">
              {project.databaseCollections.map((col, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <CheckCircle2 className="text-green-500 mt-0.5 shrink-0" size={18} />
                  <span className="font-medium">{col}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* APIs */}
        <motion.div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-dark-border">
            <Server className="text-purple-500" /> Required APIs
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-3 rounded-tl-lg font-semibold">Method</th>
                  <th className="p-3 font-semibold">Endpoint</th>
                  <th className="p-3 rounded-tr-lg font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {project.apisRequired.map((api, idx) => (
                  <tr key={idx} className="border-b dark:border-dark-border last:border-0">
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        api.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        api.method === 'POST' ? 'bg-green-100 text-green-700' :
                        api.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        api.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {api.method}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-sm">{api.endpoint}</td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{api.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Roadmap */}
        <motion.div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-2 dark:border-dark-border">
            <CalendarDays className="text-orange-500" /> 30-Day Roadmap
          </h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
            {project.roadmap.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-dark-card bg-orange-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-orange-600 dark:text-orange-400 text-sm mb-1">{item.day}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.task}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interview/Viva */}
        <motion.div className="glass-card p-6 rounded-2xl print-page-break">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2 dark:border-dark-border">
            <FileText className="text-teal-500" /> Viva & Interview Questions
          </h3>
          <div className="space-y-4">
            {project.vivaQuestions.map((qa, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-gray-900 dark:text-white mb-2">Q: {qa.question}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">A: {qa.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
