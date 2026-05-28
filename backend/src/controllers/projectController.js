import Project from '../models/Project.js';
import { generateProjectIdea } from '../services/aiService.js';

// @desc    Generate a new project idea using AI
// @route   POST /api/projects/generate
// @access  Private
export const generateProject = async (req, res, next) => {
  try {
    const { skills, experience, domain } = req.body;

    if (!skills || !experience || !domain) {
      res.status(400);
      throw new Error('Please provide skills, experience, and domain');
    }

    const projectData = await generateProjectIdea(skills, experience, domain);

    res.status(200).json(projectData);
  } catch (error) {
    next(error);
  }
};

// @desc    Save a generated project
// @route   POST /api/projects/save
// @access  Private
export const saveProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      techStack,
      folderStructure,
      databaseCollections,
      apisRequired,
      roadmap,
      resumeDescription,
      vivaQuestions,
    } = req.body;

    const project = await Project.create({
      user: req.user._id,
      title,
      description,
      techStack,
      folderStructure,
      databaseCollections,
      apisRequired,
      roadmap,
      resumeDescription,
      vivaQuestions,
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved projects for the logged in user
// @route   GET /api/projects
// @access  Private
export const getSavedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a specific project by ID
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project && project.user.toString() === req.user._id.toString()) {
      res.status(200).json(project);
    } else {
      res.status(404);
      throw new Error('Project not found or unauthorized');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a saved project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project && project.user.toString() === req.user._id.toString()) {
      await project.deleteOne();
      res.status(200).json({ message: 'Project removed' });
    } else {
      res.status(404);
      throw new Error('Project not found or unauthorized');
    }
  } catch (error) {
    next(error);
  }
};
