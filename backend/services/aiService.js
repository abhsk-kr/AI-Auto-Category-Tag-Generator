const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert e-commerce product categorization engine. Your job is to analyze a product's title and description, then return structured metadata.

RULES — follow every one strictly:

1. **primary_category** — Pick EXACTLY ONE from this closed list:
   - Electronics
   - Apparel
   - Home & Kitchen
   - Beauty & Personal Care
   - Grocery
   - Toys
   Do NOT invent a new category. If the product doesn't fit perfectly, choose the closest match.

2. **sub_category** — Generate ONE highly specific sub-category that logically falls under the chosen primary category (e.g., "Wireless Earbuds" under Electronics).

3. **seo_tags** — Return an array of 5–10 high-search-volume SEO keywords/phrases relevant to the product. Include a mix of short-tail and long-tail keywords. Do NOT repeat the product title verbatim.

4. **sustainability_filters** — Analyze the product text and return ONLY applicable tags from this closed list:
   - plastic-free
   - compostable
   - vegan
   - recycled
   - organic
   - cruelty-free
   - energy-efficient
   If NONE apply, return an empty array []. Do NOT invent tags outside this list.

5. Return ONLY valid JSON — no markdown, no code fences, no commentary.

RESPONSE FORMAT (exact keys required):
{
  "primary_category": "string",
  "sub_category": "string",
  "seo_tags": ["string"],
  "sustainability_filters": ["string"]
}`;

/**
 * Calls OpenAI to generate category, tags, and sustainability data for a product.
 * @param {string} title - Product title
 * @param {string} description - Product description
 * @returns {Promise<Object>} Parsed AI response
 */
async function generateProductMetadata(title, description) {
  const userPrompt = `Analyze the following product and return the structured JSON metadata.\n\n**Product Title:** ${title}\n\n**Product Description:** ${description}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
  });

  const responseText = completion.choices[0].message.content;

  // Parse and validate the JSON
  let parsed;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new Error(`AI returned invalid JSON: ${responseText.substring(0, 200)}`);
  }

  // Validate required fields
  const validCategories = [
    'Electronics',
    'Apparel',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Grocery',
    'Toys',
  ];

  if (!validCategories.includes(parsed.primary_category)) {
    throw new Error(
      `AI returned invalid category "${parsed.primary_category}". Must be one of: ${validCategories.join(', ')}`
    );
  }

  if (!parsed.sub_category || typeof parsed.sub_category !== 'string') {
    throw new Error('AI response missing valid sub_category');
  }

  if (!Array.isArray(parsed.seo_tags) || parsed.seo_tags.length < 1) {
    throw new Error('AI response must include at least 1 SEO tag');
  }

  if (!Array.isArray(parsed.sustainability_filters)) {
    parsed.sustainability_filters = [];
  }

  const validSustainability = [
    'plastic-free',
    'compostable',
    'vegan',
    'recycled',
    'organic',
    'cruelty-free',
    'energy-efficient',
  ];

  // Filter out any hallucinated sustainability tags
  parsed.sustainability_filters = parsed.sustainability_filters.filter((tag) =>
    validSustainability.includes(tag)
  );

  return parsed;
}

module.exports = { generateProductMetadata };
