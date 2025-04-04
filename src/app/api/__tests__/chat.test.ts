import { jest } from '@jest/globals'
import { mockFetch } from './setup.mjs'
import { POST } from '../chat/route'

describe('Chat API Route', () => {
  beforeEach(() => {
    // Reset fetch mock
    mockFetch.mockClear()
  })

  it('returns 500 if API key is missing', async () => {
    const savedKey = process.env.NEXT_PUBLIC_DEEP_INFRA_API_KEY
    delete process.env.NEXT_PUBLIC_DEEP_INFRA_API_KEY
    
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'test message' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Deep Infra API key not found')

    // Restore the key
    process.env.NEXT_PUBLIC_DEEP_INFRA_API_KEY = savedKey
  })

  it('returns 400 if message is missing', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Message is required')
  })

  it('handles API errors gracefully', async () => {
    // Mock fetch to return an error
    mockFetch.mockRejectedValueOnce(new Error('API Error'))

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'test message' })
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('API Error')
  })
}) 