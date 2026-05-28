import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    folderStructure: {
      type: String, // String representation of the tree or JSON string
      required: true,
    },
    databaseCollections: {
      type: [String],
      required: true,
    },
    apisRequired: [
      {
        endpoint: String,
        method: String,
        description: String,
      }
    ],
    roadmap: [
      {
        day: String,
        task: String,
      }
    ],
    resumeDescription: {
      type: String,
      required: true,
    },
    vivaQuestions: [
      {
        question: String,
        answer: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
