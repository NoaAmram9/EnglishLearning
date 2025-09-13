// Grammar and Language Correction Service using OpenAI
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here';

export const detectAndCorrectErrors = async (text) => {
  try {
    const correctionPrompt = `You are a grammar checker and English teacher. Analyze the following text for grammar, spelling, and language errors.

Instructions:
1. If there are NO errors, respond with: "NO_ERRORS"
2. If there ARE errors, provide ONLY:
   - CORRECTED: [the corrected version]
   - EXPLANATION: [brief explanation of the main error]

Text to check: "${text}"

Response format:
Either "NO_ERRORS" or:
CORRECTED: [corrected text]
EXPLANATION: [brief explanation]`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: correctionPrompt
          }
        ],
        max_tokens: 200,
        temperature: 0.3 // Lower temperature for more consistent corrections
      })
    });

    if (!response.ok) {
      throw new Error(`Correction API request failed: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content.trim();
    
    // Parse the response
    if (result === "NO_ERRORS") {
      return {
        hasErrors: false,
        originalText: text,
        correctedText: text,
        explanation: null
      };
    }
    
    // Extract corrected text and explanation
    const correctedMatch = result.match(/CORRECTED:\s*(.+?)(?=\nEXPLANATION:|$)/s);
    const explanationMatch = result.match(/EXPLANATION:\s*(.+)/s);
    
    const correctedText = correctedMatch ? correctedMatch[1].trim() : text;
    const explanation = explanationMatch ? explanationMatch[1].trim() : "Grammar correction suggested";
    
    return {
      hasErrors: true,
      originalText: text,
      correctedText: correctedText,
      explanation: explanation
    };

  } catch (error) {
    console.error('Error in correction service:', error);
    
    // Fallback: return basic correction check
    return await basicCorrection(text);
  }
};

// Fallback basic correction for when API is not available
const basicCorrection = async (text) => {
  // Basic rules-based corrections
  let corrected = text;
  let hasChanges = false;
  let corrections = [];

  // Basic capitalization fixes
  if (text.match(/\bi\b/g)) {
    corrected = corrected.replace(/\bi\b/g, 'I');
    hasChanges = true;
    corrections.push("Capitalize 'I' when referring to yourself");
  }

  // Basic sentence capitalization
  if (text.length > 0 && text[0] !== text[0].toUpperCase()) {
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
    hasChanges = true;
    corrections.push("Start sentences with capital letters");
  }

  // Basic punctuation at end
  if (text.length > 0 && !text.match(/[.!?]$/)) {
    corrected += '.';
    hasChanges = true;
    corrections.push("End statements with punctuation");
  }

  return {
    hasErrors: hasChanges,
    originalText: text,
    correctedText: corrected,
    explanation: corrections.join('. ')
  };
};

// Advanced grammar checking with detailed error categories
export const getDetailedCorrections = async (text) => {
  try {
    const detailedPrompt = `Analyze this English text for errors and categorize them:

Text: "${text}"

Provide corrections in this JSON format:
{
  "hasErrors": true/false,
  "corrections": [
    {
      "type": "grammar/spelling/punctuation/word_choice",
      "original": "original phrase",
      "corrected": "corrected phrase",
      "explanation": "explanation"
    }
  ]
}`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: detailedPrompt
          }
        ],
        max_tokens: 300,
        temperature: 0.2
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content.trim());
    
    return result;

  } catch (error) {
    console.error('Error in detailed corrections:', error);
    return { hasErrors: false, corrections: [] };
  }
};