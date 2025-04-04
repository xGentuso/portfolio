import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Check for API key first
    const apiKey = process.env.NEXT_PUBLIC_DEEP_INFRA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Deep Infra API key not found' },
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
      console.log('Attempting to call Deep Infra API...');
      const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-2-70b-chat-hf',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant specializing in software development, technology, and programming. You provide clear, concise, and accurate responses with code examples when relevant. You are part of a portfolio website showcasing development skills.'
            },
            {
              role: 'user',
              content: body.message
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Deep Infra API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        if (response.status === 401) {
          return NextResponse.json(
            { error: 'Invalid API key. Please check your Deep Infra API key configuration.' },
            { status: 401 }
          );
        }
        
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 }
          );
        }

        throw new Error(`Deep Infra API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices?.[0]?.message?.content) {
        console.error('Unexpected API response format:', data);
        throw new Error('Invalid response format from Deep Infra API');
      }

      return NextResponse.json({ response: data.choices[0].message.content });
    } catch (apiError: any) {
      console.error('Deep Infra API Error Details:', {
        name: apiError.name,
        message: apiError.message,
        status: apiError.status,
        type: apiError.type,
        code: apiError.code
      });

      return NextResponse.json(
        { error: 'Failed to process request' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 