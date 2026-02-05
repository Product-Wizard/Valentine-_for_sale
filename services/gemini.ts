import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveNote = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Write a very short, cute, funny, and rhyming 4-line poem thanking someone for being my valentine. Make it sound excited and use emojis.",
    });
    return response.text || "Roses are red, violets are blue, I'm so happy I chose you! 💖";
  } catch (error) {
    console.error("Failed to generate love note:", error);
    return "Yay! You made the right choice! 💖🥰";
  }
};
