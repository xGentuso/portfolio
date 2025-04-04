import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
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
    
    // Check for required prompt
    if (!body.prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          inputs: body.prompt,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Hugging Face API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 500 }
        );
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 500 }
        );
      }

      throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
    }

    // The response is a blob containing the image
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:${blob.type};base64,${base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
} 