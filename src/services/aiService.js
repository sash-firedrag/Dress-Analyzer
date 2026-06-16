import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// Helper to convert base64 to format expected by Gemini
function base64ToGenerativePart(base64String) {
  // Extract mime type and base64 data
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    throw new Error('Invalid input string');
  }
  return {
    inlineData: {
      data: matches[2],
      mimeType: matches[1]
    },
  };
}

export async function generateOutfitCombination(dressUrls, accessoryUrls) {
  if (!genAI) {
    return "API Key is missing. Please configure VITE_GEMINI_API_KEY in your .env file to see real AI suggestions. \n\n**MOCK RESPONSE:** Based on the uploaded images, this dress pairs beautifully with the accessories. I recommend adding a lightweight silver necklace and strappy heels to complete the look. The color palette creates a stunning contrast suitable for evening events.";
  }

  try {
    // For vision tasks, gemini-1.5-flash or gemini-1.5-pro are recommended
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert fashion stylist. I have provided images of dresses and accessories. 
    Please analyze these items and provide:
    1. A brief description of the overall aesthetic.
    2. How well these items pair together (color theory, style matching).
    3. Specific styling suggestions (e.g., hair, makeup, shoes, other jewelry) to complete the outfit.
    Format your response beautifully using markdown with headings and bullet points.`;

    const imageParts = [];
    if (dressUrls && dressUrls.length > 0) {
      dressUrls.forEach(url => imageParts.push(base64ToGenerativePart(url)));
    }
    if (accessoryUrls && accessoryUrls.length > 0) {
      accessoryUrls.forEach(url => imageParts.push(base64ToGenerativePart(url)));
    }

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw new Error("Failed to generate outfit combination. Please try again.");
  }
}
