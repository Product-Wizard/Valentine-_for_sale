import { GoogleGenAI } from "@google/genai";

// Prefer using a Vite env variable in the browser: VITE_API_KEY
const BROWSER_API_KEY = typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_API_KEY : undefined;
const SERVER_API_KEY = typeof process !== 'undefined' ? (process.env as any).API_KEY : undefined;

const API_KEY = BROWSER_API_KEY || SERVER_API_KEY;

let ai: any = null;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (err) {
    // If library throws in the browser, ignore and fallback below
    console.warn('Could not initialize GoogleGenAI, falling back to static messages.', err);
    ai = null;
  }
} else {
  // No API key available in env — avoid creating the client in the browser
  console.warn('No API key provided for GoogleGenAI; using local fallback for love notes.');
}

const FALLBACK_NOTES = [
  "Roses are red, violets are blue, I'm so happy I chose you! 💖",
  "You said yes — my heart did a flip, best Valentine ever — let's never skip! 😍",
  "Four lines of love, short and sweet — you + me = totally complete! 💕",
  "Yay! You agreed, my joy's on display — let's celebrate this Valentine day! 🎉❤️",
];

export const generateLoveNote = async (): Promise<string> => {
  if (!ai) {
    // Return a pseudo-random fallback so the UI still works in the browser without a key
    return FALLBACK_NOTES[Math.floor(Math.random() * FALLBACK_NOTES.length)];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a very short, cute, funny, and rhyming 4-line poem thanking someone for being my valentine. Make it sound excited and use emojis.",
    });
    return response.text || FALLBACK_NOTES[0];
  } catch (error) {
    console.error("Failed to generate love note:", error);
    return FALLBACK_NOTES[0];
  }
};
