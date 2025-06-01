import { json } from '@sveltejs/kit';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // aus .env

export async function POST({ request }) {
  const { prompt } = await request.json();
  if (!prompt) return json({ error: 'Prompt fehlt' }, { status: 400 });

  const MODEL_NAME = 'gemini-2.0-flash';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topP: 1,
        maxOutputTokens: 2048
      }
    })
  });

  const data = await res.json();
  if (!res.ok) {
    return json({ error: data.error?.message || 'Fehler von Google API' }, { status: 500 });
  }
  return json(data);
}
