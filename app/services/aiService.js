/**
 * AI Service for the Startup Simulator.
 * Integrated with Groq (LLaMA 3) with a robust fallback for demo purposes.
 */

import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const getApiKey = () => {
  return process.env.GROQ_API_KEY || ""; 
};

/**
 * Generates the core startup idea JSON.
 */
export const generateStartupIdea = async (prompt) => {
  const apiKey = getApiKey();
  
  if (apiKey && !apiKey.startsWith("gsk_xxxx")) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a Silicon Valley Startup Architect. Always respond with valid JSON only. No extra text, no markdown, no explanation."
            },
            {
              role: "user",
              content: `Generate a startup idea based on this request: "${prompt}"\n\nReturn ONLY this JSON format:\n{\n  "startupName": "",\n  "headline": "",\n  "overview": "",\n  "problem": "",\n  "targetUsers": "",\n  "features": ["", "", ""],\n  "revenueModel": ["", "", ""],\n  "marketSize": "",\n  "competitors": ["", ""]\n}`
            }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const raw = response.data.choices[0].message.content;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.warn("Groq API failed, falling back to mock data.", error.message);
    }
  }

  // Fallback Mock Data (Dynamic Toggling)
  const nameParts = prompt.split(" ");
  const mainName = nameParts[0] || "Innovate";
  const secondName = nameParts[1] || "";
  
  return {
    startupName: `${mainName}${secondName ? ' ' + secondName : ''} ${Math.random() > 0.5 ? 'Core' : 'System'}`,
    headline: `The final frontier for ${prompt}`,
    overview: `A comprehensive ecosystem designed to streamline ${prompt} through advanced pattern recognition.`,
    problem: `Inefficient scaling and high operational overhead currently plague the ${prompt} landscape.`,
    targetUsers: `Early adopters and enterprise leaders in ${prompt}.`,
    features: [
       `Contextual ${mainName} Engine`, 
       `Real-time ${secondName || 'Analytics'} Sync`, 
       "Adaptive Neural Feedback"
    ],
    revenueModel: [`Per-${mainName} licensing`, "Premium Support"],
    marketSize: `$${Math.floor(Math.random() * 90) + 10}B Global Industry`,
    competitors: [`Legacy ${mainName} Providers`, "Manual Intervention"]
  };
};

/**
 * Generates a detailed score for the startup idea.
 */
export const scoreStartupIdea = async (ideaData) => {
  const apiKey = getApiKey();
  
  if (apiKey && !apiKey.startsWith("gsk_xxxx")) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a startup idea evaluator. Always respond with valid JSON only. No extra text."
            },
            {
              role: "user",
              content: `Score this startup idea:\n${JSON.stringify(ideaData)}\n\nReturn ONLY this JSON format:\n{\n  "totalScore": 0,\n  "breakdown": {\n    "ideaStrength": 0,\n    "marketDemand": 0,\n    "competitionLevel": 0,\n    "revenuePotential": 0,\n    "feasibility": 0\n  },\n  "reason": "",\n  "strengths": ["", ""],\n  "weaknesses": ["", ""],\n  "suggestion": ""\n}\n\nAll scores must be out of 100.`
          }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
    } catch {
      console.warn("Groq Scoring failed, falling back to mock data.");
    }
  }

  // Fallback Mock Score
  const randomScore = Math.floor(Math.random() * 20) + 75; // 75 to 95
  return {
    totalScore: randomScore,
    breakdown: {
      ideaStrength: randomScore + 2,
      marketDemand: randomScore - 5,
      competitionLevel: 80,
      revenuePotential: 90,
      feasibility: 85
    },
    reason: randomScore > 85 ? "Excellent market fit detected." : "Solid concept with competitive upside.",
    strengths: ["Strong problem-solution fit", "Proven tech stack"],
    weaknesses: ["Niche initial market"],
    suggestion: "Consider a focused beta launch to gather user feedback quickly."
  };
};

/**
 * Generates technical architecture (Tech Stack).
 */
export const generateTechStack = async (ideaData) => {
  const apiKey = getApiKey();
  
  if (apiKey && !apiKey.startsWith("gsk_xxxx")) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a CTO Advisor. Always respond with valid JSON only."
            },
            {
              role: "user",
              content: `Provide a tech stack for this startup:\n${JSON.stringify(ideaData)}\n\nReturn ONLY this JSON format:\n{\n  "frontend": "",\n  "backend": "",\n  "database": "",\n  "cloud": "",\n  "ai_ml": "",\n  "tools": ["", "", ""]\n}`
            }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const raw = response.data.choices[0].message.content;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      console.warn("Tech Stack fetch failed.");
    }
  }

  return {
    frontend: "Next.js 14, Tailwind CSS, Framer Motion",
    backend: "Node.js, Express, TypeScript",
    database: "PostgreSQL, Prisma ORM",
    cloud: "Vercel, AWS S3",
    ai_ml: "OpenAI API, Pinecone Vector DB",
    tools: ["GitHub Actions", "Docker", "Sentry"]
  };
};

/**
 * Generates an MVP Roadmap.
 */
export const generateRoadmap = async (ideaData) => {
  const apiKey = getApiKey();
  
  if (apiKey && !apiKey.startsWith("gsk_xxxx")) {
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a Product Manager. Always respond with valid JSON only."
            },
            {
              role: "user",
              content: `Generate a 3-phase roadmap for this startup:\n${JSON.stringify(ideaData)}\n\nReturn ONLY this JSON format:\n{\n  "phase1": { "name": "Validation", "tasks": ["", ""] },\n  "phase2": { "name": "MVP Launch", "tasks": ["", ""] },\n  "phase3": { "name": "Scaling", "tasks": ["", ""] }\n}`
            }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const raw = response.data.choices[0].message.content;
      const cleaned = raw.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      console.warn("Roadmap fetch failed.");
    }
  }

  return {
    phase1: { name: "Validation", tasks: ["Competitor Analysis", "User Interviews"] },
    phase2: { name: "MVP Launch", tasks: ["Core Feature Development", "Beta Release"] },
    phase3: { name: "Scaling", tasks: ["Marketing Campaign", "Infrastructure Expansion"] }
  };
};


