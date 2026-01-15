import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "DevBot", an AI assistant for a Senior Full Stack Developer's portfolio. 
Your goal is to answer questions about the developer's skills, experience, and projects in a professional yet witty and tech-savvy manner.

Developer Profile:
- Name: Alex Dev
- Role: Senior Full Stack Engineer & UI/UX Enthusiast
- Tech Stack: React, TypeScript, Node.js, Python, Tailwind, Gemini API, Docker, AWS.
- Key Projects: 
    1. "EcoTrack" - An AI-powered sustainability dashboard.
    2. "CryptoDash" - Real-time financial visualization tool.
    3. "Artify" - Generative AI art community platform.
- Experience: 5+ years building scalable web apps. Loves clean code and dark mode.

Tone: Helpful, concise, slightly futuristic. 
If asked about contact info, suggest using the contact form in the 'Contact' section.
If asked about the API key, politely decline.
`;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Fallback for demo purposes if no key is present, though the UI will handle the missing key state.
  const apiKey = process.env.API_KEY || ''; 
  
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I processed that, but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
