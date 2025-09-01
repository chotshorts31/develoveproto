import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, currentCode, language } = await request.json();
  
  try {

    // Connect to Ollama API
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'codellama:7b',
        prompt: `You are Develove, an AI coding assistant. The user wants to build a website or application.

Current context:
- Language: ${language || 'html'}
- Current code: ${currentCode || 'No code yet'}

User request: ${message}

Please provide:
1. A helpful response explaining what you'll create
2. Complete, working code that implements the user's request
3. The code should be production-ready and well-structured

Format your response as:
RESPONSE: [your explanation here]
CODE: [complete code here]
LANGUAGE: [language]`,

        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2000,
        },
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error('Failed to get response from Ollama');
    }

    const ollamaData = await ollamaResponse.json();
    const responseText = ollamaData.response || '';

    // Parse the response to extract code and language
    const responseMatch = responseText.match(/RESPONSE:\s*([\s\S]*?)(?=CODE:|$)/);
    const codeMatch = responseText.match(/CODE:\s*([\s\S]*?)(?=LANGUAGE:|$)/);
    const languageMatch = responseText.match(/LANGUAGE:\s*(\w+)/);

    const response = responseMatch ? responseMatch[1].trim() : responseText;
    const code = codeMatch ? codeMatch[1].trim() : '';
    const detectedLanguage = languageMatch ? languageMatch[1].toLowerCase() : language || 'html';

    return NextResponse.json({
      response,
      code,
      language: detectedLanguage,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response if Ollama is not available
    const fallbackLanguage = language || 'HTML';
    const fallbackResponse = `I understand you want to build something with ${fallbackLanguage}. 

Since the AI server isn't running, here's a simple example to get you started:

\`\`\`${fallbackLanguage.toLowerCase()}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Project</h1>
        <p>Start building amazing things with Develove!</p>
    </div>
</body>
</html>
\`\`\`

To get the full AI experience, make sure to install and start Ollama.`;

    return NextResponse.json({
      response: fallbackResponse,
      code: '',
      language: fallbackLanguage.toLowerCase(),
    });
  }
}