import { jest } from '@jest/globals'
import { mockFetch } from './setup.mjs'

describe('Test Setup', () => {
  it('configures global mocks correctly', () => {
    // Test fetch mock
    expect(global.fetch).toBeDefined()
    expect(mockFetch.mock).toBeDefined()

    // Test Request, Response, Headers
    expect(global.Request).toBeDefined()
    expect(global.Response).toBeDefined()
    expect(global.Headers).toBeDefined()
    expect(global.Blob).toBeDefined()

    // Test environment variables
    expect(process.env.HUGGING_FACE_API_KEY).toBe('test-huggingface-key')
  })

  it('mocks fetch with correct response format', async () => {
    const response = await global.fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2')
    const data = await response.json()
    
    expect(data).toEqual([{
      generated_text: 'Test response'
    }])
  })

  it('mocks fetch blob response correctly', async () => {
    const response = await global.fetch('https://api-inference.huggingface.co/test')
    const blob = await response.blob()
    
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('image/png')
    
    const arrayBuffer = await blob.arrayBuffer()
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
  })
}) 