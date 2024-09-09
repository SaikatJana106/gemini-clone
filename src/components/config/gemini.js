import { GoogleGenerativeAI } from "@google/generative-ai";

// Use your API key here
const GEMINI_API_KEY = "AIzaSyBubshQpK7EyFOh3wdmhZHALuZbSbeCsXA";

// Initialize the Generative AI SDK
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error during API call:", error);
    return "Error occurred during the API call.";
  }
}

export default run;
