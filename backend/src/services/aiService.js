import { aiClient } from '../config/ai.js';

export const generateProjectIdea = async (skills, experience, domain) => {
  const prompt = `
    You are an expert software architect and technical mentor. 
    A student wants a personalized software project idea.
    
    Student Profile:
    - Skills: ${skills}
    - Experience Level: ${experience}
    - Interested Domain: ${domain}
    
    Generate a unique, practical, and impressive software project idea tailored to this student.
    Return ONLY a valid JSON object with the exact following structure:
    {
      "title": "Project Title",
      "description": "A detailed 2-3 paragraph description of what the project does and why it's useful.",
      "techStack": ["Tech1", "Tech2", "Tech3"],
      "folderStructure": "A textual representation of the project's folder structure",
      "databaseCollections": ["Collection/Table 1", "Collection/Table 2"],
      "apisRequired": [
        {"endpoint": "/api/example", "method": "GET", "description": "What this API does"}
      ],
      "roadmap": [
        {"day": "Day 1-5", "task": "Task description"},
        {"day": "Day 6-10", "task": "Task description"}
      ],
      "resumeDescription": "A 3-bullet point description of the project formatted for a resume.",
      "vivaQuestions": [
        {"question": "Question 1?", "answer": "Answer 1"},
        {"question": "Question 2?", "answer": "Answer 2"}
      ]
    }
    
    Make sure the response is purely valid JSON without markdown formatting like \`\`\`json or \`\`\`.
  `;

  const dummyKey = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here';
  
  if (dummyKey) {
    console.log("No valid GEMINI_API_KEY provided. Using alternative mock generator.");
    return generateMockProject(skills, experience, domain);
  }

  try {
    const result = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    
    const textResult = result.response.text();
    const cleanedText = textResult.replace(/^```json\n?/g, '').replace(/^```\n?/g, '').replace(/\n?```$/g, '').trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Generation Error:", error);
    console.log("Falling back to alternative mock generator...");
    return generateMockProject(skills, experience, domain);
  }
};

const generateMockProject = (skills, experience, domain) => {
  return {
    title: `${domain} Application for ${experience}`,
    description: `This is an alternative, rule-based generated project for a ${domain} application. Since the AI API key is not configured, this smart placeholder data is provided to help you get started. The project involves building a full-stack solution tailored to your skills in ${skills}.`,
    techStack: skills.split(',').map(s => s.trim()).filter(Boolean),
    folderStructure: "frontend/\n  src/\n    components/\n    pages/\nbackend/\n  src/\n    controllers/\n    models/",
    databaseCollections: ["Users", "Items", "Activities"],
    apisRequired: [
      { endpoint: "/api/users", method: "GET", description: "Get user profiles" },
      { endpoint: "/api/items", method: "POST", description: "Create new domain item" },
      { endpoint: "/api/items/:id", method: "PUT", description: "Update item details" }
    ],
    roadmap: [
      { day: "Day 1-2", task: "Setup project structure, database connection, and basic authentication" },
      { day: "Day 3-5", task: "Develop backend REST APIs for core domain logic" },
      { day: "Day 6-8", task: "Build responsive frontend UI components and pages" },
      { day: "Day 9-10", task: "API integration, state management, and final testing" }
    ],
    resumeDescription: `- Architected and developed a full-stack ${domain} application utilizing ${skills}.\n- Designed and implemented RESTful APIs for seamless data management and retrieval.\n- Created a responsive, user-friendly frontend interface with modern web technologies.`,
    vivaQuestions: [
      { question: "Why did you choose this specific tech stack?", answer: "It aligns with the project requirements for scalability and rapid development, and I am highly proficient in these technologies." },
      { question: "How does your database schema handle scale?", answer: "By utilizing proper indexing, normalization (or denormalization if NoSQL), and query optimization." },
      { question: "What were the biggest challenges faced?", answer: "Handling state management across the application and ensuring secure API endpoints." }
    ]
  };
};
