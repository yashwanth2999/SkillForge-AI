import express from 'express';
import {
  generateProject,
  saveProject,
  getSavedProjects,
  getProjectById,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getSavedProjects);
router.route('/generate').post(protect, generateProject);
router.route('/save').post(protect, saveProject);
router.route('/:id').get(protect, getProjectById).delete(protect, deleteProject);

export default router;
