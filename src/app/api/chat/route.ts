import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Enhanced debug logging
    console.log('Chat API Environment check:', {
      hasHuggingFaceKey: !!process.env.HUGGING_FACE_API_KEY,
      keyLength: process.env.HUGGING_FACE_API_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      availableEnvVars: Object.keys(process.env).filter(key => 
        key.includes('DEEP') || key.includes('HUGGING')
      ),
      vercelEnv: process.env.VERCEL_ENV
    });

    // Check for API key first
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Hugging Face API key not found' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Check for required message
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    try {
      console.log('Attempting to call Hugging Face API...');
      
      // First, check if the model is ready
      const modelResponse = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const modelStatus = await modelResponse.json().catch(() => null);
      console.log('Model status:', modelStatus);

      if (modelStatus?.error?.includes('currently loading')) {
        return NextResponse.json(
          { error: 'Model is currently loading. Please try again in a few moments.' },
          { status: 503 }
        );
      }

      // Proceed with the actual query
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `<s>[INST] You are a helpful AI assistant specializing in software development, technology, and programming. You provide clear, concise, and accurate responses with code examples when relevant.

${body.message} [/INST]`,
            parameters: {
              max_new_tokens: 1024,
              temperature: 0.7,
              return_full_text: false
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(async () => {
          // If JSON parsing fails, try to get the raw text
          const textError = await response.text();
          return { error: textError || 'Unknown error' };
        });
        
        console.error('Hugging Face API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        if (response.status === 401) {
          return NextResponse.json(
            { error: 'Invalid API key. Please check your Hugging Face API key configuration.' },
            { status: 401 }
          );
        }
        
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 }
          );
        }

        return NextResponse.json(
          { error: errorData.error || `API error: ${response.status} ${response.statusText}` },
          { status: 500 }
        );
      }

      const data = await response.json();
      
      if (!Array.isArray(data) || !data[0]?.generated_text) {
        console.error('Unexpected API response format:', data);
        return NextResponse.json(
          { error: 'Invalid response format from Hugging Face API' },
          { status: 500 }
        );
      }

      return NextResponse.json({ response: data[0].generated_text });
    } catch (apiError: any) {
      console.error('Hugging Face API Error Details:', {
        name: apiError.name,
        message: apiError.message,
        status: apiError.status,
        type: apiError.type,
        code: apiError.code
      });

      return NextResponse.json(
        { error: apiError.message || 'Failed to process request' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
} 