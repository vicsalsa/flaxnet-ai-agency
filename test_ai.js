import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function run() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
}
run();
