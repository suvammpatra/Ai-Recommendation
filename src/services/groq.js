const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function getRecommendations(userQuery, products) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const productList = products
    .map((p) => `ID:${p.id} | ${p.brand} ${p.name} | ${p.category} | $${p.price} | ${p.desc}`)
    .join("\n");

  const systemPrompt = `You are a product recommendation assistant. Given a user query, return ONLY a JSON object in this exact format with no extra text:
{"ids": [array of matching product IDs, max 5], "explanation": "one sentence reason"}

Products:
${productList}

Rules:
- Only use IDs from the list
- Respect price constraints strictly
- Return 1 to 5 best matches
- Return only valid JSON`;

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery },
      ],
      temperature: 0.3,
      max_tokens: 256,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Groq API request failed");
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
