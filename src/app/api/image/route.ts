import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

    if (!HUGGING_FACE_API_KEY) {
      return NextResponse.json(
        { error: 'Hugging Face API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted, ugly, deformed",
            num_inference_steps: 50,
            guidance_scale: 7.5,
            width: 1024,
            height: 1024
          }
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

      throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
    }

    // The response is a blob containing the image
    const blob = await response.blob();
    const base64 = Buffer.from(await blob.arrayBuffer()).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
} 