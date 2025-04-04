import { jest } from '@jest/globals'
import { mockFetch } from './setup.mjs'
import { POST } from '../image/route'

describe('Image Generation API Route', () => {
  beforeEach(() => {
    // Reset fetch mock
    mockFetch.mockClear()
  })

  it('returns 500 if API key is missing', async () => {
    const savedKey = process.env.HUGGING_FACE_API_KEY
    delete process.env.HUGGING_FACE_API_KEY
    
    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test prompt' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Hugging Face API key not found')

    // Restore the key
    process.env.HUGGING_FACE_API_KEY = savedKey
  })

  it('returns 400 if prompt is missing', async () => {
    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Prompt is required')
  })

  it('handles API errors gracefully', async () => {
    // Mock fetch to return an error
    mockFetch.mockRejectedValueOnce(new Error('API Error'))

    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test prompt' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('API Error')
  })

  it('handles 401 unauthorized response', async () => {
    // Mock fetch to return 401 unauthorized
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }))

    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test prompt' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Invalid API key')
  })

  it('handles 429 rate limit response', async () => {
    // Mock fetch to return 429 too many requests
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Too Many Requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    }))

    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test prompt' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Rate limit exceeded')
  })

  it('handles successful image generation', async () => {
    const request = new Request('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'test prompt' })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty('imageUrl')
  })
}) 