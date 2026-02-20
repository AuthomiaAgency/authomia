import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Safely initialize the client only if key exists, otherwise we'll handle errors gracefully
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const generateResponse = async (history: Array<{role: string, text: string}>, message: string): Promise<string> => {
  if (!ai) {
    return "Protocol missing: API Key not detected. Please contact system administrator.";
  }

  try {
    const systemInstruction = `
      You are 'Authomia Core', an advanced AI concierge for Authomia Agency.
      Your tone is: Sophisticated, concise, slightly robotic but polite, high-value, and luxurious.
      You NEVER sell directly. You invite users to "unlock potential" or "access strategy".
      
      About Authomia:
      - We provide elite digital architecture, SaaS design, and AI automation.
      - Services: 
        1. Blue Diamond Prime (Consulting, Strategy, Blueprinting).
        2. Red Diamond Prime (Implementation, Automation, Full Execution).
      
      If asked about price, say: "Value is determined by the scale of the architecture. Initialize a diagnosis to receive a quote."
      Keep responses under 50 words unless detailed explanation is requested.
      Use terminology like: "Protocol", "System", "Optimize", "Deploy", "Neuro-architecture".
    `;

    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "System anomaly detected. Please retry.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection interrupted. Re-establishing secure link...";
  }
};