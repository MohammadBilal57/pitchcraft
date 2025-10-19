import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDY5aFXuGpnCED80Y9EHioIc6noDJY0DYg";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateStartupIdea = async (idea) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate a startup idea based on the following description:
      "${idea}"

      Include the following details:
      - name
      - tagline
      - elevator pitch
      - unique value proposition
      - color/logo concept

      Return the result strictly in valid JSON format like this:
      {
        "name": "...",
        "tagline": "...",
        "pitch": "...",
        "value": "...",
        "color": "..."
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 🧹 Clean the response (remove ```json or ``` wrappers if any)
    const cleaned = text
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Safely parse JSON (even if Gemini returns extra stuff)
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Gemini returned non-JSON text, fallback to plain text:", cleaned);
      parsed = { raw: cleaned };
    }

    return parsed;

  } catch (error) {
    console.error("🚨 Gemini Error:", error);
    throw error;
  }
};
