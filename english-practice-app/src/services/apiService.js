// OpenAI API Service for ChatGPT 3.5
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// You need to set your OpenAI API key here or in environment variables
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here';

export const sendMessageToChatGPT = async (userMessage, corrections = null) => {
  try {
    // Create system prompt for English practice assistant
    const systemPrompt = `You are an English practice assistant. Your role is to:
1. Continue natural conversation based on what the user said
2. Keep responses engaging and appropriate for English learners
3. Ask follow-up questions to encourage more practice
4. Use simple to medium complexity English
5. Be encouraging and supportive
6. If the user made grammar mistakes that were corrected, acknowledge the correction naturally but don't overemphasize it
7. Keep responses concise (1-3 sentences usually)`;

    // Prepare the message context
    let contextMessage = userMessage;
    if (corrections && corrections.hasErrors) {
      contextMessage += `\n[Note: The user's message had some grammar issues that were corrected: "${corrections.correctedText}"]`;
    }

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
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: contextMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from OpenAI API');
    }

  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    
    // Fallback responses for different error types
    if (error.message.includes('401')) {
      throw new Error('Invalid API key. Please check your OpenAI API key.');
    } else if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    } else if (error.message.includes('500')) {
      throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error('Failed to get response from ChatGPT. Please try again.');
  }
};

// Alternative function for batch conversation (if needed for context)
export const sendConversationToChatGPT = async (conversationHistory, newMessage, corrections = null) => {
  try {
    const systemPrompt = `You are an English practice assistant helping users improve their English through conversation. 
Continue the conversation naturally while being supportive and encouraging.`;

    // Convert conversation history to OpenAI format
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // Add the new message with corrections context if needed
    let contextMessage = newMessage;
    if (corrections && corrections.hasErrors) {
      contextMessage += `\n[Grammar correction made: "${corrections.correctedText}"]`;
    }
    
    messages.push({ role: 'user', content: contextMessage });

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error('Error in conversation API:', error);
    throw error;
  }
};