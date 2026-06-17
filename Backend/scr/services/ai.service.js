console.log("🔥 LOADED: ai.service.js FROM SCR FOLDER");

const axios = require("axios");

const createGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  console.log("[AI SERVICE] GROQ_API_KEY present:", !!apiKey, "first10:", apiKey ? apiKey.slice(0, 10) : "N/A");
  if (!apiKey) throw new Error("Missing GROQ_API_KEY in process.env.");
  return apiKey;
};

const generateStartupIdea = async (prompt) => {
  try {
    console.log("[AI SERVICE] Using Groq LLaMA 3");
    const apiKey = createGroqClient();

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a startup idea generator. Always respond with valid JSON only. No extra text, no markdown, no explanation. Just pure JSON."
          },
          {
            role: "user",
            content: `Generate a startup idea based on this request: "${prompt}"\n\nReturn ONLY this JSON format:\n{\n  "startupName": "",\n  "problem": "",\n  "targetUsers": "",\n  "features": ["", "", ""],\n  "revenueModel": ["", "", ""],\n  "marketSize": "",\n  "competitors": ["", ""]\n}`
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
    const parsed = JSON.parse(cleaned);

    return parsed;

  } catch (error) {
    console.error("Groq Error:", error.response?.data || error.message);
    throw new Error(error.message);
  }
};

const scoreStartupIdea = async (ideaData) => {
  try {
    console.log("[AI SERVICE] Scoring startup idea");
    const apiKey = createGroqClient();

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a startup idea evaluator. Always respond with valid JSON only. No extra text, no markdown, no explanation. Just pure JSON."
          },
          {
            role: "user",
            content: `Score this startup idea:\n${JSON.stringify(ideaData)}\n\nReturn ONLY this JSON format:\n{\n  "totalScore": 0,\n  "breakdown": {\n    "ideaStrength": 0,\n    "marketDemand": 0,\n    "competitionLevel": 0,\n    "revenuePotenial": 0,\n    "feasibility": 0\n  },\n  "reason": "",\n  "strengths": ["", ""],\n  "weaknesses": ["", ""],\n  "suggestion": ""\n}\n\nAll scores must be out of 100.`
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
    const parsed = JSON.parse(cleaned);

    return parsed;

  } catch (error) {
    console.error("Groq Scoring Error:", error.response?.data || error.message);
    throw new Error(error.message);
  }
};

module.exports = { generateStartupIdea, scoreStartupIdea };