import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askProductExpert = async (
  question: string, 
  product: Product,
  chatHistory: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "I'm sorry, I can't connect to the server right now (Missing API Key).";

  const systemInstruction = `
    You are an expert technical sales engineer for "Suraj Electra", a premier ODM + OEM (Original Design & Equipment Manufacturer).
    You are currently assisting a B2B client or partner with the product: "${product.name}".
    
    Here are the product details:
    Tagline: ${product.tagline}
    Description: ${product.description}
    Unit Price Estimate: $${product.price} (Note: Bulk pricing available)
    Category: ${product.category}
    Features: ${product.features.join(', ')}
    Technical Specs: ${JSON.stringify(product.specs)}

    Your Goal:
    1. Answer technical questions accurately using the provided specs.
    2. Emphasize manufacturing capabilities, quality assurance, and customization options (ODM + OEM).
    3. Be professional, concise, and helpful.
    4. If asked about bulk orders or custom branding, encourage them to contact the sales team.
    5. Do not invent technical facts not present in the data.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory.map(msg => ({
          role: msg.role,
          parts: msg.parts
        })),
        {
          role: 'user',
          parts: [{ text: question }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble thinking right now. Please try again later.";
  }
};