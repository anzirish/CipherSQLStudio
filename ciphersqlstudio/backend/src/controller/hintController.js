import { OpenRouter } from "@openrouter/sdk";

export const generateHint = async (req, res) => {
  const { question, userQuery, schema } = req.body;

  // Check if API key is available
  if (!process.env.LLM_API_KEY) {
    return res.status(400).json({
      error: "Please add OpenRouter API key.",
    });
  }

  try {
    const prompt = `You are a SQL tutor. A student is working on this question:

"${question}"

${userQuery ? `And current queory is:${userQuery}` : ""}
${schema ? `Database schema: ${JSON.stringify(schema, null, 2)}` : ""}

Provide a helpful hint to guide them toward the solution. Don't provide the complete answer or full query.

Keep the hint concise and short.`;

    const openRouter = new OpenRouter({
      apiKey: process.env.LLM_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "CipherSQLStudio",
      },
    });

    const completion = await openRouter.chat.completions.create({
      model: "qwen/qwen-2-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let hint = completion.choices[0].message.content.trim();

    // Clean up response
    hint = hint
      .replace(
        /<s>|<\/s>|\[B_ANSWER\]|\[INST\]|\[\/INST\]|\[PROMPT\]|\[\/PROMPT\]/g,
        "",
      )
      .replace(/^["']|["']$/g, "")
      .replace(/^\*+|\*+$/g, "")
      .trim();

    res.json({ hint});
  } catch (error) {
    console.error("OpenRouter API error:", error.message);
    res.status(500).json({
      error:
        "Failed to generate hint. The AI service may be temporarily unavailable.",
    });
  }
};
