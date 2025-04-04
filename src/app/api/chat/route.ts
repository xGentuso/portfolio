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

    const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-2-70b-chat-hf',
        messages: [
          {
            role: 'user',
            content: body.message,
          },
        ],
      }),
    });

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format from Deep Infra API');
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 