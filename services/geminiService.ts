
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAITutorResponse = async (context: string, userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a world-class expert AI Tutor at ORVIONAR, an elite tech learning platform. 
      You are currently assisting a student with the lesson: "${context}". 
      Your tone should be inspiring, professional, and highly knowledgeable. 
      When explaining concepts, use real-world tech industry analogies. 
      If the user asks for code, provide clean, modern examples using best practices. 
      Always encourage critical thinking and problem-solving.`
    }
  });

  const response = await chat.sendMessage({ message: userMessage });
  return response.text || "I'm sorry, I encountered a connection issue. Please try again.";
};

export const generateQuiz = async (lessonTitle: string, lessonContent: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a high-quality 3-question multiple-choice quiz that tests deep understanding (not just recall) for the following lesson:
    Lesson: ${lessonTitle}
    Content Summary: ${lessonContent}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswerIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    }
  });

  const text = response.text;
  try {
    return JSON.parse(text || "[]");
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return [];
  }
};
