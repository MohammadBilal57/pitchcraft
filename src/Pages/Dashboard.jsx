import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// --- ⚙️ GEMINI API Configuration and Function ---
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
const API_KEY = 'AIzaSyDY5aFXuGpnCED80Y9EHioIc6noDJY0DYg'; // ✅ keep your API key in .env file
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

/**
 * Generates a structured startup idea using the Gemini API's structured output.
 */
const generateStartupIdea = async (idea) => {
  const prompt = `
      You are a startup mentor AI. Based on this idea: "${idea}", 
      generate a creative startup summary. The output must strictly follow the JSON schema provided in the configuration.
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING", description: "A catchy startup name." },
          tagline: { type: "STRING", description: "A short, memorable tagline." },
          pitch: { type: "STRING", description: "A one-sentence elevator pitch." },
          value: { type: "STRING", description: "The unique value proposition." },
          color: { type: "STRING", description: "A concept for the primary brand color or logo." },
        },
        propertyOrdering: ["name", "tagline", "pitch", "value", "color"],
      },
    },
  };

  let response;
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          return JSON.parse(jsonText);
        }
        throw new Error("API response was missing generated content.");
      } else if (response.status === 429 || response.status >= 500) {
        const delay = Math.pow(2, retries) * 1000;
        retries++;
        if (retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
      }
      throw new Error(`API call failed with status ${response.status}: ${await response.text()}`);
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw new Error(`Failed to generate content after ${maxRetries} attempts. Details: ${error.message}`);
      }
      const delay = Math.pow(2, retries) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// --- 💼 Dashboard Component ---
const Dashboard = () => {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  // 🔒 Protected Route: Redirect to SignIn if not authenticated
  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate("/signin");
    }
  }, [user, loadingAuth, navigate]);

  const handleGenerate = async () => {
    setErrorMessage("");

    if (!idea.trim()) {
      setErrorMessage("Please enter your startup idea!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await generateStartupIdea(idea);
      setResult(data);
    } catch (error) {
      console.error("Full Error:", error);
      setErrorMessage(`AI Generation Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Real Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      setErrorMessage("Failed to logout. Please try again.");
    }
  };

  if (loadingAuth) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Checking authentication...</div>;
  }

  return (
    <>
      {/* INLINE CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
        body {
          font-family: 'Poppins', 'Inter', sans-serif;
          background: linear-gradient(135deg, #f3e7ff, #fff5fa);
          margin: 0;
          min-height: 100vh;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border-bottom: 2px solid #e9d5ff;
        }
        .logout-btn {
          border: 2px solid #ccc;
          background: white;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
        }
        .logout-btn:hover {
          background: #f3e8ff;
          border-color: #a855f7;
          color: #7c3aed;
        }
        .container {
          background: white;
          max-width: 700px;
          width: 90%;
          margin: 60px auto;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          nav { padding: 15px 20px; }
          .container { margin: 30px auto; padding: 20px; }
        }
        textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1.5px solid #ccc;
          resize: none;
          font-size: 15px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }
        textarea:focus {
          border-color: #a855f7;
          outline: none;
          box-shadow: 0 0 8px #e9d5ff;
        }
        .generate-btn {
          width: 100%;
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.4);
        }
        .generate-btn:hover:not(:disabled) {
          transform: scale(1.01);
          box-shadow: 0 6px 15px rgba(124, 58, 237, 0.6);
        }
        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .result {
          margin-top: 20px;
          background: #faf5ff;
          padding: 18px;
          border-radius: 10px;
          border: 1px solid #e9d5ff;
          animation: fadeIn 0.4s ease;
        }
        .result h3 {
          margin-top: 0;
          color: #7c3aed;
          font-weight: 600;
        }
        .result p {
          margin: 12px 0;
          line-height: 1.6;
          color: #333;
        }
        .loading {
          text-align: center;
          margin-top: 20px;
          color: #7c3aed;
          font-weight: 600;
          font-size: 16px;
        }
        .error-message {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          background-color: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fca5a5;
          font-weight: 500;
        }
        .nav-user-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .user-name {
          font-size: 14px;
          color: #555;
          font-weight: 500;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#7c3aed" }}>
          Pitch<span style={{ color: "#222" }}>Craft</span>
        </h1>
        <div className="nav-user-section">
          {user && <span className="user-name">👤 {user.displayName || user.email}</span>}
          <button onClick={handleLogout} className="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Logout
          </button>
        </div>
      </nav>

      <main>
        <div className="container">
          <h2 style={{ textAlign: "center", color: "#7c3aed", marginTop: 0 }}>
            Your Personal AI Startup Partner 🤖
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
            Generate startup names, taglines, and ideas instantly!
          </p>

          <textarea
            rows="4"
            placeholder="Describe your startup idea... (e.g., An app that helps people find local pet sitters)"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={loading}
          ></textarea>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading || !idea.trim()}
          >
            {loading ? "Generating... ⏳" : "Generate My Startup Idea 🚀"}
          </button>

          {loading && <div className="loading">Please wait, AI is thinking...</div>}

          {result && (
            <div className="result">
              <h3>✨ Results</h3>
              <p><strong>🚀 Startup Name:</strong> {result.name}</p>
              <p><strong>💡 Tagline:</strong> {result.tagline}</p>
              <p><strong>📢 Pitch:</strong> {result.pitch}</p>
              <p><strong>⭐ Value Proposition:</strong> {result.value}</p>
              <p><strong>🎨 Color/Logo Concept:</strong> {result.color}</p>
            </div>
          )}
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: "15px", color: "#777", marginTop: "40px" }}>
        © {new Date().getFullYear()} <span style={{ color: "#7c3aed", fontWeight: "600" }}>PitchCraft</span> — AI Startup Made By Bilal
      </footer>
    </>
  );
};

export default Dashboard;
