import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/ai/nuvision-analyze", async (req, res) => {
    const { selectedItems, lang } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const systemPrompt = `
         Role: AI Nutrition Judge for "Market Shopping Challenge" (街市採購挑戰).
         Goal: Teach users "Budget-friendly, High-quality, Balanced" meals.
         
         Output JSON Format:
         {
           "score": number (0-100),
           "summary": "Short evaluation in ${lang === 'zh' ? 'Traditional Chinese (Cantonese style)' : 'English'}",
           "macros": { "protein": "x%", "carbs": "x%", "fat": "x%" },
           "micros": {
             "saturatedFat": "High/Med/Low (Value)",
             "transFat": "High/Med/Low (Value)",
             "sodium": "High/Med/Low (Value)",
             "sugar": "High/Med/Low (Value)"
           },
           "hiddenNutrients": [
             { "food": "Food Name", "benefit": "Rich in X, helps with Y" }
           ],
           "advice": "Suggestion to improve nutrient absorption or budget balance (e.g., add Vit C)"
         }
         Language: ${lang === 'zh' ? 'Traditional Chinese (Cantonese style)' : 'English'}.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an AI Nutrition Judge for a "Market Shopping Challenge". Analyze this selected meal basket (Budget $50): ${selectedItems}. Output JSON with score, summary, macros, micros (saturatedFat, transFat, sodium, sugar), hiddenNutrients, and advice.`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("NuVision Error:", error);
      res.status(500).json({ error: "Analysis failed" });
    }
  });

  app.post("/api/ai/search", async (req, res) => {
    const { query } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `分析食物「${query}」的營養成分。規則：1.太籠統設 needsMoreInfo: true 並詢問細節。2.資訊足夠回傳營養數據。3.portions 必須包含 4-5 個極度人性化的份量選擇以及 1 個作為計算基準的「每 100g (自訂基準)」。4.對於「每 100g」項，請設置 isCustomBase: true。格式：{needsMoreInfo, promptMessage, name, emoji, brief, portions: [{label, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, isCustomBase}]}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("AI Search Error:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    const { message, context, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

    try {
      const ai = new GoogleGenAI({ 
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `User Context:\n${context}\n\nUser Question:\n${message}`,
        config: {
          systemInstruction: `You are NuBalance Pro's AI Nutrition Mentor.
          
          MANDATORY OUTPUT FORMAT (Strictly Follow):
          
          [Title]
          [1-2 sentences summary only]

          📊 Nutrition Breakdown
          - Calories: [Value or N/A]
          - Protein: [Value or N/A]
          - Carbs: [Value or N/A]
          - Fat: [Value or N/A]

          🎯 Recommendation
          - [Short point 1]
          - [Short point 2]
          - [Short point 3]
          - [Short point 4]
          - [Short point 5]
          - [Short point 6]`
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: "Chat failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
