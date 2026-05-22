const { GoogleGenAI } = require("@google/genai");

// In-memory IP tracking cache (resets on serverless cold starts)
const ipCache = {};

// Clean up old IP entry keys older than 24 hours to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const key in ipCache) {
    if (now - ipCache[key].timestamp > 24 * 60 * 60 * 1000) {
      delete ipCache[key];
    }
  }
}, 60 * 60 * 1000); // Check once per hour

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed. NuBalance Pro netlify endpoint expects POST requests." })
    };
  }

  // Rate Limiting by IP: 15 times/day
  const clientIP = event.headers["client-ip"] || event.headers["x-nf-client-connection-ip"] || event.headers["x-forwarded-for"] || "127.0.0.1";
  const todayStr = new Date().toISOString().split("T")[0];
  const rateKey = `${clientIP}:${todayStr}`;

  if (!ipCache[rateKey]) {
    ipCache[rateKey] = { count: 0, timestamp: Date.now() };
  }

  if (ipCache[rateKey].count >= 15) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ 
        error: "非常抱歉！您此 IP 今日的 15 次 AI 額度已達上限。請於明日再來體驗，或者使用您自己的 API 密鑰！" 
      })
    };
  }

  // Increment request count
  ipCache[rateKey].count++;

  let bodyData;
  try {
    bodyData = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON request payload." })
    };
  }

  const { action } = bodyData;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Netlify 伺服器配置錯誤：未找到 GEMINI_API_KEY 環境變數，請在 Netlify Dashboard 中設定。" 
      })
    };
  }

  const ai = new GoogleGenAI({ 
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build-netlify' } }
  });

  try {
    if (action === "nuvision-analyze") {
      const { selectedItems, lang } = bodyData;
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
        model: "gemini-2.5-flash",
        contents: `You are an AI Nutrition Judge for a "Market Shopping Challenge". Analyze this selected meal basket (Budget $50): ${selectedItems}. Output JSON with score, summary, macros, micros (saturatedFat, transFat, sodium, sugar), hiddenNutrients, and advice.`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        }
      });

      return {
        statusCode: 200,
        headers,
        body: response.text
      };

    } else if (action === "search") {
      const { query } = bodyData;
      const prompt = `分析食物「${query}」的營養成分。規則：1.太籠統設 needsMoreInfo: true 並詢問細節。2.資訊足夠回傳營養數據。3.portions 必須包含 4-5 個極度人性化的份量選擇以及 1 個作為計算基準的「每 100g (自訂基準)」。4.對於「每 100g」項，請設置 isCustomBase: true。格式：{needsMoreInfo, promptMessage, name, emoji, brief, portions: [{label, calories, protein, carbs, fat, saturatedFat, transFat, sodium, sugar, isCustomBase}]}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      return {
        statusCode: 200,
        headers,
        body: response.text
      };

    } else if (action === "chat") {
      const { message, context, history } = bodyData;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ text: response.text })
      };

    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Action parameter is missing or unknown." })
      };
    }
  } catch (error) {
    console.error("Netlify Function Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "AI Processing Error: " + error.message })
    };
  }
};
