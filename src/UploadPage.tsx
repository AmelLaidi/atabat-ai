import { GoogleGenAI, Type } from "@google/genai";
import { NovelAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeNovel = async (text: string): Promise<NovelAnalysis> => {
  const model = "gemini-3.1-pro-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Analyze the following Arabic novel text and provide a structured JSON analysis. 
    Focus on themes, characters, emotions, and symbols.
    
    Text: ${text.substring(0, 10000)}`, // Limit text for prompt
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          summary: { type: Type.STRING },
          themes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                weight: { type: Type.NUMBER }
              }
            }
          },
          characters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                traits: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          emotions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sentiment: { type: Type.STRING },
                score: { type: Type.NUMBER },
                color: { type: Type.STRING }
              }
            }
          },
          atmosphere: { type: Type.STRING },
          symbols: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                concept: { type: Type.STRING },
                symbol: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          narrativeStructure: {
            type: Type.OBJECT,
            properties: {
              conflict: { type: Type.STRING },
              climax: { type: Type.STRING },
              resolution: { type: Type.STRING }
            }
          }
        },
        required: ["title", "author", "summary", "themes", "characters", "emotions", "symbols"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateCoverImage = async (analysis: NovelAnalysis): Promise<string> => {
  const prompt = `A modern Arabic literary book cover for a novel titled "${analysis.title}" by ${analysis.author}. 
  The atmosphere is ${analysis.atmosphere}. 
  Themes: ${analysis.themes.map(t => t.name).join(", ")}. 
  Visual style: Minimalist, symbolic, contemporary publishing design, inspired by Arabic calligraphy and abstract motifs. 
  Color palette: ${analysis.emotions.map(e => e.color).join(", ")}. 
  High quality, professional book design.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "3:4",
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  return "";
};
